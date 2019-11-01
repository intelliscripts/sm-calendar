import moment, {Moment} from 'moment';

export function calculateDateRange(contextDate: string, numberOfCols: number, weekStartDay: number) {
  const contextMoment: Moment = moment(contextDate);

  if (numberOfCols === 1) {
    const startMoment: Moment = moment(contextMoment).startOf('day');
    const endMoment: Moment = moment(contextMoment).endOf('day');
    return {startMoment, endMoment};
  } else {
    let startMoment: Moment = moment(contextMoment).startOf('day');
    if (weekStartDay <= contextMoment.day())
      startMoment.day(weekStartDay);
    else
      startMoment.day(weekStartDay - 7);
    const endMoment: Moment = moment(startMoment).add(numberOfCols - 1, 'days').endOf('day');
    return {startMoment, endMoment};
  }
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
