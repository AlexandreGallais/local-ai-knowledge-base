---
title: "datetime --- Basic date and time types (part 2 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 2 of 10)

## `timedelta` objects

A `timedelta` object represents a duration, the difference between two
`.datetime` or `date` instances.

### class `timedelta(days=0, seconds=0, microseconds=0, milliseconds=0, minutes=0, hours=0, weeks=0)`

All arguments are optional and default to 0. Arguments may be integers
or floats, and may be positive or negative.

Only *days*, *seconds* and *microseconds* are stored internally.
Arguments are converted to those units:

- A millisecond is converted to 1000 microseconds.
- A minute is converted to 60 seconds.
- An hour is converted to 3600 seconds.
- A week is converted to 7 days.

and days, seconds and microseconds are then normalized so that the
representation is unique, with

- `0 <= microseconds < 1000000`
- `0 <= seconds < 3600*24` (the number of seconds in one day)
- `-999999999 <= days <= 999999999`

The following example illustrates how any arguments besides
*days*, *seconds* and *microseconds* are "merged" and normalized into those
three resulting attributes:

```
>>> import datetime as dt
>>> delta = dt.timedelta(
...     days=50,
...     seconds=27,
...     microseconds=10,
...     milliseconds=29000,
...     minutes=5,
...     hours=8,
...     weeks=2
... )
>>> # Only days, seconds, and microseconds remain
>>> delta
datetime.timedelta(days=64, seconds=29156, microseconds=10)
```

> **Tip:** `import datetime as dt` instead of `import datetime` or
> `from datetime import datetime` to avoid confusion between the module
> and the class. See `How I Import Python’s datetime Module
> <https://adamj.eu/tech/2019/09/12/how-i-import-pythons-datetime-module/>`__.

If any argument is a float and there are fractional microseconds,
the fractional microseconds left over from all arguments are
combined and their sum is rounded to the nearest microsecond using
round-half-to-even tiebreaker. If no argument is a float, the
conversion and normalization processes are exact (no information is
lost).

If the normalized value of days lies outside the indicated range,
`OverflowError` is raised.

Note that normalization of negative values may be surprising at first. For
example:

```
>>> import datetime as dt
>>> d = dt.timedelta(microseconds=-1)
>>> (d.days, d.seconds, d.microseconds)
(-1, 86399, 999999)
```

Since the string representation of `timedelta` objects can be confusing,
use the following recipe to produce a more readable format:

```pycon
>>> def pretty_timedelta(td):
...     if td.days >= 0:
...         return str(td)
...     return f'-({-td!s})'
...
>>> d = timedelta(hours=-1)
>>> str(d)  # not human-friendly
'-1 day, 23:00:00'
>>> pretty_timedelta(d)
'-(1:00:00)'
```

Class attributes:

### `timedelta.min`

The most negative `timedelta` object, `timedelta(-999999999)`.

### `timedelta.max`

The most positive `timedelta` object, ``timedelta(days=999999999,
hours=23, minutes=59, seconds=59, microseconds=999999)``.

### `timedelta.resolution`

The smallest possible difference between non-equal `timedelta` objects,
`timedelta(microseconds=1)`.

Note that, because of normalization, `timedelta.max` is greater than `-timedelta.min`.
`-timedelta.max` is not representable as a `timedelta` object.

Instance attributes (read-only):

### `timedelta.days`

Between -999,999,999 and 999,999,999 inclusive.

### `timedelta.seconds`

Between 0 and 86,399 inclusive.

> **Caution:** It is a somewhat common bug for code to unintentionally use this attribute
> when it is actually intended to get a `total_seconds()`
> value instead:
>
>
> ```python
>
> >>> import datetime as dt
> >>> duration = dt.timedelta(seconds=11235813)
> >>> duration.days, duration.seconds
> (130, 3813)
> >>> duration.total_seconds()
> 11235813.0
> ```
>

### `timedelta.microseconds`

Between 0 and 999,999 inclusive.

Supported operations:

