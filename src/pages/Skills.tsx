import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { ProgressBar } from "../components/common/ProgressBar";
import { 
  Code2, 
  Database, 
  Palette, 
  Users, 
  MessageSquare, 
  Target,
  Clock,
  Lightbulb,
  Plus,
  Edit2,
  Trash2
} from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Textarea } from "../components/common/Textarea";

interface TechnicalSkill {
  id: number;
  name: string;
  percentage: number;
}

interface SoftSkill {
  id: number;
  name: string;
  icon: string;
  description: string;
}

export function Skills() {
  const [technicalSkills, setTechnicalSkills] = useState<TechnicalSkill[]>([
    { id: 1, name: "JavaScript / TypeScript", percentage: 85 },
    { id: 2, name: "React / Next.js", percentage: 80 },
    { id: 3, name: "HTML & CSS", percentage: 90 },
    { id: 4, name: "Node.js", percentage: 75 },
    { id: 5, name: "Python", percentage: 70 },
    { id: 6, name: "SQL / Banco de Dados", percentage: 75 },
    { id: 7, name: "Git & GitHub", percentage: 85 },
    { id: 8, name: "UI/UX Design", percentage: 65 },
  ]);

  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([
    {
      id: 1,
      name: "Comunicação",
      icon: "MessageSquare",
      description: "Capacidade de expressar ideias de forma clara e objetiva"
    },
    {
      id: 2,
      name: "Trabalho em Equipe",
      icon: "Users",
      description: "Colaboração efetiva com diferentes perfis de pessoas"
    },
    {
      id: 3,
      name: "Resolução de Problemas",
      icon: "Lightbulb",
      description: "Análise crítica e busca por soluções criativas"
    },
    {
      id: 4,
      name: "Organização",
      icon: "Clock",
      description: "Gerenciamento eficiente de tempo e prioridades"
    },
    {
      id: 5,
      name: "Foco em Resultados",
      icon: "Target",
      description: "Orientação para atingir objetivos e metas"
    },
    {
      id: 6,
      name: "Criatividade",
      icon: "Palette",
      description: "Pensamento inovador e abordagens diferenciadas"
    },
  ]);

  const [isTechnicalModalOpen, setIsTechnicalModalOpen] = useState(false);
  const [isSoftSkillModalOpen, setIsSoftSkillModalOpen] = useState(false);
  const [editingTechId, setEditingTechId] = useState<number | null>(null);
  const [editingSoftId, setEditingSoftId] = useState<number | null>(null);
  
  const [techFormData, setTechFormData] = useState<Omit<TechnicalSkill, 'id'>>({
    name: "",
    percentage: 50
  });

  const [softFormData, setSoftFormData] = useState<Omit<SoftSkill, 'id'>>({
    name: "",
    icon: "Target",
    description: ""
  });

  const iconOptions = [
    { value: "MessageSquare", label: "Comunicação" },
    { value: "Users", label: "Equipe" },
    { value: "Lightbulb", label: "Criatividade" },
    { value: "Clock", label: "Tempo" },
    { value: "Target", label: "Objetivo" },
    { value: "Palette", label: "Arte" },
  ];

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      MessageSquare,
      Users,
      Lightbulb,
      Clock,
      Target,
      Palette
    };
    return icons[iconName] || Target;
  };

  // Technical Skills handlers
  const handleAddTechnical = () => {
    setEditingTechId(null);
    setTechFormData({ name: "", percentage: 50 });
    setIsTechnicalModalOpen(true);
  };

  const handleEditTechnical = (skill: TechnicalSkill) => {
    setEditingTechId(skill.id);
    setTechFormData({ name: skill.name, percentage: skill.percentage });
    setIsTechnicalModalOpen(true);
  };

  const handleSaveTechnical = () => {
    if (editingTechId) {
      setTechnicalSkills(technicalSkills.map(skill => 
        skill.id === editingTechId ? { ...techFormData, id: editingTechId } : skill
      ));
    } else {
      const newId = Math.max(...technicalSkills.map(s => s.id), 0) + 1;
      setTechnicalSkills([...technicalSkills, { ...techFormData, id: newId }]);
    }
    setIsTechnicalModalOpen(false);
  };

  const handleDeleteTechnical = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta habilidade?")) {
      setTechnicalSkills(technicalSkills.filter(skill => skill.id !== id));
    }
  };

  // Soft Skills handlers
  const handleAddSoftSkill = () => {
    setEditingSoftId(null);
    setSoftFormData({ name: "", icon: "Target", description: "" });
    setIsSoftSkillModalOpen(true);
  };

  const handleEditSoftSkill = (skill: SoftSkill) => {
    setEditingSoftId(skill.id);
    setSoftFormData({ name: skill.name, icon: skill.icon, description: skill.description });
    setIsSoftSkillModalOpen(true);
  };

  const handleSaveSoftSkill = () => {
    if (editingSoftId) {
      setSoftSkills(softSkills.map(skill => 
        skill.id === editingSoftId ? { ...softFormData, id: editingSoftId } : skill
      ));
    } else {
      const newId = Math.max(...softSkills.map(s => s.id), 0) + 1;
      setSoftSkills([...softSkills, { ...softFormData, id: newId }]);
    }
    setIsSoftSkillModalOpen(false);
  };

  const handleDeleteSoftSkill = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta competência?")) {
      setSoftSkills(softSkills.filter(skill => skill.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Competências</h1>
          <p className="text-gray-600">Habilidades técnicas e interpessoais</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleAddTechnical}>
          Adicionar Competência
        </Button>
      </div>

      {/* Competências Técnicas */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Competências Técnicas</h2>
              <p className="text-sm text-gray-600">Hard Skills</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAddTechnical}>
            Adicionar
          </Button>
        </div>

        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {technicalSkills.map((skill) => (
              <div key={skill.id} className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <ProgressBar 
                    label={skill.name}
                    percentage={skill.percentage}
                  />
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => handleEditTechnical(skill)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTechnical(skill.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Competências Interpessoais */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-gray-900">Competências Interpessoais</h2>
              <p className="text-sm text-gray-600">Soft Skills</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleAddSoftSkill}>
            Adicionar
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {softSkills.map((skill) => {
            const Icon = getIconComponent(skill.icon);
            return (
              <Card key={skill.id} className="p-6" hover>
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-gray-900 mb-2">{skill.name}</h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Edit2 className="w-4 h-4" />}
                      onClick={() => handleEditSoftSkill(skill)}
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      icon={<Trash2 className="w-4 h-4" />}
                      onClick={() => handleDeleteSoftSkill(skill.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Outras Competências */}
      <div>
        <h2 className="text-gray-900 mb-4">Outras Competências</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Metodologias Ágeis</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Conhecimento em Scrum e Kanban para gestão de projetos
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Scrum</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Kanban</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Agile</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Palette className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-2">Design Tools</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Ferramentas de design e prototipagem de interfaces
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Figma</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Adobe XD</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">Canva</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Card para adicionar nova competência */}
      <Card 
        className="p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
        onClick={handleAddTechnical}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Adicionar Nova Competência</h3>
          <p className="text-gray-600 mb-4">
            Adicione novas habilidades técnicas ou interpessoais
          </p>
          <Button variant="secondary">Adicionar</Button>
        </div>
      </Card>

      {/* Modal Technical Skills */}
      <Modal
        isOpen={isTechnicalModalOpen}
        onClose={() => setIsTechnicalModalOpen(false)}
        title={editingTechId ? "Editar Habilidade Técnica" : "Adicionar Habilidade Técnica"}
      >
        <div className="space-y-4">
          <Input
            label="Nome da Habilidade"
            placeholder="Ex: JavaScript / TypeScript"
            value={techFormData.name}
            onChange={(e) => setTechFormData({ ...techFormData, name: e.target.value })}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 text-sm mb-2">
              Nível de Proficiência: {techFormData.percentage}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={techFormData.percentage}
              onChange={(e) => setTechFormData({ ...techFormData, percentage: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSaveTechnical}>
              {editingTechId ? "Salvar Alterações" : "Adicionar Habilidade"}
            </Button>
            <Button variant="ghost" onClick={() => setIsTechnicalModalOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal Soft Skills */}
      <Modal
        isOpen={isSoftSkillModalOpen}
        onClose={() => setIsSoftSkillModalOpen(false)}
        title={editingSoftId ? "Editar Competência Interpessoal" : "Adicionar Competência Interpessoal"}
      >
        <div className="space-y-4">
          <Input
            label="Nome da Competência"
            placeholder="Ex: Comunicação"
            value={softFormData.name}
            onChange={(e) => setSoftFormData({ ...softFormData, name: e.target.value })}
            fullWidth
          />
          <div>
            <label className="block text-gray-700 text-sm mb-2">Ícone</label>
            <select
              value={softFormData.icon}
              onChange={(e) => setSoftFormData({ ...softFormData, icon: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {iconOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <Textarea
            label="Descrição"
            placeholder="Descreva esta competência..."
            value={softFormData.description}
            onChange={(e) => setSoftFormData({ ...softFormData, description: e.target.value })}
            rows={3}
            fullWidth
          />
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSaveSoftSkill}>
              {editingSoftId ? "Salvar Alterações" : "Adicionar Competência"}
            </Button>
            <Button variant="ghost" onClick={() => setIsSoftSkillModalOpen(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}