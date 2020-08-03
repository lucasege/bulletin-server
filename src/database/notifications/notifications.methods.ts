import { INotificationDocument } from "./notifications.types";

export async function setModified(this: INotificationDocument): Promise<void> {
  const now = new Date();
  if (!this.modified || this.modified < now) {
    this.modified = now;
    await this.save();
  }
};
