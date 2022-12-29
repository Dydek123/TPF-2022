import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged: boolean;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.GoogleAuth().then((success) => this.isLogged = success);
  }

  logout() {
    this.authService.signOut().then(() => this.isLogged = false);
  }
}
