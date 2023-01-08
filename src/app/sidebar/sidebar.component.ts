import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isLogged: boolean;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkUserLogged();
  }

  login() {
    this.authService.GoogleAuth().then((success) => this.isLogged = success);
  }

  logout() {
    this.authService.signOut().then(() => this.isLogged = false);
  }

  private checkUserLogged() {
    this.authService.getUser().subscribe((user) => {
      if (!!user) {
        this.isLogged = true;
      }
    })
  }
}
