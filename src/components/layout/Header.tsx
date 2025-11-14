import { Home, GraduationCap, Award, Briefcase, Target, Link2 } from "lucide-react";

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const menuItems = [
    { id: "home", label: "Apresentação", icon: Home },
    { id: "education", label: "Formação", icon: GraduationCap },
    { id: "courses", label: "Certificações", icon: Award },
    { id: "projects", label: "Projetos", icon: Briefcase },
    { id: "skills", label: "Competências", icon: Target },
    { id: "links", label: "Redes", icon: Link2 },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white">PA</span>
            </div>
            <span className="text-gray-900">Portfólio Acadêmico</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          <button className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
