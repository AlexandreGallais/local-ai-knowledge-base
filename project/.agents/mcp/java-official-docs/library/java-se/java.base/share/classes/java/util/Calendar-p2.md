---
title: "Calendar class (java.util) (part 2 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Calendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Calendar class (java.util) (part 2 of 5)

## Calendar.DAY_OF_WEEK_IN_MONTH

```java
public static final int DAY_OF_WEEK_IN_MONTH
```

Field number for `get` and `set` indicating the
ordinal number of the day of the week within the current month. Together
with the `DAY_OF_WEEK` field, this uniquely specifies a day
within a month.  Unlike `WEEK_OF_MONTH` and
`WEEK_OF_YEAR`, this field's value does *not* depend on
`getFirstDayOfWeek()` or
`getMinimalDaysInFirstWeek()`.  `DAY_OF_MONTH 1`
through `7` always correspond to `DAY_OF_WEEK_IN_MONTH
1`; `8` through `14` correspond to
`DAY_OF_WEEK_IN_MONTH 2`, and so on.
`DAY_OF_WEEK_IN_MONTH 0` indicates the week before
`DAY_OF_WEEK_IN_MONTH 1`.  Negative values count back from the
end of the month, so the last Sunday of a month is specified as
`DAY_OF_WEEK = SUNDAY, DAY_OF_WEEK_IN_MONTH = -1`.  Because
negative values count backward they will usually be aligned differently
within the month than positive values.  For example, if a month has 31
days, `DAY_OF_WEEK_IN_MONTH -1` will overlap
`DAY_OF_WEEK_IN_MONTH 5` and the end of `4`.

**See also:** #DAY_OF_WEEK

**See also:** #WEEK_OF_MONTH

## Calendar.AM_PM

```java
public static final int AM_PM
```

Field number for `get` and `set` indicating
whether the `HOUR` is before or after noon.
E.g., at 10:04:15.250 PM the `AM_PM` is `PM`.

**See also:** #AM

**See also:** #PM

**See also:** #HOUR

## Calendar.HOUR

```java
public static final int HOUR
```

Field number for `get` and `set` indicating the
hour of the morning or afternoon. `HOUR` is used for the
12-hour clock (0 - 11). Noon and midnight are represented by 0, not by 12.
E.g., at 10:04:15.250 PM the `HOUR` is 10.

**See also:** #AM_PM

**See also:** #HOUR_OF_DAY

## Calendar.HOUR_OF_DAY

```java
public static final int HOUR_OF_DAY
```

Field number for `get` and `set` indicating the
hour of the day. `HOUR_OF_DAY` is used for the 24-hour clock.
E.g., at 10:04:15.250 PM the `HOUR_OF_DAY` is 22.

**See also:** #HOUR

## Calendar.MINUTE

```java
public static final int MINUTE
```

Field number for `get` and `set` indicating the
minute within the hour.
E.g., at 10:04:15.250 PM the `MINUTE` is 4.

## Calendar.SECOND

```java
public static final int SECOND
```

Field number for `get` and `set` indicating the
second within the minute.
E.g., at 10:04:15.250 PM the `SECOND` is 15.

## Calendar.MILLISECOND

```java
public static final int MILLISECOND
```

Field number for `get` and `set` indicating the
millisecond within the second.
E.g., at 10:04:15.250 PM the `MILLISECOND` is 250.

## Calendar.ZONE_OFFSET

```java
public static final int ZONE_OFFSET
```

Field number for `get` and `set`
indicating the raw offset from GMT in milliseconds.

This field reflects the correct GMT offset value of the time
zone of this `Calendar` if the
`TimeZone` implementation subclass supports
historical GMT offset changes.

## Calendar.DST_OFFSET

```java
public static final int DST_OFFSET
```

Field number for `get` and `set` indicating the
daylight saving offset in milliseconds.

This field reflects the correct daylight saving offset value of
the time zone of this `Calendar` if the
`TimeZone` implementation subclass supports
historical Daylight Saving Time schedule changes.

