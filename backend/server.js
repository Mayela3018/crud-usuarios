const express = require('express');
const { Pool } = require('pg');
const cors    = require('cors');
const path    = require('path');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../frontend')));


const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }   
      }
    : {
        user:     process.env.DB_USER     || 'postgres',
        host:     process.env.DB_HOST     || 'localhost',
        database: process.env.DB_NAME     || 'crud_db',
        password: process.env.DB_PASSWORD || 'maye1234',
        port:     process.env.DB_PORT     || 5432,
      }
);

pool.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id       SERIAL PRIMARY KEY,
    nombre   VARCHAR(100) NOT NULL,
    email    VARCHAR(100) UNIQUE NOT NULL,
    edad     INT,
    ciudad   VARCHAR(100),
    telefono VARCHAR(20)
  )
`).then(() => console.log('✅ Tabla usuarios lista'))
  .catch(err => console.error('❌ Error creando tabla:', err.message));

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ ok: true, time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, email, edad, ciudad, telefono } = req.body;
    const result = await pool.query(
      `INSERT INTO usuarios (nombre, email, edad, ciudad, telefono)
       VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [nombre, email, edad, ciudad, telefono]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/usuarios/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE id=$1', [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try {
    const { nombre, email, edad, ciudad, telefono } = req.body;
    const result = await pool.query(
      `UPDATE usuarios
       SET nombre=$1, email=$2, edad=$3, ciudad=$4, telefono=$5
       WHERE id=$6 RETURNING *`,
      [nombre, email, edad, ciudad, telefono, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/usuarios/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM usuarios WHERE id=$1 RETURNING *', [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado', usuario: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));