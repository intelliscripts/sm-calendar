import {h} from "@stencil/core";
import {INTERNAL_FORMAT} from "../constants";

export class EditEvent {
  render(component) {
    if (!component.selectedEvent) {
      return;
    }
    return this.renderEditEventModal(component);
  }

  renderEditEventModal(component) {
    return (<div class='event-edit-container'>
      <div class='event-edit-wrapper' style={{'border-top-color': component.selectedEvent.borderColor}}>
        {this.renderHeader(component)}
        {this.renderBody(component)}
      </div>
    </div>);
  }

  renderHeader(component) {
    return (<div class='event-edit-header'>
      {component.selectedEvent.title}
      <div class='close' onClick={() => {
        component.selectedEvent = null;
      }}>
        X
      </div>
    </div>);
  }

  renderBody(component) {
    return (<div class='event-edit-body'>
      <div class='form-row'>
        <label class='form-label'>Start time</label>
        <div class='form-element date-time-picker'>
          <sm-date-picker onDateSelected={(_payload) => {
          }} theme={component.theme} date={component.selectedEvent.originalStartMoment.format(INTERNAL_FORMAT.DATE)} week-start-day={component.weekStartDay}></sm-date-picker>

        </div>
      </div>

      <div class='form-row'>
        <label class='form-label'>End time</label>
        <div class='form-element date-time-picker'>
          <sm-date-picker onDateSelected={(_payload) => {
          }} theme={component.theme} date={component.selectedEvent.originalEndMoment.format(INTERNAL_FORMAT.DATE)} week-start-day={component.weekStartDay}></sm-date-picker>

        </div>
      </div>

    </div>);
  }
}

export default new EditEvent();
