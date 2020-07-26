const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');

const handleGet = async (req, res) => {
    const username = req.query.username;
    const user = await User.findOne({ username: username }).populate('uploadedVideos');
    res.send(user);
};

module.exports = routerConfig({
    GET: handleGet,
});
