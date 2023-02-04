import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Context} from "../../shared/enum/context";

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent implements OnInit {

  placeholder: string;
  @Input() context: Context;
  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();

  searchValue: string;

  ngOnInit(): void {
    switch (this.context) {
      case Context.USERS:
        this.placeholder = 'Użytkownicy';
        break;
      case Context.PROFILE:
        this.placeholder = 'Twoje przejazdy';
        break;
      case Context.TRAVEL_SEARCH:
        this.placeholder = 'Gdzie chcesz jechać?';
        break;
    }
  }

  onSearch() {
    this.searchChanged.emit(this.searchValue);
  }
}
