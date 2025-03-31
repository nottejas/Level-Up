function ScoreDisplay({ totalPoints }) {
  // Format points to show decimal places only when needed
  const formattedPoints = totalPoints % 1 === 0 
    ? totalPoints 
    : totalPoints.toFixed(2);
    
  return (
    <div className="dark-bg p-6 rounded-lg shadow-lg mb-6 text-center">
      <h2 className="text-xl font-semibold text-gray-300 mb-3">Total Points</h2>
      <p className={`text-4xl font-bold ${
        totalPoints > 0 
          ? 'text-orange-500' 
          : totalPoints < 0 
            ? 'text-red-500' 
            : 'text-gray-400'
      }`}>
        {totalPoints > 0 ? '+' : ''}{formattedPoints}
      </p>
    </div>
  );
}

export default ScoreDisplay; 