import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = "primary", 
  size = "md",
  onClick,
  icon,
  fullWidth = false
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg transition-all";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    ghost: "text-gray-600 hover:bg-gray-100",
  };
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };
  
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}
