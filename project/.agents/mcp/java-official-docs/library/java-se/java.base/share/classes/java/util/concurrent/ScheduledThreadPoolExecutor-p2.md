---
title: "ScheduledThreadPoolExecutor class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ScheduledThreadPoolExecutor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ScheduledThreadPoolExecutor class (java.util.concurrent) (part 2 of 2)

## ScheduledThreadPoolExecutor.getRemoveOnCancelPolicy()

```java
public boolean getRemoveOnCancelPolicy()
```

Gets the policy on whether cancelled tasks should be immediately
removed from the work queue at time of cancellation.  This value is
by default `false`.

**Returns:** `true` if cancelled tasks are immediately removed
        from the queue

**See also:** #setRemoveOnCancelPolicy

**Since:** 1.7

## ScheduledThreadPoolExecutor.shutdown()

```java
public void shutdown()
```

Initiates an orderly shutdown in which previously submitted
tasks are executed, but no new tasks will be accepted.
Invocation has no additional effect if already shut down.

This method does not wait for previously submitted tasks to
complete execution.  Use awaitTermination
to do that.

If the `ExecuteExistingDelayedTasksAfterShutdownPolicy`
has been set `false`, existing delayed tasks whose delays
have not yet elapsed are cancelled.  And unless the `ContinueExistingPeriodicTasksAfterShutdownPolicy` has been set
`true`, future executions of existing periodic tasks will
be cancelled.

## ScheduledThreadPoolExecutor.shutdownNow()

```java
public List<Runnable> shutdownNow()
```

Attempts to stop all actively executing tasks, halts the
processing of waiting tasks, and returns a list of the tasks
that were awaiting execution. These tasks are drained (removed)
from the task queue upon return from this method.

This method does not wait for actively executing tasks to
terminate.  Use awaitTermination to
do that.

There are no guarantees beyond best-effort attempts to stop
processing actively executing tasks.  This implementation
interrupts tasks via `Thread.interrupt`; any task that
fails to respond to interrupts may never terminate.

**Returns:** list of tasks that never commenced execution.
        Each element of this list is a `ScheduledFuture`.
        For tasks submitted via one of the `schedule`
        methods, the element will be identical to the returned
        `ScheduledFuture`.  For tasks submitted using
        execute, the element will be a
        zero-delay `ScheduledFuture`.

## ScheduledThreadPoolExecutor.getQueue()

```java
public BlockingQueue<Runnable> getQueue()
```

Returns the task queue used by this executor.  Access to the
task queue is intended primarily for debugging and monitoring.
This queue may be in active use.  Retrieving the task queue
does not prevent queued tasks from executing.

Each element of this queue is a `ScheduledFuture`.
For tasks submitted via one of the `schedule` methods, the
element will be identical to the returned `ScheduledFuture`.
For tasks submitted using execute, the element
will be a zero-delay `ScheduledFuture`.

Iteration over this queue is *not* guaranteed to traverse
tasks in the order in which they will execute.

**Returns:** the task queue
