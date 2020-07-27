const { routerConfig } = require('../router');
const Video = require('../../util/mongoose/models/Video');
const User = require('../../util/mongoose/models/User');
const s3 = require('../../util/aws/s3');
const { USER_LOADING } = require('../../src/redux/user/user.types');

const handleGet = async (req, res) => {
	if (req.query.videoId) {
		const id = req.query.videoId;
		const video = await Video.findById(id).populate('uploadingUser');

		console.log(video);
		res.send(video);
	} else if (req.query.userId) {
		const id = req.query.userId;
		const number = req.query.n;
		const offset = req.query.page;
		let higherBound = number * offset;
		let lowerBound = higherBound - number;

		const user = await User.findById(id);
		const videos = user.uploadedVideos.reverse();
		let result = [];
		if (higherBound > videos.length) {
			higherBound = videos.length;
		}
		for (let i = lowerBound; i < higherBound; i++) {
			result.push(await Video.findById(videos[i]));
		}
		res.send(result);
	} else {
		const number = Number(req.query.n);
		const offset = Number(req.query.page);

		const result = await Video.find()
			.limit(number)
			.skip(offset * number - number)
			.sort({ uploadDate: -1 })
			.populate('uploadingUser');

		let a = Object.keys(result).map(key => result[key]);
		res.send({ videos: a });
	}
};

const handleDelete = async (req, res) => {
	const id = req.query.id;
	const query = await Video.findByIdAndDelete(id);
	console.log(query);
	//s3 object deletion code
	s3.deleteVideoFolder(id, res);
};

const handlePost = async (req, res) => {
	const result = await Video.create(req.body);

	await User.findByIdAndUpdate(result.uploadingUser, {
		$push: { uploadedVideos: result._id },
	});

	res.send(result);
};

const handlePatch = async (req, res) => {
	const id = req.body.id;
	const body = req.body.body;

	await Video.findByIdAndUpdate(id, body);
	res.send('Edited Succesfully');
};

module.exports = routerConfig({
	GET: handleGet,
	POST: handlePost,
	DELETE: handleDelete,
	PATCH: handlePatch,
});
