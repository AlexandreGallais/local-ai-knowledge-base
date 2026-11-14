---
title: "YearMonth class (java.time) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/YearMonth.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# YearMonth class (java.time) (part 3 of 3)

## YearMonth.atDay(int)

```java
public LocalDate atDay(int dayOfMonth)
```

Combines this year-month with a day-of-month to create a `LocalDate`.

This returns a `LocalDate` formed from this year-month and the specified day-of-month.

The day-of-month value must be valid for the year-month.

This method can be used as part of a chain to produce a date:

```java
 LocalDate date = year.atMonth(month).atDay(day);
```

Parameters:

- `dayOfMonth`: the day-of-month to use, from 1 to 31

**Returns:** the date formed from this year-month and the specified day, not null

**See also:** #isValidDay(int)

Throws:

- `DateTimeException`: if the day is invalid for the year-month

## YearMonth.atEndOfMonth()

```java
public LocalDate atEndOfMonth()
```

Returns a `LocalDate` at the end of the month.

This returns a `LocalDate` based on this year-month.
The day-of-month is set to the last valid day of the month, taking
into account leap years.

This method can be used as part of a chain to produce a date:

```java
 LocalDate date = year.atMonth(month).atEndOfMonth();
```

**Returns:** the last valid date of this year-month, not null

## YearMonth.compareTo(YearMonth)

```java
public int compareTo(YearMonth other)
```

Compares this year-month to another year-month.

The comparison is based first on the value of the year, then on the value of the month.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `other`: the other year-month to compare to, not null

**Returns:** the comparator value, that is less than zero if this is before `other`,
         zero if they are equal, greater than zero if this is after `other`

**See also:** #isBefore

**See also:** #isAfter

## YearMonth.isAfter(YearMonth)

```java
public boolean isAfter(YearMonth other)
```

Checks if this year-month is after the specified year-month.

Parameters:

- `other`: the other year-month to compare to, not null

**Returns:** true if this is after the specified year-month

## YearMonth.isBefore(YearMonth)

```java
public boolean isBefore(YearMonth other)
```

Checks if this year-month is before the specified year-month.

Parameters:

- `other`: the other year-month to compare to, not null

**Returns:** true if this point is before the specified year-month

## YearMonth.equals(Object)

```java
public boolean equals(Object obj)
```

Checks if this year-month is equal to another year-month.

The comparison is based on the time-line position of the year-months.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other year-month

## YearMonth.hashCode()

```java
public int hashCode()
```

A hash code for this year-month.

**Returns:** a suitable hash code

## YearMonth.toString()

```java
public String toString()
```

Outputs this year-month as a `String`, such as `2007-12`.

The output will be in the format `uuuu-MM`:

**Returns:** a string representation of this year-month, not null
