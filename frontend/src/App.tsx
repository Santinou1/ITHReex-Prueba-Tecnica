import { useState, useEffect } from "react";
import Header from "./components/Header";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeDetail from "./components/EmployeeDetail";
import Statistics from "./components/Statistics";
import employeesService from "./services/employees.service";
import type { Employee, EmployeeFormData } from "./types/employee.types";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [filterArea, setFilterArea] = useState("");

  useEffect(() => {
    loadEmployees();
  }, [filterArea]);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const response = filterArea
        ? await employeesService.getByArea(filterArea)
        : await employeesService.getAll();

      if (response.success && response.data) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error("Error al cargar empleados:", error);
      alert("Error al cargar los empleados");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: EmployeeFormData) => {
    try {
      setLoading(true);
      const response = await employeesService.create(data);

      if (response.success) {
        alert("Empleado creado exitosamente");
        setShowForm(false);
        loadEmployees();
      } else {
        alert(`Error: ${JSON.stringify(response.error)}`);
      }
    } catch (error) {
      console.error("Error al crear empleado:", error);
      alert("Error al crear el empleado");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data: EmployeeFormData) => {
    if (!editingEmployee) return;

    try {
      setLoading(true);
      const response = await employeesService.update(editingEmployee.id, data);

      if (response.success) {
        alert("Empleado actualizado exitosamente");
        setShowForm(false);
        setEditingEmployee(null);
        loadEmployees();
      } else {
        alert(`Error: ${JSON.stringify(response.error)}`);
      }
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      alert("Error al actualizar el empleado");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este empleado?")) return;

    try {
      setLoading(true);
      const response = await employeesService.delete(id);

      if (response.success) {
        alert("Empleado eliminado exitosamente");
        loadEmployees();
      } else {
        alert(`Error: ${response.error}`);
      }
    } catch (error) {
      console.error("Error al eliminar empleado:", error);
      alert("Error al eliminar el empleado");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  const handleViewDetail = (id: number) => {
    setSelectedEmployeeId(id);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
    setSelectedEmployeeId(null);
  };

  return (
    <div className="app">
      <Header
        onShowStats={() => setShowStats(!showStats)}
        showingStats={showStats}
      />

      <main className="main-content">
        {showStats ? (
          <Statistics />
        ) : (
          <>
            <div className="toolbar">
              <div className="filter-section">
                <label htmlFor="filterArea">Filtrar por área:</label>
                <select
                  id="filterArea"
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                >
                  <option value="">Todas las áreas</option>
                  <option value="Desarrollo">Desarrollo</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Diseño">Diseño</option>
                  <option value="Administración">Administración</option>
                </select>
              </div>
              <button
                className="btn-add"
                onClick={() => setShowForm(true)}
                disabled={loading}
              >
                + Nuevo Empleado
              </button>
            </div>

            <EmployeeTable
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewDetail={handleViewDetail}
              loading={loading}
            />
          </>
        )}
      </main>

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSubmit={editingEmployee ? handleUpdate : handleCreate}
          onCancel={handleCloseForm}
          loading={loading}
        />
      )}

      {showDetail && selectedEmployeeId && (
        <EmployeeDetail
          employeeId={selectedEmployeeId}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;
