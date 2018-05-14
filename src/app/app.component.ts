import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './Services/shared-data.service';
import { UserConnectionService } from './Services/user-connection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserConnectionService],
})
export class AppComponent implements OnInit {
	constructor(private sharedData: SharedDataService,
				private userConnectionService: UserConnectionService,
				private _router: Router,) { }
	loggedIn: Boolean = false;
	username: String;
	token: String;
	ngOnInit() {
		let token = localStorage.getItem("token");
		if(token) {
		  this.userConnectionService.authenticateUser(token)
			  .subscribe((user) => {
				  if(user.success) {
					  this.loggedIn = true;
					  this.username = user.user.data.fname;
				  }
			  })
	  }
	}
	
	userIsLoggedIn(logged): void {
		this.loggedIn = logged.loggedIn;
		this.username = logged.user.fname;
	}
	
	logout(): void {
		this.userConnectionService.logoutUser();
		this.loggedIn = false;
		this._router.navigate(['']);
	}
}
