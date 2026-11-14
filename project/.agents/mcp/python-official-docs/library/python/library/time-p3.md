---
title: "time --- Time access and conversions (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/time.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# time --- Time access and conversions (part 3 of 4)

### `strftime(format[, time_tuple])`

Convert a tuple or `struct_time` representing a time as returned by
`gmtime()` or `localtime()` to a string as specified by the *format*
argument.  If *time_tuple* is not provided, the current time as returned by
`localtime()` is used.  *format* must be a string.  `ValueError` is
raised if any field in *time_tuple* is outside of the allowed range.

0 is a legal argument for any position in the time tuple; if it is normally
illegal the value is forced to a correct one.

The following directives can be embedded in the *format* string. They are shown
without the optional field width and precision specification, and are replaced
by the indicated characters in the `strftime()` result:

```text
+-----------+------------------------------------------------+-------+
| Directive | Meaning                                        | Notes |
+===========+================================================+=======+
| ``%a``    | Locale's abbreviated weekday name.             |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%A``    | Locale's full weekday name.                    |       |
+-----------+------------------------------------------------+-------+
| ``%b``    | Locale's abbreviated month name.               |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%B``    | Locale's full month name.                      |       |
+-----------+------------------------------------------------+-------+
| ``%c``    | Locale's appropriate date and time             |       |
|           | representation.                                |       |
+-----------+------------------------------------------------+-------+
| ``%d``    | Day of the month as a decimal number [01,31].  |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%f``    | Microseconds as a decimal number               | \(1)  |
|           |    [000000,999999].                            |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%H``    | Hour (24-hour clock) as a decimal number       |       |
|           | [00,23].                                       |       |
+-----------+------------------------------------------------+-------+
| ``%I``    | Hour (12-hour clock) as a decimal number       |       |
|           | [01,12].                                       |       |
+-----------+------------------------------------------------+-------+
| ``%j``    | Day of the year as a decimal number [001,366]. |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%m``    | Month as a decimal number [01,12].             |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%M``    | Minute as a decimal number [00,59].            |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%p``    | Locale's equivalent of either AM or PM.        | \(2)  |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%S``    | Second as a decimal number [00,61].            | \(3)  |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%U``    | Week number of the year (Sunday as the first   | \(4)  |
|           | day of the week) as a decimal number [00,53].  |       |
|           | All days in a new year preceding the first     |       |
|           | Sunday are considered to be in week 0.         |       |
|           |                                                |       |
|           |                                                |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%u``    | Day of the week (Monday is 1; Sunday is 7)     |       |
|           | as a decimal number [1, 7].                    |       |
+-----------+------------------------------------------------+-------+
| ``%w``    | Weekday as a decimal number [0(Sunday),6].     |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%W``    | Week number of the year (Monday as the first   | \(4)  |
|           | day of the week) as a decimal number [00,53].  |       |
|           | All days in a new year preceding the first     |       |
|           | Monday are considered to be in week 0.         |       |
|           |                                                |       |
|           |                                                |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%x``    | Locale's appropriate date representation.      |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%X``    | Locale's appropriate time representation.      |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%y``    | Year without century as a decimal number       |       |
|           | [00,99].                                       |       |
+-----------+------------------------------------------------+-------+
| ``%Y``    | Year with century as a decimal number.         |       |
|           |                                                |       |
+-----------+------------------------------------------------+-------+
| ``%z``    | Time zone offset indicating a positive or      |       |
|           | negative time difference from UTC/GMT of the   |       |
|           | form +HHMM or -HHMM, where H represents decimal|       |
|           | hour digits and M represents decimal minute    |       |
|           | digits [-23:59, +23:59]. [1]_                  |       |
+-----------+------------------------------------------------+-------+
| ``%Z``    | Time zone name (no characters if no time zone  |       |
|           | exists). Deprecated. [1]_                      |       |
+-----------+------------------------------------------------+-------+
| ``%G``    | ISO 8601 year (similar to ``%Y`` but follows   |       |
|           | the rules for the ISO 8601 calendar year).     |       |
|           | The year starts with the week that contains    |       |
|           | the first Thursday of the calendar year.       |       |
+-----------+------------------------------------------------+-------+
| ``%V``    | ISO 8601 week number (as a decimal number      |       |
|           | [01,53]). The first week of the year is the    |       |
|           | one that contains the first Thursday of the    |       |
|           | year. Weeks start on Monday.                   |       |
+-----------+------------------------------------------------+-------+
| ``%%``    | A literal ``'%'`` character.                   |       |
+-----------+------------------------------------------------+-------+
```

Notes:

(1)
The `%f` format directive only applies to `strptime()`,
not to `strftime()`. However, see also `datetime.datetime.strptime()` and
`datetime.datetime.strftime()` where the `%f` format directive
applies to microseconds.

(2)
When used with the `strptime()` function, the `%p` directive only affects
the output hour field if the `%I` directive is used to parse the hour.

(3)
The range really is `0` to `61`; value `60` is valid in
timestamps representing leap seconds and value `61` is supported
for historical reasons.

(4)
When used with the `strptime()` function, `%U` and `%W` are only used in
calculations when the day of the week and the year are specified.

Here is an example, a format for dates compatible with that specified  in the
RFC 5322 Internet email standard.:

```
>>> from time import gmtime, strftime
>>> strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())
'Thu, 28 Jun 2001 14:17:15 +0000'
```

