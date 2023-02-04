import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardStatus} from "../../shared/enum/card-status";
import {Travel} from "../../shared/models/travel.model";
import {TravelUtils} from "../../shared/utils/travel.utils";
import {ReservationModel} from "../../shared/models/reservation.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  CardStatus = CardStatus;
  @Input() status: CardStatus;
  @Input() travel: Travel;
  @Input() reservation: ReservationModel;
  @Input() selectedTravel: Travel | null;
  @Input() canResign: boolean;

  @Output() cardEvent: EventEmitter<Travel> = new EventEmitter<Travel>();
  @Output() cancelReservation: EventEmitter<ReservationModel> = new EventEmitter<ReservationModel>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.reservation) {
      this.travel = this.reservation.travel;
    }
  }

  get isHighlighted(): boolean {
    return !!this.travel
      && !!this.selectedTravel
      && this.travel.id === this.selectedTravel.id;
  }

  getUserPicture(travel: Travel): string {
    return TravelUtils.getUserPicture(travel.user);
  }
}
