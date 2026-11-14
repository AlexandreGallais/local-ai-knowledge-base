---
title: "Date class (java.util) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Date.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Date class (java.util) (part 3 of 3)

## Date.toInstant()

```java
public Instant toInstant()
```

Converts this `Date` object to an `Instant`.

The conversion creates an `Instant` that represents the same
point on the time-line as this `Date`.

**Returns:** an instant representing the same point on the time-line as
 this `Date` object

**Since:** 1.8
