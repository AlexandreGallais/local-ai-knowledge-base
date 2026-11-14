---
title: "TimeZone class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/TimeZone.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TimeZone class (java.util)

```java
public abstract class TimeZone implements Serializable, Cloneable
```

`TimeZone` represents a time zone offset, and also figures out daylight
savings.

Typically, you get a `TimeZone` using `getDefault`
which creates a `TimeZone` based on the time zone where the program
is running. For example, for a program running in Japan, `getDefault`
creates a `TimeZone` object based on Japanese Standard Time.

You can also get a `TimeZone` using `getTimeZone`
along with a time zone ID. For instance, the time zone ID for the
U.S. Pacific Time zone is "America/Los_Angeles". So, you can get a
U.S. Pacific Time `TimeZone` object with:

You can use the `getAvailableIDs` method to iterate through
all the supported time zone IDs. You can then choose a
supported ID to get a `TimeZone`.
If the time zone you want is not represented by one of the
supported IDs, then a custom time zone ID can be specified to
produce a TimeZone. The syntax of a custom time zone ID is:

```java
<a id="CustomID"><i>CustomID:</i></a>
        {@code GMT} <i>Sign</i> <i>Hours</i> {@code :} <i>Minutes</i> {@code :} <i>Seconds</i>
        {@code GMT} <i>Sign</i> <i>Hours</i> {@code :} <i>Minutes</i>
        {@code GMT} <i>Sign</i> <i>Hours</i> <i>Minutes</i>
        {@code GMT} <i>Sign</i> <i>Hours</i>
<i>Sign:</i> one of
        {@code + -}
<i>Hours:</i>
        <i>Digit</i>
        <i>Digit</i> <i>Digit</i>
<i>Minutes:</i>
        <i>Digit</i> <i>Digit</i>
<i>Seconds:</i>
        <i>Digit</i> <i>Digit</i>
<i>Digit:</i> one of
        {@code 0 1 2 3 4 5 6 7 8 9
```

