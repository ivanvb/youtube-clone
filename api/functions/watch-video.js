const { routerConfig } = require('../router');
const Video = require('../../util/mongoose/models/Video');

const handlePost = async (req, res) => {
	const id = req.body.id;
	await Video.findByIdAndUpdate(id, {
		$inc: { views: 1 },
	});
	res.send('felicidades tu video lo vieron una vez mas okurrr');
};

module.exports = routerConfig({
	POST: handlePost,
});
