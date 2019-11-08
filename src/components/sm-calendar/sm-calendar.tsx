import {Component, Prop, h, Host, State, Watch, Event, EventEmitter} from '@stencil/core';
import moment, {Moment} from 'moment';

import calendar from './calendar/Calendar';
import {EVENTS, INTERNAL_FORMAT, VIEWS} from "./calendar/constants";
import eventStore, {EventStore} from "./calendar/utils/events/EventStore";

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
  }) theme: string = 'teal';

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
   * state variables
   */
  @State() contextMoment: Moment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
  @State() eventStore: EventStore = eventStore;


  /**
   * life cycle methods
   */

  componentWillLoad() {
    this.eventStore.parseEvents(this.events, this.timezone);
  }

  /**
   * watchers
   */
  @Watch('contextDate') handleContextDateChange() {
    this.contextMoment = moment(this.contextDate, INTERNAL_FORMAT.DATE, this.timezone);
  }

  @Watch('view') handleViewChange(view: string) {
    this.viewChange.emit(view);
  }

  /**
   * Events
   */

  @Event({
    eventName: EVENTS.VIEW_CHANGE,
    composed: true,
    cancelable: true,
    bubbles: true,
  }) viewChange: EventEmitter;

  /**
   * main renderer
   */
  render() {
    console.log('rendered');
    return (
      <Host style={{'--theme-color': this.theme}} onClick={() => {}}>
        <div class='sm-calendar'>
            {calendar.render(this)}
        </div>
      </Host>
    );
  }
}
