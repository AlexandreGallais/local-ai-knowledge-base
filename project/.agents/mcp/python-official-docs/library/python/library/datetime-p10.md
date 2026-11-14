---
title: "datetime --- Basic date and time types (part 10 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 10 of 10)

### Technical detail

Broadly speaking, `d.strftime(fmt)` acts like the `time` module's
`time.strftime(fmt, d.timetuple())` although not all objects support a
`timetuple()` method.

For the `.datetime.strptime()` and `.date.strptime()` class methods,
the default value is `1900-01-01T00:00:00.000`: any components not specified
in the format string will be pulled from the default value.

> **Note:** Format strings without separators can be ambiguous for parsing. For
> example, with `%Y%m%d`, the string `2026111` may be parsed either as
> `2026-11-01` or as `2026-01-11`.
> Use separators to ensure the input is parsed as intended.

> **Note:** When used to parse partial dates lacking a year, `.datetime.strptime()`
> and `.date.strptime()` will raise when encountering February 29 because
> the default year of 1900 is *not* a leap year.  Always add a default leap
> year to partial date strings before parsing.

> **Note:** If a `strptime()` format string contains more than
> one directive for the same field, for example both `%Y` and `%y`,
> every directive must still match the input, but only the value of the
> last one is used. For example, parsing `200099` with `%Y%y` gives
> the year 1999. Repeating the same directive, like `%Y%Y`, raises an error.

```python

>>> import datetime as dt
>>> value = "2/29"
>>> dt.datetime.strptime(value, "%m/%d")
Traceback (most recent call last):
...
ValueError: day 29 must be in range 1..28 for month 2 in year 1900
>>> dt.datetime.strptime(f"1904 {value}", "%Y %m/%d")
datetime.datetime(1904, 2, 29, 0, 0)
```

Using `datetime.strptime(date_string, format)` is equivalent to:

```
datetime(*(time.strptime(date_string, format)[0:6]))
```

except when the format includes sub-second components or time zone offset
information, which are supported in `datetime.strptime` but are discarded by
`time.strptime`.

For `.time` objects, the format codes for year, month, and day should not
be used, as `time` objects have no such values. If they're used anyway,
1900 is substituted for the year, and 1 for the month and day.

For `date` objects, the format codes for hours, minutes, seconds, and
microseconds should not be used, as `date` objects have no such
values. If they're used anyway, 0 is substituted for them.

For the same reason, handling of format strings containing Unicode code points
that can't be represented in the charset of the current locale is also
platform-dependent. On some platforms such code points are preserved intact in
the output, while on others `strftime` may raise `UnicodeError` or return
an empty string instead.

Notes:

(0)
This format code is currently unsupported by `strptime()`.

(1)
Because the format depends on the current locale, care should be taken when
making assumptions about the output value. Field orderings will vary (for
example, "month/day/year" versus "day/month/year"), and the output may
contain non-ASCII characters.

(2)
The `strptime()` method can parse years in the full [1, 9999] range, but
years < 1000 must be zero-filled to 4-digit width.

> *Changed in version 3.2.*
> In previous versions, `strftime()` method was restricted to
> years >= 1900.

> *Changed in version 3.3.*
> In version 3.2, `strftime()` method was restricted to
> years >= 1000.

(3)
When used with the `strptime()` method, the `%p` directive only affects
the output hour field if the `%I` directive is used to parse the hour.

(4)
Unlike the `time` module, the `datetime` module does not support
leap seconds.

(5)
When used with the `strptime()` method, the `%f` directive
accepts from one to six digits and zero pads on the right. `%f` is
an extension to the set of format characters in the C standard (but
implemented separately in datetime objects, and therefore always
available).

(6)
For a naive object, the `%z`, `%:z` and `%Z` format codes are replaced
by empty strings.

For an aware object:

`%z`
`utcoffset()` is transformed into a string of the form
`±HHMM[SS[.ffffff]]`, where `HH` is a 2-digit string giving the number
of UTC offset hours, `MM` is a 2-digit string giving the number of UTC
offset minutes, `SS` is a 2-digit string giving the number of UTC offset
seconds and `ffffff` is a 6-digit string giving the number of UTC
offset microseconds. The `ffffff` part is omitted when the offset is a
whole number of seconds and both the `ffffff` and the `SS` part is
omitted when the offset is a whole number of minutes. For example, if
`utcoffset()` returns `timedelta(hours=-3, minutes=-30)`, `%z` is
replaced with the string `'-0330'`.

> *Changed in version 3.7.*
> The UTC offset is not restricted to a whole number of minutes.

> *Changed in version 3.7.*
> When the `%z` directive is provided to the  `strptime()` method,
> the UTC offsets can have a colon as a separator between hours, minutes
> and seconds.
> For example, both `'+010000'` and `'+01:00:00'` will be parsed as an offset
> of one hour. In addition, providing `'Z'` is identical to `'+00:00'`.

`%:z`
When used with `strftime()`, behaves exactly as `%z`,
except that a colon separator is added between hours, minutes and seconds.

When used with `strptime()`, the UTC offset is *required*
to have a colon as a separator between hours, minutes and seconds.
For example, `'+01:00:00'` (but *not* `'+010000'`) will be parsed as
an offset of one hour. In addition, providing `'Z'` is identical to
`'+00:00'`.

`%Z`
In `strftime()`, `%Z` is replaced by an empty string if
`tzname()` returns `None`; otherwise `%Z` is replaced by the
returned value, which must be a string.

`strptime()` only accepts certain values for `%Z`:

1. any value in `time.tzname` for your machine's locale
1. the hard-coded values `UTC` and `GMT`

So someone living in Japan may have `JST`, `UTC`, and `GMT` as
valid values, but probably not `EST`. It will raise `ValueError` for
invalid values.

> *Changed in version 3.2.*
> When the `%z` directive is provided to the `strptime()` method, an
> aware `.datetime` object will be produced. The `tzinfo` of the
> result will be set to a `timezone` instance.

(7)
When used with the `strptime()` method, `%U` and `%W` are only used
in calculations when the day of the week and the calendar year (`%Y`)
are specified.

(8)
Similar to `%U` and `%W`, `%V` is only used in calculations when the
day of the week and the ISO year (`%G`) are specified in a
`strptime()` format string. Also note that `%G` and `%Y` are not
interchangeable.

(9)
When used with the `strptime()` method, the leading zero is optional
for  formats `%d`, `%m`, `%H`, `%I`, `%M`, `%S`, `%j`, `%U`,
`%W`, and `%V`. Format `%y` does require a leading zero.

(10)
When parsing a month and day using `strptime()`, always
include a year in the format.  If the value you need to parse lacks a year,
append an explicit dummy leap year.  Otherwise your code will raise an
exception when it encounters leap day because the default year used by the
parser (1900) is not a leap year.  Users run into that bug every leap year.

```python

>>> month_day = "02/29"
>>> dt.datetime.strptime(f"{month_day};1984", "%m/%d;%Y")  # No leap year bug.
datetime.datetime(1984, 2, 29, 0, 0)
```

> *Changed in version 3.15.*
> Using `%d` without a year now raises `ValueError`.

> *Deprecated since version 3.15, removed in version 3.17.*
> `strptime()` calls using a format string containing
> `%e` without a year now emit a `DeprecationWarning`.

**Footnotes**
