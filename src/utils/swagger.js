import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: " Documentacion de las APIs",
      description: " Informacion de Productos y de el Carrito",
      version: "1.0.0",
      contact: {
        name: "Ignacio Tumini",
        url: "https://www.linkedin.com/in/ignacio-tumini-949506233/",
      },
    },
  },

  apis: [`${process.cwd()}/src/docs/*.yaml`],
};
export const spec = swaggerJsdoc(swaggerOptions);
