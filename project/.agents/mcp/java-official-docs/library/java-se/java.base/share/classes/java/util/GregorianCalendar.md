---
title: "GregorianCalendar class (java.util) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/GregorianCalendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GregorianCalendar class (java.util)

```java
public class GregorianCalendar extends Calendar
```

`GregorianCalendar` is a concrete subclass of
`Calendar` and provides the standard calendar system
used by most of the world.

 `GregorianCalendar` is a hybrid calendar that
supports both the Julian and Gregorian calendar systems with the
support of a single discontinuity, which corresponds by default to
the Gregorian date when the Gregorian calendar was instituted
(October 15, 1582 in some countries, later in others).  The cutover
date may be changed by the caller by calling setGregorianChange().

Historically, in those countries which adopted the Gregorian calendar first,
October 4, 1582 (Julian) was thus followed by October 15, 1582 (Gregorian). This calendar models
this correctly.  Before the Gregorian cutover, `GregorianCalendar`
implements the Julian calendar.  The only difference between the Gregorian
and the Julian calendar is the leap year rule. The Julian calendar specifies
leap years every four years, whereas the Gregorian calendar omits century
years which are not divisible by 400.

`GregorianCalendar` implements *proleptic* Gregorian and
Julian calendars. That is, dates are computed by extrapolating the current
rules indefinitely far backward and forward in time. As a result,
`GregorianCalendar` may be used for all years to generate
meaningful and consistent results. However, dates obtained using
`GregorianCalendar` are historically accurate only from March 1, 4
AD onward, when modern Julian calendar rules were adopted.  Before this date,
leap year rules were applied irregularly, and before 45 BC the Julian
calendar did not even exist.

Prior to the institution of the Gregorian calendar, New Year's Day was
March 25. To avoid confusion, this calendar always uses January 1. A manual
adjustment may be made if desired for dates that are prior to the Gregorian
changeover and which fall between January 1 and March 24.

#### Week Of Year and Week Year

Values calculated for the WEEK_OF_YEAR field range from 1 to 53. The first week of a
calendar year is the earliest seven day period starting on getFirstDayOfWeek() that contains at
least getMinimalDaysInFirstWeek() days from that year. It thus depends
on the values of `getMinimalDaysInFirstWeek()`, `getFirstDayOfWeek()`, and the day of the week of January 1. Weeks
between week 1 of one year and week 1 of the following year
(exclusive) are numbered sequentially from 2 to 52 or 53 (except
for year(s) involved in the Julian-Gregorian transition).

The `getFirstDayOfWeek()` and `getMinimalDaysInFirstWeek()` values are initialized using
locale-dependent resources when constructing a `GregorianCalendar`. The week
determination is compatible with the ISO 8601 standard when `getFirstDayOfWeek()` is `MONDAY` and `getMinimalDaysInFirstWeek()` is 4, which values are used in locales
where the standard is preferred. These values can explicitly be set by
calling setFirstDayOfWeek() and
setMinimalDaysInFirstWeek().

A *week year* is in sync with a
`WEEK_OF_YEAR` cycle. All weeks between the first and last
weeks (inclusive) have the same *week year* value.
Therefore, the first and last days of a week year may have
different calendar year values.

For example, January 1, 1998 is a Thursday. If `getFirstDayOfWeek()` is `MONDAY` and `getMinimalDaysInFirstWeek()` is 4 (ISO 8601 standard compatible
setting), then week 1 of 1998 starts on December 29, 1997, and ends
on January 4, 1998. The week year is 1998 for the last three days
of calendar year 1997. If, however, `getFirstDayOfWeek()` is
`SUNDAY`, then week 1 of 1998 starts on January 4, 1998, and
ends on January 10, 1998; the first three days of 1998 then are
part of week 53 of 1997 and their week year is 1997.

#### Week Of Month

