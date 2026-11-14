---
title: "SimpleTimeZone class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/SimpleTimeZone.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SimpleTimeZone class (java.util) (part 2 of 2)

## SimpleTimeZone.setEndRule(int, int, int, int)

```java
public void setEndRule(int endMonth, int endDay, int endDayOfWeek, int endTime)
```

Sets the daylight saving time end rule. For example, if daylight saving time
ends on the last Sunday in October at 2 am in wall clock time,
you can set the end rule by calling:
`setEndRule(Calendar.OCTOBER, -1, Calendar.SUNDAY, 2*60*60*1000);`

Parameters:

- `endMonth`: The daylight saving time ending month. Month is a MONTH field value (0-based. e.g., 9 for October).
- `endDay`: The day of the month on which the daylight saving time ends. See the class description for the special cases of this parameter.
- `endDayOfWeek`: The daylight saving time ending day-of-week. See the class description for the special cases of this parameter.
- `endTime`: The daylight saving ending time in local wall clock time, (in milliseconds within the day) which is local daylight time in this case.

Throws:

- `IllegalArgumentException`: if the `endMonth`, `endDay`, `endDayOfWeek`, or `endTime` parameters are out of range

## SimpleTimeZone.setEndRule(int, int, int)

```java
public void setEndRule(int endMonth, int endDay, int endTime)
```

Sets the daylight saving time end rule to a fixed date within a month.
This method is equivalent to:

```java
setEndRule(endMonth, endDay, 0, endTime)
```

Parameters:

- `endMonth`: The daylight saving time ending month. Month is a MONTH field value (0-based. e.g., 9 for October).
- `endDay`: The day of the month on which the daylight saving time ends.
- `endTime`: The daylight saving ending time in local wall clock time, (in milliseconds within the day) which is local daylight time in this case.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: the `endMonth`, `endDay`, or `endTime` parameters are out of range

## SimpleTimeZone.setEndRule(int, int, int, int, boolean)

```java
public void setEndRule(int endMonth, int endDay, int endDayOfWeek, int endTime, boolean after)
```

Sets the daylight saving time end rule to a weekday before or after the given date within
a month, e.g., the first Monday on or after the 8th.

Parameters:

- `endMonth`: The daylight saving time ending month. Month is a MONTH field value (0-based. e.g., 9 for October).
- `endDay`: The day of the month on which the daylight saving time ends.
- `endDayOfWeek`: The daylight saving time ending day-of-week.
- `endTime`: The daylight saving ending time in local wall clock time, (in milliseconds within the day) which is local daylight time in this case.
- `after`: If true, this rule selects the first `endDayOfWeek` on or *after* `endDay`. If false, this rule selects the last `endDayOfWeek` on or before `endDay` of the month.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: the `endMonth`, `endDay`, `endDayOfWeek`, or `endTime` parameters are out of range

## SimpleTimeZone.getOffset(long)

```java
public int getOffset(long date)
```

Returns the offset of this time zone from UTC at the given
time. If daylight saving time is in effect at the given time,
the offset value is adjusted with the amount of daylight
saving.

Parameters:

- `date`: the time at which the time zone offset is found

**Returns:** the amount of time in milliseconds to add to UTC to get
local time.

**Since:** 1.4

## SimpleTimeZone.getOffset(int, int, int, int, int, int)

```java
public int getOffset(int era, int year, int month, int day, int dayOfWeek, int millis)
```

Returns the difference in milliseconds between local time and
UTC, taking into account both the raw offset and the effect of
daylight saving, for the specified date and time.  This method
assumes that the start and end month are distinct.  It also
uses a default `GregorianCalendar` object as its
underlying calendar, such as for determining leap years.  Do
not use the result of this method with a calendar other than a
default `GregorianCalendar`.

*Note:  In general, clients should use
`Calendar.get(ZONE_OFFSET) + Calendar.get(DST_OFFSET)`
instead of calling this method.*

Parameters:

- `era`: The era of the given date.
- `year`: The year in the given date.
- `month`: The month in the given date. Month is 0-based. e.g., 0 for January.
- `day`: The day-in-month of the given date.
- `dayOfWeek`: The day-of-week of the given date.
- `millis`: The milliseconds in day in *standard* local time.

