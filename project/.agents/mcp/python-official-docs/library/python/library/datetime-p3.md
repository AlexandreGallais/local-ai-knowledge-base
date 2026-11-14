---
title: "datetime --- Basic date and time types (part 3 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 3 of 10)

## `date` objects

A `date` object represents a date (year, month and day) in an idealized
calendar, the current Gregorian calendar indefinitely extended in both
directions.

January 1 of year 1 is called day number 1, January 2 of year 1 is
called day number 2, and so on.

### class `date(year, month, day)`

All arguments are required. Arguments must be integers, in the following
ranges:

- `MINYEAR <= year <= MAXYEAR`
- `1 <= month <= 12`
- `1 <= day <= number of days in the given month and year`

If an argument outside those ranges is given, `ValueError` is raised.

Other constructors, all class methods:

### classmethod `date.today()`

Return the current local date.

This is equivalent to `date.fromtimestamp(time.time())`.

### classmethod `date.fromtimestamp(timestamp)`

Return the local date corresponding to the POSIX *timestamp*, such as is
returned by `time.time()`.

This may raise `OverflowError`, if the timestamp is out
of the range of values supported by the platform C `localtime`
function, and `OSError` on `localtime` failure.
It's common for this to be restricted to years from 1970 through 2038. Note
that on non-POSIX systems that include leap seconds in their notion of a
timestamp, leap seconds are ignored by `fromtimestamp()`.

> *Changed in version 3.3.*
> Raise `OverflowError` instead of `ValueError` if the timestamp
> is out of the range of values supported by the platform C
> `localtime` function. Raise `OSError` instead of
> `ValueError` on `localtime` failure.

> *Changed in version 3.15.*
> Accepts any real number as *timestamp*, not only integer or float.

### classmethod `date.fromordinal(ordinal)`

Return the date corresponding to the proleptic Gregorian *ordinal*, where
January 1 of year 1 has ordinal 1.

`ValueError` is raised unless ``1 <= ordinal <=
date.max.toordinal()`. For any date `d``,
`date.fromordinal(d.toordinal()) == d`.

### classmethod `date.fromisoformat(date_string)`

Return a `date` corresponding to a *date_string* given in any valid
ISO 8601 format, with the following exceptions:

1. Reduced precision dates are not currently supported (`YYYY-MM`,
`YYYY`).
1. Extended date representations are not currently supported
(`±YYYYYY-MM-DD`).
1. Ordinal dates are not currently supported (`YYYY-OOO`).

Examples:

```
>>> import datetime as dt
>>> dt.date.fromisoformat('2019-12-04')
datetime.date(2019, 12, 4)
>>> dt.date.fromisoformat('20191204')
datetime.date(2019, 12, 4)
>>> dt.date.fromisoformat('2021-W01-1')
datetime.date(2021, 1, 4)
```

> *Added in version 3.7.*

> *Changed in version 3.11.*
> Previously, this method only supported the format `YYYY-MM-DD`.

### classmethod `date.fromisocalendar(year, week, day)`

Return a `date` corresponding to the ISO calendar date specified by
*year*, *week* and *day*. This is the inverse of the function `date.isocalendar()`.

> *Added in version 3.8.*

### classmethod `date.strptime(date_string, format)`

Return a `.date` corresponding to *date_string*, parsed according to
*format*. This is equivalent to:

```
date(*(time.strptime(date_string, format)[0:3]))
```

`ValueError` is raised if the date_string and format
can't be parsed by `time.strptime()` or if it returns a value which isn't a
time tuple.  See also strftime-strptime-behavior and
`date.fromisoformat()`.

> **Note:** If *format* specifies a day of month (`%d`) without a year,
> `ValueError` is raised.  This is to avoid a quadrennial
> leap year bug in code seeking to parse only a month and day as the
> default year used in absence of one in the format is not a leap year.
> The workaround is to always include a year in your *format*.  If parsing
> *date_string* values that do not have a year, explicitly add a year that
> is a leap year before parsing:
>
>
> ```python
>
> >>> import datetime as dt
> >>> date_string = "02/29"
> >>> when = dt.date.strptime(f"{date_string};1984", "%m/%d;%Y")  # Avoids leap year bug.
> >>> when.strftime("%B %d")  # doctest: +SKIP
> 'February 29'
> ```
>

