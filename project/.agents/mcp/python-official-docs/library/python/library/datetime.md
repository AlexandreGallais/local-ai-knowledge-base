---
title: "datetime --- Basic date and time types (part 1 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `datetime` --- Basic date and time types

Module `datetime`.

**Source code:** Lib/datetime.py

The `datetime` module supplies classes for manipulating dates and times.

While date and time arithmetic is supported, the focus of the implementation is
on efficient attribute extraction for output formatting and manipulation.

> **Tip:** Skip to the format codes.

> **See also:** Module `calendar`
> General calendar related functions.
>
> Module `time`
> Time access and conversions.
>
> Module `zoneinfo`
> Concrete time zones representing the IANA time zone database.
>
> Package dateutil
> Third-party library with expanded time zone and parsing support.
>
> Package DateType
> Third-party library that introduces distinct static types to for example,
> allow static type checkers
> to differentiate between naive and aware datetimes.

## Aware and naive objects

Date and time objects may be categorized as "aware" or "naive" depending on
whether or not they include time zone information.

With sufficient knowledge of applicable algorithmic and political time
adjustments, such as time zone and daylight saving time information,
an **aware** object can locate itself relative to other aware objects.
An aware object represents a specific moment in time that is not open to
interpretation.

A **naive** object does not contain enough information to unambiguously locate
itself relative to other date/time objects. Whether a naive object represents
Coordinated Universal Time (UTC), local time, or time in some other time zone is
purely up to the program, just like it is up to the program whether a
particular number represents metres, miles, or mass. Naive objects are easy to
understand and to work with, at the cost of ignoring some aspects of reality.

For applications requiring aware objects, `.datetime` and `.time`
objects have an optional time zone information attribute, `tzinfo`, that
can be set to an instance of a subclass of the abstract `tzinfo` class.
These `tzinfo` objects capture information about the offset from UTC
time, the time zone name, and whether daylight saving time is in effect.

Only one concrete `tzinfo` class, the `timezone` class, is
supplied by the `datetime` module. The `timezone` class can
represent simple time zones with fixed offsets from UTC, such as UTC itself or
North American EST and EDT time zones. Supporting time zones at deeper levels of
detail is up to the application. The rules for time adjustment across the
world are more political than rational, change frequently, and there is no
standard suitable for every application aside from UTC.

## Constants

The `datetime` module exports the following constants:

### `MINYEAR`

The smallest year number allowed in a `date` or `.datetime` object.
`MINYEAR` is 1.

### `MAXYEAR`

The largest year number allowed in a `date` or `.datetime` object.
`MAXYEAR` is 9999.

### `UTC`

Alias for the UTC time zone singleton `datetime.timezone.utc`.

> *Added in version 3.11.*

## Available types

### class `date`

An idealized naive date, assuming the current Gregorian calendar always was, and
always will be, in effect. Attributes: `year`, `month`, and
`day`.

### class `time`

An idealized time, independent of any particular day, assuming that every day
has exactly 24*60*60 seconds.  (There is no notion of "leap seconds" here.)
Attributes: `hour`, `minute`, `second`, `microsecond`,
and `.tzinfo`.

### class `datetime`

A combination of a date and a time. Attributes: `year`, `month`,
`day`, `hour`, `minute`, `second`, `microsecond`,
and `.tzinfo`.

### class `timedelta`

A duration expressing the difference between two `.datetime`
or `date` instances to microsecond resolution.

### class `tzinfo`

An abstract base class for time zone information objects. These are used by the
`.datetime` and `.time` classes to provide a customizable notion of
time adjustment (for example, to account for time zone and/or daylight saving
time).

### class `timezone`

A class that implements the `tzinfo` abstract base class as a
fixed offset from the UTC.

> *Added in version 3.2.*

Objects of these types are immutable.

Subclass relationships:

### Common properties

The `date`, `.datetime`, `.time`, and `timezone` types
share these common features:

- Objects of these types are immutable.
- Objects of these types are hashable, meaning that they can be used as
dictionary keys.
- Objects of these types support efficient pickling via the `pickle` module.

### Determining if an object is aware or naive

Objects of the `date` type are always naive.

An object of type `.time` or `.datetime` may be aware or naive.

A `.datetime` object `d` is aware if
`d.utcoffset()` does not return `None`.
Otherwise, `d` is naive.

A `.time` object `t` is aware if
`t.utcoffset()` does not return `None`.
Otherwise, `t` is naive.

The distinction between aware and naive doesn't apply to `timedelta`
objects.
