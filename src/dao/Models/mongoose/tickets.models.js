import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketSchema = mongoose.Schema({
  code: { type: String, required: true, max: 100 },
  purchase_datetime: { type: String, required: true, max: 100 },
  amount: { type: String, required: true, max: 100 },
  purcharser: { type: String, required: true, max: 100 },
});

const ticketModel = mongoose.model(ticketsCollection, ticketSchema);
export default ticketModel;
