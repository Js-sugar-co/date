# JS-Sugar Date Library

JS-Sugar Date is a multi-calendar (calendar independent), extensible, immutable, tree-shakable and lightweight date-time library for javascript. It supports all Javascript environments (Node.js, browser, ...)

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
  - Widerange date support
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
  - Core library size is around 15KB minified (5KB minified and Gzipped). All calendars, locales, zones and plugins are tree-shakable. you only import things you need into your project.
- Lightweight
  - Again, Core library size is around 5KB (minified, Gzipped).
- Node.js and browser support


## Add JS-Sugar to your project
Use npm to instal js-sugar package in your project:
```node
npm install @js-sugar/date
```

Using JS-Sugar Date is easy, just import calendars you need in your project, instantiate them and add them to Calendars collection. you are done! now you can create DateTime objects.

```
import { DateTime, Calendars } from '@js-sugar/date';
import { GregorianCalendar } = from '@js-sugar/date/calendars/gregorian';
import { PersianCalendar } = from '@js-sugar/date/calendars/persian';

// Instantiate the calendars you need and add them to the Calendars collection. do it just once (application-wide).

// 'gregorian' is the ID of the calendar
Calendars.add(new GregorianCalendar('gregorian')); 

// Add a PersianCalendar with id 'persian' to Calendars collection
Calendars.add(new PersianCalendar('persian'));
```

The first calendar that you add to your project, becomes 'default' calendar. you can change default calendar of your project later. when you create a DateTime object and don't sepecify the calendar of it, default calendar of your project is used as the calendar of that DateTime object.

## Basic Usage
Creating a DateTime object is easy. every DateTime object has three "required" parts:

- Calendar: like Gregorian, Hijri, Persian, ...
- Zone: An time-zone like UTC, America/New_York, ...
- Locale: like ar-AE, en-US, de-DE

if you don't specify these values, default values will be used.


#### Example: Create a DateTime with default Calendar, Zone and Locale:
```
const d = new DateTime(); // now
```

- Default calendar: The first calendar you add to Calendars collection (you can change it).
- Default Locale: System locale (you can change it).
- Default Zone: System local time-zone (you can change it).


#### Example: Create a DateTime with specific units (default calendar):
```
const d1 = new DateTime(2021, 10); 
// year:2021, month:10, day:1, hour=minute=second=millisecond:0

const d2 = new DateTime(2021, 10, 28, 14, 56, 45, 122); 
// year:2021, month:10, day:28, hour:14, minute: 56 second: 45, millisecond:122
```

#### Example: Create DateTimes with specific date/time units and a specific calendar:  
```
const d1 = new DateTime(2021, 10, 28, 14, 56, 45, 122, {calendar: 'gregorian'}); 
// year:2021, month:10, ..., millisecond:122, calendar: [a calendar in Calendars collection with id 'gregorian']

// If you don't want to set all date/time units and also you want to set some options(calendar, zone, locale), pass options object as first argument:
const d2 = new DateTime({calendar: 'gregorian'} , 2021, 10);
// year:2021, month:10, day:1, hour=minute=second=millisecond:0
```


> Note:  
DateTime object is immutable. after creating a DateTime object, you cannot change it(you can not change its date/time units, calendar, zone or locale).

## DateTime constructor overloads
DateTime constructor has several overloads:

```
DateTime();
DateTime(opts);
DateTime(year, month, day?, hour?, minute?, second?, ms?, opts?);
DateTime(opts, year, month, day?, hour?, minute?, second?, ms?);
DateTime(timestamp, opts?);

// Parameters with a question mark(?) are optional.
```

options ("opts" parameter) is an object with three optional fields:
- calendar: a Calendar object or the ID of a Calendar object,  
- zone: a Zone object or the ID of a Zone object,  
- locale: a Locale object or the ID of a Locale object,  

## Working with calendars
You can add multiple calendars to your project. you create Calendar objects and add them to Calendars collection. you should do this in the start-up of your project. The first Calendar you add to Calendars collection becomes default Calendar of your project(you can change it).

```
// In start-up of your project
Calendars.add(new GregorianCalendar('gregorian')); 
Calendars.add(new PersianCalendar('persian'));
Calendars.add(new HijriCalendar('hijri', 1)); // calendar constructors can accept some configuration parameters.

// 
// somewhere in your code ...

// find a Calendar by ID
const hijriCalendar = Calendars.find('hijri'); 

// Change the default calendar of your project
Calendars.default = hijriCalendar;
```

When you creat a DateTime object, if you don't specify the calendar, the default calendar of your project is used:

```
// From the previous example, default calendar is a HijriCalendar object.
const d1 = new DateTime();
console.log(d1.calendar.id); // hijri
```

If you want to create a DateTime object with a specific calendar, you should specify it:
```

// Specify calendar by ID
const d1 = new DateTime({calendar: 'hijri'}); // 'hijri' is the ID of a calendar in the Calendars collection

// Alternatively, you can pass a refrence to a Calendar object
const d2 = new DateTime({calendar: hijriCalendar}); 
```

Changing the calendar of a date object is super easy. just use 'to()' method of DateTime object.

```
const d1 = new DateTime({calendar: 'gregorian'}, 2021, 10, 25);
const d2 = d1.to('persian');
console.log(d2.year, d2.month, d2.day) // 1400, 8, 3
```
