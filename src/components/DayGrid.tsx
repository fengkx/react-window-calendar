import React, { useContext, useMemo } from 'react';
import './DayGrid.css';
import { IDate, equalIDate } from '../date/day-of-week';
import { calendarContext } from './calendar-context';
import DayOfWeek from './DayOfWeek';

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
                <span className="text">{day.value}</span>
              </div>
            )}
            {!day.active && (
              <div className={`grid`}>
                <span className="text">{day.value}</span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};
const DayGrid: React.FC<{ onSelected: (d: IDate) => void }> = props => {
  const ctx = useContext(calendarContext);

  const monthPrev = useMemo(() => {
    if (ctx.month === 0) {
      return { year: ctx.year - 1, month: 11 };
    }
    return {
      year: ctx.year,
      month: ctx.month - 1
    };
  }, [ctx.year, ctx.month]);

  const monthNext = useMemo(() => {
    if (ctx.month === 11) {
      return { year: ctx.year + 1, month: 0 };
    }
    return {
      year: ctx.year,
      month: ctx.month + 1
    };
  }, [ctx.year, ctx.month]);
  const onAnimationEnd = () => {
    if (ctx.changing === 'down') {
      if (ctx.month === 0) {
        ctx.setYear!(ctx.year - 1);
        ctx.setMonth!(11);
      } else {
        ctx.setMonth!(ctx.month - 1);
      }
    } else if (ctx.changing === 'up') {
      if (ctx.month === 11) {
        ctx.setYear!(ctx.year + 1);
        ctx.setMonth!(0);
      } else {
        ctx.setMonth!(ctx.month + 1);
      }
    }
    ctx!.setChanging!('');
  };

  const onSelected = (d: IDate) => {
    ctx!.setDate!(d);
    props.onSelected && props.onSelected(d);
  };
  return (
    <>
      <DayOfWeek />
      <div
        onAnimationEnd={onAnimationEnd}
        className={[
          'day-grid-container',
          `${ctx.changing && 'changing-' + ctx.changing}`
        ].join(' ')}
      >
        <InnerDayGrid
          key={ymToKey(monthPrev)}
          cls={'month-prev'}
          year={monthPrev.year}
          month={monthPrev.month}
          selected={ctx.date}
        />
        <InnerDayGrid
          onSelected={onSelected}
          key={ymToKey(ctx)}
          cls={'month-current'}
          year={ctx.year}
          month={ctx.month}
          selected={ctx.date}
        />
        <InnerDayGrid
          key={ymToKey(monthNext)}
          cls={'month-next'}
          year={monthNext.year}
          month={monthNext.month}
          selected={ctx.date}
        />
      </div>
    </>
  );
};

export default DayGrid;
