import express from 'express';
import * as perfilController from '../controllers/perfilController.js';
import * as formacaoController from '../controllers/formacaoAcademicaController.js';
import * as cursosController from '../controllers/cursosCertificacoesController.js';
import * as projetosController from '../controllers/projetosController.js';
import * as competenciasController from '../controllers/competenciasController.js';

const router = express.Router();

// Rotas de Perfil
router.get('/perfil', perfilController.getPerfil);
router.get('/perfil/:id', perfilController.getPerfilById);
router.post('/perfil', perfilController.createPerfil);
router.put('/perfil/:id', perfilController.updatePerfil);
router.delete('/perfil/:id', perfilController.deletePerfil);

// Rotas de Formação Acadêmica
router.get('/formacao', formacaoController.getFormacao);
router.get('/formacao/:id', formacaoController.getFormacaoById);
router.post('/formacao', formacaoController.createFormacao);
router.put('/formacao/:id', formacaoController.updateFormacao);
router.delete('/formacao/:id', formacaoController.deleteFormacao);

// Rotas de Cursos e Certificações
router.get('/cursos', cursosController.getCursos);
router.get('/cursos/:id', cursosController.getCursoById);
router.post('/cursos', cursosController.createCurso);
router.put('/cursos/:id', cursosController.updateCurso);
router.delete('/cursos/:id', cursosController.deleteCurso);

// Rotas de Projetos
router.get('/projetos', projetosController.getProjetos);
router.get('/projetos/:id', projetosController.getProjetoById);
router.post('/projetos', projetosController.createProjeto);
router.put('/projetos/:id', projetosController.updateProjeto);
router.delete('/projetos/:id', projetosController.deleteProjeto);

// Rotas de Competências Técnicas
router.get('/competencias-tecnicas', competenciasController.getCompetenciasTecnicas);
router.get('/competencias-tecnicas/:id', competenciasController.getCompetenciaTecnicaById);
router.post('/competencias-tecnicas', competenciasController.createCompetenciaTecnica);
router.put('/competencias-tecnicas/:id', competenciasController.updateCompetenciaTecnica);
router.delete('/competencias-tecnicas/:id', competenciasController.deleteCompetenciaTecnica);

// Rotas de Competências Interpessoais
router.get('/competencias-interpessoais', competenciasController.getCompetenciasInterpessoais);
router.get('/competencias-interpessoais/:id', competenciasController.getCompetenciaInterpessoalById);
router.post('/competencias-interpessoais', competenciasController.createCompetenciaInterpessoal);
router.put('/competencias-interpessoais/:id', competenciasController.updateCompetenciaInterpessoal);
router.delete('/competencias-interpessoais/:id', competenciasController.deleteCompetenciaInterpessoal);

export default router;