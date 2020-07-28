const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');

const handleGet = async (event, context, callback) => {
    const id = event.queryStringParameters.id;
    const user = await User.findById(id).populate('uploadedVideos');

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),
    });
};

exports.handler = routerConfig({
    GET: handleGet,
});
