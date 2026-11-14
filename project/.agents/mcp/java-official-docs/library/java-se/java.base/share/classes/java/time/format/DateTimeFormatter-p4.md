---
title: "DateTimeFormatter class (java.time.format) (part 4 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeFormatter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeFormatter class (java.time.format) (part 4 of 5)

## DateTimeFormatter.localizedBy(Locale)

```java
public DateTimeFormatter localizedBy(Locale locale)
```

Returns a copy of this formatter with localized values of the locale,
calendar, region, decimal style and/or timezone, that supersede values in
this formatter.

This is used to lookup any part of the formatter needing specific
localization, such as the text or localized pattern. If the locale contains the
"ca" (calendar), "nu" (numbering system), "rg" (region override), and/or
"tz" (timezone)
Unicode extensions,
the chronology, numbering system and/or the zone are overridden. If both "ca"
and "rg" are specified, the chronology from the "ca" extension supersedes the
implicit one from the "rg" extension. Same is true for the "nu" extension.

Unlike the withLocale method, the call to this method may
produce a different formatter depending on the order of method chaining with
other withXXXX() methods.

This instance is immutable and unaffected by this method call.

Parameters:

- `locale`: the locale, not null

**Returns:** a formatter based on this formatter with localized values of
     the calendar, decimal style and/or timezone, that supersede values in this
     formatter.

**See also:** #withLocale(Locale)

**Since:** 10

## DateTimeFormatter.getDecimalStyle()

```java
public DecimalStyle getDecimalStyle()
```

Gets the DecimalStyle to be used during formatting.

**Returns:** the DecimalStyle of this formatter, not null

## DateTimeFormatter.withDecimalStyle(DecimalStyle)

```java
public DateTimeFormatter withDecimalStyle(DecimalStyle decimalStyle)
```

Returns a copy of this formatter with a new DecimalStyle.

This instance is immutable and unaffected by this method call.

Parameters:

- `decimalStyle`: the new DecimalStyle, not null

**Returns:** a formatter based on this formatter with the requested DecimalStyle, not null

## DateTimeFormatter.getChronology()

```java
public Chronology getChronology()
```

Gets the overriding chronology to be used during formatting.

This returns the override chronology, used to convert dates.
By default, a formatter has no override chronology, returning null.
See `withChronology(Chronology)` for more details on overriding.

**Returns:** the override chronology of this formatter, null if no override

## DateTimeFormatter.withChronology(Chronology)

```java
public DateTimeFormatter withChronology(Chronology chrono)
```

Returns a copy of this formatter with a new override chronology.

This returns a formatter with similar state to this formatter but
with the override chronology set.
By default, a formatter has no override chronology, returning null.

If an override is added, then any date that is formatted or parsed will be affected.

When formatting, if the temporal object contains a date, then it will
be converted to a date in the override chronology.
Whether the temporal contains a date is determined by querying the
EPOCH_DAY field.
Any time or zone will be retained unaltered unless overridden.

If the temporal object does not contain a date, but does contain one
or more `ChronoField` date fields, then a `DateTimeException`
is thrown. In all other cases, the override chronology is added to the temporal,
replacing any previous chronology, but without changing the date/time.

When parsing, there are two distinct cases to consider.
If a chronology has been parsed directly from the text, perhaps because
`DateTimeFormatterBuilder.appendChronologyId()` was used, then
this override chronology has no effect.
If no zone has been parsed, then this override chronology will be used
to interpret the `ChronoField` values into a date according to the
date resolving rules of the chronology.

This instance is immutable and unaffected by this method call.

Parameters:

- `chrono`: the new chronology, null if no override

**Returns:** a formatter based on this formatter with the requested override chronology, not null

## DateTimeFormatter.getZone()

```java
public ZoneId getZone()
```

Gets the overriding zone to be used during formatting.

This returns the override zone, used to convert instants.
By default, a formatter has no override zone, returning null.
See `withZone(ZoneId)` for more details on overriding.

**Returns:** the override zone of this formatter, null if no override

## DateTimeFormatter.withZone(ZoneId)

```java
public DateTimeFormatter withZone(ZoneId zone)
```

Returns a copy of this formatter with a new override zone.

