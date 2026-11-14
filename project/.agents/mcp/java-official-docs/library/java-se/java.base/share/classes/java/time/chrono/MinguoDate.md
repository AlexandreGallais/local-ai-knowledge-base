---
title: "MinguoDate class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/MinguoDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MinguoDate class (java.time.chrono)

```java
public final class MinguoDate extends ChronoLocalDateImpl<MinguoDate> implements ChronoLocalDate, Serializable
```

A date in the Minguo calendar system.

This date operates using the Minguo calendar.
This calendar system is primarily used in the Republic of China, often known as Taiwan.
Dates are aligned such that `0001-01-01 (Minguo)` is `1912-01-01 (ISO)`.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## MinguoDate.now()

```java
public static MinguoDate now()
```

Obtains the current `MinguoDate` from the system clock in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date using the system clock and default time-zone, not null

## MinguoDate.now(ZoneId)

```java
public static MinguoDate now(ZoneId zone)
```

Obtains the current `MinguoDate` from the system clock in the specified time-zone.

This will query the system clock to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date using the system clock, not null

## MinguoDate.now(Clock)

```java
public static MinguoDate now(Clock clock)
```

Obtains the current `MinguoDate` from the specified clock.

This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date, not null

Throws:

- `DateTimeException`: if the current date cannot be obtained

## MinguoDate.of(int, int, int)

```java
public static MinguoDate of(int prolepticYear, int month, int dayOfMonth)
```

Obtains a `MinguoDate` representing a date in the Minguo calendar
system from the proleptic-year, month-of-year and day-of-month fields.

This returns a `MinguoDate` with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `prolepticYear`: the Minguo proleptic-year
- `month`: the Minguo month-of-year, from 1 to 12
- `dayOfMonth`: the Minguo day-of-month, from 1 to 31

**Returns:** the date in Minguo calendar system, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## MinguoDate.from(TemporalAccessor)

```java
public static MinguoDate from(TemporalAccessor temporal)
```

Obtains a `MinguoDate` from a temporal object.

This obtains a date in the Minguo calendar system based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `MinguoDate`.

The conversion typically uses the EPOCH_DAY
field, which is standardized across calendar systems.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `MinguoDate::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date in Minguo calendar system, not null

Throws:

- `DateTimeException`: if unable to convert to a `MinguoDate`

## MinguoDate.getChronology()

```java
public MinguoChronology getChronology()
```

Gets the chronology of this date, which is the Minguo calendar system.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the Minguo chronology, not null

## MinguoDate.getEra()

```java
public MinguoEra getEra()
```

Gets the era applicable at this date.

The Minguo calendar system has two eras, 'ROC' and 'BEFORE_ROC',
defined by `MinguoEra`.

**Returns:** the era applicable at this date, not null

## MinguoDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.

This returns the length of the month in days.
Month lengths match those of the ISO calendar system.

**Returns:** the length of the month in days

## MinguoDate.with(TemporalAdjuster)

```java
public MinguoDate with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## MinguoDate.plus(TemporalAmount)

```java
public MinguoDate plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## MinguoDate.minus(TemporalAmount)

```java
public MinguoDate minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## MinguoDate.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this date to another date, including the chronology.

Compares this `MinguoDate` with another ensuring that the date is the same.

Only objects of type `MinguoDate` are compared, other types return false.
To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date

## MinguoDate.hashCode()

```java
public int hashCode()
```

A hash code for this date.

**Returns:** a suitable hash code based only on the Chronology and the date
