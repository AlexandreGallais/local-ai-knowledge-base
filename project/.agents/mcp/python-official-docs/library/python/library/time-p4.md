---
title: "time --- Time access and conversions (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/time.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# time --- Time access and conversions (part 4 of 4)

### `tzset()`

Reset the time conversion rules used by the library routines. The environment
variable `TZ` specifies how this is done. It will also set the variables
`tzname` (from the `TZ` environment variable), `timezone` (non-DST
seconds West of UTC), `altzone` (DST seconds west of UTC) and `daylight`
(to 0 if this timezone does not have any daylight saving time rules, or to
nonzero if there is a time, past, present or future when daylight saving time
applies).

> **Availability:** Unix.

> **Note:** Although in many cases, changing the `TZ` environment variable may
> affect the output of functions like `localtime()` without calling
> `tzset()`, this behavior should not be relied on.
>
> The `TZ` environment variable should contain no whitespace.

The standard format of the `TZ` environment variable is (whitespace
added for clarity):

```
std offset [dst [offset [,start[/time], end[/time]]]]
```

Where the components are:

`std` and `dst`
Three or more alphanumerics giving the timezone abbreviations. These will be
propagated into time.tzname

`offset`
The offset has the form: `± hh[:mm[:ss]]`. This indicates the value
added the local time to arrive at UTC.  If preceded by a '-', the timezone
is east of the Prime Meridian; otherwise, it is west. If no offset follows
dst, summer time is assumed to be one hour ahead of standard time.

`start[/time], end[/time]`
Indicates when to change to and back from DST. The format of the
start and end dates are one of the following:

`J{n}`
The Julian day *n* (1 <= *n* <= 365). Leap days are not counted, so in
all years February 28 is day 59 and March 1 is day 60.

`{n}`
The zero-based Julian day (0 <= *n* <= 365). Leap days are counted, and
it is possible to refer to February 29.

`M{m}.{n}.{d}`
The *d*'th day (0 <= *d* <= 6) of week *n* of month *m* of the year (1
<= *n* <= 5, 1 <= *m* <= 12, where week 5 means "the last *d* day in
month *m*" which may occur in either the fourth or the fifth
week). Week 1 is the first week in which the *d*'th day occurs. Day
zero is a Sunday.

`time` has the same format as `offset` except that no leading sign
('-' or '+') is allowed. The default, if time is not given, is 02:00:00.

```
>>> os.environ['TZ'] = 'EST+05EDT,M4.1.0,M10.5.0'
>>> time.tzset()
>>> time.strftime('%X %x %Z')
'02:07:36 05/08/03 EDT'
>>> os.environ['TZ'] = 'AEST-10AEDT-11,M10.5.0,M3.5.0'
>>> time.tzset()
>>> time.strftime('%X %x %Z')
'16:08:12 05/08/03 AEST'
```

On many Unix systems (including *BSD, Linux, Solaris, and Darwin), it is more
convenient to use the system's zoneinfo (tzfile(5))  database to
specify the timezone rules. To do this, set the  `TZ` environment
variable to the path of the required timezone  datafile, relative to the root of
the systems 'zoneinfo' timezone database, usually located at
`/usr/share/zoneinfo`. For example,  `'US/Eastern'`,
`'Australia/Melbourne'`, `'Egypt'` or  `'Europe/Amsterdam'`.:

```
>>> os.environ['TZ'] = 'US/Eastern'
>>> time.tzset()
>>> time.tzname
('EST', 'EDT')
>>> os.environ['TZ'] = 'Egypt'
>>> time.tzset()
>>> time.tzname
('EET', 'EEST')
```

## Clock ID Constants

These constants are used as parameters for `clock_getres()` and
`clock_gettime()`.

### `CLOCK_BOOTTIME`

Identical to `CLOCK_MONOTONIC`, except it also includes any time that
the system is suspended.

This allows applications to get a suspend-aware monotonic  clock  without
having to deal with the complications of `CLOCK_REALTIME`, which may
have  discontinuities if the time is changed using `settimeofday()` or
similar.

> **Availability:** Linux >= 2.6.39.

> *Added in version 3.7.*

### `CLOCK_HIGHRES`

