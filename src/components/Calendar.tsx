import React from 'react';
import { CalendarContextProvider } from './calendar-context';
import Header from './Header';
import DayGrid from './DayGrid';
import './Calendar.css';

interface ICalendarProps {}

const Calendar: React.FC<ICalendarProps> = () => {
  return (
    <CalendarContextProvider>
      <div className={'win-calendar'}>
        <Header />
        <DayGrid />
      </div>
    </CalendarContextProvider>
  );
};
export default Calendar;
