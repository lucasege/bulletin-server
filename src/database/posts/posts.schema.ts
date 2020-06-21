import { Schema } from "mongoose";
import { findAll } from "./posts.statics";
import { setLastUpdated } from "./posts.methods";

const PostSchema = new Schema({
  title: String,
  content: String,
  dateOfEntry: {
    type: Date,
    default: new Date()
  },
  lastUpdated: {
    type: Date,
    default: new Date()
  }
});

PostSchema.statics.findAll = findAll;

PostSchema.methods.setLastUpdated = setLastUpdated;

export default PostSchema;
