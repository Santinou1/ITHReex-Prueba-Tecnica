import type { Employee } from "../types/employee.types";
import "./EmployeeTable.css";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  onViewDetail: (id: number) => void;
  loading: boolean;
}

export default function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onViewDetail,
  loading,
}: EmployeeTableProps) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando empleados...</p>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay empleados registrados</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Completo</th>
            <th>Edad</th>
            <th>Área</th>
            <th>Antigüedad</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td className="name-cell">
                <button
                  className="name-button"
                  onClick={() => onViewDetail(employee.id)}
                  title="Ver detalles"
                >
                  {employee.nombreCompleto}
                </button>
              </td>
              <td>{employee.edad} años</td>
              <td>
                <span className="area-badge">{employee.area}</span>
              </td>
              <td>{employee.antiguedad} años</td>
              <td>{employee.telefono}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => onEdit(employee)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => onDelete(employee.id)}
                    title="Eliminar"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
