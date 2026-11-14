---
title: "DateTimeFormatterBuilder class (java.time.format) (part 4 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatterBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatterBuilder class (java.time.format) (part 4 of 6)

## DateTimeFormatterBuilder.appendZoneText(TextStyle, Set<ZoneId>)

```java
public DateTimeFormatterBuilder appendZoneText(TextStyle textStyle, Set<ZoneId> preferredZones)
```

Appends the time-zone name, such as 'British Summer Time', to the formatter.

This appends an instruction to format/parse the textual name of the zone to
the builder.

During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.zoneId()`.
If the zone is a `ZoneOffset` it will be printed using the
result of `ZoneOffset.getId()`.
If the zone is not an offset, the textual name will be looked up
for the locale set in the `DateTimeFormatter`.
If the temporal object being printed represents an instant, or if it is a
local date-time that is not in a daylight saving gap or overlap, then the text
will be the summer or winter time text as appropriate.
If the lookup for text does not find any suitable result, then the
ID will be printed.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

During parsing, either the textual zone name, the zone ID or the offset
is accepted. Many textual zone names are not unique, such as CST can be
for both "Central Standard Time" and "China Standard Time". In this
situation, the zone id will be determined by the region information from
formatter's  locale and the standard
zone id for that area, for example, America/New_York for the America Eastern
zone. This method also allows a set of preferred `ZoneId` to be
specified for parsing. The matched preferred zone id will be used if the
textural zone name being parsed is not unique.

If the zone cannot be parsed then an exception is thrown unless the
section of the formatter is optional.

Parameters:

- `textStyle`: the text style to use, not null
- `preferredZones`: the set of preferred zone ids, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendGenericZoneText(TextStyle)

```java
public DateTimeFormatterBuilder appendGenericZoneText(TextStyle textStyle)
```

Appends the generic time-zone name, such as 'Pacific Time', to the formatter.

This appends an instruction to format/parse the generic textual
name of the zone to the builder. The generic name is the same throughout the whole
year, ignoring any daylight saving changes. For example, 'Pacific Time' is the
generic name, whereas 'Pacific Standard Time' and 'Pacific Daylight Time' are the
specific names, see `appendZoneText(TextStyle)`.

During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.zoneId()`.
If the zone is a `ZoneOffset` it will be printed using the
result of `ZoneOffset.getId()`.
If the zone is not an offset, the textual name will be looked up
for the locale set in the `DateTimeFormatter`.
If the lookup for text does not find any suitable result, then the
ID will be printed.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

During parsing, either the textual zone name, the zone ID or the offset
is accepted. Many textual zone names are not unique, such as CST can be
for both "Central Standard Time" and "China Standard Time". In this
situation, the zone id will be determined by the region information from
formatter's  locale and the standard
zone id for that area, for example, America/New_York for the America Eastern zone.
The Set) may be used
to specify a set of preferred `ZoneId` in this situation.

Parameters:

- `textStyle`: the text style to use, not null

**Returns:** this, for chaining, not null

**Since:** 9

## DateTimeFormatterBuilder.appendGenericZoneText(TextStyle, Set<ZoneId>)

```java
public DateTimeFormatterBuilder appendGenericZoneText(TextStyle textStyle, Set<ZoneId> preferredZones)
```

Appends the generic time-zone name, such as 'Pacific Time', to the formatter.

This appends an instruction to format/parse the generic textual
name of the zone to the builder. The generic name is the same throughout the whole
year, ignoring any daylight saving changes. For example, 'Pacific Time' is the
generic name, whereas 'Pacific Standard Time' and 'Pacific Daylight Time' are the
specific names, see `appendZoneText(TextStyle)`.

This method also allows a set of preferred `ZoneId` to be
specified for parsing. The matched preferred zone id will be used if the
textural zone name being parsed is not unique.

See `appendGenericZoneText(TextStyle)` for details about
formatting and parsing.

Parameters:

- `textStyle`: the text style to use, not null
- `preferredZones`: the set of preferred zone ids, not null

**Returns:** this, for chaining, not null

**Since:** 9

## DateTimeFormatterBuilder.appendChronologyId()

```java
public DateTimeFormatterBuilder appendChronologyId()
```

Appends the chronology ID, such as 'ISO' or 'ThaiBuddhist', to the formatter.

This appends an instruction to format/parse the chronology ID to the builder.

