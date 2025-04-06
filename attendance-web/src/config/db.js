
const { Pool } = require('pg');

const pool = new Pool({
  host: 'vultr-prod-c3fe69db-2091-403e-a0f1-63c778f405e8-vultr-prod-5bd3.vultrdb.com',
  port: 16751,
  database: 'defaultdb',
  user: 'vultradmin',
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
