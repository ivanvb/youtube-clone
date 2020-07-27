const { routerConfig } = require('../router');
const auth = require('../../util/firebase/auth');
const User = require('../../util/mongoose/models/User');
const gravatar = require('../../util/gravatar');

const handlePost = async (req, res) => {
	const action = req.body.action;
	if (action === 'login') {
		let results = {
			Token: '',
			User: {},
		};
		try {
			const email = await auth.login(req.body.email, req.body.password);
			let token = await auth.getUserToken();

			if (token !== null) {
				results.token = token;
			}
			results.user = await User.findOne({ email: email }).populate('uploadedVideos');
			res.send(results);
		} catch (err) {
			res.status(400);
			res.send({ error: err.code });
		}
	} else if (action === 'logout') {
		res.send(await auth.logout());
	} else if (action === 'sign-up') {
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
			imageUrl: gravatar.url(req.body.email),
		};
		try {
			await auth.signUp(req.body.email, req.body.password);
			let databaseUser = await User.create(params);
			let token = await auth.getUserToken();
			res.send({ user: databaseUser._doc, token: token });
		} catch (err) {
			res.status(400);
			res.send({ error: err.code });
		}
	}
};

module.exports = routerConfig({
	POST: handlePost,
});
