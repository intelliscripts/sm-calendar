import CalendarEvent from "./CalendarEvent";
import {Moment} from "moment-timezone";

export class EventStore {
  private events: Array<CalendarEvent> = [];

  addEvent(rawEvent: object, timezone: string) {
    this.events.push(new CalendarEvent(rawEvent, timezone));
  }

  flush() {
    this.events = [];
  }

  /**
   *
   * @param rawEvents
   * @param timezone
   */
  parseEvents(rawEvents: Array<object> = [], timezone: string) {
    this.flush();
    rawEvents.forEach((rawEvent) => {
      this.addEvent(rawEvent, timezone);
    });
  }

  /**
   *
   * @param startMoment
   * @param endMoment
   */
  getEventsBetween(startMoment: Moment, endMoment: Moment): Array<CalendarEvent> {
    const events: Array<CalendarEvent> = [];

    this.events.forEach((event) => {
      if (!(event.startMoment.valueOf() > endMoment.valueOf() || event.endMoment.valueOf() < startMoment.valueOf() || event.endMoment.valueOf() === startMoment.valueOf())) {
        events.push(event.clone());
      }
    });

    return events.sort((a, b) => a.startMoment.diff(b.startMoment));
  }

}

export default new EventStore();
