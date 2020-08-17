import { Model, Document, Types } from "mongoose";

export interface IPost extends Document {
  latitude: number;
  longitude: number;
  authorFirstName: string;
  authorLastName: string;
  authorId: Types.ObjectId; // Foreign key to Users collection
  headline: string;
  published: boolean;
  promptResponses: string[];
  _id: Types.ObjectId;
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
