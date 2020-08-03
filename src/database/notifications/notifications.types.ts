import { Document, Types } from "mongoose";

export interface INotification extends Document {
  userId: Types.ObjectId;
  deviceId: string;
  apnToken: string;
  created?: Date;
  modified?: Date;
};

export interface INotificationDocument extends INotification {
  setModified: (this: INotificationDocument) => Promise<void>;
};
