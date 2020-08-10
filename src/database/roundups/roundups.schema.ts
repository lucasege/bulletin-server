import { Schema, Types } from "mongoose";
import { setModified } from "./roundups.methods";

const RoundupSchema = new Schema({
  locationId: Types.ObjectId,
  name: String,
  creatorId: Types.ObjectId,
  audioUrl: String,
  created: {
    type: Date,
    default: new Date()
  },
  modified: {
    type: Date,
    default: new Date()
  }
});

RoundupSchema.methods.setModified = setModified;

export default RoundupSchema;
