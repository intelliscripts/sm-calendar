import moment, {Moment} from 'moment-timezone';

const TIMEZONE = 'GMT';
const INTERNAL_DATE = 'YYYY-MM-DD';

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
  const plus1Moment: Moment = contextMoment.clone().add(1, 'day').startOf('day');

  const contextDateEvents: Array<object> = [
    getEvent('event-1', 'sample description', contextMoment.format(INTERNAL_DATE) + ' 08:00:00', contextMoment.format(INTERNAL_DATE) + ' 10:00:00')
  ];

  const plus1DateEvents: Array<object> = [
    getEvent('event-2', 'sample description', plus1Moment.format(INTERNAL_DATE) + ' 08:00:00', plus1Moment.format(INTERNAL_DATE) + ' 10:00:00')
  ];

  const events: Array<object> = [
    ...contextDateEvents,
    ...plus1DateEvents
  ];
  return events;
}

export function getEvents() {
  const contextMoment: Moment = moment().tz(TIMEZONE);
  return generateEvents(contextMoment);
}
