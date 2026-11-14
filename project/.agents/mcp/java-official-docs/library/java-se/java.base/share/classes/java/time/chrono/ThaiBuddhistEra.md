---
title: "ThaiBuddhistEra enum (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/ThaiBuddhistEra.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThaiBuddhistEra enum (java.time.chrono)

```java
public enum ThaiBuddhistEra implements Era
```

An era in the Thai Buddhist calendar system.

The Thai Buddhist calendar system has two eras.
The current era, for years from 1 onwards, is known as the 'Buddhist' era.
All previous years, zero or earlier in the proleptic count or one and greater
in the year-of-era count, are part of the 'Before Buddhist' era.

Buddhist years and eras

year-of-era
era
proleptic-year
ISO proleptic-year

2BE2-542

1BE1-543

1BEFORE_BE0-544

2BEFORE_BE-1-545

**Do not use `ordinal()` to obtain the numeric representation of `ThaiBuddhistEra`.
Use `getValue()` instead.**

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## ThaiBuddhistEra.of(int)

```java
public static ThaiBuddhistEra of(int thaiBuddhistEra)
```

Obtains an instance of `ThaiBuddhistEra` from an `int` value.

`ThaiBuddhistEra` is an enum representing the Thai Buddhist eras of BEFORE_BE/BE.
This factory allows the enum to be obtained from the `int` value.

Parameters:

- `thaiBuddhistEra`: the era to represent, from 0 to 1

**Returns:** the BuddhistEra singleton, never null

Throws:

- `DateTimeException`: if the era is invalid

## ThaiBuddhistEra.getValue()

```java
public int getValue()
```

Gets the numeric era `int` value.

The era BEFORE_BE has the value 0, while the era BE has the value 1.

**Returns:** the era value, from 0 (BEFORE_BE) to 1 (BE)

## ThaiBuddhistEra.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

(inherited documentation)

Parameters:

- `style`: (inherited documentation)
- `locale`: (inherited documentation)
