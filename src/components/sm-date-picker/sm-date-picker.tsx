import {Component, Prop, h, Watch, Event, EventEmitter, State, Host} from '@stencil/core';
import moment, {Moment} from 'moment';
import {PICKER_VIEWS, INTERNAL_DATE} from './datepicker/constants';

import datePicker from './datepicker/DatePicker';

@Component({
  tag: 'sm-date-picker',
  styleUrl: './styles/sm-date-picker.scss',
  shadow: true
})
export class SmDatePicker {
  /**
   * weekStartDay
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) weekStartDay: string = 'sun';

  /**
   * date
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) date: string = moment().format(INTERNAL_DATE);

  /**
   * showPicker
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) showPicker: boolean = false;

  /**
   * Theme
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) theme: string = 'teal';

  @State() pickerView: string = PICKER_VIEWS.DAY;
  @State() contextMoment: Moment = moment(this.date, INTERNAL_DATE);
  @State() navMoment: Moment = moment(this.date, INTERNAL_DATE);

  /**
   * label
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) label: string;

  @Watch('date') handleDateChange(date: string) {
    this.dateSelected.emit(date);
    this.contextMoment = moment(date, INTERNAL_DATE);
  }

  @Watch('contextMoment') handleContextMomentChange(contextMoment: Moment) {
    this.navMoment = contextMoment.clone();
  }


  @Watch('showPicker') handleShowPickerChange() {
    this.pickerView = PICKER_VIEWS.DAY;
    this.contextMoment = moment(this.date, INTERNAL_DATE);
  }

  @Event({
    eventName: 'dateSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) dateSelected: EventEmitter;

  render() {
    return (
      <Host style={{'--theme-color': this.theme}}>
        <div class='sm-date-picker'>
          <div class='sm-date-picker-container'>
            {datePicker.render(this)}
          </div>
        </div>
      </Host>
    );
  }
}
