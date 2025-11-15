import { pool } from '../config/database.js';

class Perfil {
  static async getAll() {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM perfil');
      return rows;
    } finally {
      connection.release();
    }
  }

  static async getById(id) {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT * FROM perfil WHERE id = ?', [id]);
      return rows[0];
    } finally {
      connection.release();
    }
  }

  static async create(data) {
    const connection = await pool.getConnection();
    try {
      const { nome, titulo, descricao, localizacao, status, sobre_mim } = data;
      const [result] = await connection.query(
        'INSERT INTO perfil (nome, titulo, descricao, localizacao, status, sobre_mim) VALUES (?, ?, ?, ?, ?, ?)',
        [nome, titulo, descricao, localizacao, status, sobre_mim]
      );
      return { id: result.insertId, ...data };
    } finally {
      connection.release();
    }
  }

  static async update(id, data) {
    const connection = await pool.getConnection();
    try {
      const { nome, titulo, descricao, localizacao, status, sobre_mim } = data;
      await connection.query(
        'UPDATE perfil SET nome = ?, titulo = ?, descricao = ?, localizacao = ?, status = ?, sobre_mim = ? WHERE id = ?',
        [nome, titulo, descricao, localizacao, status, sobre_mim, id]
      );
      return await this.getById(id);
    } finally {
      connection.release();
    }
  }

  static async delete(id) {
    const connection = await pool.getConnection();
    try {
      await connection.query('DELETE FROM perfil WHERE id = ?', [id]);
      return { success: true };
    } finally {
      connection.release();
    }
  }
}

export default Perfil;
