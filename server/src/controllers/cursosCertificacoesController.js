import CursosCertificacoes from '../models/CursosCertificacoes.js';

export const getCursos = async (req, res) => {
  try {
    const cursos = await CursosCertificacoes.getAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const curso = await CursosCertificacoes.getById(req.params.id);
    if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCurso = async (req, res) => {
  try {
    const curso = await CursosCertificacoes.create(req.body);
    res.status(201).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCurso = async (req, res) => {
  try {
    const curso = await CursosCertificacoes.update(req.params.id, req.body);
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCurso = async (req, res) => {
  try {
    await CursosCertificacoes.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