Additional directives may be supported on certain platforms, but only the
ones listed here have a meaning standardized by ANSI C.  To see the full set
of format codes supported on your platform, consult the strftime(3)
documentation.

On some platforms, an optional field width and precision specification can
immediately follow the initial `'%'` of a directive in the following order;
this is also not portable. The field width is normally 2 except for `%j` where
it is 3.

### `strptime(string[, format])`

Parse a string representing a time according to a format.  The return value
is a `struct_time` as returned by `gmtime()` or
`localtime()`.

The *format* parameter uses the same directives as those used by
`strftime()`; it defaults to `"%a %b %d %H:%M:%S %Y"` which matches the
formatting returned by `ctime()`. If *string* cannot be parsed according
to *format*, or if it has excess data after parsing, `ValueError` is
raised. The default values used to fill in any missing data when more
accurate values cannot be inferred are `(1900, 1, 1, 0, 0, 0, 0, 1, -1)`.
Both *string* and *format* must be strings.

For example:

```python
>>> import time
>>> time.strptime("30 Nov 00", "%d %b %y")   # doctest: +NORMALIZE_WHITESPACE
time.struct_time(tm_year=2000, tm_mon=11, tm_mday=30, tm_hour=0, tm_min=0,
```

tm_sec=0, tm_wday=3, tm_yday=335, tm_isdst=-1)

Support for the `%Z` directive is based on the values contained in `tzname`
and whether `daylight` is true.  Because of this, it is platform-specific
except for recognizing UTC and GMT which are always known (and are considered to
be non-daylight savings timezones).

Only the directives specified in the documentation are supported.  Because
`strftime()` is implemented per platform it can sometimes offer more
directives than those listed.  But `strptime()` is independent of any platform
and thus does not necessarily support all directives available that are not
documented as supported.

### class `struct_time`

The type of the time value sequence returned by `gmtime()`,
`localtime()`, and `strptime()`.  It is an object with a :term:`named
tuple` interface: values can be accessed by index and by attribute name.  The
following values are present:

- - Index
- Attribute
- Values

- - 0
- .. attribute:: tm_year
- (for example, 1993)

- - 1
- .. attribute:: tm_mon
- range [1, 12]

- - 2
- .. attribute:: tm_mday
- range [1, 31]

- - 3
- .. attribute:: tm_hour
- range [0, 23]

- - 4
- .. attribute:: tm_min
- range [0, 59]

- - 5
- .. attribute:: tm_sec
- range [0, 61]; see Note (2) in `strftime()`

- - 6
- .. attribute:: tm_wday
- range [0, 6]; Monday is 0

- - 7
- .. attribute:: tm_yday
- range [1, 366]

- - 8
- .. attribute:: tm_isdst
- 0, 1 or -1; see below

- - N/A
- .. attribute:: tm_zone
- abbreviation of timezone name

- - N/A
- .. attribute:: tm_gmtoff
- offset east of UTC in seconds

Note that unlike the C structure, the month value is a range of [1, 12], not
[0, 11].

In calls to `mktime()`, `tm_isdst` may be set to 1 when daylight
savings time is in effect, and 0 when it is not.  A value of -1 indicates that
this is not known, and will usually result in the correct state being filled in.

When a tuple with an incorrect length is passed to a function expecting a
`struct_time`, or having elements of the wrong type, a
`TypeError` is raised.

### `time() -> float`

Return the time in seconds since the epoch_ as a floating-point
number. The handling of leap seconds is platform dependent.
On Windows and most Unix systems, the leap seconds are not counted towards
the time in seconds since the epoch_. This is commonly referred to as `Unix
time <https://en.wikipedia.org/wiki/Unix_time>`_.

Note that even though the time is always returned as a floating-point
number, not all systems provide time with a better precision than 1 second.
While this function normally returns non-decreasing values, it can return a
lower value than a previous call if the system clock has been set back
between the two calls.

The number returned by `.time()` may be converted into a more common
time format (i.e. year, month, day, hour, etc...) in UTC by passing it to
`gmtime()` function or in local time by passing it to the
`localtime()` function. In both cases a
`struct_time` object is returned, from which the components
of the calendar date may be accessed as attributes.

Clock:

- On Windows, call `GetSystemTimePreciseAsFileTime()`.
- Call `clock_gettime(CLOCK_REALTIME)` if available.
- Otherwise, call `gettimeofday()`.

Use `time_ns()` to avoid the precision loss caused by the `float`
type.

> *Changed in version 3.13.*
> On Windows, calls `GetSystemTimePreciseAsFileTime()` instead of
> `GetSystemTimeAsFileTime()`.

### `time_ns() -> int`

Similar to `time()` but returns time as an integer number of
nanoseconds since the epoch_.

> *Added in version 3.7.*

### `thread_time() -> float`

Return the value (in fractional seconds) of the sum of the system and user
CPU time of the current thread.  It does not include time elapsed during
sleep.  It is thread-specific by definition.  The reference point of the
returned value is undefined, so that only the difference between the results
of two calls in the same thread is valid.

Use `thread_time_ns()` to avoid the precision loss caused by the
`float` type.

> **Availability:** Linux, Unix, Windows.
>
> Unix systems supporting `CLOCK_THREAD_CPUTIME_ID`.

> *Added in version 3.7.*

### `thread_time_ns() -> int`

Similar to `thread_time()` but return time as nanoseconds.

> *Added in version 3.7.*
