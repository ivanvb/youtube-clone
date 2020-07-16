const mongoose = require('mongoose');
require('../connection');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
	title: String,
	description: String,
	tags: [String],
	likes: Number,
	dislikes: Number,
	length: Number,
	uploadDate: new Date(),
	views: Number,
});

const Video = mongoose.model('video', VideoSchema);

module.exports = Video;
