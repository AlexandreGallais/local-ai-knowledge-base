---
title: "IsoChronology class (java.time.chrono) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/chrono/IsoChronology.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IsoChronology class (java.time.chrono) (part 2 of 2)

## IsoChronology.period(int, int, int)

```java
public Period period(int years, int months, int days)
```

Obtains a period for this chronology based on years, months and days.

This returns a period tied to the ISO chronology using the specified
years, months and days. See `Period` for further details.

Parameters:

- `years`: the number of years, may be negative
- `months`: the number of years, may be negative
- `days`: the number of years, may be negative

**Returns:** the ISO period, not null

## IsoChronology.isIsoBased()

```java
public boolean isIsoBased()
```

`IsoChronology` is an ISO based chronology, which supports fields
in `IsoFields`, such as DAY_OF_QUARTER
and QUARTER_OF_YEAR.

**See also:** IsoFields

**Returns:** `true`

**Since:** 19
