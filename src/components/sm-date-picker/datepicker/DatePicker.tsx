import {h} from "@stencil/core";
import {INTERNAL_DATE, PICKER_VIEWS} from './constants';
import dayView from './views/day/DayView';
import monthView from './views/month/MonthView';

class DatePicker {

  togglePicker(component) {
    component.showPicker = !component.showPicker;
  }

  renderHeader(component) {
    return (
      <div class='sm-date-picker-dropdown' onClick={() => this.togglePicker(component)}>
        <span>{component.label || component.contextMoment.format(INTERNAL_DATE)}</span>
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

    if (component.pickerView === PICKER_VIEWS.DAY) {
      currentView = dayView.render(component);
    }
    else if (component.pickerView === PICKER_VIEWS.MONTH) {
      currentView = monthView.render(component);
    }
    return (
      <div class='sm-date-picker-popover'>
        <div class='sm-date-picker-popover-container'>
          {currentView}
        </div>
      </div>
    );
  }

  render(component) {
    return ([this.renderHeader(component), this.renderPicker(component)]);
  }
}

export default new DatePicker();
