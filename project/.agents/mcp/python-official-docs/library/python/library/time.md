---
title: "time --- Time access and conversions (part 1 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/time.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `time` --- Time access and conversions

Module `time`.

This module provides various time-related functions. For related
functionality, see also the `datetime` and `calendar` modules.

Although this module is always available,
not all functions are available on all platforms.  Most of the functions
defined in this module call platform C library functions with the same name.  It
may sometimes be helpful to consult the platform documentation, because the
semantics of these functions varies among platforms.

An explanation of some terminology and conventions is in order.

- The epoch is the point where the time starts, the return value of
`time.gmtime(0)`. It is January 1, 1970, 00:00:00 (UTC) on all platforms.

- The term seconds since the epoch refers to the total number
of elapsed seconds since the epoch, typically excluding
leap seconds.  Leap seconds are excluded from this total on all
POSIX-compliant platforms.

- The functions in this module may not handle dates and times before the epoch_ or
far in the future.  The cut-off point in the future is determined by the C
library; for 32-bit systems, it is typically in 2038.

- Function `strptime()` can parse 2-digit years when given `%y` format
code. When 2-digit years are parsed, they are converted according to the POSIX
and ISO C standards: values 69--99 are mapped to 1969--1999, and values 0--68
are mapped to 2000--2068.

- UTC is Coordinated Universal Time and superseded Greenwich Mean Time or
GMT as the basis of international timekeeping. The acronym UTC is not a
mistake but conforms to an earlier, language-agnostic naming scheme for time
standards such as UT0, UT1, and UT2.

- DST is Daylight Saving Time, an adjustment of the timezone by (usually) one
hour during part of the year.  DST rules are magic (determined by local law) and
can change from year to year.  The C library has a table containing the local
rules (often it is read from a system file for flexibility) and is the only
source of True Wisdom in this respect.

- The precision of the various real-time functions may be less than suggested by
the units in which their value or argument is expressed. E.g. on most Unix
systems, the clock "ticks" only 50 or 100 times a second.

- On the other hand, the precision of `.time()` and `sleep()` is better
than their Unix equivalents: times are expressed as floating-point numbers,
`.time()` returns the most accurate time available (using Unix
`gettimeofday` where available), and `sleep()` will accept a time
with a nonzero fraction (Unix `select` is used to implement this, where
available).

- The time value as returned by `gmtime()`, `localtime()`, and
`strptime()`, and accepted by `asctime()`, `mktime()` and
`strftime()`, is a sequence of 9 integers.  The return values of
`gmtime()`, `localtime()`, and `strptime()` also offer attribute
names for individual fields.

See `struct_time` for a description of these objects.

> *Changed in version 3.3.*
> The `struct_time` type was extended to provide
> the `tm_gmtoff` and `tm_zone`
> attributes when platform supports corresponding
> `struct tm` members.

> *Changed in version 3.6.*
> The `struct_time` attributes
> `tm_gmtoff` and `tm_zone`
> are now available on all platforms.

- Use the following functions to convert between time representations:

```text
  +-------------------------+-------------------------+-------------------------+
  | From                    | To                      | Use                     |
  +=========================+=========================+=========================+
  | seconds since the epoch | :class:`struct_time` in | :func:`gmtime`          |
  |                         | UTC                     |                         |
  +-------------------------+-------------------------+-------------------------+
  | seconds since the epoch | :class:`struct_time` in | :func:`localtime`       |
  |                         | local time              |                         |
  +-------------------------+-------------------------+-------------------------+
  | :class:`struct_time` in | seconds since the epoch | :func:`calendar.timegm` |
  | UTC                     |                         |                         |
  +-------------------------+-------------------------+-------------------------+
  | :class:`struct_time` in | seconds since the epoch | :func:`mktime`          |
  | local time              |                         |                         |
  +-------------------------+-------------------------+-------------------------+
```
