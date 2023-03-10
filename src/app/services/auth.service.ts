import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {GoogleAuthProvider} from 'firebase/auth';
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserModel} from "../shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static USER_URL = `${environment.apiUrl}/users`;

  constructor(public afAuth: AngularFireAuth, private router: Router,
              private http: HttpClient) {
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: GoogleAuthProvider): Promise<boolean> {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.additionalUserInfo?.isNewUser) {
          this.saveDbUser(result.user);
        }
        if (result.user) {
          return true;
        } else {
          this.afAuth.signOut();
          this.router.navigate(['/']);
          return false;
        }
      })
      .catch((error) => {
        console.error(error);
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

  getAllUsers(params?: HttpParams): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(AuthService.USER_URL, {params});
  }

  saveDbUser(result: firebase.User | null): void {
    const user = new UserModel(result?.displayName, result?.photoURL);
    user.createdOn = new Date();
    user.id = result?.uid;
    this.http.post(AuthService.USER_URL, user).subscribe();
  }

  updateRating(user: UserModel, averageRating: string): Observable<UserModel> {
    user.rating = Number(averageRating);
    return this.http.put<UserModel>(AuthService.USER_URL + '/' + user.id, user);
  }
}
