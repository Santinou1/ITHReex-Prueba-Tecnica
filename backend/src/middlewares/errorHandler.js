

export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error('Stack:', err.stack);

  // Error de validación de PostgreSQL
  if (err.code === '23505') {
    return res.status(409).json({
      success: false,
      error: 'El registro ya existe',
      details: err.detail,
    });
  }

  // Error de constraint de PostgreSQL
  if (err.code === '23514') {
    return res.status(400).json({
      success: false,
      error: 'Datos inválidos',
      details: err.detail,
    });
  }

  // Error de foreign key
  if (err.code === '23503') {
    return res.status(400).json({
      success: false,
      error: 'Referencia inválida',
      details: err.detail,
    });
  }

  // Error genérico
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Middleware para rutas no encontradas
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada',
    path: req.originalUrl,
  });
};
