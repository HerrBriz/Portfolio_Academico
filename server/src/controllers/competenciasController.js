import CompetenciasTecnicas from '../models/CompetenciasTecnicas.js';
import CompetenciasInterpessoais from '../models/CompetenciasInterpessoais.js';

// Competências Técnicas
export const getCompetenciasTecnicas = async (req, res) => {
  try {
    const competencias = await CompetenciasTecnicas.getAll();
    res.json(competencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompetenciaTecnicaById = async (req, res) => {
  try {
    const competencia = await CompetenciasTecnicas.getById(req.params.id);
    if (!competencia) return res.status(404).json({ error: 'Competência não encontrada' });
    res.json(competencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCompetenciaTecnica = async (req, res) => {
  try {
    const competencia = await CompetenciasTecnicas.create(req.body);
    res.status(201).json(competencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompetenciaTecnica = async (req, res) => {
  try {
    const competencia = await CompetenciasTecnicas.update(req.params.id, req.body);
    res.json(competencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCompetenciaTecnica = async (req, res) => {
  try {
    await CompetenciasTecnicas.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Competências Interpessoais
export const getCompetenciasInterpessoais = async (req, res) => {
  try {
    const competencias = await CompetenciasInterpessoais.getAll();
    res.json(competencias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCompetenciaInterpessoalById = async (req, res) => {
  try {
    const competencia = await CompetenciasInterpessoais.getById(req.params.id);
    if (!competencia) return res.status(404).json({ error: 'Competência não encontrada' });
    res.json(competencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCompetenciaInterpessoal = async (req, res) => {
  try {
    const competencia = await CompetenciasInterpessoais.create(req.body);
    res.status(201).json(competencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCompetenciaInterpessoal = async (req, res) => {
  try {
    const competencia = await CompetenciasInterpessoais.update(req.params.id, req.body);
    res.json(competencia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCompetenciaInterpessoal = async (req, res) => {
  try {
    await CompetenciasInterpessoais.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
