import {Component, HostListener, OnInit} from '@angular/core';
import {Context} from "../../shared/enum/context";
import {CardStatus} from "../../shared/enum/card-status";
import {Travel} from "../../shared/models/travel.model";
import {TravellService} from "../../services/travell.service";
import {AuthService} from "../../services/auth.service";
import {HttpParams} from "@angular/common/http";
import firebase from "firebase/compat";
import User = firebase.User;

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
  isSmallScreen: boolean;
  showPopup: boolean;
  private user: User | null;

  constructor(private travelService: TravellService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.verifySmallScreen();
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (user?.uid) {
        this.getTravels(user.uid);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  private verifySmallScreen(): void {
    this.isSmallScreen = window.innerWidth < 1000;
  }

  onCardChanged(event: Travel) {
    this.selectedTravel = event;
    if (this.isSmallScreen) {
      this.showPopup = true;
    }
  }

  private getTravels(uid: string) {
    const params = new HttpParams()
      .set('userId', uid);
    this.travelService.getAll(params).subscribe(travels => {
      this.travels = travels;
      if (!this.isSmallScreen) {
        this.selectedTravel = travels.length > 0 ? travels[0] : null;
      }
    });
  }

  onDeleteTravel(event: Travel) {
    this.travels = this.travels.filter(travel => travel.id !== event.id);
    this.selectedTravel = this.travels[0];
  }

  onSearch(event: string) {
    const params = this.getHttpParams(event);
    this.travelService.getAll(params)
      .subscribe(travels => {
        this.travels = travels;
      });
  }

  private getHttpParams(event: string) {
    let params = new HttpParams();
    if (event) {
      params = params.set('destination', event);
    }
    if (this.user) {
      params = params.set('userId', this.user.uid);
    }
    return params;
  }
}
