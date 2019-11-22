import {h} from "@stencil/core";
import {getDisplayValue} from "../../utils/time-utils";
import {PICKER_VIEWS} from "../../constants";

export class Time {

  render(component) {
    return this.renderViewContainer(component);
  }

  renderViewContainer(component) {
    return (<div class='time-view-container'>
      {this.renderPickerHeader(component)}
      {this.renderPickerBody(component)}
      {this.renderPickerFooter(component)}
    </div>);
  }

  renderPickerFooter(component) {
    return (
      <div class='picker-footer'>
        <button class='sm-button' onClick={() => {
          component.showPicker = false;
        }}>Close
        </button>

        <button class='sm-button primary ok-button' onClick={() => {
          component.hour = component.contextHour;
          component.minute = component.contextMinute;
          component.showPicker = false;
          component.timeSelected.emit({
            minute: component.minute,
            hour: component.hour
          });
        }}>Ok</button>
      </div>
    );
  }

  renderPickerHeader(_component) {
    return (<div class='picker-header'>

    </div>);
  }

  isMaxHour(component) {
    if (component.isTwelveHourFormat) {
      if (component.contextHour === 11) {
        return true;
      }
    }
    else {
      if (component.contextHour === 23) {
        return true;
      }
    }

    return false;
  }

  isMinHour(component) {
    if (component.contextHour === 0) {
      return true;
    }

    return false;
  }

  isMaxMinute(component) {
    if (component.contextMinute === 59) {
      return true;
    }

    return false;
  }

  isMinMinute(component) {
    if (component.contextMinute === 0) {
      return true;
    }

    return false;
  }

  renderPickerBody(component) {
    return (<div class='picker-body'>
      <div class='row'>
        <div class='column'>
          <div class='up-triangle' onClick={() => {
            if (!this.isMaxHour(component)) {
              component.contextHour = component.contextHour + 1;
            }
          }}>

          </div>
        </div>
        <div class='column'>
        </div>
        <div class='column'>
          <div class='up-triangle' onClick={() => {
            if (!this.isMaxMinute(component)) {
              component.contextMinute = component.contextMinute + 1;
            }
          }}>

          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <div class='hour' onClick={() => {
            component.pickerView = PICKER_VIEWS.HOUR;
          }}>
            {getDisplayValue(component.contextHour)}
          </div>
        </div>
        <div class='column'>
          :
        </div>
        <div class='column'>
          <div class='minute' onClick={() => {
            component.pickerView = PICKER_VIEWS.MINUTE;
          }}>
            {getDisplayValue(component.contextMinute)}
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <div class='down-triangle' onClick={() => {
            if (!this.isMinHour(component)) {
              component.contextHour = component.contextHour - 1;
            }
          }}>

          </div>
        </div>
        <div class='column'>
        </div>
        <div class='column'>
          <div class='down-triangle' onClick={() => {
            if (!this.isMinMinute(component)) {
              component.contextMinute = component.contextMinute - 1;
            }
          }}>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default new Time();
