import { Schema } from "mongoose";
import { setModified } from "./notifications.methods";

const NotificationSchema = new Schema({
  userId: String,
  deviceId: String,
  apnToken: String,
});

NotificationSchema.methods.setModified = setModified;

export default NotificationSchema;
