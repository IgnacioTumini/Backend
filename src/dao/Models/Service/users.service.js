import { isValidPassword } from "../../../config.js";
import userModel from "../mongoose/users.models.js";

class User {
  getAll = async () => {
    let users = await userModel.find().populate("cid.carts");
    return users.map((user) => user.toObject());
  };

  getOne = async (username) => {
    const user = await userModel.findOne(
      { username: username },
      { password: true }
    );
    return user;
  };

  //getBy
  getBy = async (param) => {
    let result = await userModel.findOne(param).populate("cid.carts").lean();
    return result;
  };
  getUserById = async (id) => {
    const user = await userModel.findById({ _id: id });
    return user;
  };
  getEmail = async (email) => {
    const user = await userModel.findOne({ email: email }, {});
    return user;
  };

  //create
  create = async (user) => {
    let result = await userModel.create(user);

    return result;
  };
  delete = async (id) => {
    const result = await userModel.deleteOne({ _id: id });
    return result;
  };

  update_connection = async (id) => {
    const result = await userModel.updateOne(
      { _id: id },
      { last_connection: Date.now() }
    );
    return result;
  };

  updateUser = async (id, user) => {
    delete user._id;
    let result = await userModel.updateOne({ _id: id }, { $set: user });
    return result;
  };
  updateRole = async (uid) => {
    const user = await this.getUserById(uid);
    if (user) {
      if (user.role === "admin") {
        return { message: "no podes modificar tu rol, sos admin" };
      } else {
        if (user.role === "premium") {
          let result = await userModel.findOneAndUpdate(
            { _id: uid },
            { role: "user" }
          );
          return result;
        } else {
          let result = await userModel.findOneAndUpdate(
            { _id: uid },
            { role: "premium" }
          );
          return result;
        }
      }
    }
  };
  deleteInactive = async () => {
    const now = new Date();
    const twoDaysAgo = new Date(now - 2 * 24 * 60 * 60 * 1000);

    const result = await userModel.deleteMany({
      last_connection: { $lt: twoDaysAgo },
      role: { $ne: "admin" },
    });
    return result;
  };

  authentication = async (username, password) => {
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
  };
}

export const UServices = new User();
