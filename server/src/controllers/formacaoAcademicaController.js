import FormacaoAcademica from '../models/FormacaoAcademica.js';

export const getFormacao = async (req, res) => {
  try {
    const formacoes = await FormacaoAcademica.getAll();
    res.json(formacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFormacaoById = async (req, res) => {
  try {
    const formacao = await FormacaoAcademica.getById(req.params.id);
    if (!formacao) return res.status(404).json({ error: 'Formação não encontrada' });
    res.json(formacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFormacao = async (req, res) => {
  try {
    const formacao = await FormacaoAcademica.create(req.body);
    res.status(201).json(formacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateFormacao = async (req, res) => {
  try {
    const formacao = await FormacaoAcademica.update(req.params.id, req.body);
    res.json(formacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFormacao = async (req, res) => {
  try {
    await FormacaoAcademica.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
