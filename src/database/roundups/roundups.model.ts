import { model } from "mongoose";
import { IRoundupDocument } from "./roundups.types";
import RoundupSchema from "./roundups.schema";

export const RoundupModel = model<IRoundupDocument>("roundup", RoundupSchema);
