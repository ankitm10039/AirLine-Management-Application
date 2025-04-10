class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // 1) Build the filter object
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // 2) Advanced filtering for operators like gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    
    // 3) Handle special date range filters
    const parsedQuery = JSON.parse(queryStr);
    
    // Handle departureTimeGte and departureTimeLte
    if (parsedQuery.departureTimeGte) {
      parsedQuery.departureTime = { ...parsedQuery.departureTime, $gte: parsedQuery.departureTimeGte };
      delete parsedQuery.departureTimeGte;
    }
    
    if (parsedQuery.departureTimeLte) {
      parsedQuery.departureTime = { ...parsedQuery.departureTime, $lte: parsedQuery.departureTimeLte };
      delete parsedQuery.departureTimeLte;
    }
    
    // Handle arrivalTimeGte and arrivalTimeLte
    if (parsedQuery.arrivalTimeGte) {
      parsedQuery.arrivalTime = { ...parsedQuery.arrivalTime, $gte: parsedQuery.arrivalTimeGte };
      delete parsedQuery.arrivalTimeGte;
    }
    
    if (parsedQuery.arrivalTimeLte) {
      parsedQuery.arrivalTime = { ...parsedQuery.arrivalTime, $lte: parsedQuery.arrivalTimeLte };
      delete parsedQuery.arrivalTimeLte;
    }
    
    // Handle search across multiple fields
    if (parsedQuery.search) {
      const searchRegex = new RegExp(parsedQuery.search, 'i');
      parsedQuery.$or = [
        { flightNumber: searchRegex },
        { origin: searchRegex },
        { destination: searchRegex },
        { aircraftType: searchRegex },
        { notes: searchRegex }
      ];
      delete parsedQuery.search;
    }
    
    // Handle comma-separated status values
    if (parsedQuery.status && parsedQuery.status.includes(',')) {
      const statusValues = parsedQuery.status.split(',');
      parsedQuery.status = { $in: statusValues };
    }

    this.query = this.query.find(parsedQuery);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by departureTime
      this.query = this.query.sort('departureTime');
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // Exclude __v field by default
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;