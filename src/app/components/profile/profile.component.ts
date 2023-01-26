import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  context: Context = Context.PROFILE;
  cardStatus: CardStatus = CardStatus.DETAILED;

  constructor() {
  }

  ngOnInit(): void {
  }

}
