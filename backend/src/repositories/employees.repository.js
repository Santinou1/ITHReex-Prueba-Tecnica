import pool from "../config/database.js";

class EmployeesRepository {
  // Obtener todos los empleados
  async findAll() {
    const query = `
      SELECT 
        id,
        nombre_completo as "nombreCompleto",
        edad,
        area,
        antiguedad,
        telefono,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM empleados
      ORDER BY id ASC
    `;

    const result = await pool.query(query);
    return result.rows;
  }

  // Obtener un empleado por ID
  async findById(id) {
    const query = `
      SELECT 
        id,
        nombre_completo as "nombreCompleto",
        edad,
        area,
        antiguedad,
        telefono,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM empleados
      WHERE id = $1
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  // Obtener empleados por área
  async findByArea(area) {
    const query = `
      SELECT 
        id,
        nombre_completo as "nombreCompleto",
        edad,
        area,
        antiguedad,
        telefono,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM empleados
      WHERE area = $1
      ORDER BY id ASC
    `;

    const result = await pool.query(query, [area]);
    return result.rows;
  }

  // Crear un nuevo empleado
  async create(employeeData) {
    const { nombreCompleto, edad, area, antiguedad, telefono } = employeeData;

    const query = `
      INSERT INTO empleados (nombre_completo, edad, area, antiguedad, telefono)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING 
        id,
        nombre_completo as "nombreCompleto",
        edad,
        area,
        antiguedad,
        telefono,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;

    const result = await pool.query(query, [
      nombreCompleto,
      edad,
      area,
      antiguedad,
      telefono,
    ]);
    return result.rows[0];
  }

  // Actualizar un empleado
  async update(id, employeeData) {
    const { nombreCompleto, edad, area, antiguedad, telefono } = employeeData;

    const query = `
      UPDATE empleados
      SET 
        nombre_completo = COALESCE($1, nombre_completo),
        edad = COALESCE($2, edad),
        area = COALESCE($3, area),
        antiguedad = COALESCE($4, antiguedad),
        telefono = COALESCE($5, telefono)
      WHERE id = $6
      RETURNING 
        id,
        nombre_completo as "nombreCompleto",
        edad,
        area,
        antiguedad,
        telefono,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `;

    const result = await pool.query(query, [
      nombreCompleto,
      edad,
      area,
      antiguedad,
      telefono,
      id,
    ]);
    return result.rows[0] || null;
  }

  // Eliminar un empleado
  async delete(id) {
    const query = "DELETE FROM empleados WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rowCount > 0;
  }

  // Contar empleados por área
  async countByArea() {
    const query = `
      SELECT 
        area,
        COUNT(*) as total
      FROM empleados
      GROUP BY area
      ORDER BY total DESC
    `;

    const result = await pool.query(query);
    return result.rows;
  }
}

export default new EmployeesRepository();
