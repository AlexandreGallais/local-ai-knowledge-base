---
title: "datetime --- Basic date and time types (part 4 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 4 of 10)

## `datetime` objects

A `.datetime` object is a single object containing all the information
from a `date` object and a `.time` object.

Like a `date` object, `.datetime` assumes the current Gregorian
calendar extended in both directions; like a `.time` object,
`datetime` assumes there are exactly 3600*24 seconds in every day.

Constructor:

### class `datetime(year, month, day, hour=0, minute=0, second=0, microsecond=0, tzinfo=None, *, fold=0)`

The *year*, *month* and *day* arguments are required. *tzinfo* may be `None`, or an
instance of a `tzinfo` subclass. The remaining arguments must be integers
in the following ranges:

- `MINYEAR <= year <= MAXYEAR`,
- `1 <= month <= 12`,
- `1 <= day <= number of days in the given month and year`,
- `0 <= hour < 24`,
- `0 <= minute < 60`,
- `0 <= second < 60`,
- `0 <= microsecond < 1000000`,
- `fold in [0, 1]`.

If an argument outside those ranges is given, `ValueError` is raised.

> *Changed in version 3.6.*
> Added the *fold* parameter.

Other constructors, all class methods:

### classmethod `datetime.today()`

Return the current local date and time, with `.tzinfo` `None`.

Equivalent to:

```
datetime.fromtimestamp(time.time())
```

See also `now()`, `fromtimestamp()`.

This method is functionally equivalent to `now()`, but without a
`tz` parameter.

### classmethod `datetime.now(tz=None)`

Return the current local date and time.

If optional argument *tz* is `None`
or not specified, this is like `today()`, but, if possible, supplies more
precision than can be gotten from going through a `time.time()` timestamp
(for example, this may be possible on platforms supplying the C
`gettimeofday` function).

If *tz* is not `None`, it must be an instance of a `tzinfo` subclass,
and the current date and time are converted to *tz*’s time zone.

This function is preferred over `today()` and `utcnow()`.

> **Note:** Subsequent calls to `datetime.now()` may return the same
> instant depending on the precision of the underlying clock.

### classmethod `datetime.utcnow()`

Return the current UTC date and time, with `.tzinfo` `None`.

This is like `now()`, but returns the current UTC date and time, as a naive
`.datetime` object. An aware current UTC datetime can be obtained by
calling `datetime.now(timezone.utc)`. See also `now()`.

> **Warning:** Because naive `datetime` objects are treated by many `datetime` methods
> as local times, it is preferred to use aware datetimes to represent times
> in UTC. As such, the recommended way to create an object representing the
> current time in UTC is by calling `datetime.now(timezone.utc)`.

> *Deprecated since version 3.12.*
> Use `datetime.now()` with `UTC` instead.

### classmethod `datetime.fromtimestamp(timestamp, tz=None)`

Return the local date and time corresponding to the POSIX timestamp, such as is
returned by `time.time()`. If optional argument *tz* is `None` or not
specified, the timestamp is converted to the platform's local date and time, and
the returned `.datetime` object is naive.

If *tz* is not `None`, it must be an instance of a `tzinfo` subclass, and the
timestamp is converted to *tz*’s time zone.

`fromtimestamp()` may raise `OverflowError`, if the timestamp is out of
the range of values supported by the platform C `localtime` or
`gmtime` functions, and `OSError` on `localtime` or
`gmtime` failure.
It's common for this to be restricted to years in
1970 through 2038. Note that on non-POSIX systems that include leap seconds in
their notion of a timestamp, leap seconds are ignored by `fromtimestamp()`,
and then it's possible to have two timestamps differing by a second that yield
identical `.datetime` objects. This method is preferred over
`utcfromtimestamp()`.

> *Changed in version 3.3.*
> Raise `OverflowError` instead of `ValueError` if the timestamp
> is out of the range of values supported by the platform C
> `localtime` or `gmtime` functions. Raise `OSError`
> instead of `ValueError` on `localtime` or `gmtime`
> failure.

> *Changed in version 3.6.*
> `fromtimestamp()` may return instances with `.fold` set to 1.

> *Changed in version 3.15.*
> Accepts any real number as *timestamp*, not only integer or float.

### classmethod `datetime.utcfromtimestamp(timestamp)`

Return the UTC `.datetime` corresponding to the POSIX timestamp, with
`.tzinfo` `None`.  (The resulting object is naive.)

This may raise `OverflowError`, if the timestamp is
out of the range of values supported by the platform C `gmtime` function,
and `OSError` on `gmtime` failure.
It's common for this to be restricted to years in 1970 through 2038.

To get an aware `.datetime` object, call `fromtimestamp()`:

```
datetime.fromtimestamp(timestamp, timezone.utc)
```

On the POSIX compliant platforms, it is equivalent to the following
expression:

```
datetime(1970, 1, 1, tzinfo=timezone.utc) + timedelta(seconds=timestamp)
```

except the latter formula always supports the full years range: between
`MINYEAR` and `MAXYEAR` inclusive.

> **Warning:** Because naive `datetime` objects are treated by many `datetime` methods
> as local times, it is preferred to use aware datetimes to represent times
> in UTC. As such, the recommended way to create an object representing a
> specific timestamp in UTC is by calling
> `datetime.fromtimestamp(timestamp, tz=timezone.utc)`.

> *Changed in version 3.3.*
> Raise `OverflowError` instead of `ValueError` if the timestamp
> is out of the range of values supported by the platform C
> `gmtime` function. Raise `OSError` instead of
> `ValueError` on `gmtime` failure.

