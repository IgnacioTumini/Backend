import usersModel from "../Models/users.js";

export default class Users {
  constructor() {
    console.log("trabajando con mongo");
  }
  getAll = async () => {
    let users = await usersModel.find().lean();
    return users;
  };
  saveUser = async (user) => {
    let result = await usersModel.create(user);
    return result;
  };
}
