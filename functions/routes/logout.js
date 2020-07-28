const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');

const handlePost = async (event, context, callback) => {
    callback(null, {
        statusCode: 200,
    });
};

exports.handler = routerConfig({
    POST: handlePost,
});