```text
+--------------------------------+-----------------------------------------------+
| Operation                      | Result                                        |
+================================+===============================================+
| ``t1 = t2 + t3``               | Sum of ``t2`` and ``t3``.                     |
|                                | Afterwards ``t1 - t2 == t3`` and              |
|                                | ``t1 - t3 == t2`` are true. (1)               |
+--------------------------------+-----------------------------------------------+
| ``t1 = t2 - t3``               | Difference of ``t2``  and ``t3``. Afterwards  |
|                                | ``t1 == t2 - t3`` and ``t2 == t1 + t3`` are   |
|                                | true. (1)(6)                                  |
+--------------------------------+-----------------------------------------------+
| ``t1 = t2 * i or t1 = i * t2`` | Delta multiplied by an integer.               |
|                                | Afterwards ``t1 // i == t2`` is true,         |
|                                | provided ``i != 0``.                          |
+--------------------------------+-----------------------------------------------+
|                                | In general, ``t1  * i == t1 * (i-1) + t1``    |
|                                | is true. (1)                                  |
+--------------------------------+-----------------------------------------------+
| ``t1 = t2 * f or t1 = f * t2`` | Delta multiplied by a float. The result is    |
|                                | rounded to the nearest multiple of            |
|                                | timedelta.resolution using round-half-to-even.|
+--------------------------------+-----------------------------------------------+
| ``f = t2 / t3``                | Division (3) of overall duration ``t2`` by    |
|                                | interval unit ``t3``. Returns a :class:`float`|
|                                | object.                                       |
+--------------------------------+-----------------------------------------------+
| ``t1 = t2 / f or t1 = t2 / i`` | Delta divided by a float or an int. The result|
|                                | is rounded to the nearest multiple of         |
|                                | timedelta.resolution using round-half-to-even.|
+--------------------------------+-----------------------------------------------+
| ``t1 = t2 // i`` or            | The floor is computed and the remainder (if   |
| ``t1 = t2 // t3``              | any) is thrown away. In the second case, an   |
|                                | integer is returned. (3)                      |
+--------------------------------+-----------------------------------------------+
| ``t1 = t2 % t3``               | The remainder is computed as a                |
|                                | :class:`timedelta` object. (3)                |
+--------------------------------+-----------------------------------------------+
| ``q, r = divmod(t1, t2)``      | Computes the quotient and the remainder:      |
|                                | ``q = t1 // t2`` (3) and ``r = t1 % t2``.     |
|                                | ``q`` is an integer and ``r`` is a            |
|                                | :class:`timedelta` object.                    |
+--------------------------------+-----------------------------------------------+
| ``+t1``                        | Returns a :class:`timedelta` object with the  |
|                                | same value. (2)                               |
+--------------------------------+-----------------------------------------------+
| ``-t1``                        | Equivalent to ``timedelta(-t1.days,           |
|                                | -t1.seconds, -t1.microseconds)``,             |
|                                | and to ``t1 * -1``. (1)(4)                    |
+--------------------------------+-----------------------------------------------+
| ``abs(t)``                     | Equivalent to ``+t`` when ``t.days >= 0``,    |
|                                | and to ``-t`` when ``t.days < 0``. (2)        |
+--------------------------------+-----------------------------------------------+
| ``str(t)``                     | Returns a string in the form                  |
|                                | ``[D day[s], ][H]H:MM:SS[.UUUUUU]``, where D  |
|                                | is negative for negative ``t``. (5)           |
+--------------------------------+-----------------------------------------------+
| ``repr(t)``                    | Returns a string representation of the        |
|                                | :class:`timedelta` object as a constructor    |
|                                | call with canonical attribute values.         |
+--------------------------------+-----------------------------------------------+
```

Notes:

(1)
This is exact but may overflow.

(2)
This is exact and cannot overflow.

(3)
Division by zero raises `ZeroDivisionError`.

(4)
`-timedelta.max` is not representable as a `timedelta` object.

(5)
String representations of `timedelta` objects are normalized
similarly to their internal representation. This leads to somewhat
unusual results for negative timedeltas. For example:

```
>>> timedelta(hours=-5)
datetime.timedelta(days=-1, seconds=68400)
>>> print(_)
-1 day, 19:00:00
```

(6)
The expression `t2 - t3` will always be equal to the expression `t2 + (-t3)` except
when t3 is equal to `timedelta.max`; in that case the former will produce a result
while the latter will overflow.

In addition to the operations listed above, `timedelta` objects support
certain additions and subtractions with `date` and `.datetime`
objects (see below).

> *Changed in version 3.2.*
> Floor division and true division of a `timedelta` object by another
> `timedelta` object are now supported, as are remainder operations and
> the `divmod()` function. True division and multiplication of a
> `timedelta` object by a `float` object are now supported.

`timedelta` objects support equality and order comparisons.

In Boolean contexts, a `timedelta` object is
considered to be true if and only if it isn't equal to `timedelta(0)`.

Instance methods:

### `timedelta.total_seconds()`

Return the total number of seconds contained in the duration. Equivalent to
`td / timedelta(seconds=1)`. For interval units other than seconds, use the
division form directly (for example, `td / timedelta(microseconds=1)`).

Note that for very large time intervals (greater than 270 years on
most platforms) this method will lose microsecond accuracy.

> *Added in version 3.2.*

### Examples of usage: `timedelta`

An additional example of normalization:

```
>>> # Components of another_year add up to exactly 365 days
>>> import datetime as dt
>>> year = dt.timedelta(days=365)
>>> another_year = dt.timedelta(weeks=40, days=84, hours=23,
...                             minutes=50, seconds=600)
>>> year == another_year
True
>>> year.total_seconds()
31536000.0
```

Examples of `timedelta` arithmetic:

```
>>> import datetime as dt
>>> year = dt.timedelta(days=365)
>>> ten_years = 10 * year
>>> ten_years
datetime.timedelta(days=3650)
>>> ten_years.days // 365
10
>>> nine_years = ten_years - year
>>> nine_years
datetime.timedelta(days=3285)
>>> three_years = nine_years // 3
>>> three_years, three_years.days // 365
(datetime.timedelta(days=1095), 3)
```
