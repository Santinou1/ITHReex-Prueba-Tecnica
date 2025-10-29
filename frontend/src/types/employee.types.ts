export interface Employee {
  id: number;
  nombreCompleto: string;
  edad: number;
  area: string;
  antiguedad: number;
  telefono: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface EmployeeFormData {
  nombreCompleto: string;
  edad: number | string;
  area: string;
  antiguedad: number | string;
  telefono: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  total?: number;
  error?: string | string[];
  message?: string;
  statusCode?: number;
}

export interface Statistics {
  total: number;
  porArea: { area: string; total: string }[];
  promedioEdad: number;
  promedioAntiguedad: number;
}
