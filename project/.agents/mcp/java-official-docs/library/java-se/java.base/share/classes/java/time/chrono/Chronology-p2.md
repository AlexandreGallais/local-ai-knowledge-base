---
title: "Chronology interface (java.time.chrono) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/Chronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Chronology interface (java.time.chrono) (part 2 of 2)

## Chronology.localDateTime(TemporalAccessor)

```java
default ChronoLocalDateTime<? extends ChronoLocalDate> localDateTime(TemporalAccessor temporal)
```

Obtains a local date-time in this chronology from another temporal object.

This obtains a date-time in this chronology based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ChronoLocalDateTime`.

The conversion extracts and combines the `ChronoLocalDate` and the
`LocalTime` from the temporal object.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.
The result uses this chronology.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `aChronology::localDateTime`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the local date-time in this chronology, not null

**See also:** ChronoLocalDateTime#from(TemporalAccessor)

Throws:

- `DateTimeException`: if unable to create the date-time

## Chronology.zonedDateTime(TemporalAccessor)

```java
default ChronoZonedDateTime<? extends ChronoLocalDate> zonedDateTime(TemporalAccessor temporal)
```

Obtains a `ChronoZonedDateTime` in this chronology from another temporal object.

This obtains a zoned date-time in this chronology based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ChronoZonedDateTime`.

The conversion will first obtain a `ZoneId` from the temporal object,
falling back to a `ZoneOffset` if necessary. It will then try to obtain
an `Instant`, falling back to a `ChronoLocalDateTime` if necessary.
The result will be either the combination of `ZoneId` or `ZoneOffset`
with `Instant` or `ChronoLocalDateTime`.
Implementations are permitted to perform optimizations such as accessing
those fields that are equivalent to the relevant objects.
The result uses this chronology.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `aChronology::zonedDateTime`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the zoned date-time in this chronology, not null

**See also:** ChronoZonedDateTime#from(TemporalAccessor)

Throws:

- `DateTimeException`: if unable to create the date-time

## Chronology.zonedDateTime(Instant, ZoneId)

```java
default ChronoZonedDateTime<? extends ChronoLocalDate> zonedDateTime(Instant instant, ZoneId zone)
```

Obtains a `ChronoZonedDateTime` in this chronology from an `Instant`.

This obtains a zoned date-time with the same instant as that specified.

Parameters:

- `instant`: the instant to create the date-time from, not null
- `zone`: the time-zone, not null

**Returns:** the zoned date-time, not null

Throws:

- `DateTimeException`: if the result exceeds the supported range

## Chronology.isLeapYear(long)

```java
boolean isLeapYear(long prolepticYear)
```

Checks if the specified year is a leap year.

A leap-year is a year of a longer length than normal.
The exact meaning is determined by the chronology according to the following constraints.

- a leap-year must imply a year-length longer than a non leap-year.

- a chronology that does not support the concept of a year must return false.

- the correct result must be returned for all years within the
    valid range of years for the chronology.

Outside the range of valid years an implementation is free to return
either a best guess or false.
An implementation must not throw an exception, even if the year is
outside the range of valid years.

Parameters:

- `prolepticYear`: the proleptic-year to check, not validated for range

**Returns:** true if the year is a leap year

## Chronology.prolepticYear(Era, int)

```java
int prolepticYear(Era era, int yearOfEra)
```

Calculates the proleptic-year given the era and year-of-era.

This combines the era and year-of-era into the single proleptic-year field.

If the chronology makes active use of eras, such as `JapaneseChronology`
then the year-of-era will be validated against the era.
For other chronologies, validation is optional.

Parameters:

- `era`: the era of the correct type for the chronology, not null
- `yearOfEra`: the chronology year-of-era

**Returns:** the proleptic-year

Throws:

- `DateTimeException`: if unable to convert to a proleptic-year, such as if the year is invalid for the era
- `ClassCastException`: if the `era` is not of the correct type for the chronology

