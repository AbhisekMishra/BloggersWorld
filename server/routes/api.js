const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = require("../models/user");
const pic = require("../models/pic");
const comment = require("../models/comment");
const article = require("../models/article");
const multer  = require('multer');
const path = require("path");
const crypto = require("crypto");
var jwt = require('jsonwebtoken');
var secret = 'harrypotter';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads/' ))
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + file.originalname.split('.')[1]);
    });
  }
});
var upload = multer({ storage: storage });

const db = "mongodb://localhost:27017/BloggersWorld";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err) {
		console.error("Error! " + err);
	}
});

//********* GET REQUESTS **********

router.get('/users', function(req,res){
	user.find().exec(function(err, usrs){
		if(err) {
			res.json({success: false, message: "Unable to fetch users"});
		} else {
			res.json(usrs);
		}
	})
});

router.get('/user/:userId', function(req,res){
	user.findById(req.params.userId).exec(function(err, pic){
		if(err) {
			res.json({success: false, message: "Unable to fetch user"});
		} else {
			res.json(pic);
		}
	})
});

router.get('/posts', function(req,res){
	
	article.find().populate("byUserId")
					.populate({path:"likes", model:"user"})
					.populate({path:"comments", model:"comment", populate: {path: "byUserId", model:"user"}})
					.sort({ 
			"additionDate": -1 
		}).exec(function(err, articl) {
		if(err) {
			res.json({success: false, message: "Unable to fetch articles"});
		} else {
			pic.find().populate("byUserId")
					  .populate({path:"likes", model:"user"})
					  .populate({path:"comments", model:"comment", populate: {path: "byUserId", model:"user"}})
					  .sort({ 
				"additionDate": -1 
			}).exec(function(err, pic) {
				if(err) {
					res.json({success: false, message: "Unable to fetch pics"});
				} else {
					res.json(articl.concat(pic));
					
				}
			});
		}
	});
	
});

//********* POST REQUESTS **********

router.post('/user', function(req,res){
	if(req.body) {
		var usr = new user();
		usr.fname = req.body.fname;
		usr.lname = req.body.lname;
		usr.email = req.body.email;
		usr.pwd = req.body.pwd;
		usr.dob = req.body.dob;
		usr.gender = req.body.gender;
		usr.newUser = req.body.newUser;
		
		usr.save(function(err, usrl){
			if(err) {
				if(err.errors == undefined) {
					res.json({success: false, message:err.message});
				}else if(err.errors.fname) {
					res.json({success: false, message:err.errors.fname.message});
				}else if(err.errors.lname) {
					res.json({success: false, message:err.errors.lname.message});
				}else if(err.errors.email) {
					res.json({success: false, message:err.errors.email.message});
				}else if(err.errors.pwd) {
					res.json({success: false, message:err.errors.pwd.message});
				}else if(err.errors.dob) {
					res.json({success: false, message:err.errors.dob.message});
				}else if(err.errors.gender) {
					res.json({success: false, message:err.errors.gender.message});
				}else if(err.errors.newUser) {
					res.json({success: false, message:err.errors.newUser.message});
				}
			} else {
				usrl.pwd = "";
				var token = jwt.sign({data: usrl}, secret, { expiresIn: '24h' });
				res.json({success: true, user: usrl, token: token});
			}
		})
	}
	else {
		res.json({success: false, message:"Request empty"});
	}
});

router.post('/user/login', function(req,res){
	user.findOne({email: req.body.email, pwd: req.body.pwd}).exec(function(err, usr){
		if(err) {
			res.json({success: false, message: "Login failed!"});
		} else if (usr) {
			usr.pwd = "";
			var token = jwt.sign({data: usr}, secret, { expiresIn: '24h' });
			res.json({user: usr, token: token});
		}
	})
});

router.post('/user/profilePic', upload.any(), function (req, res, next) {
	console.log(req.files);
	res.json(req.files);
});

router.post('/article', function(req,res){
	if(req.body) {
		var articl = new article();
		articl.articleHeader = req.body.articleHeader;
		articl.articleBody = req.body.articleBody;
		articl.byUserId = req.body.byUserId;
		articl.additionDate = new Date();
		
		articl.save(function(err, atcl){
			if(err) {
				res.json({success: false, message: "Unable to post article"});
			} else {
				res.json(atcl);
			}
		})
	}
	else {
		res.send("Enter value");
	}
});

