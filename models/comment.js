const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	rating: {
		type: Number
	},
	created_on: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model("Comment", CommentSchema) 