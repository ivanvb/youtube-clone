var gravatar = require('gravatar');

exports.url = email => {
	return gravatar.url(req.body.email);
};
