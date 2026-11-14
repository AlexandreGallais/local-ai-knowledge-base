---
title: "ThreadPoolExecutor class (java.util.concurrent) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ThreadPoolExecutor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadPoolExecutor class (java.util.concurrent) (part 2 of 3)

## ThreadPoolExecutor.ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>, ThreadFactory, RejectedExecutionHandler)

```java
public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory, RejectedExecutionHandler handler)
```

Creates a new `ThreadPoolExecutor` with the given initial
parameters.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `maximumPoolSize`: the maximum number of threads to allow in the pool
- `keepAliveTime`: when the number of threads is greater than the core, this is the maximum time that excess idle threads will wait for new tasks before terminating.
- `unit`: the time unit for the `keepAliveTime` argument
- `workQueue`: the queue to use for holding tasks before they are executed. This queue will hold only the `Runnable` tasks submitted by the `execute` method.
- `threadFactory`: the factory to use when the executor creates a new thread
- `handler`: the handler to use when execution is blocked because the thread bounds and queue capacities are reached

Throws:

- `IllegalArgumentException`: if one of the following holds:

 `corePoolSize < 0`

 `keepAliveTime < 0`

 `maximumPoolSize <= 0`

 `maximumPoolSize < corePoolSize`
- `NullPointerException`: if `workQueue` or `threadFactory` or `handler` is null

## ThreadPoolExecutor.execute(Runnable)

```java
public void execute(Runnable command)
```

Executes the given task sometime in the future.  The task
may execute in a new thread or in an existing pooled thread.

If the task cannot be submitted for execution, either because this
executor has been shutdown or because its capacity has been reached,
the task is handled by the current `RejectedExecutionHandler`.

Parameters:

- `command`: the task to execute

Throws:

- `RejectedExecutionException`: at discretion of `RejectedExecutionHandler`, if the task cannot be accepted for execution
- `NullPointerException`: if `command` is null

## ThreadPoolExecutor.shutdown()

```java
public void shutdown()
```

Initiates an orderly shutdown in which previously submitted
tasks are executed, but no new tasks will be accepted.
Invocation has no additional effect if already shut down.

This method does not wait for previously submitted tasks to
complete execution.  Use awaitTermination
to do that.

## ThreadPoolExecutor.shutdownNow()

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

## ThreadPoolExecutor.isTerminating()

```java
public boolean isTerminating()
```

Returns true if this executor is in the process of terminating
after `shutdown` or `shutdownNow` but has not
completely terminated.  This method may be useful for
debugging. A return of `true` reported a sufficient
period after shutdown may indicate that submitted tasks have
ignored or suppressed interruption, causing this executor not
to properly terminate.

**Returns:** `true` if terminating but not yet terminated

## ThreadPoolExecutor.finalize()

```java
protected void finalize()
```

**Implementation note:** Previous versions of this class had a finalize method
that shut down this executor, but in this version, finalize
does nothing.

**Deprecated:** Finalization has been deprecated for removal.  See
`java.lang.Object.finalize` for background information and details
about migration options.

## ThreadPoolExecutor.setThreadFactory(ThreadFactory)

```java
public void setThreadFactory(ThreadFactory threadFactory)
```

Sets the thread factory used to create new threads.

Parameters:

- `threadFactory`: the new thread factory

**See also:** #getThreadFactory

Throws:

- `NullPointerException`: if threadFactory is null

## ThreadPoolExecutor.getThreadFactory()

```java
public ThreadFactory getThreadFactory()
```

Returns the thread factory used to create new threads.

**Returns:** the current thread factory

**See also:** #setThreadFactory(ThreadFactory)

## ThreadPoolExecutor.setRejectedExecutionHandler(RejectedExecutionHandler)

```java
public void setRejectedExecutionHandler(RejectedExecutionHandler handler)
```

Sets a new handler for unexecutable tasks.

Parameters:

- `handler`: the new handler

**See also:** #getRejectedExecutionHandler

Throws:

- `NullPointerException`: if handler is null

## ThreadPoolExecutor.getRejectedExecutionHandler()

