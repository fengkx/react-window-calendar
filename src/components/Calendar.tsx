import React from 'react';
import { CalendarContextProvider } from './calendar-context';
import Header from './Header';
import DayGrid from './DayGrid';
import { IDate } from '../date/day-of-week';
import './Calendar.css';

interface ICalendarProps {
  onSelected?: (d: IDate) => void;
}

const Calendar: React.FC<ICalendarProps> = ({ onSelected }) => {
  return (
    <CalendarContextProvider>
      <div className={'win-calendar'}>
        <Header />
        <DayGrid onSelected={onSelected!} />
      </div>
    </CalendarContextProvider>
  );
};
export default Calendar;
