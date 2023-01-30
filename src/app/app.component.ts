import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isButtonVisible: boolean = true;
  title = 'BlaBlaCar';

  toggleMenu() {
    this.isButtonVisible = !this.isButtonVisible;
  }
}
