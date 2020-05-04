import React from 'react';
import { CalendarContextProvider } from './calendar-context';
import Header from './Header';
import { IDate } from '../date/day-of-week';
import './Calendar.css';
import ContextRouter from './ContextRouter';

interface ICalendarProps {
  onSelected?: (d: IDate) => void;
}

const Calendar: React.FC<ICalendarProps> = ({ onSelected }) => {
  return (
    <CalendarContextProvider>
      <div className={'win-calendar'}>
        <Header />
        <ContextRouter onSelected={onSelected!} />
      </div>
    </CalendarContextProvider>
  );
};

export default Calendar;
