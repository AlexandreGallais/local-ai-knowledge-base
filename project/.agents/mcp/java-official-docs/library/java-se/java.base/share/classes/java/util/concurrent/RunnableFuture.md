---
title: "RunnableFuture interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/RunnableFuture.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RunnableFuture interface (java.util.concurrent)

```java
public interface RunnableFuture<V> extends Runnable, Future<V>
```

A `Future` that is `Runnable`. Successful execution of
the `run` method causes completion of the `Future`
and allows access to its results.

Parameters:

- `<V>`: The result type returned by this Future's `get` method

**See also:** FutureTask

**See also:** Executor

**Since:** 1.6

## RunnableFuture.run()

```java
void run()
```

Sets this Future to the result of its computation
unless it has been cancelled.
