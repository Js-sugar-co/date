const { DateTime, Calendars } = require('@js-sugar/date');
const { GregorianCalendar } = require('@js-sugar/date/calendars/gregorian');

Calendars.add(new GregorianCalendar('gregorian'));
const d = new DateTime();
console.log(d.year, d.month, d.day);