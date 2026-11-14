---
title: "Chronology interface (java.time.chrono) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/Chronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Chronology interface (java.time.chrono)

```java
public interface Chronology extends Comparable<Chronology>
```

A calendar system, used to organize and identify dates.

The main date and time API is built on the ISO calendar system.
The chronology operates behind the scenes to represent the general concept of a calendar system.
For example, the Japanese, Minguo, Thai Buddhist and others.

Most other calendar systems also operate on the shared concepts of year, month and day,
linked to the cycles of the Earth around the Sun, and the Moon around the Earth.
These shared concepts are defined by `ChronoField` and are available
for use by any `Chronology` implementation:

```java
  LocalDate isoDate = ...
  ThaiBuddhistDate thaiDate = ...
  int isoYear = isoDate.get(ChronoField.YEAR);
  int thaiYear = thaiDate.get(ChronoField.YEAR);
```

As shown, although the date objects are in different calendar systems, represented by different
`Chronology` instances, both can be queried using the same constant on `ChronoField`.
For a full discussion of the implications of this, see `ChronoLocalDate`.
In general, the advice is to use the known ISO-based `LocalDate`, rather than
`ChronoLocalDate`.

While a `Chronology` object typically uses `ChronoField` and is based on
an era, year-of-era, month-of-year, day-of-month model of a date, this is not required.
A `Chronology` instance may represent a totally different kind of calendar system,
such as the Mayan.

In practical terms, the `Chronology` instance also acts as a factory.
The `of(String)` method allows an instance to be looked up by identifier,
while the `ofLocale(Locale)` method allows lookup by locale.

The `Chronology` instance provides a set of methods to create `ChronoLocalDate` instances.
The date classes are used to manipulate specific dates.

-  dateNow()

-  dateNow(clock)

-  dateNow(zone)

-  int, int) date(yearProleptic, month, day)

-  int, int, int) date(era, yearOfEra, month, day)

-  int) dateYearDay(yearProleptic, dayOfYear)

-  int, int) dateYearDay(era, yearOfEra, dayOfYear)

-  date(TemporalAccessor)

#### Adding New Calendars

The set of available chronologies can be extended by applications.
Adding a new calendar system requires the writing of an implementation of
`Chronology`, `ChronoLocalDate` and `Era`.
The majority of the logic specific to the calendar system will be in the
`ChronoLocalDate` implementation.
The `Chronology` implementation acts as a factory.

To permit the discovery of additional chronologies, the ServiceLoader
is used. A file must be added to the `META-INF/services` directory with the
name 'java.time.chrono.Chronology' listing the implementation classes.
See the ServiceLoader for more details on service loading.
For lookup by id or calendarType, the system provided calendars are found
first followed by application provided calendars.

Each chronology must define a chronology ID that is unique within the system.
If the chronology represents a calendar system defined by the
CLDR specification then the calendar type is the concatenation of the
CLDR type and, if applicable, the CLDR variant.

**Implementation requirements:** This interface must be implemented with care to ensure other classes operate correctly.
All implementations that can be instantiated must be final, immutable and thread-safe.
Subclasses should be Serializable wherever possible.

**Since:** 1.8

## Chronology.from(TemporalAccessor)

```java
static Chronology from(TemporalAccessor temporal)
```

Obtains an instance of `Chronology` from a temporal object.

This obtains a chronology based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `Chronology`.

The conversion will obtain the chronology using `TemporalQueries.chronology()`.
If the specified temporal object does not have a chronology, `IsoChronology` is returned.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `Chronology::from`.

Parameters:

- `temporal`: the temporal to convert, not null

**Returns:** the chronology, not null

Throws:

- `DateTimeException`: if unable to convert to a `Chronology`

## Chronology.ofLocale(Locale)

```java
static Chronology ofLocale(Locale locale)
```

Obtains an instance of `Chronology` from a locale.

This returns a `Chronology` based on the specified locale,
typically returning `IsoChronology`. Other calendar systems
are only returned if they are explicitly selected within the locale.

The `Locale` class provide access to a range of information useful
for localizing an application. This includes the language and region,
such as "en-GB" for English as used in Great Britain.

The `Locale` class also supports an extension mechanism that
can be used to identify a calendar system. The mechanism is a form
of key-value pairs, where the calendar system has the key "ca".
For example, the locale "en-JP-u-ca-japanese" represents the English
language as used in Japan with the Japanese calendar system.

This method finds the desired calendar system in a manner equivalent
to passing "ca" to `Locale.getUnicodeLocaleType(String)`.
If the "ca" key is not present, then `IsoChronology` is returned.

Note that the behavior of this method differs from the older
`java.util.Calendar.getInstance(Locale)` method.
If that method receives a locale of "th_TH" it will return `BuddhistCalendar`.
By contrast, this method will return `IsoChronology`.
Passing the locale "th-TH-u-ca-buddhist" into either method will
result in the Thai Buddhist calendar system and is therefore the
recommended approach going forward for Thai calendar system localization.

A similar, but simpler, situation occurs for the Japanese calendar system.
The locale "jp_JP_JP" has previously been used to access the calendar.
However, unlike the Thai locale, "ja_JP_JP" is automatically converted by
`Locale` to the modern and recommended form of "ja-JP-u-ca-japanese".
Thus, there is no difference in behavior between this method and
`Calendar#getInstance(Locale)`.

Parameters:

- `locale`: the locale to use to obtain the calendar system, not null

**Returns:** the calendar system associated with the locale, not null

Throws:

- `DateTimeException`: if the locale-specified calendar cannot be found

## Chronology.of(String)

```java
static Chronology of(String id)
```

