import { useEffect, useState } from "react";
import employeesService from "../services/employees.service";
import type { Employee } from "../types/employee.types";
import "./EmployeeDetail.css";

interface EmployeeDetailProps {
  employeeId: number;
  onClose: () => void;
}

export default function EmployeeDetail({
  employeeId,
  onClose,
}: EmployeeDetailProps) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEmployee();
  }, [employeeId]);

  const loadEmployee = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await employeesService.getById(employeeId);

      if (response.success && response.data) {
        setEmployee(response.data);
      } else {
        setError("No se pudo cargar la información del empleado");
      }
    } catch (err) {
      setError("Error al cargar los datos del empleado");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="detail-header">
          <h2>Detalles del Empleado</h2>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {loading && (
          <div className="detail-loading">
            <div className="spinner"></div>
            <p>Cargando información...</p>
          </div>
        )}

        {error && (
          <div className="detail-error">
            <p>❌ {error}</p>
          </div>
        )}

        {!loading && !error && employee && (
          <div className="detail-content">
            <div className="detail-section">
              <div className="detail-avatar">
                <span className="avatar-icon">👤</span>
              </div>
              <h3 className="employee-name">{employee.nombreCompleto}</h3>
              <span className="employee-id">ID: {employee.id}</span>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-section">
              <h4>Información Personal</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">📅 Edad</span>
                  <span className="detail-value">{employee.edad} años</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📞 Teléfono</span>
                  <span className="detail-value">{employee.telefono}</span>
                </div>
              </div>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-section">
              <h4>Información Laboral</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">🏢 Área</span>
                  <span className="detail-value area-badge-detail">
                    {employee.area}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">⏱️ Antigüedad</span>
                  <span className="detail-value">
                    {employee.antiguedad} años
                  </span>
                </div>
              </div>
            </div>

            <div className="detail-divider"></div>

            <div className="detail-section">
              <h4>Registro del Sistema</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">📝 Creado</span>
                  <span className="detail-value detail-date">
                    {formatDate(employee.createdAt)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🔄 Actualizado</span>
                  <span className="detail-value detail-date">
                    {formatDate(employee.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="detail-footer">
          <button className="btn-close-footer" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
