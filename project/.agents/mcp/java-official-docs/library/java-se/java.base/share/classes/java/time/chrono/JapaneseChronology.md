---
title: "JapaneseChronology class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/JapaneseChronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JapaneseChronology class (java.time.chrono)

```java
public final class JapaneseChronology extends AbstractChronology implements Serializable
```

The Japanese Imperial calendar system.

This chronology defines the rules of the Japanese Imperial calendar system.
This calendar system is primarily used in Japan.
The Japanese Imperial calendar system is the same as the ISO calendar system
apart from the era-based year numbering.

Japan introduced the Gregorian calendar starting with Meiji 6.
Only Meiji and later eras are supported;
dates before Meiji 6, January 1 are not supported.

The supported `ChronoField` instances are:

- `DAY_OF_WEEK`

- `DAY_OF_MONTH`

- `DAY_OF_YEAR`

- `EPOCH_DAY`

- `MONTH_OF_YEAR`

- `PROLEPTIC_MONTH`

- `YEAR_OF_ERA`

- `YEAR`

- `ERA`

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## JapaneseChronology.INSTANCE

```java
public static final JapaneseChronology INSTANCE
```

Singleton instance for Japanese chronology.

## JapaneseChronology.getId()

```java
public String getId()
```

Gets the ID of the chronology - 'Japanese'.

The ID uniquely identifies the `Chronology`.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.

**Returns:** the chronology ID - 'Japanese'

**See also:** #getCalendarType()

## JapaneseChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the underlying calendar system - 'japanese'.

The calendar type is an identifier defined by the
*Unicode Locale Data Markup Language (LDML)* specification.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.
It can also be used as part of a locale, accessible via
`Locale.getUnicodeLocaleType(String)` with the key 'ca'.

**Returns:** the calendar system type - 'japanese'

**See also:** #getId()

## JapaneseChronology.date(Era, int, int, int)

```java
public JapaneseDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in Japanese calendar system from the
era, year-of-era, month-of-year and day-of-month fields.

The Japanese month and day-of-month are the same as those in the
ISO calendar system. They are not reset when the era changes.
For example:

```java
 6th Jan Showa 64 = ISO 1989-01-06
 7th Jan Showa 64 = ISO 1989-01-07
 8th Jan Heisei 1 = ISO 1989-01-08
 9th Jan Heisei 1 = ISO 1989-01-09
```

Parameters:

- `era`: the Japanese era, not null
- `yearOfEra`: the year-of-era
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Japanese local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `JapaneseEra`

## JapaneseChronology.date(int, int, int)

```java
public JapaneseDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in Japanese calendar system from the
proleptic-year, month-of-year and day-of-month fields.

The Japanese proleptic year, month and day-of-month are the same as those
in the ISO calendar system. They are not reset when the era changes.

Parameters:

- `prolepticYear`: the proleptic-year
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Japanese local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## JapaneseChronology.dateYearDay(Era, int, int)

```java
public JapaneseDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in Japanese calendar system from the
era, year-of-era and day-of-year fields.

The day-of-year in this factory is expressed relative to the start of the year-of-era.
This definition changes the normal meaning of day-of-year only in those years
where the year-of-era is reset to one due to a change in the era.
For example:

```java
 6th Jan Showa 64 = day-of-year 6
 7th Jan Showa 64 = day-of-year 7
 8th Jan Heisei 1 = day-of-year 1
 9th Jan Heisei 1 = day-of-year 2
```

Parameters:

- `era`: the Japanese era, not null
- `yearOfEra`: the year-of-era
- `dayOfYear`: the day-of-year

**Returns:** the Japanese local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `JapaneseEra`

## JapaneseChronology.dateYearDay(int, int)

```java
public JapaneseDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in Japanese calendar system from the
proleptic-year and day-of-year fields.

The day-of-year in this factory is expressed relative to the start of the proleptic year.
The Japanese proleptic year and day-of-year are the same as those in the ISO calendar system.
They are not reset when the era changes.

Parameters:

- `prolepticYear`: the proleptic-year
- `dayOfYear`: the day-of-year

**Returns:** the Japanese local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## JapaneseChronology.dateEpochDay(long)

```java
public JapaneseDate dateEpochDay(long epochDay)
```

Obtains a local date in the Japanese calendar system from the epoch-day.

Parameters:

- `epochDay`: the epoch day

**Returns:** the Japanese local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## JapaneseChronology.isLeapYear(long)

```java
public boolean isLeapYear(long prolepticYear)
```

Checks if the specified year is a leap year.

Japanese calendar leap years occur exactly in line with ISO leap years.
This method does not validate the year passed in, and only has a
well-defined result for years in the supported range.

Parameters:

- `prolepticYear`: the proleptic-year to check, not validated for range

**Returns:** true if the year is a leap year

## JapaneseChronology.eraOf(int)

```java
public JapaneseEra eraOf(int eraValue)
```

Returns the calendar system era object from the given numeric value.

The numeric values supported by this method are the same as the
numeric values supported by `JapaneseEra.of(int)`.

Parameters:

- `eraValue`: the era value

**Returns:** the Japanese `Era` for the given numeric era value

Throws:

- `DateTimeException`: if `eraValue` is invalid

## JapaneseChronology.isIsoBased()

```java
public boolean isIsoBased()
```

`JapaneseChronology` is an ISO based chronology, which supports fields
in `IsoFields`, such as DAY_OF_QUARTER
and QUARTER_OF_YEAR.

**See also:** IsoFields

**Returns:** `true`

**Since:** 19
