import React, { useContext } from 'react';
import { IDate } from '../date/day-of-week';
import { calendarContext } from './calendar-context';
import DayGrid from './DayGrid';
import MonthGrid from './MonthGrid';
import './ContextRouter.css';
import YearGrid from './YearGrid';
const ContextRouter: React.FC<{ onSelected: (d: IDate) => void }> = ({
  onSelected
}) => {
  const { route, changing, setRoute, setChanging } = useContext(
    calendarContext
  );
  const onAnimationEnd = () => {
    if (changing === 'month' || changing === 'year' || changing === 'day') {
      setRoute!(changing);
    }
    setChanging!('');
  };
  return (
    <div
      className={`grid-container ${changing ? 'changing-' + changing : ''}`}
      onAnimationEnd={onAnimationEnd}
    >
      {route === 'day' && <DayGrid key={'day-grid'} onSelected={onSelected!} />}
      {route === 'month' && <MonthGrid key={'month-grid'} />}
      {route === 'year' && <YearGrid key={'year-grid'} />}
    </div>
  );
};
export default ContextRouter;
