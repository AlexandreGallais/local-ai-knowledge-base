# DateFormatSymbols class (java.text)

```java
public class DateFormatSymbols implements Serializable, Cloneable
```

{@code DateFormatSymbols} is a public class for encapsulating
localizable date-time formatting data, such as the names of the
months, the names of the days of the week, and the time zone data.
{@code SimpleDateFormat} uses
{@code DateFormatSymbols} to encapsulate this information.

<p>
Typically you shouldn't use {@code DateFormatSymbols} directly.
Rather, you are encouraged to create a date-time formatter with the
{@code DateFormat} class's factory methods: {@code getTimeInstance},
{@code getDateInstance}, or {@code getDateTimeInstance}.
These methods automatically create a {@code DateFormatSymbols} for
the formatter so that you don't have to. After the
formatter is created, you may modify its format pattern using the
{@code setPattern} method. For more information about
creating formatters using {@code DateFormat}'s factory methods,
see {@link DateFormat}.

<p>
If you decide to create a date-time formatter with a specific
format pattern for a specific locale, you can do so with:
<blockquote>
{@snippet lang=java :
new SimpleDateFormat(aPattern, DateFormatSymbols.getInstance(aLocale));
}
</blockquote>

<p>If the locale contains "rg" (region override)
<a href="../util/Locale.html#def_locale_extension">Unicode extension</a>,
the symbols are overridden for the designated region.

<p>
{@code DateFormatSymbols} objects are cloneable. When you obtain
a {@code DateFormatSymbols} object, feel free to modify the
date-time formatting data. For instance, you can replace the localized
date-time format pattern characters with the ones that you feel easy
to remember. Or you can change the representative cities
to your favorite ones.

<p>
New {@code DateFormatSymbols} subclasses may be added to support
{@code SimpleDateFormat} for date-time formatting for additional locales.

@see          DateFormat
@see          SimpleDateFormat
@see          java.util.SimpleTimeZone
@author       Chen-Lieh Huang
@since 1.1

## DateFormatSymbols.DateFormatSymbols()

```java
public DateFormatSymbols()
```

