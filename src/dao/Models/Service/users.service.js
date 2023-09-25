import { isValidPassword } from "../../../config.js";
import userModel from "../mongoose/users.models.js";

class User {
  getAll = async () => {
    let users = await userModel.find().populate("cid.carts");
    return users.map((user) => user.toObject());
  };
  async getOne(username) {
    const user = await userModel.findOne(
      { username: username },
      { password: true }
    );
    return user;
  }
  //getBy
  getBy = async (param) => {
    let result = await userModel.findOne(param).populate("cid.carts").lean();
    return result;
  };
  async getUserById(id) {
    const user = await userModel.findById({ _id: id });
    return user;
  }
  async getEmail(email) {
    const user = await userModel.findOne({ email: email }, {});
    return user;
  }
  //create
  create = async (user) => {
    let result = await userModel.create(user);

    return result;
  };
  async delete(id) {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  }
  updateUser = async (id, user) => {
    delete user._id;
    let result = await userModel.updateOne({ _id: id }, { $set: user });
    return result;
  };

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

export const UServices = new User();
