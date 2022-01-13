# JSS-Date

JSS-date is a multi-calendar, lightweight and rich JavaScript library for parsing, validating, manipulating, formatting, and displaying dates and times for all the Javascript runtime environments (NodeJS, browser, ...). It supports many calendars and you can easily convert DateTimes between different calendars and time zones.

## Main Features
- Multi-Calendar  
  JSS-Date supports supports any calendars. currently we have implemented Gregorian, Hijri and Persian calendars and we plan to implement more calendars in the future. you can easily implement your own calendars.

  - Calendar Independent
    - The (core) library is not dependent on any specific calendar. you can create DateTime objects with different Calendar objects.
  - Extensible
    - Calendars, locales and zones can be extended.
    - You can easily implement your own calendars, locales and zones by just inheriting from a base class and implementing a few abstract methods.
  - With 4 Pre-implemented calendars
    - Gregorian (implemented by using JavaScript Date object)
    - Gregorian2
    - Islamic (Hijri)
    - Persian
    - (More calendars will be added in the future ...)
  - Accurate
    - See our tests in github (soon)
  - Wide Date range support
    - Gregorian2, Persian and Islamic(Hijri) calendars support dates from 1/1/1 to 9999/12/30
- Localization support
  - Intl-API based locales
  - File based locales (soon)
- Timezone support
  - Intl-API based timezones
  - File based timezones (soon)
- Immutable
  - All objects (DateTime, Calendar, Locale, Zone, Duration) are immutable.
- Treeshakable
  - All calendars, locales, zones and plugins are tree-shakable. you only import things you need into your project.
- Lightweight
  - Core library size is around 15KB minified (5KB minified and Gzipped)
- NodeJS and browser support


## Installation command

```node
npm install @js-sugar/date
```

## How it works

Import the calendars you need in your project, instantiate and add them to the Calendars collection. You have to add at least one calendar to the Calendars collection.

Add the following code at the starting point of your application:

```
import { DateTime, Calendars } from '@js-sugar/date';
import { GregorianCalendar }  from '@js-sugar/date/calendars/gregorian';
import { HijriCalendar }  from '@js-sugar/date/calendars/hijri';
import { PersianCalendar }  from '@js-sugar/date/calendars/persian';

// Add the calendars you need in your project
Calendars.add(new GregorianCalendar('gregorian'));   
Calendars.add(new HijriCalendar('hijri'));   
Calendars.add(new PersianCalendar('persian'));   
```

> Note:  
>  the first calendar you add to the Calendars collection is set as the default calendar. You can change the default Calendar of your project at any time.

## DateTime Object
DateTime object is the main object of the JSS-Date library. It stores date and time values. While creating DateTime objects, you should provide following parameters:

- Calendar: A Calendar object (like Gregorian, Hijri, ...)
- Zone: A Zone object (like UTC, local zone , ...)
- Locale: A Locale object like(en-US, ar-AE, ...)

> Note:  
> If you don't provide above parameters to the DateTime constructor, default values will be used:
> - Default calendar: The first calendar you add to the Calendars collection.
> - Default Locale: System locale.
> - Default Zone: local time-zone.

## Examples
Following examples show you how to create DateTime objects with different Calendars, Locales and zones. In all examples of this documentation, we suppose that you have added following calendars to your project:
```
Calendars.add(new GregorianCalendar('gregorian'));   
Calendars.add(new HijriCalendar('hijri'));   
Calendars.add(new PersianCalendar('persian'));   
```

#### Example 1:  
Create a DateTime with default Calendar, Zone and Locale
```
// 
const d = new DateTime(); // now
```

#### Example 2:  
Create DateTime objects by providing a calendar:
```
import { DateTime, Calendars } from '@js-sugar/date';

const d1 = new DateTime({calendar: 'gregorian'});
const d2 = new DateTime({calendar: 'hijri'}); 
const d3 = new DateTime({calendar: Calendars.find('persian')}); 

console.log(d1.year, d1.month, d1.day);
console.log(d2.year, d2.month, d2.day);
console.log(d3.year, d3.month, d3.day);

// output (something like this):
2022 01 13
1443 06 10
1400 10 23
```