## Calendar.FIELD_COUNT

```java
public static final int FIELD_COUNT
```

The number of distinct fields recognized by `get` and `set`.
Field numbers range from `0..FIELD_COUNT-1`.

## Calendar.SUNDAY

```java
public static final int SUNDAY
```

Value of the `DAY_OF_WEEK` field indicating
Sunday.

## Calendar.MONDAY

```java
public static final int MONDAY
```

Value of the `DAY_OF_WEEK` field indicating
Monday.

## Calendar.TUESDAY

```java
public static final int TUESDAY
```

Value of the `DAY_OF_WEEK` field indicating
Tuesday.

## Calendar.WEDNESDAY

```java
public static final int WEDNESDAY
```

Value of the `DAY_OF_WEEK` field indicating
Wednesday.

## Calendar.THURSDAY

```java
public static final int THURSDAY
```

Value of the `DAY_OF_WEEK` field indicating
Thursday.

## Calendar.FRIDAY

```java
public static final int FRIDAY
```

Value of the `DAY_OF_WEEK` field indicating
Friday.

## Calendar.SATURDAY

```java
public static final int SATURDAY
```

Value of the `DAY_OF_WEEK` field indicating
Saturday.

## Calendar.JANUARY

```java
public static final int JANUARY
```

Value of the `MONTH` field indicating the
first month of the year in the Gregorian and Julian calendars.

## Calendar.FEBRUARY

```java
public static final int FEBRUARY
```

Value of the `MONTH` field indicating the
second month of the year in the Gregorian and Julian calendars.

## Calendar.MARCH

```java
public static final int MARCH
```

Value of the `MONTH` field indicating the
third month of the year in the Gregorian and Julian calendars.

## Calendar.APRIL

```java
public static final int APRIL
```

Value of the `MONTH` field indicating the
fourth month of the year in the Gregorian and Julian calendars.

## Calendar.MAY

```java
public static final int MAY
```

Value of the `MONTH` field indicating the
fifth month of the year in the Gregorian and Julian calendars.

## Calendar.JUNE

```java
public static final int JUNE
```

Value of the `MONTH` field indicating the
sixth month of the year in the Gregorian and Julian calendars.

## Calendar.JULY

```java
public static final int JULY
```

Value of the `MONTH` field indicating the
seventh month of the year in the Gregorian and Julian calendars.

## Calendar.AUGUST

```java
public static final int AUGUST
```

Value of the `MONTH` field indicating the
eighth month of the year in the Gregorian and Julian calendars.

## Calendar.SEPTEMBER

```java
public static final int SEPTEMBER
```

Value of the `MONTH` field indicating the
ninth month of the year in the Gregorian and Julian calendars.

## Calendar.OCTOBER

```java
public static final int OCTOBER
```

Value of the `MONTH` field indicating the
tenth month of the year in the Gregorian and Julian calendars.

## Calendar.NOVEMBER

```java
public static final int NOVEMBER
```

Value of the `MONTH` field indicating the
eleventh month of the year in the Gregorian and Julian calendars.

## Calendar.DECEMBER

```java
public static final int DECEMBER
```

Value of the `MONTH` field indicating the
twelfth month of the year in the Gregorian and Julian calendars.

## Calendar.UNDECIMBER

```java
public static final int UNDECIMBER
```

Value of the `MONTH` field indicating the
thirteenth month of the year. Although `GregorianCalendar`
does not use this value, lunar calendars do.

## Calendar.AM

```java
public static final int AM
```

Value of the `AM_PM` field indicating the
period of the day from midnight to just before noon.

## Calendar.PM

```java
public static final int PM
```

Value of the `AM_PM` field indicating the
period of the day from noon to just before midnight.

## Calendar.ALL_STYLES

```java
public static final int ALL_STYLES
```

A style specifier for int, Locale) getDisplayNames indicating names in all styles, such as
"January" and "Jan".

