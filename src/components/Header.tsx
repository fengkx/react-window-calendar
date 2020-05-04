import React, { useContext } from 'react';
import './Header.css';
import { calendarContext } from './calendar-context';
const Header: React.FC = () => {
  const { month, year, setChanging, route } = useContext(calendarContext);
  const clickPrev = () => {
    setChanging!('down');
  };

  const clickNext = () => {
    setChanging!('up');
  };
  const changeRoute = () => {
    if (route === 'day') {
      setChanging!('month');
    }
    if (route === 'month') {
      setChanging!('year');
    }
    return;
  };
  return (
    <div className={'calendar-header'}>
      <div aria-label={'button'} className={'month'} onClick={changeRoute}>
        {route === 'day' && (
          <span>
            {year}年{month + 1}月
          </span>
        )}
        {route === 'month' && <span>{year}年</span>}
        {route === 'year' && (
          <span>
            {year} - {year + 10}
          </span>
        )}
      </div>
      <span className={'arrows'}>
        <i aria-label={'button'} onClick={clickPrev} className="arrow up" />
        <i aria-label={'button'} onClick={clickNext} className="arrow down" />
      </span>
    </div>
  );
};
export default Header;
