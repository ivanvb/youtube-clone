const jwt = require('jsonwebtoken');

exports.decode = token => {
	return jwt.decode(token);
};
