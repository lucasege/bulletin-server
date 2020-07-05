import { Schema, Types } from "mongoose";
import { findAll } from "./posts.statics";
import { setModified } from "./posts.methods";

const PostSchema = new Schema({
  promptResponses: [String],
  latitude: Number,
  longitude: Number,
  authorFirstName: String,
  authorLastName: String,
  authorId: Types.ObjectId,
  published: Boolean,
  created: {
    type: Date,
    default: new Date()
  },
  modified: {
    type: Date,
    default: new Date()
  }
});

PostSchema.statics.findAll = findAll;

PostSchema.methods.setModified = setModified;

export default PostSchema;
