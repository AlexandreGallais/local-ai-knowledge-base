---
title: "Calendar class (java.util) (part 3 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Calendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Calendar class (java.util) (part 3 of 5)

## Calendar.setTimeOfDay(int, int, int, int)

```java
public Builder setTimeOfDay(int hourOfDay, int minute, int second, int millis)
```

Sets the time of day field parameters to the values given by
`hourOfDay`, `minute`, `second`, and
`millis`. This method is equivalent to a call to:

```java
  setFields(Calendar.HOUR_OF_DAY, hourOfDay,
            Calendar.MINUTE, minute,
            Calendar.SECOND, second,
            Calendar.MILLISECOND, millis);
```

Parameters:

- `hourOfDay`: the HOUR_OF_DAY value (24-hour clock)
- `minute`: the MINUTE value
- `second`: the SECOND value
- `millis`: the MILLISECOND value

**Returns:** this `Calendar.Builder`

## Calendar.setWeekDate(int, int, int)

```java
public Builder setWeekDate(int weekYear, int weekOfYear, int dayOfWeek)
```

Sets the week-based date parameters to the values with the given
date specifiers - week year, week of year, and day of week.

If the specified calendar doesn't support week dates, the
build method will throw an `IllegalArgumentException`.

Parameters:

- `weekYear`: the week year
- `weekOfYear`: the week number based on `weekYear`
- `dayOfWeek`: the day of week value: one of the constants for the DAY_OF_WEEK field: SUNDAY, ..., SATURDAY.

**Returns:** this `Calendar.Builder`

**See also:** Calendar#setWeekDate(int, int, int)

**See also:** Calendar#isWeekDateSupported()

## Calendar.setTimeZone(TimeZone)

```java
public Builder setTimeZone(TimeZone zone)
```

Sets the time zone parameter to the given `zone`. If no time
zone parameter is given to this `Calendar.Builder`, the
default {@code TimeZone} will be used in the build
method.

Parameters:

- `zone`: the `TimeZone`

**Returns:** this `Calendar.Builder`

**See also:** Calendar#setTimeZone(TimeZone)

Throws:

- `NullPointerException`: if `zone` is `null`

## Calendar.setLenient(boolean)

```java
public Builder setLenient(boolean lenient)
```

Sets the lenient mode parameter to the value given by `lenient`.
If no lenient parameter is given to this `Calendar.Builder`,
lenient mode will be used in the build method.

Parameters:

- `lenient`: `true` for lenient mode; `false` for non-lenient mode

**Returns:** this `Calendar.Builder`

**See also:** Calendar#setLenient(boolean)

## Calendar.setCalendarType(String)

```java
public Builder setCalendarType(String type)
```

Sets the calendar type parameter to the given `type`. The
calendar type given by this method has precedence over any explicit
or implicit calendar type given by the
locale.

In addition to the available calendar types returned by the
Calendar.getAvailableCalendarTypes
method, `"gregorian"` and `"iso8601"` as aliases of
`"gregory"` can be used with this method.

Parameters:

- `type`: the calendar type

**Returns:** this `Calendar.Builder`

**See also:** Calendar#getCalendarType()

**See also:** Calendar#getAvailableCalendarTypes()

Throws:

- `NullPointerException`: if `type` is `null`
- `IllegalArgumentException`: if `type` is unknown
- `IllegalStateException`: if another calendar type has already been set

## Calendar.setLocale(Locale)

```java
public Builder setLocale(Locale locale)
```

Sets the locale parameter to the given `locale`. If no locale
is given to this `Calendar.Builder`, the default {@code Locale}
for `Locale.Category.FORMAT` will be used.

If no calendar type is explicitly given by a call to the
setCalendarType method,
the `Locale` value is used to determine what type of
`Calendar` to be built.

If no week definition parameters are explicitly given by a call to
the setWeekDefinition method, the
`Locale`'s default values are used.

Parameters:

- `locale`: the `Locale`

**Returns:** this `Calendar.Builder`

**See also:** Calendar#getInstance(Locale)

Throws:

- `NullPointerException`: if `locale` is `null`

## Calendar.setWeekDefinition(int, int)

```java
public Builder setWeekDefinition(int firstDayOfWeek, int minimalDaysInFirstWeek)
```

Sets the week definition parameters to the values given by
`firstDayOfWeek` and `minimalDaysInFirstWeek` that are
used to determine the first
week of a year. The parameters given by this method have
precedence over the default values given by the
locale.

Parameters:

- `firstDayOfWeek`: the first day of a week; one of `Calendar.SUNDAY` to `Calendar.SATURDAY`
- `minimalDaysInFirstWeek`: the minimal number of days in the first week (1..7)

**Returns:** this `Calendar.Builder`

**See also:** Calendar#getFirstDayOfWeek()

**See also:** Calendar#getMinimalDaysInFirstWeek()