## Chronology.eraOf(int)

```java
Era eraOf(int eraValue)
```

Creates the chronology era object from the numeric value.

The era is, conceptually, the largest division of the time-line.
Most calendar systems have a single epoch dividing the time-line into two eras.
However, some have multiple eras, such as one for the reign of each leader.
The exact meaning is determined by the chronology according to the following constraints.

The era in use at 1970-01-01 must have the value 1.
Later eras must have sequentially higher values.
Earlier eras must have sequentially lower values.
Each chronology must refer to an enum or similar singleton to provide the era values.

This method returns the singleton era of the correct type for the specified era value.

Parameters:

- `eraValue`: the era value

**Returns:** the calendar system era, not null

Throws:

- `DateTimeException`: if unable to create the era

## Chronology.eras()

```java
List<Era> eras()
```

Gets the list of eras for the chronology.

Most calendar systems have an era, within which the year has meaning.
If the calendar system does not support the concept of eras, an empty
list must be returned.

**Returns:** the list of eras for the chronology, may be immutable, not null

## Chronology.range(ChronoField)

```java
ValueRange range(ChronoField field)
```

Gets the range of valid values for the specified field.

All fields can be expressed as a `long` integer.
This method returns an object that describes the valid range for that value.

Note that the result only describes the minimum and maximum valid values
and it is important not to read too much into them. For example, there
could be values within the range that are invalid for the field.

This method will return a result whether or not the chronology supports the field.

Parameters:

- `field`: the field to get the range for, not null

**Returns:** the range of valid values for the field, not null

Throws:

- `DateTimeException`: if the range for the field cannot be obtained

## Chronology.getDisplayName(TextStyle, Locale)

```java
default String getDisplayName(TextStyle style, Locale locale)
```

Gets the textual representation of this chronology.

This returns the textual name used to identify the chronology,
suitable for presentation to the user.
The parameters control the style of the returned text and the locale.

Parameters:

- `style`: the style of the text required, not null
- `locale`: the locale to use, not null

**Implementation requirements:** The default implementation behaves as though the formatter was used to
format the chronology textual name.

**Returns:** the text value of the chronology, not null

## Chronology.resolveDate(Map<TemporalField, Long>, ResolverStyle)

```java
ChronoLocalDate resolveDate(Map<TemporalField, Long> fieldValues, ResolverStyle resolverStyle)
```

Resolves parsed `ChronoField` values into a date during parsing.

Most `TemporalField` implementations are resolved using the
resolve method on the field. By contrast, the `ChronoField` class
defines fields that only have meaning relative to the chronology.
As such, `ChronoField` date fields are resolved here in the
context of a specific chronology.

The default implementation, which explains typical resolve behaviour,
is provided in `AbstractChronology`.

Parameters:

- `fieldValues`: the map of fields to values, which can be updated, not null
- `resolverStyle`: the requested type of resolve, not null

**Returns:** the resolved date, null if insufficient information to create a date

Throws:

- `DateTimeException`: if the date cannot be resolved, typically because of a conflict in the input data

## Chronology.period(int, int, int)

```java
default ChronoPeriod period(int years, int months, int days)
```

Obtains a period for this chronology based on years, months and days.

This returns a period tied to this chronology using the specified
years, months and days.  All supplied chronologies use periods
based on years, months and days, however the `ChronoPeriod` API
allows the period to be represented using other units.

Parameters:

- `years`: the number of years, may be negative
- `months`: the number of years, may be negative
- `days`: the number of years, may be negative

**Implementation requirements:** The default implementation returns an implementation class suitable
for most calendar systems. It is based solely on the three units.
Normalization, addition and subtraction derive the number of months
in a year from the `range(ChronoField)`. If the number of
months within a year is fixed, then the calculation approach for
addition, subtraction and normalization is slightly different.

If implementing an unusual calendar system that is not based on
years, months and days, or where you want direct control, then
the `ChronoPeriod` interface must be directly implemented.

