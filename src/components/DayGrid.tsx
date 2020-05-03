import React, { useContext, useMemo } from 'react';
import './DayGrid.css';
import { IDate, showDayOfWeek, equalIDate } from '../date/day-of-week';
import { calendarContext } from './calendar-context';

interface IYearMonth {
  year: number;
  month: number;
}
const ymToKey = (ym: IYearMonth): string => ym.year + '-' + ym.month;
interface IProps extends IYearMonth {
  key?: React.Key;
  cls?: string;
  onSelected?: (d: IDate) => void;
  selected: IDate;
}
const InnerDayGrid: React.FC<IProps> = ({
  year,
  month,
  cls,
  onSelected,
  selected
}) => {
  const dayOfMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (new Date(year, month, 1).getDay() || 7) - 1;
  const dayOfPrevMonth = new Date(year, month, 0).getDate();
  const data = Array(42);
  let fillPrev = dayOfPrevMonth;
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    data[i] = { value: fillPrev, active: false };
    fillPrev--;
  }
  let validDayIdx = firstDayOfMonth;
  let validCount = dayOfMonth;
  let validDay = 1;
  while (validCount) {
    data[validDayIdx] = { value: validDay, active: true };
    validCount--;
    validDay++;
    validDayIdx++;
  }
  for (let fillNext = validDayIdx; fillNext < 42; fillNext++) {
    data[fillNext] = { value: fillNext - (validDayIdx - 1), active: false };
  }
  return (
    <React.Fragment>
      <div className={['day-grid', cls].join(' ')}>
        {data.map(day => (
          <React.Fragment key={day.active.toString() + day.value}>
            {day.active && (
              <div
                className={`grid active ${
                  equalIDate(selected, { year, month, date: day.value })
                    ? 'selected'
                    : ''
                }`}
                onClick={() => {
                  onSelected && onSelected({ year, month, date: day.value });
                }}
              >
                {day.value}
              </div>
            )}
            {!day.active && <div className={`grid`}>{day.value}</div>}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};
const DayGrid: React.FC<{ onSelected: (d: IDate) => void }> = props => {
  const day = useContext(calendarContext);

  const monthPrev = useMemo(() => {
    if (day.month === 0) {
      return { year: day.year - 1, month: 11 };
    }
    return {
      year: day.year,
      month: day.month - 1
    };
  }, [day.year, day.month]);

  const monthNext = useMemo(() => {
    if (day.month === 11) {
      return { year: day.year + 1, month: 0 };
    }
    return {
      year: day.year,
      month: day.month + 1
    };
  }, [day.year, day.month]);
  const onAnimationEnd = () => {
    if (day.changing === 'down') {
      if (day.month === 0) {
        day.setYear!(day.year - 1);
        day.setMonth!(11);
      } else {
        day.setMonth!(day.month - 1);
      }
    } else if (day.changing === 'up') {
      if (day.month === 11) {
        day.setYear!(day.year + 1);
        day.setMonth!(0);
      } else {
        day.setMonth!(day.month + 1);
      }
    }
    day!.setChanging!('');
  };

  const onSelected = (d: IDate) => {
    day!.setDate!(d);
    props.onSelected && props.onSelected(d);
  };
  return (
    <div className={'grid-container'}>
      <div className={'day-of-week'}>
        {showDayOfWeek().map(dow => (
          <React.Fragment key={dow}>
            <span>{dow}</span>
          </React.Fragment>
        ))}
      </div>
      <div
        onAnimationEnd={onAnimationEnd}
        className={[
          'day-grid-container',
          'current',
          `${day.changing && 'changing-' + day.changing}`
        ].join(' ')}
      >
        <InnerDayGrid
          key={ymToKey(monthPrev)}
          cls={'month-prev'}
          year={monthPrev.year}
          month={monthPrev.month}
          selected={day.date}
        />
        <InnerDayGrid
          onSelected={onSelected}
          key={ymToKey(day)}
          cls={'month-current'}
          year={day.year}
          month={day.month}
          selected={day.date}
        />
        <InnerDayGrid
          key={ymToKey(monthNext)}
          cls={'month-next'}
          year={monthNext.year}
          month={monthNext.month}
          selected={day.date}
        />
      </div>
    </div>
  );
};

export default DayGrid;
