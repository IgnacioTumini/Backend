import chatModel from "../Models/chat.js";

export default class Chat {
  constructor() {
    console.log("trabajando con chat de mongo");
  }
  getAll = async () => {
    let chat = await chatModel.find().lean();
    return chat;
  };

  saveChat = async (chat) => {
    let result = await chatModel.create(chat);
    return result;
  };
}
