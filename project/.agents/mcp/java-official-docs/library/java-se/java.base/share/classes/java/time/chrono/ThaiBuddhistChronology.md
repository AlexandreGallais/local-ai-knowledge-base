---
title: "ThaiBuddhistChronology class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ThaiBuddhistChronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThaiBuddhistChronology class (java.time.chrono)

```java
public final class ThaiBuddhistChronology extends AbstractChronology implements Serializable
```

The Thai Buddhist calendar system.

This chronology defines the rules of the Thai Buddhist calendar system.
This calendar system is primarily used in Thailand.
Dates are aligned such that `2484-01-01 (Buddhist)` is `1941-01-01 (ISO)`.

The fields are defined as follows:

- era - There are two eras, the current 'Buddhist' (ERA_BE) and the previous era (ERA_BEFORE_BE).

- year-of-era - The year-of-era for the current era increases uniformly from the epoch at year one.
 For the previous era the year increases from one as time goes backwards.
 The value for the current era is equal to the ISO proleptic-year plus 543.

- proleptic-year - The proleptic year is the same as the year-of-era for the
 current era. For the previous era, years have zero, then negative values.
 The value is equal to the ISO proleptic-year plus 543.

- month-of-year - The ThaiBuddhist month-of-year exactly matches ISO.

- day-of-month - The ThaiBuddhist day-of-month exactly matches ISO.

- day-of-year - The ThaiBuddhist day-of-year exactly matches ISO.

- leap-year - The ThaiBuddhist leap-year pattern exactly matches ISO, such that the two calendars
 are never out of step.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## ThaiBuddhistChronology.INSTANCE

```java
public static final ThaiBuddhistChronology INSTANCE
```

Singleton instance of the Buddhist chronology.

## ThaiBuddhistChronology.getId()

```java
public String getId()
```

Gets the ID of the chronology - 'ThaiBuddhist'.

The ID uniquely identifies the `Chronology`.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.

**Returns:** the chronology ID - 'ThaiBuddhist'

**See also:** #getCalendarType()

## ThaiBuddhistChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the underlying calendar system - 'buddhist'.

The calendar type is an identifier defined by the
*Unicode Locale Data Markup Language (LDML)* specification.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.
It can also be used as part of a locale, accessible via
`Locale.getUnicodeLocaleType(String)` with the key 'ca'.

**Returns:** the calendar system type - 'buddhist'

**See also:** #getId()

## ThaiBuddhistChronology.date(Era, int, int, int)

```java
public ThaiBuddhistDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in Thai Buddhist calendar system from the
era, year-of-era, month-of-year and day-of-month fields.

Parameters:

- `era`: the Thai Buddhist era, not null
- `yearOfEra`: the year-of-era
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Thai Buddhist local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `ThaiBuddhistEra`

## ThaiBuddhistChronology.date(int, int, int)

```java
public ThaiBuddhistDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in Thai Buddhist calendar system from the
proleptic-year, month-of-year and day-of-month fields.

Parameters:

- `prolepticYear`: the proleptic-year
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Thai Buddhist local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## ThaiBuddhistChronology.dateYearDay(Era, int, int)

```java
public ThaiBuddhistDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in Thai Buddhist calendar system from the
era, year-of-era and day-of-year fields.

Parameters:

- `era`: the Thai Buddhist era, not null
- `yearOfEra`: the year-of-era
- `dayOfYear`: the day-of-year

**Returns:** the Thai Buddhist local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `ThaiBuddhistEra`

## ThaiBuddhistChronology.dateYearDay(int, int)

```java
public ThaiBuddhistDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in Thai Buddhist calendar system from the
proleptic-year and day-of-year fields.

Parameters:

- `prolepticYear`: the proleptic-year
- `dayOfYear`: the day-of-year

**Returns:** the Thai Buddhist local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## ThaiBuddhistChronology.dateEpochDay(long)

```java
public ThaiBuddhistDate dateEpochDay(long epochDay)
```

Obtains a local date in the Thai Buddhist calendar system from the epoch-day.

Parameters:

- `epochDay`: the epoch day

**Returns:** the Thai Buddhist local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## ThaiBuddhistChronology.isLeapYear(long)

```java
public boolean isLeapYear(long prolepticYear)
```

Checks if the specified year is a leap year.

Thai Buddhist leap years occur exactly in line with ISO leap years.
This method does not validate the year passed in, and only has a
well-defined result for years in the supported range.

Parameters:

- `prolepticYear`: the proleptic-year to check, not validated for range

**Returns:** true if the year is a leap year

## ThaiBuddhistChronology.isIsoBased()

```java
public boolean isIsoBased()
```

`ThaiBuddhistChronology` is an ISO based chronology, which supports fields
in `IsoFields`, such as DAY_OF_QUARTER
and QUARTER_OF_YEAR.

**See also:** IsoFields

**Returns:** `true`

**Since:** 19
