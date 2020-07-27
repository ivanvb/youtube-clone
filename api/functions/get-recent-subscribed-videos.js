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
	const videos = user.subscriptions.reverse();
	let x = [];

	videos.forEach(async element => {
		let user = await User.findById(element);
		let videos = user.uploadedVideos.reverse();
		videos.forEach(async element => {
			x.push(await Video.findById(element));
		});
	});
	let result = x.sort(function (a, b) {
		return new Date(b.uploadDate) - new Date(a.uploadDate);
	});

	if (higherBound > result.length) {
		higherBound = result.length;
	}
	result = result.slice(lowerBound, higherBound);

	res.send(result);
};

module.exports = routerConfig({
	GET: handleGet,
});
