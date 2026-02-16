import express from "express";
import dotenv from "dotenv";
import documentsRouter from "./routes/documentsRoutes.js"; // renamed for clarity
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Allow localhost and any other frontend origin
app.use(cors({
  origin: ['http://localhost:5173', 'https://json-hub-api.onrender.com'],
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Middleware
app.use(express.json());

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/documents", documentsRouter); // more descriptive than /api/events

// Root endpoint
app.get("/", (req, res) => res.send("json-hub-api is running"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
