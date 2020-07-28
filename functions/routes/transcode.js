const { routerConfig } = require('../util/router');
const elasticTranscoder = require('../util/aws/ElasticTranscoder');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const result = await elasticTranscoder.transcode(body.fileName);
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
    });
};

exports.handler = routerConfig({
    POST: handlePost,
});