Throws:

- `IllegalArgumentException`: if `firstDayOfWeek` or `minimalDaysInFirstWeek` is invalid

## Calendar.build()

```java
public Calendar build()
```

Returns a `Calendar` built from the parameters set by the
setter methods. The calendar type given by the setCalendarType method or the locale is
used to determine what `Calendar` to be created. If no explicit
calendar type is given, the locale's default calendar is created.

If the calendar type is `"iso8601"`, the
Gregorian change date
of a `GregorianCalendar` is set to `Date(Long.MIN_VALUE)`
to be the *proleptic* Gregorian calendar. Its week definition
parameters are also set to be compatible
with the ISO 8601 standard. Note that the
getCalendarType method of
a `GregorianCalendar` created with `"iso8601"` returns
`"gregory"`.

The default values are used for locale and time zone if these
parameters haven't been given explicitly.

If the locale contains the time zone with "tz"
Unicode extension,
and time zone hasn't been given explicitly, time zone in the locale
is used.

Any out of range field values are either normalized in lenient
mode or detected as an invalid value in non-lenient mode.

**Returns:** a `Calendar` built with parameters of this `Calendar.Builder`

**See also:** Calendar#getInstance(TimeZone, Locale)

**See also:** Locale#getDefault(Locale.Category)

**See also:** TimeZone#getDefault()

Throws:

- `IllegalArgumentException`: if the calendar type is unknown, or if any invalid field values are given in non-lenient mode, or if a week date is given for the calendar type that doesn't support week dates.

## Calendar.Calendar()

```java
protected Calendar()
```

Constructs a Calendar with the default time zone
and the default FORMAT
locale.

**See also:** TimeZone#getDefault

## Calendar.Calendar(TimeZone, Locale)

```java
protected Calendar(TimeZone zone, Locale aLocale)
```

Constructs a calendar with the specified time zone and locale.

Parameters:

- `zone`: the time zone to use
- `aLocale`: the locale for the week data

## Calendar.getInstance()

```java
public static Calendar getInstance()
```

Gets a calendar using the default time zone and locale. The
`Calendar` returned is based on the current time
in the default time zone with the default
FORMAT locale.

If the locale contains the time zone with "tz"
Unicode extension,
that time zone is used instead.

**Returns:** a Calendar.

## Calendar.getInstance(TimeZone)

```java
public static Calendar getInstance(TimeZone zone)
```

Gets a calendar using the specified time zone and default locale.
The `Calendar` returned is based on the current time
in the given time zone with the default
FORMAT locale.

Parameters:

- `zone`: the time zone to use

**Returns:** a Calendar.

Throws:

- `NullPointerException`: if `zone` is `null`

## Calendar.getInstance(Locale)

```java
public static Calendar getInstance(Locale aLocale)
```

Gets a calendar using the default time zone and specified locale.
The `Calendar` returned is based on the current time
in the default time zone with the given locale.

If the locale contains the time zone with "tz"
Unicode extension,
that time zone is used instead.

Parameters:

- `aLocale`: the locale for the week data

**Returns:** a Calendar.

Throws:

- `NullPointerException`: if `aLocale` is `null`

## Calendar.getInstance(TimeZone, Locale)

```java
public static Calendar getInstance(TimeZone zone, Locale aLocale)
```

Gets a calendar with the specified time zone and locale.
The `Calendar` returned is based on the current time
in the given time zone with the given locale.

Parameters:

- `zone`: the time zone to use
- `aLocale`: the locale for the week data

**Returns:** a Calendar.

Throws:

- `NullPointerException`: if `zone` or `aLocale` is `null`

## Calendar.getAvailableLocales()

```java
public static synchronized Locale[] getAvailableLocales()
```

Returns an array of all locales for which the `getInstance`
methods of this class can return localized instances.
At a minimum, the returned array must contain a `Locale` instance equal to
Locale.ROOT and a `Locale` instance equal to
Locale.US.

**Returns:** An array of locales for which localized
        `Calendar` instances are available.

## Calendar.computeTime()

```java
protected abstract void computeTime()
```

Converts the current calendar field values in fields[]
to the millisecond time value
`time`.

**See also:** #complete()

**See also:** #computeFields()

## Calendar.computeFields()

```java
protected abstract void computeFields()
```

Converts the current millisecond time value `time`
to calendar field values in fields[].
This allows you to sync up the calendar field values with
a new time that is set for the calendar.  The time is *not*
recomputed first; to recompute the time, then the fields, call the
`complete()` method.

**See also:** #computeTime()

## Calendar.getTime()

```java
public final Date getTime()
```

Returns a `Date` object representing this
`Calendar`'s time value (millisecond offset from the Epoch").

**Returns:** a `Date` representing the time value.

**See also:** #setTime(Date)

**See also:** #getTimeInMillis()

## Calendar.setTime(Date)

