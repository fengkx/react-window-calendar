import React, { useCallback, useContext } from 'react';
import './Header.css';
import { calendarContext } from './calendar-context';
const Header: React.FC = () => {
  const { month, year, setChanging } = useContext(calendarContext);
  const clickPrev = () => {
    setChanging!('down');
  };

  const clickNext = () => {
    setChanging!('up');
  };
  return (
    <div className={'calendar-header'}>
      <div aria-label={'button'} className={'month'}>
        {year}年{month + 1}月
      </div>
      <span className={'arrows'}>
        <i
          aria-label={'button'}
          onClick={() => clickPrev()}
          className="arrow up"
        />
        <i
          aria-label={'button'}
          onClick={() => clickNext()}
          className="arrow down"
        />
      </span>
    </div>
  );
};

export default Header;
