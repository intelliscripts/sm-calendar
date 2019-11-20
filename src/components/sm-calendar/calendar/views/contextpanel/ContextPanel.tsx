import templateRenderer, {ContextPanelTemplateRenderer} from "./ContextPanelTemplateRenderer";
import {h} from "@stencil/core";
import CalendarEvent from "../../utils/events/CalendarEvent";
import {Moment} from "moment";
import {INTERNAL_FORMAT} from "../../constants";

class ContextPanel {
  public templateRenderer: ContextPanelTemplateRenderer = templateRenderer;

  render(component) {
    if (!component.showContextPanel) {
      return;
    }
    return this.renderContextPanel(component);
  }

  renderContextPanel(component) {
    return (<div class='context-panel-container'>
      <div class='context-panel-wrapper'>
        {this.renderHeader(component)}
        {this.renderBody(component)}
      </div>
    </div>);
  }

  renderHeader(component) {
    return (<div class='context-panel-header'>
      <div class='context-date'>
        {component.contextMoment.format('DD MMM, YYYY')}
      </div>
    </div>);
  }

  renderBody(component) {
    return (<div class='context-panel-body'>
      {this.renderContextDateEvents(component)}
    </div>);
  }

  renderContextDateEvents(component) {
    const eventsDOM = [];

    const events = this.getContextDateEvents(component);

    if (events.length > 0) {
      events.forEach((event) => {
        eventsDOM.push(<div class='context-panel-event' style={{'border-left-color': event.borderColor}}>
          <div class='context-panel-event-header'>
            <div class='event-time'>
              {event.startMoment.format(INTERNAL_FORMAT.DISPLAY_TIME)} - {event.endMoment.format(INTERNAL_FORMAT.DISPLAY_TIME)}
            </div>
          </div>
          <div class='context-panel-event-body'>
            <div class='event-title'>
              {event.title}
            </div>
            <div class='event-description'>
              {event.description}
            </div>
          </div>
        </div>);
      });

      return eventsDOM;
    }

    return (<div class='no-events'>
      No Events
    </div>);
  }

  getContextDateEvents(component) {
    const contextStartMoment: Moment = component.contextMoment.clone().startOf('day');
    const contextEndMoment: Moment = component.contextMoment.clone().endOf('day');

    const events: Array<CalendarEvent> = component.eventStore.getEventsBetween(contextStartMoment.clone(), contextEndMoment.clone());
    this.chopEvents(component, events, contextStartMoment, contextEndMoment);

    return [...events];
  }

   chopEvents(_component, events: Array<CalendarEvent>, contextStartMoment: Moment, contextEndMoment: Moment) {
    events.forEach((event) => {
      if (event.startMoment.isBefore(contextStartMoment)) {
        event.startMoment = contextStartMoment.clone();
      }
      if (event.endMoment.isAfter(contextEndMoment)) {
        event.endMoment = contextEndMoment.clone();
      }
    });
  }
}

export default new ContextPanel();
