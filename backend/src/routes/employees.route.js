import { Router } from "express";
import employeesController from "../controllers/employees.controller.js";

const router = Router();

// GET /api/employees/stats - Debe ir primero para evitar conflicto con /:id
router.get("/stats", employeesController.getStatistics);

// GET /api/employees - Obtener todos (con filtro opcional por área)
router.get("/", employeesController.getAll);

// GET /api/employees/:id - Obtener por ID
router.get("/:id", employeesController.getById);

// POST /api/employees - Crear nuevo empleado
router.post("/", employeesController.create);

// PUT /api/employees/:id - Actualizar empleado
router.put("/:id", employeesController.update);

// DELETE /api/employees/:id - Eliminar empleado
router.delete("/:id", employeesController.delete);

export default router;