Obtains an instance of `Chronology` from a chronology ID or
calendar system type.

This returns a chronology based on either the ID or the type.
The chronology ID uniquely identifies the chronology.
The calendar system type is defined by the
CLDR specification.

The chronology may be a system chronology or a chronology
provided by the application via ServiceLoader configuration.

Since some calendars can be customized, the ID or type typically refers
to the default customization. For example, the Gregorian calendar can have multiple
cutover dates from the Julian, but the lookup only provides the default cutover date.

Parameters:

- `id`: the chronology ID or calendar system type, not null

**Returns:** the chronology with the identifier requested, not null

Throws:

- `DateTimeException`: if the chronology cannot be found

## Chronology.getAvailableChronologies()

```java
static Set<Chronology> getAvailableChronologies()
```

Returns the available chronologies.

Each returned `Chronology` is available for use in the system.
The set of chronologies includes the system chronologies and
any chronologies provided by the application via ServiceLoader
configuration.

**Returns:** the independent, modifiable set of the available chronology IDs, not null

## Chronology.getId()

```java
String getId()
```

Gets the ID of the chronology.

The ID uniquely identifies the `Chronology`.
It can be used to lookup the `Chronology` using `of(String)`.

**Returns:** the chronology ID, not null

**See also:** #getCalendarType()

## Chronology.getCalendarType()

```java
String getCalendarType()
```

Gets the calendar type of the calendar system.

The calendar type is an identifier defined by the CLDR and
*Unicode Locale Data Markup Language (LDML)* specifications
to uniquely identify a calendar.
The `getCalendarType` is the concatenation of the CLDR calendar type
and the variant, if applicable, is appended separated by "-".
The calendar type is used to lookup the `Chronology` using `of(String)`.

**Returns:** the calendar system type, null if the calendar is not defined by CLDR/LDML

**See also:** #getId()

## Chronology.date(Era, int, int, int)

```java
default ChronoLocalDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in this chronology from the era, year-of-era,
month-of-year and day-of-month fields.

Parameters:

- `era`: the era of the correct type for the chronology, not null
- `yearOfEra`: the chronology year-of-era
- `month`: the chronology month-of-year
- `dayOfMonth`: the chronology day-of-month

**Implementation requirements:** The default implementation combines the era and year-of-era into a proleptic
year before calling int, int).

**Returns:** the local date in this chronology, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not of the correct type for the chronology

## Chronology.date(int, int, int)

```java
ChronoLocalDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in this chronology from the proleptic-year,
month-of-year and day-of-month fields.

Parameters:

- `prolepticYear`: the chronology proleptic-year
- `month`: the chronology month-of-year
- `dayOfMonth`: the chronology day-of-month

**Returns:** the local date in this chronology, not null

Throws:

- `DateTimeException`: if unable to create the date

## Chronology.dateYearDay(Era, int, int)

```java
default ChronoLocalDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in this chronology from the era, year-of-era and
day-of-year fields.

Parameters:

- `era`: the era of the correct type for the chronology, not null
- `yearOfEra`: the chronology year-of-era
- `dayOfYear`: the chronology day-of-year

**Implementation requirements:** The default implementation combines the era and year-of-era into a proleptic
year before calling int).

**Returns:** the local date in this chronology, not null

Throws:

- `DateTimeException`: if unable to create the date
- `ClassCastException`: if the `era` is not of the correct type for the chronology

## Chronology.dateYearDay(int, int)

```java
ChronoLocalDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in this chronology from the proleptic-year and
day-of-year fields.

Parameters:

- `prolepticYear`: the chronology proleptic-year
- `dayOfYear`: the chronology day-of-year

**Returns:** the local date in this chronology, not null

Throws:

- `DateTimeException`: if unable to create the date

## Chronology.dateEpochDay(long)

```java
ChronoLocalDate dateEpochDay(long epochDay)
```

Obtains a local date in this chronology from the epoch-day.

The definition of EPOCH_DAY is the same
for all calendar systems, thus it can be used for conversion.

Parameters:

- `epochDay`: the epoch day

**Returns:** the local date in this chronology, not null

Throws:

- `DateTimeException`: if unable to create the date

## Chronology.dateNow()

```java
default ChronoLocalDate dateNow()
```

Obtains the current local date in this chronology from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Implementation requirements:** The default implementation invokes `dateNow(Clock)`.

**Returns:** the current local date using the system clock and default time-zone, not null

Throws:

- `DateTimeException`: if unable to create the date

## Chronology.dateNow(ZoneId)

```java
default ChronoLocalDate dateNow(ZoneId zone)
```

Obtains the current local date in this chronology from the system clock in the specified time-zone.

This will query the system clock to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Implementation requirements:** The default implementation invokes `dateNow(Clock)`.

**Returns:** the current local date using the system clock, not null

Throws:

- `DateTimeException`: if unable to create the date

## Chronology.dateNow(Clock)

```java
default ChronoLocalDate dateNow(Clock clock)
```

Obtains the current local date in this chronology from the specified clock.

This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Implementation requirements:** The default implementation invokes `date(TemporalAccessor)`.

**Returns:** the current local date, not null

Throws:

- `DateTimeException`: if unable to create the date

## Chronology.date(TemporalAccessor)

```java
ChronoLocalDate date(TemporalAccessor temporal)
```

Obtains a local date in this chronology from another temporal object.

This obtains a date in this chronology based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ChronoLocalDate`.

The conversion typically uses the EPOCH_DAY
field, which is standardized across calendar systems.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `aChronology::date`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the local date in this chronology, not null

**See also:** ChronoLocalDate#from(TemporalAccessor)

Throws:

- `DateTimeException`: if unable to create the date
