---
title: "HijrahEra enum (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/HijrahEra.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HijrahEra enum (java.time.chrono)

```java
public enum HijrahEra implements Era
```

An era in the Hijrah calendar system.

The Hijrah calendar system has only one era covering the
proleptic years greater than zero.

**Do not use `ordinal()` to obtain the numeric representation of `HijrahEra`.
Use `getValue()` instead.**

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## HijrahEra.of(int)

```java
public static HijrahEra of(int hijrahEra)
```

Obtains an instance of `HijrahEra` from an `int` value.

The current era, which is the only accepted value, has the value 1

Parameters:

- `hijrahEra`: the era to represent, only 1 supported

**Returns:** the HijrahEra.AH singleton, not null

Throws:

- `DateTimeException`: if the value is invalid

## HijrahEra.getValue()

```java
public int getValue()
```

Gets the numeric era `int` value.

The era AH has the value 1.

**Returns:** the era value, 1 (AH)

## HijrahEra.range(TemporalField)

```java
public ValueRange range(TemporalField field)
```

Gets the range of valid values for the specified field.

The range object expresses the minimum and maximum valid values for a field.
This era is used to enhance the accuracy of the returned range.
If it is not possible to return the range, because the field is not supported
or for some other reason, an exception is thrown.

If the field is a `ChronoField` then the query is implemented here.
The `ERA` field returns the range.
All other `ChronoField` instances will throw an `UnsupportedTemporalTypeException`.

If the field is not a `ChronoField`, then the result of this method
is obtained by invoking `TemporalField.rangeRefinedBy(TemporalAccessor)`
passing `this` as the argument.
Whether the range can be obtained is determined by the field.

The `ERA` field returns a range for the one valid Hijrah era.

Parameters:

- `field`: the field to query the range for, not null

**Returns:** the range of valid values for the field, not null

Throws:

- `DateTimeException`: if the range for the field cannot be obtained
- `UnsupportedTemporalTypeException`: if the unit is not supported

## HijrahEra.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

(inherited documentation)

Parameters:

- `style`: (inherited documentation)
- `locale`: (inherited documentation)
