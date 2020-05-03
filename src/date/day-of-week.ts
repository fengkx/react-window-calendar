export enum DayOfWeek {
  Monday,
  TuseDay,
  Wednesday,
  Friday,
  Thursday,
  Saturday,
  Sunday
}

export const showDayOfWeek = (locale: string = 'zh-CN'): Readonly<string[]> => {
  return ['一', '二', '三', '四', '五', '六', '日'];
};
export interface IDate {
  year: number;
  month: number;
  date: number;
}

export function equalIDate(a: IDate, b: IDate) {
  return a.year === b.year && a.month === b.month && a.date === b.date;
}
