const express = require("express");
const router = express.Router()
const SaleItemModel = require('../models/sale-item');
const { isLoggedIn } = require('../middleware/middleware');

//get all sale-items
router.get('/getAll/', async (req, res) => {
	try {
		const data = await SaleItemModel.find();
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
});

//get all sale-items of a specific category
router.get('/getAllByCategory/:category', async (req, res) => {
	const category = req.params.category;
	try {
		const data = await SaleItemModel.find({ "category": category })
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

router.get('/getOneByString/:string', async (req, res) => {
	const string = req.params.string
	try {
		const data = await SaleItemModel.find({ "name": {$regex: string, $options: "i"} })
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

//get one sale-item by id
router.get('/getOne/:id', async (req, res) => {
	const id = req.params.id
	try {
		const data = await SaleItemModel.findById(id)
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

//delete one sale-item by id
router.delete('/delete/:id', async (req, res) => {
	const id = req.params.id
	try {
		const data = await SaleItemModel.findByIdAndDelete(id)
		res.json(data)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

//post a new sale-item
router.post('/post/', async (req, res) => {
	const data = new SaleItemModel({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		category: req.body.category,
		image_url: req.body.image_url,
	})

	try {
		const dataToSave = await data.save();
		res.status(200).json(dataToSave)
	}
	catch (error) {
		res.status(400).json({ message: error.message })
	}
})

module.exports = router
