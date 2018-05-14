const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentsSchema = new Schema({
	comment: {type: String, required: true},
	byUserId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
	additionDate: {type: Date, required: true},
	replyTo: {type: Schema.Types.ObjectId, ref: 'comment'},
	
});

module.exports = mongoose.model('comment', commentsSchema, 'CommentsInfo');