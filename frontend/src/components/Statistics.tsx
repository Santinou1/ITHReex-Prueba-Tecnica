import { useEffect, useState } from "react";
import employeesService from "../services/employees.service";
import type { Statistics as StatsType } from "../types/employee.types";
import "./Statistics.css";

export default function Statistics() {
  const [stats, setStats] = useState<StatsType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const response = await employeesService.getStatistics();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando estadísticas...</p>
      </div>
    );
  }

  if (!stats) {
    return <div className="empty-state">No hay estadísticas disponibles</div>;
  }

  return (
    <div className="statistics-container">
      <h2 className="stats-title">Estadísticas Generales</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Empleados</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Promedio Edad</h3>
            <p className="stat-value">{stats.promedioEdad} años</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-content">
            <h3>Promedio Antigüedad</h3>
            <p className="stat-value">{stats.promedioAntiguedad} años</p>
          </div>
        </div>
      </div>

      <div className="areas-section">
        <h3 className="section-title">Empleados por Área</h3>
        <div className="areas-grid">
          {stats.porArea.map((area) => (
            <div key={area.area} className="area-card">
              <div className="area-header">
                <span className="area-name">{area.area}</span>
                <span className="area-count">{area.total}</span>
              </div>
              <div className="area-bar">
                <div
                  className="area-bar-fill"
                  style={{
                    width: `${(parseInt(area.total) / stats.total) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="area-percentage">
                {((parseInt(area.total) / stats.total) * 100).toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
