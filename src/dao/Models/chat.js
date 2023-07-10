import mongoose from "mongoose";

const chatsCollection = "chats";

const chatSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const chatModel = mongoose.model(chatsCollection, chatSchema);
export default chatModel;
