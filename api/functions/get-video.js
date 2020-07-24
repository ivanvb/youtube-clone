const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (req, res) => {
	const id = req.query.id;
	const video = await Video.findById(id).populate('uploadingUser');

	res.send(video);
};

module.exports = routerConfig({
	GET: handleGet,
});
