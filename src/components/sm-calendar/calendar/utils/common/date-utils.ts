import moment,{Moment} from 'moment-timezone';

export function getTimeFromStartOfDay(dateTime: Moment, units: string = 'seconds'): number {
  return dateTime.diff(moment(dateTime).startOf('day'), units);
}

export function getTimeDiff(date1: Moment, date2: Moment, units: string = 'seconds'): number {
  return Math.abs(date1.diff(date2, units));
}
