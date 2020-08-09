import { ILocationDocument } from "./locations.types";

export async function setModified(this: ILocationDocument): Promise<void> {
  const now = new Date();
  if (!this.modified || this.modified < now) {
    this.modified = now;
    await this.save();
  }
};
