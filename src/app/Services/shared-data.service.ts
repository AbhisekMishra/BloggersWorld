import { Injectable } from '@angular/core';
import { IUser } from './../Models/user';

@Injectable()
export class SharedDataService {
	loggedInUser: IUser;
	constructor() { }
	sharedNode = {
      loggedInUser: null,
	  userDetails: null
    };
}
