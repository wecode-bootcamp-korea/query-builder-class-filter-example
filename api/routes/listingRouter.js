const express = require('express');

const { listingController } = require('../controllers');

const router = express.Router();

router.get('', listingController.getListingsWithQueryBuilder);
router.get(
  '/without-query-builder',
  listingController.getListingsWithoutQueryBuilder
);

module.exports = router;
