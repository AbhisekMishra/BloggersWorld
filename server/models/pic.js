const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const picsSchema = new Schema({
	picCaption: {type: String, required: true},
	picPath: {type: String, required: true},
	byUserId: {type: Schema.Types.ObjectId, ref: 'user'},
	additionDate: {type: Date, required: true},
	likes: [{type: Schema.Types.ObjectId, ref: 'user'}],
	comments : [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

module.exports = mongoose.model('pic', picsSchema, 'PicsInfo');