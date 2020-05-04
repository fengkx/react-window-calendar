import React, { useCallback, useContext } from 'react';
import { calendarContext } from './calendar-context';
import './YearGrid.css';
interface IYearMonth {
  year: number;
  month: number;
}
interface IYear {
  active: boolean;
  value: number;
}
interface IProps extends IYearMonth {
  years: number[];
  cls?: string;
  key?: React.Key;
  onChangeDecade: (year: number) => void;
}

const InnerGrid: React.FC<IProps> = ({ years, cls, year, onChangeDecade }) => {
  const ctx = useContext(calendarContext);
  const yearOjbs: IYear[] = years.map(y => ({
    active: y >= year - 10 && y <= year + 10,
    value: y
  }));
  return (
    <div className={`year-grid ${cls || ''}`}>
      {yearOjbs.map(year => (
        <div
          onClick={() => onChangeDecade(year.value)}
          key={year.active.toString() + year.value}
          className={[
            'grid',
            `${year.active ? 'active' : ''}`,
            `${year.value === ctx.today.getFullYear() ? 'selected' : ''}`
          ].join(' ')}
        >
          <span className="text">{year.value}</span>
        </div>
      ))}
    </div>
  );
};

const YearGrid: React.FC = () => {
  const ctx = useContext(calendarContext);
  const yearsPrev = useCallback((): number[] => {
    const ret = [];
    for (let i = 0; i < 16; i++) {
      ret.push(ctx.year + i - 8);
    }
    return ret;
  }, [ctx.year]);
  const yearsCurrent = useCallback((): number[] => {
    const ret = [];
    for (let i = 0; i < 16; i++) {
      ret.push(ctx.year + i);
    }
    return ret;
  }, [ctx.year]);
  const yearsNext = useCallback((): number[] => {
    const ret = [];
    for (let i = 0; i < 16; i++) {
      ret.push(ctx.year + i + 8);
    }
    return ret;
  }, [ctx.year]);
  const onAnimationEnd = () => {
    if (ctx.changing === 'up') {
      ctx.setYear!(ctx.year + 10);
    } else if (ctx.changing === 'down') {
      ctx.setYear!(ctx.year - 10);
    }
    ctx.setChanging!('');
  };
  const changeDecade = (year: number) => {
    ctx.setChanging!('month');
    ctx.setYear!(year);
  };
  return (
    <>
      <div
        onAnimationEnd={onAnimationEnd}
        className={[
          'year-grid-container',
          `${ctx.changing && 'changing-' + ctx.changing}`
        ].join(' ')}
      >
        <InnerGrid
          onChangeDecade={changeDecade}
          cls={'decade-prev'}
          years={yearsPrev()}
          year={ctx.year}
          month={ctx.month}
        />
        <InnerGrid
          onChangeDecade={changeDecade}
          cls={'decade-current'}
          years={yearsCurrent()}
          year={ctx.year}
          month={ctx.month}
        />
        <InnerGrid
          onChangeDecade={changeDecade}
          cls={'decade-next'}
          years={yearsNext()}
          year={ctx.year}
          month={ctx.month}
        />
      </div>
    </>
  );
};

export default YearGrid;
