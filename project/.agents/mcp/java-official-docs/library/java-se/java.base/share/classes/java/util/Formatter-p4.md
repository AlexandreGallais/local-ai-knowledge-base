---
title: "Formatter class (java.util) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Formatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Formatter class (java.util) (part 4 of 5)

If *m* is less than 10-4 or greater than or equal to
    10precision, then it is represented in *computerized scientific notation*.

 The total number of significant digits in *m* is equal to the
    precision.  If the precision is not specified, then the default value is
    `6`.  If the precision is `0`, then it is taken to be
    `1`.

 If the `'#'` flag is given then an `FormatFlagsConversionMismatchException` will be thrown.

 `'G'`
     `'\u0047'`
     The upper-case variant of `'g'`.

 `'f'`
     `'\u0066'`
     Requires the output to be formatted using decimal
    format.  The localization algorithm is
    applied.

 The result is a string that represents the sign and magnitude
    (absolute value) of the argument.  The formatting of the sign is
    described in the localization
    algorithm. The formatting of the magnitude *m* depends upon its
    value.

 The magnitude is formatted as the integer part of *m*, with no
    leading zeroes, followed by the decimal separator followed by one or
    more decimal digits representing the fractional part of *m*.

 The number of digits in the result for the fractional part of
    *m* or *a* is equal to the precision. If the precision is not
    specified then the default value is `6`.  If the precision is
    less than the number of digits to the right of the decimal point
    then the value will be rounded using the
    round half up algorithm.  Otherwise, zeros may be appended to reach the precision.
    For a canonical representation of the value, use `BigDecimal.toString()`.

 All flags defined for Byte, Short, Integer, and
Long apply.

 If the `'#'` flag is given, then the decimal separator will
always be present.

 The default behavior when no flags are
given is the same as for Float and Double.

 The specification of width and precision is the same as defined for Float and
Double.

#### Date/Time

 This conversion may be applied to `long`, `Long`, `Calendar`, `Date` and TemporalAccessor

DTConv

 Conversion
     Unicode
     Description

 `'t'`
     `'\u0074'`
     Prefix for date and time conversion characters.
 `'T'`
     `'\u0054'`
     The upper-case variant of `'t'`.

 The following date and time conversion character suffixes are defined
for the `'t'` and `'T'` conversions.  The types are similar to
but not completely identical to those defined by GNU `date` and
POSIX `strftime(3c)`.  Additional conversion types are provided to
access Java-specific functionality (e.g. `'L'` for milliseconds
within the second).

 The following conversion characters are used for formatting times:

time

 Conversion
     Unicode
     Description

 `'H'`
     `'\u0048'`
     Hour of the day for the 24-hour clock, formatted as two digits with
    a leading zero as necessary i.e. `00 - 23`. `00`
    corresponds to midnight.

`'I'`
     `'\u0049'`
     Hour for the 12-hour clock, formatted as two digits with a leading
    zero as necessary, i.e.  `01 - 12`.  `01` corresponds to
    one o'clock (either morning or afternoon).

`'k'`
     `'\u006b'`
     Hour of the day for the 24-hour clock, i.e. `0 - 23`.
    `0` corresponds to midnight.

`'l'`
     `'\u006c'`
     Hour for the 12-hour clock, i.e. `1 - 12`.  `1`
    corresponds to one o'clock (either morning or afternoon).

`'M'`
     `'\u004d'`
     Minute within the hour formatted as two digits with a leading zero
    as necessary, i.e.  `00 - 59`.

`'S'`
     `'\u0053'`
     Seconds within the minute, formatted as two digits with a leading
    zero as necessary, i.e. `00 - 60` ("`60`" is a special
    value required to support leap seconds).

`'L'`
     `'\u004c'`
     Millisecond within the second formatted as three digits with
    leading zeros as necessary, i.e. `000 - 999`.

`'N'`
     `'\u004e'`
     Nanosecond within the second, formatted as nine digits with leading
    zeros as necessary, i.e. `000000000 - 999999999`.  The precision
    of this value is limited by the resolution of the underlying operating
    system or hardware.

`'p'`
     `'\u0070'`
     Locale-specific morning or afternoon marker
    in lower case, e.g."`am`" or "`pm`".  Use of the
    conversion prefix `'T'` forces this output to upper case.  (Note
    that `'p'` produces lower-case output.  This is different from
    GNU `date` and POSIX `strftime(3c)` which produce
    upper-case output.)

