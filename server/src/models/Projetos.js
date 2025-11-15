import { pool } from '../config/database.js';

class Projetos {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM projetos ORDER BY data_inicio DESC');
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM projetos WHERE id = ?', [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const { titulo, descricao, tecnologias, url_github, url_demo, data_inicio, data_conclusao, status, imagem_url } = data;
      const [result] = await connection.query(
        'INSERT INTO projetos (titulo, descricao, tecnologias, url_github, url_demo, data_inicio, data_conclusao, status, imagem_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [titulo, descricao, tecnologias, url_github, url_demo, data_inicio, data_conclusao, status, imagem_url]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const { titulo, descricao, tecnologias, url_github, url_demo, data_inicio, data_conclusao, status, imagem_url } = data;
      await connection.query(
        'UPDATE projetos SET titulo = ?, descricao = ?, tecnologias = ?, url_github = ?, url_demo = ?, data_inicio = ?, data_conclusao = ?, status = ?, imagem_url = ? WHERE id = ?',
        [titulo, descricao, tecnologias, url_github, url_demo, data_inicio, data_conclusao, status, imagem_url, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM projetos WHERE id = ?', [id]);
      return { success: true };
    } finally {
      connection.release();
    }
  }
}

export default Projetos;
