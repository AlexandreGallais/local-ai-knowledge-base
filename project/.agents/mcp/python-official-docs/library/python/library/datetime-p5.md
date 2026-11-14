---
title: "datetime --- Basic date and time types (part 5 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 5 of 10)

### `datetime.fold`

In `[0, 1]`. Used to disambiguate wall times during a repeated interval. (A
repeated interval occurs when clocks are rolled back at the end of daylight saving
time or when the UTC offset for the current zone is decreased for political reasons.)
The values 0 and 1 represent, respectively, the earlier and later of the two
moments with the same wall time representation.

> *Added in version 3.6.*

Supported operations:

```text
+---------------------------------------+--------------------------------+
| Operation                             | Result                         |
+=======================================+================================+
| ``datetime2 = datetime1 + timedelta`` | \(1)                           |
+---------------------------------------+--------------------------------+
| ``datetime2 = datetime1 - timedelta`` | \(2)                           |
+---------------------------------------+--------------------------------+
| ``timedelta = datetime1 - datetime2`` | \(3)                           |
+---------------------------------------+--------------------------------+
| | ``datetime1 == datetime2``          | Equality comparison. (4)       |
| | ``datetime1 != datetime2``          |                                |
+---------------------------------------+--------------------------------+
| | ``datetime1 < datetime2``           | Order comparison. (5)          |
| | ``datetime1 > datetime2``           |                                |
| | ``datetime1 <= datetime2``          |                                |
| | ``datetime1 >= datetime2``          |                                |
+---------------------------------------+--------------------------------+
```

(1)
`datetime2` is a duration of `timedelta` removed from `datetime1`, moving forward in
time if `timedelta.days > 0`, or backward if `timedelta.days < 0`. The
result has the same `tzinfo` attribute as the input datetime, and
`datetime2 - datetime1 == timedelta` after. `OverflowError` is raised if
`datetime2.year` would be smaller than `MINYEAR` or larger than
`MAXYEAR`. Note that no time zone adjustments are done even if the
input is an aware object.

(2)
Computes the `datetime2` such that `datetime2 + timedelta == datetime1`. As for
addition, the result has the same `tzinfo` attribute as the input
datetime, and no time zone adjustments are done even if the input is aware.

(3)
Subtraction of a `.datetime` from a `datetime` is defined only if
both operands are naive, or if both are aware. If one is aware and the other is
naive, `TypeError` is raised.

If both are naive, or both are aware and have the same `tzinfo` attribute,
the `tzinfo` attributes are ignored, and the result is a `timedelta`
object `t` such that `datetime2 + t == datetime1`. No time zone adjustments
are done in this case.

If both are aware and have different `tzinfo` attributes, `a-b` acts
as if `a` and `b` were first converted to naive UTC datetimes. The
result is ``(a.replace(tzinfo=None) - a.utcoffset()) - (b.replace(tzinfo=None)
- b.utcoffset())`` except that the implementation never overflows.

(4)
`.datetime` objects are equal if they represent the same date
and time, taking into account the time zone.

Naive and aware `.datetime` objects are never equal.

If both comparands are aware, and have the same `tzinfo` attribute,
the `tzinfo` and `fold` attributes are ignored and
the base datetimes are compared.
If both comparands are aware and have different `tzinfo`
attributes, the comparison acts as comparands were first converted to UTC
datetimes except that the implementation never overflows.
`.datetime` instances in a repeated interval are never equal to
`datetime` instances in other time zone.

(5)
*datetime1* is considered less than *datetime2* when *datetime1* precedes
*datetime2* in time, taking into account the time zone.

Order comparison between naive and aware `.datetime` objects
raises `TypeError`.

If both comparands are aware, and have the same `tzinfo` attribute,
the `tzinfo` and `fold` attributes are ignored and
the base datetimes are compared.
If both comparands are aware and have different `tzinfo`
attributes, the comparison acts as comparands were first converted to UTC
datetimes except that the implementation never overflows.

> *Changed in version 3.3.*
> Equality comparisons between aware and naive `.datetime`
> instances don't raise `TypeError`.

> *Changed in version 3.13.*
> Comparison between `.datetime` object and an instance of
> the `date` subclass that is not a `datetime` subclass
> no longer converts the latter to `date`, ignoring the time part
> and the time zone.
> The default behavior can be changed by overriding the special comparison
> methods in subclasses.

Instance methods:

### `datetime.date()`

Return `date` object with same year, month and day.

### `datetime.time()`

Return `.time` object with same hour, minute, second, microsecond and fold.
`.tzinfo` is `None`. See also method `timetz()`.

> *Changed in version 3.6.*
> The fold value is copied to the returned `.time` object.

### `datetime.timetz()`

Return `.time` object with same hour, minute, second, microsecond, fold, and
tzinfo attributes. See also method `time()`.

