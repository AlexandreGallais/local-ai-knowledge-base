# TimeZone class (java.util)

```java
public abstract class TimeZone implements Serializable, Cloneable
```

{@code TimeZone} represents a time zone offset, and also figures out daylight
savings.

<p>
Typically, you get a {@code TimeZone} using {@code getDefault}
which creates a {@code TimeZone} based on the time zone where the program
is running. For example, for a program running in Japan, {@code getDefault}
creates a {@code TimeZone} object based on Japanese Standard Time.

<p>
You can also get a {@code TimeZone} using {@code getTimeZone}
along with a time zone ID. For instance, the time zone ID for the
U.S. Pacific Time zone is "America/Los_Angeles". So, you can get a
U.S. Pacific Time {@code TimeZone} object with:
<blockquote>
{@snippet lang=java :
TimeZone tz = TimeZone.getTimeZone("America/Los_Angeles");
}
</blockquote>
You can use the {@code getAvailableIDs} method to iterate through
all the supported time zone IDs. You can then choose a
supported ID to get a {@code TimeZone}.
If the time zone you want is not represented by one of the
supported IDs, then a custom time zone ID can be specified to
produce a TimeZone. The syntax of a custom time zone ID is:

<blockquote><pre>
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
        {@code 0 1 2 3 4 5 6 7 8 9}
</pre></blockquote>

<i>Hours</i> must be between 0 to 23 and <i>Minutes</i>/<i>Seconds</i> must be
between 00 to 59.  For example, "GMT+10" and "GMT+0010" mean ten
hours and ten minutes ahead of GMT, respectively.
<p>
The format is locale independent and digits must be taken from the
Basic Latin block of the Unicode standard. No daylight saving time
transition schedule can be specified with a custom time zone ID. If
the specified string doesn't match the syntax, {@code "GMT"}
is used.
<p>
When creating a {@code TimeZone}, the specified custom time
zone ID is normalized in the following syntax:
<blockquote><pre>
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
        {@code 0 1 2 3 4 5 6 7 8 9}
</pre></blockquote>
For example, TimeZone.getTimeZone("GMT-8").getID() returns "GMT-08:00".
<i>ColonSeconds</i> part only appears if the seconds value is non-zero.

<h2>Three-letter time zone IDs</h2>

