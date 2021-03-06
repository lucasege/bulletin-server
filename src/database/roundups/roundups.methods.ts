import { IRoundupDocument } from "./roundups.types";

export async function setModified(this: IRoundupDocument):
  Promise<void> {
  const now = new Date();
  if (!this.modified || this.modified < now) {
    this.modified = now;
    await this.save();
  }
};
