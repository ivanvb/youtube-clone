const { routerConfig } = require('../util/router');
const s3 = require('../util/aws/s3');

const handlePost = async (event, context, callback) => {
    s3.getSignedUrl(event, context, callback);
};

exports.handler = routerConfig({
    POST: handlePost,
});
