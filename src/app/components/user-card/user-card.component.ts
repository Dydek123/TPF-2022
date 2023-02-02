import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../shared/models/user.model";
import {TravelUtils} from "../../shared/travel.utils";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;
  @Output() cardEvent: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  getUserPicture(user: UserModel) {
    return TravelUtils.getUserPicture(user);
  }
}
