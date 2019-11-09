import {h} from "@stencil/core";
import {INTERNAL_FORMAT} from "../../constants";
import moment, {Moment} from 'moment-timezone';
import {View} from "../view/View";
import CalendarEvent from "../../utils/events/CalendarEvent";

export class Column extends View{
  public numberOfCols: number;
  public leftScaleWidth: number = 100;
  public timeStepDuration: number = 60;//minutes
  public timeStepHeight: number = 40;
  public timeStepFormat: string = 'HH:mm';
  public viewHeaderHeight: number = 70;

  constructor() {
    super();
  }

  next(component) {
    component.contextDate = component.contextMoment.clone().add(this.numberOfCols, 'day').format(INTERNAL_FORMAT.DATE);
  }

  prev(component) {
    component.contextDate = component.contextMoment.clone().add(0 - this.numberOfCols, 'day').format(INTERNAL_FORMAT.DATE);
  }

  public calculateViewRange(contextMoment: Moment, _weekStartDay: number) {
    return {
      startMoment: contextMoment.clone().startOf('day'),
      endMoment: contextMoment.clone().endOf('day')
    };
  }

  render(component) {
    component.stepMoments = this.getSteps();

    const cls: Array<string> = ['view-container', component.view];
    return (
      <div class={cls.join(' ')}>
        {this.renderView(component)}
      </div>
    );
  }

  renderView(component) {
    const cls: Array<string> = ['view-wrapper'];

    return (
      <div class={cls.join(' ')} style={{'--left-scale-width': this.leftScaleWidth + 'px', '--time-step-height': this.timeStepHeight + 'px', '--view-header-height': this.viewHeaderHeight + 'px'}}>
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
          {this.renderLeftScale(component)}
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
          {this.renderEvents(component)}
        </div>
      </div>
    );
  }

  renderEvents(component) {
   // console.log(component.viewRange.events);
    component.viewRange.events.forEach((test) => console.log(test.startMoment.format('YYYY-MM-DD HH:mm:ss')));
    component.viewRange.events.forEach((test) => console.log(test.endMoment.format('YYYY-MM-DD HH:mm:ss')));
    return (
      <div class='events-wrapper'>
      </div>
    );
  }

  public processEventsInViewRange(component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    this.chopEvents(component, events);
    this.chunkEvents(component, events);
    return events;
  }

  chunkEvents(_component, _events: Array<CalendarEvent>) {

  }

  chopEvents(component, events: Array<CalendarEvent>) {
    events.forEach((event) => {
      if (event.startMoment.isBefore(component.startMoment)) {
        event.startMoment = component.startMoment.clone();
      }
      if (event.endMoment.isAfter(component.endMoment)) {
        event.endMoment = component.endMoment.clone();
      }
    });
  }

  renderGrid(component) {
    return (
      <div class='grid-wrapper'>
        {this.renderGridRows(component)}
      </div>
    );
  }

  renderGridRows(component) {
    const viewDates: Array<Moment> = component.viewRange.dates;
    const stepMoments: Array<Moment> = component.stepMoments;

    const rows = [];

    stepMoments.forEach((_stepMoment, index) => {
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
    return rows;
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

  renderLeftScale(component) {
    const steps = [];
    const stepMoments = component.stepMoments;

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

  renderViewHeader(component) {
    const viewDates: Array<Moment> = component.viewRange.dates;

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
          component.contextDate = date.format(INTERNAL_FORMAT.DATE);
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
