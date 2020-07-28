const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const video = await Video.findById(id).populate('uploadingUser');

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(video),
    });
};

exports.handler = routerConfig({
    GET: handleGet,
});