```java
public RejectedExecutionHandler getRejectedExecutionHandler()
```

Returns the current handler for unexecutable tasks.

**Returns:** the current handler

**See also:** #setRejectedExecutionHandler(RejectedExecutionHandler)

## ThreadPoolExecutor.setCorePoolSize(int)

```java
public void setCorePoolSize(int corePoolSize)
```

Sets the core number of threads.  This overrides any value set
in the constructor.  If the new value is smaller than the
current value, excess existing threads will be terminated when
they next become idle.  If larger, new threads will, if needed,
be started to execute any queued tasks.

Parameters:

- `corePoolSize`: the new core size

**See also:** #getCorePoolSize

Throws:

- `IllegalArgumentException`: if `corePoolSize < 0` or `corePoolSize` is greater than the maximum pool size

## ThreadPoolExecutor.getCorePoolSize()

```java
public int getCorePoolSize()
```

Returns the core number of threads.

**Returns:** the core number of threads

**See also:** #setCorePoolSize

## ThreadPoolExecutor.prestartCoreThread()

```java
public boolean prestartCoreThread()
```

Starts a core thread, causing it to idly wait for work. This
overrides the default policy of starting core threads only when
new tasks are executed. This method will return `false`
if all core threads have already been started.

**Returns:** `true` if a thread was started

## ThreadPoolExecutor.prestartAllCoreThreads()

```java
public int prestartAllCoreThreads()
```

Starts all core threads, causing them to idly wait for work. This
overrides the default policy of starting core threads only when
new tasks are executed.

**Returns:** the number of threads started

## ThreadPoolExecutor.allowsCoreThreadTimeOut()

```java
public boolean allowsCoreThreadTimeOut()
```

Returns true if this pool allows core threads to time out and
terminate if no tasks arrive within the keepAlive time, being
replaced if needed when new tasks arrive. When true, the same
keep-alive policy applying to non-core threads applies also to
core threads. When false (the default), core threads are never
terminated due to lack of incoming tasks.

**Returns:** `true` if core threads are allowed to time out,
        else `false`

**Since:** 1.6

## ThreadPoolExecutor.allowCoreThreadTimeOut(boolean)

```java
public void allowCoreThreadTimeOut(boolean value)
```

Sets the policy governing whether core threads may time out and
terminate if no tasks arrive within the keep-alive time, being
replaced if needed when new tasks arrive. When false, core
threads are never terminated due to lack of incoming
tasks. When true, the same keep-alive policy applying to
non-core threads applies also to core threads. To avoid
continual thread replacement, the keep-alive time must be
greater than zero when setting `true`. This method
should in general be called before the pool is actively used.

Parameters:

- `value`: `true` if should time out, else `false`

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if value is `true` and the current keep-alive time is not greater than zero

## ThreadPoolExecutor.setMaximumPoolSize(int)

```java
public void setMaximumPoolSize(int maximumPoolSize)
```

Sets the maximum allowed number of threads. This overrides any
value set in the constructor. If the new value is smaller than
the current value, excess existing threads will be
terminated when they next become idle.

Parameters:

- `maximumPoolSize`: the new maximum

**See also:** #getMaximumPoolSize

Throws:

- `IllegalArgumentException`: if the new maximum is less than or equal to zero, or less than the core pool size

## ThreadPoolExecutor.getMaximumPoolSize()

```java
public int getMaximumPoolSize()
```

Returns the maximum allowed number of threads.

**Returns:** the maximum allowed number of threads

**See also:** #setMaximumPoolSize

## ThreadPoolExecutor.setKeepAliveTime(long, TimeUnit)

```java
public void setKeepAliveTime(long time, TimeUnit unit)
```

Sets the thread keep-alive time, which is the amount of time
that threads may remain idle before being terminated.
Threads that wait this amount of time without processing a
task will be terminated if there are more than the core
number of threads currently in the pool, or if this pool
allows core thread timeout.
This overrides any value set in the constructor.

Parameters:

- `time`: the time to wait. A time value of zero will cause excess threads to terminate immediately after executing tasks.
- `unit`: the time unit of the `time` argument

