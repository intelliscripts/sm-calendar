import {Component, Prop, h, Host, State, Watch, Event, EventEmitter} from '@stencil/core';

import timePicker from './timepicker/TimePicker';
import {PICKER_VIEWS} from "./timepicker/constants";

@Component({
  tag: 'sm-time-picker',
  styleUrl: './styles/sm-time-picker.scss',
  shadow: true
})
export class SmTimePicker {
  /**
   * Theme
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) theme: string = 'teal';

  /**
   * hour
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) hour: number = 0;

  /**
   * minute
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) minute: number = 0;

  /**
   * showPicker
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) showPicker: boolean = false;

  /**
   * isTwelveHourFormat
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) isTwelveHourFormat: boolean = false;

  /**
   * meridian
   */
  @Prop({
    reflect: true,
    mutable: true,
  }) meridian: string = 'am';

  @State() pickerView: string = PICKER_VIEWS.TIME;
  @State() contextHour: number = this.hour;
  @State() contextMinute: number = this.minute;

  @Watch('showPicker') handleShowPickerChange() {
    this.pickerView = PICKER_VIEWS.TIME;
    this.contextHour =this.hour;
    this.contextMinute =this.minute;
  }

  @Event({
    eventName: 'timeSelected',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) timeSelected: EventEmitter;

  render() {
    return (
      <Host style={{'--theme-color': this.theme}}>
        <div class='sm-time-picker'>
          <div class='sm-time-picker-container'>
            {timePicker.render(this)}
          </div>
        </div>
      </Host>
    );
  }
}
