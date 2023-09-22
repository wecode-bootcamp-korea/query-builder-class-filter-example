const { catchAsync } = require('../utils/error');
const { listingService } = require('../services');

const getListingsWithQueryBuilder = catchAsync(async (req, res) => {
  const result = await listingService.getListingsWithQueryBuilder(req.query);
  res.status(200).json(result);
});

const getListingsWithoutQueryBuilder = catchAsync(async (req, res) => {
  const result = await listingService.getListingsWithoutQueryBuilder(req.query);

  res.status(200).json(result);
});

module.exports = {
  getListingsWithQueryBuilder,
  getListingsWithoutQueryBuilder,
};
