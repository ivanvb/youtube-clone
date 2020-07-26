const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');

const handleGet = async (req, res) => {
    const number = Number(req.query.n);
    const offset = Number(req.query.page);

    const result = await Video.find()
        .limit(number)
        .skip(offset * number - number)
        .sort({ uploadDate: -1 })
        .populate('uploadingUser');

    let a = Object.keys(result).map((key) => result[key]);
    res.send({ videos: a });
};

module.exports = routerConfig({
    GET: handleGet,
});
