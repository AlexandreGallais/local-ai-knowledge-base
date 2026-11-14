---
title: "datetime --- Basic date and time types (part 7 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 7 of 10)

## `tzinfo` objects

### class `tzinfo()`

This is an abstract base class, meaning that this class should not be
instantiated directly.  Define a subclass of `tzinfo` to capture
information about a particular time zone.

An instance of (a concrete subclass of) `tzinfo` can be passed to the
constructors for `.datetime` and `.time` objects. The latter objects
view their attributes as being in local time, and the `tzinfo` object
supports methods revealing offset of local time from UTC, the name of the time
zone, and DST offset, all relative to a date or time object passed to them.

You need to derive a concrete subclass, and (at least)
supply implementations of the standard `tzinfo` methods needed by the
`.datetime` methods you use. The `datetime` module provides
`timezone`, a simple concrete subclass of `tzinfo` which can
represent time zones with fixed offset from UTC such as UTC itself or North
American EST and EDT.

Special requirement for pickling:  A `tzinfo` subclass must have an
`__init__()` method that can be called with no arguments,
otherwise it can be
pickled but possibly not unpickled again. This is a technical requirement that
may be relaxed in the future.

A concrete subclass of `tzinfo` may need to implement the following
methods. Exactly which methods are needed depends on the uses made of aware
`datetime` objects. If in doubt, simply implement all of them.

### `tzinfo.utcoffset(dt)`

Return offset of local time from UTC, as a `timedelta` object that is
positive east of UTC. If local time is west of UTC, this should be negative.

This represents the *total* offset from UTC; for example, if a
`tzinfo` object represents both time zone and DST adjustments,
`utcoffset()` should return their sum. If the UTC offset isn't known,
return `None`. Else the value returned must be a `timedelta` object
strictly between `-timedelta(hours=24)` and `timedelta(hours=24)`
(the magnitude of the offset must be less than one day). Most implementations
of `utcoffset()` will probably look like one of these two:

```
return CONSTANT                 # fixed-offset class
return CONSTANT + self.dst(dt)  # daylight-aware class
```

If `utcoffset()` does not return `None`, `dst()` should not return
`None` either.

The default implementation of `utcoffset()` raises
`NotImplementedError`.

> *Changed in version 3.7.*
> The UTC offset is not restricted to a whole number of minutes.

### `tzinfo.dst(dt)`

Return the daylight saving time (DST) adjustment, as a `timedelta`
object or
`None` if DST information isn't known.

Return `timedelta(0)` if DST is not in effect.
If DST is in effect, return the offset as a `timedelta` object
(see `utcoffset()` for details). Note that DST offset, if applicable, has
already been added to the UTC offset returned by `utcoffset()`, so there's
no need to consult `dst()` unless you're interested in obtaining DST info
separately. For example, `datetime.timetuple()` calls its `tzinfo`
attribute's `dst()` method to determine how the `tm_isdst` flag
should be set, and `tzinfo.fromutc()` calls `dst()` to account for
DST changes when crossing time zones.

An instance *tz* of a `tzinfo` subclass that models both standard and
daylight times must be consistent in this sense:

`tz.utcoffset(dt) - tz.dst(dt)`

must return the same result for every `.datetime` *dt* with ``dt.tzinfo ==
tz``. For sane `tzinfo` subclasses, this expression yields the time
zone's "standard offset", which should not depend on the date or the time, but
only on geographic location. The implementation of `datetime.astimezone()`
relies on this, but cannot detect violations; it's the programmer's
responsibility to ensure it. If a `tzinfo` subclass cannot guarantee
this, it may be able to override the default implementation of
`tzinfo.fromutc()` to work correctly with `astimezone()` regardless.

Most implementations of `dst()` will probably look like one of these two:

```
import datetime as dt

def dst(self, when):
    # a fixed-offset class:  doesn't account for DST
    return dt.timedelta(0)
```

or:

```
import datetime as dt

def dst(self, when):
    # Code to set dston and dstoff to the time zone's DST
    # transition times based on the input when.year, and expressed
    # in standard local time.

    if dston <= when.replace(tzinfo=None) < dstoff:
        return dt.timedelta(hours=1)
    else:
        return dt.timedelta(0)
```

The default implementation of `dst()` raises `NotImplementedError`.

> *Changed in version 3.7.*
> The DST offset is not restricted to a whole number of minutes.

### `tzinfo.tzname(dt)`

