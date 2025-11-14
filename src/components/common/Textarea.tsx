interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  fullWidth?: boolean;
}

export function Textarea({ 
  label, 
  placeholder, 
  value, 
  onChange,
  rows = 4,
  fullWidth = false 
}: TextareaProps) {
  const widthStyle = fullWidth ? "w-full" : "";
  
  return (
    <div className={`space-y-2 ${widthStyle}`}>
      {label && (
        <label className="block text-gray-700 text-sm">
          {label}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
      />
    </div>
  );
}
