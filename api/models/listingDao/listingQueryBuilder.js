class LisintgQueryBuilder {
  constructor(limit, offset, sortMethod, filterOptions) {
    this.limit = limit;
    this.offset = offset;
    this.sortMethod = sortMethod;
    this.filterOptions = filterOptions;
  }

  listingTypeIdFilterBuilder(listingTypeIds) {
    return `l.listing_type_id IN (${listingTypeIds})`;
  }

  orderByBuilder() {
    return `ORDER BY l.${this.sortMethod}`;
  }

  limitBuilder() {
    return `LIMIT ${this.limit}`;
  }

  offsetBuilder() {
    return `OFFSET ${this.offset}`;
  }

  buildWhereClause() {
    const builderSet = {
      listingTypeId: this.listingTypeIdFilterBuilder,
    };

    const whereClauses = Object.entries(this.filterOptions).map(
      ([key, value]) => builderSet[key](value)
    );

    if (whereClauses.length != 0) {
      return `WHERE ${whereClauses.join(' AND ')}`;
    }
  }

  build() {
    const filterQuery = [
      this.buildWhereClause(),
      this.orderByBuilder(),
      this.limitBuilder(),
      this.offsetBuilder(),
    ];

    return filterQuery.join(' ');
  }
}

module.exports = { LisintgQueryBuilder };
