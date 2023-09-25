import { createHash } from "../../../utils/hashPassword.js";
import { randomBytes } from "crypto";
import { RecoverPassModels } from "../mongoose/recover-pass.models.js";
import userModel from "../mongoose/users.models.js";

class RecoverPass {
  async create({ email }) {
    const code = randomBytes(20).toString("hex");
    const expire = Date.now() + 3600000;
    const result = await RecoverPassModels.create({
      email,
      code,
      expire,
    });
    return result;
  }
  async checkCode({ code, email }) {
    let result = false;
    const codeCheck = await RecoverPassModels.findOne({ code, email }, {});
    if (codeCheck.expire > Date.now()) {
      result = true;
    }

    return result;
  }
  async updatePassword({ email, newPassword }) {
    const passwordHashed = createHash(newPassword);
    const result = await userModel.findOneAndUpdate(
      { email: email },
      { password: passwordHashed }
    );
    return result;
  }
}
export const RPServices = new RecoverPass();
