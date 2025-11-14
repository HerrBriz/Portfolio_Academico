import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Tag } from "../components/common/Tag";
import { Award, Clock, Plus, ExternalLink, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";

interface Course {
  id: number;
  name: string;
  platform: string;
  hours: string;
  status: string;
  certificate: boolean;
  year: string;
  category: string;
}

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      name: "React - The Complete Guide",
      platform: "Udemy",
      hours: "40h",
      status: "Concluído",
      certificate: true,
      year: "2024",
      category: "Frontend"
    },
    {
      id: 2,
      name: "Python para Data Science",
      platform: "Alura",
      hours: "60h",
      status: "Concluído",
      certificate: true,
      year: "2024",
      category: "Backend"
    },
    {
      id: 3,
      name: "UI/UX Design Fundamentals",
      platform: "Coursera",
      hours: "30h",
      status: "Em andamento",
      certificate: false,
      year: "2025",
      category: "Design"
    },
    {
      id: 4,
      name: "Git e GitHub do básico ao avançado",
      platform: "Udemy",
      hours: "20h",
      status: "Concluído",
      certificate: true,
      year: "2023",
      category: "DevOps"
    },
    {
      id: 5,
      name: "SQL Completo",
      platform: "Alura",
      hours: "50h",
      status: "Concluído",
      certificate: true,
      year: "2024",
      category: "Database"
    },
    {
      id: 6,
      name: "JavaScript Moderno ES6+",
      platform: "Udemy",
      hours: "35h",
      status: "Concluído",
      certificate: true,
      year: "2023",
      category: "Frontend"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Course, 'id'>>({
    name: "",
    platform: "",
    hours: "",
    status: "Em andamento",
    certificate: false,
    year: new Date().getFullYear().toString(),
    category: "Frontend"
  });

  const totalHours = courses.reduce((sum, course) => {
    return sum + parseInt(course.hours.replace('h', ''));
  }, 0);

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      platform: "",
      hours: "",
      status: "Em andamento",
      certificate: false,
      year: new Date().getFullYear().toString(),
      category: "Frontend"
    });
    setIsModalOpen(true);
  };

  const handleEdit = (course: Course) => {
    setEditingId(course.id);
    setFormData({
      name: course.name,
      platform: course.platform,
      hours: course.hours,
      status: course.status,
      certificate: course.certificate,
      year: course.year,
      category: course.category
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setCourses(courses.map(course => 
        course.id === editingId ? { ...formData, id: editingId } : course
      ));
    } else {
      const newId = Math.max(...courses.map(c => c.id), 0) + 1;
      setCourses([...courses, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este curso?")) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Cursos e Certificações</h1>
          <p className="text-gray-600">Cursos complementares e certificações obtidas</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Adicionar Curso
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{courses.length}</p>
              <p className="text-sm text-gray-600">Certificações</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{totalHours}h</p>
              <p className="text-sm text-gray-600">Horas de estudo</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{new Set(courses.map(c => c.platform)).size}</p>
              <p className="text-sm text-gray-600">Plataformas</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Lista de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-6" hover>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <Tag variant={course.status === "Concluído" ? "green" : "blue"}>
                  {course.status}
                </Tag>
              </div>
              
              <div>
                <h3 className="text-gray-900 mb-2">{course.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{course.platform}</p>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.hours}</span>
                  </div>
                  <span>•</span>
                  <span>{course.year}</span>
                </div>
                
                <Tag variant="default">{course.category}</Tag>
              </div>
              
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                {course.certificate && (
                  <Button variant="ghost" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                    Ver certificado
                  </Button>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Edit2 className="w-4 h-4" />}
                  onClick={() => handleEdit(course)}
                >
                  Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(course.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Card para adicionar novo curso */}
      <Card 
        className="p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
        onClick={handleAdd}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">Adicionar Novo Curso</h3>
          <p className="text-gray-600 mb-4">
            Adicione cursos complementares e certificações ao seu portfólio
          </p>
          <Button variant="secondary">Adicionar</Button>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Curso" : "Adicionar Curso"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Nome do Curso"
            placeholder="Ex: React - The Complete Guide"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Plataforma"
              placeholder="Ex: Udemy, Alura, Coursera"
              value={formData.platform}
              onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
              fullWidth
            />
            <Input
              label="Carga Horária"
              placeholder="Ex: 40h"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              fullWidth
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="DevOps">DevOps</option>
                <option value="Database">Database</option>
                <option value="Mobile">Mobile</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <Input
              label="Ano"
              placeholder="Ex: 2024"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
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
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.certificate}
                onChange={(e) => setFormData({ ...formData, certificate: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <span className="text-gray-700 text-sm">Possui certificado</span>
            </label>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSave}>
              {editingId ? "Salvar Alterações" : "Adicionar Curso"}
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