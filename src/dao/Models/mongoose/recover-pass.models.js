import { Schema, model } from "mongoose";

const recoverCodeSchema = new Schema({
  email: { type: String, required: true, max: 100 },
  code: { type: String, required: true, max: 100 },
  expire: { type: Number, required: true },
});
export const RecoverPassModels = model("recover-code", recoverCodeSchema);
