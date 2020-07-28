const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const action = body.action;
    const loggedUserId = body.loggedUser;
    const creatorId = body.creator;

    if (action === 'subscribe') {
        await User.findByIdAndUpdate(creatorId, {
            $inc: { subscribers: 1 },
        });
        await User.findByIdAndUpdate(loggedUserId, {
            $push: { subscriptions: creatorId },
        });
        callback(null, {
            statusCode: 200,
        });
    } else if (action === 'unsubscribe') {
        await User.findByIdAndUpdate(creatorId, {
            $inc: { subscribers: -1 },
        });
        await User.findByIdAndUpdate(loggedUserId, {
            $pull: { subscriptions: creatorId },
        });
        callback(null, {
            statusCode: 200,
        });
    } else {
        callback(null, {
            statusCode: 400,
        });
    }
};

exports.handler = routerConfig({
    POST: handlePost,
});
