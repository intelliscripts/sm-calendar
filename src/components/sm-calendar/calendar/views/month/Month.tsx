import {h} from "@stencil/core";
import {View} from "../view/View";
import {calculateDateRange} from './month-utils';
import moment, {Moment} from "moment-timezone";
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
        {this.renderViewBody(component)}
      </div>
    );
  }

  renderViewBody(component) {
    const cls: Array<string> = ['view-body'];

    return (
      <div class={cls.join(' ')}>
        <div class='view-body-relative'>
          {this.renderDrawingArea(component)}
        </div>
      </div>
    );
  }

  renderDrawingArea(component) {
    return (
      <div class='drawing-area-container'>
        <div class='drawing-area-container-relative'>
          {this.renderGrid(component)}
        </div>
      </div>
    );
  }

  renderGrid(component) {
    return (
      <div class='grid-wrapper'>
        {this.renderGridRows(component)}
      </div>
    );
  }

  renderGridRows(component) {
    const gridDates: Array<Moment> = component.viewRange.dates;

    const rows = [];
    const rowCount = gridDates.length / 7;
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.getRow(component, gridDates.splice(0, 7), rowCount));
    }
    return rows;
  }

  getRow(component, rowDates: Array<Moment>, rowcount: number) {
    const cols = [];

    const rowHeight = 'calc((var(--component-height) - var(--header-height) - var(--view-header-height) - 10px) / ' + rowcount + ')';

    rowDates.forEach((rowDate) => {
      cols.push(this.getCellWrapper(component, rowDate, rowHeight));
    });
    return (<div class='row' style={{height: rowHeight}}>
      {cols}
    </div>);
  }

  getCellWrapper(component, date: Moment, rowHeight: string) {
    const cls: Array<string> = ['item'];
    const {contextMoment} =component;

    if (date.isSame(moment(), 'day')) {
      cls.push('today');
    }

    if (date.isSame(contextMoment, 'day')) {
      cls.push('context-date');
    }

    if (!date.isSame(contextMoment, 'month')) {
      cls.push('grey-out');
    }

    return (
      <div class={cls.join(' ')}>
        <div class='cell-wrapper' style={{height: rowHeight}}>
          <div class='cell-header'>
            <div class='cell-date' onClick={() => {
              if (date.isSame(contextMoment, 'month')) {
                component.contextDate = date.format(INTERNAL_FORMAT.DATE);
              }
            }}>
              {date.format('DD')}
            </div>
          </div>
        </div>
      </div>
      );
  }

  renderViewHeader(component) {
    const gridHeaderDates: Array<Moment> = component.viewRange.dates.slice(0, 7);

    const cls: Array<string> = ['view-header'];

    const dayNames = [];

    gridHeaderDates.forEach((date) => {
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

  public getHeaderText(component) {
    return(<div>
      {component.contextMoment.format('MMM YYYY')}
    </div>);
  }
}

export default new Month();
