---
title: "locale --- Internationalization services (part 1 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/locale.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `locale` --- Internationalization services

Module `locale`.

**Source code:** Lib/locale.py

The `locale` module opens access to the POSIX locale database and
functionality. The POSIX locale mechanism allows programmers to deal with
certain cultural issues in an application, without requiring the programmer to
know all the specifics of each country where the software is executed.

The `locale module is implemented on top of the locale` module,
which in turn uses an ANSI C locale implementation if available.

The `locale` module defines the following exception and functions:

### exception `Error`

Exception raised when the locale passed to `setlocale()` is not
recognized.

### `setlocale(category, locale=None)`

If *locale* is given and not `None`, `setlocale()` modifies the locale
setting for the *category*. The available categories are listed in the data
description below. *locale* may be a string, or a pair,
language code and encoding. An empty string specifies the user's
default settings. If the modification of the locale fails, the exception
`Error` is raised. If successful, the new locale setting is returned.

If *locale* is a pair, it is converted to a locale name using
the locale aliasing engine.
The language code has the same format as a locale name,
but without encoding.
The language code and encoding can be `None`.

If *locale* is omitted or `None`, the current setting for *category* is
returned.

Example:

```
>>> import locale
>>> loc = locale.setlocale(locale.LC_ALL)  # get current locale
# use German locale; name and availability varies with platform
>>> locale.setlocale(locale.LC_ALL, 'de_DE.UTF-8')
>>> locale.strcoll('f\xe4n', 'foo')  # compare a string containing an umlaut
>>> locale.setlocale(locale.LC_ALL, '')   # use user's preferred locale
>>> locale.setlocale(locale.LC_ALL, 'C')  # use default (C) locale
>>> locale.setlocale(locale.LC_ALL, loc)  # restore saved locale
```

`setlocale()` is not thread-safe on most systems. Applications typically
start with a call of:

```
import locale
locale.setlocale(locale.LC_ALL, '')
```

This sets the locale for all categories to the user's default setting (typically
specified in the `LANG` environment variable).  If the locale is not
changed thereafter, using multithreading should not cause problems.

> *Changed in version 3.15.*
> Support language codes with `@`-modifiers.

### `localeconv()`

Returns the database of the local conventions as a dictionary. This dictionary
has the following strings as keys:

```text
+----------------------+-------------------------------------+--------------------------------+
| Category             | Key                                 | Meaning                        |
+======================+=====================================+================================+
| :const:`LC_NUMERIC`  | ``'decimal_point'``                 | Decimal point character.       |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'grouping'``                      | Sequence of numbers specifying |
|                      |                                     | which relative positions the   |
|                      |                                     | ``'thousands_sep'`` is         |
|                      |                                     | expected.  If the sequence is  |
|                      |                                     | terminated with                |
|                      |                                     | :const:`CHAR_MAX`, no further  |
|                      |                                     | grouping is performed. If the  |
|                      |                                     | sequence terminates with a     |
|                      |                                     | ``0``,  the last group size is |
|                      |                                     | repeatedly used.               |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'thousands_sep'``                 | Character used between groups. |
+----------------------+-------------------------------------+--------------------------------+
| :const:`LC_MONETARY` | ``'int_curr_symbol'``               | International currency symbol. |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'currency_symbol'``               | Local currency symbol.         |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'p_cs_precedes/n_cs_precedes'``   | Whether the currency symbol    |
|                      |                                     | precedes the value (for        |
|                      |                                     | positive resp. negative        |
|                      |                                     | values).                       |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'p_sep_by_space/n_sep_by_space'`` | Whether the currency symbol is |
|                      |                                     | separated from the value  by a |
|                      |                                     | space (for positive resp.      |
|                      |                                     | negative values).              |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'mon_decimal_point'``             | Decimal point used for         |
|                      |                                     | monetary values.               |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'frac_digits'``                   | Number of fractional digits    |
|                      |                                     | used in local formatting of    |
|                      |                                     | monetary values.               |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'int_frac_digits'``               | Number of fractional digits    |
|                      |                                     | used in international          |
|                      |                                     | formatting of monetary values. |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'mon_thousands_sep'``             | Group separator used for       |
|                      |                                     | monetary values.               |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'mon_grouping'``                  | Equivalent to ``'grouping'``,  |
|                      |                                     | used for monetary values.      |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'positive_sign'``                 | Symbol used to annotate a      |
|                      |                                     | positive monetary value.       |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'negative_sign'``                 | Symbol used to annotate a      |
|                      |                                     | negative monetary value.       |
+----------------------+-------------------------------------+--------------------------------+
|                      | ``'p_sign_posn/n_sign_posn'``       | The position of the sign (for  |
|                      |                                     | positive resp. negative        |
|                      |                                     | values), see below.            |
+----------------------+-------------------------------------+--------------------------------+
```

All numeric values can be set to `CHAR_MAX` to indicate that there is no
value specified in this locale.

The possible values for `'p_sign_posn'` and `'n_sign_posn'` are given below.

