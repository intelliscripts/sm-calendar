import {Component, h, State} from '@stencil/core';
import {getEvents} from './utils/event-utils';

@Component({
  tag: 'sm-demo-calendar',
  styleUrl: './styles/sm-demo-calendar.scss',
  shadow: true
})
export class SmDemoCalendar {

  @State() weekStartDay: string = 'sun';
  @State() events: Array<object> = getEvents();

  render() {
    return (
      <div class='sm-demo-calendar'>
        <sm-calendar events={this.events} onViewChange={(_payload) => {
          //console.log(payload.detail);
        }}/>
      </div>
    );
  }
}
