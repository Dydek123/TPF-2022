import {Component, Input, OnInit} from '@angular/core';
import {Travel} from "../../shared/models/travel.model";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  showNotifications: boolean;

  @Input() showButtons: boolean;

  @Input() travel: Travel | null;

  constructor() {
  }

  ngOnInit(): void {
  }

  onNotificationClick() {
    this.showNotifications = !this.showNotifications;
  }
}
