import { Model, Document } from "mongoose";

export interface IUser extends Document {
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
