import { model } from "mongoose";
import { ILocationDocument } from "./locations.types";
import LocationSchema from "./locations.schema";

export const LocationModel = model<ILocationDocument>("location", LocationSchema);
