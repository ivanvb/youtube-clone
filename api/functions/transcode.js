const { routerConfig } = require('../util/router');
const elasticTranscoder = require('../util/aws/ElasticTranscoder');

const handlePost = async (req, res) => {
	const result = await elasticTranscoder.transcode(req.body.fileName);
	res.send(result);
};

module.exports = routerConfig({
	POST: handlePost,
});