Return the time zone name corresponding to the `.datetime` object *dt*, as
a string. Nothing about string names is defined by the `datetime` module,
and there's no requirement that it mean anything in particular. For example,
`"GMT"`, `"UTC"`, `"-500"`, `"-5:00"`, `"EDT"`, `"US/Eastern"`, `"America/New York"` are all
valid replies. Return `None` if a string name isn't known. Note that this is
a method rather than a fixed string primarily because some `tzinfo`
subclasses will wish to return different names depending on the specific value
of *dt* passed, especially if the `tzinfo` class is accounting for
daylight time.

The default implementation of `tzname()` raises `NotImplementedError`.

These methods are called by a `.datetime` or `.time` object, in
response to their methods of the same names. A `datetime` object passes
itself as the argument, and a `time` object passes `None` as the
argument. A `tzinfo` subclass's methods should therefore be prepared to
accept a *dt* argument of `None`, or of class `datetime`.

When `None` is passed, it's up to the class designer to decide the best
response. For example, returning `None` is appropriate if the class wishes to
say that time objects don't participate in the `tzinfo` protocols. It
may be more useful for `utcoffset(None)` to return the standard UTC offset, as
there is no other convention for discovering the standard offset.

When a `.datetime` object is passed in response to a `datetime`
method, `dt.tzinfo` is the same object as *self*. `tzinfo` methods can
rely on this, unless user code calls `tzinfo` methods directly. The
intent is that the `tzinfo` methods interpret *dt* as being in local
time, and not need worry about objects in other time zones.

There is one more `tzinfo` method that a subclass may wish to override:

### `tzinfo.fromutc(dt)`

This is called from the default `datetime.astimezone()`
implementation. When called from that, `dt.tzinfo` is *self*, and *dt*'s
date and time data are to be viewed as expressing a UTC time. The purpose
of `fromutc()` is to adjust the date and time data, returning an
equivalent datetime in *self*'s local time.

Most `tzinfo` subclasses should be able to inherit the default
`fromutc()` implementation without problems. It's strong enough to handle
fixed-offset time zones, and time zones accounting for both standard and
daylight time, and the latter even if the DST transition times differ in
different years. An example of a time zone the default `fromutc()`
implementation may not handle correctly in all cases is one where the standard
offset (from UTC) depends on the specific date and time passed, which can happen
for political reasons. The default implementations of `astimezone()` and
`fromutc()` may not produce the result you want if the result is one of the
hours straddling the moment the standard offset changes.

Skipping code for error cases, the default `fromutc()` implementation acts
like:

```
import datetime as dt

def fromutc(self, when):
    # raise ValueError error if when.tzinfo is not self
    dtoff = when.utcoffset()
    dtdst = when.dst()
    # raise ValueError if dtoff is None or dtdst is None
    delta = dtoff - dtdst  # this is self's standard offset
    if delta:
        when += delta   # convert to standard local time
        dtdst = when.dst()
        # raise ValueError if dtdst is None
    if dtdst:
        return when + dtdst
    else:
        return when
```

In the following :download:`tzinfo_examples.py
<../includes/tzinfo_examples.py>` file there are some examples of
`tzinfo` classes:

Note that there are unavoidable subtleties twice per year in a `tzinfo`
subclass accounting for both standard and daylight time, at the DST transition
points. For concreteness, consider US Eastern (UTC -0500), where EDT begins the
minute after 1:59 (EST) on the second Sunday in March, and ends the minute after
1:59 (EDT) on the first Sunday in November:

```
  UTC   3:MM  4:MM  5:MM  6:MM  7:MM  8:MM
  EST  22:MM 23:MM  0:MM  1:MM  2:MM  3:MM
  EDT  23:MM  0:MM  1:MM  2:MM  3:MM  4:MM

start  22:MM 23:MM  0:MM  1:MM  3:MM  4:MM

  end  23:MM  0:MM  1:MM  1:MM  2:MM  3:MM
```

When DST starts (the "start" line), the local wall clock leaps from 1:59 to
3:00. A wall time of the form 2:MM doesn't really make sense on that day, so
`astimezone(Eastern)` won't deliver a result with `hour == 2` on the day DST
begins. For example, at the Spring forward transition of 2016, we get:

```
>>> import datetime as dt
>>> from tzinfo_examples import HOUR, Eastern
>>> u0 = dt.datetime(2016, 3, 13, 5, tzinfo=dt.timezone.utc)
>>> for i in range(4):
...     u = u0 + i*HOUR
...     t = u.astimezone(Eastern)
...     print(u.time(), 'UTC =', t.time(), t.tzname())
...
05:00:00 UTC = 00:00:00 EST
06:00:00 UTC = 01:00:00 EST
07:00:00 UTC = 03:00:00 EDT
08:00:00 UTC = 04:00:00 EDT
```

