const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePost = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const id = body.id;
    await Video.findByIdAndUpdate(id, {
        $inc: { views: 1 },
    });
    callback(null, {
        statusCode: 200,
        body: JSON.stringify({ ok: 'ok' }),
    });
};

exports.handler = routerConfig({
    POST: handlePost,
});
