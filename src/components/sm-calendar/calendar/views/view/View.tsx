import CalendarEvent from "../../utils/events/CalendarEvent";

export class View {

  public getEventsInViewRange(component): Array<CalendarEvent> {
    const events: Array<CalendarEvent> = component.eventStore.getEventsBetween(component.startMoment, component.endMoment);
    return this.processEventsInViewRange(component, events);
  }

  public processEventsInViewRange(_component, events: Array<CalendarEvent>): Array<CalendarEvent> {
    return events;
  }

}
