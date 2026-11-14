---
title: "datetime --- Basic date and time types (part 9 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 9 of 10)

### `strftime()` and `strptime()` format codes

These methods accept format codes that can be used to parse and format dates:

```
>>> import datetime as dt
>>> dt.datetime.strptime('31/01/22 23:59:59.999999',
...                      '%d/%m/%y %H:%M:%S.%f')
datetime.datetime(2022, 1, 31, 23, 59, 59, 999999)
>>> _.strftime('%a %d %b %Y, %I:%M%p')
'Mon 31 Jan 2022, 11:59PM'
```

The following is a list of all the format codes that the 2011 C standard
requires, and these work on all supported platforms.

```text
+-----------+--------------------------------+------------------------+-------+
| Directive |           Meaning              |        Example         | Notes |
|           |                                |                        |       |
+===========+================================+========================+=======+
|  ``%a``   | Weekday as locale's            || Sun, Mon, ..., Sat    | \(1)  |
|           | abbreviated name.              |  (en_US);              |       |
|           |                                || So, Mo, ..., Sa       |       |
|           |                                |  (de_DE)               |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%A``   | Weekday as locale's full name. || Sunday, Monday, ...,  | \(1)  |
|           |                                |  Saturday (en_US);     |       |
|           |                                || Sonntag, Montag, ..., |       |
|           |                                |  Samstag (de_DE)       |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%b``   | Month as locale's abbreviated  || Jan, Feb, ..., Dec    | \(1)  |
|           | name.                          |  (en_US);              |       |
|           |                                || Jan, Feb, ..., Dez    |       |
|           |                                |  (de_DE)               |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%B``   | Month as locale's full name.   || January, February,    | \(1)  |
|           |                                |  ..., December (en_US);|       |
|           |                                || Januar, Februar, ..., |       |
|           |                                |  Dezember (de_DE)      |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%c``   | Locale's appropriate date and  || Tue Aug 16 21:30:00   | \(1)  |
|           | time representation.           |  1988 (en_US);         |       |
|           |                                || Di 16 Aug 21:30:00    |       |
|           |                                |  1988 (de_DE)          |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%C``   | The year divided by 100 and    | 01, 02, ..., 99        | \(0)  |
|           | truncated to an integer as a   |                        |       |
|           | zero-padded decimal number.    |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%d``   | Day of the month as a          | 01, 02, ..., 31        | \(9), |
|           | zero-padded decimal number.    |                        | \(10) |
+-----------+--------------------------------+------------------------+-------+
|  ``%D``   | Equivalent to ``%m/%d/%y``.    | 11/28/25               | \(9)  |
|           |                                |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%e``   | The day of the month as a      | ␣1, ␣2, ..., 31        | \(10) |
|           | space-padded decimal number.   |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%F``   | Equivalent to ``%Y-%m-%d``,    | 2025-10-11,            |       |
|           | the ISO 8601 format.           | 1001-12-30             |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%g``   | Last 2 digits of ISO 8601 year | 00, 01, ..., 99        | \(0)  |
|           | representing the year that     |                        |       |
|           | contains the greater part of   |                        |       |
|           | the ISO week (``%V``).         |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%G``   | ISO 8601 year with century     | 0001, 0002, ..., 2013, | \(8)  |
|           | representing the year that     | 2014, ..., 9998, 9999  |       |
|           | contains the greater part of   |                        |       |
|           | the ISO week (``%V``).         |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%h``   | Equivalent to ``%b``.          | See ``%b``.            | \(0)  |
+-----------+--------------------------------+------------------------+-------+
|  ``%H``   | Hour (24-hour clock) as a      | 00, 01, ..., 23        | \(9)  |
|           | zero-padded decimal number.    |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%I``   | Hour (12-hour clock) as a      | 01, 02, ..., 12        | \(9)  |
|           | zero-padded decimal number.    |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%j``   | Day of the year as a           | 001, 002, ..., 366     | \(9)  |
|           | zero-padded decimal number.    |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%m``   | Month as a zero-padded         | 01, 02, ..., 12        | \(9)  |
|           | decimal number.                |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%M``   | Minute as a zero-padded        | 00, 01, ..., 59        | \(9)  |
|           | decimal number.                |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%n``   | The newline character          | ``\n``                 |       |
|           | (``'\n'``). For                |                        |       |
|           | :meth:`!strptime`, zero or     |                        |       |
|           | more whitespace.               |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%p``   | Locale's equivalent of either  || AM, PM (en_US);       | \(1), |
|           | AM or PM.                      || am, pm (de_DE)        | \(3)  |
+-----------+--------------------------------+------------------------+-------+
|  ``%r``   | Locale's 12-hour clock time.   | 12:00:00 AM            | \(1), |
|           |                                |                        | \(0)  |
+-----------+--------------------------------+------------------------+-------+
|  ``%R``   | Equivalent to ``%H:%M``.       | 10:01                  |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%S``   | Second as a zero-padded        | 00, 01, ..., 59        | \(4), |
|           | decimal number.                |                        | \(9)  |
+-----------+--------------------------------+------------------------+-------+
|  ``%t``   | The tab character (``'\t'``).  | ``\t``                 |       |
|           | For :meth:`!strptime`,         |                        |       |
|           | zero or more whitespace.       |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%T``   | ISO 8601 time format,          | 10:01:59               |       |
|           | equivalent to ``%H:%M:%S``.    |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%u``   | ISO 8601 weekday as a decimal  | 1, 2, ..., 7           |       |
|           | number where 1 is Monday.      |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%U``   | Week number of the year        | 00, 01, ..., 53        | \(7), |
|           | (Sunday as the first day of    |                        | \(9)  |
|           | the week) as a zero-padded     |                        |       |
|           | decimal number. All days in a  |                        |       |
|           | new year preceding the first   |                        |       |
|           | Sunday are considered to be in |                        |       |
|           | week 0.                        |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%V``   | ISO 8601 week as a decimal     | 01, 02, ..., 53        | \(8), |
|           | number with Monday as          |                        | \(9)  |
|           | the first day of the week.     |                        |       |
|           | Week 01 is the week containing |                        |       |
|           | Jan 4.                         |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%w``   | Weekday as a decimal number,   | 0, 1, ..., 6           |       |
|           | where 0 is Sunday and 6 is     |                        |       |
|           | Saturday.                      |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%W``   | Week number of the year        | 00, 01, ..., 53        | \(7), |
|           | (Monday as the first day of    |                        | \(9)  |
|           | the week) as a zero-padded     |                        |       |
|           | decimal number. All days in a  |                        |       |
|           | new year preceding the first   |                        |       |
|           | Monday are considered to be in |                        |       |
|           | week 0.                        |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%x``   | Locale's appropriate date      || 08/16/88 (None);      | \(1)  |
|           | representation.                || 08/16/1988 (en_US);   |       |
|           |                                || 16.08.1988 (de_DE)    |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%X``   | Locale's appropriate time      || 21:30:00 (en_US);     | \(1)  |
|           | representation.                || 21:30:00 (de_DE)      |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%y``   | Year without century as a      | 00, 01, ..., 99        | \(9)  |
|           | zero-padded decimal number.    |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%Y``   | Year with century as a decimal | 0001, 0002, ..., 2013, | \(2)  |
|           | number.                        | 2014, ..., 9998, 9999  |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%z``   | UTC offset in the form         | (empty), +0000,        | \(6)  |
|           | ``±HHMM[SS[.ffffff]]`` (empty  | -0400, +1030,          |       |
|           | string if the object is        | +063415,               |       |
|           | naive).                        | -030712.345216         |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%Z``   | Time zone name (empty string   | (empty), UTC, GMT      | \(6)  |
|           | if the object is naive).       |                        |       |
+-----------+--------------------------------+------------------------+-------+
|  ``%%``   | A literal ``'%'`` character.   | %                      |       |
+-----------+--------------------------------+------------------------+-------+
```

