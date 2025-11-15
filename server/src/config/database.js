import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Pool de conexões para melhor desempenho
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_academico',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Função para testar a conexão
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✓ Conectado ao banco de dados MySQL com sucesso!');
    connection.release();
  } catch (error) {
    console.error('✗ Erro ao conectar ao banco de dados:', error.message);
    process.exit(1);
  }
}

export { pool, testConnection };
