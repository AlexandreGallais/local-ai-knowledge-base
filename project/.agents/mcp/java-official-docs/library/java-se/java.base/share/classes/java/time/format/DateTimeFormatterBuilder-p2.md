---
title: "DateTimeFormatterBuilder class (java.time.format) (part 2 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatterBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatterBuilder class (java.time.format) (part 2 of 6)

## DateTimeFormatterBuilder.appendValueReduced(TemporalField, int, int, int)

```java
public DateTimeFormatterBuilder appendValueReduced(TemporalField field, int width, int maxWidth, int baseValue)
```

Appends the reduced value of a date-time field to the formatter.

Since fields such as year vary by chronology, it is recommended to use the
int, int, ChronoLocalDate) date}
variant of this method in most cases. This variant is suitable for
simple fields or working with only the ISO chronology.

For formatting, the `width` and `maxWidth` are used to
determine the number of characters to format.
If they are equal then the format is fixed width.
If the value of the field is within the range of the `baseValue` using
`width` characters then the reduced value is formatted otherwise the value is
truncated to fit `maxWidth`.
The rightmost characters are output to match the width, left padding with zero.

For strict parsing, the number of characters allowed by `width` to `maxWidth` are parsed.
For lenient parsing, the number of characters must be at least 1 and less than 10.
If the number of digits parsed is equal to `width` and the value is positive,
the value of the field is computed to be the first number greater than
or equal to the `baseValue` with the same least significant characters,
otherwise the value parsed is the field value.
This allows a reduced value to be entered for values in range of the baseValue
and width and absolute values can be entered for values outside the range.

For example, a base value of `1980` and a width of `2` will have
valid values from `1980` to `2079`.
During parsing, the text `"12"` will result in the value `2012` as that
is the value within the range where the last two characters are "12".
By contrast, parsing the text `"1915"` will result in the value `1915`.

Parameters:

- `field`: the field to append, not null
- `width`: the field width of the printed and parsed field, from 1 to 10
- `maxWidth`: the maximum field width of the printed field, from 1 to 10
- `baseValue`: the base value of the range of valid values

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if the width or base value is invalid

## DateTimeFormatterBuilder.appendValueReduced(TemporalField, int, int, ChronoLocalDate)

```java
public DateTimeFormatterBuilder appendValueReduced( TemporalField field, int width, int maxWidth, ChronoLocalDate baseDate)
```

Appends the reduced value of a date-time field to the formatter.

This is typically used for formatting and parsing a two digit year.

The base date is used to calculate the full value during parsing.
For example, if the base date is 1950-01-01 then parsed values for
a two digit year parse will be in the range 1950-01-01 to 2049-12-31.
Only the year would be extracted from the date, thus a base date of
1950-08-25 would also parse to the range 1950-01-01 to 2049-12-31.
This behavior is necessary to support fields such as week-based-year
or other calendar systems where the parsed value does not align with
standard ISO years.

The exact behavior is as follows. Parse the full set of fields and
determine the effective chronology using the last chronology if
it appears more than once. Then convert the base date to the
effective chronology. Then extract the specified field from the
chronology-specific base date and use it to determine the
`baseValue` used below.

For formatting, the `width` and `maxWidth` are used to
determine the number of characters to format.
If they are equal then the format is fixed width.
If the value of the field is within the range of the `baseValue` using
`width` characters then the reduced value is formatted otherwise the value is
truncated to fit `maxWidth`.
The rightmost characters are output to match the width, left padding with zero.

For strict parsing, the number of characters allowed by `width` to `maxWidth` are parsed.
For lenient parsing, the number of characters must be at least 1 and less than 10.
If the number of digits parsed is equal to `width` and the value is positive,
the value of the field is computed to be the first number greater than
or equal to the `baseValue` with the same least significant characters,
otherwise the value parsed is the field value.
This allows a reduced value to be entered for values in range of the baseValue
and width and absolute values can be entered for values outside the range.

