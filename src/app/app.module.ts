import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {MainPageComponent} from './main-page/main-page.component';
import {ProfileComponent} from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainPageComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