This returns a formatter with similar state to this formatter but
with the override zone set.
By default, a formatter has no override zone, returning null.

If an override is added, then any instant that is formatted or parsed will be affected.

When formatting, if the temporal object contains an instant, then it will
be converted to a zoned date-time using the override zone.
Whether the temporal is an instant is determined by querying the
INSTANT_SECONDS field.
If the input has a chronology then it will be retained unless overridden.
If the input does not have a chronology, such as `Instant`, then
the ISO chronology will be used.

If the temporal object does not contain an instant, but does contain
an offset then an additional check is made. If the normalized override
zone is an offset that differs from the offset of the temporal, then
a `DateTimeException` is thrown. In all other cases, the override
zone is added to the temporal, replacing any previous zone, but without
changing the date/time.

When parsing, there are two distinct cases to consider.
If a zone has been parsed directly from the text, perhaps because
`DateTimeFormatterBuilder.appendZoneId()` was used, then
this override zone has no effect.
If no zone has been parsed, then this override zone will be included in
the result of the parse where it can be used to build instants and date-times.

This instance is immutable and unaffected by this method call.

Parameters:

- `zone`: the new override zone, null if no override

**Returns:** a formatter based on this formatter with the requested override zone, not null

## DateTimeFormatter.getResolverStyle()

```java
public ResolverStyle getResolverStyle()
```

Gets the resolver style to use during parsing.

This returns the resolver style, used during the second phase of parsing
when fields are resolved into dates and times.
By default, a formatter has the SMART resolver style.
See `withResolverStyle(ResolverStyle)` for more details.

**Returns:** the resolver style of this formatter, not null

## DateTimeFormatter.withResolverStyle(ResolverStyle)

```java
public DateTimeFormatter withResolverStyle(ResolverStyle resolverStyle)
```

Returns a copy of this formatter with a new resolver style.

This returns a formatter with similar state to this formatter but
with the resolver style set. By default, a formatter has the
SMART resolver style.

Changing the resolver style only has an effect during parsing.
Parsing a text string occurs in two phases.
Phase 1 is a basic text parse according to the fields added to the builder.
Phase 2 resolves the parsed field-value pairs into date and/or time objects.
The resolver style is used to control how phase 2, resolving, happens.
See `ResolverStyle` for more information on the options available.

This instance is immutable and unaffected by this method call.

Parameters:

- `resolverStyle`: the new resolver style, not null

**Returns:** a formatter based on this formatter with the requested resolver style, not null

## DateTimeFormatter.getResolverFields()

```java
public Set<TemporalField> getResolverFields()
```

Gets the resolver fields to use during parsing.

This returns the resolver fields, used during the second phase of parsing
when fields are resolved into dates and times.
By default, a formatter has no resolver fields, and thus returns null.
See `withResolverFields(Set)` for more details.

**Returns:** the immutable set of resolver fields of this formatter, null if no fields

## DateTimeFormatter.withResolverFields(TemporalField...)

```java
public DateTimeFormatter withResolverFields(TemporalField... resolverFields)
```

Returns a copy of this formatter with a new set of resolver fields.

This returns a formatter with similar state to this formatter but with
the resolver fields set. By default, a formatter has no resolver fields.

Changing the resolver fields only has an effect during parsing.
Parsing a text string occurs in two phases.
Phase 1 is a basic text parse according to the fields added to the builder.
Phase 2 resolves the parsed field-value pairs into date and/or time objects.
The resolver fields are used to filter the field-value pairs between phase 1 and 2.

This can be used to select between two or more ways that a date or time might
be resolved. For example, if the formatter consists of year, month, day-of-month
and day-of-year, then there are two ways to resolve a date.
Calling this method with the arguments YEAR and
DAY_OF_YEAR will ensure that the date is
resolved using the year and day-of-year, effectively meaning that the month
and day-of-month are ignored during the resolving phase.

In a similar manner, this method can be used to ignore secondary fields that
would otherwise be cross-checked. For example, if the formatter consists of year,
month, day-of-month and day-of-week, then there is only one way to resolve a
date, but the parsed value for day-of-week will be cross-checked against the
resolved date. Calling this method with the arguments YEAR,
MONTH_OF_YEAR and
DAY_OF_MONTH will ensure that the date is
resolved correctly, but without any cross-check for the day-of-week.

