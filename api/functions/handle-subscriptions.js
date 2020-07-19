const { routerConfig } = require('../util/router');
const User = require('../util/mongoose/models/User');

const handlePost = async (req, res) => {
	const action = req.body.action;
	const loggedUserId = req.body.loggedUser;
	const creatorId = req.body.creator;

	if (action === 'subscribe') {
		await User.findByIdAndUpdate(creatorId, {
			$inc: { subscribers: 1 },
		});
		await User.findByIdAndUpdate(loggedUserId, {
			$push: { subscriptions: creatorId },
		});
		res.send('Subscribed Succesfuly');
	} else if (action === 'unsubscribe') {
		await User.findByIdAndUpdate(creatorId, {
			$inc: { subscribers: -1 },
		});
		await User.findByIdAndUpdate(loggedUserId, {
			$pull: { subscriptions: creatorId },
		});
		res.send('Unsubscribed Succesfuly');
	} else {
		res.send('Error');
	}
};

module.exports = routerConfig({
	POST: handlePost,
});
