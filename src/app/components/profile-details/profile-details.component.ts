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
import {FormUtils} from "../../shared/utils/form.utils";
import User = firebase.User;

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  showCommentPopup: boolean = false;
  showNotifications: boolean;
  successSubmit: boolean
  reservationList: ReservationModel[];
  user: User | null;

  @Input() showButtons: boolean;
  @Input() context: Context;

  @Input() travel: Travel | null;

  @Output() onDeleteTravel: EventEmitter<Travel> = new EventEmitter<Travel>();
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();

  constructor(private travelService: TravellService,
              private reservationService: ReservationService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  get isProfile(): boolean {
    return this.context === Context.PROFILE;
  }

  get isSearch(): boolean {
    return this.context === Context.TRAVEL_SEARCH;
  }

  onNotificationClick() {
    this.showNotifications = !this.showNotifications;
    this.getNotifications();
  }

  deleteTravel() {
    if (this.travel?.id) {
      this.travelService.deleteById(this.travel.id).subscribe();
      this.showNotifications = false;
      this.onDeleteTravel.emit(this.travel);
      this.closePopup.emit();
    }
  }

  getUserPicture(user: UserModel): string {
    return TravelUtils.getUserPicture(user);
  }

  onReservationClick(travel: Travel) {
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
    this.getNotifications();
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

  isReservationListEmpty(): boolean {
    return !this.reservationList || this.reservationList.length === 0;
  }

  togglePopup() {
    this.showCommentPopup = !this.showCommentPopup;
  }

  private getUser() {
    this.authService.getUser()
      .subscribe(user => this.user = user);
  }

  private addReservation(travel: Travel) {
    if (!this.user) {
      return;
    }
    this.reservationService.add(travel, this.user)
      .subscribe(() => {
        this.successSubmit = true
        this.resetButtonWithTimeout();
      });
  }

  private getNotifications() {
    if (this.travel?.id) {
      this.reservationService.getByTravelId(Number(this.travel.id))
        .subscribe(reservations => {
          this.reservationList = reservations;
        });
    }
  }

  private changeReservation(reservation: ReservationModel, isAccepted: boolean) {
    if (this.travel) {
      forkJoin([this.travelService.acceptReservation(this.travel, isAccepted),
        this.reservationService.acceptReservation(reservation, isAccepted)]).subscribe();
    }
  }

  private resetButtonWithTimeout() {
    setTimeout(() => {
      this.successSubmit = false;
    }, FormUtils.RESET_TIMEOUT_MILISECONDS)
  }
}