#### Example 3:
Create a DateTime with specific units (by using default calendar, zone and locale):
```
const d1 = new DateTime(2021, 10);
// year: 2021,
// month: 10, 
// day: 1, 
// hour = minute = second = ms: 0

const d2 = new DateTime(2021, 10, 28, 14, 56, 45, 122);
// year: 2021, 
// month: 10, 
// day: 28,
// hour: 14,
// minute: 56
// second: 45,
// ms (millisecond): 122
```

#### Example 4: 
Create DateTimes with specific date/time units and a specific calendar:
```
const d1 = new DateTime(2021, 10, 28, 14, 56, 45, 122, {calendar: 'gregorian'});
// year: 2021,
// month: 10,
// ...
// ms (millisecond): 122,
// calendar: [a calendar in Calendars collection with id 'gregorian']

// If you don't want to set all date-time units and also you want to set some options(calendar, zone, locale), pass options as first argument:
const d2 = new DateTime({calendar: 'gregorian'} , 2021, 10);
// year: 2021, 
// month: 10,
// day: 1,
// hour = minute = second = ms: 0
```

#### Example 5:
Create a DateTime with specific calendar, locale and time-zones:
```
const d1 = new DateTime({zone: Zones.utc}, 2021, 10);
// year: 2021, month: 10, day: 1 
// hour = minute = second = ms: 0
// calendar: default calendar
// zone: UTC
// locale: default locale

const d2 = new DateTime(1400, 10, 23, {
  calendar: 'persian'
  zone: Zones.local, 
});
// year: 2021, month: 10, day: 23 
// hour = minute = second = ms: 0
// calendar: a calendar with id 'persian'
// zone: local time zone (an instance of LocalZone object)
// locale: default locale

const d3 = new DateTime({
  calendar: Calendars.find('hijri'),
  zone: Zones.iana('Asia/Dubai'), 
}, 1443, 06, 10);
// year: 1443, month: 06, day: 10
// hour = minute = second = ms: 0
// calendar: a calendar with id 'hijri'
// zone: Asia/Dubai IANA time-zone (a RuntimeIANAZone object)
// locale: default locale

const d4 = new DateTime({
  calendar: 'gregorian2'
  zone: Zones.iana('Asia/Dubai'),
  locale: 'ar'
}, 2022, 1, 10);
// year: 2021, month: 1, day: 10
// hour = minute = second = ms: 0
// calendar: a calendar with id 'gregorian2'
// zone: Asia/Dubai IANA time-zone (a RuntimeIANAZone object)
// locale: ar (arabic) locale
```


> Note:   
> DateTime object is immutable.   
> After creating a DateTime object, you cannot change it. In other words, you cannot change it's date-time units, calendar, zone or locale.

## Calendars
A Calendar is an object that does date-time calculations in a specific calendaring system. DateTime object doesn't know anything about this calculations. it just delegate the calculations to a Calendar object.  
We have implemented 4 calendars so far:  
- GregorianCalendar
- Gregorian2Calendar
- HijriCalendar
- PersianCalendar

You can easily implement your own Calendar by just inheriting from Calendar class and implementing a few abstract methods.  
The first calendar you add to the Calendars collection is set as the default calendar. If you create a DateTime object and don't provide a value for the calendar parameter, the default calendar of application is used as the calendar of that DateTime object.  
You can set the default calendar of the project at any time:  

```
import { Calendars } from '@js-sugar/date';

const hc = Calendars.find('hijri');
Calendars.default = hc;
```

### Convert Calendars
With JSS-Date library you can easily convert the calendar of a DateTime object:

```
// Create a Gregorian date
const d1 = new DateTime({calendar: 'gregorian'}, 2021, 10, 26);
console.log(d1.year, d1.month, d1.day) //-> 2021, 10, 26

// Convert Gregorian to Persian date
const d2 = gregorianDate.to('persian');
console.log(d2.year, d2.month, d2.day) //-> 1400, 8, 4

// Convert Persian to Hijri date
const d3 = d2.to('hijri');
console.log(d3.year, d3.month, d3.day) //-> 1443, 3, 19
```

