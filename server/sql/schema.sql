-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS portfolio_academico;
USE portfolio_academico;

-- Tabela de Perfil (Página de Apresentação)
CREATE TABLE IF NOT EXISTS perfil (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  localizacao VARCHAR(255),
  status VARCHAR(100),
  sobre_mim LONGTEXT,
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Formação Acadêmica
CREATE TABLE IF NOT EXISTS formacao_academica (
  id INT PRIMARY KEY AUTO_INCREMENT,
  instituicao VARCHAR(255) NOT NULL,
  curso VARCHAR(255) NOT NULL,
  nivel VARCHAR(50) NOT NULL,
  data_inicio DATE NOT NULL,
  data_conclusao DATE,
  descricao TEXT,
  status VARCHAR(50),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Cursos Complementares e Certificações
CREATE TABLE IF NOT EXISTS cursos_certificacoes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  instituicao VARCHAR(255) NOT NULL,
  data_conclusao DATE NOT NULL,
  url_certificado VARCHAR(500),
  descricao TEXT,
  categoria VARCHAR(100),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Projetos Desenvolvidos
CREATE TABLE IF NOT EXISTS projetos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  descricao LONGTEXT NOT NULL,
  tecnologias VARCHAR(500),
  url_github VARCHAR(500),
  url_demo VARCHAR(500),
  data_inicio DATE NOT NULL,
  data_conclusao DATE,
  status VARCHAR(50),
  imagem_url VARCHAR(500),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Competências Técnicas
CREATE TABLE IF NOT EXISTS competencias_tecnicas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  nivel INT CHECK (nivel >= 1 AND nivel <= 5),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de Competências Interpessoais
CREATE TABLE IF NOT EXISTS competencias_interpessoais (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  nivel INT CHECK (nivel >= 1 AND nivel <= 5),
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir dados de exemplo (opcional)
INSERT INTO perfil (nome, titulo, descricao, localizacao, status, sobre_mim) VALUES 
('Luiz Roberto Briz Quirino', 'Análise e Desenvolvimento de Sistemas', 'Apaixonado por tecnologia e desenvolvimento de software', 'São José dos Campos, SP', 'Disponível para estágio', 'Sou estudante de Desenvolvimento de Sistemas com grande interesse em tecnologias web modernas.');

INSERT INTO formacao_academica (instituicao, curso, nivel, data_inicio, status) VALUES 
('FATEC São José dos Campos', 'Análise e Desenvolvimento de Sistemas', 'Técnico', '2023-02-01', 'Em andamento');

INSERT INTO competencias_tecnicas (nome, categoria, nivel) VALUES 
('JavaScript', 'Linguagem de Programação', 4),
('React', 'Frontend Framework', 4),
('MySQL', 'Banco de Dados', 3),
('Node.js', 'Backend Runtime', 3),
('Express', 'Backend Framework', 3),
('TypeScript', 'Linguagem de Programação', 3);

INSERT INTO competencias_interpessoais (nome, descricao, nivel) VALUES 
('Comunicação', 'Capacidade de se comunicar de forma clara e efetiva', 4),
('Trabalho em Equipe', 'Colaboração e integração com o time', 4),
('Resolução de Problemas', 'Análise crítica e busca por soluções', 5),
('Liderança', 'Capacidade de liderar projetos e pessoas', 3);
