import { IPostDocument, IPostModel } from "./posts.types";

export async function findAll(
  this: IPostModel
): Promise<IPostDocument[]> {
  return this.find();
};
