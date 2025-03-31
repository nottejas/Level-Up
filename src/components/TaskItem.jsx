import { FaCheck, FaTimes, FaTrash, FaCalendarDay } from 'react-icons/fa';

function TaskItem({ task, onToggleStatus, onDelete }) {
  // Format the points to display with 2 decimal places when there are decimals
  const formattedPoints = task.points % 1 === 0 
    ? task.points 
    : task.points.toFixed(2);
  
  return (
    <div className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow-md ${
      task.completed ? 'bg-gray-800' : 'bg-gray-900'
    }`}>
      <div className="flex items-center">
        <div 
          className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 cursor-pointer ${
            task.completed 
              ? 'bg-orange-500 border-orange-500' 
              : 'border-gray-600'
          }`}
          onClick={() => onToggleStatus(task._id, !task.completed)}
        >
          {task.completed && <FaCheck className="text-white text-xs" />}
        </div>
        
        <div>
          <div className="flex items-center">
            <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
              {task.title}
            </p>
            {task.day && (
              <div className="ml-2 px-2 py-0.5 rounded-full bg-gray-800 text-orange-400 text-xs flex items-center">
                <FaCalendarDay className="mr-1" />
                Day {task.day}
              </div>
            )}
          </div>
          <div className="flex items-center mt-1">
            <span className={`text-sm font-medium ${
              task.points >= 0 ? 'text-green-500' : 'text-red-400'
            }`}>
              {task.points > 0 ? '+' : ''}{formattedPoints} points
            </span>
            {task.week && (
              <span className="ml-2 text-xs text-gray-500">
                Week {task.week}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex">
        <button
          onClick={() => onToggleStatus(task._id, !task.completed)}
          className={`p-2 mr-2 rounded-full ${
            task.completed 
              ? 'bg-gray-700 text-orange-400 hover:bg-gray-600' 
              : 'bg-gray-700 text-orange-400 hover:bg-gray-600'
          }`}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed ? <FaTimes /> : <FaCheck />}
        </button>
        
        <button
          onClick={() => onDelete(task._id)}
          className="p-2 bg-gray-700 text-red-400 rounded-full hover:bg-gray-600"
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TaskItem; 