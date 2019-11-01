import {h} from "@stencil/core";
import {calculateDateRange, getBetweenDates} from "./column-utils";
import {WEEK_DAYS} from "../../constants";
import moment, {Moment} from "moment";

export class Column {
  public numberOfCols: number;
  public leftScaleWidth: number = 100;
  public timeStepDuration: number = 60;//minutes
  public timeStepHeight: number = 40;
  public timeStepFormat: string = 'HH:mm';


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
    const range = calculateDateRange(component.contextDate, this.numberOfCols, WEEK_DAYS[component.weekStartDay]);
    const viewDates: Array<Moment> = getBetweenDates(range.startMoment, range.endMoment);

    const cls: Array<string> = ['view-wrapper'];
    return (
      <div class={cls.join(' ')}>
        {this.renderViewHeader(component, viewDates)}
        {this.renderViewBody(component, viewDates)}
      </div>
    );
  }

  renderViewBody(component, viewDates: Array<Moment>) {
    const cls: Array<string> = ['view-body'];

    return (
      <div class={cls.join(' ')} style={{'--left-scale-width': this.leftScaleWidth + 'px', '--time-step-height': this.timeStepHeight + 'px'}}>
        {this.renderLeftScale(component)}
        {this.renderGrid(component)}
      </div>
    );
  }

  renderGrid(component) {
    const totalSteps: number = (24 * 60) / this.timeStepDuration;
    const totalHeight: number = totalSteps * this.timeStepHeight;

    return (
      <div class='grid-container'>
        <div class='grid-wrapper' style={{height: totalHeight + 'px'}}>
        </div>
      </div>
    );
  }

  renderLeftScale(component) {
    const totalSteps: number = (24 * 60) / this.timeStepDuration;
    const steps = [];

    const test = moment().startOf('day');
    const stepMoments: Array<Moment> = [];

    for (let i = 0; i < totalSteps; i++) {
      stepMoments.push(test.clone());
      test.add(this.timeStepDuration, 'minutes')
    }

    stepMoments.forEach((stepMoment, index) => {
      steps.push(<div class='step' style={{height: this.timeStepHeight + 'px'}}>
        {index === 0 ? '' : stepMoment.format(this.timeStepFormat)}
      </div>);
    });

    return (
      <div class='left-scale' style={{width: this.leftScaleWidth + 'px'}}>
        <div class='step-container'>
          {steps}
        </div>
      </div>
    );
  }

  renderViewHeader(component, viewDates: Array<Moment>) {
    const cls: Array<string> = ['view-header'];
    const contextMoment = moment(component.contextDate);

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
          component.contextDate = date.toISOString();
        }}>
          {date.format('DD')}
        </div>
      </div>);
    });

    return (
      <div class={cls.join(' ')}>
        <div class='row'>
          <div class='empty-left-scale' style={{width: this.leftScaleWidth + 'px'}}></div>
          {dayNames}
        </div>
      </div>
    );
  }
}

export default new Column();
