---
title: "RejectedExecutionHandler interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/RejectedExecutionHandler.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RejectedExecutionHandler interface (java.util.concurrent)

```java
public interface RejectedExecutionHandler
```

A handler for tasks that cannot be executed by a `ThreadPoolExecutor`.

**Since:** 1.5

## RejectedExecutionHandler.rejectedExecution(Runnable, ThreadPoolExecutor)

```java
void rejectedExecution(Runnable r, ThreadPoolExecutor executor)
```

Method that may be invoked by a `ThreadPoolExecutor` when
execute cannot accept a
task.  This may occur when no more threads or queue slots are
available because their bounds would be exceeded, or upon
shutdown of the Executor.

In the absence of other alternatives, the method may throw
an unchecked `RejectedExecutionException`, which will be
propagated to the caller of `execute`.

Parameters:

- `r`: the runnable task requested to be executed
- `executor`: the executor attempting to execute this task

Throws:

- `RejectedExecutionException`: if there is no remedy
