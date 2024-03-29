import  __dirname  from "../../utils.js"

export const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion",
      description: "Documentacion de product y cart con Swagger",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
