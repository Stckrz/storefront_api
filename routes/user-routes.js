require('dotenv').config()
const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET = 'secret' } = process.env;

const UserModel = require('../models/user');


//create user
router.post('/register', async (req, res) => {
	try {
		//hash password
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const user = await UserModel.create(req.body);
		res.json(user);
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
});

router.post('/login', async (req, res) => {
	try {
		const user = await UserModel.findOne({ username: req.body.username });
		if (user) {
			//compares the given password to the stored password
			const result = await bcrypt.compare(req.body.password, user.password)
			if (result) {
				const token = jwt.sign({ username: user.username }, SECRET);
				res.json({
					username: user.username,
					token
				})

			} else {
				res.status(400).json({ message: "password does not match" })
			}

		} else {
			res.status(400).json({ message: "user does not exist" })
		}
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = router
