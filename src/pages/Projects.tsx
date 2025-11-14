import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Tag } from "../components/common/Tag";
import { Briefcase, ExternalLink, Github, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Textarea } from "../components/common/Textarea";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  year: string;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Sistema de Gerenciamento Escolar",
      description: "Plataforma completa para gestão de alunos, professores, notas e frequência. Interface intuitiva e responsiva.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      status: "Concluído",
      year: "2024"
    },
    {
      id: 2,
      title: "App de Controle Financeiro",
      description: "Aplicativo mobile para gerenciamento de despesas pessoais com gráficos e relatórios detalhados.",
      technologies: ["React Native", "Firebase", "Chart.js"],
      status: "Em desenvolvimento",
      year: "2025"
    },
    {
      id: 3,
      title: "E-commerce de Livros",
      description: "Loja virtual completa com carrinho de compras, sistema de pagamento e painel administrativo.",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "TypeScript"],
      status: "Concluído",
      year: "2024"
    },
    {
      id: 4,
      title: "API RESTful para Biblioteca",
      description: "API completa para gerenciamento de biblioteca com autenticação, CRUD de livros e sistema de empréstimos.",
      technologies: ["Python", "FastAPI", "SQLAlchemy", "JWT"],
      status: "Concluído",
      year: "2023"
    },
    {
      id: 5,
      title: "Dashboard Analytics",
      description: "Dashboard interativo para visualização de dados e métricas com gráficos em tempo real.",
      technologies: ["React", "D3.js", "Recharts", "Express"],
      status: "Em desenvolvimento",
      year: "2025"
    },
    {
      id: 6,
      title: "Portfolio Interativo",
      description: "Site portfolio pessoal com animações suaves, modo escuro e integração com redes sociais.",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      status: "Concluído",
      year: "2023"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: "",
    description: "",
    technologies: [],
    status: "Em desenvolvimento",
    year: new Date().getFullYear().toString()
  });
  const [techInput, setTechInput] = useState("");

  const completedCount = projects.filter(p => p.status === "Concluído").length;
  const inProgressCount = projects.filter(p => p.status === "Em desenvolvimento").length;

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      technologies: [],
      status: "Em desenvolvimento",
      year: new Date().getFullYear().toString()
    });
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      status: project.status,
      year: project.year
    });
    setTechInput("");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setProjects(projects.map(project => 
        project.id === editingId ? { ...formData, id: editingId } : project
      ));
    } else {
      const newId = Math.max(...projects.map(p => p.id), 0) + 1;
      setProjects([...projects, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este projeto?")) {
      setProjects(projects.filter(project => project.id !== id));
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Projetos Desenvolvidos</h1>
          <p className="text-gray-600">Portfólio de projetos acadêmicos e pessoais</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Adicionar Projeto
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{projects.length}</p>
              <p className="text-sm text-gray-600">Projetos totais</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{completedCount}</p>
              <p className="text-sm text-gray-600">Concluídos</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{inProgressCount}</p>
              <p className="text-sm text-gray-600">Em desenvolvimento</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid de Projetos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="p-6" hover>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <Tag variant={project.status === "Concluído" ? "green" : "blue"}>
                  {project.status}
                </Tag>
              </div>
              
              <div>
                <h3 className="text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <Tag key={index} variant="default">{tech}</Tag>
                  ))}
                </div>
                
                <p className="text-sm text-gray-500">{project.year}</p>
              </div>
              
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                  Ver detalhes
                </Button>
                <Button variant="ghost" size="sm" icon={<Github className="w-4 h-4" />}>
                  GitHub
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Edit2 className="w-4 h-4" />}
                  onClick={() => handleEdit(project)}
                >
                  Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(project.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Card para adicionar novo projeto */}
      <Card 
        className="p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
        onClick={handleAdd}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Adicionar Novo Projeto</h3>
          <p className="text-gray-600 mb-4">
            Adicione projetos acadêmicos ou pessoais ao seu portfólio
          </p>
          <Button variant="secondary">Adicionar</Button>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Projeto" : "Adicionar Projeto"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Título do Projeto"
            placeholder="Ex: Sistema de Gerenciamento Escolar"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <Textarea
            label="Descrição"
            placeholder="Descreva o projeto, suas funcionalidades e objetivos..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 text-sm mb-2">Tecnologias Utilizadas</label>
            <div className="flex gap-2 mb-3">
              <Input
                placeholder="Ex: React, Node.js, MongoDB..."
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTechnology();
                  }
                }}
                fullWidth
              />
              <Button variant="secondary" onClick={addTechnology}>
                Adicionar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  {tech}
                  <button
                    onClick={() => removeTechnology(tech)}
                    className="hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Ano"
              placeholder="Ex: 2024"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              fullWidth
            />
            <div>
              <label className="block text-gray-700 text-sm mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Em desenvolvimento">Em desenvolvimento</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSave}>
              {editingId ? "Salvar Alterações" : "Adicionar Projeto"}
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}