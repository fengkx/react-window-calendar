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
