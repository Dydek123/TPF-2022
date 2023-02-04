import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import firebase from "firebase/compat";
import {Travel} from "../../shared/models/travel.model";
import {HttpParams} from "@angular/common/http";
import {CardStatus} from "../../shared/enum/card-status";
import {ReservationService} from "../../services/reservation.service";
import {ReservationModel} from "../../shared/models/reservation.model";
import User = firebase.User;

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  cardStatus: CardStatus = CardStatus.DETAILED;
  reservationList: ReservationModel[];
  travelList: Travel[] = [];
  @Input() user: User | null;
  @Output() closePopup: EventEmitter<void> = new EventEmitter<void>();

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.loadTravels();
  }

  private loadTravels() {
    if (this.user) {
      const params = new HttpParams().set('passengerId', this.user.uid)
      this.reservationService.getAll(params)
        .subscribe(reservations => {
          this.reservationList = reservations;
          for (const reservation of reservations) {
            const travel = reservation.travel;
            travel.user = reservation.user;
            this.travelList.push(travel);
          }
        });
    }
  }

  cancelReservation(event: ReservationModel) {
    this.reservationService.deleteReservation(event).subscribe(() => {
      this.loadTravels();
    }, error => this.loadTravels());
  }
}
