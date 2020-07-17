const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePost = async (req, res) => {
	const result = await Video.create(req.body);
	res.send(result);
};

module.exports = routerConfig({
	POST: handlePost,
});
