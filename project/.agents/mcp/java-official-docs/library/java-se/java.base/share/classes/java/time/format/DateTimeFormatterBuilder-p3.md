---
title: "DateTimeFormatterBuilder class (java.time.format) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatterBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatterBuilder class (java.time.format) (part 3 of 6)

## DateTimeFormatterBuilder.appendOffset(String, String)

```java
public DateTimeFormatterBuilder appendOffset(String pattern, String noOffsetText)
```

Appends the zone offset, such as '+01:00', to the formatter.

This appends an instruction to format/parse the offset ID to the builder.

During formatting, the offset is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.offset()`.
It will be printed using the format defined below.
If the offset cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

When parsing in strict mode, the input must contain the mandatory
and optional elements are defined by the specified pattern.
If the offset cannot be parsed then an exception is thrown unless
the section of the formatter is optional.

When parsing in lenient mode, only the hours are mandatory - minutes
and seconds are optional. The colons are required if the specified
pattern contains a colon. If the specified pattern is "+HH", the
presence of colons is determined by whether the character after the
hour digits is a colon or not.
If the offset cannot be parsed then an exception is thrown unless
the section of the formatter is optional.

The format of the offset is controlled by a pattern which must be one
of the following:

- `+HH` - hour only, ignoring minute and second

- `+HHmm` - hour, with minute if non-zero, ignoring second, no colon

- `+HH:mm` - hour, with minute if non-zero, ignoring second, with colon

- `+HHMM` - hour and minute, ignoring second, no colon

- `+HH:MM` - hour and minute, ignoring second, with colon

- `+HHMMss` - hour and minute, with second if non-zero, no colon

- `+HH:MM:ss` - hour and minute, with second if non-zero, with colon

- `+HHMMSS` - hour, minute and second, no colon

- `+HH:MM:SS` - hour, minute and second, with colon

- `+HHmmss` - hour, with minute if non-zero or with minute and
second if non-zero, no colon

- `+HH:mm:ss` - hour, with minute if non-zero or with minute and
second if non-zero, with colon

- `+H` - hour only, ignoring minute and second

- `+Hmm` - hour, with minute if non-zero, ignoring second, no colon

- `+H:mm` - hour, with minute if non-zero, ignoring second, with colon

- `+HMM` - hour and minute, ignoring second, no colon

- `+H:MM` - hour and minute, ignoring second, with colon

- `+HMMss` - hour and minute, with second if non-zero, no colon

- `+H:MM:ss` - hour and minute, with second if non-zero, with colon

- `+HMMSS` - hour, minute and second, no colon

- `+H:MM:SS` - hour, minute and second, with colon

- `+Hmmss` - hour, with minute if non-zero or with minute and
second if non-zero, no colon

- `+H:mm:ss` - hour, with minute if non-zero or with minute and
second if non-zero, with colon

Patterns containing "HH" will format and parse a two digit hour,
zero-padded if necessary. Patterns containing "H" will format with no
zero-padding, and parse either one or two digits.
In lenient mode, the parser will be greedy and parse the maximum digits possible.
The "no offset" text controls what text is printed when the total amount of
the offset fields to be output is zero.
Example values would be 'Z', '+00:00', 'UTC' or 'GMT'.
Three formats are accepted for parsing UTC - the "no offset" text, and the
plus and minus versions of zero defined by the pattern.

Parameters:

- `pattern`: the pattern to use, not null
- `noOffsetText`: the text to use when the offset is zero, not null

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if the pattern is invalid

## DateTimeFormatterBuilder.appendLocalizedOffset(TextStyle)

```java
public DateTimeFormatterBuilder appendLocalizedOffset(TextStyle style)
```

Appends the localized zone offset, such as 'GMT+01:00', to the formatter.

This appends a localized zone offset to the builder, the format of the
localized offset is controlled by the specified style
to this method:

- full - formats with localized offset text, such
as 'GMT, 2-digit hour and minute field, optional second field if non-zero,
and colon.

- short - formats with localized offset text,
such as 'GMT, hour without leading zero, optional 2-digit minute and
second if non-zero, and colon.

During formatting, the offset is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.offset()`.
If the offset cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

