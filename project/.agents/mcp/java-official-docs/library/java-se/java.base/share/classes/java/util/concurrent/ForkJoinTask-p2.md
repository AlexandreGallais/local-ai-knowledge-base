---
title: "ForkJoinTask class (java.util.concurrent) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ForkJoinTask.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ForkJoinTask class (java.util.concurrent) (part 2 of 3)

## ForkJoinTask.completeExceptionally(Throwable)

```java
public void completeExceptionally(Throwable ex)
```

Completes this task abnormally, and if not already aborted or
cancelled, causes it to throw the given exception upon
`join` and related operations. This method may be used
to induce exceptions in asynchronous tasks, or to force
completion of tasks that would not otherwise complete.  Its use
in other situations is discouraged.  This method is
overridable, but overridden versions must invoke `super`
implementation to maintain guarantees.

Parameters:

- `ex`: the exception to throw. If this exception is not a `RuntimeException` or `Error`, the actual exception thrown will be a `RuntimeException` with cause `ex`.

## ForkJoinTask.complete(V)

```java
public void complete(V value)
```

Completes this task, and if not already aborted or cancelled,
returning the given value as the result of subsequent
invocations of `join` and related operations. This method
may be used to provide results for asynchronous tasks, or to
provide alternative handling for tasks that would not otherwise
complete normally. Its use in other situations is
discouraged. This method is overridable, but overridden
versions must invoke `super` implementation to maintain
guarantees.

Parameters:

- `value`: the result value for this task

## ForkJoinTask.quietlyComplete()

```java
public final void quietlyComplete()
```

Completes this task normally without setting a value. The most
recent value established by `setRawResult` (or `null` by default) will be returned as the result of subsequent
invocations of `join` and related operations.

**Since:** 1.8

## ForkJoinTask.get()

```java
public final V get() throws InterruptedException, ExecutionException
```

Waits if necessary for the computation to complete, and then
retrieves its result.

**Returns:** the computed result

Throws:

- `CancellationException`: if the computation was cancelled
- `ExecutionException`: if the computation threw an exception
- `InterruptedException`: if the current thread is not a member of a ForkJoinPool and was interrupted while waiting

## ForkJoinTask.get(long, TimeUnit)

