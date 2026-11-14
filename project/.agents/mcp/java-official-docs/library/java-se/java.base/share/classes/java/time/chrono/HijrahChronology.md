# HijrahChronology class (java.time.chrono)

```java
public final class HijrahChronology extends AbstractChronology implements Serializable
```

The Hijrah calendar is a lunar calendar supporting Islamic calendars.
<p>
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
<p>
The length of each month is 29 or 30 days.
Ordinary years have 354 days; leap years have 355 days.

<p>
CLDR and LDML identify variants:
<table class="striped" style="text-align:left">
<caption style="display:none">Variants of Hijrah Calendars</caption>
<thead>
<tr>
<th scope="col">Chronology ID</th>
<th scope="col">Calendar Type</th>
<th scope="col">Locale extension, see {@link java.util.Locale}</th>
<th scope="col">Description</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">Hijrah-umalqura</th>
<td>islamic-umalqura</td>
<td>ca-islamic-umalqura</td>
<td>Islamic - Umm Al-Qura calendar of Saudi Arabia</td>
</tr>
</tbody>
</table>
<p>Additional variants may be available through {@link Chronology#getAvailableChronologies()}.

<p>Example</p>
<p>
Selecting the chronology from the locale uses {@link Chronology#ofLocale}
to find the Chronology based on Locale supported BCP 47 extension mechanism
to request a specific calendar ("ca"). For example,
</p>
<pre>
     Locale locale = Locale.forLanguageTag("en-US-u-ca-islamic-umalqura");
     Chronology chrono = Chronology.ofLocale(locale);
</pre>

@implSpec
This class is immutable and thread-safe.

@implNote
Each Hijrah variant is configured individually. Each variant is defined by a
property resource that defines the {@code ID}, the {@code calendar type},
the start of the calendar, the alignment with the
ISO calendar, and the length of each month for a range of years.
The variants are loaded by HijrahChronology as a resource from
hijrah-config-&lt;calendar type&gt;.properties.
<p>
The Hijrah property resource is a set of properties that describe the calendar.
The syntax is defined by {@code java.util.Properties#load(Reader)}.
<table class="striped" style="text-align:left">
<caption style="display:none">Configuration of Hijrah Calendar</caption>
<thead>
<tr>
<th scope="col">Property Name</th>
<th scope="col">Property value</th>
<th scope="col">Description</th>
</tr>
</thead>
<tbody>
<tr>
<th scope="row">id</th>
<td>Chronology Id, for example, "Hijrah-umalqura"</td>
<td>The Id of the calendar in common usage</td>
</tr>
<tr>
<th scope="row">type</th>
<td>Calendar type, for example, "islamic-umalqura"</td>
<td>LDML defines the calendar types</td>
</tr>
<tr>
<th scope="row">version</th>
<td>Version, for example: "1.8.0_1"</td>
<td>The version of the Hijrah variant data</td>
</tr>
<tr>
<th scope="row">iso-start</th>
<td>ISO start date, formatted as {@code yyyy-MM-dd}, for example: "1900-04-30"</td>
<td>The ISO date of the first day of the minimum Hijrah year.</td>
</tr>
<tr>
<th scope="row">yyyy - a numeric 4 digit year, for example "1434"</th>
<td>The value is a sequence of 12 month lengths,
for example: "29 30 29 30 29 30 30 30 29 30 29 29"</td>
<td>The lengths of the 12 months of the year separated by whitespace.
A numeric year property must be present for every year without any gaps.
The month lengths must be between 29-32 inclusive.
</td>
</tr>
</tbody>
</table>
<p>
Additional variants may be added by providing configuration properties files in
{@code <JAVA_HOME>/conf/chronology} directory. The properties
files should follow the naming convention of
{@code hijrah-config-<chronology id>_<calendar type>.properties}.

@since 1.8

## HijrahChronology.INSTANCE

```java
public static final HijrahChronology INSTANCE
```

Singleton instance of the Islamic Umm Al-Qura calendar of Saudi Arabia.
Other Hijrah chronology variants may be available from
{@link Chronology#getAvailableChronologies}.

## HijrahChronology.getId()

```java
public String getId()
```

Gets the ID of the chronology.
<p>
The ID uniquely identifies the {@code Chronology}. It can be used to
lookup the {@code Chronology} using {@link Chronology#of(String)}.

@return the chronology ID, non-null
@see #getCalendarType()

## HijrahChronology.getCalendarType()

```java
public String getCalendarType()
```

Gets the calendar type of the Islamic calendar.
<p>
The calendar type is an identifier defined by the
<em>Unicode Locale Data Markup Language (LDML)</em> specification.
It can be used to lookup the {@code Chronology} using {@link Chronology#of(String)}.

@return the calendar system type; non-null if the calendar has
   a standard type, otherwise null
@see #getId()

## HijrahChronology.date(Era, int, int, int)

```java
public HijrahDate date(Era era, int yearOfEra, int month, int dayOfMonth)
```

Obtains a local date in Hijrah calendar system from the
era, year-of-era, month-of-year and day-of-month fields.

@param era  the Hijrah era, not null
@param yearOfEra  the year-of-era
@param month  the month-of-year
@param dayOfMonth  the day-of-month
@return the Hijrah local date, not null
@throws DateTimeException if unable to create the date
@throws ClassCastException if the {@code era} is not a {@code HijrahEra}

## HijrahChronology.date(int, int, int)

```java
public HijrahDate date(int prolepticYear, int month, int dayOfMonth)
```

Obtains a local date in Hijrah calendar system from the
proleptic-year, month-of-year and day-of-month fields.

@param prolepticYear  the proleptic-year
@param month  the month-of-year
@param dayOfMonth  the day-of-month
@return the Hijrah local date, not null
@throws DateTimeException if unable to create the date

## HijrahChronology.dateYearDay(Era, int, int)

```java
public HijrahDate dateYearDay(Era era, int yearOfEra, int dayOfYear)
```

Obtains a local date in Hijrah calendar system from the
era, year-of-era and day-of-year fields.

@param era  the Hijrah era, not null
@param yearOfEra  the year-of-era
@param dayOfYear  the day-of-year
@return the Hijrah local date, not null
@throws DateTimeException if unable to create the date
@throws ClassCastException if the {@code era} is not a {@code HijrahEra}

## HijrahChronology.dateYearDay(int, int)

```java
public HijrahDate dateYearDay(int prolepticYear, int dayOfYear)
```

Obtains a local date in Hijrah calendar system from the
proleptic-year and day-of-year fields.

@param prolepticYear  the proleptic-year
@param dayOfYear  the day-of-year
@return the Hijrah local date, not null
@throws DateTimeException if the value of the year is out of range,
 or if the day-of-year is invalid for the year

## HijrahChronology.dateEpochDay(long)

```java
public HijrahDate dateEpochDay(long epochDay)
```

Obtains a local date in the Hijrah calendar system from the epoch-day.

@param epochDay  the epoch day
@return the Hijrah local date, not null
@throws DateTimeException if unable to create the date

## HijrahChronology.eraOf(int)

```java
public HijrahEra eraOf(int eraValue)
```

Creates the HijrahEra object from the numeric value.
The Hijrah calendar system has only one era covering the
proleptic years greater than zero.
This method returns the singleton HijrahEra for the value 1.

@param eraValue  the era value
@return the calendar system era, not null
@throws DateTimeException if unable to create the era