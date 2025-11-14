export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-600 text-center md:text-left">
            <p>© 2025 Portfólio Acadêmico Digital</p>
            <p className="text-sm text-gray-500">Desenvolvido como parte do curso de Desenvolvimento de Sistemas</p>
          </div>
          
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <a href="#" className="hover:text-blue-600 transition-colors">Sobre</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Contato</a>
            <span>•</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
