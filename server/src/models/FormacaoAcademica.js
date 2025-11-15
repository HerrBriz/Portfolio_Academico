import { pool } from '../config/database.js';

class FormacaoAcademica {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM formacao_academica ORDER BY data_inicio DESC');
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM formacao_academica WHERE id = ?', [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const { instituicao, curso, nivel, data_inicio, data_conclusao, descricao, status } = data;
      const [result] = await connection.query(
        'INSERT INTO formacao_academica (instituicao, curso, nivel, data_inicio, data_conclusao, descricao, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [instituicao, curso, nivel, data_inicio, data_conclusao, descricao, status]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const { instituicao, curso, nivel, data_inicio, data_conclusao, descricao, status } = data;
      await connection.query(
        'UPDATE formacao_academica SET instituicao = ?, curso = ?, nivel = ?, data_inicio = ?, data_conclusao = ?, descricao = ?, status = ? WHERE id = ?',
        [instituicao, curso, nivel, data_inicio, data_conclusao, descricao, status, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM formacao_academica WHERE id = ?', [id]);
      return { success: true };
    } finally {
      connection.release();
    }
  }
}

export default FormacaoAcademica;
