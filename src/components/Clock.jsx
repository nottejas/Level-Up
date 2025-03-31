import { useState, useEffect } from 'react';
import moment from 'moment';

function Clock() {
  const [dateTime, setDateTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(moment());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center mb-8 dark-bg p-4 rounded-lg shadow-lg">
      <p className="text-3xl font-bold orange-flame">
        {dateTime.format('h:mm:ss A')}
      </p>
      <p className="text-gray-400 mt-1">
        {dateTime.format('dddd, MMMM D, YYYY')}
      </p>
    </div>
  );
}

export default Clock; 