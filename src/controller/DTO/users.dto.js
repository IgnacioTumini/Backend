export default class UsersDTO {
  constructor(user) {
    this.firstName = user.first_Name;
    this.lastName = user.last_Name;
    this.age = user.age;
    this.email = user.email;
    this.role = user.role;
  }
}
