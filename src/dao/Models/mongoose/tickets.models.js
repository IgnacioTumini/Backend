import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = mongoose.Schema({
  code: { type: String, max: 100 },
  purchase_datetime: { type: String, max: 100 },
  amount: { type: Number, max: 100 },
  purcharser: { type: String, max: 100 },
});

const ticketModel = mongoose.model(ticketsCollection, ticketSchema);
export default ticketModel;
