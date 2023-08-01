import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt, { genSaltSync } from "bcrypt";

export const createHast = (password) =>
  bcrypt.hashSync(password, genSaltSync(10));
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
