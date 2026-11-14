---
title: "ForkJoinPool class (java.util.concurrent) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ForkJoinPool.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ForkJoinPool class (java.util.concurrent) (part 3 of 3)

## ForkJoinPool.isQuiescent()

```java
public boolean isQuiescent()
```

Returns `true` if all worker threads are currently idle.
An idle worker is one that cannot obtain a task to execute
because none are available to steal from other threads, and
there are no pending submissions to the pool. This method is
conservative; it might not return `true` immediately upon
idleness of all threads, but will eventually become true if
threads remain inactive.

**Returns:** `true` if all threads are currently idle

## ForkJoinPool.getStealCount()

```java
public long getStealCount()
```

Returns an estimate of the total number of completed tasks that
were executed by a thread other than their submitter. The
reported value underestimates the actual total number of steals
when the pool is not quiescent. This value may be useful for
monitoring and tuning fork/join programs: in general, steal
counts should be high enough to keep threads busy, but low
enough to avoid overhead and contention across threads.

**Returns:** the number of steals

## ForkJoinPool.getQueuedTaskCount()

```java
public long getQueuedTaskCount()
```

Returns an estimate of the total number of tasks currently held
in queues by worker threads (but not including tasks submitted
to the pool that have not begun executing). This value is only
an approximation, obtained by iterating across all threads in
the pool. This method may be useful for tuning task
granularities.The returned count does not include scheduled
tasks that are not yet ready to execute, which are reported
separately by method `getDelayedTaskCount`.

**Returns:** the number of queued tasks

**See also:** ForkJoinWorkerThread#getQueuedTaskCount()

## ForkJoinPool.getQueuedSubmissionCount()

```java
public int getQueuedSubmissionCount()
```

Returns an estimate of the number of tasks submitted to this
pool that have not yet begun executing.  This method may take
time proportional to the number of submissions.

**Returns:** the number of queued submissions

## ForkJoinPool.getDelayedTaskCount()

```java
public long getDelayedTaskCount()
```

Returns an estimate of the number of delayed (including
periodic) tasks scheduled in this pool that are not yet ready
to submit for execution. The returned value is inaccurate while
delayed tasks are being processed.

**Returns:** an estimate of the number of delayed tasks

**Since:** 25

## ForkJoinPool.hasQueuedSubmissions()

```java
public boolean hasQueuedSubmissions()
```

Returns `true` if there are any tasks submitted to this
pool that have not yet begun executing.

**Returns:** `true` if there are any queued submissions

## ForkJoinPool.pollSubmission()

```java
protected ForkJoinTask<?> pollSubmission()
```

Removes and returns the next unexecuted submission if one is
available.  This method may be useful in extensions to this
class that re-assign work in systems with multiple pools.

**Returns:** the next submission, or `null` if none

## ForkJoinPool.drainTasksTo(Collection<? super ForkJoinTask<?>>)

```java
protected int drainTasksTo(Collection<? super ForkJoinTask<?>> c)
```

Removes all available unexecuted submitted and forked tasks
from scheduling queues and adds them to the given collection,
without altering their execution status. These may include
artificially generated or wrapped tasks. This method is
designed to be invoked only when the pool is known to be
quiescent. Invocations at other times may not remove all
tasks. A failure encountered while attempting to add elements
to collection `c` may result in elements being in
neither, either or both collections when the associated
exception is thrown.  The behavior of this operation is
undefined if the specified collection is modified while the
operation is in progress.

Parameters:

- `c`: the collection to transfer elements into

**Returns:** the number of elements transferred

## ForkJoinPool.toString()

```java
public String toString()
```

Returns a string identifying this pool, as well as its state,
including indications of run state, parallelism level, and
worker and task counts.

**Returns:** a string identifying this pool, as well as its state

## ForkJoinPool.shutdown()

```java
public void shutdown()
```

Possibly initiates an orderly shutdown in which previously
submitted tasks are executed, but no new tasks will be
accepted. Invocation has no effect on execution state if this
is the `commonPool()`, and no additional effect if
already shut down.  Tasks that are in the process of being
submitted concurrently during the course of this method may or
may not be rejected.