> *Changed in version 3.6.*
> The fold value is copied to the returned `.time` object.

### `datetime.replace(year=self.year, month=self.month, day=self.day, \`

```python
hour=self.hour, minute=self.minute, second=self.second, microsecond=self.microsecond, \
tzinfo=self.tzinfo, *, fold=0)
```

Return a new `datetime` object with the same attributes, but with
specified parameters updated. Note that `tzinfo=None` can be specified to
create a naive datetime from an aware datetime with no conversion of date
and time data.

`.datetime` objects are also supported by generic function
`copy.replace()`.

> *Changed in version 3.6.*
> Added the *fold* parameter.

### `datetime.astimezone(tz=None)`

Return a `.datetime` object with new `.tzinfo` attribute *tz*,
adjusting the date and time data so the result is the same UTC time as
*self*, but in *tz*'s local time.

If provided, *tz* must be an instance of a `tzinfo` subclass, and its
`utcoffset()` and `dst()` methods must not return `None`. If *self*
is naive, it is presumed to represent time in the system time zone.

If called without arguments (or with `tz=None`) the system local
time zone is assumed for the target time zone. The `.tzinfo` attribute of the converted
datetime instance will be set to an instance of `timezone`
with the zone name and offset obtained from the OS.

If `self.tzinfo` is *tz*, `self.astimezone(tz)` is equal to *self*:  no
adjustment of date or time data is performed. Else the result is local
time in the time zone *tz*, representing the same UTC time as *self*:  after
`astz = dt.astimezone(tz)`, `astz - astz.utcoffset()` will have
the same date and time data as `dt - dt.utcoffset()`.

If you merely want to attach a `timezone` object *tz* to a datetime *dt* without
adjustment of date and time data, use `dt.replace(tzinfo=tz)`. If you
merely want to remove the `timezone` object from an aware datetime *dt* without
conversion of date and time data, use `dt.replace(tzinfo=None)`.

Note that the default `tzinfo.fromutc()` method can be overridden in a
`tzinfo` subclass to affect the result returned by `astimezone()`.
Ignoring error cases, `astimezone()` acts like:

```
def astimezone(self, tz):
    if self.tzinfo is tz:
        return self
    # Convert self to UTC, and attach the new timezone object.
    utc = (self - self.utcoffset()).replace(tzinfo=tz)
    # Convert from UTC to tz's local time.
    return tz.fromutc(utc)
```

> *Changed in version 3.3.*
> *tz* now can be omitted.

> *Changed in version 3.6.*
> The `astimezone()` method can now be called on naive instances that
> are presumed to represent system local time.

### `datetime.utcoffset()`

If `.tzinfo` is `None`, returns `None`, else returns
`self.tzinfo.utcoffset(self)`, and raises an exception if the latter doesn't
return `None` or a `timedelta` object with magnitude less than one day.

> *Changed in version 3.7.*
> The UTC offset is not restricted to a whole number of minutes.

### `datetime.dst()`

If `.tzinfo` is `None`, returns `None`, else returns
`self.tzinfo.dst(self)`, and raises an exception if the latter doesn't return
`None` or a `timedelta` object with magnitude less than one day.

> *Changed in version 3.7.*
> The DST offset is not restricted to a whole number of minutes.

### `datetime.tzname()`

If `.tzinfo` is `None`, returns `None`, else returns
`self.tzinfo.tzname(self)`, raises an exception if the latter doesn't return
`None` or a string object,

### `datetime.timetuple()`

Return a `time.struct_time` such as returned by `time.localtime()`.

`d.timetuple()` is equivalent to:

```
time.struct_time((d.year, d.month, d.day,
                  d.hour, d.minute, d.second,
                  d.weekday(), yday, dst))
```

where `yday = d.toordinal() - date(d.year, 1, 1).toordinal() + 1`
is the day number within the current year starting with 1 for January
1st. The `tm_isdst` flag of the result is set according to the
`dst()` method: `.tzinfo` is `None` or `dst()` returns
`None`, `tm_isdst` is set to `-1`; else if `dst()` returns a
non-zero value, `tm_isdst` is set to 1; else `tm_isdst` is
set to 0.

### `datetime.utctimetuple()`

If `.datetime` instance `d` is naive, this is the same as
`d.timetuple()` except that `tm_isdst` is forced to 0 regardless of what
`d.dst()` returns. DST is never in effect for a UTC time.

If `d` is aware, `d` is normalized to UTC time, by subtracting
`d.utcoffset()`, and a `time.struct_time` for the
normalized time is returned. `tm_isdst` is forced to 0. Note
that an `OverflowError` may be raised if `d.year` was
`MINYEAR` or `MAXYEAR` and UTC adjustment spills over a year
boundary.

