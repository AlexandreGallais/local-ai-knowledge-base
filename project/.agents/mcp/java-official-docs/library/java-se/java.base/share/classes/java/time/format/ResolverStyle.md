---
title: "ResolverStyle enum (java.time.format)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/ResolverStyle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ResolverStyle enum (java.time.format)

```java
public enum ResolverStyle
```

Enumeration of different ways to resolve dates and times.

Parsing a text string occurs in two phases.
Phase 1 is a basic text parse according to the fields added to the builder.
Phase 2 resolves the parsed field-value pairs into date and/or time objects.
This style is used to control how phase 2, resolving, happens.

**Implementation requirements:** This is an immutable and thread-safe enum.

**Since:** 1.8
