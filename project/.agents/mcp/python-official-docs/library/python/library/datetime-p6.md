---
title: "datetime --- Basic date and time types (part 6 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 6 of 10)

### `datetime.ctime()`

Return a string representing the date and time:

```
>>> import datetime as dt
>>> dt.datetime(2002, 12, 4, 20, 30, 40).ctime()
'Wed Dec  4 20:30:40 2002'
```

The output string will *not* include time zone information, regardless
of whether the input is aware or naive.

`d.ctime()` is equivalent to:

```
time.ctime(time.mktime(d.timetuple()))
```

on platforms where the native C `ctime` function
(which `time.ctime()` invokes, but which
`datetime.ctime()` does not invoke) conforms to the C standard.

### `datetime.strftime(format)`

Return a string representing the date and time,
controlled by an explicit format string.
See also strftime-strptime-behavior and `datetime.isoformat()`.

### `datetime.__format__(format)`

Same as `.datetime.strftime()`. This makes it possible to specify a format
string for a `.datetime` object in :ref:`formatted string
literals <f-strings>` and when using `str.format()`.
See also strftime-strptime-behavior and `datetime.isoformat()`.

### Examples of usage: `datetime`

Examples of working with `.datetime` objects:

```python

>>> import datetime as dt

>>> # Using datetime.combine()
>>> d = dt.date(2005, 7, 14)
>>> t = dt.time(12, 30)
>>> dt.datetime.combine(d, t)
datetime.datetime(2005, 7, 14, 12, 30)

>>> # Using datetime.now()
>>> dt.datetime.now()   # doctest: +SKIP
datetime.datetime(2007, 12, 6, 16, 29, 43, 79043)   # GMT +1
>>> dt.datetime.now(dt.timezone.utc)   # doctest: +SKIP
datetime.datetime(2007, 12, 6, 15, 29, 43, 79060, tzinfo=datetime.timezone.utc)

>>> # Using datetime.strptime()
>>> my_datetime = dt.datetime.strptime("21/11/06 16:30", "%d/%m/%y %H:%M")
>>> my_datetime
datetime.datetime(2006, 11, 21, 16, 30)

>>> # Using datetime.timetuple() to get tuple of all attributes
>>> tt = my_datetime.timetuple()
>>> for it in tt:   # doctest: +SKIP
...     print(it)
...
2006    # year
11      # month
21      # day
16      # hour
30      # minute
0       # second
1       # weekday (0 = Monday)
325     # number of days since 1st January
-1      # dst - method tzinfo.dst() returned None

>>> # Date in ISO format
>>> ic = my_datetime.isocalendar()
>>> for it in ic:   # doctest: +SKIP
...     print(it)
...
2006    # ISO year
47      # ISO week
2       # ISO weekday

>>> # Formatting a datetime
>>> my_datetime.strftime("%A, %d. %B %Y %I:%M%p")
'Tuesday, 21. November 2006 04:30PM'
>>> 'The {1} is {0:%d}, the {2} is {0:%B}, the {3} is {0:%I:%M%p}.'.format(my_datetime, "day", "month", "time")
'The day is 21, the month is November, the time is 04:30PM.'
```

The example below defines a `tzinfo` subclass capturing time zone
information for Kabul, Afghanistan, which used +4 UTC until 1945
and then +4:30 UTC thereafter:

```
import datetime as dt

class KabulTz(dt.tzinfo):
    # Kabul used +4 until 1945, when they moved to +4:30
    UTC_MOVE_DATE = dt.datetime(1944, 12, 31, 20, tzinfo=dt.timezone.utc)

    def utcoffset(self, when):
        if when.year < 1945:
            return dt.timedelta(hours=4)
        elif (1945, 1, 1, 0, 0) <= when.timetuple()[:5] < (1945, 1, 1, 0, 30):
            # An ambiguous ("imaginary") half-hour range representing
            # a 'fold' in time due to the shift from +4 to +4:30.
            # If when falls in the imaginary range, use fold to decide how
            # to resolve. See PEP 495.
            return dt.timedelta(hours=4, minutes=(30 if when.fold else 0))
        else:
            return dt.timedelta(hours=4, minutes=30)

    def fromutc(self, when):
        # Follow same validations as in datetime.tzinfo
        if not isinstance(when, dt.datetime):
            raise TypeError("fromutc() requires a datetime argument")
        if when.tzinfo is not self:
            raise ValueError("when.tzinfo is not self")

        # A custom implementation is required for fromutc as
        # the input to this function is a datetime with utc values
        # but with a tzinfo set to self.
        # See datetime.astimezone or fromtimestamp.
        if when.replace(tzinfo=dt.timezone.utc) >= self.UTC_MOVE_DATE:
            return when + dt.timedelta(hours=4, minutes=30)
        else:
            return when + dt.timedelta(hours=4)

    def dst(self, when):
        # Kabul does not observe daylight saving time.
        return dt.timedelta(0)

    def tzname(self, when):
        if when >= self.UTC_MOVE_DATE:
            return "+04:30"
        return "+04"
```