```java
public final void setTime(Date date)
```

Sets this Calendar's time with the given `Date`.

Note: Calling `setTime()` with
`Date(Long.MAX_VALUE)` or `Date(Long.MIN_VALUE)`
may yield incorrect field values from `get()`.

Parameters:

- `date`: the given Date.

**See also:** #getTime()

**See also:** #setTimeInMillis(long)

Throws:

- `NullPointerException`: if `date` is `null`

## Calendar.getTimeInMillis()

```java
public long getTimeInMillis()
```

Returns this Calendar's time value in milliseconds.

**Returns:** the current time as UTC milliseconds from the epoch.

**See also:** #getTime()

**See also:** #setTimeInMillis(long)

## Calendar.setTimeInMillis(long)

```java
public void setTimeInMillis(long millis)
```

Sets this Calendar's current time from the given long value.

Parameters:

- `millis`: the new time in UTC milliseconds from the epoch.

**See also:** #setTime(Date)

**See also:** #getTimeInMillis()

## Calendar.get(int)

```java
public int get(int field)
```

Returns the value of the given calendar field. In lenient mode,
all calendar fields are normalized. In non-lenient mode, all
calendar fields are validated and this method throws an
exception if any calendar fields have out-of-range values. The
normalization and validation are handled by the
`complete()` method, which process is calendar
system dependent.

Parameters:

- `field`: the given calendar field.

**Returns:** the value for the given calendar field.

**See also:** #set(int,int)

**See also:** #complete()

Throws:

- `IllegalArgumentException`: if this `Calendar` is non-lenient and any of the calendar fields have invalid values.

## Calendar.internalGet(int)

```java
protected final int internalGet(int field)
```

Returns the value of the given calendar field. This method does
not involve normalization or validation of the field value.

Parameters:

- `field`: the given calendar field.

**Returns:** the value for the given calendar field.

**See also:** #get(int)

## Calendar.set(int, int)

```java
public void set(int field, int value)
```

Sets the given calendar field to the given value. The value is not
interpreted by this method regardless of the leniency mode.

Parameters:

- `field`: the given calendar field.
- `value`: the value to be set for the given calendar field.

**See also:** #set(int,int,int)

**See also:** #set(int,int,int,int,int)

**See also:** #set(int,int,int,int,int,int)

**See also:** #get(int)

## Calendar.set(int, int, int)

```java
public final void set(int year, int month, int date)
```

Sets the values for the calendar fields `YEAR`,
`MONTH`, and `DAY_OF_MONTH`.
Previous values of other calendar fields are retained.  If this is not desired,
call `clear()` first.

Parameters:

- `year`: the value used to set the `YEAR` calendar field.
- `month`: the value used to set the `MONTH` calendar field. Month value is 0-based. e.g., 0 for January.
- `date`: the value used to set the `DAY_OF_MONTH` calendar field.

**See also:** #set(int,int)

**See also:** #set(int,int,int,int,int)

**See also:** #set(int,int,int,int,int,int)

## Calendar.set(int, int, int, int, int)

```java
public final void set(int year, int month, int date, int hourOfDay, int minute)
```

Sets the values for the calendar fields `YEAR`,
`MONTH`, `DAY_OF_MONTH`,
`HOUR_OF_DAY`, and `MINUTE`.
Previous values of other fields are retained.  If this is not desired,
call `clear()` first.

Parameters:

- `year`: the value used to set the `YEAR` calendar field.
- `month`: the value used to set the `MONTH` calendar field. Month value is 0-based. e.g., 0 for January.
- `date`: the value used to set the `DAY_OF_MONTH` calendar field.
- `hourOfDay`: the value used to set the `HOUR_OF_DAY` calendar field.
- `minute`: the value used to set the `MINUTE` calendar field.

**See also:** #set(int,int)

**See also:** #set(int,int,int)

**See also:** #set(int,int,int,int,int,int)

## Calendar.set(int, int, int, int, int, int)

```java
public final void set(int year, int month, int date, int hourOfDay, int minute, int second)
```

Sets the values for the fields `YEAR`, `MONTH`,
`DAY_OF_MONTH`, `HOUR_OF_DAY`, `MINUTE`, and
`SECOND`.
Previous values of other fields are retained.  If this is not desired,
call `clear()` first.

Parameters:

- `year`: the value used to set the `YEAR` calendar field.
- `month`: the value used to set the `MONTH` calendar field. Month value is 0-based. e.g., 0 for January.
- `date`: the value used to set the `DAY_OF_MONTH` calendar field.
- `hourOfDay`: the value used to set the `HOUR_OF_DAY` calendar field.
- `minute`: the value used to set the `MINUTE` calendar field.
- `second`: the value used to set the `SECOND` calendar field.

**See also:** #set(int,int)

**See also:** #set(int,int,int)

**See also:** #set(int,int,int,int,int)
