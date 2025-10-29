const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export const API_ENDPOINTS = {
  EMPLOYEES: `${API_BASE_URL}/employees`,
  EMPLOYEE_BY_ID: (id: number) => `${API_BASE_URL}/employees/${id}`,
  EMPLOYEES_STATS: `${API_BASE_URL}/employees/stats`,
  EMPLOYEES_BY_AREA: (area: string) => `${API_BASE_URL}/employees?area=${area}`,
  HEALTH: `${API_BASE_URL}/health`,
};

export default API_BASE_URL;
