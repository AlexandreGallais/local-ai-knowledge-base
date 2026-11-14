---
title: "DateFormatSymbols class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/DateFormatSymbols.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateFormatSymbols class (java.text)

```java
public class DateFormatSymbols implements Serializable, Cloneable
```

`DateFormatSymbols` is a public class for encapsulating
localizable date-time formatting data, such as the names of the
months, the names of the days of the week, and the time zone data.
`SimpleDateFormat` uses
`DateFormatSymbols` to encapsulate this information.

Typically you shouldn't use `DateFormatSymbols` directly.
Rather, you are encouraged to create a date-time formatter with the
`DateFormat` class's factory methods: `getTimeInstance`,
`getDateInstance`, or `getDateTimeInstance`.
These methods automatically create a `DateFormatSymbols` for
the formatter so that you don't have to. After the
formatter is created, you may modify its format pattern using the
`setPattern` method. For more information about
creating formatters using `DateFormat`'s factory methods,
see `DateFormat`.

If you decide to create a date-time formatter with a specific
format pattern for a specific locale, you can do so with:

If the locale contains "rg" (region override)
Unicode extension,
the symbols are overridden for the designated region.

`DateFormatSymbols` objects are cloneable. When you obtain
a `DateFormatSymbols` object, feel free to modify the
date-time formatting data. For instance, you can replace the localized
date-time format pattern characters with the ones that you feel easy
to remember. Or you can change the representative cities
to your favorite ones.

New `DateFormatSymbols` subclasses may be added to support
`SimpleDateFormat` for date-time formatting for additional locales.

**See also:** DateFormat

**See also:** SimpleDateFormat

**See also:** java.util.SimpleTimeZone

**Since:** 1.1

## DateFormatSymbols.DateFormatSymbols()

```java
public DateFormatSymbols()
```

Construct a DateFormatSymbols object by loading format data from
resources for the default FORMAT
locale. This constructor can only
construct instances for the locales supported by the Java
runtime environment, not for those supported by installed
DateFormatSymbolsProvider
implementations. For full locale coverage, use the
getInstance method.

This is equivalent to calling
DateFormatSymbols(Locale.getDefault(Locale.Category.FORMAT)).

**See also:** #getInstance()

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

Throws:

- `java.util.MissingResourceException`: if the resources for the default locale cannot be found or cannot be loaded.

## DateFormatSymbols.DateFormatSymbols(Locale)

```java
public DateFormatSymbols(Locale locale)
```

Construct a DateFormatSymbols object by loading format data from
resources for the given locale. This constructor can only
construct instances for the locales supported by the Java
runtime environment, not for those supported by installed
DateFormatSymbolsProvider
implementations. For full locale coverage, use the
getInstance method.

Parameters:

- `locale`: the desired locale

**See also:** #getInstance(Locale)

Throws:

- `java.util.MissingResourceException`: if the resources for the specified locale cannot be found or cannot be loaded.

## DateFormatSymbols.getAvailableLocales()

```java
public static Locale[] getAvailableLocales()
```

Returns an array of all locales for which the
`getInstance` methods of this class can return
localized instances.
The returned array represents the union of locales supported by the
Java runtime and by installed
DateFormatSymbolsProvider
implementations. At a minimum, the returned array must contain a
`Locale` instance equal to Locale.ROOT and
a `Locale` instance equal to Locale.US.

**Returns:** An array of locales for which localized
        `DateFormatSymbols` instances are available.

**Since:** 1.6

## DateFormatSymbols.getInstance()

```java
public static final DateFormatSymbols getInstance()
```

Gets the `DateFormatSymbols` instance for the default
locale.  This method provides access to `DateFormatSymbols`
instances for locales supported by the Java runtime itself as well
as for those supported by installed
DateFormatSymbolsProvider
implementations.

This is equivalent to calling getInstance(Locale.getDefault(Locale.Category.FORMAT)).

**See also:** java.util.Locale#getDefault(java.util.Locale.Category)

**See also:** java.util.Locale.Category#FORMAT

**Returns:** a `DateFormatSymbols` instance.

**Since:** 1.6

## DateFormatSymbols.getInstance(Locale)

```java
public static final DateFormatSymbols getInstance(Locale locale)
```

