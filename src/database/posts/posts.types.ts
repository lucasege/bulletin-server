import { Model, Document, Types } from "mongoose";

export interface IPost extends Document {
  _id: Types.ObjectId;
  title: string;
  body: string;
  authorFirstName: string;
  authorLastName: string;
  latitude: number;
  longitude: number;
  authorId: Types.ObjectId; // Foreign key to Users collection
  created?: Date;
  modified?: Date;
};

export interface IPostDocument extends IPost {
  setModified: (this: IPostDocument) => Promise<void>;
};

export interface IPostModel extends Model<IPostDocument> {
  findAll(
    this: IPostModel
  ): Promise<IPostDocument[]>;
};
