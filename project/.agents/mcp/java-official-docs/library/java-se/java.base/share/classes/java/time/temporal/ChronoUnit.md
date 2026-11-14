---
title: "ChronoUnit enum (java.time.temporal)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/temporal/ChronoUnit.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ChronoUnit enum (java.time.temporal)

```java
public enum ChronoUnit implements TemporalUnit
```

A standard set of date periods units.

This set of units provide unit-based access to manipulate a date, time or date-time.
The standard set of units can be extended by implementing `TemporalUnit`.

These units are intended to be applicable in multiple calendar systems.
For example, most non-ISO calendar systems define units of years, months and days,
just with slightly different rules.
The documentation of each unit explains how it operates.

**Implementation requirements:** This is a final, immutable and thread-safe enum.

**Since:** 1.8

## ChronoUnit.getDuration()

```java
public Duration getDuration()
```

Gets the estimated duration of this unit in the ISO calendar system.

All of the units in this class have an estimated duration.
Days vary due to daylight saving time, while months have different lengths.

**Returns:** the estimated duration of this unit, not null

## ChronoUnit.isDurationEstimated()

```java
public boolean isDurationEstimated()
```

Checks if the duration of the unit is an estimate.

All time units in this class are considered to be accurate, while all date
units in this class are considered to be estimated.

This definition ignores leap seconds, but considers that Days vary due to
daylight saving time and months have different lengths.

**Returns:** true if the duration is estimated, false if accurate

## ChronoUnit.isDateBased()

```java
public boolean isDateBased()
```

Checks if this unit is a date unit.

All units from days to eras inclusive are date-based.
Time-based units and `FOREVER` return false.

**Returns:** true if a date unit, false if a time unit

## ChronoUnit.isTimeBased()

```java
public boolean isTimeBased()
```

Checks if this unit is a time unit.

All units from nanos to half-days inclusive are time-based.
Date-based units and `FOREVER` return false.

**Returns:** true if a time unit, false if a date unit
