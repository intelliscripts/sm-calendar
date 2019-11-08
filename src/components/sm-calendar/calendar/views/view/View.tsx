import CalendarEvent from "../../utils/events/CalendarEvent";

export class View {

  getEventsInViewRange(component): Array<CalendarEvent> {
    return component.eventStore.getEventsBetween(component.startMoment.valueOf(), component.endMoment.valueOf());
  }

}
