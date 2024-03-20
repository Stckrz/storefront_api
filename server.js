require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection


database.on("error", (error) => {
	console.log(error)

})

database.once('connected', () => {
	console.log("database connected")
})


const app = express();
app.use(express.json());
app.use(cors());

const UserRouter = require('./routes/user-routes');
app.use('/user', UserRouter)

const SaleItemsRouter = require('./routes/sale-item-routes');
app.use('/sale-items', SaleItemsRouter)

const CommentsRouter = require('./routes/comment-routes');
app.use('/comments', CommentsRouter)


app.use('/public/images', express.static(__dirname + '/public/images'));
// app.use('/images', express.static('images'))


app.listen(5000, () => {
	console.log("listening on port 5000")
})
