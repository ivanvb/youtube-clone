const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const number = event.queryStringParameters.n;
    const offset = event.queryStringParameters.page;
    let higherBound = number * offset;
    let lowerBound = higherBound - number;

    const user = await User.findById(id);
    const videos = user.uploadedVideos.reverse();
    let result = [];
    if (higherBound > videos.length) {
        higherBound = videos.length;
    }
    for (let i = lowerBound; i < higherBound; i++) {
        result.push(await Video.findById(videos[i]));
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
    });
};

exports.handler = routerConfig({
    GET: handleGet,
});
