import {Component, Input, OnInit} from '@angular/core';
import {CommentModel} from "../../shared/models/comment.model";

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

}
