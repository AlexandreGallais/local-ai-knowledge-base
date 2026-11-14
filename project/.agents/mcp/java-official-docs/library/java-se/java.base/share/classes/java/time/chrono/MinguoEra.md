---
title: "MinguoEra enum (java.time.chrono)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/MinguoEra.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MinguoEra enum (java.time.chrono)

```java
public enum MinguoEra implements Era
```

An era in the Minguo calendar system.

The Minguo calendar system has two eras.
The current era, for years from 1 onwards, is known as the 'Republic of China' era.
All previous years, zero or earlier in the proleptic count or one and greater
in the year-of-era count, are part of the 'Before Republic of China' era.

Minguo years and eras

year-of-era
era
proleptic-year
ISO proleptic-year

2ROC21913

1ROC11912

1BEFORE_ROC01911

2BEFORE_ROC-11910

**Do not use `ordinal()` to obtain the numeric representation of `MinguoEra`.
Use `getValue()` instead.**

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8

## MinguoEra.of(int)

```java
public static MinguoEra of(int minguoEra)
```

Obtains an instance of `MinguoEra` from an `int` value.

`MinguoEra` is an enum representing the Minguo eras of BEFORE_ROC/ROC.
This factory allows the enum to be obtained from the `int` value.

Parameters:

- `minguoEra`: the BEFORE_ROC/ROC value to represent, from 0 (BEFORE_ROC) to 1 (ROC)

**Returns:** the era singleton, not null

Throws:

- `DateTimeException`: if the value is invalid

## MinguoEra.getValue()

```java
public int getValue()
```

Gets the numeric era `int` value.

The era BEFORE_ROC has the value 0, while the era ROC has the value 1.

**Returns:** the era value, from 0 (BEFORE_ROC) to 1 (ROC)

## MinguoEra.getDisplayName(TextStyle, Locale)

```java
public String getDisplayName(TextStyle style, Locale locale)
```

(inherited documentation)

Parameters:

- `style`: (inherited documentation)
- `locale`: (inherited documentation)
