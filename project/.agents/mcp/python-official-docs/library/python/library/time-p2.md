---
title: "time --- Time access and conversions (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/time.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# time --- Time access and conversions (part 2 of 4)

## Functions

### `asctime([time_tuple])`

Convert a tuple or `struct_time` representing a time as returned by
`gmtime()` or `localtime()` to a string of the following
form: `'Sun Jun 20 23:21:05 1993'`. The day field is two characters long
and is space padded if the day is a single digit,
for example: `'Wed Jun  9 04:26:40 1993'`.

If *time_tuple* is not provided,
the current time as returned by `localtime()` is used.
Locale information is not used by `asctime()`.

> **Note:** Unlike the C function of the same name, `asctime()` does not add a
> trailing newline.

### `pthread_getcpuclockid(thread_id, /)`

Return the *clk_id* of the thread-specific CPU-time clock for the specified *thread_id*.

Use `threading.get_ident()` or the `ident`
attribute of `threading.Thread` objects to get a suitable value
for *thread_id*.

> **Warning:** Passing an invalid or expired *thread_id* may result in
> undefined behavior, such as segmentation fault.

> **Availability:** Unix
>
> See the man page for pthread_getcpuclockid(3) for
> further information.

> *Added in version 3.7.*

### `clock_getres(clk_id, /)`

Return the resolution (precision) of the specified clock *clk_id*.  Refer to
time-clock-id-constants for a list of accepted values for *clk_id*.

> **Availability:** Unix.

> *Added in version 3.3.*

### `clock_gettime(clk_id, /) -> float`

Return the time of the specified clock *clk_id*.  Refer to
time-clock-id-constants for a list of accepted values for *clk_id*.

Use `clock_gettime_ns()` to avoid the precision loss caused by the
`float` type.

> **Availability:** Unix.

> *Added in version 3.3.*

### `clock_gettime_ns(clk_id, /) -> int`

Similar to `clock_gettime()` but return time as nanoseconds.

> **Availability:** Unix.

> *Added in version 3.7.*

### `clock_settime(clk_id, time, /)`

Set the time of the specified clock *clk_id*.  Currently,
`CLOCK_REALTIME` is the only accepted value for *clk_id*.

Use `clock_settime_ns()` to avoid the precision loss caused by the
`float` type.

> **Availability:** Unix, not Android, not iOS.

> *Added in version 3.3.*

> *Changed in version 3.15.*
> Accepts any real number as *time*, not only integer or float.

### `clock_settime_ns(clk_id, time: int, /)`

Similar to `clock_settime()` but set time with nanoseconds.

> **Availability:** Unix, not Android, not iOS.

> *Added in version 3.7.*

### `ctime(seconds=None, /)`

Convert a time expressed in seconds since the epoch_ to a string of a form:
`'Sun Jun 20 23:21:05 1993'` representing local time. The day field
is two characters long and is space padded if the day is a single digit,
for example: `'Wed Jun  9 04:26:40 1993'`.

If *seconds* is not provided or `None`, the current time as
returned by `.time()` is used. `ctime(seconds)` is equivalent to
`asctime(localtime(seconds))`. Locale information is not used by
`ctime()`.

> *Changed in version 3.15.*
> Accepts any real number, not only integer or float.

### `get_clock_info(name, /)`

Get information on the specified clock as a namespace object.
Supported clock names and the corresponding functions to read their value
are:

- `'monotonic'`: `time.monotonic()`
- `'perf_counter'`: `time.perf_counter()`
- `'process_time'`: `time.process_time()`
- `'thread_time'`: `time.thread_time()`
- `'time'`: `time.time()`

The result has the following attributes:

- *adjustable*: `True` if the clock can be set to jump forward or backward
in time, `False` otherwise. Does not refer to gradual NTP rate adjustments.
- *implementation*: The name of the underlying C function used to get
the clock value.  Refer to time-clock-id-constants for possible values.
- *monotonic*: `True` if the clock cannot go backward,
`False` otherwise
- *resolution*: The resolution of the clock in seconds (`float`)

> *Added in version 3.3.*

### `gmtime(seconds=None, /)`

Convert a time expressed in seconds since the epoch_ to a `struct_time` in
UTC in which the dst flag is always zero.  If *seconds* is not provided or
`None`, the current time as returned by `.time()` is used.  Fractions
of a second are ignored.  See above for a description of the
`struct_time` object. See `calendar.timegm()` for the inverse of this
function.

> *Changed in version 3.15.*
> Accepts any real number, not only integer or float.

### `localtime(seconds=None, /)`

Like `gmtime()` but converts to local time.
If *seconds* is not provided or `None`,
the current time as returned by `.time()` is used.
The dst flag is set to `1` when DST applies to the given time.

`localtime()` may raise `OverflowError`, if the timestamp is
outside the range of values supported by the platform C `localtime`
or `gmtime` functions, and `OSError` on `localtime` or
`gmtime` failure. It's common for this to be restricted to years
between 1970 and 2038.

