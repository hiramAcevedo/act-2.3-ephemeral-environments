const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Datos sobre ambientes efímeros para la API
const ephemeralInfo = {
  concepto: "Un ambiente efímero es un entorno de despliegue temporal que se crea automáticamente para probar cambios en el código antes de fusionarlos a producción.",
  caracteristicas: [
    "Se crean y destruyen automáticamente",
    "Aislados de producción",
    "Ligados al ciclo de vida de un Pull Request",
    "Replican el entorno de producción",
    "Permiten revisión visual de cambios"
  ],
  beneficios: [
    "Acelera el ciclo de desarrollo",
    "Facilita la colaboración entre equipos",
    "Reduce errores en producción",
    "Permite pruebas destructivas sin riesgo"
  ],
  herramientas: [
    { nombre: "Render", tipo: "PaaS", free_tier: true },
    { nombre: "Heroku Review Apps", tipo: "PaaS", free_tier: false },
    { nombre: "Vercel Preview", tipo: "PaaS", free_tier: true },
    { nombre: "Netlify Deploy Previews", tipo: "PaaS", free_tier: true }
  ]
};

// Página principal con HTML
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ephemeral Environments Demo</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: #0f172a;
          color: #e2e8f0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 680px;
          padding: 2.5rem;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          background: linear-gradient(135deg, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        .subtitle {
          color: #94a3b8;
          font-size: 0.95rem;
          margin-bottom: 2rem;
        }
        .card {
          background: #1e293b;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          text-align: left;
          border: 1px solid #334155;
        }
        .card h2 {
          color: #38bdf8;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
        }
        .card p { color: #cbd5e1; line-height: 1.6; font-size: 0.9rem; }
        .card ul { list-style: none; padding: 0; }
        .card ul li {
          padding: 0.35rem 0;
          color: #cbd5e1;
          font-size: 0.9rem;
        }
        .card ul li::before {
          content: "\\2022 ";
          color: #818cf8;
          font-weight: bold;
          margin-right: 0.5rem;
        }
        .api-link {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.6rem 1.5rem;
          background: #818cf8;
          color: #fff;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.2s;
        }
        .api-link:hover { background: #6366f1; }
        .footer {
          margin-top: 2rem;
          color: #475569;
          font-size: 0.8rem;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Ephemeral Environments</h1>
        <p class="subtitle">Actividad 2.3 | Hiram Agustin Acevedo Lopez | LDSW UDG</p>

        <div class="card">
          <h2>Que es un ambiente efimero?</h2>
          <p>${ephemeralInfo.concepto}</p>
        </div>

        <div class="card">
          <h2>Caracteristicas principales</h2>
          <ul>
            ${ephemeralInfo.caracteristicas.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div class="card">
          <h2>Beneficios</h2>
          <ul>
            ${ephemeralInfo.beneficios.map(b => `<li>${b}</li>`).join('')}
          </ul>
        </div>

        <a href="/api/info" class="api-link">Ver API JSON /api/info</a>

        <p class="footer">
          Desplegado en Render | Node.js + Express<br>
          Este entorno es en si mismo un ejemplo de despliegue efimero.
        </p>
      </div>
    </body>
    </html>
  `);
});

// Endpoint API JSON
app.get('/api/info', (req, res) => {
  res.json({
    status: "ok",
    mensaje: "API de demostración sobre ambientes efímeros",
    datos: ephemeralInfo,
    metadata: {
      autor: "Hiram Agustín Acevedo López",
      actividad: "2.3 Ephemeral Environments",
      materia: "LDSW - Universidad de Guadalajara",
      timestamp: new Date().toISOString()
    }
  });
});

// Health check para Render
app.get('/health', (req, res) => {
  res.json({ status: "healthy", uptime: process.uptime() });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
