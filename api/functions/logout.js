const { routerConfig } = require('../util/router');
const auth = require('../util/firebase/auth');

const handlePost = async (req, res) => {
	res.send(await auth.logout());
};

module.exports = routerConfig({
	POST: handlePost,
});
