import { Schema } from "mongoose";
import { findUser } from "./users.statics";
import { setLastUpdated } from "./users.methods";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  nonce: String,
  appleUserString: String,
  appleAuthorizationCode: String,
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});

UserSchema.statics.findUser = findUser;

UserSchema.methods.setLastUpdated = setLastUpdated;

export default UserSchema;
