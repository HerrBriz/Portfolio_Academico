import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { 
  Linkedin, 
  Github, 
  Mail, 
  Globe,
  Twitter,
  Instagram,
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { Textarea } from "../components/common/Textarea";

interface ProfessionalLink {
  id: number;
  name: string;
  icon: string;
  url: string;
  description: string;
  color: string;
  iconColor: string;
}

export function Links() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [professionalLinks, setProfessionalLinks] = useState<ProfessionalLink[]>([
    {
      id: 1,
      name: "LinkedIn",
      icon: "Linkedin",
      url: "linkedin.com/in/joaodasilva",
      description: "Perfil profissional e networking",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      name: "GitHub",
      icon: "Github",
      url: "github.com/joaosilva",
      description: "Repositórios de código e projetos",
      color: "bg-gray-100",
      iconColor: "text-gray-900"
    },
    {
      id: 3,
      name: "E-mail",
      icon: "Mail",
      url: "joao.silva@email.com",
      description: "Contato profissional",
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      name: "Portfólio",
      icon: "Globe",
      url: "joaosilva.dev",
      description: "Site pessoal e portfólio online",
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      id: 5,
      name: "Twitter",
      icon: "Twitter",
      url: "twitter.com/joaosilvadev",
      description: "Atualizações e conteúdo tech",
      color: "bg-sky-100",
      iconColor: "text-sky-600"
    },
    {
      id: 6,
      name: "Instagram",
      icon: "Instagram",
      url: "instagram.com/joaosilva.dev",
      description: "Conteúdo sobre desenvolvimento",
      color: "bg-pink-100",
      iconColor: "text-pink-600"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<ProfessionalLink, 'id'>>({
    name: "",
    icon: "Globe",
    url: "",
    description: "",
    color: "bg-blue-100",
    iconColor: "text-blue-600"
  });

  const iconOptions = [
    { value: "Linkedin", label: "LinkedIn" },
    { value: "Github", label: "GitHub" },
    { value: "Mail", label: "E-mail" },
    { value: "Globe", label: "Website" },
    { value: "Twitter", label: "Twitter" },
    { value: "Instagram", label: "Instagram" },
  ];

  const colorOptions = [
    { bg: "bg-blue-100", icon: "text-blue-600", label: "Azul" },
    { bg: "bg-green-100", icon: "text-green-600", label: "Verde" },
    { bg: "bg-purple-100", icon: "text-purple-600", label: "Roxo" },
    { bg: "bg-pink-100", icon: "text-pink-600", label: "Rosa" },
    { bg: "bg-sky-100", icon: "text-sky-600", label: "Céu" },
    { bg: "bg-gray-100", icon: "text-gray-900", label: "Cinza" },
    { bg: "bg-orange-100", icon: "text-orange-600", label: "Laranja" },
  ];

  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Linkedin,
      Github,
      Mail,
      Globe,
      Twitter,
      Instagram
    };
    return icons[iconName] || Globe;
  };

  const handleCopy = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: "",
      icon: "Globe",
      url: "",
      description: "",
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    });
    setIsModalOpen(true);
  };

  const handleEdit = (link: ProfessionalLink) => {
    setEditingId(link.id);
    setFormData({
      name: link.name,
      icon: link.icon,
      url: link.url,
      description: link.description,
      color: link.color,
      iconColor: link.iconColor
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingId) {
      setProfessionalLinks(professionalLinks.map(link => 
        link.id === editingId ? { ...formData, id: editingId } : link
      ));
    } else {
      const newId = Math.max(...professionalLinks.map(l => l.id), 0) + 1;
      setProfessionalLinks([...professionalLinks, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este link?")) {
      setProfessionalLinks(professionalLinks.filter(link => link.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 mb-2">Links Profissionais</h1>
          <p className="text-gray-600">Redes sociais e canais de contato</p>
        </div>
        <Button variant="primary" icon={<Plus className="w-4 h-4" />} onClick={handleAdd}>
          Adicionar Link
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">{professionalLinks.length}</p>
              <p className="text-sm text-gray-600">Plataformas conectadas</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">100%</p>
              <p className="text-sm text-gray-600">Perfil completo</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl text-gray-900">24</p>
              <p className="text-sm text-gray-600">Visitas este mês</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Grid de Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {professionalLinks.map((link) => {
          const Icon = getIconComponent(link.icon);
          return (
            <Card key={link.id} className="p-6" hover>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${link.iconColor}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 mb-1">{link.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{link.description}</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded truncate">
                      {link.url}
                    </code>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  Visitar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={copiedId === link.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  onClick={() => handleCopy(link.url, link.id)}
                >
                  {copiedId === link.id ? "Copiado!" : "Copiar"}
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Edit2 className="w-4 h-4" />}
                  onClick={() => handleEdit(link)}
                >
                  Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(link.id)}
                >
                  Excluir
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Card decorativo */}
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-none">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Globe className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-gray-900 mb-2">Dica: Mantenha seus links atualizados</h3>
          <p className="text-gray-600 text-sm">
            Links profissionais atualizados aumentam suas chances de networking e oportunidades de emprego.
            Certifique-se de que todos os seus perfis estão completos e ativos.
          </p>
        </div>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingId ? "Editar Link" : "Adicionar Link"}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Nome da Plataforma"
            placeholder="Ex: LinkedIn"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <Input
            label="URL"
            placeholder="Ex: linkedin.com/in/seu-perfil"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            fullWidth
          />
          <Textarea
            label="Descrição"
            placeholder="Breve descrição do link"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            fullWidth
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm mb-2">Ícone</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-2">Cor</label>
              <select
                value={formData.color}
                onChange={(e) => {
                  const selected = colorOptions.find(c => c.bg === e.target.value);
                  if (selected) {
                    setFormData({ ...formData, color: selected.bg, iconColor: selected.icon });
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {colorOptions.map(option => (
                  <option key={option.bg} value={option.bg}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSave}>
              {editingId ? "Salvar Alterações" : "Adicionar Link"}
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