---
title: "Formatter class (java.util) (part 1 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Formatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Formatter class (java.util)

```java
public final class Formatter implements Closeable, Flushable
```

An interpreter for printf-style format strings.  This class provides support
for layout justification and alignment, common formats for numeric, string,
and date/time data, and locale-specific output.  Common Java types such as
`byte`, BigDecimal, and `Calendar`
are supported.  Limited formatting customization for arbitrary user types is
provided through the `Formattable` interface.

 Formatters are not necessarily safe for multithreaded access.  Thread
safety is optional and is the responsibility of users of methods in this
class.

 Formatted printing for the Java language is heavily inspired by C's
`printf`.  Although the format strings are similar to C, some
customizations have been made to accommodate the Java language and exploit
some of its features.  Also, Java formatting is more strict than C's; for
example, if a conversion is incompatible with a flag, an exception will be
thrown.  In C inapplicable flags are silently ignored.  The format strings
are thus intended to be recognizable to C programmers but not necessarily
completely compatible with those in C.

 Examples of expected usage:

```java
  StringBuilder sb = new StringBuilder();
  // Send all output to the Appendable object sb
  Formatter formatter = new Formatter(sb, Locale.US);

  // Explicit argument indices may be used to re-order output.
  formatter.format("%4$2s %3$2s %2$2s %1$2s", "a", "b", "c", "d")
  // -> " d  c  b  a"

  // Optional locale as the first argument can be used to get
  // locale-specific formatting of numbers.  The precision and width can be
  // given to round and align the value.
  formatter.format(Locale.FRANCE, "e = %+10.4f", Math.E);
  // -> "e =    +2,7183"

  // The '(' numeric flag may be used to format negative numbers with
  // parentheses rather than a minus sign.  Group separators are
  // automatically inserted.
  formatter.format("Amount gained or lost since last statement: $ %(,.2f",
                   balanceDelta);
  // -> "Amount gained or lost since last statement: $ (6,217.58)"
```

 Convenience methods for common formatting requests exist as illustrated
by the following invocations:

```java
  // Writes a formatted string to System.out.
  System.out.format("Local time: %tT", Calendar.getInstance());
  // -> "Local time: 13:34:18"

  // Writes formatted output to System.err.
  System.err.printf("Unable to open file '%1$s': %2$s",
                    fileName, exception.getMessage());
  // -> "Unable to open file 'food': No such file or directory"
```

 Like C's `sprintf(3)`, Strings may be formatted using the static
method String.format:

```java
  // Format a string containing a date.
  import java.util.Calendar;
  import java.util.GregorianCalendar;
  import static java.util.Calendar.*;

  Calendar c = new GregorianCalendar(1995, MAY, 23);
  String s = String.format("Duke's Birthday: %1$tb %1$te, %1$tY", c);
  // -> s == "Duke's Birthday: May 23, 1995"
```

#### Organization

 This specification is divided into two sections.  The first section, Summary, covers the basic <example-value> concepts.  This
section is intended for users who want to get started quickly and are
familiar with formatted printing in other programming languages.  The second
section, Details, covers the specific implementation
details.  It is intended for users who want more precise specification of
formatting behavior.

#### Summary

 This section is intended to provide a brief overview of formatting
concepts.  For precise behavioral details, refer to the Details section.

#### Format String Syntax

 Every method which produces formatted output requires a *format
string* and an *argument list*.  The format string is a `String` which may contain fixed text and one or more embedded *format
specifiers*.  Consider the following example:

```java
  Calendar c = ...;
  String s = String.format("Duke's Birthday: %1$tm %1$te,%1$tY", c);
```

This format string is the first argument to the `format` method.  It
contains three format specifiers "`%1$tm`", "`%1$te`", and
"`%1$tY`" which indicate how the arguments should be processed and
where they should be inserted in the text.  The remaining portions of the
format string are fixed text including `"Dukes Birthday: "` and any
other spaces or punctuation.

The argument list consists of all arguments passed to the method after the
format string.  In the above example, the argument list is of size one and
consists of the Calendar object `c`.

-  The format specifiers for general, character, and numeric types have
the following syntax:

```java
  %[argument_index$][flags][width][.precision]conversion
```

 The optional *argument_index* is a decimal integer indicating the
position of the argument in the argument list.  The first argument is
referenced by "`1$`", the second by "`2$`", etc.

 The optional *flags* is a set of characters that modify the output
format.  The set of valid flags depends on the conversion.

 The optional *width* is a positive decimal integer indicating
the minimum number of characters to be written to the output.

 The optional *precision* is a non-negative decimal integer usually
used to restrict the number of characters.  The specific behavior depends on
the conversion.

 The required *conversion* is a character indicating how the
