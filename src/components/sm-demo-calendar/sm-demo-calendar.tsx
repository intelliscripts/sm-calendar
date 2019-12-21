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

  componentDidLoad() {
    setTimeout(() => {
      //this.events = [...this.events, this.events[0]];
    }, 2000);
  }

  render() {
    return (
      <div class='sm-demo-calendar'>
        <sm-calendar events={this.events} view="month" context-date={this.contextDate} onViewChange={(_payload) => {
          //console.log(_payload.detail);
        }} onEventClick={(_payload) => {
          console.log(_payload.detail);
        }} onCellClick={(_payload) => {
          console.log(_payload.detail);
        }} onEventUpdate={(payload) => {
          const updateEvent = payload.detail.event;
          const {start, end} = payload.detail.updatedValues;

          const eventsBackUp = this.events;

          eventsBackUp.forEach((event) => {
            // @ts-ignore
            if (event.id === updateEvent.id) {
              // @ts-ignore
              event.start = start;
              // @ts-ignore
              event.end = end;
            }
          });

          this.events = [...eventsBackUp];
        }}/>
      </div>
    );
  }
}
