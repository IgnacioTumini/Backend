import { faker } from "@faker-js/faker";

export const productsFaker = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.image.url(),
    code: faker.string.numeric(10),
    stock: faker.string.numeric(1),
  };
};
