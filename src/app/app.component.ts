import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent {
  title = 'BlaBlaCar';

  swipeCoord: [number, number];
  swipeTime: number;
  showSidebar: string = 'out';


  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (this.isSwipeValid(duration, direction)) {
        const swipe = direction[0] < 0 ? 'next' : 'previous';
        this.swipeAction(swipe);
      }
    }
  }

  toggleMenu() {
    this.showSidebar = this.showSidebar === 'out' ? 'in' : 'out';
  }

  private swipeAction(swipe: string) {
    if (swipe === 'next') {
      this.showSidebar = 'out'
    } else {
      this.showSidebar = 'in'
    }
  }

  private isSwipeValid(duration: number, direction: number[]) {
    return duration < 1000 && Math.abs(direction[0]) > 30 && Math.abs(direction[0]) > Math.abs(direction[1] * 3);
  }
}
