import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return new Observable<boolean>(obs => {

      this.afAuth.authState.subscribe((user: any) => {
        if (!user) {
          console.error('user not authorizate!');

          this.router.navigate(['/']);
          obs.next(false);
        }

        obs.next(true);
      });
    });
  }

}
