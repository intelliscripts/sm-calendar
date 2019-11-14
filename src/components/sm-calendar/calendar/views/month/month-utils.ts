import moment, {Moment} from "moment-timezone";

export function getWeekEndDayNumber(startDayNumber: number): number {
  if (startDayNumber == 0)
    return 6;
  return startDayNumber - 1;
}

export function getNextDate(date: moment.Moment, weekEndDayNumber: number): Moment {
  const dayNumber: number = date.day();

  if (weekEndDayNumber >= dayNumber)
    date.day(weekEndDayNumber);
  else
    date.day(weekEndDayNumber + 7);

  date.endOf('day');
  return date;
}

export function getPreviousDate(date: Moment, weekStartDayNumber: number): Moment {
  const dayNumber: number = date.day();

  if (weekStartDayNumber <= dayNumber)
    date.day(weekStartDayNumber);
  else
    date.day(weekStartDayNumber - 7);

  date.startOf('day');
  return date;
}

export function getFirstDayOfaMonthView(date: Moment, weekStartDay: number): Moment {
  const firstDateOfMonth: Moment = date.clone().startOf('month');
  const firstDateOfMonthView: Moment = getPreviousDate(firstDateOfMonth, weekStartDay);
  return firstDateOfMonthView;
}
export function getLastDayOfaMonthView(date: Moment, weekLastDay: number) {
  const lastDateOfMonth: Moment = date.clone().endOf('month');
  const lastDateOfMonthView: Moment = getNextDate(lastDateOfMonth, weekLastDay);
  return lastDateOfMonthView;
}

export function getBetweenDates(startDateMoment: Moment, endDateMoment: Moment): Array<Moment> {
  const dates: Array<Moment> = [];
  const startDateMomentClone: Moment = startDateMoment.clone();
  while(startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
    dates.push(startDateMomentClone.clone());
    startDateMomentClone.add(1, 'days');
  }
  return dates;
}

export function calculateDateRange(date: Moment, weekStartDayNumber: number) {
  const weekEndDayNumber: number = getWeekEndDayNumber(weekStartDayNumber);
  const startMoment: Moment = getFirstDayOfaMonthView(date, weekStartDayNumber);
  const endMoment: Moment = getLastDayOfaMonthView(date, weekEndDayNumber);
  return {
    startMoment,
    endMoment
  };
}
