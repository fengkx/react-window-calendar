import React, { useCallback, useContext } from 'react';
import './Header.css';
import { calendarContext } from './calendar-context';
const Header: React.FC = () => {
  const { setMonth, setYear, month, year } = useContext(calendarContext);
  const clickPrev = useCallback(() => {
    if (month === 0) {
      setYear!(year - 1);
      setMonth!(11);
    } else {
      setMonth!(month - 1);
    }
  }, [year, month, setMonth, setYear]);

  const clickNext = useCallback(() => {
    if (month === 11) {
      setYear!(year + 1);
      setMonth!(0);
    } else {
      setMonth!(month + 1);
    }
  }, [year, month, setMonth, setYear]);
  return (
    <div className={'calendar-header'}>
      <div aria-label={'button'} className={'month'}>
        {year}年{month + 1}月
      </div>
      <span className={'arrows'}>
        <i aria-label={'button'} onClick={clickPrev} className="arrow up" />
        <i aria-label={'button'} onClick={clickNext} className="arrow down" />
      </span>
    </div>
  );
};

export default Header;
