const { listingDao } = require('../models/listingDao');

const getListingsWithQueryBuilder = async (params) => {
  const {
    limit = 10,
    offset = 0,
    sortMethod = 'price',
    ...filterOptions
  } = params;

  return await listingDao.getListingsWithQueryBuilder(
    limit,
    offset,
    sortMethod,
    filterOptions
  );
};

const getListingsWithoutQueryBuilder = async (params) => {
  const {
    limit = 10,
    offset = 0,
    sortMethod = 'price',
    ...filterOptions
  } = params;

  return await listingDao.getListingsWithoutQueryBuilder(
    limit,
    offset,
    sortMethod,
    filterOptions
  );
};

module.exports = {
  getListingsWithQueryBuilder,
  getListingsWithoutQueryBuilder,
};
