import moment, {Moment} from 'moment-timezone';

const TIMEZONE = 'GMT';
const INTERNAL_DATE = 'YYYY-MM-YY';

function getEvent(title: string, description: string, start: string, end: string, text_color: string = '#fff', bg_color: string = 'orange') {
  return{
    start,
    end,
    bg_color,
    description,
    text_color,
    title
  };
}

function generateEvents(contextMoment: Moment) {

  const contextDatEvents: Array<object> = [
    getEvent('event-1', 'sample description', contextMoment.format(INTERNAL_DATE) + ' 08:00:00', contextMoment.format(INTERNAL_DATE) + ' 10:00:00')
  ];

  const events: Array<object> = [
    ...contextDatEvents
  ];
  return events;
}

export function getEvents() {
  const contextMoment: Moment = moment().tz(TIMEZONE);
  return generateEvents(contextMoment);
}
