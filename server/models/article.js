const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
	articleHeader: {type: String, required: true},
	articleBody: {type: String, required: true},
	byUserId: {type: Schema.Types.ObjectId, required: true, ref: 'user'},
	additionDate: {type: Date, required: true},
	likes: [{type: Schema.Types.ObjectId, ref: 'user'}],
	comments : [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model('articles', articlesSchema, 'ArticlesInfo');