---
title: "GregorianCalendar class (java.util) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/GregorianCalendar.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GregorianCalendar class (java.util) (part 3 of 3)

## GregorianCalendar.from(ZonedDateTime)

```java
public static GregorianCalendar from(ZonedDateTime zdt)
```

Obtains an instance of `GregorianCalendar` with the default locale
from a `ZonedDateTime` object.

Since `ZonedDateTime` does not support a Julian-Gregorian cutover
date and uses ISO calendar system, the return GregorianCalendar is a pure
Gregorian calendar and uses ISO 8601 standard for week definitions,
which has `MONDAY` as the FirstDayOfWeek and `4` as the value of the
MinimalDaysInFirstWeek.

`ZoneDateTime` can store points on the time-line further in the
future and further in the past than `GregorianCalendar`. In this
scenario, this method will throw an `IllegalArgumentException`
exception.

Parameters:

- `zdt`: the zoned date-time object to convert

**Returns:** the gregorian calendar representing the same point on the
 time-line as the zoned date-time provided

**Since:** 1.8

Throws:

- `NullPointerException`: if `zdt` is null
- `IllegalArgumentException`: if the zoned date-time is too large to represent as a `GregorianCalendar`
