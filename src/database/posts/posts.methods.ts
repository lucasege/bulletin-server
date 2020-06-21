import { IPostDocument } from "./posts.types";

export async function setLastUpdated(this: IPostDocument):
  Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
};
