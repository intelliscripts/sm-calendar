import {Column} from "../column/Column";
import {Moment} from "moment";
import templateRenderer, {DayTemplateRenderer} from "./DayTemplateRenderer";

class Day extends Column {
  constructor() {
    super();
  }

  public numberOfCols: number = 1;
  public templateRenderer: DayTemplateRenderer = templateRenderer;

  public calculateViewRange(contextMoment: Moment, _weekStartDay: number) {
    const startMoment: Moment = contextMoment.clone().startOf('day');
    const endMoment: Moment = contextMoment.clone().endOf('day');
    return {startMoment, endMoment};
  }

}

export default new Day();
