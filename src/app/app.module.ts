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
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ReactiveFormsModule} from "@angular/forms";
import {TravellService} from "./services/travell.service";
import {HttpClientModule} from "@angular/common/http";

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
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FontAwesomeModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [TravellService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
