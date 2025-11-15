import { pool } from '../config/database.js';

class CompetenciasTecnicas {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM competencias_tecnicas ORDER BY categoria');
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM competencias_tecnicas WHERE id = ?', [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const { nome, categoria, nivel } = data;
      const [result] = await connection.query(
        'INSERT INTO competencias_tecnicas (nome, categoria, nivel) VALUES (?, ?, ?)',
        [nome, categoria, nivel]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const { nome, categoria, nivel } = data;
      await connection.query(
        'UPDATE competencias_tecnicas SET nome = ?, categoria = ?, nivel = ? WHERE id = ?',
        [nome, categoria, nivel, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM competencias_tecnicas WHERE id = ?', [id]);
      return { success: true };
    } finally {
      connection.release();
    }
  }
}

export default CompetenciasTecnicas;