argument should be formatted.  The set of valid conversions for a given
argument depends on the argument's data type.

-  The format specifiers for types which are used to represents dates and
times have the following syntax:

```java
  %[argument_index$][flags][width]conversion
```

 The optional *argument_index*, *flags* and *width* are
defined as above.

 The required *conversion* is a two character sequence.  The first
character is `'t'` or `'T'`.  The second character indicates
the format to be used.  These characters are similar to but not completely
identical to those defined by GNU `date` and POSIX
`strftime(3c)`.

-  The format specifiers which do not correspond to arguments have the
following syntax:

```java
  %[flags][width]conversion
```

 The optional *flags* and *width* is defined as above.

 The required *conversion* is a character indicating content to be
inserted in the output.

####  Conversions

 Conversions are divided into the following categories:

-  **General** - may be applied to any argument
type

-  **Character** - may be applied to basic types which represent
Unicode characters: `char`, `Character`, `byte`, `Byte`, `short`, and `Short`. This conversion may also be
applied to the types `int` and `Integer` when `Character.isValidCodePoint` returns `true`

-  **Numeric**

-  **Integral** - may be applied to Java integral types: `byte`,
`Byte`, `short`, `Short`, `int` and `Integer`, `long`, `Long`, and BigInteger (but not `char` or `Character`)

- **Floating Point** - may be applied to Java floating-point types:
`float`, `Float`, `double`, `Double`, and BigDecimal

-  **Date/Time** - may be applied to Java types which are capable of
encoding a date or time: `long`, `Long`, `Calendar`,
`Date` and TemporalAccessor

-  **Percent** - produces a literal `'%'`
(`'\u0025'`)

-  **Line Separator** - produces the platform-specific line separator

 For category *General*, *Character*, *Numeric*,
*Integral* and *Date/Time* conversion, unless otherwise specified,
if the argument *arg* is `null`, then the result is "`null`".

 The following table summarizes the supported conversions.  Conversions
denoted by an upper-case character (i.e. `'B'`, `'H'`,
`'S'`, `'C'`, `'X'`, `'E'`, `'G'`,
`'A'`, and `'T'`) are the same as those for the corresponding
lower-case conversion characters except that the result is converted to
upper case according to the rules of the prevailing Locale. If there is no explicit locale specified, either at the
construction of the instance or as a parameter to its method
invocation, then the default locale
is used.

genConv

 Conversion
     Argument Category
     Description

 `'b'`, `'B'`
     general
     If the argument *arg* is `null`, then the result is
    "`false`".  If *arg* is a `boolean` or `Boolean`, then the result is the string returned by String.valueOf(arg).  Otherwise, the result is
    "true".

 `'h'`, `'H'`
     general
     The result is obtained by invoking
    `Integer.toHexString(arg.hashCode())`.

 `'s'`, `'S'`
     general
     If *arg* implements `Formattable`, then
    arg.formatTo is invoked. Otherwise, the
    result is obtained by invoking `arg.toString()`.

`'c'`, `'C'`
     character
     The result is a Unicode character

`'d'`
     integral
     The result is formatted as a decimal integer

`'o'`
     integral
     The result is formatted as an octal integer

`'x'`, `'X'`
     integral
     The result is formatted as a hexadecimal integer

`'e'`, `'E'`
     floating point
     The result is formatted as a decimal number in computerized
    scientific notation

`'f'`
     floating point
     The result is formatted as a decimal number

`'g'`, `'G'`
     floating point
     The result is formatted using computerized scientific notation or
    decimal format, depending on the precision and the value after rounding.

`'a'`, `'A'`
     floating point
     The result is formatted as a hexadecimal floating-point number with
    a significand and an exponent. This conversion is **not** supported
    for the `BigDecimal` type despite the latter's being in the
    *floating point* argument category.

`'t'`, `'T'`
     date/time
     Prefix for date and time conversion characters.  See Date/Time Conversions.

`'%'`
     percent
     The result is a literal `'%'` (`'\u0025'`)

`'n'`
     line separator
     The result is the platform-specific line separator

 Any characters not explicitly defined as conversions are illegal and are
reserved for future extensions.

#### Date/Time Conversions

 The following date and time conversion suffix characters are defined for
the `'t'` and `'T'` conversions.  The types are similar to but
not completely identical to those defined by GNU `date` and POSIX
`strftime(3c)`.  Additional conversion types are provided to access
Java-specific functionality (e.g. `'L'` for milliseconds within the
second).

 The following conversion characters are used for formatting times:

time

 Conversion
     Description

 `'H'`
     Hour of the day for the 24-hour clock, formatted as two digits with
    a leading zero as necessary i.e. `00 - 23`.

`'I'`
     Hour for the 12-hour clock, formatted as two digits with a leading
    zero as necessary, i.e.  `01 - 12`.

