import {h} from "@stencil/core";
import {calculateDateRange, getBetweenDates} from "./column-utils";
import {INTERNAL_DATE, WEEK_DAYS} from "../../constants";
import moment, {Moment} from "moment";

export class Column {
  public numberOfCols: number;
  public leftScaleWidth: number = 100;
  public timeStepDuration: number = 60;//minutes
  public timeStepHeight: number = 40;
  public timeStepFormat: string = 'HH:mm';
  public viewHeaderHeight: number = 70;


  next(component) {
    component.contextDate = component.contextMoment.clone().add(this.numberOfCols, 'day').format(INTERNAL_DATE);
  }

  prev(component) {
    component.contextDate = component.contextMoment.clone().add(0 - this.numberOfCols, 'day').format(INTERNAL_DATE);
  }

  constructor() {
  }

  render(component) {
    const cls: Array<string> = ['view-container', component.view];
    return (
      <div class={cls.join(' ')}>
        {this.renderView(component)}
      </div>
    );
  }

  renderView(component) {
    const range = calculateDateRange(component.contextMoment, this.numberOfCols, WEEK_DAYS[component.weekStartDay]);
    const viewDates: Array<Moment> = getBetweenDates(range.startMoment, range.endMoment);
    const stepMoments = this.getSteps();

    const cls: Array<string> = ['view-wrapper'];
    return (
      <div class={cls.join(' ')} style={{'--left-scale-width': this.leftScaleWidth + 'px', '--time-step-height': this.timeStepHeight + 'px', '--view-header-height': this.viewHeaderHeight + 'px'}}>
        {this.renderViewHeader(component, viewDates)}
        {this.renderViewBody(component, viewDates, stepMoments)}
      </div>
    );
  }

  renderViewBody(component, viewDates: Array<Moment>, stepMoments: Array<Moment>) {
    const cls: Array<string> = ['view-body'];

    return (
      <div class={cls.join(' ')}>
        <div class='view-body-relative'>
          {this.renderLeftScale(component, stepMoments)}
          {this.renderGrid(component, viewDates, stepMoments)}
        </div>
      </div>
    );
  }

  renderGrid(component, viewDates: Array<Moment>, stepMoments: Array<Moment>) {

    const rows = [];

    stepMoments.forEach((stepMoment, index) => {
      const cols = [];

      viewDates.forEach((viewDate) => {
        const timeMoment = viewDate.clone().add(this.timeStepDuration * index, 'minutes');
        cols.push(<div class='item' style={{height: this.timeStepHeight + 'px'}} data-time={timeMoment.format('HH:ss')}>

        </div>);

      });

      rows.push(<div class='row'>
        {cols}
      </div>);
    });

    return (
      <div class='grid-container'>
        <div class='grid-container-relative'>
          <div class='grid-wrapper'>
            {rows}
          </div>
        </div>
      </div>
    );
  }

  getSteps(): Array<Moment> {
    const totalSteps: number = (24 * 60) / this.timeStepDuration;

    const today = moment().startOf('day');
    const stepMoments: Array<Moment> = [];

    for (let i = 0; i < totalSteps; i++) {
      stepMoments.push(today.clone());
      today.add(this.timeStepDuration, 'minutes')
    }

    return stepMoments;
  }

  renderLeftScale(component, stepMoments: Array<Moment>) {
    const steps = [];

    stepMoments.forEach((stepMoment, index) => {
      steps.push(<div class='step' style={{height: this.timeStepHeight + 1 + 'px'}}>
        <div class='step-time'>{index === 0 ? '' : stepMoment.format(this.timeStepFormat)}</div>
      </div>);
    });

    return (
      <div class='left-scale'>
        <div class='step-container'>
          {steps}
        </div>
      </div>
    );
  }

  renderViewHeader(component, viewDates: Array<Moment>) {
    const cls: Array<string> = ['view-header'];
    const {contextMoment} =component;

    const dayNames = [];

    viewDates.forEach((date) => {
      const dateCls: Array<string> = ['item'];

      if (date.isSame(moment(), 'day')) {
        dateCls.push('today');
      }

      if (date.isSame(contextMoment, 'day')) {
        dateCls.push('selected');
      }

      dayNames.push(<div class={dateCls.join(' ')}>
        <div class='day-name'>{date.format('dddd')}</div>
        <div class='day-date' onClick={() => {
          component.contextDate = date.format(INTERNAL_DATE);
        }}>
          {date.format('DD')}
        </div>
      </div>);
    });

    return (
      <div class={cls.join(' ')}>
        <div class='row'>
          <div class='empty-left-scale'></div>
          {dayNames}
        </div>
      </div>
    );
  }
}

export default new Column();
