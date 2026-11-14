---
title: "MonthDay class (java.time) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/MonthDay.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MonthDay class (java.time) (part 2 of 2)

## MonthDay.adjustInto(Temporal)

```java
public Temporal adjustInto(Temporal temporal)
```

Adjusts the specified temporal object to have this month-day.

This returns a temporal object of the same observable type as the input
with the month and day-of-month changed to be the same as this.

The adjustment is equivalent to using long)
twice, passing `ChronoField.MONTH_OF_YEAR` and
`ChronoField.DAY_OF_MONTH` as the fields.
If the specified temporal object does not use the ISO calendar system then
a `DateTimeException` is thrown.

In most cases, it is clearer to reverse the calling pattern by using
`Temporal.with(TemporalAdjuster)`:

```java
  // these two lines are equivalent, but the second approach is recommended
  temporal = thisMonthDay.adjustInto(temporal);
  temporal = temporal.with(thisMonthDay);
```

This instance is immutable and unaffected by this method call.

Parameters:

- `temporal`: the target object to be adjusted, not null

**Returns:** the adjusted object, not null

Throws:

- `DateTimeException`: if unable to make the adjustment
- `ArithmeticException`: if numeric overflow occurs

## MonthDay.format(DateTimeFormatter)

```java
public String format(DateTimeFormatter formatter)
```

Formats this month-day using the specified formatter.

This month-day will be passed to the formatter to produce a string.

Parameters:

- `formatter`: the formatter to use, not null

**Returns:** the formatted month-day string, not null

Throws:

- `DateTimeException`: if an error occurs during printing

## MonthDay.atYear(int)

```java
public LocalDate atYear(int year)
```

Combines this month-day with a year to create a `LocalDate`.

This returns a `LocalDate` formed from this month-day and the specified year.

A month-day of February 29th will be adjusted to February 28th in the resulting
date if the year is not a leap year.

This instance is immutable and unaffected by this method call.

Parameters:

- `year`: the year to use, from MIN_YEAR to MAX_YEAR

**Returns:** the local date formed from this month-day and the specified year, not null

Throws:

- `DateTimeException`: if the year is outside the valid range of years

## MonthDay.compareTo(MonthDay)

```java
public int compareTo(MonthDay other)
```

Compares this month-day to another month-day.

The comparison is based first on value of the month, then on the value of the day.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `other`: the other month-day to compare to, not null

**Returns:** the comparator value, that is less than zero if this is before `other`,
         zero if they are equal, greater than zero if this is after `other`

**See also:** #isBefore

**See also:** #isAfter

## MonthDay.isAfter(MonthDay)

```java
public boolean isAfter(MonthDay other)
```

Checks if this month-day is after the specified month-day.

Parameters:

- `other`: the other month-day to compare to, not null

**Returns:** true if this is after the specified month-day

## MonthDay.isBefore(MonthDay)

```java
public boolean isBefore(MonthDay other)
```

Checks if this month-day is before the specified month-day.

Parameters:

- `other`: the other month-day to compare to, not null

**Returns:** true if this point is before the specified month-day

## MonthDay.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this month-day is equal to another month-day.

The comparison is based on the time-line position of the month-day within a year.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other month-day

## MonthDay.hashCode()

```java
public int hashCode()
```

A hash code for this month-day.

**Returns:** a suitable hash code

## MonthDay.toString()

```java
public String toString()
```

Outputs this month-day as a `String`, such as `--12-03`.

The output will be in the format `--MM-dd`:

**Returns:** a string representation of this month-day, not null
