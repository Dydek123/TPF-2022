import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CardStatus} from "../../shared/card-status";
import {Travel} from "../../shared/models/travel.model";
import {TravelUtils} from "../../shared/travel.utils";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  CardStatus = CardStatus;
  @Input() status: CardStatus;
  @Input() travel: Travel;
  @Output() cardEvent: EventEmitter<Travel> = new EventEmitter<Travel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getUserPicture(travel: Travel): string {
    return TravelUtils.getUserPicture(travel);
  }
}
