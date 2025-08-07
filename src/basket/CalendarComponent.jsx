import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({ selectedDate, setSelectedDate, setCurrentSet }) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 40);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setCurrentSet(prev => prev + 1);
  };

  const isDateDisabled = (date) => {
    const dateString = date.toDateString();
    return (
      date.getDay() === 0 || // Sundays
      dateString === today.toDateString() || // Disable today
      dateString === tomorrow.toDateString() // Tomorrow only
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header - Fixed height */}
      <div className="shrink-0 pt-3 pb-2 px-4">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Choose Your Installation Date
        </h2>
      </div>

      {/* Calendar - Centered with exact dimensions */}
      <div className="grow flex items-center justify-center min-h-[300px] p-2">
        <div className="w-full max-w-[350px] h-full">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={today}
            maxDate={maxDate}
            tileDisabled={({ date }) => isDateDisabled(date)}
            tileClassName={({ date, view }) => {
              if (view !== 'month') return '';

              const dateString = date.toDateString();
              const todayString = today.toDateString();
              const tomorrowString = tomorrow.toDateString();
              
              const base = 'text-xs rounded-md h-8 flex items-center justify-center';

              if (dateString === todayString) {
                return `${base} bg-yellow-200 text-gray-800 font-medium cursor-not-allowed`; // Yellow for today
              }

              if (dateString === tomorrowString || date.getDay() === 0) {
                return `${base} text-gray-300 cursor-not-allowed`; // Unavailable
              }

              if (selectedDate?.toDateString() === dateString) {
                return `${base} bg-[#00A69C] text-white font-bold`; // Selected date
              }

              return `${base} text-gray-800 hover:bg-gray-100`; // Default hover effect
            }}
            prev2Label={null}
            next2Label={null}
            className="w-full h-full border-0"
            navigationLabel={({ label }) => (
              <div className="text-center text-sm font-semibold text-gray-700">
                {label}
              </div>
            )}
            prevLabel={
              <span className="text-gray-600 hover:text-[#00A69C] px-1">
                ‹
              </span>
            }
            nextLabel={
              <span className="text-gray-600 hover:text-[#00A69C] px-1">
                ›
              </span>
            }
          />
        </div>
      </div>

      {/* Selected Date - Fixed position */}
      {selectedDate && (
        <div className="shrink-0 py-2 px-4">
          <p className="text-sm text-gray-600 text-center">
            Selected Date:{' '}
            <span className="font-medium text-[#00A69C]">
              {selectedDate.toDateString()}
            </span>
          </p>
        </div>
      )}

      {/* Legend - Fixed at bottom */}
      <div className="shrink-0 pt-2 pb-3 px-4">
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-yellow-200 rounded-sm mb-1"></div>
            <span className="text-xs text-gray-500">Today</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-gray-300 rounded-sm mb-1"></div>
            <span className="text-xs text-gray-500">Unavailable</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-[#00A69C] rounded-sm mb-1"></div>
            <span className="text-xs text-gray-500">Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent;
