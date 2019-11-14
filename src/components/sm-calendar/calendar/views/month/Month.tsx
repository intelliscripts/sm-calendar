import {h} from "@stencil/core";
import {View} from "../view/View";
import {calculateDateRange} from './month-utils';
import {Moment} from "moment-timezone";
import {INTERNAL_FORMAT} from "../../constants";

export class Month extends View{
  public viewHeaderHeight: number = 50;

  constructor() {
    super();
  }

  next(component) {
    component.contextDate = component.contextMoment.clone().add(1, 'month').format(INTERNAL_FORMAT.DATE);
  }

  prev(component) {
    component.contextDate = component.contextMoment.clone().add(-1, 'month').format(INTERNAL_FORMAT.DATE);
  }

  renderView(component) {
    const cls: Array<string> = ['view-wrapper'];

    return (
      <div class={cls.join(' ')} style={{'--view-header-height': this.viewHeaderHeight + 'px'}}>
        {this.renderViewHeader(component)}
      </div>
    );
  }

  renderViewHeader(component) {
    const viewDates: Array<Moment> = component.viewRange.dates.slice(0, 7);

    const cls: Array<string> = ['view-header'];

    const dayNames = [];

    viewDates.forEach((date) => {
      const headerColumnCls: Array<string> = ['view-header-column'];

      dayNames.push(<div class='item'>
        <div class={headerColumnCls.join(' ')}>
          <div class='day-name'>{date.format('dddd')}</div>
        </div>
      </div>);
    });

    return (
      <div class={cls.join(' ')}>
        <div class='row'>
          {dayNames}
        </div>
      </div>
    );
  }

  calculateViewRange(contextMoment: Moment, weekStartDay: number) {
    return calculateDateRange(contextMoment, weekStartDay);
  }
}

export default new Month();
