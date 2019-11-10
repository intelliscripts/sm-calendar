import {h} from "@stencil/core";
import {INTERNAL_FORMAT} from "../../constants";
import moment, {Moment} from 'moment-timezone';
import {View} from "../view/View";
import CalendarEvent from "../../utils/events/CalendarEvent";
import {getBestFitPosition, getOverlaps} from './column-utils';
import templateRenderer, {ColumnTemplateRenderer} from './ColumnTemplateRenderer';

export class Column extends View{
  public numberOfCols: number = 1;
  public leftScaleWidth: number = 100;
  public timeStepDuration: number = 60;//minutes
  public timeStepHeight: number = 40;
  public timeStepFormat: string = 'HH:mm';
  public viewHeaderHeight: number = 70;
  public scaleSizeInSecs: number = 24 * 60 * 60;
  public templateRenderer: ColumnTemplateRenderer = templateRenderer;

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
    const events = [];

    this.getEvents(component).forEach((event) => {
      events.push(this.getEvent(event));
    });

    return (
      <div class='events-wrapper'>
        {events}
      </div>
    );
  }

  getEvents(component) {
    const events = [];

    const MAX_EVENTS_OVERLAP : number=  Math.trunc(200 / this.numberOfCols);
    const eventsColumnMap: object = this.getEventsColumnMap(component, component.viewRange.events);

    for (let column in eventsColumnMap) {
      const columnEvents = eventsColumnMap[column];
      const overlaps = getOverlaps(columnEvents, null, component.timezone);

      for (const o in overlaps) {
        const overlapEvents = overlaps[o];
        if (!overlapEvents || overlapEvents.length === 0)
          continue;

        let bestFit = getBestFitPosition(overlapEvents, true);

        if (bestFit.divisor > MAX_EVENTS_OVERLAP) {
          bestFit.divisor = MAX_EVENTS_OVERLAP;
          bestFit.events = bestFit.events.filter(function(event){
            return event.startPosition < MAX_EVENTS_OVERLAP && event.endPosition <= MAX_EVENTS_OVERLAP;
          });
        }
        events.push(...this.processStyleAttributes(component, bestFit, column));
      }
    }

    return events;
  }

  getEvent(event: CalendarEvent) {
    const eventStyles: object = {
      ...event.style,
      background: event.bg_color,
      color: event.text_color,
      ['border-color']: event.border_color
    };

    return (
      <div class='event' style={{...eventStyles}}>
        {this.templateRenderer.eventContainer(event)}
      </div>
    );
  }

  processStyleAttributes(_component, bestFit, column) {
    let events = bestFit.events;

    const {numberOfCols} = this;

    const layout = this.getPaddings();
    let totalWidth = (100 / numberOfCols) - layout.startPadding - layout.endPadding;
    let origStart = (100 / numberOfCols) * column + layout.startPadding;
    let eventWidth = (totalWidth / bestFit.divisor);
    for (let i = 0; i < events.length; i++) {
      let startSecs = events[i].startSec;
      let endSecs = events[i].endSec;

      const eventTop = startSecs / this.scaleSizeInSecs * 100;
      let eventHeight =(endSecs - startSecs) / this.scaleSizeInSecs * 100;

      const totalPosition = eventTop + eventHeight;

      if (totalPosition > 100) {
        eventHeight = 100 - eventTop;
      }

      events[i].style = {
        width: (eventWidth > layout.spacing ? (eventWidth * (events[i].endPosition - events[i].startPosition + 1) - layout.spacing) : eventWidth) + '%',
        left: (origStart + eventWidth * events[i].startPosition) + '%',
        top: eventTop + '%',
        height: eventHeight + '%',
      };
    }
    return events;
  }

  getPaddings() {
    /** All values are in % */
    return {
      startPadding: 0.2,
      endPadding: 1,
      spacing: 0.2,
    };
  }

  getEventsColumnMap(component, events: Array<CalendarEvent>): object {
    const eventsColumnMap = {};

    events.forEach((event) => {
      const key = event.startMoment.diff(component.startMoment, 'days');
      if (!eventsColumnMap[key]) {
        eventsColumnMap[key] = [];
      }
      eventsColumnMap[key].push(event);
    });

    return eventsColumnMap;
  }

  public processEventsInViewRange(component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    let processedEvents: Array<CalendarEvent>;
    this.chopEvents(component, events);
    processedEvents = this.chunkEvents(component, events);
    return processedEvents;
  }

  chunkEvents(_component, events: Array<CalendarEvent>) {
    const chunkEvents: Array<CalendarEvent> = [];

    events.forEach((event) => {
      if (event.isMultiDay) {
        const startMoment: Moment = event.startMoment.clone();

        while (!startMoment.isSame(event.endMoment, 'day')) {
          const chunkEvent = event.clone();

          chunkEvent.startMoment = startMoment.clone();
          chunkEvent.endMoment = startMoment.clone().endOf('day');
          chunkEvents.push(chunkEvent);

          startMoment.endOf('day').add(1, 'second');
        }

        const chunkEvent = event.clone();
        chunkEvent.startMoment = startMoment.clone();
        chunkEvent.endMoment = event.endMoment.clone();

        chunkEvents.push(chunkEvent);
      }
      else {
        chunkEvents.push(event.clone());
      }
    });

    return chunkEvents;
  }

  chopEvents(component, events: Array<CalendarEvent>) {
    events.forEach((event) => {
      if (event.startMoment.isBefore(component.startMoment)) {
        event.startMoment = component.startMoment.clone();
      }
      if (event.endMoment.isAfter(component.endMoment)) {
        event.endMoment = component.endMoment.clone();
      }
      if (!event.startMoment.isSame(event.endMoment, 'day')){
        event.isMultiDay = true;
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