Values calculated for the `WEEK_OF_MONTH` field range from 0
to 6.  Week 1 of a month (the days with `WEEK_OF_MONTH =
1`) is the earliest set of at least
`getMinimalDaysInFirstWeek()` contiguous days in that month,
ending on the day before `getFirstDayOfWeek()`.  Unlike
week 1 of a year, week 1 of a month may be shorter than 7 days, need
not start on `getFirstDayOfWeek()`, and will not include days of
the previous month.  Days of a month before week 1 have a
`WEEK_OF_MONTH` of 0.

For example, if `getFirstDayOfWeek()` is `SUNDAY`
and `getMinimalDaysInFirstWeek()` is 4, then the first week of
January 1998 is Sunday, January 4 through Saturday, January 10.  These days
have a `WEEK_OF_MONTH` of 1.  Thursday, January 1 through
Saturday, January 3 have a `WEEK_OF_MONTH` of 0.  If
`getMinimalDaysInFirstWeek()` is changed to 3, then January 1
through January 3 have a `WEEK_OF_MONTH` of 1.

#### Default Fields Values

The `clear` method sets calendar field(s)
undefined. `GregorianCalendar` uses the following
default value for each calendar field if its value is undefined.

GregorianCalendar default field values

         Field

         Default Value

             `ERA`

             `AD`

             `YEAR`

             `1970`

             `MONTH`

             `JANUARY`

             `DAY_OF_MONTH`

             `1`

             `DAY_OF_WEEK`

             `the first day of week`

             `WEEK_OF_MONTH`

             `0`

             `DAY_OF_WEEK_IN_MONTH`

             `1`

             `AM_PM`

             `AM`

             `HOUR, HOUR_OF_DAY, MINUTE, SECOND, MILLISECOND`

             `0`

Default values are not applicable for the fields not listed above.

**Example:**

