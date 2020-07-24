const mongoose = require('mongoose');
require('dotenv').config();
require('../connection');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: { type: String, unique: true },
	name: String,
	username: { type: String, unique: true },
	videos: String,
	uploadedVideos: { type: [mongoose.Schema.Types.ObjectId], ref: 'video' },
	subscriptions: { type: [mongoose.Schema.Types.ObjectId], ref: 'user' },
	likes: { type: [mongoose.Schema.Types.ObjectId], ref: 'video' },
	dislikes: { type: [mongoose.Schema.Types.ObjectId], ref: 'video' },
	subscribers: Number,
	imageUrl: String,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
