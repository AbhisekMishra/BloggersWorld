import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './../Services/shared-data.service';
import { Router } from '@angular/router';
import { UserConnectionService } from './../Services/user-connection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserConnectionService]
})
export class HomeComponent implements OnInit {
	token: String;
	loggedIn: Boolean = false;
	constructor(private sharedData: SharedDataService,
			  private _router: Router,
			  private userConnectionService: UserConnectionService) { }

  ngOnInit() {
	  this.token = localStorage.getItem("token");
	  if(this.token) {
		  this.userConnectionService.authenticateUser(this.token)
			  .subscribe((user) => {
				  if(user.success) {
					  this.sharedData.sharedNode.loggedInUser = user.user.data;
					  this.loggedIn = true;
				  } else {
					  this._router.navigate(['']);
				  }
			  })
	  }
	  else {
		  this._router.navigate(['']);
	  }
  }

}
