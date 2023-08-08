import userModel from "../Models/users.models";
import { isValidPassword } from "../../utils";

export default class User {
  async getAll() {
    try {
      const user = await userModel.find(
        {},
        {
          __v: false,
        }
      );
      return user;
    } catch (e) {
      throw e;
    }
  }
  async getOne(username) {
    const user = await userModel.findOne(
      { username: username },
      { password: true }
    );
    return user;
  }
  async getUserById(id) {
    const user = await userModel.findById({ _id: id });
    return user;
  }
  async create({ first_name, last_name, username, email, age, password, cid }) {
    const userCreated = await userModel.create({
      first_name,
      last_name,
      username,
      email,
      age,
      password,
      cid,
    });
    return userCreated;
  }
  async delete(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  }
  async update(id, firstName, lastName, email) {
    const userUptaded = await userModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }

  async authentication(username, password) {
    try {
      const user = await userModel.findOne({
        username: username,
      });
      if (user && isValidPassword(password, user.password)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw error;
    }
  }
}
export const userModel = new User();
