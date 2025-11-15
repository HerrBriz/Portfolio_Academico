# Backend - Portfólio Acadêmico

## Instalação e Configuração

### 1. Instalar Dependências

```bash
cd server
npm install
```

### 2. Configurar Banco de Dados MySQL

#### Opção A: Criar manualmente
1. Abra o MySQL Workbench ou linha de comando do MySQL
2. Execute o arquivo `sql/schema.sql` para criar as tabelas e dados de exemplo

```sql
source server/sql/schema.sql
```

#### Opção B: Usar linha de comando
```bash
mysql -u root -p < server/sql/schema.sql
```

### 3. Configurar Variáveis de Ambiente

1. Renomeie `.env.example` para `.env`
2. Atualize as credenciais do banco de dados:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=portfolio_academico
PORT=5000
NODE_ENV=development
```

### 4. Iniciar o Servidor

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

O servidor estará disponível em `http://localhost:5000`

## Verificar Saúde do Servidor

```bash
curl http://localhost:5000/health
```

## Endpoints da API

### Perfil (Página de Apresentação)
- `GET /api/perfil` - Listar todos os perfis
- `GET /api/perfil/:id` - Obter um perfil específico
- `POST /api/perfil` - Criar novo perfil
- `PUT /api/perfil/:id` - Atualizar perfil
- `DELETE /api/perfil/:id` - Deletar perfil

### Formação Acadêmica
- `GET /api/formacao` - Listar formações
- `GET /api/formacao/:id` - Obter uma formação
- `POST /api/formacao` - Criar formação
- `PUT /api/formacao/:id` - Atualizar formação
- `DELETE /api/formacao/:id` - Deletar formação

### Cursos e Certificações
- `GET /api/cursos` - Listar cursos
- `GET /api/cursos/:id` - Obter um curso
- `POST /api/cursos` - Criar curso
- `PUT /api/cursos/:id` - Atualizar curso
- `DELETE /api/cursos/:id` - Deletar curso

### Projetos
- `GET /api/projetos` - Listar projetos
- `GET /api/projetos/:id` - Obter um projeto
- `POST /api/projetos` - Criar projeto
- `PUT /api/projetos/:id` - Atualizar projeto
- `DELETE /api/projetos/:id` - Deletar projeto

### Competências Técnicas
- `GET /api/competencias-tecnicas` - Listar competências
- `GET /api/competencias-tecnicas/:id` - Obter uma competência
- `POST /api/competencias-tecnicas` - Criar competência
- `PUT /api/competencias-tecnicas/:id` - Atualizar competência
- `DELETE /api/competencias-tecnicas/:id` - Deletar competência

### Competências Interpessoais
- `GET /api/competencias-interpessoais` - Listar competências
- `GET /api/competencias-interpessoais/:id` - Obter uma competência
- `POST /api/competencias-interpessoais` - Criar competência
- `PUT /api/competencias-interpessoais/:id` - Atualizar competência
- `DELETE /api/competencias-interpessoais/:id` - Deletar competência

## Exemplo de Requisições

### Buscar todos os projetos
```bash
curl http://localhost:5000/api/projetos
```

### Criar um novo curso
```bash
curl -X POST http://localhost:5000/api/cursos \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "React Avançado",
    "instituicao": "Coursera",
    "data_conclusao": "2024-12-15",
    "descricao": "Curso avançado de React",
    "categoria": "Programação"
  }'
```

### Atualizar um perfil
```bash
curl -X PUT http://localhost:5000/api/perfil/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Novo Nome",
    "titulo": "Novo Título",
    "descricao": "Nova descrição",
    "localizacao": "Nova Localização",
    "status": "Disponível",
    "sobre_mim": "Novo sobre"
  }'
```

## Estrutura de Dados

### Perfil
```json
{
  "id": 1,
  "nome": "string",
  "titulo": "string",
  "descricao": "string",
  "localizacao": "string",
  "status": "string",
  "sobre_mim": "string",
  "data_criacao": "timestamp",
  "data_atualizacao": "timestamp"
}
```

### Formação Acadêmica
```json
{
  "id": 1,
  "instituicao": "string",
  "curso": "string",
  "nivel": "string",
  "data_inicio": "date",
  "data_conclusao": "date",
  "descricao": "string",
  "status": "string"
}
```

### Cursos e Certificações
```json
{
  "id": 1,
  "titulo": "string",
  "instituicao": "string",
  "data_conclusao": "date",
  "url_certificado": "string",
  "descricao": "string",
  "categoria": "string"
}
```

### Projetos
```json
{
  "id": 1,
  "titulo": "string",
  "descricao": "string",
  "tecnologias": "string",
  "url_github": "string",
  "url_demo": "string",
  "data_inicio": "date",
  "data_conclusao": "date",
  "status": "string",
  "imagem_url": "string"
}
```

### Competências Técnicas
```json
{
  "id": 1,
  "nome": "string",
  "categoria": "string",
  "nivel": 1-5
}
```

### Competências Interpessoais
```json
{
  "id": 1,
  "nome": "string",
  "descricao": "string",
  "nivel": 1-5
}
```

## Troubleshooting

### Erro de conexão com banco de dados
- Verifique se MySQL está rodando
- Confirme as credenciais no arquivo `.env`
- Certifique-se de que o banco de dados `portfolio_academico` foi criado

### Erro de porta em uso
Se a porta 5000 já está em uso, altere a variável `PORT` no arquivo `.env`

### Erro CORS
O servidor já está configurado para aceitar requisições locais. Se precisar adicionar mais origens, modifique o array `origin` em `src/server.js`
