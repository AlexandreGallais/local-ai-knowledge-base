---
title: "IsoEra enum (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/IsoEra.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IsoEra enum (java.time.chrono)

```java
public enum IsoEra implements Era
```

An era in the ISO calendar system.

The ISO-8601 standard does not define eras.
A definition has therefore been created with two eras - 'Current era' (CE) for
years on or after 0001-01-01 (ISO), and 'Before current era' (BCE) for years before that.

ISO years and eras

year-of-era
era
proleptic-year

2CE2

1CE1

1BCE0

2BCE-1

**Do not use `ordinal()` to obtain the numeric representation of `IsoEra`.
Use `getValue()` instead.**

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## IsoEra.of(int)

```java
public static IsoEra of(int isoEra)
```

Obtains an instance of `IsoEra` from an `int` value.

`IsoEra` is an enum representing the ISO eras of BCE/CE.
This factory allows the enum to be obtained from the `int` value.

Parameters:

- `isoEra`: the BCE/CE value to represent, from 0 (BCE) to 1 (CE)

**Returns:** the era singleton, not null

Throws:

- `DateTimeException`: if the value is invalid

## IsoEra.getValue()

```java
public int getValue()
```

Gets the numeric era `int` value.

The era BCE has the value 0, while the era CE has the value 1.

**Returns:** the era value, from 0 (BCE) to 1 (CE)
