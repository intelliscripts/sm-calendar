import {Moment} from 'moment';

export function getBetweenDates(startDateMoment: Moment, endDateMoment: Moment): Array<Moment> {
  const dates: Array<Moment> = [];
  const startDateMomentClone: Moment = startDateMoment.clone();
  while(startDateMomentClone.valueOf() < endDateMoment.valueOf()) {
    dates.push(startDateMomentClone.clone());
    startDateMomentClone.add(1, 'days');
  }
  return dates;
}
