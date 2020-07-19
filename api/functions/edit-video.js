const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePatch = async (req, res) => {
	const id = req.body.id;
	const body = req.body.body;

	await Video.findByIdAndUpdate(id, body);
	res.send('Edited Succesfully');
};

module.exports = routerConfig({
	PATCH: handlePatch,
});