Gets the `DateFormatSymbols` instance for the specified
locale.  This method provides access to `DateFormatSymbols`
instances for locales supported by the Java runtime itself as well
as for those supported by installed
DateFormatSymbolsProvider
implementations.

Parameters:

- `locale`: the given locale.

**Returns:** a `DateFormatSymbols` instance.

**Since:** 1.6

Throws:

- `NullPointerException`: if `locale` is null

## DateFormatSymbols.getEras()

```java
public String[] getEras()
```

Gets era strings. For example: "AD" and "BC".

**Returns:** the era strings.

## DateFormatSymbols.setEras(String[])

```java
public void setEras(String[] newEras)
```

Sets era strings. For example: "AD" and "BC".

Parameters:

- `newEras`: the new era strings.

## DateFormatSymbols.getMonths()

```java
public String[] getMonths()
```

Gets month strings. For example: "January", "February", etc.
An array with either 12 or 13 elements will be returned depending
on whether or not Calendar.UNDECIMBER
is supported. Use
Calendar.JANUARY,
Calendar.FEBRUARY,
etc. to index the result array.

If the language requires different forms for formatting and
stand-alone usages, this method returns month names in the
formatting form. For example, the preferred month name for
January in the Czech language is *ledna* in the
formatting form, while it is *leden* in the stand-alone
form. This method returns `"ledna"` in this case. Refer
to the
Calendar Elements in the Unicode Locale Data Markup Language
(LDML) specification for more details.

**Implementation requirements:** This method returns 13 elements since
Calendar.UNDECIMBER is supported.

**Returns:** the month strings.

## DateFormatSymbols.setMonths(String[])

```java
public void setMonths(String[] newMonths)
```

Sets month strings. For example: "January", "February", etc.

Parameters:

- `newMonths`: the new month strings. The array should be indexed by Calendar.JANUARY, Calendar.FEBRUARY, etc.

## DateFormatSymbols.getShortMonths()

```java
public String[] getShortMonths()
```

Gets short month strings. For example: "Jan", "Feb", etc.
An array with either 12 or 13 elements will be returned depending
on whether or not Calendar.UNDECIMBER
is supported. Use
Calendar.JANUARY,
Calendar.FEBRUARY,
etc. to index the result array.

If the language requires different forms for formatting and
stand-alone usages, this method returns short month names in
the formatting form. For example, the preferred abbreviation
for January in the Catalan language is *de gen.* in the
formatting form, while it is *gen.* in the stand-alone
form. This method returns `"de gen."` in this case. Refer
to the
Calendar Elements in the Unicode Locale Data Markup Language
(LDML) specification for more details.

**Implementation requirements:** This method returns 13 elements since
Calendar.UNDECIMBER is supported.

**Returns:** the short month strings.

## DateFormatSymbols.setShortMonths(String[])

```java
public void setShortMonths(String[] newShortMonths)
```

Sets short month strings. For example: "Jan", "Feb", etc.

Parameters:

- `newShortMonths`: the new short month strings. The array should be indexed by Calendar.JANUARY, Calendar.FEBRUARY, etc.

## DateFormatSymbols.getWeekdays()

```java
public String[] getWeekdays()
```

Gets weekday strings. For example: "Sunday", "Monday", etc.

**Returns:** the weekday strings. Use
Calendar.SUNDAY,
Calendar.MONDAY, etc. to index
the result array.

## DateFormatSymbols.setWeekdays(String[])

```java
public void setWeekdays(String[] newWeekdays)
```

Sets weekday strings. For example: "Sunday", "Monday", etc.

Parameters:

- `newWeekdays`: the new weekday strings. The array should be indexed by Calendar.SUNDAY, Calendar.MONDAY, etc.

## DateFormatSymbols.getShortWeekdays()

```java
public String[] getShortWeekdays()
```

Gets short weekday strings. For example: "Sun", "Mon", etc.

**Returns:** the short weekday strings. Use
Calendar.SUNDAY,
Calendar.MONDAY, etc. to index
the result array.

## DateFormatSymbols.setShortWeekdays(String[])

```java
public void setShortWeekdays(String[] newShortWeekdays)
```

Sets short weekday strings. For example: "Sun", "Mon", etc.

Parameters:

- `newShortWeekdays`: the new short weekday strings. The array should be indexed by Calendar.SUNDAY, Calendar.MONDAY, etc.

