/**
 * Prueba Técnica para ITHReex
 * Desarrollador: Santino Ursino
 */

import express from "express";
import dotenv from "dotenv";
import healthRouter from "./routes/health.route.js";
import employeesRouter from "./routes/employees.route.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { loggerMiddleware } from "./middlewares/logger.js";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();

// Middlewares globales
app.use(corsMiddleware);
app.use(loggerMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/health", healthRouter);
app.use("/api/employees", employeesRouter);

// Manejo de errores
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
