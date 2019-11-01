import {Component, Prop, h, Host} from '@stencil/core';

import calendar from './calendar/Calendar';

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

  render() {
    return (
      <Host style={{'--theme-color': this.theme}}>
        <div class='sm-calendar'>
          <div class='sm-calendar-container'>
            {calendar.render(this)}
          </div>
        </div>
      </Host>
    );
  }
}
