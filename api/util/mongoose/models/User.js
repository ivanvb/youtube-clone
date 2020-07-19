const mongoose = require('mongoose');
require('../connection');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: String,
	name: String,
	username: String,
	videos: String,
	uploadedVideos: { type: [mongoose.Schema.Types.ObjectID], ref: 'video' },
	subscriptions: { type: [mongoose.Schema.Types.ObjectID], ref: 'user' },
	likes: { type: [mongoose.Schema.Types.ObjectID], ref: 'video' },
	dislikes: { type: [mongoose.Schema.Types.ObjectID], ref: 'video' },
	subscribers: Number,
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
