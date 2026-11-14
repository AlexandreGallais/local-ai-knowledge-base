---
title: "BrokenBarrierException class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/BrokenBarrierException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BrokenBarrierException class (java.util.concurrent)

```java
public class BrokenBarrierException extends Exception
```

Exception thrown when a thread tries to wait upon a barrier that is
in a broken state, or which enters the broken state while the thread
is waiting.

**See also:** CyclicBarrier

**Since:** 1.5

## BrokenBarrierException.BrokenBarrierException()

```java
public BrokenBarrierException()
```

Constructs a `BrokenBarrierException` with no specified detail
message.

## BrokenBarrierException.BrokenBarrierException(String)

```java
public BrokenBarrierException(String message)
```

Constructs a `BrokenBarrierException` with the specified
detail message.

Parameters:

- `message`: the detail message
