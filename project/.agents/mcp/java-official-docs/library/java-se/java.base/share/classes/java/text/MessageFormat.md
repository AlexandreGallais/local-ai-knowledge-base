---
title: "MessageFormat class (java.text) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/MessageFormat.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MessageFormat class (java.text)

```java
public class MessageFormat extends Format
```

`MessageFormat` provides a means to produce concatenated
messages in a language-neutral way. Use this class to construct messages
displayed for end users.

`MessageFormat` takes a set of objects, formats them, then
inserts the formatted strings into the pattern at the appropriate places.

**Note:**
`MessageFormat` differs from the other `Format`
classes in that you create a `MessageFormat` object with one
of its constructors (not with a `getInstance` style factory
method). The factory methods aren't necessary because `MessageFormat`
itself doesn't implement locale specific behavior. Any locale specific
behavior is defined by the pattern that you provide as well as the
subformats used for inserted arguments.

#### Patterns and Their Interpretation

`MessageFormat` uses patterns of the following form:

```java
<i>MessageFormatPattern:</i>
        <i>String</i>
        <i>MessageFormatPattern</i> <i>FormatElement</i> <i>String</i>

<i>FormatElement:</i>
        { <i>ArgumentIndex</i> }
        { <i>ArgumentIndex</i> , <i>FormatType</i> }
        { <i>ArgumentIndex</i> , <i>FormatType</i> , <i>FormatStyle</i> }

<i>FormatType:</i>
        number
        dtf_date
        dtf_time
        dtf_datetime
        <i>pre-defined DateTimeFormatter(s)</i>
        date
        time
        choice
        list

<i>FormatStyle:</i>
        short
        medium
        long
        full
        integer
        currency
        percent
        compact_short
        compact_long
        or
        unit
        <i>SubformatPattern</i>
```

The `ArgumentIndex` value is a non-negative integer written
using the digits `'0'` through `'9'`, and represents an index into the
`arguments` array passed to the `format` methods
or the result array returned by the `parse` methods.

Any constructor or method that takes a String pattern parameter will throw an `IllegalArgumentException` if the
pattern contains an `ArgumentIndex` value that is equal to or exceeds an implementation limit.

The `FormatType` and `FormatStyle` values are used to create
a `Format` instance for the format element. The following
table shows how the values map to `Format` instances. These values
are case-insensitive when passed to `applyPattern(String)`. Combinations
not shown in the table are illegal. A *SubformatPattern* must
be a valid pattern string for the `Format` subclass used.

**Implementation note:** In the reference implementation, the limit of `ArgumentIndex` is 10,000.

