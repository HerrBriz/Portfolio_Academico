import { Card } from "../components/common/Card";
import { Button } from "../components/common/Button";
import { Avatar } from "../components/common/Avatar";
import { Github, Linkedin, Mail, MapPin, Calendar, Edit2 } from "lucide-react";
import { useState } from "react";
import { Modal } from "../components/common/Modal";
import { Input } from "../components/common/Input";
import { Textarea } from "../components/common/Textarea";

export function Home() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profile, setProfile] = useState({
    name: "Luiz Roberto Briz Quirino",
    title: "Análise e Desenvolvimento de Sistemas",
    description: "Apaixonado por tecnologia e desenvolvimento de software. Atualmente cursando Desenvolvimento de Sistemas, com foco em criar soluções inovadoras e funcionais que impactem positivamente a vida das pessoas.",
    location: "São José dos Campos, SP",
    status: "Disponível para estágio",
    aboutMe: "Sou estudante de Desenvolvimento de Sistemas com grande interesse em tecnologias web modernas e desenvolvimento mobile. Tenho experiência prática em projetos acadêmicos e pessoais que envolvem programação, design de interfaces e resolução de problemas complexos.\n\nBusco constantemente aprimorar minhas habilidades técnicas e interpessoais, participando de cursos, workshops e eventos da área. Meu objetivo é contribuir para projetos inovadores e fazer parte de uma equipe que valoriza o aprendizado contínuo e a excelência técnica.",
  });

  const [formData, setFormData] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(formData);
    setIsEditingProfile(false);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <Avatar size="xl" fallback="JD" />
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-gray-900 mb-2">{profile.name}</h1>
            <p className="text-blue-600 text-xl mb-4">{profile.title}</p>
            <p className="text-gray-600 mb-6 max-w-2xl">
              {profile.description}
            </p>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600 text-sm mb-6">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{profile.status}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Button variant="primary" icon={<Mail className="w-4 h-4" />}>
                Entrar em Contato
              </Button>
              <Button variant="secondary">
                Download CV
              </Button>
              <Button 
                variant="ghost" 
                icon={<Edit2 className="w-4 h-4" />}
                onClick={() => {
                  setFormData(profile);
                  setIsEditingProfile(true);
                }}
              >
                Editar Perfil
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Sobre Mim */}
      <Card className="p-8">
        <h2 className="text-gray-900 mb-4">Sobre Mim</h2>
        <div className="space-y-4 text-gray-600 whitespace-pre-line">
          {profile.aboutMe}
        </div>
      </Card>

      {/* Redes Sociais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6" hover>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Linkedin className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-900">LinkedIn</p>
              <p className="text-sm text-gray-500">@joaodasilva</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6" hover>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Github className="w-6 h-6 text-gray-900" />
            </div>
            <div>
              <p className="text-gray-900">GitHub</p>
              <p className="text-sm text-gray-500">@joaosilva</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6" hover>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-900">E-mail</p>
              <p className="text-sm text-gray-500">joao@email.com</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal de Edição de Perfil */}
      <Modal
        isOpen={isEditingProfile}
        onClose={() => setIsEditingProfile(false)}
        title="Editar Perfil"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Nome Completo"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <Input
            label="Título/Função"
            placeholder="Ex: Estudante de Desenvolvimento de Sistemas"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
          />
          <Textarea
            label="Descrição Breve"
            placeholder="Uma breve descrição sobre você"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            fullWidth
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Localização"
              placeholder="Ex: São Paulo, SP"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              fullWidth
            />
            <Input
              label="Status Atual"
              placeholder="Ex: Disponível para estágio"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              fullWidth
            />
          </div>
          <Textarea
            label="Sobre Mim (Detalhado)"
            placeholder="Conte mais sobre você, suas experiências e objetivos"
            value={formData.aboutMe}
            onChange={(e) => setFormData({ ...formData, aboutMe: e.target.value })}
            rows={8}
            fullWidth
          />
          <div className="flex gap-3 pt-4">
            <Button variant="primary" onClick={handleSaveProfile}>
              Salvar Alterações
            </Button>
            <Button variant="ghost" onClick={() => setIsEditingProfile(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}