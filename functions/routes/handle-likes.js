const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const User = require('../util/mongoose/models/User');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const action = body.action;
    const userId = body.user;
    const videoId = body.video;

    if (action === 'like') {
        console.log(action, userId, videoId);
        await Video.findByIdAndUpdate(videoId, {
            $inc: { likes: 1 },
        });
        await User.findByIdAndUpdate(userId, {
            $push: { likes: videoId },
        });
        callback(null, {
            statusCode: 200,
        });
    } else if (action === 'unlike') {
        await Video.findByIdAndUpdate(videoId, {
            $inc: { likes: -1 },
        });
        await User.findByIdAndUpdate(userId, {
            $pull: { likes: videoId },
        });
        callback(null, {
            statusCode: 200,
        });
    } else if (action === 'dislike') {
        const user = await User.findById(userId);
        if (user.likes.includes(videoId)) {
            await Video.findByIdAndUpdate(videoId, {
                $inc: { likes: -1 },
            });
            await User.findByIdAndUpdate(userId, {
                $pull: { likes: videoId },
            });
        }

        await Video.findByIdAndUpdate(videoId, {
            $inc: { dislikes: 1 },
        });
        await User.findByIdAndUpdate(userId, {
            $push: { dislikes: videoId },
        });
        callback(null, {
            statusCode: 200,
        });
    } else if (action === 'undislike') {
        await Video.findByIdAndUpdate(videoId, {
            $inc: { dislikes: -1 },
        });
        await User.findByIdAndUpdate(userId, {
            $pull: { dislikes: videoId },
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
