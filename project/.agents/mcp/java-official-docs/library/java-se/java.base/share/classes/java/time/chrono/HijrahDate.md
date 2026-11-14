---
title: "HijrahDate class (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/HijrahDate.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HijrahDate class (java.time.chrono)

```java
public final class HijrahDate extends ChronoLocalDateImpl<HijrahDate> implements ChronoLocalDate, Serializable
```

A date in the Hijrah calendar system.

This date operates using one of several variants of the
Hijrah calendar.

The Hijrah calendar has a different total of days in a year than
Gregorian calendar, and the length of each month is based on the period
of a complete revolution of the moon around the earth
(as between successive new moons).
Refer to the `HijrahChronology` for details of supported variants.

Each HijrahDate is created bound to a particular HijrahChronology,
The same chronology is propagated to each HijrahDate computed from the date.
To use a different Hijrah variant, its HijrahChronology can be used
to create new HijrahDate instances.
Alternatively, the `withVariant` method can be used to convert
to a new HijrahChronology.

This is a value-based
class; programmers should treat instances that are
equal as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The `equals` method should be used for comparisons.

**Implementation requirements:** This class is immutable and thread-safe.

**Since:** 1.8

## HijrahDate.now()

```java
public static HijrahDate now()
```

Obtains the current `HijrahDate` of the Islamic Umm Al-Qura calendar
in the default time-zone.

This will query the system clock in the default
time-zone to obtain the current date.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

**Returns:** the current date using the system clock and default time-zone, not null

## HijrahDate.now(ZoneId)

```java
public static HijrahDate now(ZoneId zone)
```

Obtains the current `HijrahDate` of the Islamic Umm Al-Qura calendar
in the specified time-zone.

This will query the system clock to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.

Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

Parameters:

- `zone`: the zone ID to use, not null

**Returns:** the current date using the system clock, not null

## HijrahDate.now(Clock)

```java
public static HijrahDate now(Clock clock)
```

Obtains the current `HijrahDate` of the Islamic Umm Al-Qura calendar
from the specified clock.

This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using dependency injection.

Parameters:

- `clock`: the clock to use, not null

**Returns:** the current date, not null

Throws:

- `DateTimeException`: if the current date cannot be obtained

## HijrahDate.of(int, int, int)

```java
public static HijrahDate of(int prolepticYear, int month, int dayOfMonth)
```

Obtains a `HijrahDate` of the Islamic Umm Al-Qura calendar
from the proleptic-year, month-of-year and day-of-month fields.

This returns a `HijrahDate` with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

Parameters:

- `prolepticYear`: the Hijrah proleptic-year
- `month`: the Hijrah month-of-year, from 1 to 12
- `dayOfMonth`: the Hijrah day-of-month, from 1 to 30

**Returns:** the date in Hijrah calendar system, not null

Throws:

- `DateTimeException`: if the value of any field is out of range, or if the day-of-month is invalid for the month-year

## HijrahDate.from(TemporalAccessor)

```java
public static HijrahDate from(TemporalAccessor temporal)
```

Obtains a `HijrahDate` of the Islamic Umm Al-Qura calendar from a temporal object.

This obtains a date in the Hijrah calendar system based on the specified temporal.
A `TemporalAccessor` represents an arbitrary set of date and time information,
which this factory converts to an instance of `HijrahDate`.

The conversion typically uses the EPOCH_DAY
field, which is standardized across calendar systems.

This method matches the signature of the functional interface `TemporalQuery`
allowing it to be used as a query via method reference, `HijrahDate::from`.

Parameters:

- `temporal`: the temporal object to convert, not null

**Returns:** the date in Hijrah calendar system, not null

Throws:

- `DateTimeException`: if unable to convert to a `HijrahDate`

## HijrahDate.getChronology()

```java
public HijrahChronology getChronology()
```

Gets the chronology of this date, which is the Hijrah calendar system.

The `Chronology` represents the calendar system in use.
The era and other fields in `ChronoField` are defined by the chronology.

**Returns:** the Hijrah chronology, not null

## HijrahDate.getEra()

```java
public HijrahEra getEra()
```

Gets the era applicable at this date.

The Hijrah calendar system has one era, 'AH',
defined by `HijrahEra`.

**Returns:** the era applicable at this date, not null

## HijrahDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.

This returns the length of the month in days.
Month lengths in the Hijrah calendar system vary between 29 and 30 days.

**Returns:** the length of the month in days

## HijrahDate.lengthOfYear()

```java
public int lengthOfYear()
```

Returns the length of the year represented by this date.

This returns the length of the year in days.
A Hijrah calendar system year is typically shorter than
that of the ISO calendar system.

**Returns:** the length of the year in days

## HijrahDate.with(TemporalAdjuster)

```java
public HijrahDate with(TemporalAdjuster adjuster)
```

(inherited documentation)

Throws:

- `DateTimeException`: if unable to make the adjustment. For example, if the adjuster requires an ISO chronology
- `ArithmeticException`: (inherited documentation)

## HijrahDate.withVariant(HijrahChronology)

```java
public HijrahDate withVariant(HijrahChronology chronology)
```

Returns a `HijrahDate` with the Chronology requested.

The year, month, and day are checked against the new requested
HijrahChronology.  If the chronology has a shorter month length
for the month, the day is reduced to be the last day of the month.

Parameters:

- `chronology`: the new HijrahChonology, non-null

**Returns:** a HijrahDate with the requested HijrahChronology, non-null

## HijrahDate.plus(TemporalAmount)

```java
public HijrahDate plus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## HijrahDate.minus(TemporalAmount)

```java
public HijrahDate minus(TemporalAmount amount)
```

(inherited documentation)

Throws:

- `DateTimeException`: (inherited documentation)
- `ArithmeticException`: (inherited documentation)

## HijrahDate.isLeapYear()

```java
public boolean isLeapYear()
```

Checks if the year is a leap year, according to the Hijrah calendar system rules.

**Returns:** true if this date is in a leap year

## HijrahDate.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this date to another date, including the chronology.

Compares this `HijrahDate` with another ensuring that the date is the same.

Only objects of type `HijrahDate` are compared, other types return false.
To compare the dates of two `TemporalAccessor` instances, including dates
in two different chronologies, use `ChronoField.EPOCH_DAY` as a comparator.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date and the Chronologies are equal

## HijrahDate.hashCode()

```java
public int hashCode()
```

A hash code for this date.

**Returns:** a suitable hash code based only on the Chronology and the date