**See also:** #SHORT_FORMAT

**See also:** #LONG_FORMAT

**See also:** #SHORT_STANDALONE

**See also:** #LONG_STANDALONE

**See also:** #SHORT

**See also:** #LONG

**Since:** 1.6

## Calendar.SHORT

```java
public static final int SHORT
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames equivalent to `SHORT_FORMAT`.

**See also:** #SHORT_STANDALONE

**See also:** #LONG

**Since:** 1.6

## Calendar.LONG

```java
public static final int LONG
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames equivalent to `LONG_FORMAT`.

**See also:** #LONG_STANDALONE

**See also:** #SHORT

**Since:** 1.6

## Calendar.NARROW_FORMAT

```java
public static final int NARROW_FORMAT
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames indicating a narrow name used for format. Narrow names
are typically single character strings, such as "M" for Monday.

**See also:** #NARROW_STANDALONE

**See also:** #SHORT_FORMAT

**See also:** #LONG_FORMAT

**Since:** 1.8

## Calendar.NARROW_STANDALONE

```java
public static final int NARROW_STANDALONE
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames indicating a narrow name independently. Narrow names
are typically single character strings, such as "M" for Monday.

**See also:** #NARROW_FORMAT

**See also:** #SHORT_STANDALONE

**See also:** #LONG_STANDALONE

**Since:** 1.8

## Calendar.SHORT_FORMAT

```java
public static final int SHORT_FORMAT
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames indicating a short name used for format.

**See also:** #SHORT_STANDALONE

**See also:** #LONG_FORMAT

**See also:** #LONG_STANDALONE

**Since:** 1.8

## Calendar.LONG_FORMAT

```java
public static final int LONG_FORMAT
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames indicating a long name used for format.

**See also:** #LONG_STANDALONE

**See also:** #SHORT_FORMAT

**See also:** #SHORT_STANDALONE

**Since:** 1.8

## Calendar.SHORT_STANDALONE

