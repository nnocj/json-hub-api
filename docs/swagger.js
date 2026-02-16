// docs/swagger.js//docs swagger
import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "JSON Hub API",
      version: "1.0.0",
      description: "API for creating and managing documents"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    components: {
      schemas: {
        Document: {
          type: "object",
          required: ["title", "folder", "owner", "secret_passkey", "data"],
          properties: {
            title: {
              type: "string",
              description: "Title of the document"
            },
            folder: {
              type: "string",
              description: "Folder where the document is stored"
            },
            owner: {
              type: "string",
              description: "Owner of the document"
            },
            secret_passkey: {
              type: "string",
              description: "Secret key for authentication"
            },
            data: {
              type: "object",
              description: "Actual content of the document"
            }
          },
          example: {
            title: "My Test Document",
            folder: "TestFolder",
            owner: "Nicholas",
            secret_passkey: "mySuperSecret123",
            data: {
              info: "This is a test",
              numbers: [1, 2, 3],
              active: true
            }
          }
        }
      }
    }
  },
  apis: ["./routes/*.js"] // This points to your route files for Swagger JSDoc comments
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

export default swaggerSpec;
