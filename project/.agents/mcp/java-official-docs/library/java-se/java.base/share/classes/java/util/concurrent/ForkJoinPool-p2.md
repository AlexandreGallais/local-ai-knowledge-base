---
title: "ForkJoinPool class (java.util.concurrent) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ForkJoinPool.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ForkJoinPool class (java.util.concurrent) (part 2 of 3)

## ForkJoinPool.submit(ForkJoinTask<T>)

```java
public <T> ForkJoinTask<T> submit(ForkJoinTask<T> task)
```

Submits a ForkJoinTask for execution.

Parameters:

- `task`: the task to submit
- `<T>`: the type of the task's result

**Implementation requirements:** This method is equivalent to `externalSubmit(ForkJoinTask)`
when called from a thread that is not in this pool.

**Returns:** the task

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.submit(Callable<T>)

```java
public <T> ForkJoinTask<T> submit(Callable<T> task)
```

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.submit(Runnable, T)

```java
public <T> ForkJoinTask<T> submit(Runnable task, T result)
```

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.submit(Runnable)

```java
public ForkJoinTask<?> submit(Runnable task)
```

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.externalSubmit(ForkJoinTask<T>)

```java
public <T> ForkJoinTask<T> externalSubmit(ForkJoinTask<T> task)
```

Submits the given task as if submitted from a non-`ForkJoinTask`
client. The task is added to a scheduling queue for submissions to the
pool even when called from a thread in the pool.

Parameters:

- `task`: the task to submit
- `<T>`: the type of the task's result

**Implementation requirements:** This method is equivalent to `submit(ForkJoinTask)` when called
from a thread that is not in this pool.

**Returns:** the task

**Since:** 20

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.lazySubmit(ForkJoinTask<T>)

```java
public <T> ForkJoinTask<T> lazySubmit(ForkJoinTask<T> task)
```

Submits the given task without guaranteeing that it will
eventually execute in the absence of available active threads.
In some contexts, this method may reduce contention and
overhead by relying on context-specific knowledge that existing
threads (possibly including the calling thread if operating in
this pool) will eventually be available to execute the task.

Parameters:

- `task`: the task
- `<T>`: the type of the task's result

**Returns:** the task

**Since:** 19

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.setParallelism(int)

```java
public int setParallelism(int size)
```

Changes the target parallelism of this pool, controlling the
future creation, use, and termination of worker threads.
Applications include contexts in which the number of available
processors changes over time.

Parameters:

- `size`: the target parallelism level

**Implementation note:** This implementation restricts the maximum number of
running threads to 32767

**Returns:** the previous parallelism level.

**Since:** 19

Throws:

- `IllegalArgumentException`: if size is less than 1 or greater than the maximum supported by this pool.
- `UnsupportedOperationException`: this is the`commonPool()` and parallelism level was set by System property `java.util.concurrent.ForkJoinPool.common.parallelism`.

## ForkJoinPool.invokeAllUninterruptibly(Collection<? extends Callable<T>>)

```java
public <T> List<Future<T>> invokeAllUninterruptibly(Collection<? extends Callable<T>> tasks)
```

Uninterrupible version of `invokeAll`. Executes the given
tasks, returning a list of Futures holding their status and
results when all complete, ignoring interrupts.  `Future.isDone` is `true` for each element of the returned
list.  Note that a *completed* task could have
terminated either normally or by throwing an exception.  The
results of this method are undefined if the given collection is
modified while this operation is in progress.

Parameters:

- `tasks`: the collection of tasks
- `<T>`: the type of the values returned from the tasks

**API note:** This method supports usages that previously relied on an
incompatible override of
`ExecutorService.invokeAll(java.util.Collection)`.

**Returns:** a list of Futures representing the tasks, in the same
        sequential order as produced by the iterator for the
        given task list, each of which has completed

**Since:** 22

Throws:

- `NullPointerException`: if tasks or any of its elements are `null`
- `RejectedExecutionException`: if any task cannot be scheduled for execution

## ForkJoinPool.schedule(Runnable, long, TimeUnit)

```java
public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit)
```

