const jwt = require('jsonwebtoken');
const config = require('./config.js');

var checkToken = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token && token.startsWith('Bearer ')) {
		token = token.slice(7, token.length);
	}

	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				console.log("error while verifying token");
				console.log(err);
				return res.json({
					success: false,
					message: 'Token is not valid'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		return res.json({
			success: false,
			message: 'Auth token is not supplied',
			userId: decoded.userId
		});
	}
};

module.exports = {
	checkToken: checkToken
}
