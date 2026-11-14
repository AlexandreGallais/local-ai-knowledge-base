---
title: "Duration class (java.time) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/Duration.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Duration class (java.time) (part 3 of 3)

## Duration.toMillis()

```java
public long toMillis()
```

Converts this duration to the total length in milliseconds.

If this duration is too large to fit in a `long` milliseconds, then an
exception is thrown.

If this duration has greater than millisecond precision, then the conversion
will drop any excess precision information as though the amount in nanoseconds
was subject to integer division by one million.

**Returns:** the total length of the duration in milliseconds

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.toNanos()

```java
public long toNanos()
```

Converts this duration to the total length in nanoseconds expressed as a `long`.

If this duration is too large to fit in a `long` nanoseconds, then an
exception is thrown.

**Returns:** the total length of the duration in nanoseconds

Throws:

- `ArithmeticException`: if numeric overflow occurs

## Duration.toDaysPart()

```java
public long toDaysPart()
```

Extracts the number of days in the duration.

This returns the total number of days in the duration by dividing the
number of seconds by 86400.
This is based on the standard definition of a day as 24 hours.

This instance is immutable and unaffected by this method call.

**API note:** This method behaves exactly the same way as `toDays()`.

**Returns:** the number of days in the duration, may be negative

**Since:** 9

## Duration.toHoursPart()

```java
public int toHoursPart()
```

Extracts the number of hours part in the duration.

This returns the number of remaining hours when dividing `toHours`
by hours in a day.
This is based on the standard definition of a day as 24 hours.

This instance is immutable and unaffected by this method call.

**Returns:** the number of hours part in the duration, may be negative

**Since:** 9

## Duration.toMinutesPart()

```java
public int toMinutesPart()
```

Extracts the number of minutes part in the duration.

This returns the number of remaining minutes when dividing `toMinutes`
by minutes in an hour.
This is based on the standard definition of an hour as 60 minutes.

This instance is immutable and unaffected by this method call.

**Returns:** the number of minutes parts in the duration, may be negative

**Since:** 9

## Duration.toSecondsPart()

```java
public int toSecondsPart()
```

Extracts the number of seconds part in the duration.

This returns the remaining seconds when dividing `toSeconds`
by seconds in a minute.
This is based on the standard definition of a minute as 60 seconds.

This instance is immutable and unaffected by this method call.

**Returns:** the number of seconds parts in the duration, may be negative

**Since:** 9

## Duration.toMillisPart()

```java
public int toMillisPart()
```

Extracts the number of milliseconds part of the duration.

This returns the milliseconds part by dividing the number of nanoseconds by 1,000,000.
The length of the duration is stored using two fields - seconds and nanoseconds.
The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
the length in seconds.
The total duration is defined by calling `getNano()` and `getSeconds()`.

This instance is immutable and unaffected by this method call.

**Returns:** the number of milliseconds part of the duration.

**Since:** 9

## Duration.toNanosPart()

```java
public int toNanosPart()
```

Get the nanoseconds part within seconds of the duration.

The length of the duration is stored using two fields - seconds and nanoseconds.
The nanoseconds part is a value from 0 to 999,999,999 that is an adjustment to
the length in seconds.
The total duration is defined by calling `getNano()` and `getSeconds()`.

This instance is immutable and unaffected by this method call.

**Returns:** the nanoseconds within the second part of the length of the duration, from 0 to 999,999,999

**Since:** 9

## Duration.truncatedTo(TemporalUnit)

```java
public Duration truncatedTo(TemporalUnit unit)
```

Returns a copy of this `Duration` truncated to the specified unit.

Truncating the duration returns a copy of the original with conceptual fields
smaller than the specified unit set to zero.
For example, truncating with the MINUTES unit will
round down towards zero to the nearest minute, setting the seconds and
nanoseconds to zero.

The unit must have a duration
that divides into the length of a standard day without remainder.
This includes all
time-based units on {@code ChronoUnit}
and DAYS. Other ChronoUnits throw an exception.

This instance is immutable and unaffected by this method call.

Parameters:

- `unit`: the unit to truncate to, not null

**Returns:** a `Duration` based on this duration with the time truncated, not null

**Since:** 9

Throws:

- `DateTimeException`: if the unit is invalid for truncation
- `UnsupportedTemporalTypeException`: if the unit is not supported

## Duration.compareTo(Duration)

```java
public int compareTo(Duration otherDuration)
```

Compares this duration to the specified `Duration`.

The comparison is based on the total length of the durations.
It is "consistent with equals", as defined by `Comparable`.

Parameters:

- `otherDuration`: the other duration to compare to, not null

**Returns:** the comparator value, that is less than zero if this duration is less than `otherDuration`,
         zero if they are equal, greater than zero if this duration is greater than `otherDuration`

## Duration.equals(Object)

```java
public boolean equals(Object other)
```

Checks if this duration is equal to the specified `Duration`.

The comparison is based on the total length of the durations.

Parameters:

- `other`: the other duration, null returns false

**Returns:** true if the other duration is equal to this one

## Duration.hashCode()

```java
public int hashCode()
```

A hash code for this duration.

**Returns:** a suitable hash code

## Duration.toString()

```java
public String toString()
```

A string representation of this duration using ISO-8601 seconds
based representation, such as `PT8H6M12.345S`.

The format of the returned string will be `PTnHnMnS`, where n is
the relevant hours, minutes or seconds part of the duration.
Any fractional seconds are placed after a decimal point in the seconds section.
If a section has a zero value, it is omitted.
The hours, minutes and seconds will all have the same sign.

Examples:

```java
   "20.345 seconds"                 -- "PT20.345S
   "15 minutes" (15 * 60 seconds)   -- "PT15M"
   "10 hours" (10 * 3600 seconds)   -- "PT10H"
   "2 days" (2 * 86400 seconds)     -- "PT48H"
```

Note that multiples of 24 hours are not output as days to avoid confusion
with `Period`.

**Returns:** an ISO-8601 representation of this duration, not null
