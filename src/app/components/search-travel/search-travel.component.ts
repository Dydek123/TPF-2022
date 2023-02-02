import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";
import {TravellService} from "../../services/travell.service";
import {Travel} from "../../shared/models/travel.model";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-search-travel',
  templateUrl: './search-travel.component.html',
  styleUrls: ['./search-travel.component.scss']
})
export class SearchTravelComponent implements OnInit {

  context: Context = Context.TRAVEL_SEARCH;
  cardStatus: CardStatus = CardStatus.DETAILED;
  travels: Travel[];
  selectedTravel: Travel | null;

  constructor(private travelService: TravellService) {
  }

  ngOnInit(): void {
    this.travelService.getAll().subscribe(travels => {
      this.travels = travels;
      this.selectedTravel = travels.length > 0 ? travels[0] : null;
    });
  }

  onCardChanged(event: Travel) {
    this.selectedTravel = event;
  }

  onSearch(event: string) {
    let params = new HttpParams()
    if (event) {
      params = params.set('destination', event);
    }
    this.travelService.getAll(params)
      .subscribe(travels => {
        this.travels = travels;
      });
  }
}
