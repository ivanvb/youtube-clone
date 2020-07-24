const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');

const handlePost = async (req, res) => {
	const params = {
		email: req.body.email,
		name: req.body.name,
		username: req.body.username,
		videos: 0,
		uploadedVideos: [],
		subscriptions: [],
		likes: [],
		dislikes: [],
		subscribers: 0,
	};
	await auth.signUp(req.body.email, req.body.password);

	res.send(await User.create(params));
};

module.exports = routerConfig({
	POST: handlePost,
});
