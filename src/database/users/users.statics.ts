import { IUserDocument, IUserModel } from "./users.types";

export async function findUser(
  this: IUserModel,
  appleUserString: string,
): Promise<IUserDocument[]> {
  return this.find({ appleUserString: appleUserString });
};
