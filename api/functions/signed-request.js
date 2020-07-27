const { routerConfig } = require('../router');
const s3 = require('../../util/aws/s3');

const handlePost = async (req, res) => {
	s3.getSignedUrl(req, res);
};

module.exports = routerConfig({
	POST: handlePost,
});
