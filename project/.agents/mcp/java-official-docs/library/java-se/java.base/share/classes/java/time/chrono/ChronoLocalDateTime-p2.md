---
title: "ChronoLocalDateTime interface (java.time.chrono) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ChronoLocalDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoLocalDateTime interface (java.time.chrono) (part 2 of 2)

## ChronoLocalDateTime.isBefore(ChronoLocalDateTime<?>)

```java
default boolean isBefore(ChronoLocalDateTime<?> other)
```

Checks if this date-time is before the specified date-time ignoring the chronology.

This method differs from the comparison in `compareTo` in that it
only compares the underlying date-time and not the chronology.
This allows dates in different calendar systems to be compared based
on the time-line position.

This default implementation performs the comparison based on the epoch-day
and nano-of-day.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this is before the specified date-time

## ChronoLocalDateTime.isEqual(ChronoLocalDateTime<?>)

```java
default boolean isEqual(ChronoLocalDateTime<?> other)
```

Checks if this date-time is equal to the specified date-time ignoring the chronology.

This method differs from the comparison in `compareTo` in that it
only compares the underlying date and time and not the chronology.
This allows date-times in different calendar systems to be compared based
on the time-line position.

This default implementation performs the comparison based on the epoch-day
and nano-of-day.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if the underlying date-time is equal to the specified date-time on the timeline

## ChronoLocalDateTime.equals(Object)

```java
boolean equals(Object obj)
```

Checks if this date-time is equal to another date-time, including the chronology.

Compares this date-time with another ensuring that the date-time and chronology are the same.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date

## ChronoLocalDateTime.hashCode()

```java
int hashCode()
```

A hash code for this date-time.

**Returns:** a suitable hash code

## ChronoLocalDateTime.toString()

```java
String toString()
```

Outputs this date-time as a `String`.

The output will include the full local date-time.

**Returns:** a string representation of this date-time, not null