Construct a DateFormatSymbols object by loading format data from
resources for the default {@link java.util.Locale.Category#FORMAT FORMAT}
locale. This constructor can only
construct instances for the locales supported by the Java
runtime environment, not for those supported by installed
{@link java.text.spi.DateFormatSymbolsProvider DateFormatSymbolsProvider}
implementations. For full locale coverage, use the
{@link #getInstance(Locale) getInstance} method.
<p>This is equivalent to calling
{@link #DateFormatSymbols(Locale)
    DateFormatSymbols(Locale.getDefault(Locale.Category.FORMAT))}.
@see #getInstance()
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@throws     java.util.MissingResourceException
            if the resources for the default locale cannot be
            found or cannot be loaded.

## DateFormatSymbols.DateFormatSymbols(Locale)

```java
public DateFormatSymbols(Locale locale)
```

Construct a DateFormatSymbols object by loading format data from
resources for the given locale. This constructor can only
construct instances for the locales supported by the Java
runtime environment, not for those supported by installed
{@link java.text.spi.DateFormatSymbolsProvider DateFormatSymbolsProvider}
implementations. For full locale coverage, use the
{@link #getInstance(Locale) getInstance} method.

@param locale the desired locale
@see #getInstance(Locale)
@throws     java.util.MissingResourceException
            if the resources for the specified locale cannot be
            found or cannot be loaded.

## DateFormatSymbols.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
{@code getInstance} methods of this class can return
localized instances.
The returned array represents the union of locales supported by the
Java runtime and by installed
{@link java.text.spi.DateFormatSymbolsProvider DateFormatSymbolsProvider}
implementations. At a minimum, the returned array must contain a
{@code Locale} instance equal to {@link Locale#ROOT Locale.ROOT} and
a {@code Locale} instance equal to {@link Locale#US Locale.US}.

@return An array of locales for which localized
        {@code DateFormatSymbols} instances are available.
@since 1.6

## DateFormatSymbols.getInstance()

```java
public static final DateFormatSymbols getInstance()
```

Gets the {@code DateFormatSymbols} instance for the default
locale.  This method provides access to {@code DateFormatSymbols}
instances for locales supported by the Java runtime itself as well
as for those supported by installed
{@link java.text.spi.DateFormatSymbolsProvider DateFormatSymbolsProvider}
implementations.
<p>This is equivalent to calling {@link #getInstance(Locale)
    getInstance(Locale.getDefault(Locale.Category.FORMAT))}.
@see java.util.Locale#getDefault(java.util.Locale.Category)
@see java.util.Locale.Category#FORMAT
@return a {@code DateFormatSymbols} instance.
@since 1.6

## DateFormatSymbols.getInstance(Locale)

```java
public static final DateFormatSymbols getInstance(Locale locale)
```

Gets the {@code DateFormatSymbols} instance for the specified
locale.  This method provides access to {@code DateFormatSymbols}
instances for locales supported by the Java runtime itself as well
as for those supported by installed
{@link java.text.spi.DateFormatSymbolsProvider DateFormatSymbolsProvider}
implementations.
@param locale the given locale.
@return a {@code DateFormatSymbols} instance.
@throws    NullPointerException if {@code locale} is null
@since 1.6

## DateFormatSymbols.getEras()

```java
public String[] getEras()
```

Gets era strings. For example: "AD" and "BC".
@return the era strings.

## DateFormatSymbols.setEras(String[])

```java
public void setEras(String[] newEras)
```

Sets era strings. For example: "AD" and "BC".
@param newEras the new era strings.

## DateFormatSymbols.getMonths()

```java
public String[] getMonths()
```

Gets month strings. For example: "January", "February", etc.
An array with either 12 or 13 elements will be returned depending
on whether or not {@link java.util.Calendar#UNDECIMBER Calendar.UNDECIMBER}
is supported. Use
{@link java.util.Calendar#JANUARY Calendar.JANUARY},
{@link java.util.Calendar#FEBRUARY Calendar.FEBRUARY},
etc. to index the result array.

<p>If the language requires different forms for formatting and
stand-alone usages, this method returns month names in the
formatting form. For example, the preferred month name for
January in the Czech language is <em>ledna</em> in the
formatting form, while it is <em>leden</em> in the stand-alone
form. This method returns {@code "ledna"} in this case. Refer
to the <a href="http://unicode.org/reports/tr35/#Calendar_Elements">
Calendar Elements in the Unicode Locale Data Markup Language
(LDML) specification</a> for more details.

@implSpec This method returns 13 elements since
{@link java.util.Calendar#UNDECIMBER Calendar.UNDECIMBER} is supported.
@return the month strings.

@spec https://www.unicode.org/reports/tr35
     Unicode Locale Data Markup Language (LDML)

## DateFormatSymbols.setMonths(String[])

```java
public void setMonths(String[] newMonths)
```

Sets month strings. For example: "January", "February", etc.
@param newMonths the new month strings. The array should
be indexed by {@link java.util.Calendar#JANUARY Calendar.JANUARY},
{@link java.util.Calendar#FEBRUARY Calendar.FEBRUARY}, etc.

## DateFormatSymbols.getShortMonths()

```java
public String[] getShortMonths()
```

Gets short month strings. For example: "Jan", "Feb", etc.
An array with either 12 or 13 elements will be returned depending
on whether or not {@link java.util.Calendar#UNDECIMBER Calendar.UNDECIMBER}
is supported. Use
{@link java.util.Calendar#JANUARY Calendar.JANUARY},
{@link java.util.Calendar#FEBRUARY Calendar.FEBRUARY},
etc. to index the result array.

<p>If the language requires different forms for formatting and
stand-alone usages, this method returns short month names in
the formatting form. For example, the preferred abbreviation
for January in the Catalan language is <em>de gen.</em> in the
formatting form, while it is <em>gen.</em> in the stand-alone
form. This method returns {@code "de gen."} in this case. Refer
to the <a href="http://unicode.org/reports/tr35/#Calendar_Elements">
Calendar Elements in the Unicode Locale Data Markup Language
(LDML) specification</a> for more details.

@implSpec This method returns 13 elements since
{@link java.util.Calendar#UNDECIMBER Calendar.UNDECIMBER} is supported.
@return the short month strings.

@spec https://www.unicode.org/reports/tr35
     Unicode Locale Data Markup Language (LDML)

## DateFormatSymbols.setShortMonths(String[])

```java
public void setShortMonths(String[] newShortMonths)
```

Sets short month strings. For example: "Jan", "Feb", etc.
@param newShortMonths the new short month strings. The array should
be indexed by {@link java.util.Calendar#JANUARY Calendar.JANUARY},
{@link java.util.Calendar#FEBRUARY Calendar.FEBRUARY}, etc.

## DateFormatSymbols.getWeekdays()

```java
public String[] getWeekdays()
```

Gets weekday strings. For example: "Sunday", "Monday", etc.
@return the weekday strings. Use
{@link java.util.Calendar#SUNDAY Calendar.SUNDAY},
{@link java.util.Calendar#MONDAY Calendar.MONDAY}, etc. to index
the result array.

## DateFormatSymbols.setWeekdays(String[])

```java
public void setWeekdays(String[] newWeekdays)
```

Sets weekday strings. For example: "Sunday", "Monday", etc.
@param newWeekdays the new weekday strings. The array should
be indexed by {@link java.util.Calendar#SUNDAY Calendar.SUNDAY},
{@link java.util.Calendar#MONDAY Calendar.MONDAY}, etc.

## DateFormatSymbols.getShortWeekdays()

```java
public String[] getShortWeekdays()
```

Gets short weekday strings. For example: "Sun", "Mon", etc.
@return the short weekday strings. Use
{@link java.util.Calendar#SUNDAY Calendar.SUNDAY},
{@link java.util.Calendar#MONDAY Calendar.MONDAY}, etc. to index
the result array.

## DateFormatSymbols.setShortWeekdays(String[])

```java
public void setShortWeekdays(String[] newShortWeekdays)
```

Sets short weekday strings. For example: "Sun", "Mon", etc.
@param newShortWeekdays the new short weekday strings. The array should
be indexed by {@link java.util.Calendar#SUNDAY Calendar.SUNDAY},
{@link java.util.Calendar#MONDAY Calendar.MONDAY}, etc.

## DateFormatSymbols.getAmPmStrings()

```java
public String[] getAmPmStrings()
```

Gets ampm strings. For example: "AM" and "PM".
@return the ampm strings.

## DateFormatSymbols.setAmPmStrings(String[])

```java
public void setAmPmStrings(String[] newAmpms)
```

Sets ampm strings. For example: "AM" and "PM".
@param newAmpms the new ampm strings.

## DateFormatSymbols.getZoneStrings()

```java
public String[][] getZoneStrings()
```

Gets time zone strings.  Use of this method is discouraged; use
{@link java.util.TimeZone#getDisplayName() TimeZone.getDisplayName()}
instead.
<p>
The value returned is a
two-dimensional array of strings of size <em>n</em> by <em>m</em>,
where <em>m</em> is at least 5.  Each of the <em>n</em> rows is an
entry containing the localized names for a single {@code TimeZone}.
Each such row contains (with {@code i} ranging from
0..<em>n</em>-1):
<ul>
<li>{@code zoneStrings[i][0]} - time zone ID</li>
<li>{@code zoneStrings[i][1]} - long name of zone in standard
time</li>
<li>{@code zoneStrings[i][2]} - short name of zone in
standard time</li>
<li>{@code zoneStrings[i][3]} - long name of zone in daylight
saving time</li>
<li>{@code zoneStrings[i][4]} - short name of zone in daylight
saving time</li>
</ul>
The zone ID is <em>not</em> localized; it's one of the valid IDs of
the {@link java.util.TimeZone TimeZone} class that are not
<a href="../util/TimeZone.html#CustomID">custom IDs</a>.
All other entries are localized names.  If a zone does not implement
daylight saving time, the daylight saving time names should not be used.
<p>
If {@link #setZoneStrings(String[][]) setZoneStrings} has been called
on this {@code DateFormatSymbols} instance, then the strings
provided by that call are returned. Otherwise, the returned array
contains names provided by the Java runtime and by installed
{@link java.util.spi.TimeZoneNameProvider TimeZoneNameProvider}
implementations.

@return the time zone strings.
@see #setZoneStrings(String[][])

## DateFormatSymbols.setZoneStrings(String[][])

```java
public void setZoneStrings(String[][] newZoneStrings)
```

Sets time zone strings.  The argument must be a
two-dimensional array of strings of size <em>n</em> by <em>m</em>,
where <em>m</em> is at least 5.  Each of the <em>n</em> rows is an
entry containing the localized names for a single {@code TimeZone}.
Each such row contains (with {@code i} ranging from
0..<em>n</em>-1):
<ul>
<li>{@code zoneStrings[i][0]} - time zone ID</li>
<li>{@code zoneStrings[i][1]} - long name of zone in standard
time</li>
<li>{@code zoneStrings[i][2]} - short name of zone in
standard time</li>
<li>{@code zoneStrings[i][3]} - long name of zone in daylight
saving time</li>
<li>{@code zoneStrings[i][4]} - short name of zone in daylight
saving time</li>
</ul>
The zone ID is <em>not</em> localized; it's one of the valid IDs of
the {@link java.util.TimeZone TimeZone} class that are not
<a href="../util/TimeZone.html#CustomID">custom IDs</a>.
All other entries are localized names.

@param newZoneStrings the new time zone strings.
@throws    IllegalArgumentException if the length of any row in
   {@code newZoneStrings} is less than 5
@throws    NullPointerException if {@code newZoneStrings} is null
@see #getZoneStrings()

## DateFormatSymbols.getLocalPatternChars()

```java
public String getLocalPatternChars()
```

Gets localized date-time pattern characters. For example: 'u', 't', etc.
@return the localized date-time pattern characters.

## DateFormatSymbols.setLocalPatternChars(String)

```java
public void setLocalPatternChars(String newLocalPatternChars)
```

Sets localized date-time pattern characters. For example: 'u', 't', etc.
@param newLocalPatternChars the new localized date-time
pattern characters.

## DateFormatSymbols.clone()

```java
public Object clone()
```

Overrides Cloneable

## DateFormatSymbols.hashCode()

```java
public int hashCode()
```

{@return the hash code for this {@code DateFormatSymbols}}

@implSpec Non-transient instance fields of this class are used to calculate
a hash code value which adheres to the contract defined in {@link Objects#hashCode}.
@see Object#hashCode()

## DateFormatSymbols.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this {@code DateFormatSymbols} for equality.
Returns true if the object is also a {@code DateFormatSymbols} and the two
{@code DateFormatSymbols} objects represent the same date-time formatting data.

@implSpec This method performs an equality check with a notion of class
identity based on {@code getClass()}, rather than {@code instanceof}.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.
@param  obj object to be compared for equality
@return {@code true} if the specified object is equal to this {@code DateFormatSymbols}
@see Object#equals(Object)