`'z'`
     `'\u007a'`
     RFC 822
    style numeric time zone offset from GMT, e.g. `-0800`.  This
    value will be adjusted as necessary for Daylight Saving Time.  For
    `long`, `Long`, and `Date` the time zone used is
    the default time zone for this
    instance of the Java virtual machine.

`'Z'`
     `'\u005a'`
     A string representing the abbreviation for the time zone.  This
    value will be adjusted as necessary for Daylight Saving Time.  For
    `long`, `Long`, and `Date` the time zone used is
    the default time zone for this
    instance of the Java virtual machine.  The Formatter's locale will
    supersede the locale of the argument (if any).

`'s'`
     `'\u0073'`
     Seconds since the beginning of the epoch starting at 1 January 1970
    `00:00:00` UTC, i.e. `Long.MIN_VALUE/1000` to
    `Long.MAX_VALUE/1000`.

`'Q'`
     `'\u004f'`
     Milliseconds since the beginning of the epoch starting at 1 January
    1970 `00:00:00` UTC, i.e. `Long.MIN_VALUE` to
    `Long.MAX_VALUE`. The precision of this value is limited by
    the resolution of the underlying operating system or hardware.

 The following conversion characters are used for formatting dates:

date

 Conversion
     Unicode
     Description

`'B'`
     `'\u0042'`
     Locale-specific full month name, e.g. `"January"`, `"February"`.

`'b'`
     `'\u0062'`
     Locale-specific abbreviated month name,
    e.g. `"Jan"`, `"Feb"`.

`'h'`
     `'\u0068'`
     Same as `'b'`.

`'A'`
     `'\u0041'`
     Locale-specific full name of the day of the week,
    e.g. `"Sunday"`, `"Monday"`

`'a'`
     `'\u0061'`
     Locale-specific short name of the day of the week,
    e.g. `"Sun"`, `"Mon"`

`'C'`
     `'\u0043'`
     Four-digit year divided by `100`, formatted as two digits
    with leading zero as necessary, i.e. `00 - 99`

`'Y'`
     `'\u0059'`  Year, formatted to at least
    four digits with leading zeros as necessary, e.g. `0092` equals
    `92` CE for the Gregorian calendar.

`'y'`
     `'\u0079'`
     Last two digits of the year, formatted with leading zeros as
    necessary, i.e. `00 - 99`.

`'j'`
     `'\u006a'`
     Day of year, formatted as three digits with leading zeros as
    necessary, e.g. `001 - 366` for the Gregorian calendar.
    `001` corresponds to the first day of the year.

`'m'`
     `'\u006d'`
     Month, formatted as two digits with leading zeros as necessary,
    i.e. `01 - 13`, where "`01`" is the first month of the
    year and ("`13`" is a special value required to support lunar
    calendars).

`'d'`
     `'\u0064'`
     Day of month, formatted as two digits with leading zeros as
    necessary, i.e. `01 - 31`, where "`01`" is the first day
    of the month.

`'e'`
     `'\u0065'`
     Day of month, formatted as two digits, i.e. `1 - 31` where
    "`1`" is the first day of the month.

 The following conversion characters are used for formatting common
date/time compositions.

composites

 Conversion
     Unicode
     Description

`'R'`
     `'\u0052'`
     Time formatted for the 24-hour clock as `"%tH:%tM"`

`'T'`
     `'\u0054'`
     Time formatted for the 24-hour clock as `"%tH:%tM:%tS"`.

`'r'`
     `'\u0072'`
     Time formatted for the 12-hour clock as `"%tI:%tM:%tS %Tp"`.  The location of the morning or afternoon marker
    (`'%Tp'`) may be locale-dependent.

`'D'`
     `'\u0044'`
     Date formatted as `"%tm/%td/%ty"`.

`'F'`
     `'\u0046'`
     ISO 8601
    complete date formatted as `"%tY-%tm-%td"`.

`'c'`
     `'\u0063'`
     Date and time formatted as `"%ta %tb %td %tT %tZ %tY"`,
    e.g. `"Sun Jul 20 16:17:00 EDT 1969"`.

 The `'-'` flag defined for General
conversions applies.  If the `'#'` flag is given, then a `FormatFlagsConversionMismatchException` will be thrown.

 The width is the minimum number of characters to
be written to the output.  If the length of the converted value is less than
the `width` then the output will be padded by spaces
(`'\u0020'`) until the total number of characters equals width.
The padding is on the left by default.  If the `'-'` flag is given
then the padding will be on the right.  If width is not specified then there
is no minimum.

 The precision is not applicable.  If the precision is specified then an
