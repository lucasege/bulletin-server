import { Model, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
};

export interface IPostDocument extends IPost {
  setLastUpdated: (this: IPostDocument) => Promise<void>;
};

export interface IPostModel extends Model<IPostDocument> {
  findAll(
    this: IPostModel
  ): Promise<IPostDocument[]>;
};
