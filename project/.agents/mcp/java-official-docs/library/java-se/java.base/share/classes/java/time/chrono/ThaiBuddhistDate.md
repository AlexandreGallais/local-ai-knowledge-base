---
title: "ThaiBuddhistDate class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ThaiBuddhistDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThaiBuddhistDate class (java.time.chrono)

```java
public final class ThaiBuddhistDate extends ChronoLocalDateImpl<ThaiBuddhistDate> implements ChronoLocalDate, Serializable
```

A date in the Thai Buddhist calendar system.

This date operates using the Thai Buddhist calendar.
This calendar system is primarily used in Thailand.
Dates are aligned such that `2484-01-01 (Buddhist)` is `1941-01-01 (ISO)`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## ThaiBuddhistDate.now()

```java
public static ThaiBuddhistDate now()
```

Obtains the current `ThaiBuddhistDate` from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date using the system clock and default time-zone, not null

## ThaiBuddhistDate.now(ZoneId)

```java
public static ThaiBuddhistDate now(ZoneId zone)
```

Obtains the current `ThaiBuddhistDate` from the system clock in the specified time-zone.

This will query the system clock to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date using the system clock, not null

## ThaiBuddhistDate.now(Clock)

```java
public static ThaiBuddhistDate now(Clock clock)
```

Obtains the current `ThaiBuddhistDate` from the specified clock.

This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date, not null

Throws:

- `DateTimeException`: if the current date cannot be obtained

## ThaiBuddhistDate.of(int, int, int)

```java
public static ThaiBuddhistDate of(int prolepticYear, int month, int dayOfMonth)
```

Obtains a `ThaiBuddhistDate` representing a date in the Thai Buddhist calendar
system from the proleptic-year, month-of-year and day-of-month fields.

This returns a `ThaiBuddhistDate` with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `prolepticYear`: the Thai Buddhist proleptic-year
- `month`: the Thai Buddhist month-of-year, from 1 to 12
- `dayOfMonth`: the Thai Buddhist day-of-month, from 1 to 31

**Returns:** the date in Thai Buddhist calendar system, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## ThaiBuddhistDate.from(TemporalAccessor)

```java
public static ThaiBuddhistDate from(TemporalAccessor temporal)
```

Obtains a `ThaiBuddhistDate` from a temporal object.

This obtains a date in the Thai Buddhist calendar system based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `ThaiBuddhistDate`.

The conversion typically uses the EPOCH_DAY
field, which is standardized across calendar systems.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `ThaiBuddhistDate::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date in Thai Buddhist calendar system, not null

Throws:

- `DateTimeException`: if unable to convert to a `ThaiBuddhistDate`

## ThaiBuddhistDate.getChronology()

```java
public ThaiBuddhistChronology getChronology()
```

Gets the chronology of this date, which is the Thai Buddhist calendar system.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the Thai Buddhist chronology, not null

## ThaiBuddhistDate.getEra()

```java
public ThaiBuddhistEra getEra()
```

Gets the era applicable at this date.

The Thai Buddhist calendar system has two eras, 'BE' and 'BEFORE_BE',
defined by `ThaiBuddhistEra`.

**Returns:** the era applicable at this date, not null

## ThaiBuddhistDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.

This returns the length of the month in days.
Month lengths match those of the ISO calendar system.

**Returns:** the length of the month in days

## ThaiBuddhistDate.with(TemporalAdjuster)

```java
public ThaiBuddhistDate with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ThaiBuddhistDate.plus(TemporalAmount)

```java
public ThaiBuddhistDate plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ThaiBuddhistDate.minus(TemporalAmount)

```java
public ThaiBuddhistDate minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## ThaiBuddhistDate.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this date to another date, including the chronology.

Compares this `ThaiBuddhistDate` with another ensuring that the date is the same.

Only objects of type `ThaiBuddhistDate` are compared, other types return false.
To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date

## ThaiBuddhistDate.hashCode()

```java
public int hashCode()
```

A hash code for this date.

**Returns:** a suitable hash code based only on the Chronology and the date
