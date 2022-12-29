import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {GoogleAuthProvider} from 'firebase/auth';
import {Observable} from "rxjs";
import firebase from "firebase/compat";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: GoogleAuthProvider): Promise<boolean> {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user) {
          this.router.navigate(['/profile']);
          return true;
        } else {
          this.afAuth.signOut();
          this.router.navigate(['/']);
          return false;
        }
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  }

  async signOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }

  getUser(): Observable<firebase.User | null> {
    return this.afAuth.user;
  }
}
