import { expect } from "chai";
import { dropUser } from "./setup.config.js";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Session router test case", async function () {
  before(async () => {
    await dropUser();
  });
  it("[POST] /api/session/register - crear un usuario exitosamente", async function () {
    await dropUser();

    const mockUser = {
      first_name: "Firsto",
      last_name: "Lasto",
      age: "18",
      email: "lasto@mailo.com",
      password: "test",
    };

    const response = await requester
      .post("/api/sessions/register")
      .send(mockUser);

    expect(response.statusCode).to.be.equal(200);
  });

  it("[POST] /api/session/login - loguear un usuario exitosamente", async function () {
    const mockUserCredentials = {
      email: "lasto@mailo.com",
      password: "test",
    };
    const response = await requester
      .post("/api/sessions/login")
      .send(mockUserCredentials);

    const cookieHeader = response.headers["set-cookie"][0];
    // console.log(cookieHeader)
    // expect(response.statusCode).to.be.equal(200)
    expect(cookieHeader).to.be.ok;
  });
});
