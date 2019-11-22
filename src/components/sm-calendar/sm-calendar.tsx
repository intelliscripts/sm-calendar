import {Component, Prop, h, Host, State, Watch, Event, EventEmitter, Element, Listen} from '@stencil/core';
import moment, {Moment} from 'moment';

import calendar from './calendar/Calendar';
import {EVENTS, INTERNAL_FORMAT, VIEWS, WEEK_DAYS} from "./calendar/constants";
import eventStore, {EventStore} from "./calendar/utils/events/EventStore";
import CalendarEvent from "./calendar/utils/events/CalendarEvent";

@Component({
  tag: 'sm-calendar',
  styleUrl: './styles/sm-calendar.scss',
  shadow: true
})
export class SmCalendar {
  /**
   * Theme
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) theme: string = 'teal';//lightseagreen

  /**
   * contextDate
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) contextDate: string = moment().format(INTERNAL_FORMAT.DATE);

  /**
   * availableViews
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) availableViews: Array<string> = [VIEWS.day, VIEWS.week, VIEWS.month];

  /**
   * view
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) view: string = VIEWS.week;

  /**
   * timezone
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) timezone: string = 'GMT';

  /**
   * weekStartDay
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) weekStartDay: string = 'sun';

  /**
   * events
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) events: Array<object> = [];

  /**
   * showContextPanel
   */

  @Prop({
    reflect: true,
    mutable: true,
  }) showContextPanel: boolean = true;

  /**
   * state variables
   */
  @State() contextMoment: Moment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
  @State() startMoment: Moment;
  @State() endMoment: Moment;
  @State() eventStore: EventStore = eventStore;
  @State() selectedEvent: CalendarEvent;

  /**
   * component DOM reference
   */
  @Element() ref: HTMLElement;

  /**
   * life cycle methods
   */

  componentWillLoad() {
    this.eventStore.parseEvents(this.events, this.timezone);
    this.updateView();
  }

  /**
   * watchers
   */
  @Watch('contextDate') handleContextDateChange() {
    this.contextMoment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
    this.updateView();
  }

  @Watch('view') handleViewChange() {
    this.updateView();
  }

  @Watch('events') handleEventsChange() {
    this.eventStore.parseEvents(this.events, this.timezone);
  }

  /**
   * Events
   */

  @Event({
    eventName: EVENTS.EVENT_CLICK,
    composed: true,
    cancelable: true,
    bubbles: true,
  }) eventClick: EventEmitter;

  @Event({
    eventName: EVENTS.VIEW_CHANGE,
    composed: true,
    cancelable: true,
    bubbles: true,
  }) viewChange: EventEmitter;

  @Event({
    eventName: EVENTS.EVENT_UPDATE,
    composed: true,
    cancelable: true,
    bubbles: true,
  }) eventUpdate: EventEmitter;

  /**
   *
   * Listners
   */
  @Listen('click', { capture: true })
  handleClick(mouseEvent) {
    const path = mouseEvent.composedPath ? mouseEvent.composedPath() : mouseEvent.path;
    let clickedInsideDatePicker = false;
    for (let i = 0; i < path.length; i++) {
      if (path[i].classList && path[i].classList.contains('sm-date-picker')) {
        clickedInsideDatePicker = true;
        break;
      }
    }
    if (!clickedInsideDatePicker) {
      const datePickers = this.ref.shadowRoot.querySelectorAll('sm-date-picker');
      datePickers.forEach((datePicker) => {
        datePicker.showPicker = false;
      });

    }
  }

  /**
   * functions
   */

  updateView() {
    const viewRange = calendar.getViewRenderer(this).calculateViewRange(this.contextMoment, WEEK_DAYS[this.weekStartDay]);
    this.startMoment = viewRange.startMoment;
    this.endMoment = viewRange.endMoment;

    this.viewChange.emit({
      view: this.view,
      start: this.startMoment.format(INTERNAL_FORMAT.DATE_TIME),
      end: this.endMoment.format(INTERNAL_FORMAT.DATE_TIME)
    });

  }

  /**
   * main renderer
   */
  render() {
    const componentHeight: string = this.ref.style.height + '' || 'calc(100vh - 10px)';
    return (
      <Host style={{'--theme-color': this.theme, '--component-height': componentHeight}} onClick={() => {}}>
        <div class='sm-calendar'>
            {calendar.render(this)}
        </div>
      </Host>
    );
  }
}
