---
title: "JapaneseDate class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/JapaneseDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# JapaneseDate class (java.time.chrono)

```java
public final class JapaneseDate extends ChronoLocalDateImpl<JapaneseDate> implements ChronoLocalDate, Serializable
```

A date in the Japanese Imperial calendar system.

This date operates using the Japanese Imperial calendar.
This calendar system is primarily used in Japan.

The Japanese Imperial calendar system is the same as the ISO calendar system
apart from the era-based year numbering. The proleptic-year is defined to be
equal to the ISO proleptic-year.

Japan introduced the Gregorian calendar starting with Meiji 6.
Only Meiji and later eras are supported;
dates before Meiji 6, January 1 are not supported.

For example, the Japanese year "Heisei 24" corresponds to ISO year "2012".

Calling `japaneseDate.get(YEAR_OF_ERA)` will return 24.

Calling `japaneseDate.get(YEAR)` will return 2012.

Calling `japaneseDate.get(ERA)` will return 2, corresponding to
`JapaneseChronology.ERA_HEISEI`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## JapaneseDate.now()

```java
public static JapaneseDate now()
```

Obtains the current `JapaneseDate` from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date using the system clock and default time-zone, not null

## JapaneseDate.now(ZoneId)

```java
public static JapaneseDate now(ZoneId zone)
```

Obtains the current `JapaneseDate` from the system clock in the specified time-zone.

This will query the system clock to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date using the system clock, not null

## JapaneseDate.now(Clock)

```java
public static JapaneseDate now(Clock clock)
```

Obtains the current `JapaneseDate` from the specified clock.

This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date, not null

Throws:

- `DateTimeException`: if the current date cannot be obtained

## JapaneseDate.of(JapaneseEra, int, int, int)

```java
public static JapaneseDate of(JapaneseEra era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a `JapaneseDate` representing a date in the Japanese calendar
system from the era, year-of-era, month-of-year and day-of-month fields.

This returns a `JapaneseDate` with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

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
- `yearOfEra`: the Japanese year-of-era
- `month`: the Japanese month-of-year, from 1 to 12
- `dayOfMonth`: the Japanese day-of-month, from 1 to 31

**Returns:** the date in Japanese calendar system, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year, or if the date is not a Japanese era

## JapaneseDate.of(int, int, int)

```java
public static JapaneseDate of(int prolepticYear, int month, int dayOfMonth)
```

Obtains a `JapaneseDate` representing a date in the Japanese calendar
system from the proleptic-year, month-of-year and day-of-month fields.

This returns a `JapaneseDate` with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

The Japanese proleptic year, month and day-of-month are the same as those
in the ISO calendar system. They are not reset when the era changes.

Parameters:

- `prolepticYear`: the Japanese proleptic-year
- `month`: the Japanese month-of-year, from 1 to 12
- `dayOfMonth`: the Japanese day-of-month, from 1 to 31

**Returns:** the date in Japanese calendar system, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## JapaneseDate.from(TemporalAccessor)

```java
public static JapaneseDate from(TemporalAccessor temporal)
```

Obtains a `JapaneseDate` from a temporal object.

This obtains a date in the Japanese calendar system based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `JapaneseDate`.

The conversion typically uses the EPOCH_DAY
field, which is standardized across calendar systems.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `JapaneseDate::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date in Japanese calendar system, not null

Throws:

- `DateTimeException`: if unable to convert to a `JapaneseDate`

## JapaneseDate.getChronology()

```java
public JapaneseChronology getChronology()
```

Gets the chronology of this date, which is the Japanese calendar system.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the Japanese chronology, not null

## JapaneseDate.getEra()

```java
public JapaneseEra getEra()
```

Gets the era applicable at this date.

The Japanese calendar system has multiple eras defined by `JapaneseEra`.

**Returns:** the era applicable at this date, not null

## JapaneseDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.

This returns the length of the month in days.
Month lengths match those of the ISO calendar system.

**Returns:** the length of the month in days

## JapaneseDate.isSupported(TemporalField)

```java
public boolean isSupported(TemporalField field)
```

Checks if the specified field is supported.

This checks if this date can be queried for the specified field.
If false, then calling the range and
get methods will throw an exception.

If the field is a `ChronoField` then the query is implemented here.
The supported fields are:

- `DAY_OF_WEEK`

- `DAY_OF_MONTH`

- `DAY_OF_YEAR`

- `EPOCH_DAY`

- `MONTH_OF_YEAR`

- `PROLEPTIC_MONTH`

- `YEAR_OF_ERA`

- `YEAR`

- `ERA`

All other `ChronoField` instances will return false.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.isSupportedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the field is supported is determined by the field.

Parameters:

- `field`: the field to check, null returns false

**Returns:** true if the field is supported on this date, false if not

## JapaneseDate.with(TemporalAdjuster)

```java
public JapaneseDate with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## JapaneseDate.plus(TemporalAmount)

```java
public JapaneseDate plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## JapaneseDate.minus(TemporalAmount)

```java
public JapaneseDate minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## JapaneseDate.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this date to another date, including the chronology.

Compares this `JapaneseDate` with another ensuring that the date is the same.

Only objects of type `JapaneseDate` are compared, other types return false.
To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date

## JapaneseDate.hashCode()

```java
public int hashCode()
```

A hash code for this date.

**Returns:** a suitable hash code based only on the Chronology and the date
