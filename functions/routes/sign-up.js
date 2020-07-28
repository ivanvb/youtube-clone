const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');
var gravatar = require('gravatar');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const params = {
        email: body.email,
        name: body.name,
        username: body.username,
        videos: 0,
        uploadedVideos: [],
        subscriptions: [],
        likes: [],
        dislikes: [],
        subscribers: 0,
        imageUrl: gravatar.url(body.email),
    };
    try {
        await auth.signUp(body.email, body.password);
        let databaseUser = await User.create(params);
        let token = await auth.getUserToken();
        callback(null, {
            statusCode: 200,
            body: JSON.stringify({ user: databaseUser._doc, token }),
        });
    } catch (err) {
        callback(null, {
            statusCode: 400,
            error: err.code,
        });
    }
};

exports.handler = routerConfig({
    POST: handlePost,
});
