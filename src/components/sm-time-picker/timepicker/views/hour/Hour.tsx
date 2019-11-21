import {h} from "@stencil/core";
import {PICKER_VIEWS} from "../../constants";
import {getDisplayValue} from "../../utils/time-utils";

export class Hour {
  render(component) {
    return this.renderViewContainer(component);
  }

  renderViewContainer(component) {
    return (<div class='hour-view-container'>
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
      {this.renderHours(component)}
    </div>);
  }

  renderHours(component) {
    const hours: Array<number> = this.getHours(component);

    const rows = [];
    const rowCount = hours.length / 4;
    for (let i = 0; i < rowCount; i++) {
      rows.push(this.getRow(component, hours.splice(0, 4)));
    }
    return rows;
  }

  getRow(component, hours: Array<number>) {
    const cells = [];


    hours.forEach((hour) => {
      const cls: Array<string> = ['hour-cell'];

      if (component.contextHour === hour) {
        cls.push('selected');
      }

      cells.push(<div class={cls.join(' ')} onClick={() => {
        component.contextHour = hour;
        component.pickerView = PICKER_VIEWS.TIME;
      }}>
        <div class='hour-number'>
          {getDisplayValue(hour)}
        </div>
      </div>);
    });
    return (<div class="hour-row">
      {cells}
    </div>);
  }

  getHours(component) {
    const hours: Array<number> = [];
    let maxHours: number = 23;

    if (component.isTwelveHourFormat) {
      maxHours = 11;
    }

    for (let i = 0; i <= maxHours; i++) {
      hours.push(i);
    }

    return hours;
  }
}

export default new Hour();