Submits a one-shot task that becomes enabled after the given
delay.  At that point it will execute unless explicitly
cancelled, or fail to execute (eventually reporting
cancellation) when encountering resource exhaustion, or the
pool is `shutdownNow`, or is `shutdown` when
otherwise quiescent and `cancelDelayedTasksOnShutdown`
is in effect.

Parameters:

- `command`: the task to execute
- `delay`: the time from now to delay execution
- `unit`: the time unit of the delay parameter

**Returns:** a ForkJoinTask implementing the ScheduledFuture
        interface, whose `get()` method will return
        `null` upon normal completion.

**Since:** 25

Throws:

- `RejectedExecutionException`: if the pool is shutdown or submission encounters resource exhaustion.
- `NullPointerException`: if command or unit is null

## ForkJoinPool.schedule(Callable<V>, long, TimeUnit)

```java
public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit)
```

Submits a value-returning one-shot task that becomes enabled
after the given delay. At that point it will execute unless
explicitly cancelled, or fail to execute (eventually reporting
cancellation) when encountering resource exhaustion, or the
pool is `shutdownNow`, or is `shutdown` when
otherwise quiescent and `cancelDelayedTasksOnShutdown`
is in effect.

Parameters:

- `callable`: the function to execute
- `delay`: the time from now to delay execution
- `unit`: the time unit of the delay parameter
- `<V>`: the type of the callable's result

**Returns:** a ForkJoinTask implementing the ScheduledFuture
        interface, whose `get()` method will return the
        value from the callable upon normal completion.

**Since:** 25

Throws:

- `RejectedExecutionException`: if the pool is shutdown or submission encounters resource exhaustion.
- `NullPointerException`: if command or unit is null

## ForkJoinPool.scheduleAtFixedRate(Runnable, long, long, TimeUnit)

```java
public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)
```

Submits a periodic action that becomes enabled first after the
given initial delay, and subsequently with the given period;
that is, executions will commence after
`initialDelay`, then `initialDelay + period`, then
`initialDelay + 2 * period`, and so on.

The sequence of task executions continues indefinitely until
one of the following exceptional completions occur:

- The task is explicitly cancelled

- Method `shutdownNow` is called

- Method `shutdown` is called and the pool is
otherwise quiescent, in which case existing executions continue
but subsequent executions do not.

- An execution or the task encounters resource exhaustion.

- An execution of the task throws an exception.  In this case
calling get on the returned future will throw
`ExecutionException`, holding the exception as its cause.

Subsequent executions are suppressed.  Subsequent calls to
isDone() on the returned future will
return `true`.

If any execution of this task takes longer than its period, then
subsequent executions may start late, but will not concurrently
execute.

Parameters:

- `command`: the task to execute
- `initialDelay`: the time to delay first execution
- `period`: the period between successive executions
- `unit`: the time unit of the initialDelay and period parameters

**Returns:** a ForkJoinTask implementing the ScheduledFuture
        interface.  The future's get()
        method will never return normally, and will throw an
        exception upon task cancellation or abnormal
        termination of a task execution.

**Since:** 25

Throws:

- `RejectedExecutionException`: if the pool is shutdown or submission encounters resource exhaustion.
- `NullPointerException`: if command or unit is null
- `IllegalArgumentException`: if period less than or equal to zero

## ForkJoinPool.scheduleWithFixedDelay(Runnable, long, long, TimeUnit)

```java
public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit)
```

Submits a periodic action that becomes enabled first after the
given initial delay, and subsequently with the given delay
between the termination of one execution and the commencement of
the next.

The sequence of task executions continues indefinitely until
one of the following exceptional completions occur:

- The task is explicitly cancelled

- Method `shutdownNow` is called

- Method `shutdown` is called and the pool is
otherwise quiescent, in which case existing executions continue
but subsequent executions do not.

- An execution or the task encounters resource exhaustion.

- An execution of the task throws an exception.  In this case
calling get on the returned future will throw
`ExecutionException`, holding the exception as its cause.

Subsequent executions are suppressed.  Subsequent calls to
isDone() on the returned future will
return `true`.

Parameters:

- `command`: the task to execute
- `initialDelay`: the time to delay first execution
- `delay`: the delay between the termination of one execution and the commencement of the next
- `unit`: the time unit of the initialDelay and delay parameters

