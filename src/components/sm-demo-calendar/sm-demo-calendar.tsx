import {Component, h, State} from '@stencil/core';
import {getEvents, CONTEXT_DATE} from './utils/event-utils';

@Component({
  tag: 'sm-demo-calendar',
  styleUrl: './styles/sm-demo-calendar.scss',
  shadow: true
})
export class SmDemoCalendar {

  @State() weekStartDay: string = 'sun';
  @State() events: Array<object> = getEvents();
  @State() contextDate: string = CONTEXT_DATE;

  render() {
    return (
      <div class='sm-demo-calendar'>
        <sm-calendar events={this.events} view="month" context-date={this.contextDate} onViewChange={(_payload) => {
          //console.log(payload.detail);
        }}/>
      </div>
    );
  }
}