## DateFormatSymbols.getAmPmStrings()

```java
public String[] getAmPmStrings()
```

Gets ampm strings. For example: "AM" and "PM".

**Returns:** the ampm strings.

## DateFormatSymbols.setAmPmStrings(String[])

```java
public void setAmPmStrings(String[] newAmpms)
```

Sets ampm strings. For example: "AM" and "PM".

Parameters:

- `newAmpms`: the new ampm strings.

## DateFormatSymbols.getZoneStrings()

```java
public String[][] getZoneStrings()
```

Gets time zone strings.  Use of this method is discouraged; use
TimeZone.getDisplayName()
instead.

The value returned is a
two-dimensional array of strings of size *n* by *m*,
where *m* is at least 5.  Each of the *n* rows is an
entry containing the localized names for a single `TimeZone`.
Each such row contains (with `i` ranging from
0..*n*-1):

- `zoneStringsi` - time zone ID

- `zoneStringsi` - long name of zone in standard
time

- `zoneStringsi` - short name of zone in
standard time

- `zoneStringsi` - long name of zone in daylight
saving time

- `zoneStringsi` - short name of zone in daylight
saving time

The zone ID is *not* localized; it's one of the valid IDs of
the TimeZone class that are not
custom IDs.
All other entries are localized names.  If a zone does not implement
daylight saving time, the daylight saving time names should not be used.

If setZoneStrings has been called
on this `DateFormatSymbols` instance, then the strings
provided by that call are returned. Otherwise, the returned array
contains names provided by the Java runtime and by installed
TimeZoneNameProvider
implementations.

**Returns:** the time zone strings.

**See also:** #setZoneStrings(String[][])

## DateFormatSymbols.setZoneStrings(String[][])

```java
public void setZoneStrings(String[][] newZoneStrings)
```

Sets time zone strings.  The argument must be a
two-dimensional array of strings of size *n* by *m*,
where *m* is at least 5.  Each of the *n* rows is an
entry containing the localized names for a single `TimeZone`.
Each such row contains (with `i` ranging from
0..*n*-1):

- `zoneStringsi` - time zone ID

- `zoneStringsi` - long name of zone in standard
time

- `zoneStringsi` - short name of zone in
standard time

- `zoneStringsi` - long name of zone in daylight
saving time

- `zoneStringsi` - short name of zone in daylight
saving time

The zone ID is *not* localized; it's one of the valid IDs of
the TimeZone class that are not
custom IDs.
All other entries are localized names.

Parameters:

- `newZoneStrings`: the new time zone strings.

**See also:** #getZoneStrings()

Throws:

- `IllegalArgumentException`: if the length of any row in `newZoneStrings` is less than 5
- `NullPointerException`: if `newZoneStrings` is null

## DateFormatSymbols.getLocalPatternChars()

```java
public String getLocalPatternChars()
```

Gets localized date-time pattern characters. For example: 'u', 't', etc.

**Returns:** the localized date-time pattern characters.

## DateFormatSymbols.setLocalPatternChars(String)

```java
public void setLocalPatternChars(String newLocalPatternChars)
```

Sets localized date-time pattern characters. For example: 'u', 't', etc.

Parameters:

- `newLocalPatternChars`: the new localized date-time pattern characters.

## DateFormatSymbols.clone()

```java
public Object clone()
```

Overrides Cloneable

## DateFormatSymbols.hashCode()

```java
public int hashCode()
```

**Implementation requirements:** Non-transient instance fields of this class are used to calculate
a hash code value which adheres to the contract defined in `Objects.hashCode`.

**See also:** Object#hashCode()

## DateFormatSymbols.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the specified object with this `DateFormatSymbols` for equality.
Returns true if the object is also a `DateFormatSymbols` and the two
`DateFormatSymbols` objects represent the same date-time formatting data.

Parameters:

- `obj`: object to be compared for equality

**Implementation requirements:** This method performs an equality check with a notion of class
identity based on `getClass()`, rather than `instanceof`.
Therefore, in the equals methods in subclasses, no instance of this class
should compare as equal to an instance of a subclass.

**Returns:** `true` if the specified object is equal to this `DateFormatSymbols`

**See also:** Object#equals(Object)