`IllegalFormatPrecisionException` will be thrown.

#### Percent

 The conversion does not correspond to any argument.

DTConv

 Conversion
     Description

`'%'`
     The result is a literal `'%'` (`'\u0025'`)

 The width is the minimum number of characters to
be written to the output including the `'%'`.  If the length of the
converted value is less than the `width` then the output will be
padded by spaces (`'\u0020'`) until the total number of
characters equals width.  The padding is on the left.  If width is not
specified then just the `'%'` is output.

 The `'-'` flag defined for General
conversions applies.  If any other flags are provided, then a
`IllegalFormatFlagsException` will be thrown.

 The precision is not applicable.  If the precision is specified an
`IllegalFormatPrecisionException` will be thrown.

#### Line Separator

 The conversion does not correspond to any argument.

DTConv

 Conversion
     Description

`'n'`
     the platform-specific line separator as returned by `System.lineSeparator()`.

 Flags, width, and precision are not applicable.  If any are provided an
`IllegalFormatFlagsException`, `IllegalFormatWidthException`,
and `IllegalFormatPrecisionException`, respectively will be thrown.

#### Argument Index

 Format specifiers can reference arguments in three ways:

-  *Explicit indexing* is used when the format specifier contains an
argument index.  The argument index is a decimal integer indicating the
position of the argument in the argument list.  The first argument is
referenced by "`1$`", the second by "`2$`", etc.  An argument
may be referenced more than once.

 For example:

```java
  formatter.format("%4$s %3$s %2$s %1$s %4$s %3$s %2$s %1$s",
                   "a", "b", "c", "d")
  // -> "d c b a d c b a"
```

-  *Relative indexing* is used when the format specifier contains a
`'<'` (`'\u003c'`) flag which causes the argument for
the previous format specifier to be re-used.  If there is no previous
argument, then a `MissingFormatArgumentException` is thrown.

```java
   formatter.format("%s %s %<s %<s", "a", "b", "c", "d")
   // -> "a b b b"
   // "c" and "d" are ignored because they are not referenced
```

-  *Ordinary indexing* is used when the format specifier contains
neither an argument index nor a `'<'` flag.  Each format specifier
which uses ordinary indexing is assigned a sequential implicit index into
argument list which is independent of the indices used by explicit or
relative indexing.

```java
  formatter.format("%s %s %s %s", "a", "b", "c", "d")
  // -> "a b c d"
```

 It is possible to have a format string which uses all forms of indexing,
for example:

```java
  formatter.format("%2$s %s %<s %s", "a", "b", "c", "d")
  // -> "b a a b"
  // "c" and "d" are ignored because they are not referenced
```

 The maximum number of arguments is limited by the maximum dimension of a
Java array as defined by
*The Java Virtual Machine Specification*.
If the argument index does not correspond to an
available argument, then a `MissingFormatArgumentException` is thrown.

 If there are more arguments than format specifiers, the extra arguments
are ignored.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## Formatter.Formatter()

```java
public Formatter()
```

Constructs a new formatter.

 The destination of the formatted output is a `StringBuilder`
which may be retrieved by invoking out() and whose
current content may be converted into a string by invoking toString().  The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

## Formatter.Formatter(Appendable)

```java
public Formatter(Appendable a)
```

Constructs a new formatter with the specified destination.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `a`: Destination for the formatted output. If `a` is `null` then a `StringBuilder` will be created.

## Formatter.Formatter(Locale)

```java
public Formatter(Locale l)
```

Constructs a new formatter with the specified locale.

 The destination of the formatted output is a `StringBuilder`
which may be retrieved by invoking out() and whose current
content may be converted into a string by invoking toString().

Parameters:

- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

## Formatter.Formatter(Appendable, Locale)

```java
public Formatter(Appendable a, Locale l)
```

Constructs a new formatter with the specified destination and locale.

Parameters:

- `a`: Destination for the formatted output. If `a` is `null` then a `StringBuilder` will be created.
- `l`: The locale to apply during formatting. If `l` is `null` then no localization is applied.

## Formatter.Formatter(String)

```java
public Formatter(String fileName) throws FileNotFoundException
```

Constructs a new formatter with the specified file name.

 The charset used is the default charset for this
instance of the Java virtual machine.

 The locale used is the default locale for
formatting for this instance of the Java
virtual machine.

Parameters:

- `fileName`: The name of the file to use as the destination of this formatter. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.

Throws:

- `FileNotFoundException`: If the given file name does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
