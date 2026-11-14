# ThaiBuddhistDate class (java.time.chrono)

```java
public final class ThaiBuddhistDate extends ChronoLocalDateImpl<ThaiBuddhistDate> implements ChronoLocalDate, Serializable
```

A date in the Thai Buddhist calendar system.
<p>
This date operates using the {@linkplain ThaiBuddhistChronology Thai Buddhist calendar}.
This calendar system is primarily used in Thailand.
Dates are aligned such that {@code 2484-01-01 (Buddhist)} is {@code 1941-01-01 (ISO)}.
<p>
This is a <a href="{@docRoot}/java.base/java/lang/doc-files/ValueBased.html">value-based</a>
class; programmers should treat instances that are
{@linkplain #equals(Object) equal} as interchangeable and should not
use instances for synchronization, or unpredictable behavior may
occur. For example, in a future release, synchronization may fail.
The {@code equals} method should be used for comparisons.

@implSpec
This class is immutable and thread-safe.

@since 1.8

## ThaiBuddhistDate.now()

```java
public static ThaiBuddhistDate now()
```

Obtains the current {@code ThaiBuddhistDate} from the system clock in the default time-zone.
<p>
This will query the {@link Clock#systemDefaultZone() system clock} in the default
time-zone to obtain the current date.
<p>
Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

@return the current date using the system clock and default time-zone, not null

## ThaiBuddhistDate.now(ZoneId)

```java
public static ThaiBuddhistDate now(ZoneId zone)
```

Obtains the current {@code ThaiBuddhistDate} from the system clock in the specified time-zone.
<p>
This will query the {@link Clock#system(ZoneId) system clock} to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.
<p>
Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

@param zone  the zone ID to use, not null
@return the current date using the system clock, not null

## ThaiBuddhistDate.now(Clock)

```java
public static ThaiBuddhistDate now(Clock clock)
```

Obtains the current {@code ThaiBuddhistDate} from the specified clock.
<p>
This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using {@linkplain Clock dependency injection}.

@param clock  the clock to use, not null
@return the current date, not null
@throws DateTimeException if the current date cannot be obtained

## ThaiBuddhistDate.of(int, int, int)

```java
public static ThaiBuddhistDate of(int prolepticYear, int month, int dayOfMonth)
```

Obtains a {@code ThaiBuddhistDate} representing a date in the Thai Buddhist calendar
system from the proleptic-year, month-of-year and day-of-month fields.
<p>
This returns a {@code ThaiBuddhistDate} with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

@param prolepticYear  the Thai Buddhist proleptic-year
@param month  the Thai Buddhist month-of-year, from 1 to 12
@param dayOfMonth  the Thai Buddhist day-of-month, from 1 to 31
@return the date in Thai Buddhist calendar system, not null
@throws DateTimeException if the value of any field is out of range,
 or if the day-of-month is invalid for the month-year

## ThaiBuddhistDate.from(TemporalAccessor)

```java
public static ThaiBuddhistDate from(TemporalAccessor temporal)
```

Obtains a {@code ThaiBuddhistDate} from a temporal object.
<p>
This obtains a date in the Thai Buddhist calendar system based on the specified temporal.
A {@code TemporalAccessor} represents an arbitrary set of date and time information,
which this factory converts to an instance of {@code ThaiBuddhistDate}.
<p>
The conversion typically uses the {@link ChronoField#EPOCH_DAY EPOCH_DAY}
field, which is standardized across calendar systems.
<p>
This method matches the signature of the functional interface {@link TemporalQuery}
allowing it to be used as a query via method reference, {@code ThaiBuddhistDate::from}.

@param temporal  the temporal object to convert, not null
@return the date in Thai Buddhist calendar system, not null
@throws DateTimeException if unable to convert to a {@code ThaiBuddhistDate}

## ThaiBuddhistDate.getChronology()

```java
public ThaiBuddhistChronology getChronology()
```

Gets the chronology of this date, which is the Thai Buddhist calendar system.
<p>
The {@code Chronology} represents the calendar system in use.
The era and other fields in {@link ChronoField} are defined by the chronology.

@return the Thai Buddhist chronology, not null

## ThaiBuddhistDate.getEra()

```java
public ThaiBuddhistEra getEra()
```

Gets the era applicable at this date.
<p>
The Thai Buddhist calendar system has two eras, 'BE' and 'BEFORE_BE',
defined by {@link ThaiBuddhistEra}.

@return the era applicable at this date, not null

## ThaiBuddhistDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.
<p>
This returns the length of the month in days.
Month lengths match those of the ISO calendar system.

@return the length of the month in days

## ThaiBuddhistDate.with(TemporalAdjuster)

```java
public ThaiBuddhistDate with(TemporalAdjuster adjuster)
```

{@inheritDoc}
@throws DateTimeException {@inheritDoc}
@throws ArithmeticException {@inheritDoc}

## ThaiBuddhistDate.plus(TemporalAmount)

```java
public ThaiBuddhistDate plus(TemporalAmount amount)
```

{@inheritDoc}
@throws DateTimeException {@inheritDoc}
@throws ArithmeticException {@inheritDoc}

## ThaiBuddhistDate.minus(TemporalAmount)

```java
public ThaiBuddhistDate minus(TemporalAmount amount)
```

{@inheritDoc}
@throws DateTimeException {@inheritDoc}
@throws ArithmeticException {@inheritDoc}

## ThaiBuddhistDate.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this date to another date, including the chronology.
<p>
Compares this {@code ThaiBuddhistDate} with another ensuring that the date is the same.
<p>
Only objects of type {@code ThaiBuddhistDate} are compared, other types return false.
To compare the dates of two {@code TemporalAccessor} instances, including dates
in two different chronologies, use {@link ChronoField#EPOCH_DAY} as a comparator.

@param obj  the object to check, null returns false
@return true if this is equal to the other date

## ThaiBuddhistDate.hashCode()

```java
public int hashCode()
```

A hash code for this date.

@return a suitable hash code based only on the Chronology and the date