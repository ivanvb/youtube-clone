const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');
var gravatar = require('gravatar');

const handlePost = async (req, res) => {
    const params = {
        email: req.body.email,
        name: req.body.name,
        username: req.body.username,
        videos: 0,
        uploadedVideos: [],
        subscriptions: [],
        likes: [],
        dislikes: [],
        subscribers: 0,
        imageUrl: gravatar.url(req.body.email),
    };
    try {
        await auth.signUp(req.body.email, req.body.password);
        let databaseUser = await User.create(params);
        let token = await auth.getUserToken();
        res.send({ user: databaseUser._doc, token: token });
    } catch (err) {
        res.status(400);
        res.send({ error: err.code });
    }
};

module.exports = routerConfig({
    POST: handlePost,
});
