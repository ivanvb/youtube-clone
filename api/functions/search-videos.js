const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const User = require('../util/mongoose/models/User');
const { off } = require('../util/mongoose/models/User');

const handleGet = async (req, res) => {
	let result = {
		Videos: [],
		Users: [],
	};
	const key = req.query.key;
	var number = Number(req.query.n);
	const offset = Number(req.query.page);
	const regex = new RegExp(key);
	let higherBound = number * offset;
	let lowerBound = higherBound - number;

	if (offset === 0) {
		const matchingUsers = await User.findOne({ username: key });
		if (matchingUsers !== null) {
			result.Users.push(matchingUsers);
			number -= 1;
		} else {
			delete result.Users;
		}
	} else {
		delete result.Users;
	}

	//Get Videos from different sources
	let matchingVideos = await Video.find({ title: key })
		.limit(15 * offset)
		.sort({ uploadDate: -1 })
		.populate('uploadingUser');

	let containingVideos = await Video.find({ title: regex })
		.limit(15 * offset)
		.sort({ uploadDate: -1 })
		.populate('uploadingUser');

	let tagVideos = await Video.find({ tags: key })
		.limit(15 * offset)
		.sort({ uploadDate: -1 })
		.populate('uploadingUser');

	result.Videos = matchingVideos.concat(containingVideos, tagVideos);

	//Remove Video Duplicates
	let temp = [];
	console.log(result.Videos.length);

	for (let i = 0; i < result.Videos.length; i++) {
		if (i === 0) {
			temp.push(result.Videos[i]);
		} else {
			let found = false;
			for (let j = 0; j < temp.length; j++) {
				if (JSON.stringify(result.Videos[i]._id) === JSON.stringify(temp[j]._id)) {
					found = true;
					break;
				}
			}
			if (!found) {
				temp.push(result.Videos[i]);
			}
		}
	}

	if (higherBound > temp.length) {
		higherBound = temp.length;
	}
	temp = temp.slice(lowerBound, higherBound);
	result.Videos = temp;

	res.send(result);
};

module.exports = routerConfig({
	GET: handleGet,
});
