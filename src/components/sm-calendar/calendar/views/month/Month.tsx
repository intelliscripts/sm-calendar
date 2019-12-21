import {h} from "@stencil/core";
import {View} from "../view/View";
import {calculateDateRange} from './month-utils';
import moment, {Moment} from "moment-timezone";
import {INTERNAL_FORMAT} from "../../constants";
import CalendarEvent from "../../utils/events/CalendarEvent";
import templateRenderer, {MonthTemplateRenderer} from "../month/MonthTemplateRenderer";
import {fade} from "../../utils/common/color-utils";

export class Month extends View{
  public viewHeaderHeight: number = 50;
  private eventHeight: number = 20;
  private eventLeftMargin: number = 5;
  private eventTopMargin: number = 5;
  private gridCellHeaderHeight = 35;
  private maxEventsInCell = 3;
  public templateRenderer: MonthTemplateRenderer = templateRenderer;

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
          {this.renderEvents(component)}
        </div>
      </div>
    );
  }

  renderEvents(component) {

    const events = [];
    const links = [];

    const {renderedEvents, viewMoreLinks} = this.getEvents(component);

    renderedEvents.forEach((event) => {
      events.push(this.getEvent(component, event));
    });

    viewMoreLinks.forEach((viewMoreLink) => {
      links.push(this.getViewMoreLink(component, viewMoreLink));
    });

    return (
      <div class='events-wrapper'>
        {events}
        {links}
      </div>
    );
  }

  getViewMoreLink(component, viewMoreLink) {
    return (<div class='view-more' style={viewMoreLink.style} onClick={() => {
      component.contextDate = viewMoreLink.date.format(INTERNAL_FORMAT.DATE);
    }}>
      View More
    </div>);
  }

  getEvents(component) {
    const events: Array<CalendarEvent> = [...component.viewRange.events];

    const renderedEvents: Array<CalendarEvent> = [];
    const viewMoreLinks = [];

    const gridHeaderDates: Array<Moment> = [...component.viewRange.dates].slice(0, 7);

    const days: Array<number> = [];

    gridHeaderDates.forEach((date) => {
      days.push(date.day());
    });

    const gridDates: Array<Moment> = [...component.viewRange.dates];

    const rowMS = [];
    const rowCount = gridDates.length / 7;
    for (let i = 0; i < rowCount; i++) {
      const rowDates: Array<Moment> = gridDates.splice(0, 7);
      rowMS.push({
        startMS: rowDates[0].valueOf(),
        endMS: rowDates[6].valueOf()
      });
    }

    const cellEventsMap = {};

    events.forEach((event) => {
      const eventStartMS = event.startMoment.valueOf();

      const style = {
        height: this.eventHeight + 'px',
      };

      const eventCellCount: number = event.endMoment.diff(event.startMoment, 'days');
      style["width"] = 'calc(' + (((eventCellCount + 1) / 7) * 100) + '%' + ' - ' + (2 * this.eventLeftMargin) + 'px' + ')';

      const eventStartCellIndex:number = days.indexOf(event.startMoment.day());

      const leftPosition: string = 'calc(' + (((eventStartCellIndex) / 7) * 100) + '%' + ' + ' + this.eventLeftMargin + 'px' + ')';
      style["left"] = leftPosition;

      const eventEndCellIndex: number = days.indexOf(event.endMoment.day());

      rowMS.forEach((row, index) => {

        if (eventStartMS > row.startMS && eventStartMS < row.endMS) {

          let start = eventStartCellIndex;
          while (start <= eventEndCellIndex) {
            const cellKey: string = index + '_' + start;

            if (!cellEventsMap[cellKey]) {
              cellEventsMap[cellKey] = {
                count: 0,
                moreEventsPresent: false
              };
            }
            else {
              cellEventsMap[cellKey].count = cellEventsMap[cellKey].count + 1;
            }

            if (cellEventsMap[cellKey].count >= this.maxEventsInCell) {
              cellEventsMap[cellKey].moreEventsPresent = true;

              const leftPosition: string = 'calc(' + (((start) / 7) * 100) + '%' + ' + ' + this.eventLeftMargin + 'px' + ')';

              const topPosition: string = 'calc(' + (((index + 1) / rowCount) * 100) + '%' + ' - ' + (16) + 'px' + ')';

              const viewMore = {
                style: {
                  top: topPosition,
                  left: leftPosition,
                },
                date: event.startMoment.clone().add(start - eventStartCellIndex, 'days')
              };
              viewMoreLinks.push(viewMore);
            }


            start++;
          }

          const cellKey: string = index + '_' + eventStartCellIndex;

          const topPosition: string = 'calc(' + (((index) / rowCount) * 100) + '%' + ' + ' + (this.gridCellHeaderHeight + (cellEventsMap[cellKey].count * (this.eventHeight + this.eventTopMargin))) + 'px' + ')';

          style["top"] = topPosition;
          event.style = style;

          if (cellEventsMap[cellKey].count < this.maxEventsInCell) {
            renderedEvents.push(event);
          }
        }
      });

    });

    return {
      renderedEvents,
      viewMoreLinks
    };

  }

  getEvent(component, event: CalendarEvent) {
    const eventStyles: object = {
      ...event.style,
      background: event.bg_color,
      color: event.text_color,
      ['border-color']: event.borderColor
    };

    return (
      <div class='event' style={{...eventStyles}} onClick={() => {
        component.eventClick.emit({
          event: event.rawEvent,
        });
        //component.selectedEvent = event;
      }}>
        {this.templateRenderer.eventContainer(event)}
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
    const gridDates: Array<Moment> = [...component.viewRange.dates];

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
    return (<div class='row' style={{'min-height': rowHeight}}>
      {cols}
    </div>);
  }

  getCellWrapper(component, date: Moment, rowHeight: string) {
    const cls: Array<string> = ['item'];
    const {contextMoment} =component;
    const cellStyles = {
      background: ''
    };

    if (date.isSame(moment(), 'day')) {
      cls.push('today');
      cellStyles.background = fade(component.theme, 0.9);
    }

    if (date.isSame(contextMoment, 'day')) {
      cls.push('context-date');
    }

    if (!date.isSame(contextMoment, 'month')) {
      cls.push('grey-out');
    }

    return (
      <div class={cls.join(' ')} style={cellStyles}>
        <div class='cell-wrapper' style={{height: rowHeight}} onClick={() => {
          component.cellClick.emit({
            view: component.view,
            from: date.format('YYYY-MM-DD HH:ss'),
            to: date.clone().add(1, 'day').format('YYYY-MM-DD HH:ss')
          });
        }}>
          <div class='cell-header' style={{height: this.gridCellHeaderHeight + 'px'}}>
            <div class='cell-date' onClick={(ev) => {
              if (date.isSame(contextMoment, 'month')) {
                component.contextDate = date.format(INTERNAL_FORMAT.DATE);
              }
              ev.stopPropagation();
              ev.preventDefault();
            }}>
              {date.format('DD')}
            </div>
          </div>
        </div>
      </div>
      );
  }

  renderViewHeader(component) {
    const gridHeaderDates: Array<Moment> = [...component.viewRange.dates].slice(0, 7);

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
      {component.contextMoment.format('MMMM YYYY')}
    </div>);
  }

  public getDatePickerLabel(component) {
    return component.contextMoment.format('MMM YYYY');
  }

  public processEventsInViewRange(component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    let processedEvents: Array<CalendarEvent>;
    this.chopEvents(component, events);
    processedEvents = this.chunkEvents(component, events);
    return processedEvents;
  }

  chunkEvents(component, events: Array<CalendarEvent>) {
    const chunkEvents: Array<CalendarEvent> = [];

    const gridHeaderDates: Array<Moment> = [...component.viewRange.dates].slice(0, 7);

    const days: Array<number> = [];

    gridHeaderDates.forEach((date) => {
      days.push(date.day());
    });

    events.forEach((event) => {
      if (event.isMultiDay) {
        const eventEndIndex: number = days.indexOf(event.startMoment.day());
        const currentRowEndMoment: Moment = event.startMoment.clone().add(6 - eventEndIndex, 'days').endOf('day');

        if (currentRowEndMoment.isSameOrAfter(event.endMoment)) {
          const chunkEvent = event.clone();
          chunkEvent.startMoment = event.startMoment.clone();
          chunkEvent.endMoment = event.endMoment.clone();
          chunkEvents.push(chunkEvent);
        }
        else {
          let startMoment = event.startMoment.clone();

          while (currentRowEndMoment.isBefore(event.endMoment)) {
            const chunkEvent = event.clone();

            chunkEvent.startMoment = startMoment.clone();
            chunkEvent.endMoment = currentRowEndMoment.clone();
            chunkEvents.push(chunkEvent);

            startMoment = chunkEvent.endMoment.clone().add(1, 'day').startOf('day');
            currentRowEndMoment.add(7, 'days');
          }

          const chunkEvent = event.clone();
          chunkEvent.startMoment = startMoment.clone();
          chunkEvent.endMoment = event.endMoment.clone();


          chunkEvents.push(chunkEvent);
        }
      }
      else {
        const chunkEvent = event.clone();
        chunkEvent.startMoment = event.startMoment.clone();
        chunkEvent.endMoment = event.endMoment.clone();
        chunkEvents.push(chunkEvent);
      }
    });

    return chunkEvents;
  }

}

export default new Month();
