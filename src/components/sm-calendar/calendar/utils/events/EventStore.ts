import CalendarEvent from "./CalendarEvent";

export class EventStore {
  private events: Array<CalendarEvent> = [];

  addEvent(rawEvent: object, timezone: string) {
    this.events.push(new CalendarEvent(rawEvent, timezone));
  }

  flush() {
    this.events = [];
  }

  getAll(): Array<CalendarEvent> {
    return this.events;
  }

  /**
   *
   * @param rawEvents
   * @param timezone
   */
  parseEvents(rawEvents: Array<object> = [], timezone: string) {
    rawEvents.forEach((rawEvent) => {
      this.addEvent(rawEvent, timezone);
    });
  }

  /**
   *
   * @param startMS
   * @param endMS
   */
  getEventsBetween(startMS: number, endMS: number) {
    return this.getAll().filter((e) => {
      return !(e.startMS > endMS || e.endMS < startMS || e.endMS === startMS);
    });
  }
}

export default new EventStore();
