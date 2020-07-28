const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');
const jwt = require('jsonwebtoken');

const handlePost = async (event, context, callback) => {
    console.log(event);
    const body = JSON.parse(event.body);
    console.log(body);
    const token = body.token;
    const decoded = jwt.decode(token);
    let found = await User.findOne({ email: decoded.email }).populate({
        path: 'uploadedVideos',
        model: 'video',
    });
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ ...found._doc }),
    });
};

exports.handler = routerConfig({
    POST: handlePost,
});
