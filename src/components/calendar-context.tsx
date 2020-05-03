import * as React from 'react';
import { useState } from 'react';

type setStateAction<T> = React.Dispatch<React.SetStateAction<T>>;
interface ICalendarContext {
  year: number;
  month: number;
  date: number;
  today: Date;
  setYear?: setStateAction<number>;
  setMonth?: setStateAction<number>;
  setDate?: setStateAction<number>;
}

enum Bits {
  year,
  month,
  date,
  today
}

export enum ChangeBits {
  year = 1 << Bits.year,
  month = 1 << Bits.month,
  date = 1 << Bits.date,
  today = 1 << Bits.today
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
    return bits;
  }
);

export const CalendarContextProvider: React.FC = ({ children }) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [date, setDate] = useState(today.getDate());

  const value = { year, month, date, today, setYear, setMonth, setDate };

  return (
    <calendarContext.Provider value={value}>
      {children}
    </calendarContext.Provider>
  );
};
