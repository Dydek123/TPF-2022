import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";

@Component({
  selector: 'app-user-marks',
  templateUrl: './user-marks.component.html',
  styleUrls: ['./user-marks.component.scss']
})
export class UserMarksComponent implements OnInit {
  context: Context = Context.USERS;
  cardStatus = CardStatus;

  constructor() {
  }

  ngOnInit(): void {
  }

}
