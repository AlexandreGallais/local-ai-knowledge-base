---
title: "CancellationException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CancellationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CancellationException class (java.util.concurrent)

```java
public class CancellationException extends IllegalStateException
```

Exception indicating that the result of a value-producing task,
such as a `FutureTask`, cannot be retrieved because the task
was cancelled.

**Since:** 1.5

## CancellationException.CancellationException()

```java
public CancellationException()
```

Constructs a `CancellationException` with no detail message.

## CancellationException.CancellationException(String)

```java
public CancellationException(String message)
```

Constructs a `CancellationException` with the specified detail
message.

Parameters:

- `message`: the detail message
