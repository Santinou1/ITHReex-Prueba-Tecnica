import employeesService from "../services/employees.service.js";

class EmployeesController {
  // GET /employees - Obtener todos los empleados
  async getAll(req, res, next) {
    try {
      const { area } = req.query;
      const result = await employeesService.getAllEmployees({ area });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /employees/:id - Obtener un empleado por ID
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await employeesService.getEmployeeById(parseInt(id));

      if (!result.success) {
        return res.status(result.statusCode || 404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // POST /employees - Crear un nuevo empleado
  async create(req, res, next) {
    try {
      const employeeData = req.body;
      const result = await employeesService.createEmployee(employeeData);

      if (!result.success) {
        return res.status(result.statusCode || 400).json(result);
      }

      res.status(result.statusCode || 201).json(result);
    } catch (error) {
      next(error);
    }
  }

  // PUT /employees/:id - Actualizar un empleado
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const employeeData = req.body;
      const result = await employeesService.updateEmployee(
        parseInt(id),
        employeeData
      );

      if (!result.success) {
        return res.status(result.statusCode || 404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /employees/:id - Eliminar un empleado
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await employeesService.deleteEmployee(parseInt(id));

      if (!result.success) {
        return res.status(result.statusCode || 404).json(result);
      }

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  // GET /employees/stats - Obtener estadísticas de empleados
  async getStatistics(req, res, next) {
    try {
      const result = await employeesService.getStatistics();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new EmployeesController();
