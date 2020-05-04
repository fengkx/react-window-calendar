import React, { useContext } from 'react';
import { calendarContext } from './calendar-context';
import './MonthGrid.css';

interface IYearMonth {
  year: number;
  month: number;
}
interface IMonth {
  active: boolean;
  value: number;
}
interface IProps extends IYearMonth {
  months: IMonth[];
  onChangeMonth: (active: boolean, month: number) => void;
  cls?: string;
  key?: React.Key;
}

const InnerGrid: React.FC<IProps> = ({ months, onChangeMonth, cls, year }) => {
  const ctx = useContext(calendarContext);
  return (
    <div className={`month-grid ${cls || ''}`}>
      {months.map(month => (
        <div
          key={month.active.toString() + month.value}
          className={[
            'grid',
            `${month.active ? 'active' : ''}`,
            `${
              month.value === ctx.today.getMonth() + 1 &&
              year === ctx.today.getFullYear()
                ? 'selected'
                : ''
            }`
          ].join(' ')}
          onClick={() => onChangeMonth(month.active, month.value)}
        >
          <span className="text">{month.value}月</span>
        </div>
      ))}
    </div>
  );
};

const MonthGrid: React.FC = () => {
  const ctx = useContext(calendarContext);
  const months = [];
  for (let i = 0; i < 16; i++) {
    months.push({ value: (i % 12) + 1, active: i < 12 });
  }

  const changeMonth = (active: boolean, hMonth: number): void => {
    ctx.setChanging!('day');
    if (!active) {
      ctx.setYear!(ctx.year + 1);
      ctx.setMonth!(hMonth - 1);
    } else {
      ctx.setMonth!(hMonth - 1);
    }
  };
  const onAnimationEnd = () => {
    if (ctx.changing === 'down') {
      ctx.setYear!(ctx.year - 1);
    } else if (ctx.changing === 'up') {
      ctx.setYear!(ctx.year + 1);
    }
    ctx!.setChanging!('');
  };
  return (
    <>
      <div
        onAnimationEnd={onAnimationEnd}
        className={[
          'month-grid-container',
          `${ctx.changing && 'changing-' + ctx.changing}`
        ].join(' ')}
      >
        <InnerGrid
          cls={'year-prev'}
          months={months}
          onChangeMonth={changeMonth}
          year={ctx.year - 1}
          month={ctx.month}
        />
        <InnerGrid
          cls={'year-current'}
          months={months}
          onChangeMonth={changeMonth}
          year={ctx.year}
          month={ctx.month}
        />
        <InnerGrid
          cls={'year-next'}
          months={months}
          onChangeMonth={changeMonth}
          year={ctx.year + 1}
          month={ctx.month}
        />
      </div>
    </>
  );
};

export default MonthGrid;