`'k'`
     Hour of the day for the 24-hour clock, i.e. `0 - 23`.

`'l'`
     Hour for the 12-hour clock, i.e. `1 - 12`.

`'M'`
     Minute within the hour formatted as two digits with a leading zero
    as necessary, i.e.  `00 - 59`.

`'S'`
     Seconds within the minute, formatted as two digits with a leading
    zero as necessary, i.e. `00 - 60` ("`60`" is a special
    value required to support leap seconds).

`'L'`
     Millisecond within the second formatted as three digits with
    leading zeros as necessary, i.e. `000 - 999`.

`'N'`
     Nanosecond within the second, formatted as nine digits with leading
    zeros as necessary, i.e. `000000000 - 999999999`.

`'p'`
     Locale-specific morning or afternoon marker
    in lower case, e.g."`am`" or "`pm`". Use of the conversion
    prefix `'T'` forces this output to upper case.

`'z'`
     RFC 822
    style numeric time zone offset from GMT, e.g. `-0800`.  This
    value will be adjusted as necessary for Daylight Saving Time.  For
    `long`, `Long`, and `Date` the time zone used is
    the default time zone for this
    instance of the Java virtual machine.

`'Z'`
     A string representing the abbreviation for the time zone.  This
    value will be adjusted as necessary for Daylight Saving Time.  For
    `long`, `Long`, and `Date` the  time zone used is
    the default time zone for this
    instance of the Java virtual machine.  The Formatter's locale will
    supersede the locale of the argument (if any).

`'s'`
     Seconds since the beginning of the epoch starting at 1 January 1970
    `00:00:00` UTC, i.e. `Long.MIN_VALUE/1000` to
    `Long.MAX_VALUE/1000`.

`'Q'`
     Milliseconds since the beginning of the epoch starting at 1 January
    1970 `00:00:00` UTC, i.e. `Long.MIN_VALUE` to
    `Long.MAX_VALUE`.

 The following conversion characters are used for formatting dates:

date

 Conversion
     Description

`'B'`
     Locale-specific full month name, e.g. `"January"`, `"February"`.

`'b'`
     Locale-specific abbreviated month name,
    e.g. `"Jan"`, `"Feb"`.

`'h'`
     Same as `'b'`.

`'A'`
     Locale-specific full name of the day of the week,
    e.g. `"Sunday"`, `"Monday"`

`'a'`
     Locale-specific short name of the day of the week,
    e.g. `"Sun"`, `"Mon"`

`'C'`
     Four-digit year divided by `100`, formatted as two digits
    with leading zero as necessary, i.e. `00 - 99`

`'Y'`
     Year, formatted as at least four digits with leading zeros as
    necessary, e.g. `0092` equals `92` CE for the Gregorian
    calendar.

`'y'`
     Last two digits of the year, formatted with leading zeros as
    necessary, i.e. `00 - 99`.

`'j'`
     Day of year, formatted as three digits with leading zeros as
    necessary, e.g. `001 - 366` for the Gregorian calendar.

`'m'`
     Month, formatted as two digits with leading zeros as necessary,
    i.e. `01 - 13`.

`'d'`
     Day of month, formatted as two digits with leading zeros as
    necessary, i.e. `01 - 31`

`'e'`
     Day of month, formatted as two digits, i.e. `1 - 31`.

 The following conversion characters are used for formatting common
date/time compositions.

composites

 Conversion
     Description

`'R'`
     Time formatted for the 24-hour clock as `"%tH:%tM"`

`'T'`
     Time formatted for the 24-hour clock as `"%tH:%tM:%tS"`.

`'r'`
     Time formatted for the 12-hour clock as `"%tI:%tM:%tS %Tp"`.
    The location of the morning or afternoon marker (`'%Tp'`) may be
    locale-dependent.

`'D'`
     Date formatted as `"%tm/%td/%ty"`.

`'F'`
     ISO 8601
    complete date formatted as `"%tY-%tm-%td"`.

`'c'`
     Date and time formatted as `"%ta %tb %td %tT %tZ %tY"`,
    e.g. `"Sun Jul 20 16:17:00 EDT 1969"`.

 Any characters not explicitly defined as date/time conversion suffixes
are illegal and are reserved for future extensions.

####  Flags

 The following table summarizes the supported flags.  *y* means the
flag is supported for the indicated argument types.

genConv

 Flag  General
     Character  Integral
     Floating Point
     Date/Time
     Description

 '-'  y
     y
     y
     y
     y
     The result will be left-justified.

 '#'  y1
     -
     y3
     y
     -
     The result should use a conversion-dependent alternate form

 '+'  -
     -
     y4
     y
     -
     The result will always include a sign
