---
title: "ChronoZonedDateTime interface (java.time.chrono) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ChronoZonedDateTime.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoZonedDateTime interface (java.time.chrono) (part 2 of 2)

## ChronoZonedDateTime.isBefore(ChronoZonedDateTime<?>)

```java
default boolean isBefore(ChronoZonedDateTime<?> other)
```

Checks if the instant of this date-time is before that of the specified date-time.

This method differs from the comparison in `compareTo` in that it
only compares the instant of the date-time. This is equivalent to using
`dateTime1.toInstant().isBefore(dateTime2.toInstant());`.

This default implementation performs the comparison based on the epoch-second
and nano-of-second.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this point is before the specified date-time

## ChronoZonedDateTime.isAfter(ChronoZonedDateTime<?>)

```java
default boolean isAfter(ChronoZonedDateTime<?> other)
```

Checks if the instant of this date-time is after that of the specified date-time.

This method differs from the comparison in `compareTo` in that it
only compares the instant of the date-time. This is equivalent to using
`dateTime1.toInstant().isAfter(dateTime2.toInstant());`.

This default implementation performs the comparison based on the epoch-second
and nano-of-second.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if this is after the specified date-time

## ChronoZonedDateTime.isEqual(ChronoZonedDateTime<?>)

```java
default boolean isEqual(ChronoZonedDateTime<?> other)
```

Checks if the instant of this date-time is equal to that of the specified date-time.

This method differs from the comparison in `compareTo` and `equals`
in that it only compares the instant of the date-time. This is equivalent to using
`dateTime1.toInstant().equals(dateTime2.toInstant());`.

This default implementation performs the comparison based on the epoch-second
and nano-of-second.

Parameters:

- `other`: the other date-time to compare to, not null

**Returns:** true if the instant equals the instant of the specified date-time

## ChronoZonedDateTime.equals(Object)

```java
boolean equals(Object obj)
```

Checks if this date-time is equal to another date-time.

The comparison is based on the offset date-time and the zone.
To compare for the same instant on the time-line, use `compareTo`.
Only objects of type `ChronoZonedDateTime` are compared, other types return false.

Parameters:

- `obj`: the object to check, null returns false

**Returns:** true if this is equal to the other date-time

## ChronoZonedDateTime.hashCode()

```java
int hashCode()
```

A hash code for this date-time.

**Returns:** a suitable hash code

## ChronoZonedDateTime.toString()

```java
String toString()
```

Outputs this date-time as a `String`.

The output will include the full zoned date-time.

**Returns:** a string representation of this date-time, not null
