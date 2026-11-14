---
title: "StructureViolationException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/StructureViolationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StructureViolationException class (java.util.concurrent)

```java
public final class StructureViolationException extends RuntimeException
```

Thrown when a structure violation is detected.

**See also:** StructuredTaskScope#close()

**Since:** 21

## StructureViolationException.StructureViolationException()

```java
public StructureViolationException()
```

Constructs a `StructureViolationException` with no detail message.

## StructureViolationException.StructureViolationException(String)

```java
public StructureViolationException(String message)
```

Constructs a `StructureViolationException` with the specified
detail message.

Parameters:

- `message`: the detail message, can be null
