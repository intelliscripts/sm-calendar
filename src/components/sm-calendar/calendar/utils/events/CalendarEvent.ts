import {INTERNAL_DATE_TIME_REGEX, INTERNAL_FORMAT} from "../../constants";
import moment,{Moment} from 'moment-timezone';
import {negate, darken} from "../common/color-utils";

class CalendarEvent {

  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  text_color: string;
  background: string;

  borderColor: string;
  isMultiDay: boolean = false;
  chunks: Array<object> = [];
  timezone: string;
  startMoment: Moment;
  originalStartMoment: Moment;
  endMoment: Moment;
  originalEndMoment: Moment;
  rawEvent: object;
  style: object;

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
    this.background = rawEvent.background;
    this.timezone = timezone;
    this.rawEvent = rawEvent;

    if(INTERNAL_DATE_TIME_REGEX.test(this.start)) {
      this.startMoment = moment.tz(rawEvent.start, INTERNAL_FORMAT.DATE_TIME, true, timezone);
      this.originalStartMoment = this.startMoment.clone();
    }
    if(INTERNAL_DATE_TIME_REGEX.test(this.end)) {
      this.endMoment = moment.tz(rawEvent.end, INTERNAL_FORMAT.DATE_TIME, true, timezone);
      this.originalEndMoment = this.endMoment.clone();
    }
    if (!this.startMoment.isSame(this.endMoment, 'day')){
      this.isMultiDay = true;
    }

    if (this.background && !this.text_color) {
      this.text_color = negate(this.background);
    }
    if (this.text_color && !this.background) {
      this.background = negate(this.text_color);
    }
    if (this.background) {
      this.borderColor = darken(this.background, 0.2);
    }
  }

  clone(): CalendarEvent {
    return new CalendarEvent(this.rawEvent, this.timezone);
  }

  /**
   *
   */
  generateId(): string {
    return Math.floor(100000000 + Math.random() * 900000000) + '';
  }
}

export default CalendarEvent;
