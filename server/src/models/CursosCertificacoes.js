import { pool } from '../config/database.js';

class CursosCertificacoes {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM cursos_certificacoes ORDER BY data_conclusao DESC');
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM cursos_certificacoes WHERE id = ?', [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const { titulo, instituicao, data_conclusao, url_certificado, descricao, categoria } = data;
      const [result] = await connection.query(
        'INSERT INTO cursos_certificacoes (titulo, instituicao, data_conclusao, url_certificado, descricao, categoria) VALUES (?, ?, ?, ?, ?, ?)',
        [titulo, instituicao, data_conclusao, url_certificado, descricao, categoria]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const { titulo, instituicao, data_conclusao, url_certificado, descricao, categoria } = data;
      await connection.query(
        'UPDATE cursos_certificacoes SET titulo = ?, instituicao = ?, data_conclusao = ?, url_certificado = ?, descricao = ?, categoria = ? WHERE id = ?',
        [titulo, instituicao, data_conclusao, url_certificado, descricao, categoria, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM cursos_certificacoes WHERE id = ?', [id]);
      return { success: true };
    } finally {
      connection.release();
    }
  }
}

export default CursosCertificacoes;
