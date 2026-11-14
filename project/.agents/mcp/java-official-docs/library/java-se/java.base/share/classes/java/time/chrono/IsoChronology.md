# IsoChronology class (java.time.chrono)

```java
public final class IsoChronology extends AbstractChronology implements Serializable
```

The ISO calendar system.
<p>
This chronology defines the rules of the ISO calendar system.
This calendar system is based on the ISO-8601 standard, which is the
<i>de facto</i> world calendar.
<p>
The fields are defined as follows:
<ul>
<li>era - There are two eras, 'Current Era' (CE) and 'Before Current Era' (BCE).
<li>year-of-era - The year-of-era is the same as the proleptic-year for the current CE era.
 For the BCE era before the ISO epoch the year increases from 1 upwards as time goes backwards.
<li>proleptic-year - The proleptic year is the same as the year-of-era for the
 current era. For the previous era, years have zero, then negative values.
<li>month-of-year - There are 12 months in an ISO year, numbered from 1 to 12.
<li>day-of-month - There are between 28 and 31 days in each of the ISO month, numbered from 1 to 31.
 Months 4, 6, 9 and 11 have 30 days, Months 1, 3, 5, 7, 8, 10 and 12 have 31 days.
 Month 2 has 28 days, or 29 in a leap year.
<li>day-of-year - There are 365 days in a standard ISO year and 366 in a leap year.
 The days are numbered from 1 to 365 or 1 to 366.
<li>leap-year - Leap years occur every 4 years, except where the year is divisble by 100 and not divisble by 400.
</ul>

@implSpec
This class is immutable and thread-safe.

@since 1.8

## IsoChronology.INSTANCE

```java
public static final IsoChronology INSTANCE
```

Singleton instance of the ISO chronology.

## IsoChronology.getId()

```java
public String getId()
```

