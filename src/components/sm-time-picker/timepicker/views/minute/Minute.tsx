import {h} from "@stencil/core";
import {PICKER_VIEWS} from "../../constants";
import {getDisplayValue} from "../../utils/time-utils";

export class Minute {
  render(component) {
    return this.renderViewContainer(component);
  }

  renderViewContainer(component) {
    return (<div class='minute-view-container'>
      {this.renderPickerHeader(component)}
      {this.renderPickerBody(component)}
    </div>);
  }

  renderPickerHeader(_component) {
    return (<div class='picker-header'>

    </div>);
  }

  renderPickerBody(component) {
    return (<div class='picker-body'>
      {this.renderMinutes(component)}
    </div>);
  }

  renderMinutes(component) {
    const minutes: Array<number> = this.getMinutes(component);

    const rows = [];
    const rowCount = minutes.length / 6;
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.getRow(component, minutes.splice(0, 6)));
    }
    return rows;
  }

  getRow(component, minutes: Array<number>) {
    const cells = [];


    minutes.forEach((minute) => {
      const cls: Array<string> = ['minute-cell'];

      if (component.contextMinute === minute) {
        cls.push('selected');
      }

      cells.push(<div class={cls.join(' ')} onClick={() => {
        component.contextMinute = minute;
        component.pickerView = PICKER_VIEWS.TIME;
      }}>
        <div class='minute-number'>
          {getDisplayValue(minute)}
        </div>
      </div>);
    });
    return (<div class="minute-row">
      {cells}
    </div>);
  }

  getMinutes(_component) {
    const minutes: Array<number> = [];
    let maxMinutes: number = 59;

    for (let i = 0; i <= maxMinutes; i++) {
      minutes.push(i);
    }

    return minutes;
  }
}

export default new Minute();
