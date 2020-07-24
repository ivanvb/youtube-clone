const mongoose = require('mongoose');
require('dotenv').config();
require('../connection');
require('./User');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
	title: String,
	description: String,
	tags: [String],
	likes: Number,
	dislikes: Number,
	length: Number,
	uploadDate: Date,
	views: Number,
	uploadingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const Video = mongoose.model('video', VideoSchema);

module.exports = Video;
