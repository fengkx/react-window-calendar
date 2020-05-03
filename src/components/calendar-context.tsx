import * as React from 'react';
import { useState } from 'react';

type setStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
interface ICalendarContext {
  year: number;
  month: number;
  date: number;
  today: Date;
  changing?: string;
  setYear?: setStateAction<number>;
  setMonth?: setStateAction<number>;
  setDate?: setStateAction<number>;
  setChanging?: setStateAction<string>;
}

enum Bits {
  year,
  month,
  date,
  today,
  changing
}

export enum ChangeBits {
  year = 1 << Bits.year,
  month = 1 << Bits.month,
  date = 1 << Bits.date,
  today = 1 << Bits.today,
  changing = 1 << Bits.changing
}
const now = new Date();
export const calendarContext = React.createContext<ICalendarContext>(
  {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    today: now
  },
  (prev, next) => {
    let bits = 0;
    if (prev.year !== next.year) {
      bits |= ChangeBits.year;
    }
    if (prev.month !== next.month) {
      bits |= ChangeBits.month;
    }
    if (prev.date !== next.date) {
      bits |= ChangeBits.date;
    }
    if (prev.year !== next.year) {
      bits |= ChangeBits.year;
    }
    if (prev.changing !== next.changing) {
      bits |= ChangeBits.changing;
    }
    return bits;
  }
);

export const CalendarContextProvider: React.FC = ({ children }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [date, setDate] = useState(today.getDate());
  const [changing, setChanging] = useState('');

  const value = {
    year,
    month,
    date,
    today,
    setYear,
    setMonth,
    setDate,
    changing,
    setChanging
  };

  return (
    <calendarContext.Provider value={value}>
      {children}
    </calendarContext.Provider>
  );
};
