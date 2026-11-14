---
title: "SignStyle enum (java.time.format)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/SignStyle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SignStyle enum (java.time.format)

```java
public enum SignStyle
```

Enumeration of ways to handle the positive/negative sign.

The formatting engine allows the positive and negative signs of numbers
to be controlled using this enum.
See `DateTimeFormatterBuilder` for usage.

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8
