const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'control_laboratorios', // Regresó a su normalidad
  password: '123',
  port: 5432,
})

module.exports={
    pool
}