const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');
const jwt = require('jsonwebtoken');

const handlePost = async (req, res) => {
    const token = req.body.token;
    const decoded = jwt.decode(token);
    let found = await User.findOne({ email: decoded.email }).populate({
        path: 'uploadedVideos',
        model: 'video',
    });
    res.send({ ...found._doc });
};

module.exports = routerConfig({
    POST: handlePost,
});
