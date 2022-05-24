const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
	try {
		const authToken = req.headers.authorization;
		if (authToken) {
			const token = authToken.split(" ")[1];

			if (token) {
				jwt.verify(token, process.env.SECRET, (err, payload) => {
					if (err) {
						res.status(404).json({
							message: err.message,
						});
					} else {
						req.user = payload;
						next();
					}
				});
			} else {
				res.status(404).json({
					message: "please check your token",
				});
			}
		} else {
			res.status(404).json({
				message: "you don't have the right token",
			});
		}
	} catch (err) {
		res.status(404).json({
			message: err.message,
		});
	}
};
