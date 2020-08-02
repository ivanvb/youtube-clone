const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (req, res) => {
	const id = req.query.id;
	const number = req.query.n;
	const offset = req.query.page;
	let higherBound = number * offset;
	let lowerBound = higherBound - number;

	const user = await User.findById(id);
	const videos = user.likes.reverse();
	let result = {
		Videos: [],
	};
	if (higherBound > videos.length) {
		higherBound = videos.length;
	}
	for (let i = lowerBound; i < higherBound; i++) {
		result.Videos.push(await Video.findById(videos[i]).populate('uploadingUser'));
	}
	res.send(result);
};

module.exports = routerConfig({
	GET: handleGet,
});
