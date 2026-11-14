---
title: "MinguoChronology class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/MinguoChronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MinguoChronology class (java.time.chrono)

```java
public final class MinguoChronology extends AbstractChronology implements Serializable
```

The Minguo calendar system.

This chronology defines the rules of the Minguo calendar system.
This calendar system is primarily used in the Republic of China, often known as Taiwan.
Dates are aligned such that `0001-01-01 (Minguo)` is `1912-01-01 (ISO)`.

The fields are defined as follows:

- era - There are two eras, the current 'Republic' (ERA_ROC) and the previous era (ERA_BEFORE_ROC).

- year-of-era - The year-of-era for the current era increases uniformly from the epoch at year one.
 For the previous era the year increases from one as time goes backwards.
 The value for the current era is equal to the ISO proleptic-year minus 1911.

- proleptic-year - The proleptic year is the same as the year-of-era for the
 current era. For the previous era, years have zero, then negative values.
 The value is equal to the ISO proleptic-year minus 1911.

- month-of-year - The Minguo month-of-year exactly matches ISO.

- day-of-month - The Minguo day-of-month exactly matches ISO.

- day-of-year - The Minguo day-of-year exactly matches ISO.

- leap-year - The Minguo leap-year pattern exactly matches ISO, such that the two calendars
 are never out of step.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## MinguoChronology.INSTANCE

```java
public static final MinguoChronology INSTANCE
```

Singleton instance for the Minguo chronology.

## MinguoChronology.getId()

```java
public String getId()
```

Gets the ID of the chronology - 'Minguo'.

The ID uniquely identifies the `Chronology`.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.

**Returns:** the chronology ID - 'Minguo'

**See also:** #getCalendarType()

## MinguoChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the underlying calendar system - 'roc'.

The calendar type is an identifier defined by the
*Unicode Locale Data Markup Language (LDML)* specification.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.
It can also be used as part of a locale, accessible via
`Locale.getUnicodeLocaleType(String)` with the key 'ca'.

**Returns:** the calendar system type - 'roc'

**See also:** #getId()

## MinguoChronology.date(Era, int, int, int)

```java
public MinguoDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in Minguo calendar system from the
era, year-of-era, month-of-year and day-of-month fields.

Parameters:

- `era`: the Minguo era, not null
- `yearOfEra`: the year-of-era
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Minguo local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `MinguoEra`

## MinguoChronology.date(int, int, int)

```java
public MinguoDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in Minguo calendar system from the
proleptic-year, month-of-year and day-of-month fields.

Parameters:

- `prolepticYear`: the proleptic-year
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Minguo local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## MinguoChronology.dateYearDay(Era, int, int)

```java
public MinguoDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in Minguo calendar system from the
era, year-of-era and day-of-year fields.

Parameters:

- `era`: the Minguo era, not null
- `yearOfEra`: the year-of-era
- `dayOfYear`: the day-of-year

**Returns:** the Minguo local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `MinguoEra`

## MinguoChronology.dateYearDay(int, int)

```java
public MinguoDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in Minguo calendar system from the
proleptic-year and day-of-year fields.

Parameters:

- `prolepticYear`: the proleptic-year
- `dayOfYear`: the day-of-year

**Returns:** the Minguo local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## MinguoChronology.dateEpochDay(long)

```java
public MinguoDate dateEpochDay(long epochDay)
```

Obtains a local date in the Minguo calendar system from the epoch-day.

Parameters:

- `epochDay`: the epoch day

**Returns:** the Minguo local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## MinguoChronology.isLeapYear(long)

```java
public boolean isLeapYear(long prolepticYear)
```

Checks if the specified year is a leap year.

Minguo leap years occur exactly in line with ISO leap years.
This method does not validate the year passed in, and only has a
well-defined result for years in the supported range.

Parameters:

- `prolepticYear`: the proleptic-year to check, not validated for range

**Returns:** true if the year is a leap year

## MinguoChronology.isIsoBased()

```java
public boolean isIsoBased()
```

`MinguoChronology` is an ISO based chronology, which supports fields
in `IsoFields`, such as DAY_OF_QUARTER
and QUARTER_OF_YEAR.

**See also:** IsoFields

**Returns:** `true`

**Since:** 19
