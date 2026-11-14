---
title: "DateTimeFormatter class (java.time.format) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatter class (java.time.format) (part 3 of 5)

## DateTimeFormatter.ISO_LOCAL_DATE_TIME

```java
public static final DateTimeFormatter ISO_LOCAL_DATE_TIME
```

The ISO date-time formatter that formats or parses a date-time without
an offset, such as '2011-12-03T10:15:30'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 extended offset date-time format.
The format consists of:

- The `ISO_LOCAL_DATE`

- The letter 'T'. Parsing is case insensitive.

- The `ISO_LOCAL_TIME`

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.ISO_OFFSET_DATE_TIME

```java
public static final DateTimeFormatter ISO_OFFSET_DATE_TIME
```

The ISO date-time formatter that formats or parses a date-time with an
offset, such as '2011-12-03T10:15:30+01:00'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 extended offset date-time format.
The format consists of:

- The `ISO_LOCAL_DATE_TIME`

- The offset ID. If the offset has seconds then
 they will be handled even though this is not part of the ISO-8601 standard.
 The offset parsing is lenient, which allows the minutes and seconds to be optional.
 Parsing is case insensitive.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.ISO_ZONED_DATE_TIME

```java
public static final DateTimeFormatter ISO_ZONED_DATE_TIME
```

The ISO-like date-time formatter that formats or parses a date-time with
offset and zone, such as '2011-12-03T10:15:30+01:00[Europe/Paris]'.

This returns an immutable formatter capable of formatting and parsing
a format that extends the ISO-8601 extended offset date-time format
to add the time-zone.
The section in square brackets is not part of the ISO-8601 standard.
The format consists of:

- The `ISO_OFFSET_DATE_TIME`

- If the zone ID is not available or is a `ZoneOffset` then the format is complete.

- An open square bracket '['.

- The zone ID. This is not part of the ISO-8601 standard.
 Parsing is case sensitive.

- A close square bracket ']'.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.ISO_DATE_TIME

```java
public static final DateTimeFormatter ISO_DATE_TIME
```

The ISO-like date-time formatter that formats or parses a date-time with
the offset and zone if available, such as '2011-12-03T10:15:30',
'2011-12-03T10:15:30+01:00' or '2011-12-03T10:15:30+01:00[Europe/Paris]'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 extended local or offset date-time format, as well as the
extended non-ISO form specifying the time-zone.
The format consists of:

- The `ISO_LOCAL_DATE_TIME`

- If the offset is not available to format or parse then the format is complete.

- The offset ID. If the offset has seconds then
 they will be handled even though this is not part of the ISO-8601 standard.

- If the zone ID is not available or is a `ZoneOffset` then the format is complete.

- An open square bracket '['.

- The zone ID. This is not part of the ISO-8601 standard.
 Parsing is case sensitive.

- A close square bracket ']'.

As this formatter has an optional element, it may be necessary to parse using
`DateTimeFormatter.parseBest`.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.ISO_ORDINAL_DATE

```java
public static final DateTimeFormatter ISO_ORDINAL_DATE
```

The ISO date formatter that formats or parses the ordinal date
without an offset, such as '2012-337'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 extended ordinal date format.
The format consists of:

- Four digits or more for the year.
Years in the range 0000 to 9999 will be pre-padded by zero to ensure four digits.
Years outside that range will have a prefixed positive or negative symbol.

- A hyphen ('HYPHEN-MINUS', U+002D)

- Three digits for the day-of-year.
 This is pre-padded by zero to ensure three digits.

- If the offset is not available to format or parse then the format is complete.

- The offset ID. If the offset has seconds then
 they will be handled even though this is not part of the ISO-8601 standard.
 Parsing is case insensitive.

As this formatter has an optional element, it may be necessary to parse using
`DateTimeFormatter.parseBest`.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.ISO_WEEK_DATE

```java
public static final DateTimeFormatter ISO_WEEK_DATE
```

The ISO date formatter that formats or parses the week-based date
without an offset, such as '2012-W48-6'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 extended week-based date format.
The format consists of:

- Four digits or more for the week-based-year.
Years in the range 0000 to 9999 will be pre-padded by zero to ensure four digits.
Years outside that range will have a prefixed positive or negative symbol.

