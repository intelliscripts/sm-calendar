import {Component, h, State} from '@stencil/core';

@Component({
  tag: 'sm-demo-calendar',
  styleUrl: './styles/sm-demo-calendar.scss',
  shadow: true
})
export class SmDemoCalendar {

  @State() weekStartDay: string = 'sun';

  render() {
    return (
      <div class='sm-demo-calendar'>
        <sm-calendar></sm-calendar>
      </div>
    );
  }
}
