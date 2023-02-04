import {Component, HostListener, OnInit} from '@angular/core';
import {Context} from "../../shared/enum/context";
import {CardStatus} from "../../shared/enum/card-status";
import {TravellService} from "../../services/travell.service";
import {Travel} from "../../shared/models/travel.model";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";

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
  isSmallScreen: boolean;
  showPopup: boolean;

  constructor(private travelService: TravellService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.verifySmallScreen();
    this.route.queryParams.subscribe(param => {
      this.getTravels(this.getQueryParams(param));
    });
  }

  @HostListener('window:resize', ['$event'])
  private verifySmallScreen(): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }

  onCardChanged(event: Travel) {
    this.selectedTravel = event;
    if (this.isSmallScreen) {
      this.showPopup = true;
    }
  }

  onSearch(event: string) {
    let params = new HttpParams()
    if (event) {
      params = params.set('destination', event);
    }
    this.getTravels(params);
  }


  private getTravels(params: HttpParams) {
    this.travelService.getAll(params)
      .subscribe(travels => {
        this.travels = travels;
        if (!this.isSmallScreen) {
          this.selectedTravel = travels.length > 0 ? travels[0] : null;
        }
      });
  }

  private getQueryParams(param: Params) {
    let httpParams = new HttpParams();
    for (const httpParamsKey in param) {
      if (param[httpParamsKey]) {
        httpParams = httpParams.set(httpParamsKey, param[httpParamsKey]);
      }
    }
    return httpParams;
  }
}
