import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Home } from "./pages/Home";
import { Education } from "./pages/Education";
import { Courses } from "./pages/Courses";
import { Projects } from "./pages/Projects";
import { Skills } from "./pages/Skills";
import { Links } from "./pages/Links";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home />;
      case "education":
        return <Education />;
      case "courses":
        return <Courses />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "links":
        return <Links />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header activePage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {renderPage()}
      </main>
      
      <Footer />
    </div>
  );
}
