import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

function TaskForm({ onAddTask, initialDay = 1 }) {
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);
  const [day, setDay] = useState(initialDay);
  
  // Update day state when initialDay prop changes
  useEffect(() => {
    setDay(initialDay);
  }, [initialDay]);
  
  // Generate array of days 1-21
  const days = Array.from({ length: 21 }, (_, i) => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({
      title,
      points: parseFloat(points),
      completed: false,
      day: parseInt(day),
      week: Math.ceil(parseInt(day) / 7)
    });
    
    setTitle('');
    setPoints(0);
    // Don't reset day to allow for quick entry of multiple tasks for the same day
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="mb-6"
    >
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-300 font-bold mb-2">
          Task Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter task title"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="points" className="block text-gray-300 font-bold mb-2">
            Points Value
          </label>
          <input
            type="number"
            id="points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
            min="-100"
            max="100"
            step="0.01" // Allow decimal values with 2 places
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Positive for rewards, negative for penalties
          </p>
        </div>
        
        <div>
          <label htmlFor="day" className="block text-gray-300 font-bold mb-2">
            Challenge Day
          </label>
          <select
            id="day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-800 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            {days.map(d => (
              <option key={d} value={d}>
                Day {d} (Week {Math.ceil(d / 7)})
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Which day of the 21-day challenge
          </p>
        </div>
      </div>
      
      <button
        type="submit"
        className="flex items-center justify-center orange-flame-bg hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        <FaPlus className="mr-2" />
        Add Task for Day {day}
      </button>
    </form>
  );
}

export default TaskForm; 