```text
+--------------+-----------------------------------------+
| Value        | Explanation                             |
+==============+=========================================+
| ``0``        | Currency and value are surrounded by    |
|              | parentheses.                            |
+--------------+-----------------------------------------+
| ``1``        | The sign should precede the value and   |
|              | currency symbol.                        |
+--------------+-----------------------------------------+
| ``2``        | The sign should follow the value and    |
|              | currency symbol.                        |
+--------------+-----------------------------------------+
| ``3``        | The sign should immediately precede the |
|              | value.                                  |
+--------------+-----------------------------------------+
| ``4``        | The sign should immediately follow the  |
|              | value.                                  |
+--------------+-----------------------------------------+
| ``CHAR_MAX`` | Nothing is specified in this locale.    |
+--------------+-----------------------------------------+
```

The function temporarily sets the `LC_CTYPE` locale to the `LC_NUMERIC`
locale or the `LC_MONETARY` locale if locales are different and numeric or
monetary strings are non-ASCII. This temporary change affects other threads.

> *Changed in version 3.7.*
> The function now temporarily sets the `LC_CTYPE` locale to the
> `LC_NUMERIC` locale in some cases.

### `nl_langinfo(option)`

Return some locale-specific information as a string.  This function is not
available on all systems, and the set of possible options might also vary
across platforms.  The possible argument values are numbers, for which
symbolic constants are available in the locale module.

The `nl_langinfo()` function accepts one of the following keys.  Most
descriptions are taken from the corresponding description in the GNU C
library.

### `CODESET`

Get a string with the name of the character encoding used in the
selected locale.

### `D_T_FMT`

Get a string that can be used as a format string for `time.strftime()` to
represent date and time in a locale-specific way.

### `D_FMT`

Get a string that can be used as a format string for `time.strftime()` to
represent a date in a locale-specific way.

### `T_FMT`

Get a string that can be used as a format string for `time.strftime()` to
represent a time in a locale-specific way.

### `T_FMT_AMPM`

Get a format string for `time.strftime()` to represent time in the am/pm
format.

### `DAY_1`

```python
DAY_2
DAY_3
DAY_4
DAY_5
DAY_6
DAY_7
```

Get the name of the n-th day of the week.

> **Note:** This follows the US convention of `DAY_1` being Sunday, not the
> international convention (ISO 8601) that Monday is the first day of the
> week.

### `ABDAY_1`

```python
ABDAY_2
ABDAY_3
ABDAY_4
ABDAY_5
ABDAY_6
ABDAY_7
```

Get the abbreviated name of the n-th day of the week.

### `MON_1`

```python
MON_2
MON_3
MON_4
MON_5
MON_6
MON_7
MON_8
MON_9
MON_10
MON_11
MON_12
```

Get the name of the n-th month.

### `ABMON_1`

```python
ABMON_2
ABMON_3
ABMON_4
ABMON_5
ABMON_6
ABMON_7
ABMON_8
ABMON_9
ABMON_10
ABMON_11
ABMON_12
```

Get the abbreviated name of the n-th month.

### `RADIXCHAR`

Get the radix character (decimal dot, decimal comma, etc.).

### `THOUSEP`

Get the separator character for thousands (groups of three digits).

### `YESEXPR`

Get a regular expression that can be used with the regex function to
recognize a positive response to a yes/no question.

### `NOEXPR`

Get a regular expression that can be used with the `regex(3)` function to
recognize a negative response to a yes/no question.

> **Note:** The regular expressions for `YESEXPR` and
> `NOEXPR` use syntax suitable for the
> `regex` function from the C library, which might
> differ from the syntax used in `re`.

### `CRNCYSTR`

Get the currency symbol, preceded by "-" if the symbol should appear before
the value, "+" if the symbol should appear after the value, or "." if the
symbol should replace the radix character.

### `ERA`

Get a string which describes how years are counted and displayed for
each era in a locale.

Most locales do not define this value.  An example of a locale which does
define this value is the Japanese one.  In Japan, the traditional
representation of dates includes the name of the era corresponding to the
then-emperor's reign.

Normally it should not be necessary to use this value directly. Specifying
the `E` modifier in their format strings causes the `time.strftime()`
function to use this information.
The format of the returned string is specified in *The Open Group Base
Specifications Issue 8*, paragraph `7.3.5.2 LC_TIME C-Language Access
<https://pubs.opengroup.org/onlinepubs/9799919799/basedefs/V1_chap07.html#tag_07_03_05_02>`_.

### `ERA_D_T_FMT`

Get a format string for `time.strftime()` to represent date and time in a
locale-specific era-based way.

### `ERA_D_FMT`

Get a format string for `time.strftime()` to represent a date in a
locale-specific era-based way.

### `ERA_T_FMT`

Get a format string for `time.strftime()` to represent a time in a
locale-specific era-based way.

### `ALT_DIGITS`

Get a string consisting of up to 100 semicolon-separated symbols used
to represent the values 0 to 99 in a locale-specific way.
In most locales this is an empty string.

The function temporarily sets the `LC_CTYPE` locale to the locale
of the category that determines the requested value (`LC_TIME`,
`LC_NUMERIC`, `LC_MONETARY` or `LC_MESSAGES`) if locales are
different and the resulting string is non-ASCII.
This temporary change affects other threads.

> *Changed in version 3.14.*
> The function now temporarily sets the `LC_CTYPE` locale in some cases.
