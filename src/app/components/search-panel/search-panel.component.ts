import {Component, Input, OnInit} from '@angular/core';
import {Context} from "../../shared/context";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  @Input() context: Context;

  placeholder: string;

  ngOnInit(): void {
    switch (this.context) {
      case Context.USERS:
        this.placeholder = 'Użytkownicy';
        break;
      case Context.PROFILE:
        this.placeholder = 'Twoje przejazdy';
        break;
      case Context.TRAVEL_SEARCH:
        this.placeholder = 'Przejazdy';
        break;
    }
  }
}
