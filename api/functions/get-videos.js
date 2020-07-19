const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (req, res) => {
	const number = Number(req.query.n);
	const offset = Number(req.query.page);

	const result = await Video.find().limit(number).skip(offset).sort({ uploadDate: -1 });
	res.send(result);
};

module.exports = routerConfig({
	GET: handleGet,
});
