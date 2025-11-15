import { pool } from '../config/database.js';

class CompetenciasInterpessoais {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM competencias_interpessoais');
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM competencias_interpessoais WHERE id = ?', [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const { nome, descricao, nivel } = data;
      const [result] = await connection.query(
        'INSERT INTO competencias_interpessoais (nome, descricao, nivel) VALUES (?, ?, ?)',
        [nome, descricao, nivel]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const { nome, descricao, nivel } = data;
      await connection.query(
        'UPDATE competencias_interpessoais SET nome = ?, descricao = ?, nivel = ? WHERE id = ?',
        [nome, descricao, nivel, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM competencias_interpessoais WHERE id = ?', [id]);
      return { success: true };
    } finally {
      connection.release();
    }
  }
}

export default CompetenciasInterpessoais;