Shows how FormatType and FormatStyle values map to Format instances

      FormatType
      FormatStyle
      Subformat Created

      *(none)*
      *(none)*
      `null`

      `number`
      *(none)*
      NumberFormat.getInstance`(getLocale())`

      `integer`
      NumberFormat.getIntegerInstance`(getLocale())`

      `currency`
      NumberFormat.getCurrencyInstance`(getLocale())`

      `percent`
      NumberFormat.getPercentInstance`(getLocale())`

      `compact_short`
      NumberFormat.Style) NumberFormat.getCompactNumberInstance`(getLocale(),` `NumberFormat.Style.SHORT`)

      `compact_long`
      NumberFormat.Style) NumberFormat.getCompactNumberInstance`(getLocale(),` `NumberFormat.Style.LONG`)

      *SubformatPattern*
      `new` DecimalFormat`(subformatPattern,` DecimalFormatSymbols.getInstance`(getLocale()))`

      `dtf_date`
      *(none)*
      DateTimeFormatter.ofLocalizedDate(`java.time.format.FormatStyle.MEDIUM``).withLocale(getLocale())`

      `short`
      DateTimeFormatter.ofLocalizedDate(`java.time.format.FormatStyle.SHORT``).withLocale(getLocale())`

      `medium`
      DateTimeFormatter.ofLocalizedDate(`java.time.format.FormatStyle.MEDIUM``).withLocale(getLocale())`

      `long`
      DateTimeFormatter.ofLocalizedDate(`java.time.format.FormatStyle.LONG``).withLocale(getLocale())`

      `full`
      DateTimeFormatter.ofLocalizedDate(`java.time.format.FormatStyle.FULL``).withLocale(getLocale())`

      *SubformatPattern*
      Locale) DateTimeFormatter.ofPattern`(subformatPattern, getLocale())`

      `dtf_time`
      *(none)*
      DateTimeFormatter.ofLocalizedTime(`java.time.format.FormatStyle.MEDIUM``).withLocale(getLocale())`

      `short`
      DateTimeFormatter.ofLocalizedTime(`java.time.format.FormatStyle.SHORT``).withLocale(getLocale())`

      `medium`
      DateTimeFormatter.ofLocalizedTime(`java.time.format.FormatStyle.MEDIUM``).withLocale(getLocale())`

      `long`
      DateTimeFormatter.ofLocalizedTime(`java.time.format.FormatStyle.LONG``).withLocale(getLocale())`

      `full`
      DateTimeFormatter.ofLocalizedTime(`java.time.format.FormatStyle.FULL``).withLocale(getLocale())`

      *SubformatPattern*
      Locale) DateTimeFormatter.ofPattern`(subformatPattern, getLocale())`

      `dtf_datetime`
      *(none)*
      DateTimeFormatter.ofLocalizedDateTime(`java.time.format.FormatStyle.MEDIUM``).withLocale(getLocale())`

      `short`
      DateTimeFormatter.ofLocalizedDateTime(`java.time.format.FormatStyle.SHORT``).withLocale(getLocale())`

      `medium`
      DateTimeFormatter.ofLocalizedDateTime(`java.time.format.FormatStyle.MEDIUM``).withLocale(getLocale())`

      `long`
      DateTimeFormatter.ofLocalizedDateTime(`java.time.format.FormatStyle.LONG``).withLocale(getLocale())`

      `full`
      DateTimeFormatter.ofLocalizedDateTime(`java.time.format.FormatStyle.FULL``).withLocale(getLocale())`

      *SubformatPattern*
      Locale) DateTimeFormatter.ofPattern`(subformatPattern, getLocale())`

      `pre-defined DateTimeFormatter(s)`
      *(none)*
      The `pre-defined DateTimeFormatter(s)` are used as a `FormatType` :
      BASIC_ISO_DATE,
      ISO_LOCAL_DATE,
      ISO_OFFSET_DATE,
      ISO_DATE,
      ISO_LOCAL_TIME,
      ISO_OFFSET_TIME,
      ISO_TIME,
      ISO_LOCAL_DATE_TIME,
      ISO_OFFSET_DATE_TIME,
      ISO_ZONED_DATE_TIME,
      ISO_DATE_TIME,
      ISO_ORDINAL_DATE,
      ISO_WEEK_DATE,
      ISO_INSTANT,
      RFC_1123_DATE_TIME

      `date`
      *(none)*
      DateFormat.getDateInstance`(``DateFormat.DEFAULT``, getLocale())`

      `short`
      DateFormat.getDateInstance`(``DateFormat.SHORT``, getLocale())`

      `medium`
      DateFormat.getDateInstance`(``DateFormat.MEDIUM``, getLocale())`

      `long`
      DateFormat.getDateInstance`(``DateFormat.LONG``, getLocale())`

      `full`
      DateFormat.getDateInstance`(``DateFormat.FULL``, getLocale())`

      *SubformatPattern*
      `new` SimpleDateFormat`(subformatPattern, getLocale())`

      `time`
      *(none)*
      DateFormat.getTimeInstance`(``DateFormat.DEFAULT``, getLocale())`

      `short`
      DateFormat.getTimeInstance`(``DateFormat.SHORT``, getLocale())`

      `medium`
      DateFormat.getTimeInstance`(``DateFormat.MEDIUM``, getLocale())`

      `long`
      DateFormat.getTimeInstance`(``DateFormat.LONG``, getLocale())`

      `full`
      DateFormat.getTimeInstance`(``DateFormat.FULL``, getLocale())`

      *SubformatPattern*
      `new` SimpleDateFormat`(subformatPattern, getLocale())`

      `choice`
      *SubformatPattern*
      `new` ChoiceFormat`(subformatPattern)`

      `list`
      *(none)*
      ListFormat.Type, ListFormat.Style) ListFormat.getInstance`(getLocale()`, `ListFormat.Type.STANDARD`, `ListFormat.Style.FULL``)`

      `or`
      ListFormat.Type, ListFormat.Style) ListFormat.getInstance`(getLocale()`, `ListFormat.Type.OR`, `ListFormat.Style.FULL``)`

      `unit`
      ListFormat.Type, ListFormat.Style) ListFormat.getInstance`(getLocale()`, `ListFormat.Type.UNIT`, `ListFormat.Style.FULL``)`

#### Quoting Rules in Patterns

Within a *String*, a pair of single quotes can be used to
quote any arbitrary characters except single quotes. For example,
pattern string `"'{0}'"` represents string
`"{0}"`, not a *FormatElement*. A single quote itself
must be represented by doubled single quotes `''` throughout a
*String*.  For example, pattern string `"'{''}'"` is
interpreted as a sequence of `'{` (start of quoting and a
left curly brace), `''` (a single quote), and
`}'` (a right curly brace and end of quoting),
*not* `'{'` and `'}'` (quoted left and
right curly braces): representing string `"{'}"`,
*not* `"{}"`.

A *SubformatPattern* is interpreted by its corresponding
subformat, and subformat-dependent pattern rules apply. For example,
pattern string `"{1,number,$'#',##}"`
(*SubformatPattern* with underline) will produce a number format
with the pound-sign quoted, with a result such as: `"$#31,45"`. Refer to each `Format` subclass documentation for
details.

Any unmatched quote is treated as closed at the end of the given
pattern. For example, pattern string `"'{0}"` is treated as
pattern `"'{0}'"`.

Any curly braces within an unquoted pattern must be balanced. For
example, `"ab {0} de"` and `"ab '}' de"` are
valid patterns, but `"ab {0'}' de"`, `"ab } de"`
and `"''{''"` are not.

**Warning:**The rules for using quotes within message
format patterns unfortunately have shown to be somewhat confusing.
In particular, it isn't always obvious to localizers whether single
quotes need to be doubled or not. Make sure to inform localizers about
the rules, and tell them (for example, by using comments in resource
bundle source files) which strings will be processed by `MessageFormat`.
Note that localizers may need to use single quotes in translated
strings where the original version doesn't have them.

#### Usage Information

The following example demonstrates a general usage of `MessageFormat`.
In internationalized programs, the message format pattern and other
static strings will likely be obtained from resource bundles.

`result` returns the following:

```java
At 12:30:00 PM on Jul 3, 2053, there was a disturbance in the Force on planet 7.
```

For more sophisticated patterns, `ChoiceFormat` can be used with
`MessageFormat` to produce accurate forms for singular and plural:

`result` with different values for `fileCount`, returns the following:

```java
The disk "MyDisk" contains no files.
The disk "MyDisk" contains one file.
The disk "MyDisk" contains 1,273 files.
```

Notes:** As seen in the previous snippet,
the string produced by a `ChoiceFormat` in `MessageFormat` is
treated as special; occurrences of '{' are used to indicate subformats, and
cause recursion. If a `FormatElement` is defined in the `ChoiceFormat`
pattern, it will only be formatted according to the `FormatType` and
`FormatStyle` pattern provided. The associated subformats of the
top level `MessageFormat` will not be applied to the `FormatElement`
defined in the `ChoiceFormat` pattern.
If you create both a `MessageFormat` and `ChoiceFormat`
programmatically (instead of using the string patterns), then be careful not to
produce a format that recurses on itself, which will cause an infinite loop.

#### Formatting Date and Time

MessageFormat provides patterns that support the date/time formatters in the
`java.time.format` and `java.text` packages. Consider the following three examples,
with a date of 11/16/2023:

1) a *date* `FormatType` with a *full* `FormatStyle`,

2) a *dtf_date* `FormatType` with a *full* `FormatStyle`,

3) an *ISO_LOCAL_DATE* `FormatType`,

#### Parsing

When a single argument is parsed more than once in the string, the last match
will be the final result of the parsing.  For example,

Likewise, parsing with a `MessageFormat` object using patterns containing
multiple occurrences of the same argument would return the last match.  For
example,

#### Synchronization

Message formats are not synchronized.
It is recommended to create separate format instances for each thread.
If multiple threads access a format concurrently, it must be synchronized
externally.

**See also:** java.util.Locale

**See also:** Format

**See also:** NumberFormat

**See also:** DecimalFormat

**See also:** DecimalFormatSymbols

**See also:** ChoiceFormat

**See also:** DateFormat

**See also:** SimpleDateFormat

**See also:** DateTimeFormatter

**Since:** 1.1

## MessageFormat.MessageFormat(String)

```java
public MessageFormat(String pattern)
```

Constructs a MessageFormat for the default
FORMAT locale and the
specified pattern.
The constructor first sets the locale, then parses the pattern and
creates a list of subformats for the format elements contained in it.
Patterns and their interpretation are specified in the
class description.

Parameters:

- `pattern`: the pattern for this message format

Throws:

- `IllegalArgumentException`: if the pattern is invalid
- `NullPointerException`: if `pattern` is `null`

## MessageFormat.MessageFormat(String, Locale)

```java
public MessageFormat(String pattern, Locale locale)
```

Constructs a MessageFormat for the specified locale and
pattern.
The constructor first sets the locale, then parses the pattern and
creates a list of subformats for the format elements contained in it.
Patterns and their interpretation are specified in the
class description.

Parameters:

- `pattern`: the pattern for this message format
- `locale`: the locale for this message format

**Implementation requirements:** The default implementation throws a
`NullPointerException` if `locale` is `null`
either during the creation of the `MessageFormat` object or later
when `format()` is called by a `MessageFormat`
instance with a null locale and the implementation utilizes a
locale-dependent subformat.

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the pattern is invalid
- `NullPointerException`: if `pattern` is `null` or `locale` is `null` and the implementation uses a locale-dependent subformat.

## MessageFormat.setLocale(Locale)

```java
public void setLocale(Locale locale)
```

Sets the locale to be used when creating or comparing subformats.
This affects subsequent calls

- to the applyPattern
    and toPattern methods if format elements specify
    a format type and therefore have the subformats created in the
    `applyPattern` method, as well as

- to the `format` and
    formatToCharacterIterator methods
    if format elements do not specify a format type and therefore have
    the subformats created in the formatting methods.

Subformats that have already been created are not affected.

Parameters:

- `locale`: the locale to be used when creating or comparing subformats

## MessageFormat.getLocale()

```java
public Locale getLocale()
```

Gets the locale that's used when creating or comparing subformats.

**Returns:** the locale used when creating or comparing subformats
