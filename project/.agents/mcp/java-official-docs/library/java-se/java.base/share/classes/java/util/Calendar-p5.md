---
title: "Calendar class (java.util) (part 5 of 5)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Calendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Calendar class (java.util) (part 5 of 5)

## Calendar.getFirstDayOfWeek()

```java
public int getFirstDayOfWeek()
```

Gets what the first day of the week is; e.g., `SUNDAY` in the U.S.,
`MONDAY` in France.

**Returns:** the first day of the week.

**See also:** #setFirstDayOfWeek(int)

**See also:** #getMinimalDaysInFirstWeek()

## Calendar.setMinimalDaysInFirstWeek(int)

```java
public void setMinimalDaysInFirstWeek(int value)
```

Sets what the minimal days required in the first week of the year are;
For example, if the first week is defined as one that contains the first
day of the first month of a year, call this method with value 1. If it
must be a full week, use value 7.

Parameters:

- `value`: the given minimal days required in the first week of the year.

**See also:** #getMinimalDaysInFirstWeek()

## Calendar.getMinimalDaysInFirstWeek()

```java
public int getMinimalDaysInFirstWeek()
```

Gets what the minimal days required in the first week of the year are;
e.g., if the first week is defined as one that contains the first day
of the first month of a year, this method returns 1. If
the minimal days required must be a full week, this method
returns 7.

**Returns:** the minimal days required in the first week of the year.

**See also:** #setMinimalDaysInFirstWeek(int)

## Calendar.isWeekDateSupported()

```java
public boolean isWeekDateSupported()
```

Returns whether this `Calendar` supports week dates.

The default implementation of this method returns `false`.

**Returns:** `true` if this `Calendar` supports week dates;
        `false` otherwise.

**See also:** #getWeekYear()

**See also:** #setWeekDate(int,int,int)

**See also:** #getWeeksInWeekYear()

**Since:** 1.7

## Calendar.getWeekYear()

```java
public int getWeekYear()
```

Returns the week year represented by this `Calendar`. The
week year is in sync with the week cycle. The first day of the first week is the first
day of the week year.

The default implementation of this method throws an
`UnsupportedOperationException`.

**Returns:** the week year of this `Calendar`

**See also:** #isWeekDateSupported()

**See also:** #getFirstDayOfWeek()

**See also:** #getMinimalDaysInFirstWeek()

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: if any week year numbering isn't supported in this `Calendar`.

## Calendar.setWeekDate(int, int, int)

```java
public void setWeekDate(int weekYear, int weekOfYear, int dayOfWeek)
```

Sets the date of this `Calendar` with the given date
specifiers - week year, week of year, and day of week.

Unlike the `set` method, all of the calendar fields
and `time` values are calculated upon return.

If `weekOfYear` is out of the valid week-of-year range
in `weekYear`, the `weekYear` and `weekOfYear` values are adjusted in lenient mode, or an `IllegalArgumentException` is thrown in non-lenient mode.

The default implementation of this method throws an
`UnsupportedOperationException`.

Parameters:

- `weekYear`: the week year
- `weekOfYear`: the week number based on `weekYear`
- `dayOfWeek`: the day of week value: one of the constants for the `DAY_OF_WEEK` field: `SUNDAY`, ..., `SATURDAY`.

**See also:** #isWeekDateSupported()

**See also:** #getFirstDayOfWeek()

**See also:** #getMinimalDaysInFirstWeek()

**Since:** 1.7

Throws:

- `IllegalArgumentException`: if any of the given date specifiers is invalid or any of the calendar fields are inconsistent with the given date specifiers in non-lenient mode
- `UnsupportedOperationException`: if any week year numbering isn't supported in this `Calendar`.

## Calendar.getWeeksInWeekYear()

```java
public int getWeeksInWeekYear()
```

Returns the number of weeks in the week year represented by this
`Calendar`.

The default implementation of this method throws an
`UnsupportedOperationException`.

**Returns:** the number of weeks in the week year.

**See also:** #WEEK_OF_YEAR

**See also:** #isWeekDateSupported()

**See also:** #getWeekYear()

**See also:** #getActualMaximum(int)

