const express = require('express');
const router = express.Router()

const commentRouter = require('./comment.routes,js')

router.use('/comment', commentRouter)







module.exports = router;