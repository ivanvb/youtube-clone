const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const User = require('../util/mongoose/models/User');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const result = await Video.create(body);

    await User.findByIdAndUpdate(result.uploadingUser, {
        $push: { uploadedVideos: result._id },
    });

    callback(null, {
        statusCode: 200,
        body: JSON.stringify(result),
    });
};

exports.handler = routerConfig({
    POST: handlePost,
});
