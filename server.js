import express from "express";
import dotenv from "dotenv";
import documentsRouter from "./routes/documentsRoutes.js"; // renamed for clarity
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "docs", "swagger.json"), "utf-8")
);


import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Allow localhost and any other frontend origin
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://wdd330-sleepoutside-team11.onrender.com"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// Middleware
app.use(express.json());

// Swagger docs
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api", documentsRouter); // more descriptive than /api/events

// Root endpoint
app.get("/", (req, res) => res.send("json-hub-api is running"));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
