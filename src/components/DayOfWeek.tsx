import { showDayOfWeek } from '../date/day-of-week';
import React from 'react';
import './DayOfWeek.css';
const DayOfWeek: React.FC = () => (
  <div className={'day-of-week'}>
    {showDayOfWeek().map(dow => (
      <React.Fragment key={dow}>
        <span>{dow}</span>
      </React.Fragment>
    ))}
  </div>
);

export default DayOfWeek;
