import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Calendar() {
  
  const [currentMonth, setCurrentMonth] = useState(() => {  // state for current month
    const today = new Date(); 
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  
  const [selectedDate, setSelectedDate] = useState(null); // state to track selected date

  // Get start of the week for a given date (Sunday)
  const startOfWeek = (date) => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - date.getDay());
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  };

  // Get end of the last week of the month
  const endOfMonthWeek = (date) => {
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const endOfWeek = new Date(endOfMonth);
    endOfWeek.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()));
    endOfWeek.setHours(0, 0, 0, 0);
    return endOfWeek;
  };

   //To generate all dates to display between start and end
  const generateDates = () => {
    const dates = [];
    let day = new Date(startDay);
    while (day <= endDay) {
      dates.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    return dates;
  };

  //To check if a date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  
  // To check if a date is in the past or not
  const isPast = (date) => {
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0); 
    return date < todayMidnight ;
  };

  const isSameMonth = (date) => {
    return date.getMonth() === currentMonth.getMonth(); //to check if a date is of the current month
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)); // to to previous month
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)); //go to next month
    setSelectedDate(null);
  };

  const handleDateClick = (date) => {
    if (isPast(date) || !isSameMonth(date)) return; // to prevent selecting past dates or dates not in the current month
    setSelectedDate(date);
  };

  const monthYearFormat = (date) => {
    return date.toLocaleString('default', { month: 'short', year: 'numeric' }); // Format month and year 
  };

  const startDay = startOfWeek(currentMonth);
  const endDay = endOfMonthWeek(currentMonth);

  return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
  <div className="w-80 bg-white rounded-xl overflow-hidden shadow-md">
  
    {/* Top */}
    <div className="bg-blue-100 w-full pb-2 rounded-t-xl">
      <div className="h-4"></div>  
      <div className="flex items-center justify-between px-4">
        <button onClick={handlePrevMonth} 
         aria-label="Previous Month"
         className="relative left-4 text-gray-600 hover:text-black cursor-pointer">
         <FaChevronLeft size={18}/> {/* left arrow */}
        </button>
        <div className="text-lg font-semibold text-gray-700">{monthYearFormat(currentMonth)}</div>
        <button onClick={handleNextMonth} 
         aria-label="Next Month"
         className="relative right-4 text-gray-600 hover:text-black cursor-pointer">
          <FaChevronRight size={18}/> {/* right arrow */}
        </button>
      </div>

      
      <div className="h-4"></div>

     {/* For Weekdays */}
      <div className="grid grid-cols-7 text-center text-gray-600 font-medium text-sm mt-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={`${day}-${index}`} className="py-2">
            {day}
          </div>
        ))}
      </div>
      <div className="h-2"></div> 
    </div>

    {/*Dates listing from here */}
    <div className="bg-white grid grid-cols-7 gap-2 text-center p-4">
      {generateDates().map((date, idx) => (
        <div
          key={idx}
          onClick={() => handleDateClick(date)}
          className={`h-10 w-10 flex items-center justify-center rounded-full text-sm
            ${!isSameMonth(date) ? "invisible"
              : selectedDate &&
                date.getDate() === selectedDate.getDate() &&
                date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear()
              ? "bg-green-400 text-white"
              : isToday(date)
              ? "bg-gray-400 text-white cursor-pointer"
              : isPast(date)
              ? "text-gray-300 cursor-not-allowed pointer-events-none"
              : "text-gray-700 hover:bg-green-100 cursor-pointer"
            }`}
        >
          {date.getDate()} 
        </div>
      ))}
    </div>
    <div className="h-4"></div>
  </div>
</div>
  );
}
