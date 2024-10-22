class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // 1A) Filtering
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lte)\b/g,
      (match) => `$${match}`,
    );

    // Normal Filtering Query
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
      // sort ('price ratingsAverage')
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitfields() {
    // 3) Fields limiting
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
