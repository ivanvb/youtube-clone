const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    let results = {
        Token: '',
        User: {},
    };

    try {
        const email = await auth.login(body.email, body.password);
        let token = await auth.getUserToken();

        if (token !== null) {
            results.token = token;
        }
        results.user = await User.findOne({ email: email }).populate('uploadedVideos');
        callback(null, {
            statusCode: 200,
            body: JSON.stringify(results),
        });
    } catch (err) {
        callback(null, {
            statusCode: 400,
            body: JSON.stringify({ error: err }),
        });
    }
};

exports.handler = routerConfig({
    POST: handlePost,
});
