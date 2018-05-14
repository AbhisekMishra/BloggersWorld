import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
	{path: '', component: LandingPageComponent},
	{path: 'newUser', component: NewUserComponent},
	{path: 'home', component: HomeComponent},
	{path: 'user', component: UserDetailsComponent},
	{path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
