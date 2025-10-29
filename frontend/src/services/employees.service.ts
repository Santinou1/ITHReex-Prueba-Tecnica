import { API_ENDPOINTS } from "./api.config";
import type {
  Employee,
  EmployeeFormData,
  ApiResponse,
  Statistics,
} from "../types/employee.types";

class EmployeesService {
  // Obtener todos los empleados
  async getAll(): Promise<ApiResponse<Employee[]>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES);
    return response.json();
  }

  // Obtener empleados por área
  async getByArea(area: string): Promise<ApiResponse<Employee[]>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES_BY_AREA(area));
    return response.json();
  }

  // Obtener empleado por ID
  async getById(id: number): Promise<ApiResponse<Employee>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEE_BY_ID(id));
    return response.json();
  }

  // Crear empleado
  async create(data: EmployeeFormData): Promise<ApiResponse<Employee>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Actualizar empleado
  async update(
    id: number,
    data: Partial<EmployeeFormData>
  ): Promise<ApiResponse<Employee>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEE_BY_ID(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  // Eliminar empleado
  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEE_BY_ID(id), {
      method: "DELETE",
    });
    return response.json();
  }

  // Obtener estadísticas
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    const response = await fetch(API_ENDPOINTS.EMPLOYEES_STATS);
    return response.json();
  }
}

export default new EmployeesService();