The Solaris OS has a `CLOCK_HIGHRES` timer that attempts to use an optimal
hardware source, and may give close to nanosecond resolution.
`CLOCK_HIGHRES` is the nonadjustable, high-resolution clock.

> **Availability:** Solaris.

> *Added in version 3.3.*

### `CLOCK_MONOTONIC`

Clock that cannot be set and represents monotonic time since some unspecified
starting point.

> **Availability:** Unix.

> *Added in version 3.3.*

### `CLOCK_MONOTONIC_RAW`

Similar to `CLOCK_MONOTONIC`, but provides access to a raw
hardware-based time that is not subject to NTP adjustments.

> **Availability:** Linux >= 2.6.28, macOS >= 10.12.

> *Added in version 3.3.*

### `CLOCK_MONOTONIC_RAW_APPROX`

Similar to `CLOCK_MONOTONIC_RAW`, but reads a value cached by
the system at context switch and hence has less accuracy.

> **Availability:** macOS >= 10.12.

> *Added in version 3.13.*

### `CLOCK_PROCESS_CPUTIME_ID`

High-resolution per-process timer from the CPU.

> **Availability:** Unix.

> *Added in version 3.3.*

### `CLOCK_PROF`

High-resolution per-process timer from the CPU.

> **Availability:** FreeBSD, NetBSD >= 7, OpenBSD.

> *Added in version 3.7.*

### `CLOCK_TAI`

International Atomic Time

The system must have a current leap second table in order for this to give
the correct answer.  PTP or NTP software can maintain a leap second table.

> **Availability:** Linux.

> *Added in version 3.9.*

### `CLOCK_THREAD_CPUTIME_ID`

Thread-specific CPU-time clock.

> **Availability:** Unix.

> *Added in version 3.3.*

### `CLOCK_UPTIME`

Time whose absolute value is the time the system has been running and not
suspended, providing accurate uptime measurement, both absolute and
interval.

> **Availability:** FreeBSD, OpenBSD >= 5.5.

> *Added in version 3.7.*

### `CLOCK_UPTIME_RAW`

Clock that increments monotonically, tracking the time since an arbitrary
point, unaffected by frequency or time adjustments and not incremented while
the system is asleep.

> **Availability:** macOS >= 10.12.

> *Added in version 3.8.*

### `CLOCK_UPTIME_RAW_APPROX`

Like `CLOCK_UPTIME_RAW`, but the value is cached by the system
at context switches and therefore has less accuracy.

> **Availability:** macOS >= 10.12.

> *Added in version 3.13.*

The following constant is the only parameter that can be sent to
`clock_settime()`.

### `CLOCK_REALTIME`

Real-time clock.  Setting this clock requires appropriate privileges.
The clock is the same for all processes.

> **Availability:** Unix.

> *Added in version 3.3.*

## Timezone Constants

### `altzone`

The offset of the local DST timezone, in seconds west of UTC, if one is defined.
This is negative if the local DST timezone is east of UTC (as in Western Europe,
including the UK).  Only use this if `daylight` is nonzero.  See note below.

### `daylight`

Nonzero if a DST timezone is defined.  See note below.

### `timezone`

The offset of the local (non-DST) timezone, in seconds west of UTC (negative in
most of Western Europe, positive in the US, zero in the UK).  See note below.

### `tzname`

A tuple of two strings: the first is the name of the local non-DST timezone, the
second is the name of the local DST timezone.  If no DST timezone is defined,
the second string should not be used.  See note below.

> **Note:** For the above Timezone constants (`altzone`, `daylight`, `timezone`,
> and `tzname`), the value is determined by the timezone rules in effect
> at module load time or the last time `tzset()` is called and may be incorrect
> for times in the past.  It is recommended to use the `tm_gmtoff` and
> `tm_zone` results from `localtime()` to obtain timezone information.

> **See also:** Module `datetime`
> More object-oriented interface to dates and times.
>
> Module `locale`
> Internationalization services.  The locale setting affects the interpretation
> of many format specifiers in `strftime()` and `strptime()`.
>
> Module `calendar`
> General calendar-related functions.   `timegm()` is the
> inverse of `gmtime()` from this module.

**Footnotes**
