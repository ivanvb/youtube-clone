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
	const users = user.subscriptions.reverse();
	let x = [];

	console.log('Initial users are:');
	console.log(users);

	users.forEach(async element => {
		let user = await User.findById(element);
		let videos = user.uploadedVideos.reverse();
		console.log('videos for user are:');
		console.log(videos);
		videos.forEach(async element => {
			x.push(await Video.findById(element));
		});
	});
	console.log('after finding videos:');
	console.log(x);
	let result = x.sort(function (a, b) {
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