**Returns:** The milliseconds to add to UTC to get local time.

Throws:

- `IllegalArgumentException`: the `era`, `month`, `day`, `dayOfWeek`, or `millis` parameters are out of range

## SimpleTimeZone.getRawOffset()

```java
public int getRawOffset()
```

Gets the GMT offset for this time zone.

**Returns:** the GMT offset value in milliseconds

**See also:** #setRawOffset

## SimpleTimeZone.setRawOffset(int)

```java
public void setRawOffset(int offsetMillis)
```

Sets the base time zone offset to GMT.
This is the offset to add to UTC to get local time.

**See also:** #getRawOffset

## SimpleTimeZone.setDSTSavings(int)

```java
public void setDSTSavings(int millisSavedDuringDST)
```

Sets the amount of time in milliseconds that the clock is advanced
during daylight saving time.

Parameters:

- `millisSavedDuringDST`: the number of milliseconds the time is advanced with respect to standard time when the daylight saving time rules are in effect. A positive number, typically one hour (3600000).

**See also:** #getDSTSavings

**Since:** 1.2

## SimpleTimeZone.getDSTSavings()

```java
public int getDSTSavings()
```

Returns the amount of time in milliseconds that the clock is
advanced during daylight saving time.

**Returns:** the number of milliseconds the time is advanced with
respect to standard time when the daylight saving rules are in
effect, or 0 (zero) if this time zone doesn't observe daylight
saving time.

**See also:** #setDSTSavings

**Since:** 1.2

## SimpleTimeZone.useDaylightTime()

```java
public boolean useDaylightTime()
```

Queries if this time zone uses daylight saving time.

**Returns:** true if this time zone uses daylight saving time;
false otherwise.

## SimpleTimeZone.observesDaylightTime()

```java
public boolean observesDaylightTime()
```

Returns `true` if this `SimpleTimeZone` observes
Daylight Saving Time. This method is equivalent to `useDaylightTime()`.

**Returns:** `true` if this `SimpleTimeZone` observes
Daylight Saving Time; `false` otherwise.

**Since:** 1.7

## SimpleTimeZone.inDaylightTime(Date)

```java
public boolean inDaylightTime(Date date)
```

Queries if the given date is in daylight saving time.

**Implementation requirements:** The default implementation throws a
`NullPointerException` if `date` is `null`

**Returns:** true if daylight saving time is in effective at the
given date; false otherwise.

Throws:

- `NullPointerException`: This method may throw a `NullPointerException` if `date` is `null`

## SimpleTimeZone.clone()

```java
public Object clone()
```

Returns a clone of this `SimpleTimeZone` instance.

**Returns:** a clone of this instance.

## SimpleTimeZone.hashCode()

```java
public int hashCode()
```

Generates the hash code for the SimpleDateFormat object.

**Returns:** the hash code for this object

## SimpleTimeZone.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the equality of two `SimpleTimeZone` objects.

Parameters:

- `obj`: The `SimpleTimeZone` object to be compared with.

**Returns:** True if the given `obj` is the same as this
            `SimpleTimeZone` object; false otherwise.

## SimpleTimeZone.hasSameRules(TimeZone)

```java
public boolean hasSameRules(TimeZone other)
```

Returns `true` if this zone has the same rules and offset as another zone.

Parameters:

- `other`: the TimeZone object to be compared with

**Returns:** `true` if the given zone is a SimpleTimeZone and has the
same rules and offset as this one

**Since:** 1.2

## SimpleTimeZone.toString()

```java
public String toString()
```

Returns a string representation of this time zone.

**Returns:** a string representation of this time zone.

## SimpleTimeZone.WALL_TIME

```java
public static final int WALL_TIME
```

Constant for a mode of start or end time specified as wall clock
time.  Wall clock time is standard time for the onset rule, and
daylight time for the end rule.

**Since:** 1.4

## SimpleTimeZone.STANDARD_TIME

```java
public static final int STANDARD_TIME
```

Constant for a mode of start or end time specified as standard time.

**Since:** 1.4

## SimpleTimeZone.UTC_TIME

```java
public static final int UTC_TIME
```

Constant for a mode of start or end time specified as UTC. European
Union rules are specified as UTC time, for example.

**Since:** 1.4
