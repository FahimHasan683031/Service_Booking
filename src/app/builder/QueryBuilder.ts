import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public queryModel: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(queryModel: Query<T[], T>, query: Record<string, unknown>) {
    this.queryModel = queryModel;
    this.query = query;
  }

  // searching
  search(searchableFields: string[]) {
    if (this?.query?.searchTerm) {
      this.queryModel = this.queryModel.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: {
                $regex: this.query.searchTerm,
                $options: 'i',
              },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  // filtering
  filter() {
    const queryObj = { ...this.query };
    const excludeFields = ['searchTerm', 'sort', 'page', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    const andConditions: FilterQuery<T>[] = [];

    // Price range filtering
    if ('minPrice' in queryObj || 'maxPrice' in queryObj) {
      const priceRange: Record<string, number> = {};
      if (queryObj.minPrice) priceRange.$gte = Number(queryObj.minPrice);
      if (queryObj.maxPrice) priceRange.$lte = Number(queryObj.maxPrice);
      andConditions.push({ price: priceRange } as FilterQuery<T>);
      delete queryObj.minPrice;
      delete queryObj.maxPrice;
    }

    // Average rating filtering
    if ('minRating' in queryObj) {
      andConditions.push({
        averageRating: { $gte: Number(queryObj.minRating) },
      } as FilterQuery<T>);
      delete queryObj.minRating;
    }

    // Add all other query filters
    if (Object.keys(queryObj).length) {
      andConditions.push(queryObj as FilterQuery<T>);
    }

    if (andConditions.length > 0) {
      this.queryModel = this.queryModel.find({ $and: andConditions });
    }

    return this;
  }

  // sorting
  sort() {
    let sort = (this?.query?.sort as string) || '-createdAt';
    this.queryModel = this.queryModel.sort(sort);
    return this;
  }

  // pagination
  paginate() {
    let limit = Number(this?.query?.limit) || 10;
    let page = Number(this?.query?.page) || 1;
    let skip = (page - 1) * limit;
    this.queryModel = this.queryModel.skip(skip).limit(limit);
    return this;
  }

  // fields filtering
  fields() {
    let fields =
      (this?.query?.fields as string)?.split(',').join(' ') || '-__v';
    this.queryModel = this.queryModel.select(fields);
    return this;
  }

  // populating
  populate(populateFields: string[], selectFields: Record<string, unknown>) {
    this.queryModel = this.queryModel.populate(
      populateFields.map(field => ({
        path: field,
        select: selectFields[field],
      }))
    );
    return this;
  }

  // pagination information
  async getPaginationInfo() {
    const total = await this.queryModel.model.countDocuments(
      this.queryModel.getFilter()
    );
    const limit = Number(this?.query?.limit) || 10;
    const page = Number(this?.query?.page) || 1;
    const totalPage = Math.ceil(total / limit);

    return {
      total,
      limit,
      page,
      totalPage,
    };
  }
}

export default QueryBuilder;
