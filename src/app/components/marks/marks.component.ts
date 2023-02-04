import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../shared/models/comment.model";
import {UserUtils} from "../../shared/utils/user.utils";

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  @Input() comment: CommentModel;

  constructor() {
  }

  ngOnInit(): void {
  }

  getStarColor(starOrder: number): string {
    return UserUtils.getStarColor(this.comment.rating, starOrder)
  }
}
