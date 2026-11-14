---
title: "WeekFields class (java.time.temporal) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/temporal/WeekFields.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# WeekFields class (java.time.temporal) (part 2 of 2)

## WeekFields.weekBasedYear()

```java
public TemporalField weekBasedYear()
```

Returns a field to access the year of a week-based-year based on this `WeekFields`.

This represents the concept of the year where weeks start on a fixed day-of-week,
such as Monday and each week belongs to exactly one year.
This field is typically used with `WeekFields.dayOfWeek()` and
`WeekFields.weekOfWeekBasedYear()`.

Week one(1) is the week starting on the `WeekFields.getFirstDayOfWeek`
where there are at least `WeekFields.getMinimalDaysInFirstWeek()` days in the year.
Thus, week one may start before the start of the year.
If the first week starts after the start of the year then the period before
is in the last week of the previous year.

This field can be used with any calendar system.

In the resolving phase of parsing, a date can be created from a week-based-year,
week-of-year and day-of-week.

In strict mode, all three fields are
validated against their range of valid values. The week-of-year field
is validated to ensure that the resulting week-based-year is the
week-based-year requested.

In smart mode, all three fields are
validated against their range of valid values. The week-of-week-based-year field
is validated from 1 to 53, meaning that the resulting date can be in the
following week-based-year to that specified.

In lenient mode, the year and day-of-week
are validated against the range of valid values. The resulting date is calculated
equivalent to the following three stage approach.
First, create a date on the first day of the first week in the requested week-based-year.
Then take the week-of-week-based-year, subtract one, and add the amount in weeks to the date.
Finally, adjust to the correct day-of-week within the localized week.

**Returns:** a field providing access to the week-based-year, not null

## WeekFields.equals(Object)

```java
public boolean equals(Object object)
```

Checks if this `WeekFields` is equal to the specified object.

The comparison is based on the entire state of the rules, which is
the first day-of-week and minimal days.

Parameters:

- `object`: the other rules to compare to, null returns false

**Returns:** true if this is equal to the specified rules

## WeekFields.hashCode()

```java
public int hashCode()
```

A hash code for this `WeekFields`.

**Returns:** a suitable hash code

## WeekFields.toString()

```java
public String toString()
```

A string representation of this `WeekFields` instance.

**Returns:** the string representation, not null
