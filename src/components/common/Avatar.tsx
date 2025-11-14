interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  fallback?: string;
}

export function Avatar({ src, alt = "Avatar", size = "md", fallback = "A" }: AvatarProps) {
  const sizeStyles = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };
  
  return (
    <div className={`${sizeStyles[size]} rounded-full overflow-hidden bg-gray-200 flex items-center justify-center`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="text-gray-600 text-2xl">{fallback}</span>
      )}
    </div>
  );
}
