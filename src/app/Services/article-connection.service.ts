import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IUser } from './../Models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ArticleConnectionService {

	constructor(private _http: Http) { }
	
	postAnArticle(article) {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/article', JSON.stringify(article), options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	postAnImage(pic) {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/pic', JSON.stringify(pic), options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}

	getArticles() {
		return this._http.get('http://localhost:3000/api/posts')
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	toggleLike(article) {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.put('http://localhost:3000/api/article/toggleLike', JSON.stringify(article), options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
	
	postAComment(article) {
		let headers = new Headers({'Content-Type': 'application/json'});
		let options = new RequestOptions({headers: headers});
		return this._http.post('http://localhost:3000/api/comment', JSON.stringify(article), options)
				   .map((response: Response) => response.json())
				   .catch((error: Response) => Observable.throw(error));
	}
}