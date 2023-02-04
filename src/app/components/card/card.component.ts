import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardStatus} from "../../shared/enum/card-status";
import {Travel} from "../../shared/models/travel.model";
import {TravelUtils} from "../../shared/utils/travel.utils";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  CardStatus = CardStatus;
  @Input() status: CardStatus;
  @Input() travel: Travel;
  @Input() selectedTravel: Travel | null;
  @Output() cardEvent: EventEmitter<Travel> = new EventEmitter<Travel>();

  constructor() {
  }

  ngOnInit(): void {
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
