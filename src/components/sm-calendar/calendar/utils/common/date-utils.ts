import moment,{Moment} from 'moment-timezone';

export function getMomentsInBetween(startDateMoment: Moment, endDateMoment: Moment): Array<Moment> {
  const dates: Array<Moment> = [];
  const startDateMomentClone: Moment = startDateMoment.clone();
  while(startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
    dates.push(startDateMomentClone.clone());
    startDateMomentClone.add(1, 'days');
  }
  return dates;
}

export function getTimeFromStartOfDay(dateTime: Moment, units: string = 'seconds'): number {
  return dateTime.diff(moment(dateTime).startOf('day'), units);
}

export function getTimeDiff(date1: Moment, date2: Moment, units: string = 'seconds'): number {
  return Math.abs(date1.diff(date2, units));
}
