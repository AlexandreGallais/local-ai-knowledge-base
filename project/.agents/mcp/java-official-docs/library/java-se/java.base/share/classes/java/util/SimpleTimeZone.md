---
title: "SimpleTimeZone class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/SimpleTimeZone.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SimpleTimeZone class (java.util)

```java
public class SimpleTimeZone extends TimeZone
```

`SimpleTimeZone` is a concrete subclass of `TimeZone`
that represents a time zone for use with a Gregorian calendar.
The class holds an offset from GMT, called *raw offset*, and start
and end rules for a daylight saving time schedule.  Since it only holds
single values for each, it cannot handle historical changes in the offset
from GMT and the daylight saving schedule, except that the setStartYear method can specify the year when the daylight
saving time schedule starts in effect.

To construct a `SimpleTimeZone` with a daylight saving time
schedule, the schedule can be described with a set of rules,
*start-rule* and *end-rule*. A day when daylight saving time
starts or ends is specified by a combination of *month*,
*day-of-month*, and *day-of-week* values. The *month*
value is represented by a Calendar MONTH field
value, such as `Calendar.MARCH`. The *day-of-week* value is
represented by a Calendar DAY_OF_WEEK value,
such as SUNDAY. The meanings of value combinations
are as follows.

- **Exact day of month**

To specify an exact day of month, set the *month* and
*day-of-month* to an exact value, and *day-of-week* to zero. For
example, to specify March 1, set the *month* to MARCH, *day-of-month* to 1, and *day-of-week* to 0.

- **Day of week on or after day of month**

To specify a day of week on or after an exact day of month, set the
*month* to an exact month value, *day-of-month* to the day on
or after which the rule is applied, and *day-of-week* to a negative DAY_OF_WEEK field value. For example, to specify the
second Sunday of April, set *month* to APRIL,
*day-of-month* to 8, and *day-of-week* to `-`SUNDAY.

- **Day of week on or before day of month**

To specify a day of the week on or before an exact day of the month, set
*day-of-month* and *day-of-week* to a negative value. For
example, to specify the last Wednesday on or before the 21st of March, set
*month* to MARCH, *day-of-month* is -21
and *day-of-week* is `-`WEDNESDAY.

- **Last day-of-week of month**

To specify, the last day-of-week of the month, set *day-of-week* to a
DAY_OF_WEEK value and *day-of-month* to
-1. For example, to specify the last Sunday of October, set *month*
to OCTOBER, *day-of-week* to SUNDAY and *day-of-month* to -1.

The time of the day at which daylight saving time starts or ends is
specified by a millisecond value within the day. There are three kinds of
*mode*s to specify the time: `WALL_TIME`, `STANDARD_TIME` and `UTC_TIME`. For example, if daylight
saving time ends
at 2:00 am in the wall clock time, it can be specified by 7200000
milliseconds in the `WALL_TIME` mode. In this case, the wall clock time
for an *end-rule* means the same thing as the daylight time.

The following are examples of parameters for constructing time zone objects.

```java
<code>
     // Base GMT offset: -8:00
     // DST starts:      at 2:00am in standard time
     //                  on the first Sunday in April
     // DST ends:        at 2:00am in daylight time
     //                  on the last Sunday in October
     // Save:            1 hour
     SimpleTimeZone(-28800000,
                    "America/Los_Angeles",
                    Calendar.APRIL, 1, -Calendar.SUNDAY,
                    7200000,
                    Calendar.OCTOBER, -1, Calendar.SUNDAY,
                    7200000,
                    3600000)

     // Base GMT offset: +1:00
     // DST starts:      at 1:00am in UTC time
     //                  on the last Sunday in March
     // DST ends:        at 1:00am in UTC time
     //                  on the last Sunday in October
     // Save:            1 hour
     SimpleTimeZone(3600000,
                    "Europe/Paris",
                    Calendar.MARCH, -1, Calendar.SUNDAY,
                    3600000, SimpleTimeZone.UTC_TIME,
                    Calendar.OCTOBER, -1, Calendar.SUNDAY,
                    3600000, SimpleTimeZone.UTC_TIME,
                    3600000)
</code>
```

These parameter rules are also applicable to the set rule methods, such as
`setStartRule`.

**Since:** 1.1

**See also:** Calendar

**See also:** GregorianCalendar

**See also:** TimeZone

## SimpleTimeZone.SimpleTimeZone(int, String)

```java
public SimpleTimeZone(int rawOffset, String ID)
```

Constructs a SimpleTimeZone with the given base time zone offset from GMT
and time zone ID with no daylight saving time schedule.

Parameters:

