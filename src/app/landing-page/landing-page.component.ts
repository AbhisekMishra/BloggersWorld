import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserConnectionService } from './../Services/user-connection.service';
import { SharedDataService } from './../Services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [UserConnectionService, SharedDataService]
})
export class LandingPageComponent implements OnInit {

	constructor(private userConnectionService: UserConnectionService,
				private sharedData: SharedDataService,
				private _router: Router,) { }
	isLoggedIn: Boolean = false;
	token: String;
	
	ngOnInit() {
		this.token = localStorage.getItem("token");
		if(this.token) {
		  console.log("token present "+this.token);
		  this.userConnectionService.authenticateUser(this.token)
			  .subscribe((user) => {
				  console.log(user);
				  if(user.success) {
					  console.log("Success=true");
					  this.sharedData.sharedNode.loggedInUser = user.user.data;
					  this._router.navigate(['home']);
				  }
			  })
	  }
	}
	userIsLoggedIn(loggedIn: Boolean):void {
		this.isLoggedIn = loggedIn;
		//this.userLoggedIn.emit(this.isLoggedIn);
	}
}