For compatibility with JDK 1.1.x, some other three-letter time zone IDs
(such as "PST", "CTT", "AST") are also supported. However, <strong>their
use is deprecated</strong> because the same abbreviation is often used
for multiple time zones (for example, "CST" could be U.S. "Central Standard
Time" and "China Standard Time"), and the Java platform can then only
recognize one of them. The full list of deprecated three-letter time
zone IDs and their mappings can be viewed at {@link java.time.ZoneId#SHORT_IDS}.

@see          Calendar
@see          GregorianCalendar
@see          SimpleTimeZone
@author       Mark Davis, David Goldsmith, Chen-Lieh Huang, Alan Liu
@since        1.1

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

A style specifier for {@code getDisplayName()} indicating
a short name, such as "PST."
@see #LONG
@since 1.2

## TimeZone.LONG

```java
public static final int LONG
```

A style specifier for {@code getDisplayName()} indicating
a long name, such as "Pacific Standard Time."
@see #SHORT
@since 1.2

## TimeZone.getOffset(int, int, int, int, int, int)

```java
public abstract int getOffset(int era, int year, int month, int day, int dayOfWeek, int milliseconds)
```

Gets the time zone offset, for current date, modified in case of
daylight savings. This is the offset to add to UTC to get local time.
<p>
This method returns a historically correct offset if an
underlying {@code TimeZone} implementation subclass
supports historical Daylight Saving Time schedule and GMT
offset changes.

@param era the era of the given date.
@param year the year in the given date.
@param month the month in the given date.
Month is 0-based. e.g., 0 for January.
@param day the day-in-month of the given date.
@param dayOfWeek the day-of-week of the given date.
@param milliseconds the milliseconds in day in <em>standard</em>
local time.

@return the offset in milliseconds to add to GMT to get local time.

@see Calendar#ZONE_OFFSET
@see Calendar#DST_OFFSET

## TimeZone.getOffset(long)

```java
public int getOffset(long date)
```

Returns the offset of this time zone from UTC at the specified
date. If Daylight Saving Time is in effect at the specified
date, the offset value is adjusted with the amount of daylight
saving.
<p>
This method returns a historically correct offset value if an
underlying TimeZone implementation subclass supports historical
Daylight Saving Time schedule and GMT offset changes.

@param date the date represented in milliseconds since January 1, 1970 00:00:00 GMT
@return the amount of time in milliseconds to add to UTC to get local time.

@see Calendar#ZONE_OFFSET
@see Calendar#DST_OFFSET
@since 1.4

## TimeZone.setRawOffset(int)

```java
public abstract void setRawOffset(int offsetMillis)
```

Sets the base time zone offset to GMT.
This is the offset to add to UTC to get local time.
<p>
If an underlying {@code TimeZone} implementation subclass
supports historical GMT offset changes, the specified GMT
offset is set as the latest GMT offset and the difference from
the known latest GMT offset value is used to adjust all
historical GMT offset values.

@param offsetMillis the given base time zone offset to GMT.

## TimeZone.getRawOffset()

```java
public abstract int getRawOffset()
```

Returns the amount of time in milliseconds to add to UTC to get
standard time in this time zone. Because this value is not
affected by daylight saving time, it is called <I>raw
offset</I>.
<p>
If an underlying {@code TimeZone} implementation subclass
supports historical GMT offset changes, the method returns the
raw offset value of the current date. In Honolulu, for example,
its raw offset changed from GMT-10:30 to GMT-10:00 in 1947, and
this method always returns -36000000 milliseconds (i.e., -10
hours).

@return the amount of raw offset time in milliseconds to add to UTC.
@see Calendar#ZONE_OFFSET

## TimeZone.getID()

```java
public String getID()
```

Gets the ID of this time zone.
@return the ID of this time zone.

## TimeZone.setID(String)

```java
public void setID(String ID)
```

Sets the time zone ID. This does not change any other data in
the time zone object.
@implSpec The default implementation throws a
{@code NullPointerException} if {@code ID} is {@code null}
@param ID the new time zone ID.
@throws NullPointerException This method may throw a
{@code NullPointerException} if {@code ID} is {@code null}

## TimeZone.getDisplayName()

```java
public final String getDisplayName()
```

Returns a long standard time name of this {@code TimeZone} suitable for
presentation to the user in the default locale.

<p>This method is equivalent to:
<blockquote>
{@snippet lang=java :
// @link substring="LONG" target="#LONG" :
getDisplayName(false, LONG,
               // @link substring="Locale.Category.DISPLAY" target="Locale.Category#DISPLAY" :
               Locale.getDefault(Locale.Category.DISPLAY));
}
</blockquote>

@return the human-readable name of this time zone in the default locale.
@since 1.2
@see #getDisplayName(boolean, int, Locale)
@see Locale#getDefault(Locale.Category)
@see Locale.Category

## TimeZone.getDisplayName(Locale)

```java
public final String getDisplayName(Locale locale)
```

Returns a long standard time name of this {@code TimeZone} suitable for
presentation to the user in the specified {@code locale}.

<p>This method is equivalent to:
<blockquote>
{@snippet lang=java :
// @link substring="LONG" target="#LONG" :
getDisplayName(false, LONG, locale);
}
</blockquote>

@param locale the locale in which to supply the display name.
@return the human-readable name of this time zone in the given locale.
@throws    NullPointerException if {@code locale} is {@code null}.
@since 1.2
@see #getDisplayName(boolean, int, Locale)

## TimeZone.getDisplayName(boolean, int)

```java
public final String getDisplayName(boolean daylight, int style)
```

Returns a name in the specified {@code style} of this {@code TimeZone}
suitable for presentation to the user in the default locale. If the
specified {@code daylight} is {@code true}, a Daylight Saving Time name
is returned (even if this {@code TimeZone} doesn't observe Daylight Saving
Time). Otherwise, a Standard Time name is returned.

<p>This method is equivalent to:
<blockquote>
{@snippet lang=java :
getDisplayName(daylight, style,
               // @link substring="Locale.Category.DISPLAY" target="Locale.Category#DISPLAY" :
               Locale.getDefault(Locale.Category.DISPLAY));
}
</blockquote>

@param daylight {@code true} specifying a Daylight Saving Time name, or
                {@code false} specifying a Standard Time name
@param style either {@link #LONG} or {@link #SHORT}
@return the human-readable name of this time zone in the default locale.
@throws    IllegalArgumentException if {@code style} is invalid.
@since 1.2
@see #getDisplayName(boolean, int, Locale)
@see Locale#getDefault(Locale.Category)
@see Locale.Category
@see java.text.DateFormatSymbols#getZoneStrings()

## TimeZone.getDisplayName(boolean, int, Locale)

```java
public String getDisplayName(boolean daylight, int style, Locale locale)
```

Returns a name in the specified {@code style} of this {@code TimeZone}
suitable for presentation to the user in the specified {@code
locale}. If the specified {@code daylight} is {@code true}, a Daylight
Saving Time name is returned (even if this {@code TimeZone} doesn't
observe Daylight Saving Time). Otherwise, a Standard Time name is
returned.

<p>When looking up a time zone name, the {@linkplain
ResourceBundle.Control#getCandidateLocales(String,Locale) default
{@code Locale} search path of {@code ResourceBundle}} derived
from the specified {@code locale} is used. (No {@linkplain
ResourceBundle.Control#getFallbackLocale(String,Locale) fallback
{@code Locale}} search is performed.) If a time zone name in any
{@code Locale} of the search path, including {@link Locale#ROOT}, is
found, the name is returned. Otherwise, a string in the
<a href="#NormalizedCustomID">normalized custom ID format</a> is returned.

@implSpec The default implementation throws an
{@code IllegalArgumentException} if {@code style} is invalid or a
{@code NullPointerException} if {@code ID} is {@code null}.
@param daylight {@code true} specifying a Daylight Saving Time name, or
                {@code false} specifying a Standard Time name
@param style either {@link #LONG} or {@link #SHORT}
@param locale   the locale in which to supply the display name.
@return the human-readable name of this time zone in the given locale.
@throws IllegalArgumentException This method may throw an
{@code IllegalArgumentException} if {@code style} is invalid.
@throws NullPointerException This method may throw a
{@code NullPointerException} if {@code ID} is {@code null}
@since 1.2
@see java.text.DateFormatSymbols#getZoneStrings()

## TimeZone.getDSTSavings()

```java
public int getDSTSavings()
```

Returns the amount of time to be added to local standard time
to get local wall clock time.

<p>The default implementation returns 3600000 milliseconds
(i.e., one hour) if a call to {@link #useDaylightTime()}
returns {@code true}. Otherwise, 0 (zero) is returned.

<p>If an underlying {@code TimeZone} implementation subclass
supports historical and future Daylight Saving Time schedule
changes, this method returns the amount of saving time of the
last known Daylight Saving Time rule that can be a future
prediction.

<p>If the amount of saving time at any given time stamp is
required, construct a {@link Calendar} with this {@code
TimeZone} and the time stamp, and call {@link Calendar#get(int)
Calendar.get}{@code (}{@link Calendar#DST_OFFSET}{@code )}.

@return the amount of saving time in milliseconds
@since 1.4
@see #inDaylightTime(Date)
@see #getOffset(long)
@see #getOffset(int,int,int,int,int,int)
@see Calendar#ZONE_OFFSET

## TimeZone.useDaylightTime()

```java
public abstract boolean useDaylightTime()
```

Queries if this {@code TimeZone} uses Daylight Saving Time.

<p>If an underlying {@code TimeZone} implementation subclass
supports historical and future Daylight Saving Time schedule
changes, this method refers to the last known Daylight Saving Time
rule that can be a future prediction and may not be the same as
the current rule. Consider calling {@link #observesDaylightTime()}
if the current rule should also be taken into account.

@return {@code true} if this {@code TimeZone} uses Daylight Saving Time,
        {@code false}, otherwise.
@see #inDaylightTime(Date)
@see Calendar#DST_OFFSET

## TimeZone.observesDaylightTime()

```java
public boolean observesDaylightTime()
```

Returns {@code true} if this {@code TimeZone} is currently in
Daylight Saving Time, or if a transition from Standard Time to
Daylight Saving Time occurs at any future time.

<p>The default implementation returns {@code true} if
{@code useDaylightTime()} or {@code inDaylightTime(new Date())}
returns {@code true}.

@return {@code true} if this {@code TimeZone} is currently in
Daylight Saving Time, or if a transition from Standard Time to
Daylight Saving Time occurs at any future time; {@code false}
otherwise.
@since 1.7
@see #useDaylightTime()
@see #inDaylightTime(Date)
@see Calendar#DST_OFFSET

## TimeZone.inDaylightTime(Date)

```java
public abstract boolean inDaylightTime(Date date)
```

Queries if the given {@code date} is in Daylight Saving Time in
this time zone.

@param date the given Date.
@return {@code true} if the given date is in Daylight Saving Time,
        {@code false}, otherwise.
@throws NullPointerException This method may throw a
{@code NullPointerException} if {@code date} is {@code null}

## TimeZone.getTimeZone(String)

```java
public static TimeZone getTimeZone(String ID)
```

Gets the {@code TimeZone} for the given ID.

@param ID the ID for a {@code TimeZone}, either an abbreviation
such as "PST", a full name such as "America/Los_Angeles", or a custom
ID such as "GMT-8:00". Note that the support of abbreviations is
for JDK 1.1.x compatibility only and full names should be used.

@return the specified {@code TimeZone}, or the GMT zone if the given ID
cannot be understood.
@throws NullPointerException if {@code ID} is {@code null}

## TimeZone.getTimeZone(ZoneId)

```java
public static TimeZone getTimeZone(ZoneId zoneId)
```

Gets the {@code TimeZone} for the given {@code zoneId}.

@param zoneId a {@link ZoneId} from which the time zone ID is obtained
@return the specified {@code TimeZone}, or the GMT zone if the given ID
        cannot be understood.
@throws NullPointerException if {@code zoneId} is {@code null}
@since 1.8

## TimeZone.toZoneId()

```java
public ZoneId toZoneId()
```

Converts this {@code TimeZone} object to a {@code ZoneId}.

@return a {@code ZoneId} representing the same time zone as this
        {@code TimeZone}
@since 1.8

## TimeZone.getAvailableIDs(int)

```java
public static String[] getAvailableIDs(int rawOffset)
```

Gets the available IDs according to the given time zone offset in milliseconds.

@apiNote Consider using {@link #availableIDs(int)} which returns
a stream of the available time zone IDs according to the given offset.

@param rawOffset the given time zone GMT offset in milliseconds.
@return an array of IDs, where the time zone for that ID has
the specified GMT offset. For example, "America/Phoenix" and "America/Denver"
both have GMT-07:00, but differ in daylight saving behavior.
@see #getRawOffset()
@see #availableIDs(int)

## TimeZone.getAvailableIDs()

```java
public static String[] getAvailableIDs()
```

{@return an array of the available IDs supported}

@apiNote Consider using {@link #availableIDs()} which returns
a stream of the available time zone IDs.

@see #availableIDs()

## TimeZone.availableIDs(int)

```java
public static Stream<String> availableIDs(int rawOffset)
```

Gets the available IDs according to the given time zone offset in milliseconds.

@implNote Unlike {@link #getAvailableIDs(int)}, this method does
not create a copy of the {@code TimeZone} IDs array.

@param rawOffset the given time zone GMT offset in milliseconds.
@return a stream of IDs, where the time zone for that ID has
the specified GMT offset. For example, "America/Phoenix" and "America/Denver"
both have GMT-07:00, but differ in daylight saving behavior.
@see #getRawOffset()
@see #getAvailableIDs(int)
@since 25

## TimeZone.availableIDs()

```java
public static Stream<String> availableIDs()
```

{@return a stream of the available IDs supported}

@implNote Unlike {@link #getAvailableIDs()}, this method does
not create a copy of the {@code TimeZone} IDs array.

@since 25
@see #getAvailableIDs()

## TimeZone.getDefault()

```java
public static TimeZone getDefault()
```

Gets the default {@code TimeZone} of the Java virtual machine. If the
cached default {@code TimeZone} is available, its clone is returned.
Otherwise, the method takes the following steps to determine the default
time zone.

<ul>
<li>Use the {@systemProperty user.timezone} property value as the default
time zone ID if it's available.</li>
<li>Detect the platform time zone ID. The source of the
platform time zone and ID mapping may vary with implementation.</li>
<li>Use {@code GMT} as the last resort if the given or detected
time zone ID is unknown.</li>
</ul>

<p>The default {@code TimeZone} created from the ID is cached,
and its clone is returned. The {@code user.timezone} property
value is set to the ID upon return.

@return the default {@code TimeZone}
@see #setDefault(TimeZone)

## TimeZone.setDefault(TimeZone)

```java
public static void setDefault(TimeZone zone)
```

Sets the {@code TimeZone} that is returned by the {@code getDefault}
method. {@code zone} is cached. If {@code zone} is null, the cached
default {@code TimeZone} is cleared. This method doesn't change the value
of the {@code user.timezone} property.

@param zone the new default {@code TimeZone}, or null
@see #getDefault

## TimeZone.hasSameRules(TimeZone)

```java
public boolean hasSameRules(TimeZone other)
```

Returns true if this zone has the same rule and offset as another zone.
That is, if this zone differs only in ID, if at all.  Returns false
if the other zone is null.
@param other the {@code TimeZone} object to be compared with
@return true if the other zone is not null and is the same as this one,
with the possible exception of the ID
@since 1.2

## TimeZone.clone()

```java
public Object clone()
```

Creates a copy of this {@code TimeZone}.

@return a clone of this {@code TimeZone}