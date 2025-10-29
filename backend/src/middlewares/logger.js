
export const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();

  // Capturar el método original res.json para loggear la respuesta
  const originalJson = res.json.bind(res);
  
  res.json = function(body) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    
    // Determinar el color según el status code
    const statusColor = getStatusColor(statusCode);
    const methodColor = getMethodColor(req.method);
    
    // Log del request
    console.log(
      `${getTimestamp()} ${methodColor}${req.method.padEnd(7)}${resetColor} ` +
      `${statusColor}${statusCode}${resetColor} ` +
      `${req.originalUrl.padEnd(30)} ` +
      `${duration}ms`
    );

    // Si hay query params, mostrarlos
    if (Object.keys(req.query).length > 0) {
      console.log(`  📋 Query: ${JSON.stringify(req.query)}`);
    }

    // Si hay body (POST/PUT), mostrar resumen
    if (req.body && Object.keys(req.body).length > 0 && req.method !== 'GET') {
      console.log(`  📦 Body: ${JSON.stringify(req.body).substring(0, 100)}${JSON.stringify(req.body).length > 100 ? '...' : ''}`);
    }

    return originalJson(body);
  };

  next();
};

/**
 * Obtener timestamp formateado
 */
function getTimestamp() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `\x1b[90m[${hours}:${minutes}:${seconds}]\x1b[0m`;
}

/**
 * Obtener color según status code
 */
function getStatusColor(statusCode) {
  if (statusCode >= 200 && statusCode < 300) return '\x1b[32m'; // Verde
  if (statusCode >= 300 && statusCode < 400) return '\x1b[36m'; // Cyan
  if (statusCode >= 400 && statusCode < 500) return '\x1b[33m'; // Amarillo
  if (statusCode >= 500) return '\x1b[31m'; // Rojo
  return '\x1b[0m'; // Reset
}

/**
 * Obtener color según método HTTP
 */
function getMethodColor(method) {
  switch (method) {
    case 'GET': return '\x1b[34m';    // Azul
    case 'POST': return '\x1b[32m';   // Verde
    case 'PUT': return '\x1b[33m';    // Amarillo
    case 'DELETE': return '\x1b[31m'; // Rojo
    case 'PATCH': return '\x1b[35m';  // Magenta
    default: return '\x1b[0m';        // Reset
  }
}

const resetColor = '\x1b[0m';
