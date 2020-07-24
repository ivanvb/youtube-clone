const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const User = require('../util/mongoose/models/User');

const handlePost = async (req, res) => {
	const result = await Video.create(req.body);

	await User.findByIdAndUpdate(result.uploadingUser, {
		$push: { uploadedVideos: result._id },
	});

	res.send(result);
};

module.exports = routerConfig({
	POST: handlePost,
});
