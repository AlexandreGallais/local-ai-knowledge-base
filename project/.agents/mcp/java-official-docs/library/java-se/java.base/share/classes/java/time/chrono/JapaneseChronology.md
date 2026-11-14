# JapaneseChronology class (java.time.chrono)

```java
public final class JapaneseChronology extends AbstractChronology implements Serializable
```

The Japanese Imperial calendar system.
<p>
This chronology defines the rules of the Japanese Imperial calendar system.
This calendar system is primarily used in Japan.
The Japanese Imperial calendar system is the same as the ISO calendar system
apart from the era-based year numbering.
<p>
Japan introduced the Gregorian calendar starting with Meiji 6.
Only Meiji and later eras are supported;
dates before Meiji 6, January 1 are not supported.
<p>
The supported {@code ChronoField} instances are:
<ul>
<li>{@code DAY_OF_WEEK}
<li>{@code DAY_OF_MONTH}
<li>{@code DAY_OF_YEAR}
<li>{@code EPOCH_DAY}
<li>{@code MONTH_OF_YEAR}
<li>{@code PROLEPTIC_MONTH}
<li>{@code YEAR_OF_ERA}
<li>{@code YEAR}
<li>{@code ERA}
</ul>

@implSpec
This class is immutable and thread-safe.

@since 1.8

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
<p>
The ID uniquely identifies the {@code Chronology}.
It can be used to lookup the {@code Chronology} using {@link Chronology#of(String)}.

@return the chronology ID - 'Japanese'
@see #getCalendarType()

## JapaneseChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the underlying calendar system - 'japanese'.
<p>
The calendar type is an identifier defined by the
<em>Unicode Locale Data Markup Language (LDML)</em> specification.
It can be used to lookup the {@code Chronology} using {@link Chronology#of(String)}.
It can also be used as part of a locale, accessible via
{@link Locale#getUnicodeLocaleType(String)} with the key 'ca'.

@return the calendar system type - 'japanese'
@see #getId()

## JapaneseChronology.date(Era, int, int, int)

```java
public JapaneseDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in Japanese calendar system from the
era, year-of-era, month-of-year and day-of-month fields.
<p>
The Japanese month and day-of-month are the same as those in the
ISO calendar system. They are not reset when the era changes.
For example:
<pre>
 6th Jan Showa 64 = ISO 1989-01-06
 7th Jan Showa 64 = ISO 1989-01-07
 8th Jan Heisei 1 = ISO 1989-01-08
 9th Jan Heisei 1 = ISO 1989-01-09
</pre>

@param era  the Japanese era, not null
@param yearOfEra  the year-of-era
@param month  the month-of-year
@param dayOfMonth  the day-of-month
@return the Japanese local date, not null
@throws DateTimeException if unable to create the date
@throws ClassCastException if the {@code era} is not a {@code JapaneseEra}

## JapaneseChronology.date(int, int, int)

```java
public JapaneseDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in Japanese calendar system from the
proleptic-year, month-of-year and day-of-month fields.
<p>
The Japanese proleptic year, month and day-of-month are the same as those
in the ISO calendar system. They are not reset when the era changes.

@param prolepticYear  the proleptic-year
@param month  the month-of-year
@param dayOfMonth  the day-of-month
@return the Japanese local date, not null
@throws DateTimeException if unable to create the date

## JapaneseChronology.dateYearDay(Era, int, int)

```java
public JapaneseDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in Japanese calendar system from the
era, year-of-era and day-of-year fields.
<p>
The day-of-year in this factory is expressed relative to the start of the year-of-era.
This definition changes the normal meaning of day-of-year only in those years
where the year-of-era is reset to one due to a change in the era.
For example:
<pre>
 6th Jan Showa 64 = day-of-year 6
 7th Jan Showa 64 = day-of-year 7
 8th Jan Heisei 1 = day-of-year 1
 9th Jan Heisei 1 = day-of-year 2
</pre>

@param era  the Japanese era, not null
@param yearOfEra  the year-of-era
@param dayOfYear  the day-of-year
@return the Japanese local date, not null
@throws DateTimeException if unable to create the date
@throws ClassCastException if the {@code era} is not a {@code JapaneseEra}

## JapaneseChronology.dateYearDay(int, int)

```java
public JapaneseDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in Japanese calendar system from the
proleptic-year and day-of-year fields.
<p>
The day-of-year in this factory is expressed relative to the start of the proleptic year.
The Japanese proleptic year and day-of-year are the same as those in the ISO calendar system.
They are not reset when the era changes.

@param prolepticYear  the proleptic-year
@param dayOfYear  the day-of-year
@return the Japanese local date, not null
@throws DateTimeException if unable to create the date

## JapaneseChronology.dateEpochDay(long)

```java
public JapaneseDate dateEpochDay(long epochDay)
```

Obtains a local date in the Japanese calendar system from the epoch-day.

@param epochDay  the epoch day
@return the Japanese local date, not null
@throws DateTimeException if unable to create the date

## JapaneseChronology.isLeapYear(long)

```java
public boolean isLeapYear(long prolepticYear)
```

Checks if the specified year is a leap year.
<p>
Japanese calendar leap years occur exactly in line with ISO leap years.
This method does not validate the year passed in, and only has a
well-defined result for years in the supported range.

@param prolepticYear  the proleptic-year to check, not validated for range
@return true if the year is a leap year

## JapaneseChronology.eraOf(int)

```java
public JapaneseEra eraOf(int eraValue)
```

Returns the calendar system era object from the given numeric value.

The numeric values supported by this method are the same as the
numeric values supported by {@link JapaneseEra#of(int)}.

@param eraValue  the era value
@return the Japanese {@code Era} for the given numeric era value
@throws DateTimeException if {@code eraValue} is invalid

## JapaneseChronology.isIsoBased()

```java
public boolean isIsoBased()
```

{@code JapaneseChronology} is an ISO based chronology, which supports fields
in {@link IsoFields}, such as {@link IsoFields#DAY_OF_QUARTER DAY_OF_QUARTER}
and {@link IsoFields#QUARTER_OF_YEAR QUARTER_OF_YEAR}.
@see IsoFields
@return {@code true}
@since 19