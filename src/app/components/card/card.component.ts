import {Component, Input, OnInit} from '@angular/core';
import {CardStatus} from "../../shared/card-status";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  CardStatus = CardStatus;
  @Input() status: CardStatus;
  constructor() {
  }

  ngOnInit(): void {
  }

}
