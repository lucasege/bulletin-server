import { model } from "mongoose";
import { ILocationDocument, ILocationModel } from "./locations.types";
import LocationSchema from "./locations.schema";

export const LocationModel = model<ILocationDocument, ILocationModel>("location", LocationSchema);
