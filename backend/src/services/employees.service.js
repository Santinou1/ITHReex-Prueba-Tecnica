import employeesRepository from "../repositories/employees.repository.js";

class EmployeesService {
  // Obtener todos los empleados
  async getAllEmployees(filters = {}) {
    try {
      let employees;

      if (filters.area) {
        employees = await employeesRepository.findByArea(filters.area);
      } else {
        employees = await employeesRepository.findAll();
      }

      return {
        success: true,
        data: employees,
        total: employees.length,
      };
    } catch (error) {
      throw new Error(`Error al obtener empleados: ${error.message}`);
    }
  }

  // Obtener un empleado por ID
  async getEmployeeById(id) {
    try {
      const employee = await employeesRepository.findById(id);

      if (!employee) {
        return {
          success: false,
          error: "Empleado no encontrado",
          statusCode: 404,
        };
      }

      return {
        success: true,
        data: employee,
      };
    } catch (error) {
      throw new Error(`Error al obtener empleado: ${error.message}`);
    }
  }

  // Crear un nuevo empleado
  async createEmployee(employeeData) {
    try {
      // Validar datos requeridos
      const validation = this.validateEmployeeData(employeeData);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.errors,
          statusCode: 400,
        };
      }

      const employee = await employeesRepository.create(employeeData);

      return {
        success: true,
        data: employee,
        message: "Empleado creado exitosamente",
        statusCode: 201,
      };
    } catch (error) {
      throw new Error(`Error al crear empleado: ${error.message}`);
    }
  }

  // Actualizar un empleado
  async updateEmployee(id, employeeData) {
    try {
      const employee = await employeesRepository.update(id, employeeData);

      if (!employee) {
        return {
          success: false,
          error: "Empleado no encontrado",
          statusCode: 404,
        };
      }

      return {
        success: true,
        data: employee,
        message: "Empleado actualizado exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al actualizar empleado: ${error.message}`);
    }
  }

  // Eliminar un empleado
  async deleteEmployee(id) {
    try {
      const deleted = await employeesRepository.delete(id);

      if (!deleted) {
        return {
          success: false,
          error: "Empleado no encontrado",
          statusCode: 404,
        };
      }

      return {
        success: true,
        message: "Empleado eliminado exitosamente",
      };
    } catch (error) {
      throw new Error(`Error al eliminar empleado: ${error.message}`);
    }
  }

  // Obtener estadísticas de empleados
  async getStatistics() {
    try {
      const byArea = await employeesRepository.countByArea();
      const allEmployees = await employeesRepository.findAll();

      const avgAge =
        allEmployees.reduce((sum, emp) => sum + emp.edad, 0) /
        allEmployees.length;
      const avgAntiguedad =
        allEmployees.reduce((sum, emp) => sum + emp.antiguedad, 0) /
        allEmployees.length;

      return {
        success: true,
        data: {
          total: allEmployees.length,
          porArea: byArea,
          promedioEdad: Math.round(avgAge * 10) / 10,
          promedioAntiguedad: Math.round(avgAntiguedad * 10) / 10,
        },
      };
    } catch (error) {
      throw new Error(`Error al obtener estadísticas: ${error.message}`);
    }
  }

  // Validar datos de empleado
  validateEmployeeData(data) {
    const errors = [];

    if (!data.nombreCompleto || data.nombreCompleto.trim().length === 0) {
      errors.push("El nombre completo es requerido");
    }

    if (!data.edad || data.edad < 18 || data.edad > 100) {
      errors.push("La edad debe estar entre 18 y 100 años");
    }

    if (!data.area || data.area.trim().length === 0) {
      errors.push("El área es requerida");
    }

    if (data.antiguedad === undefined || data.antiguedad < 0) {
      errors.push("La antigüedad debe ser mayor o igual a 0");
    }

    if (!data.telefono || data.telefono.trim().length === 0) {
      errors.push("El teléfono es requerido");
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : null,
    };
  }
}

export default new EmployeesService();
