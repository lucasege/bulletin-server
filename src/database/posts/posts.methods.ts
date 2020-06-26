import { IPostDocument } from "./posts.types";

export async function setModified(this: IPostDocument):
  Promise<void> {
  const now = new Date();
  if (!this.modified || this.modified < now) {
    this.modified = now;
    await this.save();
  }
};
