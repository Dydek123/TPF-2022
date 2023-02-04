import {Component, Input} from '@angular/core';
import {UserUtils} from "../../shared/utils/user.utils";

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {

  @Input() rating: number;

  constructor() {
  }

  getStarColor(starOrder: number): string {
    return UserUtils.getStarColor(this.rating, starOrder)
  }

}