> *Added in version 3.14.*

Class attributes:

### `date.min`

The earliest representable date, `date(MINYEAR, 1, 1)`.

### `date.max`

The latest representable date, `date(MAXYEAR, 12, 31)`.

### `date.resolution`

The smallest possible difference between non-equal date objects,
`timedelta(days=1)`.

Instance attributes (read-only):

### `date.year`

Between `MINYEAR` and `MAXYEAR` inclusive.

### `date.month`

Between 1 and 12 inclusive.

### `date.day`

Between 1 and the number of days in the given month of the given year.

Supported operations:

```text
+-------------------------------+----------------------------------------------+
| Operation                     | Result                                       |
+===============================+==============================================+
| ``date2 = date1 + timedelta`` | ``date2`` will be ``timedelta.days`` days    |
|                               | after ``date1``. (1)                         |
+-------------------------------+----------------------------------------------+
| ``date2 = date1 - timedelta`` | Computes ``date2`` such that ``date2 +       |
|                               | timedelta == date1``. (2)                    |
+-------------------------------+----------------------------------------------+
| ``timedelta = date1 - date2`` | \(3)                                         |
+-------------------------------+----------------------------------------------+
| | ``date1 == date2``          | Equality comparison. (4)                     |
| | ``date1 != date2``          |                                              |
+-------------------------------+----------------------------------------------+
| | ``date1 < date2``           | Order comparison. (5)                        |
| | ``date1 > date2``           |                                              |
| | ``date1 <= date2``          |                                              |
| | ``date1 >= date2``          |                                              |
+-------------------------------+----------------------------------------------+
```

Notes:

(1)
*date2* is moved forward in time if `timedelta.days > 0`, or backward if
`timedelta.days < 0`. Afterward `date2 - date1 == timedelta.days`.
`timedelta.seconds` and `timedelta.microseconds` are ignored.
`OverflowError` is raised if `date2.year` would be smaller than
`MINYEAR` or larger than `MAXYEAR`.

(2)
`timedelta.seconds` and `timedelta.microseconds` are ignored.

(3)
This is exact, and cannot overflow. `timedelta.seconds` and
`timedelta.microseconds` are 0, and `date2 + timedelta == date1` after.

(4)
`date` objects are equal if they represent the same date.

`date` objects that are not also `.datetime` instances
are never equal to `datetime` objects, even if they represent
the same date.

(5)
*date1* is considered less than *date2* when *date1* precedes *date2* in time.
In other words, `date1 < date2` if and only if ``date1.toordinal() <
date2.toordinal()``.

Order comparison between a `date` object that is not also a
`.datetime` instance and a `datetime` object raises
`TypeError`.

> *Changed in version 3.13.*
> Comparison between `.datetime` object and an instance of
> the `date` subclass that is not a `datetime` subclass
> no longer converts the latter to `date`, ignoring the time part
> and the time zone.
> The default behavior can be changed by overriding the special comparison
> methods in subclasses.

In Boolean contexts, all `date` objects are considered to be true.

Instance methods:

### `date.replace(year=self.year, month=self.month, day=self.day)`

Return a new `date` object with the same values, but with specified
parameters updated.

Example:

```
>>> import datetime as dt
>>> d = dt.date(2002, 12, 31)
>>> d.replace(day=26)
datetime.date(2002, 12, 26)
```

The generic function `copy.replace()` also supports `date`
objects.

### `date.timetuple()`

Return a `time.struct_time` such as returned by `time.localtime()`.

The hours, minutes and seconds are 0, and the DST flag is -1.

`d.timetuple()` is equivalent to:

```
time.struct_time((d.year, d.month, d.day, 0, 0, 0, d.weekday(), yday, -1))
```

where `yday = d.toordinal() - date(d.year, 1, 1).toordinal() + 1`
is the day number within the current year starting with 1 for January 1st.

### `date.toordinal()`

Return the proleptic Gregorian ordinal of the date, where January 1 of year 1
has ordinal 1. For any `date` object `d`,
`date.fromordinal(d.toordinal()) == d`.

### `date.weekday()`

Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
For example, `date(2002, 12, 4).weekday() == 2`, a Wednesday. See also
`isoweekday()`.

### `date.isoweekday()`

