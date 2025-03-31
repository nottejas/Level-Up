import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleStatus, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-900 rounded-lg shadow-sm">
        <p className="text-gray-400">No tasks found. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-4 max-h-[60vh] overflow-y-auto pr-2">
      {tasks.map(task => (
        <TaskItem
          key={task._id}
          task={task}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList; 