**Returns:** a ForkJoinTask implementing the ScheduledFuture
        interface.  The future's get()
        method will never return normally, and will throw an
        exception upon task cancellation or abnormal
        termination of a task execution.

**Since:** 25

Throws:

- `RejectedExecutionException`: if the pool is shutdown or submission encounters resource exhaustion.
- `NullPointerException`: if command or unit is null
- `IllegalArgumentException`: if delay less than or equal to zero

## ForkJoinPool.submitWithTimeout(Callable<V>, long, TimeUnit, Consumer<? super ForkJoinTask<V>>)

```java
public <V> ForkJoinTask<V> submitWithTimeout(Callable<V> callable, long timeout, TimeUnit unit, Consumer<? super ForkJoinTask<V>> timeoutAction)
```

Submits a task executing the given function, cancelling the
task or performing a given timeoutAction if not completed
within the given timeout period. If the optional `timeoutAction` is null, the task is cancelled (via `cancel(true)`.  Otherwise, the action is applied and the task
may be interrupted if running. Actions may include `ForkJoinTask.complete` to set a replacement value or `ForkJoinTask.completeExceptionally` to throw an appropriate
exception. Note that these can succeed only if the task has
not already completed when the timeoutAction executes.

Parameters:

- `callable`: the function to execute
- `<V>`: the type of the callable's result
- `timeout`: the time to wait before cancelling if not completed
- `timeoutAction`: if nonnull, an action to perform on timeout, otherwise the default action is to cancel using `cancel(true)`.
- `unit`: the time unit of the timeout parameter

**Returns:** a Future that can be used to extract result or cancel

**Since:** 25

Throws:

- `RejectedExecutionException`: if the task cannot be scheduled for execution
- `NullPointerException`: if callable or unit is null

## ForkJoinPool.cancelDelayedTasksOnShutdown()

```java
public void cancelDelayedTasksOnShutdown()
```

Arranges that scheduled tasks that are not executing and have
not already been enabled for execution will not be executed and
will be cancelled upon `shutdown` (unless this pool is
the `commonPool()` which never shuts down). This method
may be invoked either before `shutdown` to take effect
upon the next call, or afterwards to cancel such tasks, which
may then allow termination. Note that subsequent executions of
periodic tasks are always disabled upon shutdown, so this
method applies meaningfully only to non-periodic tasks.

**Since:** 25

## ForkJoinPool.getFactory()

```java
public ForkJoinWorkerThreadFactory getFactory()
```

Returns the factory used for constructing new workers.

**Returns:** the factory used for constructing new workers

## ForkJoinPool.getUncaughtExceptionHandler()

```java
public UncaughtExceptionHandler getUncaughtExceptionHandler()
```

Returns the handler for internal worker threads that terminate
due to unrecoverable errors encountered while executing tasks.

**Returns:** the handler, or `null` if none

## ForkJoinPool.getParallelism()

```java
public int getParallelism()
```

Returns the targeted parallelism level of this pool.

**Returns:** the targeted parallelism level of this pool

## ForkJoinPool.getCommonPoolParallelism()

```java
public static int getCommonPoolParallelism()
```

Returns the targeted parallelism level of the common pool.

**Returns:** the targeted parallelism level of the common pool

**Since:** 1.8

## ForkJoinPool.getPoolSize()

```java
public int getPoolSize()
```

Returns the number of worker threads that have started but not
yet terminated.  The result returned by this method may differ
from `getParallelism` when threads are created to
maintain parallelism when others are cooperatively blocked.

**Returns:** the number of worker threads

## ForkJoinPool.getAsyncMode()

```java
public boolean getAsyncMode()
```

Returns `true` if this pool uses local first-in-first-out
scheduling mode for forked tasks that are never joined.

**Returns:** `true` if this pool uses async mode

## ForkJoinPool.getRunningThreadCount()

```java
public int getRunningThreadCount()
```

Returns an estimate of the number of worker threads that are
not blocked waiting to join tasks or for other managed
synchronization. This method may overestimate the
number of running threads.

**Returns:** the number of worker threads

## ForkJoinPool.getActiveThreadCount()

```java
public int getActiveThreadCount()
```

Returns an estimate of the number of threads that are currently
stealing or executing tasks. This method may overestimate the
number of active threads.

**Returns:** the number of active threads