Usage of `KabulTz` from above:

```
>>> tz1 = KabulTz()

>>> # Datetime before the change
>>> dt1 = dt.datetime(1900, 11, 21, 16, 30, tzinfo=tz1)
>>> print(dt1.utcoffset())
4:00:00

>>> # Datetime after the change
>>> dt2 = dt.datetime(2006, 6, 14, 13, 0, tzinfo=tz1)
>>> print(dt2.utcoffset())
4:30:00

>>> # Convert datetime to another time zone
>>> dt3 = dt2.astimezone(dt.timezone.utc)
>>> dt3
datetime.datetime(2006, 6, 14, 8, 30, tzinfo=datetime.timezone.utc)
>>> dt2
datetime.datetime(2006, 6, 14, 13, 0, tzinfo=KabulTz())
>>> dt2 == dt3
True
```

## `time` objects

A `.time` object represents a (local) time of day, independent of any particular
day, and subject to adjustment via a `tzinfo` object.

### class `time(hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)`

All arguments are optional. *tzinfo* may be `None`, or an instance of a
`tzinfo` subclass. The remaining arguments must be integers in the
following ranges:

- `0 <= hour < 24`,
- `0 <= minute < 60`,
- `0 <= second < 60`,
- `0 <= microsecond < 1000000`,
- `fold in [0, 1]`.

If an argument outside those ranges is given, `ValueError` is raised. All
default to 0 except *tzinfo*, which defaults to `None`.

Class attributes:

### `time.min`

The earliest representable `.time`, `time(0, 0, 0, 0)`.

### `time.max`

The latest representable `.time`, `time(23, 59, 59, 999999)`.

### `time.resolution`

The smallest possible difference between non-equal `.time` objects,
`timedelta(microseconds=1)`, although note that arithmetic on
`.time` objects is not supported.

Instance attributes (read-only):

### `time.hour`

In `range(24)`.

### `time.minute`

In `range(60)`.

### `time.second`

In `range(60)`.

### `time.microsecond`

In `range(1000000)`.

### `time.tzinfo`

The object passed as the tzinfo argument to the `.time` constructor, or
`None` if none was passed.

### `time.fold`

In `[0, 1]`. Used to disambiguate wall times during a repeated interval. (A
repeated interval occurs when clocks are rolled back at the end of daylight saving
time or when the UTC offset for the current zone is decreased for political reasons.)
The values 0 and 1 represent, respectively, the earlier and later of the two
moments with the same wall time representation.

> *Added in version 3.6.*

`.time` objects support equality and order comparisons,
where `a` is considered less than `b` when `a` precedes `b` in time.

Naive and aware `time` objects are never equal.
Order comparison between naive and aware `time` objects raises
`TypeError`.

If both comparands are aware, and have the same `tzinfo`
attribute, the `tzinfo` and `fold` attributes are
ignored and the base times are compared. If both comparands are aware and
have different `tzinfo` attributes, the comparands are first adjusted by
subtracting their UTC offsets (obtained from `self.utcoffset()`).

> *Changed in version 3.3.*
> Equality comparisons between aware and naive `.time` instances
> don't raise `TypeError`.

In Boolean contexts, a `.time` object is always considered to be true.

> *Changed in version 3.5.*
> Before Python 3.5, a `.time` object was considered to be false if it
> represented midnight in UTC. This behavior was considered obscure and
> error-prone and has been removed in Python 3.5. See 13936 for more
> information.

Other constructors:

### classmethod `time.fromisoformat(time_string)`

Return a `.time` corresponding to a *time_string* in any valid
ISO 8601 format, with the following exceptions:

1. Time zone offsets may have fractional seconds.
1. The leading `T`, normally required in cases where there may be ambiguity between
a date and a time, is not required.
1. Fractional seconds may have any number of digits (anything beyond 6 will
be truncated).
1. Fractional hours and minutes are not supported.

Examples:

```python

>>> import datetime as dt
>>> dt.time.fromisoformat('04:23:01')
datetime.time(4, 23, 1)
>>> dt.time.fromisoformat('T04:23:01')
datetime.time(4, 23, 1)
>>> dt.time.fromisoformat('T042301')
datetime.time(4, 23, 1)
>>> dt.time.fromisoformat('04:23:01.000384')
datetime.time(4, 23, 1, 384)
>>> dt.time.fromisoformat('04:23:01,000384')
datetime.time(4, 23, 1, 384)
>>> dt.time.fromisoformat('04:23:01+04:00')
datetime.time(4, 23, 1, tzinfo=datetime.timezone(datetime.timedelta(seconds=14400)))
>>> dt.time.fromisoformat('04:23:01Z')
datetime.time(4, 23, 1, tzinfo=datetime.timezone.utc)
>>> dt.time.fromisoformat('04:23:01+00:00')
datetime.time(4, 23, 1, tzinfo=datetime.timezone.utc)
```

> *Added in version 3.7.*

> *Changed in version 3.11.*
> Previously, this method only supported formats that could be emitted by
> `time.isoformat()`.

