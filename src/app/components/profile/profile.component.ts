import {Component, OnInit} from '@angular/core';
import {Context} from "../../shared/context";
import {CardStatus} from "../../shared/card-status";
import {Travel} from "../../shared/models/travel.model";
import {TravellService} from "../../services/travell.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  context: Context = Context.PROFILE;
  cardStatus: CardStatus = CardStatus.DETAILED;
  travels: Travel[];
  selectedTravel: Travel | null;

  constructor(private travelService: TravellService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      if (user?.uid) {
        this.getTravels(user.uid);
      }
    })
  }

  onCardChanged(event: Travel) {
    this.selectedTravel = event;
  }

  private getTravels(uid: string) {
    this.travelService.getByUserId(uid).subscribe(travels => {
      this.travels = travels;
      this.selectedTravel = travels.length > 0 ? travels[0] : null;
    });
  }
}
