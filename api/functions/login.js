const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');

const handlePost = async (req, res) => {
	let results = {
		Token: '',
		User: {},
	};
	const email = await auth.login(req.body.email, req.body.password);
	let token = await auth.getUserToken();

	if (token !== null) {
		results.Token = token;
	}
	results.User = await User.findOne({ email: email }).populate('uploadedVideos');
	res.send(results);
};

module.exports = routerConfig({
	POST: handlePost,
});
