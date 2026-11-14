---
title: "ChronoField enum (java.time.temporal)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/temporal/ChronoField.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoField enum (java.time.temporal)

```java
public enum ChronoField implements TemporalField
```

A standard set of fields.

This set of fields provide field-based access to manipulate a date, time or date-time.
The standard set of fields can be extended by implementing `TemporalField`.

These fields are intended to be applicable in multiple calendar systems.
For example, most non-ISO calendar systems define dates as a year, month and day,
just with slightly different rules.
The documentation of each field explains how it operates.

**Implementation requirements:** This is a final, immutable and thread-safe enum.

**Since:** 1.8

## ChronoField.range()

```java
public ValueRange range()
```

Gets the range of valid values for the field.

All fields can be expressed as a `long` integer.
This method returns an object that describes the valid range for that value.

This method returns the range of the field in the ISO-8601 calendar system.
This range may be incorrect for other calendar systems.
Use `Chronology.range(ChronoField)` to access the correct range
for a different calendar system.

Note that the result only describes the minimum and maximum valid values
and it is important not to read too much into them. For example, there
could be values within the range that are invalid for the field.

**Returns:** the range of valid values for the field, not null

## ChronoField.isDateBased()

```java
public boolean isDateBased()
```

Checks if this field represents a component of a date.

Fields from day-of-week to era are date-based.

**Returns:** true if it is a component of a date

## ChronoField.isTimeBased()

```java
public boolean isTimeBased()
```

Checks if this field represents a component of a time.

Fields from nano-of-second to am-pm-of-day are time-based.

**Returns:** true if it is a component of a time

## ChronoField.checkValidValue(long)

```java
public long checkValidValue(long value)
```

Checks that the specified value is valid for this field.

This validates that the value is within the outer range of valid values
returned by `range()`.

This method checks against the range of the field in the ISO-8601 calendar system.
This range may be incorrect for other calendar systems.
Use `Chronology.range(ChronoField)` to access the correct range
for a different calendar system.

Parameters:

- `value`: the value to check

**Returns:** the value that was passed in

## ChronoField.checkValidIntValue(long)

```java
public int checkValidIntValue(long value)
```

Checks that the specified value is valid and fits in an `int`.

This validates that the value is within the outer range of valid values
returned by `range()`.
It also checks that all valid values are within the bounds of an `int`.

This method checks against the range of the field in the ISO-8601 calendar system.
This range may be incorrect for other calendar systems.
Use `Chronology.range(ChronoField)` to access the correct range
for a different calendar system.

Parameters:

- `value`: the value to check

**Returns:** the value that was passed in