> **Warning:** Because naive `datetime` objects are treated by many `datetime` methods
> as local times, it is preferred to use aware datetimes to represent times
> in UTC; as a result, using `datetime.utctimetuple()` may give misleading
> results. If you have a naive `datetime` representing UTC, use
> `datetime.replace(tzinfo=timezone.utc)` to make it aware, at which point
> you can use `.datetime.timetuple()`.

### `datetime.toordinal()`

Return the proleptic Gregorian ordinal of the date. The same as
`self.date().toordinal()`.

### `datetime.timestamp()`

Return POSIX timestamp corresponding to the `.datetime`
instance. The return value is a `float` similar to that
returned by `time.time()`.

Naive `.datetime` instances are assumed to represent local
time and this method relies on platform C functions to perform
the conversion. Since `datetime` supports a wider range of
values than the platform C functions on many platforms, this
method may raise `OverflowError` or `OSError` for times
far in the past or far in the future.

For aware `.datetime` instances, the return value is computed
as:

```
(dt - datetime(1970, 1, 1, tzinfo=timezone.utc)).total_seconds()
```

> **Note:** There is no method to obtain the POSIX timestamp directly from a
> naive `.datetime` instance representing UTC time. If your
> application uses this convention and your system time zone is not
> set to UTC, you can obtain the POSIX timestamp by supplying
> `tzinfo=timezone.utc`:
>
>
> ```
> timestamp = dt.replace(tzinfo=timezone.utc).timestamp()
> ```
>
>
> or by calculating the timestamp directly:
>
>
> ```
> timestamp = (dt - datetime(1970, 1, 1)) / timedelta(seconds=1)
> ```
>

> *Added in version 3.3.*

> *Changed in version 3.6.*
> The `timestamp()` method uses the `.fold` attribute to
> disambiguate the times during a repeated interval.

> *Changed in version 3.6.*
> This method no longer relies on the platform C `mktime`
> function to perform conversions.

### `datetime.weekday()`

Return the day of the week as an integer, where Monday is 0 and Sunday is 6.
The same as `self.date().weekday()`. See also `isoweekday()`.

### `datetime.isoweekday()`

Return the day of the week as an integer, where Monday is 1 and Sunday is 7.
The same as `self.date().isoweekday()`. See also `weekday()`,
`isocalendar()`.

### `datetime.isocalendar()`

Return a named tuple with three components: `year`, `week`
and `weekday`. The same as `self.date().isocalendar()`.

### `datetime.isoformat(sep='T', timespec='auto')`

Return a string representing the date and time in ISO 8601 format:

- `YYYY-MM-DDTHH:MM:SS.ffffff`, if `microsecond` is not 0
- `YYYY-MM-DDTHH:MM:SS`, if `microsecond` is 0

If `utcoffset()` does not return `None`, a string is
appended, giving the UTC offset:

- `YYYY-MM-DDTHH:MM:SS.ffffff+HH:MM[:SS[.ffffff]]`, if `microsecond`
is not 0
- `YYYY-MM-DDTHH:MM:SS+HH:MM[:SS[.ffffff]]`,  if `microsecond` is 0

Examples:

```
>>> import datetime as dt
>>> dt.datetime(2019, 5, 18, 15, 17, 8, 132263).isoformat()
'2019-05-18T15:17:08.132263'
>>> dt.datetime(2019, 5, 18, 15, 17, tzinfo=dt.timezone.utc).isoformat()
'2019-05-18T15:17:00+00:00'
```

The optional argument *sep* (default `'T'`) is a one-character separator,
placed between the date and time portions of the result. For example:

```
>>> import datetime as dt
>>> class TZ(dt.tzinfo):
...     """A time zone with an arbitrary, constant -06:39 offset."""
...     def utcoffset(self, when):
...         return dt.timedelta(hours=-6, minutes=-39)
...
>>> dt.datetime(2002, 12, 25, tzinfo=TZ()).isoformat(' ')
'2002-12-25 00:00:00-06:39'
>>> dt.datetime(2009, 11, 27, microsecond=100, tzinfo=TZ()).isoformat()
'2009-11-27T00:00:00.000100-06:39'
```

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

`ValueError` will be raised on an invalid *timespec* argument:

```
>>> import datetime as dt
>>> dt.datetime.now().isoformat(timespec='minutes')   # doctest: +SKIP
'2002-12-25T00:00'
>>> my_datetime = dt.datetime(2015, 1, 1, 12, 30, 59, 0)
>>> my_datetime.isoformat(timespec='microseconds')
'2015-01-01T12:30:59.000000'
```

> *Changed in version 3.6.*
> Added the *timespec* parameter.

### `datetime.__str__()`

For a `.datetime` instance `d`, `str(d)` is equivalent to
`d.isoformat(' ')`.
