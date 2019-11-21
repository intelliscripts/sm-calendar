import {h} from "@stencil/core";
import {PICKER_VIEWS} from "./constants";
import timeView from './views/time/Time';
import hourView from './views/hour/Hour';
import minuteView from './views/minute/Minute';
import {getDisplayValue} from "./utils/time-utils";

export class TimePicker {

  togglePicker(component) {
    component.showPicker = !component.showPicker;
  }

  getTime(component) {
    return getDisplayValue(component.hour) + ':' + getDisplayValue(component.minute);
  }

  renderDropdown(component) {
    return (
      <div class='sm-time-picker-dropdown' onClick={() => this.togglePicker(component)}>
        <span>{component.label || this.getTime(component)}</span>
        <div class="down-triangle">
        </div>
      </div>
    );
  }

  renderPicker(component) {
    const {showPicker} = component;

    let currentView;

    if (!showPicker) {
      return
    }

    if (component.pickerView === PICKER_VIEWS.TIME) {
      currentView = timeView.render(component);
    }
    if (component.pickerView === PICKER_VIEWS.HOUR) {
      currentView = hourView.render(component);
    }
    if (component.pickerView === PICKER_VIEWS.MINUTE) {
      currentView = minuteView.render(component);
    }

    return (
      <div class='sm-time-picker-popover'>
        <div class='sm-time-picker-popover-container'>
          {currentView}
        </div>
      </div>
    );
  }

  render(component) {
    return ([this.renderDropdown(component), this.renderPicker(component)]);
  }
}

export default new TimePicker();