- `rawOffset`: The base time zone offset in milliseconds to GMT.
- `ID`: The time zone name that is given to this instance.

## SimpleTimeZone.SimpleTimeZone(int, String, int, int, int, int, int, int, int, int)

```java
public SimpleTimeZone(int rawOffset, String ID, int startMonth, int startDay, int startDayOfWeek, int startTime, int endMonth, int endDay, int endDayOfWeek, int endTime)
```

Constructs a SimpleTimeZone with the given base time zone offset from
GMT, time zone ID, and rules for starting and ending the daylight
time.
Both `startTime` and `endTime` are specified to be
represented in the wall clock time. The amount of daylight saving is
assumed to be 3600000 milliseconds (i.e., one hour). This constructor is
equivalent to:

```java
<code>
    SimpleTimeZone(rawOffset,
                   ID,
                   startMonth,
                   startDay,
                   startDayOfWeek,
                   startTime,
                   SimpleTimeZone.{@link #WALL_TIME},
                   endMonth,
                   endDay,
                   endDayOfWeek,
                   endTime,
                   SimpleTimeZone.{@link #WALL_TIME},
                   3600000)
</code>
```

Parameters:

- `rawOffset`: The given base time zone offset from GMT.
- `ID`: The time zone ID which is given to this object.
- `startMonth`: The daylight saving time starting month. Month is a MONTH field value (0-based. e.g., 0 for January).
- `startDay`: The day of the month on which the daylight saving time starts. See the class description for the special cases of this parameter.
- `startDayOfWeek`: The daylight saving time starting day-of-week. See the class description for the special cases of this parameter.
- `startTime`: The daylight saving time starting time in local wall clock time (in milliseconds within the day), which is local standard time in this case.
- `endMonth`: The daylight saving time ending month. Month is a MONTH field value (0-based. e.g., 9 for October).
- `endDay`: The day of the month on which the daylight saving time ends. See the class description for the special cases of this parameter.
- `endDayOfWeek`: The daylight saving time ending day-of-week. See the class description for the special cases of this parameter.
- `endTime`: The daylight saving ending time in local wall clock time, (in milliseconds within the day) which is local daylight time in this case.

Throws:

- `IllegalArgumentException`: if the month, day, dayOfWeek, or time parameters are out of range for the start or end rule

## SimpleTimeZone.SimpleTimeZone(int, String, int, int, int, int, int, int, int, int, int)

```java
public SimpleTimeZone(int rawOffset, String ID, int startMonth, int startDay, int startDayOfWeek, int startTime, int endMonth, int endDay, int endDayOfWeek, int endTime, int dstSavings)
```

Constructs a SimpleTimeZone with the given base time zone offset from
GMT, time zone ID, and rules for starting and ending the daylight
time.
Both `startTime` and `endTime` are assumed to be
represented in the wall clock time. This constructor is equivalent to:

```java
<code>
    SimpleTimeZone(rawOffset,
                   ID,
                   startMonth,
                   startDay,
                   startDayOfWeek,
                   startTime,
                   SimpleTimeZone.{@link #WALL_TIME},
                   endMonth,
                   endDay,
                   endDayOfWeek,
                   endTime,
                   SimpleTimeZone.{@link #WALL_TIME},
                   dstSavings)
</code>
```

Parameters:

- `rawOffset`: The given base time zone offset from GMT.
- `ID`: The time zone ID which is given to this object.
- `startMonth`: The daylight saving time starting month. Month is a MONTH field value (0-based. e.g., 0 for January).
- `startDay`: The day of the month on which the daylight saving time starts. See the class description for the special cases of this parameter.
- `startDayOfWeek`: The daylight saving time starting day-of-week. See the class description for the special cases of this parameter.
- `startTime`: The daylight saving time starting time in local wall clock time, which is local standard time in this case.
- `endMonth`: The daylight saving time ending month. Month is a MONTH field value (0-based. e.g., 9 for October).
- `endDay`: The day of the month on which the daylight saving time ends. See the class description for the special cases of this parameter.
- `endDayOfWeek`: The daylight saving time ending day-of-week. See the class description for the special cases of this parameter.
- `endTime`: The daylight saving ending time in local wall clock time, which is local daylight time in this case.
- `dstSavings`: The amount of time in milliseconds saved during daylight saving time.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the month, day, dayOfWeek, or time parameters are out of range for the start or end rule

## SimpleTimeZone.SimpleTimeZone(int, String, int, int, int, int, int, int, int, int, int, int, int)

```java
public SimpleTimeZone(int rawOffset, String ID, int startMonth, int startDay, int startDayOfWeek, int startTime, int startTimeMode, int endMonth, int endDay, int endDayOfWeek, int endTime, int endTimeMode, int dstSavings)
```