**Since:** 1.7

Throws:

- `UnsupportedOperationException`: if any week year numbering isn't supported in this `Calendar`.

## Calendar.getMinimum(int)

```java
public abstract int getMinimum(int field)
```

Returns the minimum value for the given calendar field of this
`Calendar` instance. The minimum value is defined as
the smallest value returned by the get method
for any possible time value.  The minimum value depends on
calendar system specific parameters of the instance.

Parameters:

- `field`: the calendar field.

**Returns:** the minimum value for the given calendar field.

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## Calendar.getMaximum(int)

```java
public abstract int getMaximum(int field)
```

Returns the maximum value for the given calendar field of this
`Calendar` instance. The maximum value is defined as
the largest value returned by the get method
for any possible time value. The maximum value depends on
calendar system specific parameters of the instance.

Parameters:

- `field`: the calendar field.

**Returns:** the maximum value for the given calendar field.

**See also:** #getMinimum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## Calendar.getGreatestMinimum(int)

```java
public abstract int getGreatestMinimum(int field)
```

Returns the highest minimum value for the given calendar field
of this `Calendar` instance. The highest minimum
value is defined as the largest value returned by `getActualMinimum(int)` for any possible time value. The
greatest minimum value depends on calendar system specific
parameters of the instance.

Parameters:

- `field`: the calendar field.

**Returns:** the highest minimum value for the given calendar field.

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## Calendar.getLeastMaximum(int)

```java
public abstract int getLeastMaximum(int field)
```

Returns the lowest maximum value for the given calendar field
of this `Calendar` instance. The lowest maximum
value is defined as the smallest value returned by `getActualMaximum(int)` for any possible time value. The least
maximum value depends on calendar system specific parameters of
the instance. For example, a `Calendar` for the
Gregorian calendar system returns 28 for the
`DAY_OF_MONTH` field, because the 28th is the last
day of the shortest month of this calendar, February in a
common year.

Parameters:

- `field`: the calendar field.

**Returns:** the lowest maximum value for the given calendar field.

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getActualMinimum(int)

**See also:** #getActualMaximum(int)

## Calendar.getActualMinimum(int)

```java
public int getActualMinimum(int field)
```

Returns the minimum value that the specified calendar field
could have, given the time value of this `Calendar`.

The default implementation of this method uses an iterative
algorithm to determine the actual minimum value for the
calendar field. Subclasses should, if possible, override this
with a more efficient implementation - in many cases, they can
simply return `getMinimum()`.

Parameters:

- `field`: the calendar field

**Returns:** the minimum of the given calendar field for the time
value of this `Calendar`

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMaximum(int)

**Since:** 1.2

## Calendar.getActualMaximum(int)

```java
public int getActualMaximum(int field)
```

Returns the maximum value that the specified calendar field
could have, given the time value of this
`Calendar`. For example, the actual maximum value of
the `MONTH` field is 12 in some years, and 13 in
other years in the Hebrew calendar system.

The default implementation of this method uses an iterative
algorithm to determine the actual maximum value for the
calendar field. Subclasses should, if possible, override this
with a more efficient implementation.

Parameters:

- `field`: the calendar field

**Returns:** the maximum of the given calendar field for the time
value of this `Calendar`

**See also:** #getMinimum(int)

**See also:** #getMaximum(int)

**See also:** #getGreatestMinimum(int)

**See also:** #getLeastMaximum(int)

**See also:** #getActualMinimum(int)

**Since:** 1.2

## Calendar.clone()

```java
public Object clone()
```

Creates and returns a copy of this object.

**Returns:** a copy of this object.

## Calendar.toString()

```java
public String toString()
```

Return a string representation of this calendar. This method
is intended to be used only for debugging purposes, and the
format of the returned string may vary between implementations.
The returned string may be empty but may not be `null`.

**Returns:** a string representation of this calendar.

## Calendar.toInstant()

```java
public final Instant toInstant()
```

Converts this object to an `Instant`.

The conversion creates an `Instant` that represents the
same point on the time-line as this `Calendar`.

**Returns:** the instant representing the same point on the time-line

**Since:** 1.8
