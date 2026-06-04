import React from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  isBefore, 
  startOfToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  blockedDates: string[]; // YYYY-MM-DD
  checkIn: Date | null;
  checkOut: Date | null;
  onDateClick: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ 
  blockedDates, 
  checkIn, 
  checkOut, 
  onDateClick 
}) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const today = startOfToday();

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-serif font-bold text-primary">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex space-x-2">
          <button 
            type="button"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1 hover:bg-accent/20 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-primary" />
          </button>
          <button 
            type="button"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1 hover:bg-accent/20 rounded-full transition-colors"
          >
            <ChevronRight size={20} className="text-primary" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="grid grid-cols-7 mb-2">
        {days.map(dayName => (
          <div key={dayName} className="text-center text-[10px] uppercase tracking-widest text-text/40 font-bold">
            {dayName}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        // Capture the current day in a constant for the closure
        const currentDay = new Date(day);
        const formattedDate = format(currentDay, 'yyyy-MM-dd');
        const isBlocked = blockedDates.includes(formattedDate);
        const isPast = isBefore(currentDay, today);
        const isSelected = (checkIn && isSameDay(currentDay, checkIn)) || (checkOut && isSameDay(currentDay, checkOut));
        const isInRange = checkIn && checkOut && currentDay > checkIn && currentDay < checkOut;

        days.push(
          <div
            key={currentDay.toString()}
            className={`relative h-10 flex items-center justify-center text-sm cursor-pointer transition-all duration-200
              ${!isSameMonth(currentDay, monthStart) ? 'text-text/10' : 'text-text'}
              ${isBlocked || isPast ? 'cursor-not-allowed opacity-30 line-through' : 'hover:bg-accent/20'}
              ${isSelected ? 'bg-primary text-white font-bold' : ''}
              ${isInRange ? 'bg-accent/10' : ''}
            `}
            onClick={() => !(isBlocked || isPast) && onDateClick(currentDay)}
          >
            <span>{format(currentDay, 'd')}</span>
            {isBlocked && (
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-full h-[1px] bg-primary rotate-45"></div>
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div>{rows}</div>;
  };

  return (
    <div className="p-4 bg-white rounded-sm w-full max-w-[320px]">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="mt-4 flex items-center gap-4 text-[10px] uppercase tracking-widest text-text/60">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-primary"></div> Selected
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 border border-border relative overflow-hidden">
             <div className="w-full h-[1px] bg-primary rotate-45 absolute top-1/2 left-0 -translate-y-1/2 opacity-30"></div>
          </div> Booked
        </div>
      </div>
    </div>
  );
};

export default Calendar;
