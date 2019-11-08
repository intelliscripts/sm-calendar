import {Column} from "../column/Column";
import {Moment} from "moment";
import moment from 'moment-timezone'

class Week extends Column {
  constructor() {
    super();
  }

  public numberOfCols: number = 7;

  public calculateViewRange(contextMoment: Moment, weekStartDay: number) {
    let startMoment: Moment = contextMoment.clone().startOf('day');
    if (weekStartDay <= contextMoment.day())
      startMoment.day(weekStartDay);
    else
      startMoment.day(weekStartDay - 7);

    const endMoment: Moment = moment(startMoment).add(this.numberOfCols - 1, 'days').endOf('day');
    return {startMoment, endMoment};
  }
}

export default new Week();