**See also:** #getKeepAliveTime(TimeUnit)

Throws:

- `IllegalArgumentException`: if `time` less than zero or if `time` is zero and `allowsCoreThreadTimeOut`

## ThreadPoolExecutor.getKeepAliveTime(TimeUnit)

```java
public long getKeepAliveTime(TimeUnit unit)
```

Returns the thread keep-alive time, which is the amount of time
that threads may remain idle before being terminated.
Threads that wait this amount of time without processing a
task will be terminated if there are more than the core
number of threads currently in the pool, or if this pool
allows core thread timeout.

Parameters:

- `unit`: the desired time unit of the result

**Returns:** the time limit

**See also:** #setKeepAliveTime(long, TimeUnit)

## ThreadPoolExecutor.getQueue()

```java
public BlockingQueue<Runnable> getQueue()
```

Returns the task queue used by this executor. Access to the
task queue is intended primarily for debugging and monitoring.
This queue may be in active use.  Retrieving the task queue
does not prevent queued tasks from executing.

**Returns:** the task queue

## ThreadPoolExecutor.remove(Runnable)

```java
public boolean remove(Runnable task)
```

Removes this task from the executor's internal queue if it is
present, thus causing it not to be run if it has not already
started.

This method may be useful as one part of a cancellation
scheme.  It may fail to remove tasks that have been converted
into other forms before being placed on the internal queue.
For example, a task entered using `submit` might be
converted into a form that maintains `Future` status.
However, in such cases, method `purge` may be used to
remove those Futures that have been cancelled.

Parameters:

- `task`: the task to remove

**Returns:** `true` if the task was removed

## ThreadPoolExecutor.purge()

```java
public void purge()
```

Tries to remove from the work queue all `Future`
tasks that have been cancelled. This method can be useful as a
storage reclamation operation, that has no other impact on
functionality. Cancelled tasks are never executed, but may
accumulate in work queues until worker threads can actively
remove them. Invoking this method instead tries to remove them now.
However, this method may fail to remove tasks in
the presence of interference by other threads.

## ThreadPoolExecutor.getPoolSize()

```java
public int getPoolSize()
```

Returns the current number of threads in the pool.

**Returns:** the number of threads

## ThreadPoolExecutor.getActiveCount()

```java
public int getActiveCount()
```

Returns the approximate number of threads that are actively
executing tasks.

**Returns:** the number of threads

## ThreadPoolExecutor.getLargestPoolSize()

```java
public int getLargestPoolSize()
```

Returns the largest number of threads that have ever
simultaneously been in the pool.

**Returns:** the number of threads

## ThreadPoolExecutor.getTaskCount()

```java
public long getTaskCount()
```

Returns the approximate total number of tasks that have ever been
scheduled for execution. Because the states of tasks and
threads may change dynamically during computation, the returned
value is only an approximation.

**Returns:** the number of tasks

## ThreadPoolExecutor.getCompletedTaskCount()

```java
public long getCompletedTaskCount()
```

Returns the approximate total number of tasks that have
completed execution. Because the states of tasks and threads
may change dynamically during computation, the returned value
is only an approximation, but one that does not ever decrease
across successive calls.

**Returns:** the number of tasks

## ThreadPoolExecutor.toString()

```java
public String toString()
```

Returns a string identifying this pool, as well as its state,
including indications of run state and estimated worker and
task counts.

**Returns:** a string identifying this pool, as well as its state

## ThreadPoolExecutor.beforeExecute(Thread, Runnable)

```java
protected void beforeExecute(Thread t, Runnable r)
```

Method invoked prior to executing the given Runnable in the
given thread.  This method is invoked by thread `t` that
will execute task `r`, and may be used to re-initialize
ThreadLocals, or to perform logging.

This implementation does nothing, but may be customized in
subclasses. Note: To properly nest multiple overridings, subclasses
should generally invoke `super.beforeExecute` at the end of
this method.

Parameters:

- `t`: the thread that will run task `r`
- `r`: the task that will be executed
