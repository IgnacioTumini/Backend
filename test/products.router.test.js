import { expect } from "chai";
import { dropProducts } from "./setup.config.js";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Products router test case", () => {
  before(async () => {
    await dropProducts();
  });

  it("[POST] /api/product -new product", async () => {
    const mockProduct = {
      title: "title test",
      description: "description test",
      price: "price test",
      thumbnail: "thumbnail test",
      code: "code test",
      stock: "stock test",
      category: "category test",
      owner: "owner test",
    };
    const response = await requester.post("/api/product").send(mockProduct);

    expect(response.statusCode).to.be.eql(200);
    expect(response.body.payload.adopted).to.be.eql(false);
    expect(response.body.payload._id).to.be.ok;
  });
  it("[GET] /api/product -get all Products", async () => {});
  it("[GET] /api/product/:pid -get one product for id", async () => {});
  it("[PUT] /api/product/:id -put update product for id", async () => {});
  it("[DELETE] /api/product/:id -delete product for id", async () => {});
});