```java
public static final int SHORT_STANDALONE
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames indicating a short name used independently,
such as a month abbreviation as calendar headers.

**See also:** #SHORT_FORMAT

**See also:** #LONG_FORMAT

**See also:** #LONG_STANDALONE

**Since:** 1.8

## Calendar.LONG_STANDALONE

```java
public static final int LONG_STANDALONE
```

A style specifier for int, Locale) getDisplayName and int, Locale) getDisplayNames indicating a long name used independently,
such as a month name as calendar headers.

**See also:** #LONG_FORMAT

**See also:** #SHORT_FORMAT

**See also:** #SHORT_STANDALONE

**Since:** 1.8

## Calendar.protected int fields[]

```java
protected int fields[]
```

The calendar field values for the currently set time for this calendar.
This is an array of `FIELD_COUNT` integers, with index values
`ERA` through `DST_OFFSET`.

## Calendar.protected boolean isSet[]

```java
protected boolean isSet[]
```

The flags which tell if a specified calendar field for the calendar is set.
A new object has no fields set.  After the first call to a method
which generates the fields, they all remain set after that.
This is an array of `FIELD_COUNT` booleans, with index values
`ERA` through `DST_OFFSET`.

## Calendar.time

```java
protected long time
```

The currently set time for this calendar, expressed in milliseconds after
January 1, 1970, 0:00:00 GMT.

**See also:** #isTimeSet

## Calendar.isTimeSet

```java
protected boolean isTimeSet
```

True if then the value of `time` is valid.
The time is made invalid by a change to an item of `field[]`.

**See also:** #time

## Calendar.areFieldsSet

```java
protected boolean areFieldsSet
```

True if `fields[]` are in sync with the currently set time.
If false, then the next attempt to get the value of a field will
force a recomputation of all fields from the current value of
`time`.

## Calendar.Builder()

```java
public Builder()
```

Constructs a `Calendar.Builder`.

## Calendar.setInstant(long)

```java
public Builder setInstant(long instant)
```

Sets the instant parameter to the given `instant` value that is
a millisecond offset from the
Epoch.

Parameters:

- `instant`: a millisecond offset from the Epoch

**Returns:** this `Calendar.Builder`

**See also:** Calendar#setTime(Date)

**See also:** Calendar#setTimeInMillis(long)

**See also:** Calendar#time

Throws:

- `IllegalStateException`: if any of the field parameters have already been set

## Calendar.setInstant(Date)

```java
public Builder setInstant(Date instant)
```

Sets the instant parameter to the `instant` value given by a
`Date`. This method is equivalent to a call to
setInstant(instant.getTime()).

Parameters:

- `instant`: a `Date` representing a millisecond offset from the Epoch

**Returns:** this `Calendar.Builder`

**See also:** Calendar#setTime(Date)

**See also:** Calendar#setTimeInMillis(long)

**See also:** Calendar#time

Throws:

- `NullPointerException`: if `instant` is `null`
- `IllegalStateException`: if any of the field parameters have already been set

## Calendar.set(int, int)

```java
public Builder set(int field, int value)
```

Sets the `field` parameter to the given `value`.
`field` is an index to the `Calendar.fields`, such as
DAY_OF_MONTH. Field value validation is
not performed in this method. Any out of range values are either
normalized in lenient mode or detected as an invalid value in
non-lenient mode when building a `Calendar`.

Parameters:

- `field`: an index to the `Calendar` fields
- `value`: the field value

**Returns:** this `Calendar.Builder`

**See also:** Calendar#set(int, int)

Throws:

- `IllegalArgumentException`: if `field` is invalid
- `IllegalStateException`: if the instant value has already been set, or if fields have been set too many (approximately `Integer.MAX_VALUE`) times.

## Calendar.setFields(int...)

```java
public Builder setFields(int... fieldValuePairs)
```

Sets field parameters to their values given by
`fieldValuePairs` that are pairs of a field and its value.
For example,

```java
  setFields(Calendar.YEAR, 2013,
            Calendar.MONTH, Calendar.DECEMBER,
            Calendar.DAY_OF_MONTH, 23);
```

is equivalent to the sequence of the following
int) set calls:

```java
  set(Calendar.YEAR, 2013)
  .set(Calendar.MONTH, Calendar.DECEMBER)
  .set(Calendar.DAY_OF_MONTH, 23);
```

Parameters:

- `fieldValuePairs`: field-value pairs

**Returns:** this `Calendar.Builder`

Throws:

- `NullPointerException`: if `fieldValuePairs` is `null`
- `IllegalArgumentException`: if any of fields are invalid, or if `fieldValuePairs.length` is an odd number.
- `IllegalStateException`: if the instant value has been set, or if fields have been set too many (approximately `Integer.MAX_VALUE`) times.

## Calendar.setDate(int, int, int)

```java
public Builder setDate(int year, int month, int dayOfMonth)
```

Sets the date field parameters to the values given by `year`,
`month`, and `dayOfMonth`. This method is equivalent to
a call to:

```java
  setFields(Calendar.YEAR, year,
            Calendar.MONTH, month,
            Calendar.DAY_OF_MONTH, dayOfMonth);
```

Parameters:

- `year`: the YEAR value
- `month`: the MONTH value (the month numbering is *0-based*).
- `dayOfMonth`: the DAY_OF_MONTH value

**Returns:** this `Calendar.Builder`

## Calendar.setTimeOfDay(int, int, int)

```java
public Builder setTimeOfDay(int hourOfDay, int minute, int second)
```

Sets the time of day field parameters to the values given by
`hourOfDay`, `minute`, and `second`. This method is
equivalent to a call to:

```java
  setTimeOfDay(hourOfDay, minute, second, 0);
```

Parameters:

- `hourOfDay`: the HOUR_OF_DAY value (24-hour clock)
- `minute`: the MINUTE value
- `second`: the SECOND value

**Returns:** this `Calendar.Builder`