> *Changed in version 3.15.*
> Accepts any real number as *timestamp*, not only integer or float.

> *Deprecated since version 3.12.*
> Use `datetime.fromtimestamp()` with `UTC` instead.

### classmethod `datetime.fromordinal(ordinal)`

Return the `.datetime` corresponding to the proleptic Gregorian ordinal,
where January 1 of year 1 has ordinal 1. `ValueError` is raised unless
`1 <= ordinal <= datetime.max.toordinal()`. The hour, minute, second and
microsecond of the result are all 0, and `.tzinfo` is `None`.

### classmethod `datetime.combine(date, time, tzinfo=time.tzinfo)`

Return a new `.datetime` object whose date components are equal to the
given `date` object's, and whose time components
are equal to the given `.time` object's. If the *tzinfo*
argument is provided, its value is used to set the `.tzinfo` attribute
of the result, otherwise the `tzinfo` attribute of the *time* argument
is used.  If the *date* argument is a `datetime` object, its time components
and `.tzinfo` attributes are ignored.

For any `.datetime` object `d`,
`d == datetime.combine(d.date(), d.time(), d.tzinfo)`.

> *Changed in version 3.6.*
> Added the *tzinfo* argument.

### classmethod `datetime.fromisoformat(date_string)`

Return a `.datetime` corresponding to a *date_string* in any valid
ISO 8601 format, with the following exceptions:

1. Time zone offsets may have fractional seconds.
1. The `T` separator may be replaced by any single unicode character.
1. Fractional hours and minutes are not supported.
1. Reduced precision dates are not currently supported (`YYYY-MM`,
`YYYY`).
1. Extended date representations are not currently supported
(`±YYYYYY-MM-DD`).
1. Ordinal dates are not currently supported (`YYYY-OOO`).

Examples:

```
>>> import datetime as dt
>>> dt.datetime.fromisoformat('2011-11-04')
datetime.datetime(2011, 11, 4, 0, 0)
>>> dt.datetime.fromisoformat('20111104')
datetime.datetime(2011, 11, 4, 0, 0)
>>> dt.datetime.fromisoformat('2011-11-04T00:05:23')
datetime.datetime(2011, 11, 4, 0, 5, 23)
>>> dt.datetime.fromisoformat('2011-11-04T00:05:23Z')
datetime.datetime(2011, 11, 4, 0, 5, 23, tzinfo=datetime.timezone.utc)
>>> dt.datetime.fromisoformat('20111104T000523')
datetime.datetime(2011, 11, 4, 0, 5, 23)
>>> dt.datetime.fromisoformat('2011-W01-2T00:05:23.283')
datetime.datetime(2011, 1, 4, 0, 5, 23, 283000)
>>> dt.datetime.fromisoformat('2011-11-04 00:05:23.283')
datetime.datetime(2011, 11, 4, 0, 5, 23, 283000)
>>> dt.datetime.fromisoformat('2011-11-04 00:05:23.283+00:00')
datetime.datetime(2011, 11, 4, 0, 5, 23, 283000, tzinfo=datetime.timezone.utc)
>>> dt.datetime.fromisoformat('2011-11-04T00:05:23+04:00')   # doctest: +NORMALIZE_WHITESPACE
datetime.datetime(2011, 11, 4, 0, 5, 23,
    tzinfo=datetime.timezone(datetime.timedelta(seconds=14400)))
```

> *Added in version 3.7.*

> *Changed in version 3.11.*
> Previously, this method only supported formats that could be emitted by
> `date.isoformat()` or `datetime.isoformat()`.

### classmethod `datetime.fromisocalendar(year, week, day)`

Return a `.datetime` corresponding to the ISO calendar date specified
by *year*, *week* and *day*. The non-date components of the datetime are populated
with their normal default values. This is the inverse of the function
`datetime.isocalendar()`.

> *Added in version 3.8.*

### classmethod `datetime.strptime(date_string, format)`

Return a `.datetime` corresponding to *date_string*, parsed according to
*format*.

If *format* does not contain microseconds or time zone information, this is equivalent to:

```
datetime(*(time.strptime(date_string, format)[0:6]))
```

`ValueError` is raised if the date_string and format
can't be parsed by `time.strptime()` or if it returns a value which isn't a
time tuple.  See also strftime-strptime-behavior and
`datetime.fromisoformat()`.

> *Changed in version 3.15.*
> If *format* specifies a day of month (`%d`) without a year,
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
> >>> when = dt.datetime.strptime(f"{date_string};1984", "%m/%d;%Y")  # Avoids leap year bug.
> >>> when.strftime("%B %d")  # doctest: +SKIP
> 'February 29'
> ```
>

Class attributes:

### `datetime.min`

The earliest representable `.datetime`, ``datetime(MINYEAR, 1, 1,
tzinfo=None)``.

### `datetime.max`

The latest representable `.datetime`, ``datetime(MAXYEAR, 12, 31, 23, 59,
59, 999999, tzinfo=None)``.

### `datetime.resolution`

The smallest possible difference between non-equal `.datetime` objects,
`timedelta(microseconds=1)`.

Instance attributes (read-only):

### `datetime.year`

Between `MINYEAR` and `MAXYEAR` inclusive.

### `datetime.month`

Between 1 and 12 inclusive.

### `datetime.day`

Between 1 and the number of days in the given month of the given year.

### `datetime.hour`

In `range(24)`.

### `datetime.minute`

In `range(60)`.

### `datetime.second`

In `range(60)`.

### `datetime.microsecond`

In `range(1000000)`.

### `datetime.tzinfo`

The object passed as the *tzinfo* argument to the `.datetime` constructor,
or `None` if none was passed.
