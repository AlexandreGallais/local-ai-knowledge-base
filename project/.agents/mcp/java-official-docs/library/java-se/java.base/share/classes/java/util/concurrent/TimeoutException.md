---
title: "TimeoutException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/TimeoutException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TimeoutException class (java.util.concurrent)

```java
public class TimeoutException extends Exception
```

Exception thrown when a blocking operation times out.  Blocking
operations for which a timeout is specified need a means to
indicate that the timeout has occurred. For many such operations it
is possible to return a value that indicates timeout; when that is
not possible or desirable then `TimeoutException` should be
declared and thrown.

**Since:** 1.5

## TimeoutException.TimeoutException()

```java
public TimeoutException()
```

Constructs a `TimeoutException` with no specified detail
message.

## TimeoutException.TimeoutException(String)

```java
public TimeoutException(String message)
```

Constructs a `TimeoutException` with the specified detail
message.

Parameters:

- `message`: the detail message
