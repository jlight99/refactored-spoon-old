const jwt = require('jsonwebtoken');
const config = require('./config.js');

var checkToken = (req, res, next) => {
	console.log("checking token..");
	console.log(req.headers);
	//console.log(res);
	let token = req.headers['x-access-token'] || req.headers['authorization'];
	if (token && token.startsWith('Bearer ')) {
		console.log("starts with bearer");
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
				console.log("decoded");
				console.log(decoded);
				next();
			}
		});
	} else {
		return res.json({
			success: false,
			message: 'Auth token is not supplied'
		});
	}
};

module.exports = {
	checkToken: checkToken
}
