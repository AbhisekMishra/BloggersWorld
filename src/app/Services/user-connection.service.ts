import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IUser } from './../Models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserConnectionService {

	constructor(private _http : Http) { }
	
	registerUser(user: IUser) {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/user', JSON.stringify(user), options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	loginUser(user: IUser) {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/user/login', JSON.stringify(user), options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	getProfilePicture(userId: String) {
		return this._http.get('http://localhost:3000/api/user/' + userId)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	authenticateUser(token: String) {
		let headers = new Headers({'x-access-token': token});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/me', "", options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	logoutUser() {
		localStorage.removeItem("token");
	}
}
