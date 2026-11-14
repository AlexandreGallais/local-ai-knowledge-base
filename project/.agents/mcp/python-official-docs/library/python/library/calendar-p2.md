---
title: "calendar --- General calendar-related functions (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/calendar.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# calendar --- General calendar-related functions (part 2 of 2)

### `month_name`

A sequence that represents the months of the year in the current locale.  This
follows normal convention of January being month number 1, so it has a length of
13 and `month_name[0]` is the empty string.

```python
>>> import calendar
>>> list(calendar.month_name)
['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
```

> **Caution:** In locales with alternative month names forms, the `month_name` sequence
> may not be suitable when a month name stands by itself and not as part of a date.
> For instance, in Greek and in many Slavic and Baltic languages, `month_name`
> will produce the month in genitive case. Use `standalone_month_name` for a form
> suitable for standalone use.

### `month_abbr`

A sequence that represents the abbreviated months of the year in the current
locale.  This follows normal convention of January being month number 1, so it
has a length of 13 and  `month_abbr[0]` is the empty string.

```python
>>> import calendar
>>> list(calendar.month_abbr)
['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
```

> **Caution:** In locales with alternative month names forms, the `month_abbr` sequence
> may not be suitable when a month name stands by itself and not as part of a date.
> Use `standalone_month_abbr` for a form suitable for standalone use.

### `standalone_month_name`

A sequence that represents the months of the year in the current locale
in the standalone form if the locale provides one. Else it is equivalent
to `month_name`.

> *Added in version 3.15.*

### `standalone_month_abbr`

A sequence that represents the abbreviated months of the year in the current
locale in the standalone form if the locale provides one. Else it is
equivalent to `month_abbr`.

> *Added in version 3.15.*

### `JANUARY`

```python
FEBRUARY
MARCH
APRIL
MAY
JUNE
JULY
AUGUST
SEPTEMBER
OCTOBER
NOVEMBER
DECEMBER
```

Aliases for the months of the year,
where `JANUARY` is `1` and `DECEMBER` is `12`.

> *Added in version 3.12.*

### class `Month`

Enumeration defining months of the year as integer constants.
The members of this enumeration are exported to the module scope as
`JANUARY` through `DECEMBER`.

> *Added in version 3.12.*

The `calendar` module defines the following exceptions:

### exception `IllegalMonthError(month)`

A subclass of `ValueError` and `IndexError`,
raised when the given month number is outside of the range 1-12 (inclusive).

> *Changed in version 3.12.*
> `IllegalMonthError` is now also a subclass of
> `ValueError`. New code should avoid catching
> `IndexError`.

### `month`

The invalid month number.

### exception `IllegalWeekdayError(weekday)`

A subclass of `ValueError`,
raised when the given weekday number is outside of the range 0-6 (inclusive).

### `weekday`

The invalid weekday number.

> **See also:** Module `datetime`
> Object-oriented interface to dates and times with similar functionality to the
> `time` module.
>
> Module `time`
> Low-level time related functions.

## Command-line usage

> *Added in version 2.5.*

The `calendar` module can be executed as a script from the command line
to interactively print a calendar.

```shell
python -m calendar [-h] [-L LOCALE] [-e ENCODING] [-t {text,html}]
                   [-w WIDTH] [-l LINES] [-s SPACING] [-m MONTHS] [-c CSS]
                   [-f FIRST_WEEKDAY] [year] [month]
```

For example, to print a calendar for the year 2000:

```console
$ python -m calendar 2000
                                  2000

      January                   February                   March
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                1  2          1  2  3  4  5  6             1  2  3  4  5
 3  4  5  6  7  8  9       7  8  9 10 11 12 13       6  7  8  9 10 11 12
10 11 12 13 14 15 16      14 15 16 17 18 19 20      13 14 15 16 17 18 19
17 18 19 20 21 22 23      21 22 23 24 25 26 27      20 21 22 23 24 25 26
24 25 26 27 28 29 30      28 29                     27 28 29 30 31
31

       April                      May                       June
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                1  2       1  2  3  4  5  6  7                1  2  3  4
 3  4  5  6  7  8  9       8  9 10 11 12 13 14       5  6  7  8  9 10 11
10 11 12 13 14 15 16      15 16 17 18 19 20 21      12 13 14 15 16 17 18
17 18 19 20 21 22 23      22 23 24 25 26 27 28      19 20 21 22 23 24 25
24 25 26 27 28 29 30      29 30 31                  26 27 28 29 30

        July                     August                  September
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                1  2          1  2  3  4  5  6                   1  2  3
 3  4  5  6  7  8  9       7  8  9 10 11 12 13       4  5  6  7  8  9 10
10 11 12 13 14 15 16      14 15 16 17 18 19 20      11 12 13 14 15 16 17
17 18 19 20 21 22 23      21 22 23 24 25 26 27      18 19 20 21 22 23 24
24 25 26 27 28 29 30      28 29 30 31               25 26 27 28 29 30
31

      October                   November                  December
Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su      Mo Tu We Th Fr Sa Su
                   1             1  2  3  4  5                   1  2  3
 2  3  4  5  6  7  8       6  7  8  9 10 11 12       4  5  6  7  8  9 10
 9 10 11 12 13 14 15      13 14 15 16 17 18 19      11 12 13 14 15 16 17
16 17 18 19 20 21 22      20 21 22 23 24 25 26      18 19 20 21 22 23 24
23 24 25 26 27 28 29      27 28 29 30               25 26 27 28 29 30 31
30 31
```

The following options are accepted:

calendar

### option `--help, -h`

Show the help message and exit.

### option `--locale LOCALE, -L LOCALE`

The locale to use for month and weekday names.
Defaults to English.

### option `--encoding ENCODING, -e ENCODING`

The encoding to use for output.
`--encoding` is required if `--locale` is set.

### option `--type {text,html}, -t {text,html}`

Print the calendar to the terminal as text,
or as an HTML document.

### option `--first-weekday FIRST_WEEKDAY, -f FIRST_WEEKDAY`

The weekday to start each week.
Must be a number between 0 (Monday) and 6 (Sunday).
Defaults to 0.

> *Added in version 3.13.*

### option `year`

The year to print the calendar for.
Defaults to the current year.

### option `month`

The month of the specified `year` to print the calendar for.
Must be a number between 1 and 12.
Defaults to printing a calendar for the full year.

*Text-mode options:*

### option `--width WIDTH, -w WIDTH`

The width of the date column in terminal columns.
The date is printed centred in the column.
Any value lower than 2 is ignored.
Defaults to 2.

### option `--lines LINES, -l LINES`

The number of lines for each week in terminal rows.
The date is printed top-aligned.
Any value lower than 1 is ignored.
Defaults to 1.

### option `--spacing SPACING, -s SPACING`

The space between months in columns.
Any value lower than 2 is ignored.
Defaults to 6.

### option `--months MONTHS, -m MONTHS`

The number of months printed per row.
Defaults to 3.

> *Changed in version 3.14.*
> By default, today's date is highlighted in color and can be
> controlled using environment variables.

> *Changed in version 3.15.*
> By default, the month is now also highlighted in color, and
> the days of the week are also in color. This behavior can be
> controlled using environment variables.

*HTML-mode options:*

### option `--css CSS, -c CSS`

The path of a CSS stylesheet to use for the calendar.
This must either be relative to the generated HTML,
or an absolute HTTP or `file:///` URL.