*Hours* must be between 0 to 23 and *Minutes*/*Seconds* must be
between 00 to 59.  For example, "GMT+10" and "GMT+0010" mean ten
hours and ten minutes ahead of GMT, respectively.

The format is locale independent and digits must be taken from the
Basic Latin block of the Unicode standard. No daylight saving time
transition schedule can be specified with a custom time zone ID. If
the specified string doesn't match the syntax, `"GMT"`
is used.

When creating a `TimeZone`, the specified custom time
zone ID is normalized in the following syntax:

```java
<a id="NormalizedCustomID"><i>NormalizedCustomID:</i></a>
        {@code GMT} <i>Sign</i> <i>TwoDigitHours</i> {@code :} <i>Minutes</i> [<i>ColonSeconds</i>]
<i>Sign:</i> one of
        {@code + -}
<i>TwoDigitHours:</i>
        <i>Digit</i> <i>Digit</i>
<i>Minutes:</i>
        <i>Digit</i> <i>Digit</i>
<i>ColonSeconds:</i>
        {@code :} <i>Digit</i> <i>Digit</i>
<i>Digit:</i> one of
        {@code 0 1 2 3 4 5 6 7 8 9
```

For example, TimeZone.getTimeZone("GMT-8").getID() returns "GMT-08:00".
*ColonSeconds* part only appears if the seconds value is non-zero.

#### Three-letter time zone IDs

For compatibility with JDK 1.1.x, some other three-letter time zone IDs
(such as "PST", "CTT", "AST") are also supported. However, **their
use is deprecated** because the same abbreviation is often used
for multiple time zones (for example, "CST" could be U.S. "Central Standard
Time" and "China Standard Time"), and the Java platform can then only
recognize one of them. The full list of deprecated three-letter time
zone IDs and their mappings can be viewed at `java.time.ZoneId.SHORT_IDS`.

**See also:** Calendar

**See also:** GregorianCalendar

**See also:** SimpleTimeZone

**Since:** 1.1

## TimeZone.TimeZone()

```java
public TimeZone()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## TimeZone.SHORT

```java
public static final int SHORT
```

A style specifier for `getDisplayName()` indicating
a short name, such as "PST."

**See also:** #LONG

**Since:** 1.2

## TimeZone.LONG

```java
public static final int LONG
```

A style specifier for `getDisplayName()` indicating
a long name, such as "Pacific Standard Time."

**See also:** #SHORT

**Since:** 1.2

## TimeZone.getOffset(int, int, int, int, int, int)

```java
public abstract int getOffset(int era, int year, int month, int day, int dayOfWeek, int milliseconds)
```

Gets the time zone offset, for current date, modified in case of
daylight savings. This is the offset to add to UTC to get local time.

This method returns a historically correct offset if an
underlying `TimeZone` implementation subclass
supports historical Daylight Saving Time schedule and GMT
offset changes.

Parameters:

- `era`: the era of the given date.
- `year`: the year in the given date.
- `month`: the month in the given date. Month is 0-based. e.g., 0 for January.
- `day`: the day-in-month of the given date.
- `dayOfWeek`: the day-of-week of the given date.
- `milliseconds`: the milliseconds in day in *standard* local time.

**Returns:** the offset in milliseconds to add to GMT to get local time.

**See also:** Calendar#ZONE_OFFSET

**See also:** Calendar#DST_OFFSET

## TimeZone.getOffset(long)

```java
public int getOffset(long date)
```

Returns the offset of this time zone from UTC at the specified
date. If Daylight Saving Time is in effect at the specified
date, the offset value is adjusted with the amount of daylight
saving.

This method returns a historically correct offset value if an
underlying TimeZone implementation subclass supports historical
Daylight Saving Time schedule and GMT offset changes.

Parameters:

- `date`: the date represented in milliseconds since January 1, 1970 00:00:00 GMT

**Returns:** the amount of time in milliseconds to add to UTC to get local time.

**See also:** Calendar#ZONE_OFFSET

**See also:** Calendar#DST_OFFSET

**Since:** 1.4

## TimeZone.setRawOffset(int)

```java
public abstract void setRawOffset(int offsetMillis)
```

Sets the base time zone offset to GMT.
This is the offset to add to UTC to get local time.

If an underlying `TimeZone` implementation subclass
supports historical GMT offset changes, the specified GMT
offset is set as the latest GMT offset and the difference from
the known latest GMT offset value is used to adjust all
historical GMT offset values.

Parameters:

- `offsetMillis`: the given base time zone offset to GMT.

## TimeZone.getRawOffset()

```java
public abstract int getRawOffset()
```

Returns the amount of time in milliseconds to add to UTC to get
standard time in this time zone. Because this value is not
affected by daylight saving time, it is called *raw
offset*.

If an underlying `TimeZone` implementation subclass
supports historical GMT offset changes, the method returns the
raw offset value of the current date. In Honolulu, for example,
its raw offset changed from GMT-10:30 to GMT-10:00 in 1947, and
this method always returns -36000000 milliseconds (i.e., -10
hours).

**Returns:** the amount of raw offset time in milliseconds to add to UTC.

**See also:** Calendar#ZONE_OFFSET

## TimeZone.getID()

```java
public String getID()
```

Gets the ID of this time zone.

**Returns:** the ID of this time zone.

## TimeZone.setID(String)

```java
public void setID(String ID)
```

Sets the time zone ID. This does not change any other data in
the time zone object.

Parameters:

- `ID`: the new time zone ID.

**Implementation requirements:** The default implementation throws a
`NullPointerException` if `ID` is `null`

Throws:

- `NullPointerException`: This method may throw a `NullPointerException` if `ID` is `null`

## TimeZone.getDisplayName()

```java
public final String getDisplayName()
```

Returns a long standard time name of this `TimeZone` suitable for
presentation to the user in the default locale.

This method is equivalent to:

**Returns:** the human-readable name of this time zone in the default locale.

**Since:** 1.2

**See also:** #getDisplayName(boolean, int, Locale)

**See also:** Locale#getDefault(Locale.Category)

**See also:** Locale.Category

## TimeZone.getDisplayName(Locale)

```java
public final String getDisplayName(Locale locale)
```

Returns a long standard time name of this `TimeZone` suitable for
presentation to the user in the specified `locale`.

This method is equivalent to:

Parameters:

- `locale`: the locale in which to supply the display name.

**Returns:** the human-readable name of this time zone in the given locale.

**Since:** 1.2

**See also:** #getDisplayName(boolean, int, Locale)

Throws:

- `NullPointerException`: if `locale` is `null`.

## TimeZone.getDisplayName(boolean, int)

```java
public final String getDisplayName(boolean daylight, int style)
```

Returns a name in the specified `style` of this `TimeZone`
suitable for presentation to the user in the default locale. If the
specified `daylight` is `true`, a Daylight Saving Time name
is returned (even if this `TimeZone` doesn't observe Daylight Saving
Time). Otherwise, a Standard Time name is returned.

This method is equivalent to:

Parameters:

- `daylight`: `true` specifying a Daylight Saving Time name, or `false` specifying a Standard Time name
- `style`: either `LONG` or `SHORT`

**Returns:** the human-readable name of this time zone in the default locale.

**Since:** 1.2

**See also:** #getDisplayName(boolean, int, Locale)

**See also:** Locale#getDefault(Locale.Category)

**See also:** Locale.Category

**See also:** java.text.DateFormatSymbols#getZoneStrings()

Throws:

- `IllegalArgumentException`: if `style` is invalid.

## TimeZone.getDisplayName(boolean, int, Locale)

```java
public String getDisplayName(boolean daylight, int style, Locale locale)
```

Returns a name in the specified `style` of this `TimeZone`
suitable for presentation to the user in the specified `locale`. If the specified `daylight` is `true`, a Daylight
Saving Time name is returned (even if this `TimeZone` doesn't
observe Daylight Saving Time). Otherwise, a Standard Time name is
returned.

When looking up a time zone name, the default {@code Locale} search path of {@code ResourceBundle} derived
from the specified `locale` is used. (No fallback {@code Locale} search is performed.) If a time zone name in any
`Locale` of the search path, including `Locale.ROOT`, is
found, the name is returned. Otherwise, a string in the
normalized custom ID format is returned.

Parameters:

- `daylight`: `true` specifying a Daylight Saving Time name, or `false` specifying a Standard Time name
- `style`: either `LONG` or `SHORT`
- `locale`: the locale in which to supply the display name.

**Implementation requirements:** The default implementation throws an
`IllegalArgumentException` if `style` is invalid or a
`NullPointerException` if `ID` is `null`.

**Returns:** the human-readable name of this time zone in the given locale.

**Since:** 1.2

**See also:** java.text.DateFormatSymbols#getZoneStrings()

Throws:

- `IllegalArgumentException`: This method may throw an `IllegalArgumentException` if `style` is invalid.
- `NullPointerException`: This method may throw a `NullPointerException` if `ID` is `null`

## TimeZone.getDSTSavings()

```java
public int getDSTSavings()
```

Returns the amount of time to be added to local standard time
to get local wall clock time.

The default implementation returns 3600000 milliseconds
(i.e., one hour) if a call to `useDaylightTime()`
returns `true`. Otherwise, 0 (zero) is returned.

If an underlying `TimeZone` implementation subclass
supports historical and future Daylight Saving Time schedule
changes, this method returns the amount of saving time of the
last known Daylight Saving Time rule that can be a future
prediction.

If the amount of saving time at any given time stamp is
required, construct a `Calendar` with this `TimeZone` and the time stamp, and call Calendar.get`(``Calendar.DST_OFFSET``)`.

**Returns:** the amount of saving time in milliseconds

**Since:** 1.4

**See also:** #inDaylightTime(Date)

**See also:** #getOffset(long)

**See also:** #getOffset(int,int,int,int,int,int)

**See also:** Calendar#ZONE_OFFSET

## TimeZone.useDaylightTime()

```java
public abstract boolean useDaylightTime()
```

Queries if this `TimeZone` uses Daylight Saving Time.

If an underlying `TimeZone` implementation subclass
supports historical and future Daylight Saving Time schedule
changes, this method refers to the last known Daylight Saving Time
rule that can be a future prediction and may not be the same as
the current rule. Consider calling `observesDaylightTime()`
if the current rule should also be taken into account.

**Returns:** `true` if this `TimeZone` uses Daylight Saving Time,
        `false`, otherwise.

**See also:** #inDaylightTime(Date)

**See also:** Calendar#DST_OFFSET

## TimeZone.observesDaylightTime()

```java
public boolean observesDaylightTime()
```

Returns `true` if this `TimeZone` is currently in
Daylight Saving Time, or if a transition from Standard Time to
Daylight Saving Time occurs at any future time.

The default implementation returns `true` if
`useDaylightTime()` or `inDaylightTime(new Date())`
returns `true`.

**Returns:** `true` if this `TimeZone` is currently in
Daylight Saving Time, or if a transition from Standard Time to
Daylight Saving Time occurs at any future time; `false`
otherwise.

**Since:** 1.7

**See also:** #useDaylightTime()

**See also:** #inDaylightTime(Date)

**See also:** Calendar#DST_OFFSET

## TimeZone.inDaylightTime(Date)

```java
public abstract boolean inDaylightTime(Date date)
```

Queries if the given `date` is in Daylight Saving Time in
this time zone.

Parameters:

- `date`: the given Date.

**Returns:** `true` if the given date is in Daylight Saving Time,
        `false`, otherwise.

Throws:

- `NullPointerException`: This method may throw a `NullPointerException` if `date` is `null`

## TimeZone.getTimeZone(String)

```java
public static TimeZone getTimeZone(String ID)
```

Gets the `TimeZone` for the given ID.

Parameters:

- `ID`: the ID for a `TimeZone`, either an abbreviation such as "PST", a full name such as "America/Los_Angeles", or a custom ID such as "GMT-8:00". Note that the support of abbreviations is for JDK 1.1.x compatibility only and full names should be used.

**Returns:** the specified `TimeZone`, or the GMT zone if the given ID
cannot be understood.

Throws:

- `NullPointerException`: if `ID` is `null`

## TimeZone.getTimeZone(ZoneId)

```java
public static TimeZone getTimeZone(ZoneId zoneId)
```

Gets the `TimeZone` for the given `zoneId`.

Parameters:

- `zoneId`: a `ZoneId` from which the time zone ID is obtained

**Returns:** the specified `TimeZone`, or the GMT zone if the given ID
        cannot be understood.

**Since:** 1.8

Throws:

- `NullPointerException`: if `zoneId` is `null`

## TimeZone.toZoneId()

```java
public ZoneId toZoneId()
```

Converts this `TimeZone` object to a `ZoneId`.

**Returns:** a `ZoneId` representing the same time zone as this
        `TimeZone`

**Since:** 1.8
