import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "JSON Hub API",
      version: "1.0.0",
      description: "API to receive and retrieve any JSON data"
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"], // points to your route files
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
