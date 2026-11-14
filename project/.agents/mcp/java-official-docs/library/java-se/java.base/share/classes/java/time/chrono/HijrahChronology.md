---
title: "HijrahChronology class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/HijrahChronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HijrahChronology class (java.time.chrono)

```java
public final class HijrahChronology extends AbstractChronology implements Serializable
```

The Hijrah calendar is a lunar calendar supporting Islamic calendars.

The HijrahChronology follows the rules of the Hijrah calendar system. The Hijrah
calendar has several variants based on differences in when the new moon is
determined to have occurred and where the observation is made.
In some variants the length of each month is
computed algorithmically from the astronomical data for the moon and earth and
in others the length of the month is determined by an authorized sighting
of the new moon. For the algorithmically based calendars the calendar
can project into the future.
For sighting based calendars only historical data from past
sightings is available.

The length of each month is 29 or 30 days.
Ordinary years have 354 days; leap years have 355 days.

CLDR and LDML identify variants:

Variants of Hijrah Calendars

Chronology ID
Calendar Type
Locale extension, see `java.util.Locale`
Description

Hijrah-umalqura
islamic-umalqura
ca-islamic-umalqura
Islamic - Umm Al-Qura calendar of Saudi Arabia

Additional variants may be available through `Chronology.getAvailableChronologies()`.

Example

Selecting the chronology from the locale uses `Chronology.ofLocale`
to find the Chronology based on Locale supported BCP 47 extension mechanism
to request a specific calendar ("ca"). For example,

```java
     Locale locale = Locale.forLanguageTag("en-US-u-ca-islamic-umalqura");
     Chronology chrono = Chronology.ofLocale(locale);
```

**Implementation requirements:** This class is immutable and thread-safe.

**Implementation note:** Each Hijrah variant is configured individually. Each variant is defined by a
property resource that defines the `ID`, the `calendar type`,
the start of the calendar, the alignment with the
ISO calendar, and the length of each month for a range of years.
The variants are loaded by HijrahChronology as a resource from
hijrah-config-<calendar type>.properties.

The Hijrah property resource is a set of properties that describe the calendar.
The syntax is defined by `java.util.Properties#load(Reader)`.

Configuration of Hijrah Calendar

Property Name
Property value
Description

id
Chronology Id, for example, "Hijrah-umalqura"
The Id of the calendar in common usage

type
Calendar type, for example, "islamic-umalqura"
LDML defines the calendar types

version
Version, for example: "1.8.0_1"
The version of the Hijrah variant data

iso-start
ISO start date, formatted as `yyyy-MM-dd`, for example: "1900-04-30"
The ISO date of the first day of the minimum Hijrah year.

yyyy - a numeric 4 digit year, for example "1434"
The value is a sequence of 12 month lengths,
for example: "29 30 29 30 29 30 30 30 29 30 29 29"
The lengths of the 12 months of the year separated by whitespace.
A numeric year property must be present for every year without any gaps.
The month lengths must be between 29-32 inclusive.

Additional variants may be added by providing configuration properties files in
`<JAVA_HOME>/conf/chronology` directory. The properties
files should follow the naming convention of
`hijrah-config-<chronology id>_<calendar type>.properties`.

**Since:** 1.8

## HijrahChronology.INSTANCE

```java
public static final HijrahChronology INSTANCE
```

Singleton instance of the Islamic Umm Al-Qura calendar of Saudi Arabia.
Other Hijrah chronology variants may be available from
`Chronology.getAvailableChronologies`.

## HijrahChronology.getId()

```java
public String getId()
```

Gets the ID of the chronology.

The ID uniquely identifies the `Chronology`. It can be used to
lookup the `Chronology` using `Chronology.of(String)`.

**Returns:** the chronology ID, non-null

**See also:** #getCalendarType()

## HijrahChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the Islamic calendar.

The calendar type is an identifier defined by the
*Unicode Locale Data Markup Language (LDML)* specification.
It can be used to lookup the `Chronology` using `Chronology.of(String)`.

**Returns:** the calendar system type; non-null if the calendar has
   a standard type, otherwise null

**See also:** #getId()

## HijrahChronology.date(Era, int, int, int)

```java
public HijrahDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in Hijrah calendar system from the
era, year-of-era, month-of-year and day-of-month fields.

Parameters:

- `era`: the Hijrah era, not null
- `yearOfEra`: the year-of-era
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Hijrah local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `HijrahEra`

## HijrahChronology.date(int, int, int)

```java
public HijrahDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in Hijrah calendar system from the
proleptic-year, month-of-year and day-of-month fields.

Parameters:

- `prolepticYear`: the proleptic-year
- `month`: the month-of-year
- `dayOfMonth`: the day-of-month

**Returns:** the Hijrah local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## HijrahChronology.dateYearDay(Era, int, int)

```java
public HijrahDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in Hijrah calendar system from the
era, year-of-era and day-of-year fields.

Parameters:

- `era`: the Hijrah era, not null
- `yearOfEra`: the year-of-era
- `dayOfYear`: the day-of-year

**Returns:** the Hijrah local date, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not a `HijrahEra`

## HijrahChronology.dateYearDay(int, int)

```java
public HijrahDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in Hijrah calendar system from the
proleptic-year and day-of-year fields.

Parameters:

- `prolepticYear`: the proleptic-year
- `dayOfYear`: the day-of-year

**Returns:** the Hijrah local date, not null

Throws:

- `DateTimeException`: if the value of the year is out of range, or if the day-of-year is invalid for the year

## HijrahChronology.dateEpochDay(long)

```java
public HijrahDate dateEpochDay(long epochDay)
```

Obtains a local date in the Hijrah calendar system from the epoch-day.

Parameters:

- `epochDay`: the epoch day

**Returns:** the Hijrah local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## HijrahChronology.eraOf(int)

```java
public HijrahEra eraOf(int eraValue)
```

Creates the HijrahEra object from the numeric value.
The Hijrah calendar system has only one era covering the
proleptic years greater than zero.
This method returns the singleton HijrahEra for the value 1.

Parameters:

- `eraValue`: the era value

**Returns:** the calendar system era, not null

Throws:

- `DateTimeException`: if unable to create the era
