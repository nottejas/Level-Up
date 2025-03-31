import { useState, useEffect } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ProgressBar from './components/ProgressBar'
import Clock from './components/Clock'
import ScoreDisplay from './components/ScoreDisplay'
import DayProgressBar from './components/DayProgressBar'
import { fetchTasks, addTask, updateTaskStatus, deleteTask } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedDay, setSelectedDay] = useState(1)

  useEffect(() => {
    const initApp = async () => {
      try {
        const tasksData = await fetchTasks()
        setTasks(tasksData)
      } catch (err) {
        console.error('Failed to initialize app:', err)
        setError('Failed to load tasks. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    initApp()
  }, [])

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await addTask(taskData)
      setTasks([newTask, ...tasks])
      setSelectedDay(taskData.day || 1)
    } catch (err) {
      setError('Failed to add task. Please try again.')
    }
  }

  const handleToggleStatus = async (id, completed) => {
    try {
      const updatedTask = await updateTaskStatus(id, completed)
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, completed } : task
      ))
    } catch (err) {
      setError('Failed to update task status. Please try again.')
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id)
      setTasks(tasks.filter(task => task._id !== id))
    } catch (err) {
      setError('Failed to delete task. Please try again.')
    }
  }

  // Filter tasks by selected day
  const filteredTasks = tasks.filter(task => (task.day || 1) === selectedDay)
  
  // Calculate completion percentage for the filtered tasks
  const completionPercentage = filteredTasks.length 
    ? Math.round((filteredTasks.filter(task => task.completed).length / filteredTasks.length) * 100) 
    : 0

  // Calculate total points - ensuring we handle decimal points correctly
  const totalPoints = parseFloat(tasks.reduce((sum, task) => {
    const taskPoints = parseFloat(task.points)
    if (task.completed) {
      return sum + taskPoints
    } else {
      // Deduct points for uncompleted tasks
      return sum - (taskPoints < 0 ? 0 : taskPoints)
    }
  }, 0).toFixed(2))

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen darker-bg">
        <p className="text-xl orange-flame">Loading...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl darker-bg">
      <h1 className="text-4xl font-bold text-center mb-2 orange-flame">Level Up</h1>
      <p className="text-center text-gray-400 mb-8">Track your tasks and level up your productivity</p>
      
      {error && (
        <div className="bg-red-900 border-l-4 border-red-500 text-white p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      <Clock />
      
      <div className="two-column-layout">
        {/* Left column - Form and stats */}
        <div className="space-y-6">
          <ScoreDisplay totalPoints={totalPoints} />
          
          <DayProgressBar tasks={tasks} totalPoints={totalPoints} />
          
          <div className="dark-bg p-4 rounded-lg shadow-lg mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold orange-flame">Day {selectedDay} Tasks</h2>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <button 
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-2 py-1 rounded-md text-sm ${
                      selectedDay === day
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
            
            <ProgressBar percentage={completionPercentage} label={`Day ${selectedDay} Completion`} />
            
            <div className="text-sm text-gray-400 mt-1 mb-4">
              {filteredTasks.length === 0 
                ? `No tasks for Day ${selectedDay}. Add some tasks below.` 
                : `${filteredTasks.filter(t => t.completed).length} of ${filteredTasks.length} tasks completed`
              }
            </div>
            
            <TaskForm onAddTask={handleAddTask} initialDay={selectedDay} />
          </div>
        </div>
        
        {/* Right column - Tasks list */}
        <div className="space-y-6">
          <div className="dark-bg rounded-lg p-4 shadow-lg">
            <h2 className="text-xl font-bold mb-4 orange-flame">Day {selectedDay} Tasks</h2>
            <TaskList 
              tasks={filteredTasks} 
              onToggleStatus={handleToggleStatus}
              onDelete={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
