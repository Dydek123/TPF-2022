import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserModel} from "../../shared/models/user.model";
import {TravelUtils} from "../../shared/utils/travel.utils";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;
  @Input() selectedUser: UserModel | null;
  @Output() cardEvent: EventEmitter<UserModel> = new EventEmitter<UserModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  get isHighlighted(): boolean {
    return !!this.user
      && !!this.selectedUser
      && this.user.id === this.selectedUser.id;
  }

  getUserPicture(user: UserModel) {
    return TravelUtils.getUserPicture(user);
  }
}