Return the day of the week as an integer, where Monday is 1 and Sunday is 7.
For example, `date(2002, 12, 4).isoweekday() == 3`, a Wednesday. See also
`weekday()`, `isocalendar()`.

### `date.isocalendar()`

Return a named tuple object with three components: `year`,
`week` and `weekday`.

The ISO calendar is a widely used variant of the Gregorian calendar.

The ISO year consists of 52 or 53 full weeks, and where a week starts on a
Monday and ends on a Sunday. The first week of an ISO year is the first
(Gregorian) calendar week of a year containing a Thursday. This is called week
number 1, and the ISO year of that Thursday is the same as its Gregorian year.

For example, 2004 begins on a Thursday, so the first week of ISO year 2004
begins on Monday, 29 Dec 2003 and ends on Sunday, 4 Jan 2004:

```
>>> import datetime as dt
>>> dt.date(2003, 12, 29).isocalendar()
datetime.IsoCalendarDate(year=2004, week=1, weekday=1)
>>> dt.date(2004, 1, 4).isocalendar()
datetime.IsoCalendarDate(year=2004, week=1, weekday=7)
```

> *Changed in version 3.9.*
> Result changed from a tuple to a named tuple.

### `date.isoformat()`

Return a string representing the date in ISO 8601 format, `YYYY-MM-DD`:

```
>>> import datetime as dt
>>> dt.date(2002, 12, 4).isoformat()
'2002-12-04'
```

### `date.__str__()`

For a date `d`, `str(d)` is equivalent to `d.isoformat()`.

### `date.ctime()`

Return a string representing the date:

```
>>> import datetime as dt
>>> dt.date(2002, 12, 4).ctime()
'Wed Dec  4 00:00:00 2002'
```

`d.ctime()` is equivalent to:

```
time.ctime(time.mktime(d.timetuple()))
```

on platforms where the native C
`ctime` function (which `time.ctime()` invokes, but which
`date.ctime()` does not invoke) conforms to the C standard.

### `date.strftime(format)`

Return a string representing the date, controlled by an explicit format string.
Format codes referring to hours, minutes or seconds will see 0 values.
See also strftime-strptime-behavior and `date.isoformat()`.

### `date.__format__(format)`

Same as `.date.strftime()`. This makes it possible to specify a format
string for a `.date` object in :ref:`formatted string
literals <f-strings>` and when using `str.format()`.
See also strftime-strptime-behavior and `date.isoformat()`.

### Examples of usage: `date`

Example of counting days to an event:

```
>>> import time
>>> import datetime as dt
>>> today = dt.date.today()
>>> today
datetime.date(2007, 12, 5)
>>> today == dt.date.fromtimestamp(time.time())
True
>>> my_birthday = dt.date(today.year, 6, 24)
>>> if my_birthday < today:
...     my_birthday = my_birthday.replace(year=today.year + 1)
...
>>> my_birthday
datetime.date(2008, 6, 24)
>>> time_to_birthday = abs(my_birthday - today)
>>> time_to_birthday.days
202
```

More examples of working with `date`:

```python

>>> import datetime as dt
>>> d = dt.date.fromordinal(730920) # 730920th day after 1. 1. 0001
>>> d
datetime.date(2002, 3, 11)

>>> # Methods related to formatting string output
>>> d.isoformat()
'2002-03-11'
>>> d.strftime("%d/%m/%y")
'11/03/02'
>>> d.strftime("%A %d. %B %Y")
'Monday 11. March 2002'
>>> d.ctime()
'Mon Mar 11 00:00:00 2002'
>>> 'The {1} is {0:%d}, the {2} is {0:%B}.'.format(d, "day", "month")
'The day is 11, the month is March.'

>>> # Methods for extracting 'components' under different calendars
>>> t = d.timetuple()
>>> for i in t:     # doctest: +SKIP
...     print(i)
2002                # year
3                   # month
11                  # day
0
0
0
0                   # weekday (0 = Monday)
70                  # 70th day in the year
-1
>>> ic = d.isocalendar()
>>> for i in ic:    # doctest: +SKIP
...     print(i)
2002                # ISO year
11                  # ISO week number
1                   # ISO day number ( 1 = Monday )

>>> # A date object is immutable; all operations produce a new object
>>> d.replace(year=2005)
datetime.date(2005, 3, 11)
```
