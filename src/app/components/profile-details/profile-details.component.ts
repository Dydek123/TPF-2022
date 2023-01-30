import {Component, Input, OnInit} from '@angular/core';
import {Travel} from "../../shared/models/travel.model";
import {TravellService} from "../../services/travell.service";

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  showNotifications: boolean;

  @Input() showButtons: boolean;

  @Input() travel: Travel | null;

  constructor(private travelService: TravellService) {
  }

  ngOnInit(): void {
  }

  onNotificationClick() {
    this.showNotifications = !this.showNotifications;
  }

  deleteTravel() {
    if (this.travel?.id) {
      this.travelService.deleteById(this.travel.id).subscribe(travel => console.log(travel))
    }
  }
}
