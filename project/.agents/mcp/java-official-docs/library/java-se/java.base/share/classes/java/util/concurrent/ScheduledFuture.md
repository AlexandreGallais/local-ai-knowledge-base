---
title: "ScheduledFuture interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ScheduledFuture.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ScheduledFuture interface (java.util.concurrent)

```java
public interface ScheduledFuture<V> extends Delayed, Future<V>
```

A delayed result-bearing action that can be cancelled.
Usually a scheduled future is the result of scheduling
a task with a `ScheduledExecutorService`.

Parameters:

- `<V>`: The result type returned by this Future

**Since:** 1.5