### classmethod `time.strptime(date_string, format)`

Return a `.time` corresponding to *date_string*, parsed according to
*format*.

If *format* does not contain microseconds or timezone information, this is equivalent to:

```
time(*(time.strptime(date_string, format)[3:6]))
```

`ValueError` is raised if the *date_string* and *format*
cannot be parsed by `time.strptime()` or if it returns a value which is not a
time tuple.  See also strftime-strptime-behavior and
`time.fromisoformat()`.

> *Added in version 3.14.*

Instance methods:

### `time.replace(hour=self.hour, minute=self.minute, second=self.second, \`

```python
microsecond=self.microsecond, tzinfo=self.tzinfo, *, fold=0)
```

Return a new `.time` with the same values, but with specified
parameters updated. Note that `tzinfo=None` can be specified to create a
naive `time` from an aware `time`, without conversion of the
time data.

`.time` objects are also supported by generic function
`copy.replace()`.

> *Changed in version 3.6.*
> Added the *fold* parameter.

### `time.isoformat(timespec='auto')`

Return a string representing the time in ISO 8601 format, one of:

- `HH:MM:SS.ffffff`, if `microsecond` is not 0
- `HH:MM:SS`, if `microsecond` is 0
- `HH:MM:SS.ffffff+HH:MM[:SS[.ffffff]]`, if `utcoffset()` does not return `None`
- `HH:MM:SS+HH:MM[:SS[.ffffff]]`, if `microsecond` is 0 and `utcoffset()` does not return `None`

The optional argument *timespec* specifies the number of additional
components of the time to include (the default is `'auto'`).
It can be one of the following:

- `'auto'`: Same as `'seconds'` if `microsecond` is 0,
same as `'microseconds'` otherwise.
- `'hours'`: Include the `hour` in the two-digit `HH` format.
- `'minutes'`: Include `hour` and `minute` in `HH:MM` format.
- `'seconds'`: Include `hour`, `minute`, and `second`
in `HH:MM:SS` format.
- `'milliseconds'`: Include full time, but truncate fractional second
part to milliseconds. `HH:MM:SS.sss` format.
- `'microseconds'`: Include full time in `HH:MM:SS.ffffff` format.

> **Note:** Excluded time components are truncated, not rounded.

`ValueError` will be raised on an invalid *timespec* argument.

Example:

```
>>> import datetime as dt
>>> dt.time(hour=12, minute=34, second=56, microsecond=123456).isoformat(timespec='minutes')
'12:34'
>>> my_time = dt.time(hour=12, minute=34, second=56, microsecond=0)
>>> my_time.isoformat(timespec='microseconds')
'12:34:56.000000'
>>> my_time.isoformat(timespec='auto')
'12:34:56'
```

> *Changed in version 3.6.*
> Added the *timespec* parameter.

### `time.__str__()`

For a time `t`, `str(t)` is equivalent to `t.isoformat()`.

### `time.strftime(format)`

Return a string representing the time, controlled by an explicit format
string.  See also strftime-strptime-behavior and `time.isoformat()`.

### `time.__format__(format)`

Same as `.time.strftime()`. This makes it possible to specify
a format string for a `.time` object in :ref:`formatted string
literals <f-strings>` and when using `str.format()`.
See also strftime-strptime-behavior and `time.isoformat()`.

### `time.utcoffset()`

If `.tzinfo` is `None`, returns `None`, else returns
`self.tzinfo.utcoffset(None)`, and raises an exception if the latter doesn't
return `None` or a `timedelta` object with magnitude less than one day.

> *Changed in version 3.7.*
> The UTC offset is not restricted to a whole number of minutes.

### `time.dst()`

If `.tzinfo` is `None`, returns `None`, else returns
`self.tzinfo.dst(None)`, and raises an exception if the latter doesn't return
`None`, or a `timedelta` object with magnitude less than one day.

> *Changed in version 3.7.*
> The DST offset is not restricted to a whole number of minutes.

### `time.tzname()`

If `.tzinfo` is `None`, returns `None`, else returns
`self.tzinfo.tzname(None)`, or raises an exception if the latter doesn't
return `None` or a string object.

### Examples of usage: `time`

Examples of working with a `.time` object:

```
>>> import datetime as dt
>>> class TZ1(dt.tzinfo):
...     def utcoffset(self, when):
...         return dt.timedelta(hours=1)
...     def dst(self, when):
...         return dt.timedelta(0)
...     def tzname(self, when):
...         return "+01:00"
...     def  __repr__(self):
...         return f"{self.__class__.__name__}()"
...
>>> t = dt.time(12, 10, 30, tzinfo=TZ1())
>>> t
datetime.time(12, 10, 30, tzinfo=TZ1())
>>> t.isoformat()
'12:10:30+01:00'
>>> t.dst()
datetime.timedelta(0)
>>> t.tzname()
'+01:00'
>>> t.strftime("%H:%M:%S %Z")
'12:10:30 +01:00'
>>> 'The {} is {:%H:%M}.'.format("time", t)
'The time is 12:10.'
```
