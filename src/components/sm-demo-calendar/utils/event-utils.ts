import moment, {Moment} from 'moment-timezone';

const INTERNAL_DATE: string = 'YYYY-MM-DD';
export const CONTEXT_DATE: string = '2019-11-06';

function generateId() {
  return Math.floor(100000000 + Math.random() * 900000000) + '';
}

export function getEvent(title: string, description: string, start: string, end: string, text_color: string = '', background: string = '') {
  return{
    id: generateId(),
    start,
    end,
    background,
    description,
    text_color,
    title
  };
}

function generateEvents(contextMoment: Moment) {
  const plus1Moment: Moment = contextMoment.clone().add(1, 'day').startOf('day');
  //const minus2Moment: Moment = contextMoment.clone().add(-2, 'day').startOf('day');
  const minus7Moment: Moment = contextMoment.clone().add(-7, 'day').startOf('day');

  const plus2Moment: Moment = contextMoment.clone().add(2, 'day').startOf('day');
  const plus7Moment: Moment = contextMoment.clone().add(7, 'day').startOf('day');

  const contextDateEvents: Array<object> = [
    getEvent('event-1', 'sample description', contextMoment.format(INTERNAL_DATE) + ' 08:00:00', contextMoment.format(INTERNAL_DATE) + ' 10:00:00')
  ];

  const plus1DateEvents: Array<object> = [
    getEvent('event-2', 'sample description', plus1Moment.format(INTERNAL_DATE) + ' 08:00:00', plus1Moment.format(INTERNAL_DATE) + ' 10:00:00')
  ];

  const multiDayEvents: Array<object> = [
    getEvent('multi day event-4', 'sample description', minus7Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#d2e7e3'),
    getEvent('multi day event-5', 'sample description', plus2Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#e9e1f1'),

    getEvent('multi day event-6', 'sample description', minus7Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#f3d9d2'),
    getEvent('multi day event-7', 'sample description', plus2Moment.format(INTERNAL_DATE) + ' 08:00:00', plus7Moment.format(INTERNAL_DATE) + ' 10:00:00', '', '#FFECB3')
  ];

  const events: Array<object> = [
    ...contextDateEvents,
    ...plus1DateEvents,
    ...multiDayEvents
  ];
  return events;
}

export function getEvents() {
  const contextMoment: Moment = moment(CONTEXT_DATE, INTERNAL_DATE);
  return generateEvents(contextMoment);
}
