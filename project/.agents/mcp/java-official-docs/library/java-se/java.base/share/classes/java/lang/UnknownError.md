---
title: "UnknownError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/UnknownError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnknownError class (java.lang)

```java
public class UnknownError extends VirtualMachineError
```

Thrown when an unknown but serious exception has occurred in the
Java Virtual Machine.

**Since:** 1.0

## UnknownError.UnknownError()

```java
public UnknownError()
```

Constructs an `UnknownError` with no detail message.

## UnknownError.UnknownError(String)

```java
public UnknownError(String s)
```

Constructs an `UnknownError` with the specified detail
message.

Parameters:

- `s`: the detail message.
