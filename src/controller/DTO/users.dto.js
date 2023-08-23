export default class UsersDTO {
  constructor(users) {
    this.firstName = users.firstName;
    this.lastName = users.lastName;
    this.age = users.age;
    this.email = users.email;
    this.password = users.password;
    this.role = users.role;
    this.cid = users.cid;
    this.purchase_made = users.purchase_made;
  }
}
