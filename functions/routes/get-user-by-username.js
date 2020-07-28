const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');

const handleGet = async (event, context, callback) => {
    const username = event.queryStringParameters.username;
    const user = await User.findOne({ username: username }).populate({
        path: 'uploadedVideos',
        model: 'video',
    });
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),
    });
};

exports.handler = routerConfig({
    GET: handleGet,
});
