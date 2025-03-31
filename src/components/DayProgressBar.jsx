import { useState, useEffect } from 'react';

function DayProgressBar({ tasks, totalPoints }) {
  // Constants for the 21-day challenge
  const TOTAL_DAYS = 21;
  const DAYS_PER_WEEK = 7;
  const TOTAL_WEEKS = 3;
  const WEEK_PERCENTAGE = 33.33; // Each week is 33.33% of total
  const DAY_PERCENTAGE = 4.76; // Each day is ~4.76% (100/21)
  
  const [currentDay, setCurrentDay] = useState(1);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [overallPercentage, setOverallPercentage] = useState(0);
  const [daysWithCompletedTasks, setDaysWithCompletedTasks] = useState(new Set());
  const [dayCompletionPercentages, setDayCompletionPercentages] = useState({});
  const [day1Details, setDay1Details] = useState({ total: 0, completed: 0, percentage: 0 });
  const [tasksByDay, setTasksByDay] = useState({});
  
  // Calculate progress based on completed tasks by day
  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      setCurrentDay(1);
      setCurrentWeek(1);
      setOverallPercentage(0);
      setDayCompletionPercentages({});
      setDay1Details({ total: 0, completed: 0, percentage: 0 });
      setTasksByDay({});
      return;
    }
    
    // Group tasks by day
    const groupedTasksByDay = {};
    tasks.forEach(task => {
      const day = task.day || 1; // Default to day 1 if not specified
      if (!groupedTasksByDay[day]) {
        groupedTasksByDay[day] = [];
      }
      groupedTasksByDay[day].push(task);
    });
    
    setTasksByDay(groupedTasksByDay);
    
    // Calculate completion percentage for each day
    const dayPercentages = {};
    Object.keys(groupedTasksByDay).forEach(day => {
      const dayTasks = groupedTasksByDay[day];
      if (dayTasks.length > 0) {
        const completedTasks = dayTasks.filter(task => task.completed).length;
        dayPercentages[day] = Math.round((completedTasks / dayTasks.length) * 100);
      } else {
        dayPercentages[day] = 0;
      }
    });
    
    // Special handling for Day 1
    if (groupedTasksByDay['1'] && groupedTasksByDay['1'].length > 0) {
      const day1Tasks = groupedTasksByDay['1'];
      const day1CompletedTasks = day1Tasks.filter(task => task.completed).length;
      const day1Percentage = Math.round((day1CompletedTasks / day1Tasks.length) * 100);
      
      setDay1Details({
        total: day1Tasks.length,
        completed: day1CompletedTasks,
        percentage: day1Percentage
      });
    } else {
      setDay1Details({ total: 0, completed: 0, percentage: 0 });
    }
    
    // Check which days have all tasks completed
    const completedDays = new Set();
    Object.keys(dayPercentages).forEach(day => {
      if (dayPercentages[day] === 100) {
        completedDays.add(parseInt(day));
      }
    });
    
    // Update state based on completed days
    setDaysWithCompletedTasks(completedDays);
    setDayCompletionPercentages(dayPercentages);
    
    // Find the highest day number with a task (completed or not) to determine "current day"
    let maxDay = 1;
    tasks.forEach(task => {
      if (task.day > maxDay) {
        maxDay = task.day;
      }
    });
    
    const calculatedCurrentDay = Math.min(maxDay, TOTAL_DAYS);
    const calculatedCurrentWeek = Math.ceil(calculatedCurrentDay / DAYS_PER_WEEK);
    
    // Calculate overall percentage based on completed days (not tasks)
    // Each completed day contributes equally to the overall progress
    const completedDaysCount = completedDays.size;
    const calculatedPercentage = (completedDaysCount / TOTAL_DAYS) * 100;
    
    setCurrentDay(calculatedCurrentDay);
    setCurrentWeek(calculatedCurrentWeek);
    setOverallPercentage(parseFloat(calculatedPercentage.toFixed(2)));
  }, [tasks]);
  
  // Generate array for day markers
  const dayMarkers = Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1);
  
  return (
    <div className="dark-bg p-4 rounded-lg shadow-lg mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold orange-flame">Daily Progress</h2>
        <span className="text-sm font-medium text-gray-300">
          Day {currentDay} / Week {currentWeek} (<span className="text-orange-500">{overallPercentage}%</span>)
        </span>
      </div>
      
      {/* Day 1 Highlight */}
      <div className="mb-5 p-3 bg-gray-800 rounded-lg border border-gray-700">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-lg font-semibold text-orange-400">Day 1</h3>
          <div className="text-sm font-medium text-gray-300">
            {day1Details.completed} of {day1Details.total} tasks completed
          </div>
        </div>
        <div className="w-full bg-gray-900 rounded-full h-4 mb-1">
          <div 
            className="bg-orange-500 h-4 rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${day1Details.percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">0%</span>
          <span className={day1Details.percentage === 100 ? "text-orange-400 font-bold" : "text-gray-400"}>
            {day1Details.percentage}%
          </span>
          <span className="text-gray-400">100%</span>
        </div>
      </div>
      
      {/* Overall 21-day challenge progress */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-sm font-medium text-gray-300">Challenge Progress:</h3>
          <span className="text-xs font-medium text-orange-400">{daysWithCompletedTasks.size} of {TOTAL_DAYS} days completed</span>
        </div>
        <div className="w-full bg-gray-800 rounded-lg h-3 mb-1">
          <div 
            className="bg-orange-500 h-3 rounded-lg transition-all duration-500 ease-in-out" 
            style={{ width: `${overallPercentage}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 text-right">
          Each completed day: {DAY_PERCENTAGE.toFixed(2)}% of total
        </div>
      </div>
      
      {/* Week markers */}
      <div className="flex justify-between text-xs text-gray-500 px-1 mb-4">
        <div className="flex flex-col items-center">
          <div className={`w-1 h-2 ${currentWeek >= 1 ? 'bg-orange-500' : 'bg-gray-700'} rounded-full mb-1`}></div>
          <span>Week 1</span>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-1 h-2 ${currentWeek >= 2 ? 'bg-orange-500' : 'bg-gray-700'} rounded-full mb-1`}></div>
          <span>Week 2</span>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-1 h-2 ${currentWeek >= 3 ? 'bg-orange-500' : 'bg-gray-700'} rounded-full mb-1`}></div>
          <span>Week 3</span>
        </div>
        <div className="flex flex-col items-center">
          <div className={`w-1 h-2 ${daysWithCompletedTasks.size >= TOTAL_DAYS ? 'bg-orange-500' : 'bg-gray-700'} rounded-full mb-1`}></div>
          <span>Complete!</span>
        </div>
      </div>
      
      {/* Week percentage breakdown */}
      <div className="grid grid-cols-3 gap-1 text-center text-xs mb-5">
        <div className={`p-1 rounded ${currentWeek >= 1 ? 'bg-gray-800 text-orange-400' : 'bg-gray-900 text-gray-500'}`}>
          Week 1: 33.33%
        </div>
        <div className={`p-1 rounded ${currentWeek >= 2 ? 'bg-gray-800 text-orange-400' : 'bg-gray-900 text-gray-500'}`}>
          Week 2: 33.33%
        </div>
        <div className={`p-1 rounded ${currentWeek >= 3 ? 'bg-gray-800 text-orange-400' : 'bg-gray-900 text-gray-500'}`}>
          Week 3: 33.33%
        </div>
      </div>
      
      {/* Day-specific progress */}
      <div className="mt-4 space-y-3">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Daily Tasks Completion:</h3>
        <div className="day-progress-container">
          {dayMarkers.map(day => (
            <div key={day} className="flex flex-col items-center">
              <div className="text-xs text-gray-400 mb-1">Day {day}</div>
              <div className="day-progress-bar">
                <div 
                  className="day-progress-indicator"
                  style={{ 
                    width: `${dayCompletionPercentages[day] || 0}%`,
                    backgroundColor: dayCompletionPercentages[day] === 100 
                      ? '#FF6B35' // Orange for 100%
                      : dayCompletionPercentages[day] > 0 
                        ? '#FF8C5A' // Lighter orange for partial
                        : day <= currentDay 
                          ? '#4B5563' // Gray for current day with no progress
                          : '#1F2937' // Dark gray for future days
                  }}
                />
              </div>
              <div className="flex justify-between w-full text-xs mt-1">
                <span style={{ color: tasksByDay[day] ? '#FF6B35' : '#6B7280' }}>
                  {tasksByDay[day] ? tasksByDay[day].length : 0} tasks
                </span>
                <span style={{ color: dayCompletionPercentages[day] ? '#FF6B35' : '#6B7280' }}>
                  {dayCompletionPercentages[day] || 0}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DayProgressBar; 