## ForkJoinPool.shutdownNow()

```java
public List<Runnable> shutdownNow()
```

Possibly attempts to cancel and/or stop all tasks, and reject
all subsequently submitted tasks.  Invocation has no effect on
execution state if this is the `commonPool()`, and no
additional effect if already shut down. Otherwise, tasks that
are in the process of being submitted or executed concurrently
during the course of this method may or may not be
rejected. This method cancels both existing and unexecuted
tasks, in order to permit termination in the presence of task
dependencies. So the method always returns an empty list
(unlike the case for some other Executors).

**Returns:** an empty list

## ForkJoinPool.isTerminated()

```java
public boolean isTerminated()
```

Returns `true` if all tasks have completed following shut down.

**Returns:** `true` if all tasks have completed following shut down

## ForkJoinPool.isTerminating()

```java
public boolean isTerminating()
```

Returns `true` if the process of termination has
commenced but not yet completed.  This method may be useful for
debugging. A return of `true` reported a sufficient
period after shutdown may indicate that submitted tasks have
ignored or suppressed interruption, or are waiting for I/O,
causing this executor not to properly terminate. (See the
advisory notes for class `ForkJoinTask` stating that
tasks should not normally entail blocking operations.  But if
they do, they must abort them on interrupt.)

**Returns:** `true` if terminating but not yet terminated

## ForkJoinPool.isShutdown()

```java
public boolean isShutdown()
```

Returns `true` if this pool has been shut down.

**Returns:** `true` if this pool has been shut down

## ForkJoinPool.awaitTermination(long, TimeUnit)

```java
public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException
```

Blocks until all tasks have completed execution after a
shutdown request, or the timeout occurs, or the current thread
is interrupted, whichever happens first. Because the `commonPool()` never terminates until program shutdown, when
applied to the common pool, this method is equivalent to TimeUnit) but always returns `false`.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** `true` if this executor terminated and
        `false` if the timeout elapsed before termination

Throws:

- `InterruptedException`: if interrupted while waiting

## ForkJoinPool.awaitQuiescence(long, TimeUnit)

```java
public boolean awaitQuiescence(long timeout, TimeUnit unit)
```

If called by a ForkJoinTask operating in this pool, equivalent
in effect to `ForkJoinTask.helpQuiesce`. Otherwise,
waits and/or attempts to assist performing tasks until this
pool `isQuiescent` or the indicated timeout elapses.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** `true` if quiescent; `false` if the
timeout elapsed.

## ForkJoinPool.close()

```java
public void close()
```

Unless this is the `commonPool()`, initiates an orderly
shutdown in which previously submitted tasks are executed, but
no new tasks will be accepted, and waits until all tasks have
completed execution and the executor has terminated.

 If already terminated, or this is the `commonPool()`, this method has no effect on execution, and
does not wait. Otherwise, if interrupted while waiting, this
method stops all executing tasks as if by invoking `shutdownNow()`. It then continues to wait until all actively
executing tasks have completed. Tasks that were awaiting
execution are not executed. The interrupt status will be
re-asserted before this method returns.

**Since:** 19

## ForkJoinPool.managedBlock(ManagedBlocker)

```java
public static void managedBlock(ManagedBlocker blocker) throws InterruptedException
```

Runs the given possibly blocking task.  When running in a ForkJoinPool, this
method possibly arranges for a spare thread to be activated if
necessary to ensure sufficient parallelism while the current
thread is blocked in blocker.block().

This method repeatedly calls `blocker.isReleasable()` and
`blocker.block()` until either method returns `true`.
Every call to `blocker.block()` is preceded by a call to
`blocker.isReleasable()` that returned `false`.

If not running in a ForkJoinPool, this method is
behaviorally equivalent to

```java
while (!blocker.isReleasable())
  if (blocker.block())
    break;
```

If running in a ForkJoinPool, the pool may first be expanded to
ensure sufficient parallelism available during the call to
`blocker.block()`.

Parameters:

- `blocker`: the blocker task

Throws:

- `InterruptedException`: if `blocker.block()` did so
