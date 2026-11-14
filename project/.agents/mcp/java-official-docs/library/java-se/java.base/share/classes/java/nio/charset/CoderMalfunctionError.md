---
title: "CoderMalfunctionError class (java.nio.charset)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/charset/CoderMalfunctionError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CoderMalfunctionError class (java.nio.charset)

```java
public class CoderMalfunctionError extends Error
```

Error thrown when the decodeLoop method of
a `CharsetDecoder`, or the encodeLoop method of a `CharsetEncoder`, throws an unexpected
exception.

**Since:** 1.4

## CoderMalfunctionError.CoderMalfunctionError(Exception)

```java
public CoderMalfunctionError(Exception cause)
```

Initializes an instance of this class.

Parameters:

- `cause`: The unexpected exception that was thrown
