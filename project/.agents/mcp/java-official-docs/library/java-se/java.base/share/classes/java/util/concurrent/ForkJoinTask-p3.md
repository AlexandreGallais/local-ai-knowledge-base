---
title: "ForkJoinTask class (java.util.concurrent) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ForkJoinTask.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ForkJoinTask class (java.util.concurrent) (part 3 of 3)

## ForkJoinTask.adaptInterruptible(Runnable)

```java
public static ForkJoinTask<?> adaptInterruptible(Runnable runnable)
```

Returns a new `ForkJoinTask` that performs the `run` method of the given `Runnable` as its action, and
returns null upon `join`, translating any checked
exceptions encountered into `RuntimeException`.
Additionally, invocations of `cancel` with `mayInterruptIfRunning true` will attempt to interrupt the
thread performing the task.

Parameters:

- `runnable`: the runnable action

**Returns:** the task

**Since:** 22