For example, a base value of `1980` and a width of `2` will have
valid values from `1980` to `2079`.
During parsing, the text `"12"` will result in the value `2012` as that
is the value within the range where the last two characters are "12".
By contrast, parsing the text `"1915"` will result in the value `1915`.

Parameters:

- `field`: the field to append, not null
- `width`: the field width of the printed and parsed field, from 1 to 10
- `maxWidth`: the maximum field width of the printed field, from 1 to 10
- `baseDate`: the base date used to calculate the base value for the range of valid values in the parsed chronology, not null

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if the width or base value is invalid

## DateTimeFormatterBuilder.appendFraction(TemporalField, int, int, boolean)

```java
public DateTimeFormatterBuilder appendFraction( TemporalField field, int minWidth, int maxWidth, boolean decimalPoint)
```

Appends the fractional value of a date-time field to the formatter.

The fractional value of the field will be output including the
preceding decimal point. The preceding value is not output.
For example, the second-of-minute value of 15 would be output as `.25`.

The width of the printed fraction can be controlled. Setting the
minimum width to zero will cause no output to be generated.
The printed fraction will have the minimum width necessary between
the minimum and maximum widths - trailing zeroes are omitted.
No rounding occurs due to the maximum width - digits are simply dropped.

When parsing in strict mode, the number of parsed digits must be between
the minimum and maximum width. In strict mode, if the minimum and maximum widths
are equal and there is no decimal point then the parser will
participate in adjacent value parsing, see
int). When parsing in lenient mode,
the minimum width is considered to be zero and the maximum is nine.

If the value cannot be obtained then an exception will be thrown.
If the value is negative an exception will be thrown.
If the field does not have a fixed set of valid values then an
exception will be thrown.
If the field value in the date-time to be printed is outside the
range of valid values then an exception will be thrown.

Parameters:

- `field`: the field to append, not null
- `minWidth`: the minimum width of the field excluding the decimal point, from 0 to 9
- `maxWidth`: the maximum width of the field excluding the decimal point, from 1 to 9
- `decimalPoint`: whether to output the localized decimal point symbol

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if the field has a variable set of valid values or either width is invalid

## DateTimeFormatterBuilder.appendText(TemporalField)

```java
public DateTimeFormatterBuilder appendText(TemporalField field)
```

Appends the text of a date-time field to the formatter using the full
text style.

The text of the field will be output during a format.
The value must be within the valid range of the field.
If the value cannot be obtained then an exception will be thrown.
If the field has no textual representation, then the numeric value will be used.

The value will be printed as per the normal format of an integer value.
Only negative numbers will be signed. No padding will be added.

Parameters:

- `field`: the field to append, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendText(TemporalField, TextStyle)

```java
public DateTimeFormatterBuilder appendText(TemporalField field, TextStyle textStyle)
```

Appends the text of a date-time field to the formatter.

The text of the field will be output during a format.
The value must be within the valid range of the field.
If the value cannot be obtained then an exception will be thrown.
If the field has no textual representation, then the numeric value will be used.

The value will be printed as per the normal format of an integer value.
Only negative numbers will be signed. No padding will be added.

Parameters:

- `field`: the field to append, not null
- `textStyle`: the text style to use, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendText(TemporalField, Map<Long, String>)

```java
public DateTimeFormatterBuilder appendText(TemporalField field, Map<Long, String> textLookup)
```

Appends the text of a date-time field to the formatter using the specified
map to supply the text.

The standard text outputting methods use the localized text in the JDK.
This method allows that text to be specified directly.
The supplied map is not validated by the builder to ensure that formatting or
parsing is possible, thus an invalid map may throw an error during later use.

Supplying the map of text provides considerable flexibility in formatting and parsing.
For example, a legacy application might require or supply the months of the
year as "JNY", "FBY", "MCH" etc. These do not match the standard set of text
for localized month names. Using this method, a map can be created which
defines the connection between each value and the text:

