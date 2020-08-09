import { Model, Document, Types } from "mongoose";

export interface ILocation extends Document {
  centerLatitude: number; // To be used to fetch user's closest location
  centerLongitude: number;
  name: string;
  _id: Types.ObjectId;
  created?: Date;
  modified?: Date;
};

export interface ILocationDocument extends ILocation {
  setModified: (this: ILocationDocument) => Promise<void>;
};

// TODO Statics "find nearest"