router.post('/pic', function(req,res){
	if(req.body) {
		var pc = new pic();
		pc.picCaption = req.body.picCaption;
		pc.picPath = req.body.picPath;
		pc.byUserId = req.body.byUserId;
		pc.additionDate = new Date();
		
		pc.save(function(err, p){
			if(err) {
				res.json({success: false, message: "Unable to post pic"});
			} else {
				res.json(p);
			}
		})
	}
	else {
		res.send("Enter value");
	}
});

router.post('/comment', function(req,res){
	console.log(req.body);
	if(req.body) {
		if(req.body.articleHeader) {
			post = article;
		}else {
			post = pic;
		}
		var cmnt = new comment();
		cmnt.comment = req.body.comment;
		cmnt.byUserId = req.body.commentBy;
		cmnt.additionDate = new Date();
		
		if(req.body.replyTo) {
			cmnt.replyTo = req.body.replyTo;
		}
		
		cmnt.save(function(err, cmt){
			if(err) {
				res.json({success: false, message: "Unable to post comment"});
			} else {
				console.log(cmt);
				//res.json(cmt);
				post.findByIdAndUpdate(req.body._id,
				{
					$push: {
						comments: cmt._id
					}
				},
				{
					new: true,
					returnOriginal:false,
				},
				function(err, artcl){
					if(err) {
						res.json({success: false, message: "Unable to post comment"});
					} else {
						res.json(cmt);
					}
				})
			}
		})
	}
	else {
		res.json({success: false, message: "Empty body"});
	}
});

//********* PUT REQUESTS **********

router.put('/user/profilePicSave', function(req,res){
	if(req.body) {
		user.findByIdAndUpdate(req.body.userId,
		{
			$set: {
				profilePicFileName: req.body.profilePicName,
				profilePicModifiedDate: new Date(),
				newUser: false,
			}
		},
		{
			new: true,
			returnOriginal:false,
		},
		function(err, usr){
			if(err) {
				res.json({success: false, message: "Unable to save Profile Pic"});
			} else {
				res.json(usr);
			}
		})
	}
	else {
		res.json({success: false, message: "Empty body"});
	}
});

router.put('/article/toggleLike', function(req,res){
	console.log(req.body);
	if(req.body.articleHeader) {
		post = article;
	}else {
		post = pic;
	}
	if(req.body.liked) {
		var likedByUser = req.body.likedBy;
		post.findByIdAndUpdate(req.body._id,
		{
			$push: {
				likes: likedByUser
			}
		},
		{
			new: true,
			returnOriginal:false,
		},
		function(err, artcl){
			if(err) {
				res.json({success: false, message: "Unable to like the post"});
			} else {
				res.json(artcl);
			}
		})
	}
	else {
		var likedByUser = req.body.likedBy;
		post.findByIdAndUpdate(req.body._id,
		{
			$pull: {
				likes: likedByUser
			}
		},
		{
			multi: true,
			new: true,
		},
		function(err, artcl){
			if(err) {
				res.json({success: false, message: "Unable to post comment"});
			} else {
				res.json(artcl);
			}
		})
	}
});

router.put('/user/:id', function(req,res){
	user.findByIdAndUpdate(req.params.id,
	{
		$set: {
			newUser: req.body.newUser
		}
	},
	{
		new: true,
	},
	function(err, usr){
		if(err) {
			res.json({success: false, message: "Unable to update user"});
		} else {
			res.json(usr);
		}
	})
});

//********* DELETE REQUESTS **********

router.delete('/user/:id', function(req,res){
	user.findByIdAndRemove(req.params.id).exec(function(err, usr){
		if(err) {
			res.json({success: false, message: "Unable to delete user"});
		} else {
			res.json(usr);
		}
	})
});

router.use(function(req,res,next){
	var token = req.body.token || req.body.query || req.headers["x-access-token"];
	if(token){
		jwt.verify(token, secret, function(err, decoded) {
			if(err) {
				res.json({success: false, message: "Token invalid"});
			} else {
				req.decoded = decoded;
				next();
			}
		})
	} else {
		res.json({success: false, message: "No token provided"});
	}
});

router.post('/me', function (req, res) {
	res.json({user: req.decoded, success: true});
});

module.exports = router;