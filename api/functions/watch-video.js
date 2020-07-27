const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePost = async (req, res) => {
    const id = req.body.id;
    await Video.findByIdAndUpdate(id, {
        $inc: { views: 1 },
    });
    res.send({ ok: 'ok' });
};

module.exports = routerConfig({
    POST: handlePost,
});
