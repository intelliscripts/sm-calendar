import {Component, h, State} from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'sm-demo-date-picker',
  styleUrl: './styles/sm-demo-date-picker.scss',
  shadow: true
})
export class SmDemoDatePicker {

  @State() showPicker: boolean = true;
  @State() weekStartDay: string = 'sun';

  componentDidLoad() {
    setTimeout(() => {
      //this.weekStartDay = 'mon';
    }, 4000);
  }

  render() {
    return (
      <div class='sm-demo-date-picker'>
        <sm-date-picker theme='teal' weekStartDay={this.weekStartDay} showPicker={this.showPicker} onDateSelected={(ev) => {
          console.log(moment(ev.detail).toDate());
        }}></sm-date-picker>
      </div>
    );
  }
}