During formatting, the chronology is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.chronology()`.
It will be printed using the result of `Chronology.getId()`.
If the chronology cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

During parsing, the chronology is parsed and must match one of the chronologies
in `Chronology.getAvailableChronologies()`.
If the chronology cannot be parsed then an exception is thrown unless the
section of the formatter is optional.
The parser uses the case sensitive setting.

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendChronologyText(TextStyle)

```java
public DateTimeFormatterBuilder appendChronologyText(TextStyle textStyle)
```

Appends the chronology name to the formatter.

The calendar system name will be output during a format.
If the chronology cannot be obtained then an exception will be thrown.

Parameters:

- `textStyle`: the text style to use, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendLocalized(FormatStyle, FormatStyle)

```java
public DateTimeFormatterBuilder appendLocalized(FormatStyle dateStyle, FormatStyle timeStyle)
```

Appends a localized date-time pattern to the formatter.

This appends a localized section to the builder, suitable for outputting
a date, time or date-time combination. The format of the localized
section is lazily looked up based on four items:

- the `dateStyle` specified to this method

- the `timeStyle` specified to this method

- the `Locale` of the `DateTimeFormatter`

- the `Chronology`, selecting the best available

During formatting, the chronology is obtained from the temporal object
being formatted, which may have been overridden by
`DateTimeFormatter.withChronology(Chronology)`.
The `FULL` and `LONG` styles typically require a time-zone.
When formatting using these styles, a `ZoneId` must be available,
either by using `ZonedDateTime` or `DateTimeFormatter.withZone`.

During parsing, if a chronology has already been parsed, then it is used.
Otherwise the default from `DateTimeFormatter.withChronology(Chronology)`
is used, with `IsoChronology` as the fallback.

Note that this method provides similar functionality to methods on
`DateFormat` such as int).

Parameters:

- `dateStyle`: the date style to use, null means no date required
- `timeStyle`: the time style to use, null means no time required

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if both the date and time styles are null

## DateTimeFormatterBuilder.appendLocalized(String)

```java
public DateTimeFormatterBuilder appendLocalized(String requestedTemplate)
```

Appends a localized pattern to the formatter using the requested template.

This appends a localized section to the builder, suitable for outputting
a date, time or date-time combination. The format of the localized
section is lazily looked up based on three items:

- the `requestedTemplate` specified to this method

- the `Locale` of the `DateTimeFormatter`

- the `Chronology` of the `DateTimeFormatter` unless overridden

During formatting, the chronology is obtained from the temporal object
being formatted, which may have been overridden by
`DateTimeFormatter.withChronology(Chronology)`.

During parsing, if a chronology has already been parsed, then it is used.
Otherwise the default from `DateTimeFormatter.withChronology(Chronology)`
is used, with `IsoChronology` as the fallback.

The requested template is a series of typical pattern
symbols in canonical order from the largest date or time unit to the smallest,
which can be expressed with the following regular expression:

All pattern symbols are optional, and each pattern symbol represents a field,
for example, 'M' represents the Month field. The number of the pattern symbol letters follows the
same presentation, such as "number" or "text" as in the
Patterns for Formatting and Parsing section.
Other pattern symbols in the requested template are invalid.

The mapping of the requested template to the closest of the available localized formats
is defined by the

Unicode LDML specification. For example, the formatter created from the requested template
`yMMM` will format the date '2020-06-16' to 'Jun 2020' in the US locale.

Parameters:

- `requestedTemplate`: the requested template to use, not null

**Returns:** this, for chaining, not null

**See also:** #appendPattern(String)

**Since:** 19

Throws:

- `IllegalArgumentException`: if `requestedTemplate` is invalid

## DateTimeFormatterBuilder.appendLiteral(char)

```java
public DateTimeFormatterBuilder appendLiteral(char literal)
```

Appends a character literal to the formatter.

This character will be output during a format.

Parameters:

- `literal`: the literal to append, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendLiteral(String)

```java
public DateTimeFormatterBuilder appendLiteral(String literal)
```

Appends a string literal to the formatter.

This string will be output during a format.

If the literal is empty, nothing is added to the formatter.

Parameters:

- `literal`: the literal to append, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendDayPeriodText(TextStyle)

```java
public DateTimeFormatterBuilder appendDayPeriodText(TextStyle style)
```

Appends the day period text to the formatter.

This appends an instruction to format/parse the textual name of the day period
to the builder. Day periods are defined in LDML's
"day periods"
 element.

During formatting, the day period is obtained from `HOUR_OF_DAY`, and
optionally `MINUTE_OF_HOUR` if exist. It will be mapped to a day period
type defined in LDML, such as "morning1" and then it will be translated into
text. Mapping to a day period type and its translation both depend on the
locale in the formatter.

During parsing, the text will be parsed into a day period type first. Then
the parsed day period is combined with other fields to make a `LocalTime` in
the resolving phase. If the `HOUR_OF_AMPM` field is present, it is combined
with the day period to make `HOUR_OF_DAY` taking into account any
`MINUTE_OF_HOUR` value. If `HOUR_OF_DAY` is present, it is validated
against the day period taking into account any `MINUTE_OF_HOUR` value. If a
day period is present without `HOUR_OF_DAY`, `MINUTE_OF_HOUR`,
`SECOND_OF_MINUTE` and `NANO_OF_SECOND` then the midpoint of the
day period is set as the time in `SMART` and `LENIENT` mode.
For example, if the parsed day period type is "night1" and the period defined
for it in the formatter locale is from 21:00 to 06:00, then it results in
the `LocalTime` of 01:30.
If the resolved time conflicts with the day period, `DateTimeException` is
thrown in `STRICT` and `SMART` mode. In `LENIENT` mode, no
exception is thrown and the parsed day period is ignored.

The "midnight" type allows both "00:00" as the start-of-day and "24:00" as the
end-of-day, as long as they are valid with the resolved hour field.

Parameters:

- `style`: the text style to use, not null

**Returns:** this, for chaining, not null

**Since:** 16

## DateTimeFormatterBuilder.append(DateTimeFormatter)

```java
public DateTimeFormatterBuilder append(DateTimeFormatter formatter)
```

Appends all the elements of a formatter to the builder.

This method has the same effect as appending each of the constituent
parts of the formatter directly to this builder.

Parameters:

- `formatter`: the formatter to add, not null

**Returns:** this, for chaining, not null

## DateTimeFormatterBuilder.appendOptional(DateTimeFormatter)

```java
public DateTimeFormatterBuilder appendOptional(DateTimeFormatter formatter)
```

Appends a formatter to the builder which will optionally format/parse.

This method has the same effect as appending each of the constituent
parts directly to this builder surrounded by an `optionalStart()` and
`optionalEnd()`.

The formatter will format if data is available for all the fields contained within it.
The formatter will parse if the string matches, otherwise no error is returned.

Parameters:

- `formatter`: the formatter to add, not null

**Returns:** this, for chaining, not null
