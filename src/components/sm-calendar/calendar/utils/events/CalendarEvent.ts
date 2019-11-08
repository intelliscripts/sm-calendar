import {INTERNAL_DATE_TIME_REGEX, INTERNAL_FORMAT} from "../../constants";
import moment from 'moment-timezone';
import {Moment} from "moment";

class CalendarEvent {

  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  text_color: string;
  bg_color: string;
  startMS: number;
  startMoment: Moment;
  endMS: number;
  endMoment: Moment;
  rawEvent: object;

  /**
   *
   * @param rawEvent
   * @param timezone
   */
  constructor(rawEvent, timezone: string = 'GMT') {
    this.id = rawEvent.id || this.generateId();
    this.title = rawEvent.title;
    this.description = rawEvent.description;
    this.start = rawEvent.start;
    this.end = rawEvent.end;
    this.text_color = rawEvent.text_color;
    this.bg_color = rawEvent.bg_color;
    this.rawEvent = rawEvent;

    if(INTERNAL_DATE_TIME_REGEX.test(this.start)) {
      this.startMS = moment.tz(rawEvent.start, INTERNAL_FORMAT.DATE_TIME, true, timezone).valueOf();
      this.startMoment = moment.utc(this.startMS).tz(timezone);

    }
    if(INTERNAL_DATE_TIME_REGEX.test(this.end)) {
      this.endMS = moment.tz(rawEvent.end, INTERNAL_FORMAT.DATE_TIME, true, timezone).valueOf();
      this.endMoment = moment.utc(this.endMS).tz(timezone);
    }
  }

  /**
   *
   */
  generateId(): string {
    return Math.floor(100000000 + Math.random() * 900000000) + '';
  }
}

export default CalendarEvent;
