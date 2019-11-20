import {h} from "@stencil/core";

export class TimePicker {

  togglePicker(component) {
    component.showPicker = !component.showPicker;
  }

  getHour(component) {
    if (component.hour.toString().length === 1) {
      return '0' + component.hour;
    }
    return component.hour;
  }

  getMinute(component) {
    if (component.minute.toString().length === 1) {
      return '0' + component.minute;
    }
    return component.minute;
  }

  getDisplayTime(component) {
    return this.getHour(component) + ':' + this.getMinute(component);
  }

  renderDropdown(component) {
    return (
      <div class='sm-time-picker-dropdown' onClick={() => this.togglePicker(component)}>
        <span>{component.label || this.getDisplayTime(component)}</span>
        <div class="down-triangle">
        </div>
      </div>
    );
  }

  renderPicker(component) {
    const {showPicker} = component;

    if (!showPicker) {
      return
    }

    return (
      <div class='sm-time-picker-popover'>
        <div class='sm-time-picker-popover-container'>
          {this.renderPickerHeader(component)}
          {this.renderPickerBody(component)}
        </div>
      </div>
    );
  }

  renderPickerHeader(_component) {
    return (<div class='picker-header'>

    </div>);
  }

  renderPickerBody(component) {
    return (<div class='picker-body'>
      <div class='row'>
        <div class='column'>
          <div class='up-triangle'>

          </div>
        </div>
        <div class='column'>
          <div class='up-triangle'>

          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <div class='hour'>
            {this.getHour(component)}
          </div>
        </div>
        <div class='column'>
          <div class='minute'>
            {this.getMinute(component)}
          </div>
        </div>
      </div>
      <div class='row'>
        <div class='column'>
          <div class='down-triangle'>

          </div>
        </div>
        <div class='column'>
          <div class='down-triangle'>

          </div>
        </div>
      </div>
    </div>);
  }

  render(component) {
    return ([this.renderDropdown(component), this.renderPicker(component)]);
  }
}

export default new TimePicker();
