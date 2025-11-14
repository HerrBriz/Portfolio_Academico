import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { GraduationCap, Calendar, MapPin, Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Textarea } from "../components/common/Textarea";

interface Education {
  id: number;
  institution: string;
  course: string;
  period: string;
  location: string;
  description: string;
  status: string;
}

export function Education() {
  const [educationList, setEducationList] = useState<Education[]>([
    {
      id: 1,
      institution: "ETEC - Escola Técnica Estadual",
      course: "Técnico em Desenvolvimento de Sistemas",
      period: "2023 - 2025",
      location: "São Paulo, SP",
      description: "Curso técnico focado em desenvolvimento de software, incluindo programação orientada a objetos, banco de dados, desenvolvimento web e mobile.",
      status: "Em andamento"
    },
    {
      id: 2,
      institution: "Escola Estadual Prof. João Santos",
      course: "Ensino Médio",
      period: "2020 - 2022",
      location: "São Paulo, SP",
      description: "Ensino médio regular com ênfase em ciências exatas e tecnologia.",
      status: "Concluído"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    institution: "",
    course: "",
    period: "",
    location: "",
    description: "",
    status: "Em andamento"
  });

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      institution: "",
      course: "",
      period: "",
      location: "",
      description: "",
      status: "Em andamento"
    });
    setIsModalOpen(true);
  };

  const handleEdit = (education: Education) => {
    setEditingId(education.id);
    setFormData({
      institution: education.institution,
      course: education.course,
      period: education.period,
      location: education.location,
      description: education.description,
      status: education.status
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setEducationList(educationList.map(edu => 
        edu.id === editingId ? { ...formData, id: editingId } : edu
      ));
    } else {
      const newId = Math.max(...educationList.map(e => e.id), 0) + 1;
      setEducationList([...educationList, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta formação?")) {
      setEducationList(educationList.filter(edu => edu.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Formação Acadêmica</h1>
          <p className="text-gray-600">Histórico educacional e formações</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Adicionar Formação
        </Button>
      </div>

      <div className="space-y-4">
        {educationList.map((education) => (
          <Card key={education.id} className="p-6" hover>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-gray-900">{education.course}</h3>
                    <p className="text-gray-700">{education.institution}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    education.status === "Em andamento" 
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {education.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{education.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{education.location}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{education.description}</p>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={<Edit2 className="w-4 h-4" />}
                    onClick={() => handleEdit(education)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    icon={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleDelete(education.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Card para adicionar nova formação */}
      <Card 
        className="p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
        onClick={handleAdd}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Adicionar Nova Formação</h3>
          <p className="text-gray-600 mb-4">
            Clique para adicionar uma nova formação ao seu portfólio
          </p>
          <Button variant="secondary">Adicionar</Button>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Formação" : "Adicionar Formação"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Nome do Curso"
            placeholder="Ex: Técnico em Desenvolvimento de Sistemas"
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            fullWidth
          />
          <Input
            label="Instituição"
            placeholder="Ex: ETEC - Escola Técnica Estadual"
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            fullWidth
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Período"
              placeholder="Ex: 2023 - 2025"
              value={formData.period}
              onChange={(e) => setFormData({ ...formData, period: e.target.value })}
              fullWidth
            />
            <Input
              label="Localização"
              placeholder="Ex: São Paulo, SP"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Em andamento"
                  checked={formData.status === "Em andamento"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Em andamento</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Concluído"
                  checked={formData.status === "Concluído"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 text-blue-600"
                />
                <span>Concluído</span>
              </label>
            </div>
          </div>
          <Textarea
            label="Descrição"
            placeholder="Descreva o curso, matérias principais e aprendizados..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            fullWidth
          />
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSave}>
              {editingId ? "Salvar Alterações" : "Adicionar Formação"}
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