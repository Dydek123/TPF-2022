import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {AuthGuard} from "./guard/auth.guard";
import {NewTravellComponent} from "./components/new-travell/new-travell.component";
import {UserMarksComponent} from "./components/user-marks/user-marks.component";

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'nowy-przejazd', component: NewTravellComponent, canActivate: [AuthGuard]},
  {path: 'oceny', component: UserMarksComponent, canActivate: [AuthGuard]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
