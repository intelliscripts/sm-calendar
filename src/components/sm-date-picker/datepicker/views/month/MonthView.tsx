import moment, {Moment} from "moment";
import {h} from "@stencil/core";
import {PICKER_VIEWS} from "../../constants";

class MonthView {

  render(component) {
    return this.renderViewContainer(component);
  }

  renderViewContainer(component) {
    return (<div class='month-view-container'>
      {this.renderViewNavigation(component)}
      {this.renderViewContent(component)}
    </div>);
  }

  renderViewNavigation(component) {
    const {navMoment} = component;
    return (
      <div class='view-navigation'>
        <div class='nav-item'>
          <div class="left-triangle" onClick={() => {
            let navYear: number = navMoment.year();
            navYear -= 1;
            component.navMoment = moment().year(navYear).month(0).startOf('month');
          }}>
          </div>
        </div>
        <div class='nav-item label'>
          <span>{navMoment.format('YYYY')}</span>
        </div>
        <div class='nav-item'>
          <div class="right-triangle" onClick={() => {
            let navYear: number = navMoment.year();
            navYear += 1;
            component.navMoment = moment().year(navYear).month(0).startOf('month');
          }}>
          </div>
        </div>
      </div>
    );
  }

  renderViewContent(component) {
    const {navMoment} = component;

    const monthDateMoments: Array<Moment> = [];

    moment.monthsShort().forEach((index) => {
      const monthStart: Moment = moment().year(navMoment.year()).month(index).startOf('month');
      monthDateMoments.push(monthStart);
    });

    const rows = [];
    const rowCount = monthDateMoments.length / 3;
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.getRow(component, monthDateMoments.splice(0, 3)));
    }

    return [...rows, this.renderViewFooter(component)];
  }

  getRow(component, dates: Array<Moment>) {
    const cells = [];


    dates.forEach((date) => {
      const cls: Array<string> = ['month-cell'];

      if (moment().isSame(date, 'month')) {
        cls.push('current-month');
      }

      cells.push(<div class={cls.join(' ')} onClick={() => {
        component.contextMoment = date.clone();
        component.pickerView = PICKER_VIEWS.DAY;
      }}>
        {date.format('MMM')}
      </div>);
    });
    return (<div class="month-row">
      {cells}
    </div>);
  }

  renderViewFooter(component) {
    return (
      <div class='view-footer'>
        <button class='sm-button' onClick={() => {
          component.pickerView = PICKER_VIEWS.DAY;
        }}>Back
        </button>

        <button class='sm-button primary today-button' onClick={() => {
          component.contextMoment = moment().startOf('month');
          component.pickerView = PICKER_VIEWS.DAY;
        }}>Current Month</button>
      </div>
    );
  }

}

export default new MonthView();
