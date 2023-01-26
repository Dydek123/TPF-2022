import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";

@Component({
  selector: 'app-search-travel',
  templateUrl: './search-travel.component.html',
  styleUrls: ['./search-travel.component.scss']
})
export class SearchTravelComponent implements OnInit {

  context: Context = Context.TRAVEL_SEARCH;
  cardStatus: CardStatus = CardStatus.DETAILED;

  constructor() {
  }

  ngOnInit(): void {
  }

}
