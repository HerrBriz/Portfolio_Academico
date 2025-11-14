interface ProgressBarProps {
  label: string;
  percentage: number;
  color?: string;
}

export function ProgressBar({ label, percentage, color = "bg-blue-600" }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-700">{label}</span>
        <span className="text-gray-500 text-sm">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
