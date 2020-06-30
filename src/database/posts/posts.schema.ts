import { Schema, Types } from "mongoose";
import { findAll } from "./posts.statics";
import { setModified } from "./posts.methods";

const PostSchema = new Schema({
  title: String,
  body: String,
  authorFirstName: String,
  authorLastName: String,
  latitude: Number,
  longitude: Number,
  authorId: Types.ObjectId,
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