```java
public final V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

Waits if necessary for at most the given time for the computation
to complete, and then retrieves its result, if available.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** the computed result

Throws:

- `CancellationException`: if the computation was cancelled
- `ExecutionException`: if the computation threw an exception
- `InterruptedException`: if the current thread is not a member of a ForkJoinPool and was interrupted while waiting
- `TimeoutException`: if the wait timed out

## ForkJoinTask.quietlyJoin()

```java
public final void quietlyJoin()
```

Joins this task, without returning its result or throwing its
exception. This method may be useful when processing
collections of tasks when some have been cancelled or otherwise
known to have aborted.

## ForkJoinTask.quietlyInvoke()

```java
public final void quietlyInvoke()
```

Commences performing this task and awaits its completion if
necessary, without returning its result or throwing its
exception.

## ForkJoinTask.quietlyJoin(long, TimeUnit)

```java
public final boolean quietlyJoin(long timeout, TimeUnit unit) throws InterruptedException
```

Tries to join this task, returning true if it completed
(possibly exceptionally) before the given timeout elapsed and
the current thread has not been interrupted.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** true if this task completed

**Since:** 19

Throws:

- `InterruptedException`: if the current thread was interrupted while waiting

## ForkJoinTask.quietlyJoinUninterruptibly(long, TimeUnit)

```java
public final boolean quietlyJoinUninterruptibly(long timeout, TimeUnit unit)
```

Tries to join this task, returning true if it completed
(possibly exceptionally) before the given timeout elapsed.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** true if this task completed

**Since:** 19

## ForkJoinTask.helpQuiesce()

```java
public static void helpQuiesce()
```

Possibly executes tasks until the pool hosting the current task
is quiescent.  This
method may be of use in designs in which many tasks are forked,
but none are explicitly joined, instead executing them until
all are processed.

## ForkJoinTask.reinitialize()

```java
public void reinitialize()
```

Resets the internal bookkeeping state of this task, allowing a
subsequent `fork`. This method allows repeated reuse of
this task, but only if reuse occurs when this task has either
never been forked, or has been forked, then completed and all
outstanding joins of this task have also completed. Effects
under any other usage conditions are not guaranteed.
This method may be useful when executing
pre-constructed trees of subtasks in loops.

Upon completion of this method, `isDone()` reports
`false`, and `getException()` reports `null`. However, the value returned by `getRawResult` is
unaffected. To clear this value, you can invoke `setRawResult(null)`.

## ForkJoinTask.getPool()

```java
public static ForkJoinPool getPool()
```

Returns the pool hosting the current thread, or `null`
if the current thread is executing outside of any ForkJoinPool.

This method returns `null` if and only if `inForkJoinPool` returns `false`.

**Returns:** the pool, or `null` if none

## ForkJoinTask.inForkJoinPool()

```java
public static boolean inForkJoinPool()
```

Returns `true` if the current thread is a `ForkJoinWorkerThread` executing as a ForkJoinPool computation.

**Returns:** `true` if the current thread is a `ForkJoinWorkerThread` executing as a ForkJoinPool computation,
or `false` otherwise

## ForkJoinTask.tryUnfork()

```java
public boolean tryUnfork()
```

Tries to unschedule this task for execution. This method will
typically (but is not guaranteed to) succeed if this task is
the most recently forked task by the current thread, and has
not commenced executing in another thread.  This method may be
useful when arranging alternative local processing of tasks
that could have been, but were not, stolen.

**Returns:** `true` if unforked

## ForkJoinTask.getQueuedTaskCount()

```java
public static int getQueuedTaskCount()
```

Returns an estimate of the number of tasks that have been
forked by the current worker thread but not yet executed. This
value may be useful for heuristic decisions about whether to
fork other tasks.

**Returns:** the number of tasks

## ForkJoinTask.getSurplusQueuedTaskCount()

```java
public static int getSurplusQueuedTaskCount()
```

Returns an estimate of how many more locally queued tasks are
held by the current worker thread than there are other worker
threads that might steal them, or zero if this thread is not
operating in a ForkJoinPool. This value may be useful for
heuristic decisions about whether to fork other tasks. In many
usages of ForkJoinTasks, at steady state, each worker should
aim to maintain a small constant surplus (for example, 3) of
tasks, and to process computations locally if this threshold is
exceeded.

**Returns:** the surplus number of tasks, which may be negative

## ForkJoinTask.getRawResult()

```java
public abstract V getRawResult()
```

Returns the result that would be returned by `join`, even
if this task completed abnormally, or `null` if this task
is not known to have been completed.  This method is designed
to aid debugging, as well as to support extensions. Its use in
any other context is discouraged.

**Returns:** the result, or `null` if not completed

## ForkJoinTask.setRawResult(V)

```java
protected abstract void setRawResult(V value)
```

Forces the given value to be returned as a result.  This method
is designed to support extensions, and should not in general be
called otherwise.

Parameters:

- `value`: the value

## ForkJoinTask.exec()

```java
protected abstract boolean exec()
```

Immediately performs the base action of this task and returns
true if, upon return from this method, this task is guaranteed
to have completed. This method may return false otherwise, to
indicate that this task is not necessarily complete (or is not
known to be complete), for example in asynchronous actions that
require explicit invocations of completion methods. This method
may also throw an (unchecked) exception to indicate abnormal
exit. This method is designed to support extensions, and should
not in general be called otherwise.

**Returns:** `true` if this task is known to have completed normally

## ForkJoinTask.peekNextLocalTask()

```java
protected static ForkJoinTask<?> peekNextLocalTask()
```

Returns, but does not unschedule or execute, a task queued by
the current thread but not yet executed, if one is immediately
available. There is no guarantee that this task will actually
be polled or executed next. Conversely, this method may return
null even if a task exists but cannot be accessed without
contention with other threads.  This method is designed
primarily to support extensions, and is unlikely to be useful
otherwise.

**Returns:** the next task, or `null` if none are available

## ForkJoinTask.pollNextLocalTask()

```java
protected static ForkJoinTask<?> pollNextLocalTask()
```

Unschedules and returns, without executing, the next task
queued by the current thread but not yet executed, if the
current thread is operating in a ForkJoinPool.  This method is
designed primarily to support extensions, and is unlikely to be
useful otherwise.

**Returns:** the next task, or `null` if none are available

## ForkJoinTask.pollTask()

```java
protected static ForkJoinTask<?> pollTask()
```

If the current thread is operating in a ForkJoinPool,
unschedules and returns, without executing, the next task
queued by the current thread but not yet executed, if one is
available, or if not available, a task that was forked by some
other thread, if available. Availability may be transient, so a
`null` result does not necessarily imply quiescence of
the pool this task is operating in.  This method is designed
primarily to support extensions, and is unlikely to be useful
otherwise.

**Returns:** a task, or `null` if none are available

## ForkJoinTask.pollSubmission()

```java
protected static ForkJoinTask<?> pollSubmission()
```

If the current thread is operating in a ForkJoinPool,
unschedules and returns, without executing, a task externally
submitted to the pool, if one is available. Availability may be
transient, so a `null` result does not necessarily imply
quiescence of the pool.  This method is designed primarily to
support extensions, and is unlikely to be useful otherwise.

**Returns:** a task, or `null` if none are available

**Since:** 9

## ForkJoinTask.getForkJoinTaskTag()

```java
public final short getForkJoinTaskTag()
```

Returns the tag for this task.

**Returns:** the tag for this task

**Since:** 1.8

## ForkJoinTask.setForkJoinTaskTag(short)

```java
public final short setForkJoinTaskTag(short newValue)
```

Atomically sets the tag value for this task and returns the old value.

Parameters:

- `newValue`: the new tag value

**Returns:** the previous value of the tag

**Since:** 1.8

## ForkJoinTask.compareAndSetForkJoinTaskTag(short, short)

```java
public final boolean compareAndSetForkJoinTaskTag(short expect, short update)
```

Atomically conditionally sets the tag value for this task.
Among other applications, tags can be used as visit markers
in tasks operating on graphs, as in methods that check: `if (task.compareAndSetForkJoinTaskTag((short)0, (short)1))`
before processing, otherwise exiting because the node has
already been visited.

Parameters:

- `expect`: the expected tag value
- `update`: the new tag value

**Returns:** `true` if successful; i.e., the current value was
equal to `expect` and was changed to `update`.

**Since:** 1.8

## ForkJoinTask.adapt(Runnable)

```java
public static ForkJoinTask<?> adapt(Runnable runnable)
```

Returns a new `ForkJoinTask` that performs the `run`
method of the given `Runnable` as its action, and returns
a null result upon `join`.

Parameters:

- `runnable`: the runnable action

**Returns:** the task

## ForkJoinTask.adapt(Runnable, T)

```java
public static <T> ForkJoinTask<T> adapt(Runnable runnable, T result)
```

Returns a new `ForkJoinTask` that performs the `run`
method of the given `Runnable` as its action, and returns
the given result upon `join`.

Parameters:

- `runnable`: the runnable action
- `result`: the result upon completion
- `<T>`: the type of the result

**Returns:** the task

## ForkJoinTask.adapt(Callable<? extends T>)

```java
public static <T> ForkJoinTask<T> adapt(Callable<? extends T> callable)
```

Returns a new `ForkJoinTask` that performs the `call`
method of the given `Callable` as its action, and returns
its result upon `join`, translating any checked exceptions
encountered into `RuntimeException`.

Parameters:

- `callable`: the callable action
- `<T>`: the type of the callable's result

**Returns:** the task

## ForkJoinTask.adaptInterruptible(Callable<? extends T>)

```java
public static <T> ForkJoinTask<T> adaptInterruptible(Callable<? extends T> callable)
```

Returns a new `ForkJoinTask` that performs the `call`
method of the given `Callable` as its action, and returns
its result upon `join`, translating any checked exceptions
encountered into `RuntimeException`.  Additionally,
invocations of `cancel` with `mayInterruptIfRunning true` will attempt to interrupt the thread performing the task.

Parameters:

- `callable`: the callable action
- `<T>`: the type of the callable's result

**Returns:** the task

**Since:** 19

## ForkJoinTask.adaptInterruptible(Runnable, T)

```java
public static <T> ForkJoinTask<T> adaptInterruptible(Runnable runnable, T result)
```

Returns a new `ForkJoinTask` that performs the `run`
method of the given `Runnable` as its action, and returns
the given result upon `join`, translating any checked exceptions
encountered into `RuntimeException`.  Additionally,
invocations of `cancel` with `mayInterruptIfRunning true` will attempt to interrupt the thread performing the task.

Parameters:

- `runnable`: the runnable action
- `result`: the result upon completion
- `<T>`: the type of the result

**Returns:** the task

**Since:** 22