## Time zones
A time zone is a region of the Earth that has adopted the same standard time, usually referred to as the local time. Most adjacent time zones are exactly one hour apart, and by convention compute their local time as an offset from Greenwich Mean Time (see also UTC).
The Zones object is responsible for creating Zone objects. Generally there are 3 different Zone objects in JSS-Date library:
- FixedZone: a Zone with fixed offset, like UTC
- LocalZone: local time zone (system dependent)
- IanaZone: a standard IANA time-zone, like "Europe/London"

You can create Zone objects by using static methods of Zones class:

```
import { Calendars } from '@js-sugar/date';

// Create a FixedZone (name: 'my_zone', offset: +03:30)
zone1 = Zones.fixed('my_zone', 3, 30);

// UTC zone (a FixedZone with zero offset)
zone2 = Zones.utc;

// LocalZone
zone3 = Zones.local;

// Create an IANAZone
zone4 = Zones.iana('Asia/Istanbul');

// Create a DateTime with a specific zone
const d = new DateTime({ zone: zone4 });
```

It's easy to convert(change) the time-zone of DateTime objects:
```
const d = new DateTime({ zone: Zones.utc }, 2022, 1, 1, 12);
console.log(d.hour, d1.minute, d.second); // output: 12, 0, 0

const d2 = d.toZone('Asia/Tehran');
console.log(d2.hour, d2.minute, d2.second); // output: 3, 30, 0

const d3 = d.toZone('Europe/Luxembourg');
console.log(d2.hour, d2.minute, d2.second); // output: 1, 0, 0
```

Note that toZone() method returns a new DateTime object and doesn't change the zone of the object.

## DateTime constructor
DateTime constructor has several overloads:
```
DateTime();
DateTime(opts);
DateTime(year, month, day?, hour?, minute?, second?, ms?, opts?);
DateTime(opts, year, month, day?, hour?, minute?, second?, ms?);
DateTime(timestamp, opts?);

// Parameters with a question mark(?) are optional.
```
options ("opts" parameter) is an object with three optional properties:
- calendar: a Calendar object or the unique ID of a Calendar object.
- zone: a Zone object or an IANA time-zone name.
- locale: a Locale object or the ID of a Locale object.

## Calculations
```
const dt = new DateTime( { calendar: 'gregorian' }, 2020,1,1);
const dt2 = dt.add({ day: 1 });
console.log(dt2.year, dt2.month, dt2.day); //-> 2020, 1, 2

const dt = new DateTime({ calendar: 'persian'}, 1400,1,1 );
const dt2 = dt.subtract({ day: 1 });
console.log(dt2.year, dt2.month, dt2.day); //-> 1399, 12, 30
```

## Parse strings
You can parse strings by using parse plugin:
```
import { parse } from '@js-sugar/date/plugins/parse';

const d1 = parse('2012/2/6', 'Y/M/d');
console.log(d1.year, d1.month, d1.day) // output: 2012, 2, 6

const dt = parse("1400-10-23", "YYYY-MM-dd", {calendar: 'persian'});
console.log(dt.year, dt.month, dt.day) // output: 1400, 10, 23
```
For more information, see parse plugin documentation.

## Format dates
You can format dates by using format plugin:
```
import { format } from '@js-sugar/date/plugins/format';

const d1 = new DateTime(2001, 9, 8);
console.log(format(d1,'dd/MM/YYYY')) // output: '08/09/2001'
```

## Immutability
DateTime object is immutable. An immutable object means that the state of the object cannot change after its creation. In other words you cannot change date-time units, calendar, zone or locale.
```
const d1 = new DateTime();
const d2 = d1.add({ hour: 1});

d1.valueOf() === d2.valueOf(); // false
```
In this case, the add() method returns a new instance, leaving d1 unmodified.
