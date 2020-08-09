import { Schema } from "mongoose";
import { setModified } from "./locations.methods";

const LocationSchema = new Schema({
  centerLatitude: Number,
  centerLongitude: Number,
  name: String,
  created: {
    type: Date,
    default: new Date()
  },
  modified: {
    type: Date,
    default: new Date()
  }
});

LocationSchema.methods.setModified = setModified;

export default LocationSchema;
