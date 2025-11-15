import Projetos from '../models/Projetos.js';

export const getProjetos = async (req, res) => {
  try {
    const projetos = await Projetos.getAll();
    res.json(projetos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProjetoById = async (req, res) => {
  try {
    const projeto = await Projetos.getById(req.params.id);
    if (!projeto) return res.status(404).json({ error: 'Projeto não encontrado' });
    res.json(projeto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProjeto = async (req, res) => {
  try {
    const projeto = await Projetos.create(req.body);
    res.status(201).json(projeto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProjeto = async (req, res) => {
  try {
    const projeto = await Projetos.update(req.params.id, req.body);
    res.json(projeto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProjeto = async (req, res) => {
  try {
    await Projetos.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
