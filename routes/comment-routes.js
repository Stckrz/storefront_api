const express = require("express");
const router = express.Router();
const CommentModel = require('../models/comment');
const { isLoggedIn } = require('../middleware/middleware');



module.exports = router
