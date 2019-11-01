interface WEEK_DAYS {
  sun: number;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number
}

export const WEEK_DAYS: WEEK_DAYS = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
};

interface VIEWS {
  day: string,
  week: string,
  month: string
}

export const VIEWS: VIEWS = {
  day: 'day',
  week: 'week',
  month: 'month'
};

interface VIEW_LABELS {
  day: string,
  week: string,
  month: string
}

export const VIEW_LABELS: VIEW_LABELS = {
  day: 'Day',
  week: 'Week',
  month: 'Month'
};
