import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NewUserComponent } from './new-user/new-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { HomeLeftNavComponent } from './home-left-nav/home-left-nav.component';
import { HomeCenterComponent } from './home-center/home-center.component';
import { OrderByPipe } from './pipes/order-by.pipe';

import { SharedDataService } from './Services/shared-data.service';
import { AdDirective } from './ad.directive';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { AdComponent } from './ad/ad.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NewUserComponent,
    LandingPageComponent,
    HomeLeftNavComponent,
    HomeCenterComponent,
    OrderByPipe,
    UserDetailsComponent,
    AdDirective,
    AdBannerComponent,
    AdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot()
  ],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
