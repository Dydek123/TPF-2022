import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class SidebarComponent implements OnInit {

  isLogged: boolean;
  showSidebar: string = 'out';
  isButtonVisible: boolean = false;

  constructor(public authService: AuthService,
              private router: Router) {
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

  checkURL(subpage: string) {
    return this.router.url.includes(subpage);
  }

  private checkUserLogged() {
    this.authService.getUser().subscribe((user) => {
      if (!!user) {
        this.isLogged = true;
      }
    })
  }

  toggleMenu() {
    this.showSidebar = this.showSidebar === 'out' ? 'in' : 'out';
  }

  @HostListener('document:click')
  clickOut() {
    console.log("clicked outside" + this.showSidebar);
    if (this.showSidebar === 'out') {
      this.toggleMenu()
    }
  }
}
