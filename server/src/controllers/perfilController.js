import Perfil from '../models/Perfil.js';

export const getPerfil = async (req, res) => {
  try {
    const perfis = await Perfil.getAll();
    res.json(perfis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPerfilById = async (req, res) => {
  try {
    const perfil = await Perfil.getById(req.params.id);
    if (!perfil) return res.status(404).json({ error: 'Perfil não encontrado' });
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPerfil = async (req, res) => {
  try {
    const perfil = await Perfil.create(req.body);
    res.status(201).json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePerfil = async (req, res) => {
  try {
    const perfil = await Perfil.update(req.params.id, req.body);
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePerfil = async (req, res) => {
  try {
    await Perfil.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
