import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserConnectionService } from './../Services/user-connection.service';
import { IUser } from './../Models/user';
import { Router } from '@angular/router';
import { SharedDataService } from './../Services/shared-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserConnectionService]
})
export class RegisterComponent implements OnInit {
	
	constructor(private _userConnection: UserConnectionService,
			  private _router: Router,
			  private sharedData: SharedDataService) { }
	newUser: IUser;
	statusMessage: String = null;
	showLoader: Boolean = false;
	
	@Output()
	userLoggedIn: EventEmitter<Boolean> = new EventEmitter<Boolean>();
	
	isLoggedIn : Boolean = false;
	ngOnInit() {
	}
	
	registerUser(user: IUser, event):void {
		event.target[7].disabled = true;
		this.showLoader = true;
		user.newUser = true;
		console.log(user);
		this._userConnection.registerUser(user)
			.subscribe((usr) => {
				console.log("component 2");
				console.log(usr);
				if(usr.success) {
					this.statusMessage = "Added !!";
					this.isLoggedIn = true;
					this.sharedData.sharedNode.loggedInUser = usr.user;
					localStorage.setItem('token', usr.token);
					this.userLoggedIn.emit(this.isLoggedIn);
					this._router.navigate(['newUser']);
				} else {
					this.statusMessage = usr.message;
					this.showLoader = false;
					event.target[7].disabled = false;
				}
			},
			(error) => {
				console.log(error);
				this.statusMessage = error.statusText;
				this.showLoader = false;
				event.target[7].disabled = false;
			}) 
	}
}
