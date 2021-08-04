# JS-Sugar Date Library

JS-Sugar Date is a multi-calendar (calendar independent), extensible, immutable, tree-shakable and lightweight date-time library for javascript.

## Main Features

- Multi-Calendar
  - Calendar independent
    - The library is not dependent to any specefic calendar
  - Extensible
    - Easily add your own calendar by inheriting from a base class and implementing a few abstract methods.
  - Pre-implemented calendars
    - Gregorian (2 implementations)
    - Islamic
    - Persian
    - (More calendars will be added in the future)
  - Widerange support
  - Accurate
    - See our tests at github (soon)
- Localization support 
  - Intl-API based locales
  - File based locales (soon)
- Timezone support
  - Intl-API based timezones
  - File based timezones (soon)
- Immutable
  - All objects (DateTime, Calendar, Locale, Zone, Duration) are immutable.
- Extensible
  - Easily extend calendars, locales and zones
- Treeshakable
  - Core library size is around 15KB minified (5KB Gzipped). All calendars, locales, zones and plugins are tree-shakable. you only import things you need in your project.
- Lightweight
  - Again, Core library size is around 5KB (minified, Gzipped).
- Node.js and browser support

## Installation
```node
npm install @js-sugar/date
```

## Basic Usage
Using JS-Sugar Date is easy, just import calendars you need in your project, instantiate them and add them to Calendars collection. you are done! now you can create DateTime objects.

```
import { DateTime, Calendars } from '@js-sugar/date';
import { GregorianCalendar } = from '@js-sugar/date/calendars/gregorian';
import { PersianCalendar } = from '@js-sugar/date/calendars/persian';

// Instantiate and add the calendars you need in your project.
// Do it just once and application-wide.
// You can add multiple instances of a Calendar to the Calendars collection.
// Every calendar object must have a unique ID.

Calendars.add(new GregorianCalendar('gregorian')); 
Calendars.add(new PersianCalendar('persian'));

// Done! Now you are ready to use the library in your project.
```

## Create
Creating a DateTime object is easy. every DateTime object has three "required" parts:

- Calendar: like Gregorian, Hijri, Persian, ...
- Zone: An time-zone like UTC, America/New_York, ...
- Locale: like ar-AE, en-US, de-DE

if you don't specify these values, default values will be used.


```
// Somewhere in your application
// Create a DateTime object with default Calendar, Zone and Locale
const d = new DateTime(); 
console.log(d.year, d.month, d.day);
```

- Default calendar: The first calendar you add to Calendars collection (you can change it later).
- Default Locale: System locale (you can change it).
- Default Zone: System local time-zone (you can change it).

```
// Create a DateTime object with a specific Calendar, Zone and Locale
const d = new DateTime({
  calendar: Calendars.find('persian'),
  zone: Zones.utc,
  locale: Locales.resolve('fa-IR')
}); 

console.log(d.year, d.month, d.day);
```

> Note:  
DateTime object is immutable. after creating a DateTime object, you can not change it.

