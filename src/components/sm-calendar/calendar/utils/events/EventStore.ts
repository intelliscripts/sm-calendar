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

  parseEvents(rawEvents: Array<object> = [], timezone: string) {
    rawEvents.forEach((rawEvent) => {
      this.addEvent(rawEvent, timezone);
    });
  }
}

export default new EventStore();
