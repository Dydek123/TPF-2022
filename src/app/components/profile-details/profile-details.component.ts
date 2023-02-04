import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Travel} from "../../shared/models/travel.model";
import {TravellService} from "../../services/travell.service";
import {TravelUtils} from "../../shared/utils/travel.utils";
import {Context} from "../../shared/enum/context";
import {ReservationService} from "../../services/reservation.service";
import {ReservationModel} from "../../shared/models/reservation.model";
import {UserModel} from "../../shared/models/user.model";
import {forkJoin} from "rxjs";
import {AuthService} from "../../services/auth.service";
import firebase from "firebase/compat";
import User = firebase.User;

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  showNotifications: boolean;
  reservationList: ReservationModel[];
  user: User | null;

  @Input() showButtons: boolean;
  @Input() context: Context;

  @Input() travel: Travel | null;

  @Output() onDeleteTravel: EventEmitter<Travel> = new EventEmitter<Travel>();

  constructor(private travelService: TravellService,
              private reservationService: ReservationService,
              private authService: AuthService) {
  }

  get isProfile(): boolean {
    return this.context === Context.PROFILE;
  }

  get isSearch(): boolean {
    return this.context === Context.TRAVEL_SEARCH;
  }

  ngOnInit(): void {
    this.getUser();
  }

  onNotificationClick() {
    this.showNotifications = !this.showNotifications;
    if (this.travel?.id) {
      this.reservationService.getByTravelId(Number(this.travel.id))
        .subscribe(reservations => {
          this.reservationList = reservations;
        });
    }
  }

  deleteTravel() {
    if (this.travel?.id) {
      this.travelService.deleteById(this.travel.id).subscribe();
      this.onDeleteTravel.emit(this.travel);
    }
  }

  getUserPicture(user: UserModel): string {
    return TravelUtils.getUserPicture(user);
  }

  onReservationClick(travel: Travel) {
    console.log('Reservation');
    // this.authService.getUser()
    //   .pipe(
    //     tap(user => console.log(user))
    //   )
    if (this.user) {
      this.addReservation(travel);
    } else {
      this.authService.GoogleAuth().then(() => {
        this.addReservation(travel);
      });
    }
  }

  deleteReservation(reservation: ReservationModel) {
    this.reservationService.deleteReservation(reservation).subscribe();
  }

  acceptReservation(reservation: ReservationModel) {
    this.changeReservation(reservation, true);
  }

  cancelReservation(reservation: ReservationModel) {
    this.changeReservation(reservation, false);
  }

  travelHasFreeSpace(): boolean {
    return !!this.travel && !!this.travel.freeSpace && this.travel.freeSpace >= 1;
  }

  private changeReservation(reservation: ReservationModel, isAccepted: boolean) {
    if (this.travel) {
      forkJoin([this.travelService.acceptReservation(this.travel, isAccepted),
        this.reservationService.acceptReservation(reservation, isAccepted)]).subscribe();
    }
  }

  isReservationListEmpty(): boolean {
    return !this.reservationList || this.reservationList.length === 0;
  }

  private getUser() {
    this.authService.getUser()
      .subscribe(user => this.user = user);
  }

  private addReservation(travel: Travel) {
    this.reservationService.add(travel).subscribe();
  }
}
