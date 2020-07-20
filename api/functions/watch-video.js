const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handlePost = async (req, res) => {
    const id = req.query.id;
    await Video.findByIdAndUpdate(id, {
        $inc: { views: 1 },
    });
    res.send('felicidades tu video lo vieron una vez mas okurrr')
};

module.exports = routerConfig({
	GET: handlePost,
});