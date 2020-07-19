const mongoose = require('mongoose');
const Video = require('./Video');
require('../connection');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: String, // String is shorthand for {type: String}
	name: String,
	username: String,
	videos: String,
	uploadedVideos: [Video],
	subscriptions: [User],
	likes: [Video],
	dislikes: [Video],
	subscribers: Number,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
