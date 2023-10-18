
import { dropCarts } from "./setup.config.js";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Carts router test case", async () => {
  before(async () => {
    await dropCarts();
  });
  it("[GET] /api/carts -get all carts", async () => {});
  it("[GET] /api/carts/:cid -get a cart for id", async () => {});
  it("[GET] /api/carts/:cid/purchase -get generate purchase", async () => {});
  it("[POST] /api/carts -post create a cart", async () => {});
  it("[POST] /api/carts/:cid/product/:pid -post add product to cart", async () => {});
  it("[DELETE] /api/carts/:cid -delete cart for id", async () => {});
  it("[DELETE] /api/carts/:cid/product/:pid -delete product in to the cart", async () => {});
});
