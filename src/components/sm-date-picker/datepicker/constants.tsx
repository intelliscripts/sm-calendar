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

interface PICKER_VIEWS {
  DAY: string;
  MONTH: string;
  YEAR: string;
}

export const PICKER_VIEWS: PICKER_VIEWS = {
  DAY: 'DAY',
  MONTH: 'MONTH',
  YEAR: 'YEAR'
};

export const INTERNAL_DATE: string = 'YYYY-MM-DD';
