interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
}

export function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange,
  fullWidth = false 
}: InputProps) {
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <div className={`space-y-2 ${widthStyle}`}>
      {label && (
        <label className="block text-gray-700 text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  );
}
