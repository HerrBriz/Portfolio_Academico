import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  const hoverStyles = hover ? "hover:shadow-lg transition-shadow cursor-pointer" : "";
  
  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
