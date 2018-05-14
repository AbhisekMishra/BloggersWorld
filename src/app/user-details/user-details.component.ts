import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { SharedDataService } from './../Services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

	constructor(private sharedData: SharedDataService,
				private fb: FormBuilder, private _router: Router) { }
	userDetails = null;
	userDetailsForm: FormGroup;
	profilePicPath: String = "";
	goBack(): void {
		this._router.navigate(['home']);
	}
	ngOnInit() {
		if(!this.sharedData.sharedNode.loggedInUser) {
			this._router.navigate(['']);
		}
		if(this.sharedData.sharedNode.userDetails) {
			this.userDetails = this.sharedData.sharedNode.userDetails;
		}
		else {
			this.userDetails = this.sharedData.sharedNode.loggedInUser;
		}
		this.profilePicPath = "http://localhost:3000/public/uploads/" + this.userDetails.profilePicFileName;
		this.userDetailsForm = this.fb.group({
			fname: [this.userDetails.fname],
			lname: [this.userDetails.lname],
			email: [this.userDetails.email],
			pwd: [this.userDetails.pwd],
			dob: [new Date(this.userDetails.dob).toISOString().substring(0, 10)],
			gender: [this.userDetails.gender],
		})
	}

}