```java
Map<Long, String> map = new HashMap<>();
map.put(1L, "JNY");
map.put(2L, "FBY");
map.put(3L, "MCH");
...
builder.appendText(MONTH_OF_YEAR, map);
```

Other uses might be to output the value with a suffix, such as "1st", "2nd", "3rd",
or as Roman numerals "I", "II", "III", "IV".

During formatting, the value is obtained and checked that it is in the valid range.
If text is not available for the value then it is output as a number.
During parsing, the parser will match against the map of text and numeric values.

Parameters:

- `field`: the field to append, not null
- `textLookup`: the map from the value to the text

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendInstant()

```java
public DateTimeFormatterBuilder appendInstant()
```

Appends an instant using ISO-8601 to the formatter, formatting fractional
digits in groups of three.

Instants have a fixed output format.
They are converted to a date-time with a zone-offset of UTC and formatted
using the standard ISO-8601 format.
With this method, formatting nano-of-second outputs zero, three, six
or nine digits as necessary.
The localized decimal style is not used.

The instant is obtained using INSTANT_SECONDS
and optionally `NANO_OF_SECOND`. The value of `INSTANT_SECONDS`
may be outside the maximum range of `LocalDateTime`.

The resolver style has no effect on instant parsing.
The end-of-day time of '24:00' is handled as midnight at the start of the following day.
The leap-second time of '23:59:59' is handled to some degree, see
`DateTimeFormatter.parsedLeapSecond()` for full details.

When formatting, the instant will always be suffixed by 'Z' to indicate UTC.
When parsing, the behaviour of `DateTimeFormatterBuilder.appendOffsetId()`
will be used to parse the offset, converting the instant to UTC as necessary.

An alternative to this method is to format/parse the instant as a single
epoch-seconds value. That is achieved using `appendValue(INSTANT_SECONDS)`.

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendInstant(int)

```java
public DateTimeFormatterBuilder appendInstant(int fractionalDigits)
```

Appends an instant using ISO-8601 to the formatter with control over
the number of fractional digits.

Instants have a fixed output format, although this method provides some
control over the fractional digits. They are converted to a date-time
with a zone-offset of UTC and printed using the standard ISO-8601 format.
The localized decimal style is not used.

The `fractionalDigits` parameter allows the output of the fractional
second to be controlled. Specifying zero will cause no fractional digits
to be output. From 1 to 9 will output an increasing number of digits, using
zero right-padding if necessary. The special value -1 is used to output as
many digits as necessary to avoid any trailing zeroes.

When parsing in strict mode, the number of parsed digits must match the
fractional digits. When parsing in lenient mode, any number of fractional
digits from zero to nine are accepted.

The instant is obtained using INSTANT_SECONDS
and optionally `NANO_OF_SECOND`. The value of `INSTANT_SECONDS`
may be outside the maximum range of `LocalDateTime`.

The resolver style has no effect on instant parsing.
The end-of-day time of '24:00' is handled as midnight at the start of the following day.
The leap-second time of '23:59:60' is handled to some degree, see
`DateTimeFormatter.parsedLeapSecond()` for full details.

An alternative to this method is to format/parse the instant as a single
epoch-seconds value. That is achieved using `appendValue(INSTANT_SECONDS)`.

Parameters:

- `fractionalDigits`: the number of fractional second digits to format with, from 0 to 9, or -1 to use as many digits as necessary

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if the number of fractional digits is invalid

## DateTimeFormatterBuilder.appendOffsetId()

```java
public DateTimeFormatterBuilder appendOffsetId()
```

Appends the zone offset, such as '+01:00', to the formatter.

This appends an instruction to format/parse the offset ID to the builder.
This is equivalent to calling `appendOffset("+HH:mm:ss", "Z")`.
See String) for details on formatting
and parsing.

**Returns:** this, for chaining, not null
