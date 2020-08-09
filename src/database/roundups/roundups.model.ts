import { model } from "mongoose";
import { IRoundupDocument, IRoundupModel } from "./roundups.types";
import RoundupsSchema from "./roundups.schema";

export const RoundupModel = model<IRoundupDocument>("roundup", RoundupSchema);
