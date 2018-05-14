import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './../Services/shared-data.service';
import { ArticleConnectionService } from './../Services/article-connection.service';
import { UploadProfilePicService } from './../Services/upload-profile-pic.service';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home-center',
  templateUrl: './home-center.component.html',
  styleUrls: ['./home-center.component.css'],
  providers: [ArticleConnectionService, UploadProfilePicService]
})
export class HomeCenterComponent implements OnInit {
	showPostArticle: boolean = false;
	showPostPic: boolean = false;
	showLoader: boolean = false;
	articles: any[];
	order = "-additionDate";
	picPath: any;
	picName: any;
	
	constructor(private sharedData: SharedDataService,
				private profilePicService: UploadProfilePicService,
				private _articleConnection: ArticleConnectionService,
				private _domSanitizer: DomSanitizer) { }

	ngOnInit() {
		this.getPosts();
	}
	
	getPosts() {
		this.showLoader = true;
		this._articleConnection.getArticles().subscribe((posts) => {
			this.articles = posts;
			this.showLoader = false;
		},(err) => {
			console.log(err);
		})
	}
	
	trackByFn(index, post) {
		return index;
	}
	
	togglePostArticle() {
		this.showPostArticle = !this.showPostArticle;
		if(this.showPostArticle) {
			this.showPostPic = false;
		}
	}
	
	togglePostPic() {
		this.showPostPic = !this.showPostPic;
		if(this.showPostPic) {
			this.showPostArticle = false;
		}
	}
	
	postArticle(article, event) {
		event.target[2].disabled = true;
		article.byUserId = this.sharedData.sharedNode.loggedInUser._id;
		this._articleConnection.postAnArticle(article).subscribe((art) => {
			this.showPostArticle = false;
			let byUserId = this.sharedData.sharedNode.loggedInUser;
			art.byUserId = byUserId;
			this.articles.unshift(art);
		},(err) => {
			console.log(err);
		})
	}
	
	uploadPic(event) {
		let file = event.target.files[0];
		let formdata = new FormData();
		formdata.append('pic', file, file.name);
		this.profilePicService.uploadPic(formdata)
		.subscribe((res) => {
			this.picName = res[0].filename;
			let url = 'http://localhost:3000/public/uploads/' + res[0].filename;
			this.picPath = this._domSanitizer.bypassSecurityTrustUrl(url);
			},
			  (error) => {
				  console.log(error);
			  })
	}
	
	postPic(pic, event) {
		event.target[2].disabled = true;
		pic.picPath = this.picName;
		pic.byUserId = this.sharedData.sharedNode.loggedInUser._id;
		this._articleConnection.postAnImage(pic).subscribe((pc) => {
			this.showPostPic = false;
			let byUserId = this.sharedData.sharedNode.loggedInUser;
			pc.byUserId = byUserId;
			this.articles.unshift(pc);
		},(err) => {
			console.log(err);
		})
	}
	
	likedByLoggedInUser(article) {
		let loggedInUserId = this.sharedData.sharedNode.loggedInUser._id;
		let likedby = article.likes.find((usr) => {
			return usr._id == loggedInUserId;
		})
		
		if(likedby){
			return "btn-success";
		}
		else {
			return "";
		}
	}
	
	toggleLike(article, event) {
		event.target.disabled = true;
		let loggedInUserId = this.sharedData.sharedNode.loggedInUser._id;
		article.likedBy = loggedInUserId;
		if(event.target.className.indexOf("btn-success") >= 0){
			article.liked = false;
		}
		else {
			article.liked = true;
		}
		this._articleConnection.toggleLike(article).subscribe((art) => {
			console.log(art);
			event.target.disabled = false;
			if(article.liked) {
				event.target.className = "btn btn-sn btn-success";
			} else {
				event.target.className = "btn btn-sn";
			}
		},(err) => {
			console.log(err);
		})
	}
	
	postComment(comment, article, event, i) {
		let loggedInUserId = this.sharedData.sharedNode.loggedInUser._id;
		article.commentBy = loggedInUserId;
		article.comment = comment.comment;
		
		this._articleConnection.postAComment(article).subscribe((cmt) => {
			event.target[0].value = "";
			let comment = {
				comment: cmt.comment,
				additionDate: new Date(),
				byUserId: this.sharedData.sharedNode.loggedInUser
			}
			this.articles[i].showCommentBox = false;
			this.articles[i].comments.push(comment);
		},(err) => {
			console.log(err);
		})
	}
}
