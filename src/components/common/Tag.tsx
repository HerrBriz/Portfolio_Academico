interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "green" | "purple";
}

export function Tag({ children, variant = "default" }: TagProps) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
  };
  
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${variantStyles[variant]}`}>
      {children}
    </span>
  );
}
