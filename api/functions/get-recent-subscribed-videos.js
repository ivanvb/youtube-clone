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
	const subscriptions = user.subscriptions.reverse();
	const videosCount = [];
	const videosInfo = [];

	for (let i = 0; i < subscriptions.length; i++) {
		let users = await User.findById(subscriptions[i]);
		videosCount.push(users.uploadedVideos.reverse());
	}
	console.log(videosCount);

	for (let i = 0; i < videosCount.length; i++) {
		for (let j = 0; j < videosCount[i].length; j++) {
			videosInfo.push(await Video.findById(videosCount[i][j]).populate('uploadingUser'));
		}
	}
	console.log(videosInfo);
	let result = videosInfo.sort(function (a, b) {
		return new Date(b.uploadDate) - new Date(a.uploadDate);
	});
	console.log('after sorting:');
	console.log(result);
	if (higherBound > result.length) {
		higherBound = result.length;
	}
	result = result.slice(lowerBound, higherBound);
	let y = { Videos: [] };
	y.Videos = result;

	res.send(y);
};

module.exports = routerConfig({
	GET: handleGet,
});
