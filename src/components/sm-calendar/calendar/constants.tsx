import {INTERFACE_VIEW_LABELS, INTERFACE_VIEWS, INTERFACE_WEEK_DAYS, INTERFACE_INTERNAL_FORMAT} from "./interface";

export const WEEK_DAYS: INTERFACE_WEEK_DAYS = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

export const VIEWS: INTERFACE_VIEWS = {
  day: 'day',
  week: 'week',
  month: 'month'
};

export const VIEW_LABELS: INTERFACE_VIEW_LABELS = {
  day: 'Day',
  week: 'Week',
  month: 'Month'
};

export const INTERNAL_FORMAT: INTERFACE_INTERNAL_FORMAT = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATE_TIME: 'YYYY-MM-DD HH:mm:ss',
  DISPLAY_TIME: 'HH:mm'
};

export const INTERNAL_DATE_TIME_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

export const EVENTS = {
  VIEW_CHANGE: 'viewChange',
  EVENT_CLICK: 'eventClick'
};
