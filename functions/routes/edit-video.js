const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePatch = async (event, context, callback) => {
    const body = JSON.parse(event.body);
    const id = body.id;
    const updated = body.body;

    await Video.findByIdAndUpdate(id, updated);
    callback(null, {
        statusCode: 200,
    });
};

exports.handler = routerConfig({
    PATCH: handlePatch,
});
