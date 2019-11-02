import {Component, Prop, h, Host, State, Watch} from '@stencil/core';
import moment, {Moment} from 'moment';

import calendar from './calendar/Calendar';
import {INTERNAL_DATE, VIEWS} from "./calendar/constants";

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
  }) contextDate: string = moment().format(INTERNAL_DATE);

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

  @State() contextMoment: Moment = moment(this.contextDate, INTERNAL_DATE, this.timezone);

  @Watch('contextDate') handleContextDateChange() {
    this.contextMoment = moment(this.contextDate, INTERNAL_DATE, this.timezone);
  }

  render() {
    return (
      <Host style={{'--theme-color': this.theme}} onClick={() => {}}>
        <div class='sm-calendar'>
            {calendar.render(this)}
        </div>
      </Host>
    );
  }
}
