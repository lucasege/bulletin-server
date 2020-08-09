import { Document, Types } from "mongoose";

export interface IRoundup extends Document {
  locationId: Types.ObjectId,
  name: string,
  creatorId: Types.ObjectId,
  created?: Date;
  modified?: Date;
};

export interface IRoundupDocument extends IRoundup {
  setModified: (this: IRoundupDocument) => Promise<void>;
};
