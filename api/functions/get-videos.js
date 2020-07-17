const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (req, res) => {
	const result = await Video.find();
	res.send(result);
};

module.exports = routerConfig({
	GET: handleGet,
});
