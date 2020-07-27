const { routerConfig } = require('../router');
const User = require('../../util/mongoose/models/User');
const jwt = require('../../util/jwt');

const handleGet = async (req, res) => {
	if (req.query.id) {
		const id = req.query.id;
		const user = await User.findById(id).populate('uploadedVideos');
		res.send(user);
	} else if (req.query.username) {
		const username = req.query.username;
		const user = await User.findOne({ username: username }).populate({
			path: 'uploadedVideos',
			model: 'video',
		});
		res.send(user);
	}
};

const handlePost = async (req, res) => {
	const token = req.body.token;
	const decoded = jwt.decode(token);
	let found = await User.findOne({ email: decoded.email }).populate({
		path: 'uploadedVideos',
		model: 'video',
	});
	res.send({ ...found._doc });
};
module.exports = routerConfig({
	GET: handleGet,
	POST: handlePost,
});