The returned period is immutable and thread-safe.

**Returns:** the period in terms of this chronology, not null

## Chronology.epochSecond(int, int, int, int, int, int, ZoneOffset)

```java
default long epochSecond(int prolepticYear, int month, int dayOfMonth, int hour, int minute, int second, ZoneOffset zoneOffset)
```

Gets the number of seconds from the epoch of 1970-01-01T00:00:00Z.

The number of seconds is calculated using the proleptic-year,
month, day-of-month, hour, minute, second, and zoneOffset.

Parameters:

- `prolepticYear`: the chronology proleptic-year
- `month`: the chronology month-of-year
- `dayOfMonth`: the chronology day-of-month
- `hour`: the hour-of-day, from 0 to 23
- `minute`: the minute-of-hour, from 0 to 59
- `second`: the second-of-minute, from 0 to 59
- `zoneOffset`: the zone offset, not null

**Returns:** the number of seconds relative to 1970-01-01T00:00:00Z, may be negative

**Since:** 9

Throws:

- `DateTimeException`: if any of the values are out of range

## Chronology.epochSecond(Era, int, int, int, int, int, int, ZoneOffset)

```java
default long epochSecond(Era era, int yearOfEra, int month, int dayOfMonth, int hour, int minute, int second, ZoneOffset zoneOffset)
```

Gets the number of seconds from the epoch of 1970-01-01T00:00:00Z.

The number of seconds is calculated using the era, year-of-era,
month, day-of-month, hour, minute, second, and zoneOffset.

Parameters:

- `era`: the era of the correct type for the chronology, not null
- `yearOfEra`: the chronology year-of-era
- `month`: the chronology month-of-year
- `dayOfMonth`: the chronology day-of-month
- `hour`: the hour-of-day, from 0 to 23
- `minute`: the minute-of-hour, from 0 to 59
- `second`: the second-of-minute, from 0 to 59
- `zoneOffset`: the zone offset, not null

**Returns:** the number of seconds relative to 1970-01-01T00:00:00Z, may be negative

**Since:** 9

Throws:

- `DateTimeException`: if any of the values are out of range

## Chronology.isIsoBased()

```java
default boolean isIsoBased()
```

Checks if this chronology is ISO based.

An ISO based chronology has the same basic <example-value> as the ISO chronology, i.e., the chronology has the same number of months, the number
of days in each month, and day-of-year and leap years are the same as ISO chronology.
It also supports the concept of week-based-year of ISO chronology.
For example, the Minguo, ThaiThaiBuddhist and Japanese chronologies are ISO based.

**Implementation requirements:** The default implementation returns `false`.

**Returns:** `true` only if all the fields of `IsoFields` are supported by
         this chronology. Otherwise, returns `false`.

**See also:** IsoChronology

**See also:** JapaneseChronology

**See also:** MinguoChronology

**See also:** ThaiBuddhistChronology

**See also:** IsoFields

**Since:** 19

## Chronology.compareTo(Chronology)

```java
int compareTo(Chronology other)
```

Compares this chronology to another chronology.

The comparison order first by the chronology ID string, then by any
additional information specific to the subclass.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `other`: the other chronology to compare to, not null

**Returns:** the comparator value, that is this ID string compared with the `other`'s ID string
         unless the ID strings are equal and
         the chronology distinguishes instances using additional information

## Chronology.equals(Object)

```java
boolean equals(Object obj)
```

Checks if this chronology is equal to another chronology.

The comparison is based on the entire state of the object.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other chronology

## Chronology.hashCode()

```java
int hashCode()
```

A hash code for this chronology.

The hash code should be based on the entire state of the object.

**Returns:** a suitable hash code

## Chronology.toString()

```java
String toString()
```

Outputs this chronology as a `String`.

The format should include the entire state of the object.

**Returns:** a string representation of this chronology, not null
