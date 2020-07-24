const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');
const User = require('../util/mongoose/models/User');
const jwt = require('jsonwebtoken');

const handlePost = async (req, res) => {
    const token = req.body.token;
    const decoded = jwt.decode(token);
    res.send((await User.findOne({ email: decoded.email })).populate('uploadedVideos'));
};

module.exports = routerConfig({
    POST: handlePost,
});
