import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {ProfileComponent} from './components/profile/profile.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {SearchPanelComponent} from './components/search-panel/search-panel.component';
import {CardComponent} from './components/card/card.component';
import {ProfileDetailsComponent} from './components/profile-details/profile-details.component';
import {NewTravellComponent} from './components/new-travell/new-travell.component';
import {UserMarksComponent} from './components/user-marks/user-marks.component';
import {SearchTravelComponent} from './components/search-travel/search-travel.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainPageComponent,
    ProfileComponent,
    SearchPanelComponent,
    CardComponent,
    ProfileDetailsComponent,
    NewTravellComponent,
    UserMarksComponent,
    SearchTravelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
