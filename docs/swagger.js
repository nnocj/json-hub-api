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
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        }
      }
    }
  },
  apis: ["./routes/*.js"], // auto-pick JSDoc comments in routes
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
