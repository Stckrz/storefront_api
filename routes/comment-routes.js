const express = require("express");
const router = express.Router();
const CommentModel = require('../models/comment');
const { isLoggedIn } = require('../middleware/middleware');

router.post('/post/', async (req, res) => {
	const data = new CommentModel({
		author: req.body.author,
		body: req.body.body,
		rating: req.body.rating,
		sale_item_id: req.body.sale_item_id
	})

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.get('/getAll', async (req, res) => {
	try {
		const data = await CommentModel.find()
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.get('/findBySaleItem/:id', async (req, res) => {
	const saleid = req.params.id;
	try {
		const data = await CommentModel.find({ "sale_item_id": saleid })
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.get('/findOne/:id', async (req, res) => {
	const id = req.params.id
	try {
		const data = await CommentModel.findOne(id)
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.delete('/delete/:id', async (req, res) => {
	const id = req.params.id
	try {
		const data = await CommentModel.findOneAndDelete(id)
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = router