Constructs a SimpleTimeZone with the given base time zone offset from
GMT, time zone ID, and rules for starting and ending the daylight
time.
This constructor takes the full set of the start and end rules
parameters, including modes of `startTime` and
`endTime`. The mode specifies either wall time or standard time or UTC time.

Parameters:

- `rawOffset`: The given base time zone offset from GMT.
- `ID`: The time zone ID which is given to this object.
- `startMonth`: The daylight saving time starting month. Month is a MONTH field value (0-based. e.g., 0 for January).
- `startDay`: The day of the month on which the daylight saving time starts. See the class description for the special cases of this parameter.
- `startDayOfWeek`: The daylight saving time starting day-of-week. See the class description for the special cases of this parameter.
- `startTime`: The daylight saving time starting time in the time mode specified by `startTimeMode`.
- `startTimeMode`: The mode of the start time specified by startTime.
- `endMonth`: The daylight saving time ending month. Month is a MONTH field value (0-based. e.g., 9 for October).
- `endDay`: The day of the month on which the daylight saving time ends. See the class description for the special cases of this parameter.
- `endDayOfWeek`: The daylight saving time ending day-of-week. See the class description for the special cases of this parameter.
- `endTime`: The daylight saving ending time in time mode specified by `endTimeMode`.
- `endTimeMode`: The mode of the end time specified by endTime
- `dstSavings`: The amount of time in milliseconds saved during daylight saving time.

**See also:** #WALL_TIME

**See also:** #STANDARD_TIME

**See also:** #UTC_TIME

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if the month, day, dayOfWeek, time more, or time parameters are out of range for the start or end rule, or if a time mode value is invalid.

## SimpleTimeZone.setStartYear(int)

```java
public void setStartYear(int year)
```

Sets the daylight saving time starting year.

Parameters:

- `year`: The daylight saving starting year.

## SimpleTimeZone.setStartRule(int, int, int, int)

```java
public void setStartRule(int startMonth, int startDay, int startDayOfWeek, int startTime)
```

Sets the daylight saving time start rule. For example, if daylight saving
time starts on the first Sunday in April at 2 am in local wall clock
time, you can set the start rule by calling:

```java
setStartRule(Calendar.APRIL, 1, Calendar.SUNDAY, 2*60*60*1000);
```

Parameters:

- `startMonth`: The daylight saving time starting month. Month is a MONTH field value (0-based. e.g., 0 for January).
- `startDay`: The day of the month on which the daylight saving time starts. See the class description for the special cases of this parameter.
- `startDayOfWeek`: The daylight saving time starting day-of-week. See the class description for the special cases of this parameter.
- `startTime`: The daylight saving time starting time in local wall clock time, which is local standard time in this case.

Throws:

- `IllegalArgumentException`: if the `startMonth`, `startDay`, `startDayOfWeek`, or `startTime` parameters are out of range

## SimpleTimeZone.setStartRule(int, int, int)

```java
public void setStartRule(int startMonth, int startDay, int startTime)
```

Sets the daylight saving time start rule to a fixed date within a month.
This method is equivalent to:

```java
setStartRule(startMonth, startDay, 0, startTime)
```

Parameters:

- `startMonth`: The daylight saving time starting month. Month is a MONTH field value (0-based. e.g., 0 for January).
- `startDay`: The day of the month on which the daylight saving time starts.
- `startTime`: The daylight saving time starting time in local wall clock time, which is local standard time in this case. See the class description for the special cases of this parameter.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the `startMonth`, `startDayOfMonth`, or `startTime` parameters are out of range

## SimpleTimeZone.setStartRule(int, int, int, int, boolean)

```java
public void setStartRule(int startMonth, int startDay, int startDayOfWeek, int startTime, boolean after)
```

Sets the daylight saving time start rule to a weekday before or after the given date within
a month, e.g., the first Monday on or after the 8th.

Parameters:

- `startMonth`: The daylight saving time starting month. Month is a MONTH field value (0-based. e.g., 0 for January).
- `startDay`: The day of the month on which the daylight saving time starts.
- `startDayOfWeek`: The daylight saving time starting day-of-week.
- `startTime`: The daylight saving time starting time in local wall clock time, which is local standard time in this case.
- `after`: If true, this rule selects the first `dayOfWeek` on or *after* `dayOfMonth`. If false, this rule selects the last `dayOfWeek` on or *before* `dayOfMonth`.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the `startMonth`, `startDay`, `startDayOfWeek`, or `startTime` parameters are out of range
