function ProgressBar({ percentage, label }) {
  const displayLabel = label || "Task Completion";
  
  return (
    <div className="w-full mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-300">{displayLabel}</span>
        <span className="text-sm font-medium text-orange-500">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-3">
        <div 
          className="bg-orange-500 h-3 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar; 