When DST ends (the "end" line), there's a potentially worse problem: there's an
hour that can't be spelled unambiguously in local wall time: the last hour of
daylight time. In Eastern, that's times of the form 5:MM UTC on the day
daylight time ends. The local wall clock leaps from 1:59 (daylight time) back
to 1:00 (standard time) again. Local times of the form 1:MM are ambiguous.
`astimezone()` mimics the local clock's behavior by mapping two adjacent UTC
hours into the same local hour then. In the Eastern example, UTC times of the
form 5:MM and 6:MM both map to 1:MM when converted to Eastern, but earlier times
have the `fold` attribute set to 0 and the later times have it set to 1.
For example, at the Fall back transition of 2016, we get:

```
>>> import datetime as dt
>>> from tzinfo_examples import HOUR, Eastern
>>> u0 = dt.datetime(2016, 11, 6, 4, tzinfo=dt.timezone.utc)
>>> for i in range(4):
...     u = u0 + i*HOUR
...     t = u.astimezone(Eastern)
...     print(u.time(), 'UTC =', t.time(), t.tzname(), t.fold)
...
04:00:00 UTC = 00:00:00 EDT 0
05:00:00 UTC = 01:00:00 EDT 0
06:00:00 UTC = 01:00:00 EST 1
07:00:00 UTC = 02:00:00 EST 0
```

Note that the `.datetime` instances that differ only by the value of the
`fold` attribute are considered equal in comparisons.

Applications that can't bear wall-time ambiguities should explicitly check the
value of the `fold` attribute or avoid using hybrid
`tzinfo` subclasses; there are no ambiguities when using `timezone`,
or any other fixed-offset `tzinfo` subclass (such as a class representing
only EST (fixed offset -5 hours), or only EDT (fixed offset -4 hours)).

> **See also:** `zoneinfo`
> The `datetime` module has a basic `timezone` class (for
> handling arbitrary fixed offsets from UTC) and its `timezone.utc`
> attribute (a UTC `timezone` instance).
>
> `zoneinfo` brings the *IANA time zone database* (also known as the Olson
> database) to Python, and its usage is recommended.
>
> IANA time zone database
> The Time Zone Database (often called tz, tzdata or zoneinfo) contains code
> and data that represent the history of local time for many representative
> locations around the globe. It is updated periodically to reflect changes
> made by political bodies to time zone boundaries, UTC offsets, and
> daylight-saving rules.

## `timezone` objects

The `timezone` class is a subclass of `tzinfo`, each
instance of which represents a time zone defined by a fixed offset from
UTC.

Objects of this class cannot be used to represent time zone information in the
locations where different offsets are used in different days of the year or
where historical changes have been made to civil time.

### class `timezone(offset[, name])`

The *offset* argument must be specified as a `timedelta`
object representing the difference between the local time and UTC. It must
be strictly between `-timedelta(hours=24)` and
`timedelta(hours=24)`, otherwise `ValueError` is raised.

The *name* argument is optional. If specified it must be a string that
will be used as the value returned by the `datetime.tzname()` method.

> *Added in version 3.2.*

> *Changed in version 3.7.*
> The UTC offset is not restricted to a whole number of minutes.

### `timezone.utcoffset(dt)`

Return the fixed value specified when the `timezone` instance is
constructed.

The *dt* argument is ignored. The return value is a `timedelta`
instance equal to the difference between the local time and UTC.

> *Changed in version 3.7.*
> The UTC offset is not restricted to a whole number of minutes.

### `timezone.tzname(dt)`

Return the fixed value specified when the `timezone` instance
is constructed.

If *name* is not provided in the constructor, the name returned by
`tzname(dt)` is generated from the value of the `offset` as follows. If
*offset* is `timedelta(0)`, the name is "UTC", otherwise it is a string in
the format `UTC±HH:MM`, where ± is the sign of `offset`, HH and MM are
two digits of `offset.hours` and `offset.minutes` respectively.

> *Changed in version 3.6.*
> Name generated from `offset=timedelta(0)` is now plain `'UTC'`, not
> `'UTC+00:00'`.

### `timezone.dst(dt)`

Always returns `None`.

### `timezone.fromutc(dt)`

Return `dt + offset`. The *dt* argument must be an aware
`.datetime` instance, with `tzinfo` set to `self`.

Class attributes:

### `timezone.utc`

The UTC time zone, `timezone(timedelta(0))`.
