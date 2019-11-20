import moment, {Moment} from "moment-timezone";
import {INTERNAL_FORMAT, PICKER_VIEWS, WEEK_DAYS} from "../../constants";
import {h} from "@stencil/core";
import {calculateDateRange} from './day-view-utils';

class DayView {

  render(component) {
    return this.renderViewContainer(component);
  }

  renderViewContainer(component) {
    const {weekStartDay, contextMoment} = component;

    const dates: Array<Moment> = calculateDateRange(contextMoment, WEEK_DAYS[weekStartDay]);

    return (<div class='day-view-container'>
      {this.renderViewNavigation(component)}
      {this.renderViewContent(component, dates)}
    </div>);
  }

  renderViewFooter(component) {
    return (
      <div>
        <button class='sm-button' onClick={() => {
          component.showPicker = false;
        }}>Close
        </button>

        <button class='sm-button primary today-button' onClick={() => {
          component.date = moment().format(INTERNAL_FORMAT.DATE);
          component.showPicker = false;
        }}>Today</button>
      </div>
    );
  }

  renderViewNavigation(component) {
    const {contextMoment} = component;
    return (
      <div class='view-navigation'>
        <div class='nav-item'>
          <div class="left-triangle" onClick={() => {
            const currentDate = component.contextMoment.clone();
            currentDate.add(-1, 'months').date(1);
            component.contextMoment = currentDate;
          }}>
          </div>
        </div>
        <div class='nav-item label'>
          <span onClick={() => {
            component.pickerView = PICKER_VIEWS.MONTH;
          }}>{contextMoment.format('MMMM YYYY')}</span>
        </div>
        <div class='nav-item'>
          <div class="right-triangle" onClick={() => {
            const currentDate = component.contextMoment.clone();
            currentDate.add(1, 'months').date(1);
            component.contextMoment = currentDate;
          }}>
          </div>
        </div>
      </div>
    );
  }

  renderViewContent(component, dates: Array<Moment>) {
    const headerDates: Array<Moment> = dates.slice(0, 7);
    const headerDateCells = [];
    headerDates.forEach((date) => {
      headerDateCells.push(<div class='day-name'>{date.format('ddd')}</div>);
    });

    const rows = [];
    const rowCount = dates.length / 7;
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.getRow(component, dates.splice(0, 7)));
    }

    return ([
      <div class='view-header'>
        {headerDateCells}
      </div>,
      <div class='view-content'>
        {rows}
      </div>,
      <div class='view-footer'>
        {this.renderViewFooter(component)}
      </div>
    ]);
  }

  getRow(component, dates: Array<Moment>) {
    const cells = [];
    const selectedDate = moment(component.date);
    dates.forEach((date) => {
      const cls: Array<string> = ['date-cell'];

      if (moment().isSame(date, 'day')) {
        cls.push('today');
      }

      if (selectedDate.isSame(date, 'day')) {
        cls.push('selected');
      }

      if (!component.contextMoment.isSame(date, 'month')) {
        cls.push('grey-out');
      }

      cells.push(<div class={cls.join(' ')} onClick={() => {
        if (component.contextMoment.isSame(date, 'month')) {
          component.date = date.format(INTERNAL_FORMAT.DATE);
          component.showPicker = false;
        }
      }}>
        {date.format('DD')}
      </div>);
    });
    return (<div class="date-row">
      {cells}
    </div>);
  }

}

export default new DayView();