- A hyphen ('HYPHEN-MINUS', U+002D)

- The letter 'W'. Parsing is case insensitive.

- Two digits for the week-of-week-based-year.
 This is pre-padded by zero to ensure three digits.

- A hyphen ('HYPHEN-MINUS', U+002D)

- One digit for the day-of-week.
 The value run from Monday (1) to Sunday (7).

- If the offset is not available to format or parse then the format is complete.

- The offset ID. If the offset has seconds then
 they will be handled even though this is not part of the ISO-8601 standard.
 Parsing is case insensitive.

As this formatter has an optional element, it may be necessary to parse using
`DateTimeFormatter.parseBest`.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.ISO_INSTANT

```java
public static final DateTimeFormatter ISO_INSTANT
```

The ISO instant formatter that formats or parses an instant in UTC,
such as '2011-12-03T10:15:30Z'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 instant format.
When formatting, the instant will always be suffixed by 'Z' to indicate UTC.
The second-of-minute is always output.
The nano-of-second outputs zero, three, six or nine digits as necessary.
When parsing, the behaviour of `DateTimeFormatterBuilder.appendOffsetId()`
will be used to parse the offset, converting the instant to UTC as necessary.
The time to at least the seconds field is required.
Fractional seconds from zero to nine are parsed.
The localized decimal style is not used.

This is a special case formatter intended to allow a human readable form
of an `java.time.Instant`. The `Instant` class is designed to
only represent a point in time and internally stores a value in nanoseconds
from a fixed epoch of 1970-01-01Z. As such, an `Instant` cannot be
formatted as a date or time without providing some form of time-zone.
This formatter allows the `Instant` to be formatted, by providing
a suitable conversion using `ZoneOffset.UTC`.

The format consists of:

- The `ISO_OFFSET_DATE_TIME` where the instant is converted from
 `ChronoField.INSTANT_SECONDS` and `ChronoField.NANO_OF_SECOND`
 using the `UTC` offset. Parsing is case insensitive.

The returned formatter has no override chronology or zone.
It uses the STRICT resolver style.

## DateTimeFormatter.BASIC_ISO_DATE

```java
public static final DateTimeFormatter BASIC_ISO_DATE
```

The ISO date formatter that formats or parses a date without an
offset, such as '20111203'.

This returns an immutable formatter capable of formatting and parsing
the ISO-8601 basic local date format.
The format consists of:

- Four digits for the year.
 Only years in the range 0000 to 9999 are supported.

- Two digits for the month-of-year.
 This is pre-padded by zero to ensure two digits.

- Two digits for the day-of-month.
 This is pre-padded by zero to ensure two digits.

- If the offset is not available to format or parse then the format is complete.

- The offset ID without colons. If the offset has
 seconds then they will be handled even though this is not part of the ISO-8601 standard.
 The offset parsing is lenient, which allows the minutes and seconds to be optional.
 Parsing is case insensitive.

As this formatter has an optional element, it may be necessary to parse using
`DateTimeFormatter.parseBest`.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the STRICT resolver style.

## DateTimeFormatter.RFC_1123_DATE_TIME

```java
public static final DateTimeFormatter RFC_1123_DATE_TIME
```

The RFC-1123 date-time formatter, such as 'Tue, 3 Jun 2008 11:05:30 GMT'.

This returns an immutable formatter capable of formatting and parsing
most of the RFC-1123 format.
RFC-1123 updates RFC-822 changing the year from two digits to four.
This implementation requires a four digit year.
This implementation also does not handle North American or military zone
names, only 'GMT' and offset amounts.

The format consists of:

- If the day-of-week is not available to format or parse then jump to day-of-month.

- Three letter day-of-week in English.

- A comma

- A space

- One or two digits for the day-of-month.

- A space

- Three letter month-of-year in English.

- A space

- Four digits for the year.
 Only years in the range 0000 to 9999 are supported.

- A space

- Two digits for the hour-of-day.
 This is pre-padded by zero to ensure two digits.

- A colon

- Two digits for the minute-of-hour.
 This is pre-padded by zero to ensure two digits.

- If the second-of-minute is not available then jump to the next space.

- A colon

- Two digits for the second-of-minute.
 This is pre-padded by zero to ensure two digits.

- A space

