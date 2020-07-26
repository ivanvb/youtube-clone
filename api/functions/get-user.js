const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');

const handleGet = async (req, res) => {
    const id = req.query.id;
    const user = await User.findById(id).populate('uploadedVideos');

    res.send(user);
};

module.exports = routerConfig({
    GET: handleGet,
});