Gets the ID of the chronology - 'ISO'.
<p>
The ID uniquely identifies the {@code Chronology}.
It can be used to lookup the {@code Chronology} using {@link Chronology#of(String)}.

@return the chronology ID - 'ISO'
@see #getCalendarType()

## IsoChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the underlying calendar system - 'iso8601'.
<p>
The calendar type is an identifier defined by the
<em>Unicode Locale Data Markup Language (LDML)</em> specification.
It can be used to lookup the {@code Chronology} using {@link Chronology#of(String)}.
It can also be used as part of a locale, accessible via
{@link Locale#getUnicodeLocaleType(String)} with the key 'ca'.

@return the calendar system type - 'iso8601'
@see #getId()

## IsoChronology.date(Era, int, int, int)

```java
public LocalDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains an ISO local date from the era, year-of-era, month-of-year
and day-of-month fields.

@param era  the ISO era, not null
@param yearOfEra  the ISO year-of-era
@param month  the ISO month-of-year
@param dayOfMonth  the ISO day-of-month
@return the ISO local date, not null
@throws DateTimeException if unable to create the date
@throws ClassCastException if the type of {@code era} is not {@code IsoEra}

## IsoChronology.date(int, int, int)

```java
public LocalDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains an ISO local date from the proleptic-year, month-of-year
and day-of-month fields.
<p>
This is equivalent to {@link LocalDate#of(int, int, int)}.

@param prolepticYear  the ISO proleptic-year
@param month  the ISO month-of-year
@param dayOfMonth  the ISO day-of-month
@return the ISO local date, not null
@throws DateTimeException if unable to create the date

## IsoChronology.dateYearDay(Era, int, int)

```java
public LocalDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains an ISO local date from the era, year-of-era and day-of-year fields.

@param era  the ISO era, not null
@param yearOfEra  the ISO year-of-era
@param dayOfYear  the ISO day-of-year
@return the ISO local date, not null
@throws DateTimeException if unable to create the date

## IsoChronology.dateYearDay(int, int)

```java
public LocalDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains an ISO local date from the proleptic-year and day-of-year fields.
<p>
This is equivalent to {@link LocalDate#ofYearDay(int, int)}.

@param prolepticYear  the ISO proleptic-year
@param dayOfYear  the ISO day-of-year
@return the ISO local date, not null
@throws DateTimeException if unable to create the date

## IsoChronology.dateEpochDay(long)

```java
public LocalDate dateEpochDay(long epochDay)
```

Obtains an ISO local date from the epoch-day.
<p>
This is equivalent to {@link LocalDate#ofEpochDay(long)}.

@param epochDay  the epoch day
@return the ISO local date, not null
@throws DateTimeException if unable to create the date

## IsoChronology.date(TemporalAccessor)

```java
public LocalDate date(TemporalAccessor temporal)
```

Obtains an ISO local date from another date-time object.
<p>
This is equivalent to {@link LocalDate#from(TemporalAccessor)}.

@param temporal  the date-time object to convert, not null
@return the ISO local date, not null
@throws DateTimeException if unable to create the date

## IsoChronology.epochSecond(int, int, int, int, int, int, ZoneOffset)

```java
public long epochSecond(int prolepticYear, int month, int dayOfMonth, int hour, int minute, int second, ZoneOffset zoneOffset)
```

Gets the number of seconds from the epoch of 1970-01-01T00:00:00Z.
<p>
The number of seconds is calculated using the year,
month, day-of-month, hour, minute, second, and zoneOffset.

@param prolepticYear  the year, from MIN_YEAR to MAX_YEAR
@param month  the month-of-year, from 1 to 12
@param dayOfMonth  the day-of-month, from 1 to 31
@param hour  the hour-of-day, from 0 to 23
@param minute  the minute-of-hour, from 0 to 59
@param second  the second-of-minute, from 0 to 59
@param zoneOffset the zone offset, not null
@return the number of seconds relative to 1970-01-01T00:00:00Z, may be negative
@throws DateTimeException if the value of any argument is out of range,
        or if the day-of-month is invalid for the month-of-year
@since 9

## IsoChronology.localDateTime(TemporalAccessor)

```java
public LocalDateTime localDateTime(TemporalAccessor temporal)
```

Obtains an ISO local date-time from another date-time object.
<p>
This is equivalent to {@link LocalDateTime#from(TemporalAccessor)}.

@param temporal  the date-time object to convert, not null
@return the ISO local date-time, not null
@throws DateTimeException if unable to create the date-time

## IsoChronology.zonedDateTime(TemporalAccessor)

```java
public ZonedDateTime zonedDateTime(TemporalAccessor temporal)
```

Obtains an ISO zoned date-time from another date-time object.
<p>
This is equivalent to {@link ZonedDateTime#from(TemporalAccessor)}.

@param temporal  the date-time object to convert, not null
@return the ISO zoned date-time, not null
@throws DateTimeException if unable to create the date-time

## IsoChronology.zonedDateTime(Instant, ZoneId)

```java
public ZonedDateTime zonedDateTime(Instant instant, ZoneId zone)
```

Obtains an ISO zoned date-time in this chronology from an {@code Instant}.
<p>
This is equivalent to {@link ZonedDateTime#ofInstant(Instant, ZoneId)}.

@param instant  the instant to create the date-time from, not null
@param zone  the time-zone, not null
@return the zoned date-time, not null
@throws DateTimeException if the result exceeds the supported range

## IsoChronology.dateNow()

```java
public LocalDate dateNow()
```

Obtains the current ISO local date from the system clock in the default time-zone.
<p>
This will query the {@link Clock#systemDefaultZone() system clock} in the default
time-zone to obtain the current date.
<p>
Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

@return the current ISO local date using the system clock and default time-zone, not null
@throws DateTimeException if unable to create the date

## IsoChronology.dateNow(ZoneId)

```java
public LocalDate dateNow(ZoneId zone)
```

Obtains the current ISO local date from the system clock in the specified time-zone.
<p>
This will query the {@link Clock#system(ZoneId) system clock} to obtain the current date.
Specifying the time-zone avoids dependence on the default time-zone.
<p>
Using this method will prevent the ability to use an alternate clock for testing
because the clock is hard-coded.

@return the current ISO local date using the system clock, not null
@throws DateTimeException if unable to create the date

## IsoChronology.dateNow(Clock)

```java
public LocalDate dateNow(Clock clock)
```

Obtains the current ISO local date from the specified clock.
<p>
This will query the specified clock to obtain the current date - today.
Using this method allows the use of an alternate clock for testing.
The alternate clock may be introduced using {@link Clock dependency injection}.

@param clock  the clock to use, not null
@return the current ISO local date, not null
@throws DateTimeException if unable to create the date

## IsoChronology.isLeapYear(long)

```java
public boolean isLeapYear(long prolepticYear)
```

Checks if the year is a leap year, according to the ISO proleptic
calendar system rules.
<p>
This method applies the current rules for leap years across the whole time-line.
In general, a year is a leap year if it is divisible by four without
remainder. However, years divisible by 100, are not leap years, with
the exception of years divisible by 400 which are.
<p>
For example, 1904 is a leap year it is divisible by 4.
1900 was not a leap year as it is divisible by 100, however 2000 was a
leap year as it is divisible by 400.
<p>
The calculation is proleptic - applying the same rules into the far future and far past.
This is historically inaccurate, but is correct for the ISO-8601 standard.

@param prolepticYear  the ISO proleptic year to check
@return true if the year is leap, false otherwise

## IsoChronology.resolveDate(Map<TemporalField, Long>, ResolverStyle)

```java
public LocalDate resolveDate(Map<TemporalField, Long> fieldValues, ResolverStyle resolverStyle)
```

Resolves parsed {@code ChronoField} values into a date during parsing.
<p>
Most {@code TemporalField} implementations are resolved using the
resolve method on the field. By contrast, the {@code ChronoField} class
defines fields that only have meaning relative to the chronology.
As such, {@code ChronoField} date fields are resolved here in the
context of a specific chronology.
<p>
{@code ChronoField} instances on the ISO calendar system are resolved
as follows.
<ul>
<li>{@code EPOCH_DAY} - If present, this is converted to a {@code LocalDate}
 and all other date fields are then cross-checked against the date.
<li>{@code PROLEPTIC_MONTH} - If present, then it is split into the
 {@code YEAR} and {@code MONTH_OF_YEAR}. If the mode is strict or smart
 then the field is validated.
<li>{@code YEAR_OF_ERA} and {@code ERA} - If both are present, then they
 are combined to form a {@code YEAR}. In lenient mode, the {@code YEAR_OF_ERA}
 range is not validated, in smart and strict mode it is. The {@code ERA} is
 validated for range in all three modes. If only the {@code YEAR_OF_ERA} is
 present, and the mode is smart or lenient, then the current era (CE/AD)
 is assumed. In strict mode, no era is assumed and the {@code YEAR_OF_ERA} is
 left untouched. If only the {@code ERA} is present, then it is left untouched.
<li>{@code YEAR}, {@code MONTH_OF_YEAR} and {@code DAY_OF_MONTH} -
 If all three are present, then they are combined to form a {@code LocalDate}.
 In all three modes, the {@code YEAR} is validated. If the mode is smart or strict,
 then the month and day are validated, with the day validated from 1 to 31.
 If the mode is lenient, then the date is combined in a manner equivalent to
 creating a date on the first of January in the requested year, then adding
 the difference in months, then the difference in days.
 If the mode is smart, and the day-of-month is greater than the maximum for
 the year-month, then the day-of-month is adjusted to the last day-of-month.
 If the mode is strict, then the three fields must form a valid date.
<li>{@code YEAR} and {@code DAY_OF_YEAR} -
 If both are present, then they are combined to form a {@code LocalDate}.
 In all three modes, the {@code YEAR} is validated.
 If the mode is lenient, then the date is combined in a manner equivalent to
 creating a date on the first of January in the requested year, then adding
 the difference in days.
 If the mode is smart or strict, then the two fields must form a valid date.
<li>{@code YEAR}, {@code MONTH_OF_YEAR}, {@code ALIGNED_WEEK_OF_MONTH} and
 {@code ALIGNED_DAY_OF_WEEK_IN_MONTH} -
 If all four are present, then they are combined to form a {@code LocalDate}.
 In all three modes, the {@code YEAR} is validated.
 If the mode is lenient, then the date is combined in a manner equivalent to
 creating a date on the first of January in the requested year, then adding
 the difference in months, then the difference in weeks, then in days.
 If the mode is smart or strict, then the all four fields are validated to
 their outer ranges. The date is then combined in a manner equivalent to
 creating a date on the first day of the requested year and month, then adding
 the amount in weeks and days to reach their values. If the mode is strict,
 the date is additionally validated to check that the day and week adjustment
 did not change the month.
<li>{@code YEAR}, {@code MONTH_OF_YEAR}, {@code ALIGNED_WEEK_OF_MONTH} and
 {@code DAY_OF_WEEK} - If all four are present, then they are combined to
 form a {@code LocalDate}. The approach is the same as described above for
 years, months and weeks in {@code ALIGNED_DAY_OF_WEEK_IN_MONTH}.
 The day-of-week is adjusted as the next or same matching day-of-week once
 the years, months and weeks have been handled.
<li>{@code YEAR}, {@code ALIGNED_WEEK_OF_YEAR} and {@code ALIGNED_DAY_OF_WEEK_IN_YEAR} -
 If all three are present, then they are combined to form a {@code LocalDate}.
 In all three modes, the {@code YEAR} is validated.
 If the mode is lenient, then the date is combined in a manner equivalent to
 creating a date on the first of January in the requested year, then adding
 the difference in weeks, then in days.
 If the mode is smart or strict, then the all three fields are validated to
 their outer ranges. The date is then combined in a manner equivalent to
 creating a date on the first day of the requested year, then adding
 the amount in weeks and days to reach their values. If the mode is strict,
 the date is additionally validated to check that the day and week adjustment
 did not change the year.
<li>{@code YEAR}, {@code ALIGNED_WEEK_OF_YEAR} and {@code DAY_OF_WEEK} -
 If all three are present, then they are combined to form a {@code LocalDate}.
 The approach is the same as described above for years and weeks in
 {@code ALIGNED_DAY_OF_WEEK_IN_YEAR}. The day-of-week is adjusted as the
 next or same matching day-of-week once the years and weeks have been handled.
</ul>

@param fieldValues  the map of fields to values, which can be updated, not null
@param resolverStyle  the requested type of resolve, not null
@return the resolved date, null if insufficient information to create a date
@throws DateTimeException if the date cannot be resolved, typically
 because of a conflict in the input data

## IsoChronology.period(int, int, int)

```java
public Period period(int years, int months, int days)
```

Obtains a period for this chronology based on years, months and days.
<p>
This returns a period tied to the ISO chronology using the specified
years, months and days. See {@link Period} for further details.

@param years  the number of years, may be negative
@param months  the number of years, may be negative
@param days  the number of years, may be negative
@return the ISO period, not null

## IsoChronology.isIsoBased()

```java
public boolean isIsoBased()
```

{@code IsoChronology} is an ISO based chronology, which supports fields
in {@link IsoFields}, such as {@link IsoFields#DAY_OF_QUARTER DAY_OF_QUARTER}
and {@link IsoFields#QUARTER_OF_YEAR QUARTER_OF_YEAR}.
@see IsoFields
@return {@code true}
@since 19