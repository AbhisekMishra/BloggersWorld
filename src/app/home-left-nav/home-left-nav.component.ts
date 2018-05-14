import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './../Services/shared-data.service';
import { UserConnectionService } from './../Services/user-connection.service';

@Component({
  selector: 'app-home-left-nav',
  templateUrl: './home-left-nav.component.html',
  styleUrls: ['./home-left-nav.component.css'],
  providers: [UserConnectionService]
})
export class HomeLeftNavComponent implements OnInit {
	userName: String = "";
	profilePicPath: String = "";
	
	constructor(private sharedData: SharedDataService,
				private _userConnection: UserConnectionService) { }

	ngOnInit() {
		if(this.sharedData.sharedNode.loggedInUser) {
			this.userName = this.sharedData.sharedNode.loggedInUser.fname + " " + 
							this.sharedData.sharedNode.loggedInUser.lname;
			this.getProfilePic(this.sharedData.sharedNode.loggedInUser._id);
		}
	}
	
	getProfilePic(userId: String): void {
		this._userConnection.getProfilePicture(userId).subscribe((pic) => {
			this.profilePicPath = "http://localhost:3000/public/uploads/" + pic.profilePicFileName;
		},(err) => {
			console.log(err);
		})
	}
}
