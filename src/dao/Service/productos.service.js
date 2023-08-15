import productsModel from "../Models/products.models.js";

export default class Products {
  constructor() {}
  getAll = async (queryParams) => {
    const { limit = 10, page = 1, sort, category, stock } = queryParams;

    let result = await productsModel.paginate(
      {},
      { limit: limit, page: page, sort: sort, category: category, stock: stock }
    );
    const products = result.docs;
    const response = {
      status: "success",
      msg: "listado de Productos",
      payload: {
        products: products,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        prevPageURL: result.prevPage
          ? `http://localhost:8080/products?page=${result.prevPage}`
          : null,
        nextPageURL: result.nextPage
          ? `http://localhost:8080/products?page=${result.nextPage}`
          : null,
        prevPageApi: result.prevPage
          ? `http://localhost:8080/api/products?page=${result.prevPage}`
          : null,
        nextPageApi: result.nextPage
          ? `http://localhost:8080/api/products?page=${result.nextPage}`
          : null,
      },
    };
    if (limit) {
      if (response.payload.prevPage) {
        response.payload.prevPageURL += `&limit=${limit}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&limit=${limit}`;
      }
    }
    if (category) {
      if (response.payload.prevPage) {
        response.payload.prevPageURL += `&category=${category}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&category=${category}`;
      }
      response.payload.products = response.payload.products.filter(
        (product) => product.category === category
      );
    }

    if (stock) {
      if (response.payload.prevPageURL) {
        response.payload.prevPageURL += `&stock=${stock}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&stock=${stock}`;
      }

      if (stock == "asc") {
        response.payload.products = response.payload.products.sort(
          (a, b) => a.stock - b.stock
        );
      } else if (stock == "des") {
        response.payload.products = response.payload.products.sort(
          (a, b) => b.stock - a.stock
        );
      }
    }
    if (sort) {
      if (response.payload.prevPage) {
        response.payload.prevPageURL += `&sort=${sort}`;
      }
      if (response.payload.nextPage) {
        response.payload.nextPageURL += `&sort=${sort}`;
      }
      if (sort == "asc") {
        response.payload.products = response.payload.products.sort(
          (a, b) => a.price - b.price
        );
      } else if (sort == "des") {
        response.payload.products = response.payload.products.sort(
          (a, b) => b.price - a.price
        );
      }
    }
    return response;
    /*let products = await productsModel.find().lean();
    return products;*/
  };
  async getProductRealTime() {
    const products = await productsModel.find(
      {},
      {
        __v: false,
      }
    );

    return products;
  }

  async create({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  }) {
    const productCreated = await productsModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
    return productCreated;
  }
  async getProductById(pid) {
    const producById = await productsModel.findOne(
      { _id: pid },
      {
        __v: false,
      }
    );

    return producById._doc;
  }
  async update(id, title, description, price, thumbnail, code, stock) {
    const userUptaded = await productsModel.updateOne(
      { _id: id },
      { title, description, price, thumbnail, code, stock }
    );
    return userUptaded;
  }
  async delete(id) {
    const result = await productsModel.deleteOne({ _id: id });
    return result;
  }
}
