require("dotenv").config();
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
	try {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(" ")[1];
			if (token) {
				const payload = await jwt.verify(token, process.env.SECRET);
				if (payload) {
					req.user = payload;
					next();
				} else {
					res.status(400).json({ error: "token verification failed" })
				}
			} else {
				res.status(400).json({ error: "malformed auth header" })
			}
		} else {
			res.status(400).json({ error: "no authorization header" })
		}
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
};

module.exports = {
	isLoggedIn
};