```java
// get the supported ids for GMT-08:00 (Pacific Standard Time)
String[] ids = TimeZone.getAvailableIDs(-8 * 60 * 60 * 1000);
// if no ids were returned, something is wrong. get out.
if (ids.length == 0)
    System.exit(0);

 // begin output
System.out.println("Current Time");

// create a Pacific Standard Time time zone
SimpleTimeZone pdt = new SimpleTimeZone(-8 * 60 * 60 * 1000, ids[0]);

// set up rules for Daylight Saving Time
pdt.setStartRule(Calendar.APRIL, 1, Calendar.SUNDAY, 2 * 60 * 60 * 1000);
pdt.setEndRule(Calendar.OCTOBER, -1, Calendar.SUNDAY, 2 * 60 * 60 * 1000);

// create a GregorianCalendar with the Pacific Daylight time zone
// and the current date and time
Calendar calendar = new GregorianCalendar(pdt);
Date trialTime = new Date();
calendar.setTime(trialTime);

// print out a bunch of interesting things
System.out.println("ERA: " + calendar.get(Calendar.ERA));
System.out.println("YEAR: " + calendar.get(Calendar.YEAR));
System.out.println("MONTH: " + calendar.get(Calendar.MONTH));
System.out.println("WEEK_OF_YEAR: " + calendar.get(Calendar.WEEK_OF_YEAR));
System.out.println("WEEK_OF_MONTH: " + calendar.get(Calendar.WEEK_OF_MONTH));
System.out.println("DATE: " + calendar.get(Calendar.DATE));
System.out.println("DAY_OF_MONTH: " + calendar.get(Calendar.DAY_OF_MONTH));
System.out.println("DAY_OF_YEAR: " + calendar.get(Calendar.DAY_OF_YEAR));
System.out.println("DAY_OF_WEEK: " + calendar.get(Calendar.DAY_OF_WEEK));
System.out.println("DAY_OF_WEEK_IN_MONTH: "
                   + calendar.get(Calendar.DAY_OF_WEEK_IN_MONTH));
System.out.println("AM_PM: " + calendar.get(Calendar.AM_PM));
System.out.println("HOUR: " + calendar.get(Calendar.HOUR));
System.out.println("HOUR_OF_DAY: " + calendar.get(Calendar.HOUR_OF_DAY));
System.out.println("MINUTE: " + calendar.get(Calendar.MINUTE));
System.out.println("SECOND: " + calendar.get(Calendar.SECOND));
System.out.println("MILLISECOND: " + calendar.get(Calendar.MILLISECOND));
System.out.println("ZONE_OFFSET: "
                   + (calendar.get(Calendar.ZONE_OFFSET)/(60*60*1000)));
System.out.println("DST_OFFSET: "
                   + (calendar.get(Calendar.DST_OFFSET)/(60*60*1000)));
System.out.println("Current Time, with hour reset to 3");
calendar.clear(Calendar.HOUR_OF_DAY); // so doesn't override
calendar.set(Calendar.HOUR, 3);
System.out.println("ERA: " + calendar.get(Calendar.ERA));
System.out.println("YEAR: " + calendar.get(Calendar.YEAR));
System.out.println("MONTH: " + calendar.get(Calendar.MONTH));
System.out.println("WEEK_OF_YEAR: " + calendar.get(Calendar.WEEK_OF_YEAR));
System.out.println("WEEK_OF_MONTH: " + calendar.get(Calendar.WEEK_OF_MONTH));
System.out.println("DATE: " + calendar.get(Calendar.DATE));
System.out.println("DAY_OF_MONTH: " + calendar.get(Calendar.DAY_OF_MONTH));
System.out.println("DAY_OF_YEAR: " + calendar.get(Calendar.DAY_OF_YEAR));
System.out.println("DAY_OF_WEEK: " + calendar.get(Calendar.DAY_OF_WEEK));
System.out.println("DAY_OF_WEEK_IN_MONTH: "
                   + calendar.get(Calendar.DAY_OF_WEEK_IN_MONTH));
System.out.println("AM_PM: " + calendar.get(Calendar.AM_PM));
System.out.println("HOUR: " + calendar.get(Calendar.HOUR));
System.out.println("HOUR_OF_DAY: " + calendar.get(Calendar.HOUR_OF_DAY));
System.out.println("MINUTE: " + calendar.get(Calendar.MINUTE));
System.out.println("SECOND: " + calendar.get(Calendar.SECOND));
System.out.println("MILLISECOND: " + calendar.get(Calendar.MILLISECOND));
System.out.println("ZONE_OFFSET: "
       + (calendar.get(Calendar.ZONE_OFFSET)/(60*60*1000))); // in hours
System.out.println("DST_OFFSET: "
       + (calendar.get(Calendar.DST_OFFSET)/(60*60*1000))); // in hours
```

**See also:** TimeZone

**Since:** 1.1

## GregorianCalendar.BC

```java
public static final int BC
```

Value of the `ERA` field indicating
the period before the common era (before Christ), also known as BCE.
The sequence of years at the transition from `BC` to `AD` is
..., 2 BC, 1 BC, 1 AD, 2 AD,...

**See also:** #ERA

## GregorianCalendar.AD

```java
public static final int AD
```

Value of the `ERA` field indicating
the common era (Anno Domini), also known as CE.
The sequence of years at the transition from `BC` to `AD` is
..., 2 BC, 1 BC, 1 AD, 2 AD,...

**See also:** #ERA

## GregorianCalendar.GregorianCalendar()

```java
public GregorianCalendar()
```

Constructs a default `GregorianCalendar` using the current time
in the default time zone with the default
FORMAT locale.

## GregorianCalendar.GregorianCalendar(TimeZone)

```java
public GregorianCalendar(TimeZone zone)
```

Constructs a `GregorianCalendar` based on the current time
in the given time zone with the default
FORMAT locale.

Parameters:

- `zone`: the given time zone.

Throws:

- `NullPointerException`: if `zone` is `null`

## GregorianCalendar.GregorianCalendar(Locale)

```java
public GregorianCalendar(Locale aLocale)
```

Constructs a `GregorianCalendar` based on the current time
in the default time zone with the given locale.

Parameters:

- `aLocale`: the given locale.

Throws:

- `NullPointerException`: if `aLocale` is `null`

## GregorianCalendar.GregorianCalendar(TimeZone, Locale)

