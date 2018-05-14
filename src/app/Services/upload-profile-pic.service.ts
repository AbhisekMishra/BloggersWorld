import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UploadProfilePicService {

	constructor(private _http: Http) { }
	uploadPic(profilePic: any) {
		console.log("Service 1");
		console.log(profilePic);
		let headers = new Headers({'Content-Type': 'multipart/form-data'});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/user/profilePic', profilePic)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	saveProfilePic(profilePic: any) {
		console.log("Service 1");
		console.log(profilePic);
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.put('http://localhost:3000/api/user/profilePicSave', profilePic)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
}