The ISO 8601 year and ISO 8601 week directives are not interchangeable
with the year and week number directives above. Calling `strptime()` with
incomplete or ambiguous ISO 8601 directives will raise a `ValueError`.

Several additional directives not required by the C11 standard are included for
convenience.

```text
+-----------+--------------------------------+------------------------+-------+
| Directive | Meaning                        | Example                | Notes |
+===========+================================+========================+=======+
|  ``%f``   | Microsecond as a decimal       | 000000, 000001, ...,   | \(5)  |
|           | number, zero-padded to 6       | 999999                 |       |
|           | digits.                        |                        |       |
+-----------+--------------------------------+------------------------+-------+
| ``%:z``   | UTC offset in the form         | (empty), +00:00,       | \(6)  |
|           | ``±HH:MM[:SS[.ffffff]]``       | -04:00, +10:30,        |       |
|           | (empty string if the object is | +06:34:15,             |       |
|           | naive).                        | -03:07:12.345216       |       |
+-----------+--------------------------------+------------------------+-------+
```

The full set of format codes supported varies across platforms, because Python
calls the platform C library's `strftime` function, and platform
variations are common. To see the full set of format codes supported on your
platform, consult the strftime(3) documentation. There are also
differences between platforms in handling of unsupported format specifiers.

> *Added in version 3.6.*
> `%G`, `%u` and `%V` were added.

> *Added in version 3.12.*
> `%:z` was added for `strftime()`.

> *Added in version 3.15.*
> `%D`, `%F`, `%n`, `%t`, and `%:z` were added for
> `strptime()`.