In implementation terms, this method behaves as follows. The result of the
parsing phase can be considered to be a map of field to value. The behavior
of this method is to cause that map to be filtered between phase 1 and 2,
removing all fields other than those specified as arguments to this method.

This instance is immutable and unaffected by this method call.

Parameters:

- `resolverFields`: the new set of resolver fields, null if no fields

**Returns:** a formatter based on this formatter with the requested resolver style, not null

## DateTimeFormatter.withResolverFields(Set<TemporalField>)

```java
public DateTimeFormatter withResolverFields(Set<TemporalField> resolverFields)
```

Returns a copy of this formatter with a new set of resolver fields.

This returns a formatter with similar state to this formatter but with
the resolver fields set. By default, a formatter has no resolver fields.

Changing the resolver fields only has an effect during parsing.
Parsing a text string occurs in two phases.
Phase 1 is a basic text parse according to the fields added to the builder.
Phase 2 resolves the parsed field-value pairs into date and/or time objects.
The resolver fields are used to filter the field-value pairs between phase 1 and 2.

This can be used to select between two or more ways that a date or time might
be resolved. For example, if the formatter consists of year, month, day-of-month
and day-of-year, then there are two ways to resolve a date.
Calling this method with the arguments YEAR and
DAY_OF_YEAR will ensure that the date is
resolved using the year and day-of-year, effectively meaning that the month
and day-of-month are ignored during the resolving phase.

In a similar manner, this method can be used to ignore secondary fields that
would otherwise be cross-checked. For example, if the formatter consists of year,
month, day-of-month and day-of-week, then there is only one way to resolve a
date, but the parsed value for day-of-week will be cross-checked against the
resolved date. Calling this method with the arguments YEAR,
MONTH_OF_YEAR and
DAY_OF_MONTH will ensure that the date is
resolved correctly, but without any cross-check for the day-of-week.

In implementation terms, this method behaves as follows. The result of the
parsing phase can be considered to be a map of field to value. The behavior
of this method is to cause that map to be filtered between phase 1 and 2,
removing all fields other than those specified as arguments to this method.

This instance is immutable and unaffected by this method call.

Parameters:

- `resolverFields`: the new set of resolver fields, null if no fields

**Returns:** a formatter based on this formatter with the requested resolver style, not null

## DateTimeFormatter.format(TemporalAccessor)

```java
public String format(TemporalAccessor temporal)
```

Formats a date-time object using this formatter.

This formats the date-time to a String using the rules of the formatter.

Parameters:

- `temporal`: the temporal object to format, not null

**Returns:** the formatted string, not null

Throws:

- `DateTimeException`: if an error occurs during formatting

## DateTimeFormatter.formatTo(TemporalAccessor, Appendable)

```java
public void formatTo(TemporalAccessor temporal, Appendable appendable)
```

Formats a date-time object to an `Appendable` using this formatter.

This outputs the formatted date-time to the specified destination.
`Appendable` is a general purpose interface that is implemented by all
key <example-value> output classes including `StringBuffer`, `StringBuilder`,
`PrintStream` and `Writer`.

Although `Appendable` methods throw an `IOException`, this method does not.
Instead, any `IOException` is wrapped in a runtime exception.

Parameters:

- `temporal`: the temporal object to format, not null
- `appendable`: the appendable to format to, not null

Throws:

- `DateTimeException`: if an error occurs during formatting

## DateTimeFormatter.parse(CharSequence)

```java
public TemporalAccessor parse(CharSequence text)
```

Fully parses the text producing a temporal object.

This parses the entire text producing a temporal object.
It is typically more useful to use TemporalQuery).
The result of this method is `TemporalAccessor` which has been resolved,
applying basic <example-value> checks to help ensure a valid date-time.

If the parse completes without reading the entire length of the text,
or a problem occurs during parsing or merging, then an exception is thrown.

Parameters:

- `text`: the text to parse, not null

**Returns:** the parsed temporal object, not null

Throws:

- `DateTimeParseException`: if unable to parse the requested result
