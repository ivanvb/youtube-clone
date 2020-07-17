const { routerConfig } = require('../util/router');
const s3 = require('../util/aws/s3');

const handlePost = async (req, res) => {
	console.log(req.body.fileName);
	console.log(req.body.fileType);
	s3.getSignedUrl(req, res);
};

module.exports = routerConfig({
	POST: handlePost,
});