During parsing, the offset is parsed using the format defined above.
If the offset cannot be parsed then an exception is thrown unless the
section of the formatter is optional.

Parameters:

- `style`: the format style to use, not null

**Returns:** this, for chaining, not null

Throws:

- `IllegalArgumentException`: if style is neither full nor short

## DateTimeFormatterBuilder.appendZoneId()

```java
public DateTimeFormatterBuilder appendZoneId()
```

Appends the time-zone ID, such as 'Europe/Paris' or '+02:00', to the formatter.

This appends an instruction to format/parse the zone ID to the builder.
The zone ID is obtained in a strict manner suitable for `ZonedDateTime`.
By contrast, `OffsetDateTime` does not have a zone ID suitable
for use with this method, see `appendZoneOrOffsetId()`.

During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.zoneId()`.
It will be printed using the result of `ZoneId.getId()`.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

During parsing, the text must match a known zone or offset.
There are two types of zone ID, offset-based, such as '+01:30' and
region-based, such as 'Europe/London'. These are parsed differently.
If the parse starts with '+' or '-', then the parser expects an
offset-based zone and will not match region-based zones. The offset
ID parsing is equivalent to using String)
using the arguments 'HH:MM:ss' and the no offset string '0'.
If the parse starts with 'UT', 'UTC' or 'GMT', and the parser can
match a following offset, then a region-based zone with the parsed
offset will be returned, or else if the parser cannot match a following
offset, then `ZoneOffset.UTC` is selected.
In all other cases, the list of known region-based zones is used to
find the longest available match. If no match is found, and the parse
starts with 'Z', then `ZoneOffset.UTC` is selected.
The parser uses the case sensitive setting.

For example, the following will parse:

```java
  "Europe/London"           -- ZoneId.of("Europe/London")
  "Z"                       -- ZoneOffset.UTC
  "UT"                      -- ZoneId.of("UT")
  "UTC"                     -- ZoneId.of("UTC")
  "GMT"                     -- ZoneId.of("GMT")
  "+01:30"                  -- ZoneOffset.of("+01:30")
  "UT+01:30"                -- ZoneId.of("UT+01:30")
  "UTC+01:30"               -- ZoneId.of("UTC+01:30")
  "GMT+01:30"               -- ZoneId.of("GMT+01:30")
```

**Returns:** this, for chaining, not null

**See also:** #appendZoneRegionId()

## DateTimeFormatterBuilder.appendZoneRegionId()

```java
public DateTimeFormatterBuilder appendZoneRegionId()
```

Appends the time-zone region ID, such as 'Europe/Paris', to the formatter,
rejecting the zone ID if it is a `ZoneOffset`.

This appends an instruction to format only region-based zone IDs to the builder.

During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.zoneId()`.
If the zone is a `ZoneOffset` or it cannot be obtained then
an exception is thrown unless the section of the formatter is optional.
If the zone is not an offset, then the zone will be printed using
the zone ID from `ZoneId.getId()`.

During parsing, the text must match a known zone or offset.
There are two types of zone ID, offset-based, such as '+01:30' and
region-based, such as 'Europe/London'. These are parsed differently.
If the parse starts with '+' or '-', then the parser expects an
offset-based zone and will not match region-based zones. The offset
ID parsing is equivalent to using String)
using the arguments 'HH:MM:ss' and the no offset string '0'.
If the parse starts with 'UT', 'UTC' or 'GMT', and the parser can
match a following offset, then a region-based zone with the parsed
offset will be returned, or else if the parser cannot match a following
offset, then `ZoneOffset.UTC` is selected.
In all other cases, the list of known region-based zones is used to
find the longest available match. If no match is found, and the parse
starts with 'Z', then `ZoneOffset.UTC` is selected.
The parser uses the case sensitive setting.

