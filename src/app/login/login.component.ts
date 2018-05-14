import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserConnectionService } from './../Services/user-connection.service';
import { IUser } from './../Models/user';
import { Router } from '@angular/router';
import { SharedDataService } from './../Services/shared-data.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserConnectionService]
})
export class LoginComponent implements OnInit {
	isLoggedIn: Boolean = false;
	showLoader: Boolean = false;
	constructor(private _userConnection: UserConnectionService,
				private _router: Router,
				private sharedData: SharedDataService) { }

	ngOnInit() {
	}
	
	@Output()
	userLoggedIn: EventEmitter<Object> = new EventEmitter<Object>();

	checkUserName(val) {
		console.log(val);
	}
	
	login(user: IUser, event): void {
		this.showLoader = true;
		event.target[2].disabled = true;
		this._userConnection.loginUser(user)
			.subscribe((usr) => {
				if(usr) {
					localStorage.setItem('token', usr.token);
					this.isLoggedIn = true;
					this.userLoggedIn.emit(Object.assign({}, usr, {loggedIn: true}));
					this.sharedData.sharedNode.loggedInUser = usr.user;
					if(usr.newUser) {
						this._router.navigate(['newUser']);
					}
					else {
						this._router.navigate(['home']);
					}
				}else{
					this.isLoggedIn = false;
					this.showLoader = false;
					event.target[2].disabled = false;
					alert("Username or Password not valid");
				}
				
			},
			  (error) => {
				  console.log(error);
				  event.target[2].disabled = false;
			  })
	}
}