> *Changed in version 3.15.*
> Accepts any real number, not only integer or float.

### `mktime(time_tuple, /)`

This is the inverse function of `localtime()`.  Its argument is the
`struct_time` or full 9-tuple (since the dst flag is needed; use `-1`
as the dst flag if it is unknown) which expresses the time in *local* time, not
UTC.  It returns a floating-point number, for compatibility with `.time()`.
If the input value cannot be represented as a valid time, either
`OverflowError` or `ValueError` will be raised (which depends on
whether the invalid value is caught by Python or the underlying C libraries).
The earliest date for which it can generate a time is platform-dependent.

### `monotonic() -> float`

Return the value (in fractional seconds) of a monotonic clock, i.e. a clock
that cannot go backwards.  The clock is not affected by system clock updates.
The reference point of the returned value is undefined, so that only the
difference between the results of two calls is valid.

Clock:

- On Windows, call `QueryPerformanceCounter()` and
`QueryPerformanceFrequency()`.
- On macOS, call `mach_absolute_time()` and `mach_timebase_info()`.
- On HP-UX, call `gethrtime()`.
- Call `clock_gettime(CLOCK_HIGHRES)` if available.
- Otherwise, call `clock_gettime(CLOCK_MONOTONIC)`.

Use `monotonic_ns()` to avoid the precision loss caused by the
`float` type.

> *Added in version 3.3.*

> *Changed in version 3.5.*
> The function is now always available and the clock is now the same for
> all processes.

> *Changed in version 3.10.*
> On macOS, the clock is now the same for all processes.

### `monotonic_ns() -> int`

Similar to `monotonic()`, but return time as nanoseconds.

> *Added in version 3.7.*

### `perf_counter() -> float`

Return the value (in fractional seconds) of a performance counter, i.e. a
clock with the highest available resolution to measure a short duration.  It
does include time elapsed during sleep. The clock is the same for all
processes. The reference
point of the returned value is undefined, so that only the difference between
the results of two calls is valid.

> **CPython implementation detail:** On CPython, use the same clock as `time.monotonic()` and is a
> monotonic clock, i.e. a clock that cannot go backwards.

Use `perf_counter_ns()` to avoid the precision loss caused by the
`float` type.

> *Added in version 3.3.*

> *Changed in version 3.10.*
> On Windows, the clock is now the same for all processes.

> *Changed in version 3.13.*
> Use the same clock as `time.monotonic()`.

### `perf_counter_ns() -> int`

Similar to `perf_counter()`, but return time as nanoseconds.

> *Added in version 3.7.*

### `process_time() -> float`

Return the value (in fractional seconds) of the sum of the system and user
CPU time of the current process.  It does not include time elapsed during
sleep.  It is process-wide by definition.  The reference point of the
returned value is undefined, so that only the difference between the results
of two calls is valid.

Use `process_time_ns()` to avoid the precision loss caused by the
`float` type.

> *Added in version 3.3.*

### `process_time_ns() -> int`

Similar to `process_time()` but return time as nanoseconds.

> *Added in version 3.7.*

### `sleep(seconds, /)`

Suspend execution of the calling thread for the given number of seconds.
The argument may be a non-integer to indicate a more precise sleep time.

If the sleep is interrupted by a signal and no exception is raised by the
signal handler, the sleep is restarted with a recomputed timeout.

The suspension time may be longer than requested by an arbitrary amount,
because of the scheduling of other activity in the system.

**Windows implementation**

On Windows, if *seconds* is zero,
the thread relinquishes the remainder of its time slice
to any other thread that is ready to run.
If there are no other threads ready to run,
the function returns immediately, and the thread continues execution.
On Windows 10 and newer the implementation uses
a `high-resolution timer
<https://learn.microsoft.com/windows/win32/api/synchapi/nf-synchapi-createwaitabletimerexw>`_
which provides resolution of 100 nanoseconds.
If *seconds* is zero, `Sleep(0)` is used.

**Unix implementation**

- Use `clock_nanosleep()` if available (resolution: 1 nanosecond);
- Or use `nanosleep()` if available (resolution: 1 nanosecond);
- Or use `select()` (resolution: 1 microsecond).

> **Note:** To emulate a "no-op", use `pass` instead of `time.sleep(0)`.
>
> To voluntarily relinquish the CPU, specify a real-time :ref:`scheduling
> policy <os-scheduling-policy>` and use `os.sched_yield()` instead.

> *Changed in version 3.5.*
> The function now sleeps at least *seconds*
> even if the sleep is interrupted by a signal,
> except if the signal handler raises an exception
> (see PEP 475 for the rationale).

> *Changed in version 3.11.*
> On Unix, the `clock_nanosleep()` and `nanosleep()` functions are now
> used if available. On Windows, a waitable timer is now used.

> *Changed in version 3.13.*
> Raises an auditing event.

> *Changed in version 3.15.*
> Accepts any real number, not only integer or float.
