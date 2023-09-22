const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const listingRouter = require('./listingRouter');

router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/listings', listingRouter);

module.exports = router;
