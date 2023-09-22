const dataSource = require('../dataSource');
const { LisintgQueryBuilder } = require('./listingQueryBuilder');

const getListingsWithQueryBuilder = async (
  limit,
  offset,
  sortMethod,
  filterOptions
) => {
  const filterQuery = new LisintgQueryBuilder(
    limit,
    offset,
    sortMethod,
    filterOptions
  ).build();

  const listings = dataSource.query(
    `
    SELECT *
    FROM listings l
    ${filterQuery}
    `
  );

  return listings;
};

const getListingsWithoutQueryBuilder = async (
  limit,
  offset,
  sortMethod,
  filterOptions
) => {
  let sql = `
    SELECT *
    FROM listings l
  `;

  let whereClauses = [];

  if (filterOptions.listingTypeId) {
    const listingTypeIds = `(${filterOptions.listingTypeId.join(',')})`;

    whereClauses.push(`l.listing_type_id IN ${listingTypeIds}`);
  }

  if (whereClauses.length != 0) {
    sql += `
      WHERE ${whereClauses.join(' AND ')}
    `;
  }

  if (sortMethod) {
    sql += `
      ORDER BY ${sortMethod}
    `;
  }

  if (limit) {
    sql += `
      LIMIT ${limit} 
    `;
  }

  if (offset) {
    sql += `
      OFFSET ${offset}
    `;
  }

  console.log(sql);

  return await dataSource.query(sql);
};

module.exports = {
  getListingsWithQueryBuilder,
  getListingsWithoutQueryBuilder,
};
