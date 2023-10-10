import mongoose from "mongoose";
import { UServices } from "../../src/dao/Models/Service/users.service.js";
import Assert from "assert";

mongoose.connect(
  "mongodb+srv://Ignacio:11199@ecommerce.4f71s0k.mongodb.net/?retryWrites=true&w=majority"
);

describe("Testing Users Service", () => {
  before(function () {
    this.usersService = UServices;
  });

  beforeEach(function () {
    this.timeout(5000);
    mongoose.connection.collections.users.drop();
  });

  it("El dao debe devolver los usuarios en formato de arreglo.", async function () {
    //Given
    console.log(this.usersService);
    Assert.ok(this.usersService);
    const isArray = true;
    //When

    //Then
    const result = await this.usersService.getAll();
    console.log(result);
    //Assert
    Assert.strictEqual(Array.isArray(result), isArray);
  });

  it("El dao debe devolver un usuario creado", async function () {
    //Given
    let mockUser = {
      first_name: "manu",
      last_name: "forne",
      email: "manu@gmail.com",
      age: "23",
      password: "1234",
    };
    //When

    //Then
    const result = await this.usersService.create(mockUser);
    console.log(result);
    //Assert
    Assert.ok(result._id);
  });
});
