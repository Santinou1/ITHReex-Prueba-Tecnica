import { useState, useEffect } from "react";
import type { Employee, EmployeeFormData } from "../types/employee.types";
import "./EmployeeForm.css";

interface EmployeeFormProps {
  employee: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
  onCancel: () => void;
  loading: boolean;
}

const AREAS = [
  "Desarrollo",
  "Recursos Humanos",
  "Ventas",
  "Marketing",
  "Diseño",
  "Administración",
];

export default function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  loading,
}: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    nombreCompleto: "",
    edad: "",
    area: "",
    antiguedad: "",
    telefono: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        nombreCompleto: employee.nombreCompleto,
        edad: employee.edad,
        area: employee.area,
        antiguedad: employee.antiguedad,
        telefono: employee.telefono,
      });
    }
  }, [employee]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-overlay" onClick={onCancel}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="form-header">
          <h2>{employee ? "Editar Empleado" : "Nuevo Empleado"}</h2>
          <button className="btn-close" onClick={onCancel}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="nombreCompleto">Nombre Completo *</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={formData.nombreCompleto}
              onChange={handleChange}
              required
              placeholder="Ej: Juan Pérez García"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edad">Edad *</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
                min="18"
                max="100"
                placeholder="18-100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="antiguedad">Antigüedad (años) *</label>
              <input
                type="number"
                id="antiguedad"
                name="antiguedad"
                value={formData.antiguedad}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="area">Área *</label>
            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un área</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Guardando..." : employee ? "Actualizar" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
