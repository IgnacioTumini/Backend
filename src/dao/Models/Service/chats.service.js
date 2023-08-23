import messageModel from "../mongoose/chat.models.js";

export default class Chat {
  constructor() {}
  getAll = async () => {
    let chat = await messageModel.find().lean();
    return chat;
  };

  saveChat = async (chat) => {
    let result = await messageModel.create(chat);
    return result;
  };
}
