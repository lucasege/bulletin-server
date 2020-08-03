import { model } from "mongoose";
import { INotificationDocument } from "./notifications.types";
import NotificiationSchema from "./notifications.schema";

export const NotificationModel = model<INotificationDocument>("notification", NotificiationSchema);
