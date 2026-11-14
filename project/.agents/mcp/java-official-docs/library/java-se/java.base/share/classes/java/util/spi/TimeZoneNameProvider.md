---
title: "TimeZoneNameProvider class (java.util.spi)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/spi/TimeZoneNameProvider.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TimeZoneNameProvider class (java.util.spi)

```java
public abstract class TimeZoneNameProvider extends LocaleServiceProvider
```

An abstract class for service providers that
provide localized time zone names for the
TimeZone class.
The localized time zone names available from the implementations of
this class are also the source for the
DateFormatSymbols.getZoneStrings() method.

**Since:** 1.6

## TimeZoneNameProvider.TimeZoneNameProvider()

```java
protected TimeZoneNameProvider()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## TimeZoneNameProvider.getDisplayName(String, boolean, int, Locale)

```java
public abstract String getDisplayName(String ID, boolean daylight, int style, Locale locale)
```

Returns a name for the given time zone ID that's suitable for
presentation to the user in the specified locale. The given time
zone ID is "GMT" or one of the names defined using "Zone" entries
in the "tz database", a public domain time zone database at
https://www.iana.org/time-zones.
The data of this database is contained in a file whose name starts with
"tzdata", and the specification of the data format is part of the zic.8
man page, which is contained in a file whose name starts with "tzcode".

If `daylight` is true, the method should return a name
appropriate for daylight saving time even if the specified time zone
has not observed daylight saving time in the past.

Parameters:

- `ID`: a time zone ID string
- `daylight`: if true, return the daylight saving name.
- `style`: either TimeZone.LONG or TimeZone.SHORT
- `locale`: the desired locale

**Returns:** the human-readable name of the given time zone in the
    given locale, or null if it's not available.

**See also:** java.util.TimeZone#getDisplayName(boolean, int, java.util.Locale)

Throws:

- `IllegalArgumentException`: if `style` is invalid, or `locale` isn't one of the locales returned from getAvailableLocales().
- `NullPointerException`: if `ID` or `locale` is null

## TimeZoneNameProvider.getGenericDisplayName(String, int, Locale)

```java
public String getGenericDisplayName(String ID, int style, Locale locale)
```

Returns a generic name for the given time zone `ID` that's suitable
for presentation to the user in the specified `locale`. Generic
time zone names are neutral from standard time and daylight saving
time. For example, "PT" is the short generic name of time zone ID `America/Los_Angeles`, while its short standard time and daylight saving
time names are "PST" and "PDT", respectively. Refer to
boolean, int, Locale) getDisplayName
for valid time zone IDs.

The default implementation of this method returns `null`.

Parameters:

- `ID`: a time zone ID string
- `style`: either TimeZone.LONG or TimeZone.SHORT
- `locale`: the desired locale

**Returns:** the human-readable generic name of the given time zone in the
    given locale, or `null` if it's not available.

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if `style` is invalid, or `locale` isn't one of the locales returned from getAvailableLocales().
- `NullPointerException`: if `ID` or `locale` is `null`
