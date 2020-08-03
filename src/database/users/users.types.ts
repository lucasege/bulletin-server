import { Model, Document, Types } from "mongoose";

// TODO add location storage
export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  nonce: string;
  appleUserString: string;
  appleAuthorizationCode: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;
};

export interface IUserDocument extends IUser {
  setLastUpdated: (this: IUserDocument) => Promise<void>;
};

export interface IUserModel extends Model<IUserDocument> {
  findUser(
    this: IUserModel,
    appleUserString: String,
  ): Promise<IUserDocument>;
};
