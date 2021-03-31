import {
  CallbackError,
  Document,
  FilterQuery,
  Model,
  QueryOptions,
} from 'mongoose';

export class BaseRepository<T extends Document> {
  constructor(protected readonly _model: Model<T>) {}

  get model() {
    return this._model;
  }
  public async find(...params: any[]): Promise<any> {
    const data = await this._model.find(...params);

    return data;
  }

  public async findOne(...params: any[]): Promise<any> {
    const data = await this._model.findOne(...params);

    return data;
  }

  public async findById(
    id: any,
    projection?: any | null,
    options?: QueryOptions | null,
    callback?: (err: CallbackError, doc: any) => void,
  ): Promise<any> {
    const data = await this._model.findById(id, projection, options, callback);

    return data;
  }

  public async create(...params: any[]): Promise<any> {
    const data = await this._model.create(...params);

    return data;
  }

  public async updateOne(...params: any[]): Promise<any> {
    const data = await this._model.updateOne(...params);

    return data;
  }

  public async updateMany(...params: any[]): Promise<any> {
    const data = await this._model.updateMany(...params);

    return data;
  }

  public async deleteMany(...params: any[]): Promise<any> {
    const data = await this._model.deleteMany(...params);

    return data;
  }

  public async deleteOne(...params: any[]): Promise<any> {
    const data = await this._model.deleteOne(...params);

    return data;
  }

  public async findPaginated(
    query: FilterQuery<T>,
    page: number,
    limit: number,
    sortQuery: FilterQuery<T> = {},
  ) {
    const users = await this.model
      .find(query)
      .sort(sortQuery)
      .limit(limit)
      .skip((page - 1) * limit);

    const totalCount = await this.model.count(query);

    const pageCount = Math.ceil(totalCount / limit);

    return {
      data: users,
      totalCount,
      pageCount,
      page,
      limit,
    };
  }
}
