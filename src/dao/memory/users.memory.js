export default class UserMemory {
  constructor() {
    this.users = [];
  }

  async getAll() {
    try {
      return this.users;
    } catch (e) {
      throw e;
    }
  }

  async getOne(username) {
    const user = this.users.find((user) => user.username === username);
    return user;
  }
  //cambiar a memory
  async getUserById(id) {
    const user = this.users.find((user) => user._id === id);
    return user;
  }
  async create({ first_name, last_name, username, email, age, password, cid }) {
    const userCreated = {
      _id: Date.now(),
      first_name,
      last_name,
      username,
      email,
      age,
      password,
      cid,
    };
    this.users.push(userCreated);

    return userCreated;
  }
  async delete(id) {
    const searchedProduct = this.users.find((user) => user._id == id);
    if (searchedProduct === undefined) {
      return false;
    } else {
      this.users = this.users.filter((user) => user._id != id);

      return true;
    }
  }

  async auth(username, password) {
    try {
      const user = this.getOne(username);
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
export const userMemory = new UserMemory();
