const { routerConfig } = require('../util/router');
const Video = require('../util/mongoose/models/Video');
const User = require('../util/mongoose/models/User');

const handlePost = async (req, res) => {
	const action = req.body.action;
	const userId = req.body.user;
	const videoId = req.body.video;

	if (action === 'like') {
		await Video.findByIdAndUpdate(videoId, {
			$inc: { likes: 1 },
		});
		await User.findByIdAndUpdate(userId, {
			$push: { likes: videoId },
		});
		res.send('Liked Succesfully');
	} else if (action === 'unlike') {
		await Video.findByIdAndUpdate(videoId, {
			$inc: { likes: -1 },
		});
		await User.findByIdAndUpdate(userId, {
			$pull: { likes: videoId },
		});
		res.send('Unliked Succesfully');
	} else if (action === 'dislike') {
		const user = await User.findById(userId);
		if (user.likes.includes(videoId)) {
			await Video.findByIdAndUpdate(videoId, {
				$inc: { likes: -1 },
			});
			await User.findByIdAndUpdate(userId, {
				$pull: { likes: videoId },
			});
		}

		await Video.findByIdAndUpdate(videoId, {
			$inc: { dislikes: 1 },
		});
		await User.findByIdAndUpdate(userId, {
			$push: { dislikes: videoId },
		});
		res.send('Disliked Succesfully');
	} else if (action === 'undislike') {
		await Video.findByIdAndUpdate(videoId, {
			$inc: { dislikes: -1 },
		});
		await User.findByIdAndUpdate(userId, {
			$pull: { dislikes: videoId },
		});
		res.send('Undisliked Succesfully');
	} else {
		res.send('Error');
	}
};

module.exports = routerConfig({
	POST: handlePost,
});