- The offset ID without colons or seconds.
 An offset of zero uses "GMT". North American zone names and military zone names are not handled.

Parsing is case insensitive.

The returned formatter has a chronology of ISO set to ensure dates in
other calendar systems are correctly converted.
It has no override zone and uses the SMART resolver style.

## DateTimeFormatter.parsedExcessDays()

```java
public static final TemporalQuery<Period> parsedExcessDays()
```

A query that provides access to the excess days that were parsed.

This returns a singleton query that provides
access to additional information from the parse. The query always returns
a non-null period, with a zero period returned instead of null.

There are two situations where this query may return a non-zero period.

- If the `ResolverStyle` is `LENIENT` and a time is parsed
 without a date, then the complete result of the parse consists of a
 `LocalTime` and an excess `Period` in days.

- If the `ResolverStyle` is `SMART` and a time is parsed
 without a date where the time is 24:00:00, then the complete result of
 the parse consists of a `LocalTime` of 00:00:00 and an excess
 `Period` of one day.

In both cases, if a complete `ChronoLocalDateTime` or `Instant`
is parsed, then the excess days are added to the date part.
As a result, this query will return a zero period.

The `SMART` behaviour handles the common "end of day" 24:00 value.
Processing in `LENIENT` mode also produces the same result:

```java
 Text to parse        Parsed object                         Excess days
 "2012-12-03T00:00"   LocalDateTime.of(2012, 12, 3, 0, 0)   ZERO
 "2012-12-03T24:00"   LocalDateTime.of(2012, 12, 4, 0, 0)   ZERO
 "00:00"              LocalTime.of(0, 0)                    ZERO
 "24:00"              LocalTime.of(0, 0)                    Period.ofDays(1)
```

The query can be used as follows:

```java
 TemporalAccessor parsed = formatter.parse(str);
 LocalTime time = parsed.query(LocalTime::from);
 Period extraDays = parsed.query(DateTimeFormatter.parsedExcessDays());
```

**Returns:** a query that provides access to the excess days that were parsed

## DateTimeFormatter.parsedLeapSecond()

```java
public static final TemporalQuery<Boolean> parsedLeapSecond()
```

A query that provides access to whether a leap-second was parsed.

This returns a singleton query that provides
access to additional information from the parse. The query always returns
a non-null boolean, true if parsing saw a leap-second, false if not.

Instant parsing handles the special "leap second" time of '23:59:60'.
Leap seconds occur at '23:59:60' in the UTC time-zone, but at other
local times in different time-zones. To avoid this potential ambiguity,
the handling of leap-seconds is limited to
`DateTimeFormatterBuilder.appendInstant()`, as that method
always parses the instant with the UTC zone offset.

If the time '23:59:60' is received, then a simple conversion is applied,
replacing the second-of-minute of 60 with 59. This query can be used
on the parse result to determine if the leap-second adjustment was made.
The query will return `true` if it did adjust to remove the
leap-second, and `false` if not. Note that applying a leap-second
smoothing mechanism, such as UTC-SLS, is the responsibility of the
application, as follows:

```java
 TemporalAccessor parsed = formatter.parse(str);
 Instant instant = parsed.query(Instant::from);
 if (parsed.query(DateTimeFormatter.parsedLeapSecond())) {
   // validate leap-second is correct and apply correct smoothing
```

**Returns:** a query that provides access to whether a leap-second was parsed

## DateTimeFormatter.getLocale()

```java
public Locale getLocale()
```

Gets the locale to be used during formatting.

This is used to lookup any part of the formatter needing specific
localization, such as the text or localized pattern.

**Returns:** the locale of this formatter, not null

## DateTimeFormatter.withLocale(Locale)

```java
public DateTimeFormatter withLocale(Locale locale)
```

Returns a copy of this formatter with a new locale.

This is used to lookup any part of the formatter needing specific
localization, such as the text or localized pattern.

The locale is stored as passed in, without further processing.
If the locale has
Unicode extensions, they may be used later in text
processing. To set the chronology, time-zone and decimal style from
unicode extensions, see localizedBy().

This instance is immutable and unaffected by this method call.

Parameters:

- `locale`: the new locale, not null

**Returns:** a formatter based on this formatter with the requested locale, not null

**See also:** #localizedBy(Locale)
