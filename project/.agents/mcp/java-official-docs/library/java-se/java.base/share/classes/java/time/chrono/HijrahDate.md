# HijrahDate class (java.time.chrono)

```java
public final class HijrahDate extends ChronoLocalDateImpl<HijrahDate> implements ChronoLocalDate, Serializable
```

A date in the Hijrah calendar system.
<p>
This date operates using one of several variants of the
{@linkplain HijrahChronology Hijrah calendar}.
<p>
The Hijrah calendar has a different total of days in a year than
Gregorian calendar, and the length of each month is based on the period
of a complete revolution of the moon around the earth
(as between successive new moons).
Refer to the {@link HijrahChronology} for details of supported variants.
<p>
Each HijrahDate is created bound to a particular HijrahChronology,
The same chronology is propagated to each HijrahDate computed from the date.
To use a different Hijrah variant, its HijrahChronology can be used
to create new HijrahDate instances.
Alternatively, the {@link #withVariant} method can be used to convert
to a new HijrahChronology.
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

## HijrahDate.now()

```java
public static HijrahDate now()
```

Obtains the current {@code HijrahDate} of the Islamic Umm Al-Qura calendar
in the default time-zone.
<p>
This will query the {@link Clock#systemDefaultZone() system clock} in the default
time-zone to obtain the current date.
<p>
Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

@return the current date using the system clock and default time-zone, not null

## HijrahDate.now(ZoneId)

```java
public static HijrahDate now(ZoneId zone)
```

Obtains the current {@code HijrahDate} of the Islamic Umm Al-Qura calendar
in the specified time-zone.
<p>
This will query the {@link Clock#system(ZoneId) system clock} to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.
<p>
Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

@param zone  the zone ID to use, not null
@return the current date using the system clock, not null

## HijrahDate.now(Clock)

```java
public static HijrahDate now(Clock clock)
```

Obtains the current {@code HijrahDate} of the Islamic Umm Al-Qura calendar
from the specified clock.
<p>
This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using {@linkplain Clock dependency injection}.

@param clock  the clock to use, not null
@return the current date, not null
@throws DateTimeException if the current date cannot be obtained

## HijrahDate.of(int, int, int)

```java
public static HijrahDate of(int prolepticYear, int month, int dayOfMonth)
```

Obtains a {@code HijrahDate} of the Islamic Umm Al-Qura calendar
from the proleptic-year, month-of-year and day-of-month fields.
<p>
This returns a {@code HijrahDate} with the specified fields.
The day must be valid for the year and month, otherwise an exception will be thrown.

@param prolepticYear  the Hijrah proleptic-year
@param month  the Hijrah month-of-year, from 1 to 12
@param dayOfMonth  the Hijrah day-of-month, from 1 to 30
@return the date in Hijrah calendar system, not null
@throws DateTimeException if the value of any field is out of range,
 or if the day-of-month is invalid for the month-year

## HijrahDate.from(TemporalAccessor)

```java
public static HijrahDate from(TemporalAccessor temporal)
```

Obtains a {@code HijrahDate} of the Islamic Umm Al-Qura calendar from a temporal object.
<p>
This obtains a date in the Hijrah calendar system based on the specified temporal.
A {@code TemporalAccessor} represents an arbitrary set of date and time information,
which this factory converts to an instance of {@code HijrahDate}.
<p>
The conversion typically uses the {@link ChronoField#EPOCH_DAY EPOCH_DAY}
field, which is standardized across calendar systems.
<p>
This method matches the signature of the functional interface {@link TemporalQuery}
allowing it to be used as a query via method reference, {@code HijrahDate::from}.

@param temporal  the temporal object to convert, not null
@return the date in Hijrah calendar system, not null
@throws DateTimeException if unable to convert to a {@code HijrahDate}

## HijrahDate.getChronology()

```java
public HijrahChronology getChronology()
```

Gets the chronology of this date, which is the Hijrah calendar system.
<p>
The {@code Chronology} represents the calendar system in use.
The era and other fields in {@link ChronoField} are defined by the chronology.

@return the Hijrah chronology, not null

## HijrahDate.getEra()

```java
public HijrahEra getEra()
```

Gets the era applicable at this date.
<p>
The Hijrah calendar system has one era, 'AH',
defined by {@link HijrahEra}.

@return the era applicable at this date, not null

## HijrahDate.lengthOfMonth()

```java
public int lengthOfMonth()
```

Returns the length of the month represented by this date.
<p>
This returns the length of the month in days.
Month lengths in the Hijrah calendar system vary between 29 and 30 days.

@return the length of the month in days

## HijrahDate.lengthOfYear()

```java
public int lengthOfYear()
```

Returns the length of the year represented by this date.
<p>
This returns the length of the year in days.
A Hijrah calendar system year is typically shorter than
that of the ISO calendar system.

@return the length of the year in days

## HijrahDate.with(TemporalAdjuster)

```java
public HijrahDate with(TemporalAdjuster adjuster)
```

{@inheritDoc}
@throws DateTimeException if unable to make the adjustment.
    For example, if the adjuster requires an ISO chronology
@throws ArithmeticException {@inheritDoc}

## HijrahDate.withVariant(HijrahChronology)

```java
public HijrahDate withVariant(HijrahChronology chronology)
```

Returns a {@code HijrahDate} with the Chronology requested.
<p>
The year, month, and day are checked against the new requested
HijrahChronology.  If the chronology has a shorter month length
for the month, the day is reduced to be the last day of the month.

@param chronology the new HijrahChonology, non-null
@return a HijrahDate with the requested HijrahChronology, non-null

## HijrahDate.plus(TemporalAmount)

```java
public HijrahDate plus(TemporalAmount amount)
```

{@inheritDoc}
@throws DateTimeException {@inheritDoc}
@throws ArithmeticException {@inheritDoc}

## HijrahDate.minus(TemporalAmount)

```java
public HijrahDate minus(TemporalAmount amount)
```

{@inheritDoc}
@throws DateTimeException {@inheritDoc}
@throws ArithmeticException {@inheritDoc}

## HijrahDate.isLeapYear()

```java
public boolean isLeapYear()
```

Checks if the year is a leap year, according to the Hijrah calendar system rules.

@return true if this date is in a leap year

## HijrahDate.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this date to another date, including the chronology.
<p>
Compares this {@code HijrahDate} with another ensuring that the date is the same.
<p>
Only objects of type {@code HijrahDate} are compared, other types return false.
To compare the dates of two {@code TemporalAccessor} instances, including dates
in two different chronologies, use {@link ChronoField#EPOCH_DAY} as a comparator.

@param obj  the object to check, null returns false
@return true if this is equal to the other date and the Chronologies are equal

## HijrahDate.hashCode()

```java
public int hashCode()
```

A hash code for this date.

@return a suitable hash code based only on the Chronology and the date