For example, the following will parse:

```java
  "Europe/London"           -- ZoneId.of("Europe/London")
  "Z"                       -- ZoneOffset.UTC
  "UT"                      -- ZoneId.of("UT")
  "UTC"                     -- ZoneId.of("UTC")
  "GMT"                     -- ZoneId.of("GMT")
  "+01:30"                  -- ZoneOffset.of("+01:30")
  "UT+01:30"                -- ZoneId.of("UT+01:30")
  "UTC+01:30"               -- ZoneId.of("UTC+01:30")
  "GMT+01:30"               -- ZoneId.of("GMT+01:30")
```

Note that this method is identical to `appendZoneId()` except
in the mechanism used to obtain the zone.
Note also that parsing accepts offsets, whereas formatting will never
produce one.

**Returns:** this, for chaining, not null

**See also:** #appendZoneId()

## DateTimeFormatterBuilder.appendZoneOrOffsetId()

```java
public DateTimeFormatterBuilder appendZoneOrOffsetId()
```

Appends the time-zone ID, such as 'Europe/Paris' or '+02:00', to
the formatter, using the best available zone ID.

This appends an instruction to format/parse the best available
zone or offset ID to the builder.
The zone ID is obtained in a lenient manner that first attempts to
find a true zone ID, such as that on `ZonedDateTime`, and
then attempts to find an offset, such as that on `OffsetDateTime`.

During formatting, the zone is obtained using a mechanism equivalent
to querying the temporal with `TemporalQueries.zone()`.
It will be printed using the result of `ZoneId.getId()`.
If the zone cannot be obtained then an exception is thrown unless the
section of the formatter is optional.

During parsing, the text must match a known zone or offset.
There are two types of zone ID, offset-based, such as '+01:30' and
region-based, such as 'Europe/London'. These are parsed differently.
If the parse starts with '+' or '-', then the parser expects an
offset-based zone and will not match region-based zones. The offset
ID parsing is equivalent to using String)
using the arguments 'HH:MM:ss' and the no offset string '0'.
If the parse starts with 'UT', 'UTC' or 'GMT', and the parser can
match a following offset, then a region-based zone with the parsed
offset will be returned, or else if the parser cannot match a following
offset, then `ZoneOffset.UTC` is selected.
In all other cases, the list of known region-based zones is used to
find the longest available match. If no match is found, and the parse
starts with 'Z', then `ZoneOffset.UTC` is selected.
The parser uses the case sensitive setting.

For example, the following will parse:

```java
  "Europe/London"           -- ZoneId.of("Europe/London")
  "Z"                       -- ZoneOffset.UTC
  "UT"                      -- ZoneId.of("UT")
  "UTC"                     -- ZoneId.of("UTC")
  "GMT"                     -- ZoneId.of("GMT")
  "+01:30"                  -- ZoneOffset.of("+01:30")
  "UT+01:30"                -- ZoneId.of("UT+01:30")
  "UTC+01:30"               -- ZoneId.of("UTC+01:30")
  "GMT+01:30"               -- ZoneId.of("GMT+01:30")
```

Note that this method is identical to `appendZoneId()` except
in the mechanism used to obtain the zone.

**Returns:** this, for chaining, not null

**See also:** #appendZoneId()

## DateTimeFormatterBuilder.appendZoneText(TextStyle)

```java
public DateTimeFormatterBuilder appendZoneText(TextStyle textStyle)
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
local date-time that is not in a daylight saving gap or overlap then
the text will be the summer or winter time text as appropriate.
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
zone. The Set) may be used
to specify a set of preferred `ZoneId` in this situation.

Parameters:

- `textStyle`: the text style to use, not null

**Returns:** this, for chaining, not null