```java
public GregorianCalendar(TimeZone zone, Locale aLocale)
```

Constructs a `GregorianCalendar` based on the current time
in the given time zone with the given locale.

Parameters:

- `zone`: the given time zone.
- `aLocale`: the given locale.

Throws:

- `NullPointerException`: if `zone` or `aLocale` is `null`

## GregorianCalendar.GregorianCalendar(int, int, int)

```java
public GregorianCalendar(int year, int month, int dayOfMonth)
```

Constructs a `GregorianCalendar` with the given date set
in the default time zone with the default locale.

Parameters:

- `year`: the value used to set the `YEAR` calendar field in the calendar.
- `month`: the value used to set the `MONTH` calendar field in the calendar. Month value is 0-based. e.g., 0 for January.
- `dayOfMonth`: the value used to set the `DAY_OF_MONTH` calendar field in the calendar.

## GregorianCalendar.GregorianCalendar(int, int, int, int, int)

```java
public GregorianCalendar(int year, int month, int dayOfMonth, int hourOfDay, int minute)
```

Constructs a `GregorianCalendar` with the given date
and time set for the default time zone with the default locale.

Parameters:

- `year`: the value used to set the `YEAR` calendar field in the calendar.
- `month`: the value used to set the `MONTH` calendar field in the calendar. Month value is 0-based. e.g., 0 for January.
- `dayOfMonth`: the value used to set the `DAY_OF_MONTH` calendar field in the calendar.
- `hourOfDay`: the value used to set the `HOUR_OF_DAY` calendar field in the calendar.
- `minute`: the value used to set the `MINUTE` calendar field in the calendar.

## GregorianCalendar.GregorianCalendar(int, int, int, int, int, int)

```java
public GregorianCalendar(int year, int month, int dayOfMonth, int hourOfDay, int minute, int second)
```

Constructs a GregorianCalendar with the given date
and time set for the default time zone with the default locale.

Parameters:

- `year`: the value used to set the `YEAR` calendar field in the calendar.
- `month`: the value used to set the `MONTH` calendar field in the calendar. Month value is 0-based. e.g., 0 for January.
- `dayOfMonth`: the value used to set the `DAY_OF_MONTH` calendar field in the calendar.
- `hourOfDay`: the value used to set the `HOUR_OF_DAY` calendar field in the calendar.
- `minute`: the value used to set the `MINUTE` calendar field in the calendar.
- `second`: the value used to set the `SECOND` calendar field in the calendar.

## GregorianCalendar.setGregorianChange(Date)

```java
public void setGregorianChange(Date date)
```

Sets the `GregorianCalendar` change date. This is the point when the switch
from Julian dates to Gregorian dates occurred. Default is October 15,
1582 (Gregorian). Previous to this, dates will be in the Julian calendar.

To obtain a pure Julian calendar, set the change date to
`Date(Long.MAX_VALUE)`.  To obtain a pure Gregorian calendar,
set the change date to `Date(Long.MIN_VALUE)`.

Parameters:

- `date`: the given Gregorian cutover date.

## GregorianCalendar.getGregorianChange()

```java
public final Date getGregorianChange()
```

Gets the Gregorian Calendar change date.  This is the point when the
switch from Julian dates to Gregorian dates occurred. Default is
October 15, 1582 (Gregorian). Previous to this, dates will be in the Julian
calendar.

**Returns:** the Gregorian cutover date for this `GregorianCalendar` object.

## GregorianCalendar.isLeapYear(int)

```java
public boolean isLeapYear(int year)
```

Determines if the given year is a leap year. Returns `true` if
the given year is a leap year. To specify BC year numbers,
`1 - year number` must be given. For example, year BC 4 is
specified as -3.

Parameters:

- `year`: the given year.

**Returns:** `true` if the given year is a leap year; `false` otherwise.

## GregorianCalendar.getCalendarType()

```java
public String getCalendarType()
```

Returns `"gregory"` as the calendar type.

**Returns:** `"gregory"`

**Since:** 1.8
