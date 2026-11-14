---
title: "ForkJoinPool class (java.util.concurrent) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ForkJoinPool.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ForkJoinPool class (java.util.concurrent)

```java
public class ForkJoinPool extends AbstractExecutorService implements ScheduledExecutorService
```

An `ExecutorService` for running `ForkJoinTask`s.
A `ForkJoinPool` provides the entry point for submissions
from non-`ForkJoinTask` clients, as well as management and
monitoring operations.

A `ForkJoinPool` differs from other kinds of `ExecutorService` mainly by virtue of employing
*work-stealing*: all threads in the pool attempt to find and
execute tasks submitted to the pool and/or created by other active
tasks (eventually blocking waiting for work if none exist). This
enables efficient processing when most tasks spawn other subtasks
(as do most `ForkJoinTask`s), as well as when many small
tasks are submitted to the pool from external clients.  Especially
when setting *asyncMode* to true in constructors, `ForkJoinPool`s may also be appropriate for use with event-style
tasks that are never joined. All worker threads are initialized
with `Thread.isDaemon` set `true`.

A static `commonPool()` is available and appropriate for
most applications. The common pool is used by any ForkJoinTask that
is not explicitly submitted to a specified pool. Using the common
pool normally reduces resource usage (its threads are slowly
reclaimed during periods of non-use, and reinstated upon subsequent
use).

For applications that require separate or custom pools, a `ForkJoinPool` may be constructed with a given target parallelism
level; by default, equal to the number of available processors.
The pool attempts to maintain enough active (or available) threads
by dynamically adding, suspending, or resuming internal worker
threads, even if some tasks are stalled waiting to join others.
However, no such adjustments are guaranteed in the face of blocked
I/O or other unmanaged synchronization. The nested `ManagedBlocker` interface enables extension of the kinds of
synchronization accommodated. The default policies may be
overridden using a constructor with parameters corresponding to
those documented in class `ThreadPoolExecutor`.

In addition to execution and lifecycle control methods, this
class provides status check methods (for example
`getStealCount`) that are intended to aid in developing,
tuning, and monitoring fork/join applications. Also, method
`toString` returns indications of pool state in a
convenient form for informal monitoring.

As is the case with other ExecutorServices, there are three
main task execution methods summarized in the following table.
These are designed to be used primarily by clients not already
engaged in fork/join computations in the current pool.  The main
forms of these methods accept instances of `ForkJoinTask`,
but overloaded forms also allow mixed execution of plain `Runnable`- or `Callable`- based activities as well.  However,
tasks that are already executing in a pool should normally instead
use the within-computation forms listed in the table unless using
async event-style tasks that are not usually joined, in which case
there is little difference among choice of methods.

Summary of task execution methods

    Call from non-fork/join clients
    Call from within fork/join computations

    Arrange async execution
    `execute(ForkJoinTask)`
    `ForkJoinTask.fork`

    Await and obtain result
    `invoke(ForkJoinTask)`
    `ForkJoinTask.invoke`

    Arrange exec and obtain Future
    `submit(ForkJoinTask)`
    `ForkJoinTask.fork` (ForkJoinTasks *are* Futures)

Additionally, this class supports `ScheduledExecutorService` methods to delay or periodically execute
tasks, as well as method `submitWithTimeout` to cancel tasks
that take too long. The scheduled functions or actions may create
and invoke other ForkJoinTasks. Delayed
actions become *enabled* and behave as ordinary submitted
tasks when their delays elapse.  Scheduling methods return
ForkJoinTasks that implement the `ScheduledFuture` interface. Resource exhaustion encountered after
initial submission results in task cancellation. When time-based
methods are used, shutdown policies match the default policies of
class `ScheduledThreadPoolExecutor`: upon `shutdown`,
existing periodic tasks will not re-execute, and the pool
terminates when quiescent and existing delayed tasks
complete. Method `cancelDelayedTasksOnShutdown` may be used
to disable all delayed tasks upon shutdown, and method `shutdownNow` may be used to instead unconditionally initiate pool
termination. Monitoring methods such as `getQueuedTaskCount`
do not include scheduled tasks that are not yet enabled to execute,
which are reported separately by method `getDelayedTaskCount`.

The parameters used to construct the common pool may be controlled by
setting the following system properties:

- `java.util.concurrent.ForkJoinPool.common.parallelism`
- the parallelism level, a non-negative integer. Usage is discouraged.
  Use `setParallelism` instead.

- `java.util.concurrent.ForkJoinPool.common.threadFactory`
- the class name of a `ForkJoinWorkerThreadFactory`.
The system class loader
is used to load this class.

- `java.util.concurrent.ForkJoinPool.common.exceptionHandler`
- the class name of a `UncaughtExceptionHandler`.
The system class loader
is used to load this class.

- `java.util.concurrent.ForkJoinPool.common.maximumSpares`
- the maximum number of allowed extra threads to maintain target
parallelism (default 256).

If no thread factory is supplied via a system property, then the
common pool uses a factory that uses the system class loader as the
thread context class loader.

Upon any error in establishing these settings, default parameters
are used. It is possible to disable use of threads by using a
factory that may return `null`, in which case some tasks may
never execute. While possible, it is strongly discouraged to set
the parallelism property to zero, which may be internally
overridden in the presence of intrinsically async tasks.

**Implementation note:** This implementation restricts the maximum number of
running threads to 32767. Attempts to create pools with greater
than the maximum number result in `IllegalArgumentException`. Also, this implementation rejects
submitted tasks (that is, by throwing `RejectedExecutionException`) only when the pool is shut down or
internal resources have been exhausted.

**Since:** 1.7

## ForkJoinPool.newThread(ForkJoinPool)

```java
public ForkJoinWorkerThread newThread(ForkJoinPool pool)
```

Returns a new worker thread operating in the given pool.
Returning null or throwing an exception may result in tasks
never being executed.  If this method throws an exception,
it is relayed to the caller of the method (for example
`execute`) causing attempted thread creation. If this
method returns null or throws an exception, it is not
retried until the next attempted creation (for example
another call to `execute`).

Parameters:

- `pool`: the pool this thread works in

**Returns:** the new worker thread, or `null` if the request
        to create a thread is rejected

Throws:

- `NullPointerException`: if the pool is null

## ForkJoinPool.defaultForkJoinWorkerThreadFactory

```java
public static final ForkJoinWorkerThreadFactory defaultForkJoinWorkerThreadFactory
```

Creates a new ForkJoinWorkerThread. This factory is used unless
overridden in ForkJoinPool constructors.

## ForkJoinPool.ForkJoinPool()

```java
public ForkJoinPool()
```

Creates a `ForkJoinPool` with parallelism equal to `java.lang.Runtime.availableProcessors`, using defaults for all
other parameters (see ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean, int, int, int, Predicate, long, TimeUnit)).

## ForkJoinPool.ForkJoinPool(int)

```java
public ForkJoinPool(int parallelism)
```

Creates a `ForkJoinPool` with the indicated parallelism
level, using defaults for all other parameters (see ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean, int, int, int, Predicate, long, TimeUnit)).

Parameters:

- `parallelism`: the parallelism level

Throws:

- `IllegalArgumentException`: if parallelism less than or equal to zero, or greater than implementation limit

## ForkJoinPool.ForkJoinPool(int, ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean)

```java
public ForkJoinPool(int parallelism, ForkJoinWorkerThreadFactory factory, UncaughtExceptionHandler handler, boolean asyncMode)
```

Creates a `ForkJoinPool` with the given parameters (using
defaults for others -- see ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean, int, int, int, Predicate, long, TimeUnit)).

Parameters:

- `parallelism`: the parallelism level. For default value, use `java.lang.Runtime.availableProcessors`.
- `factory`: the factory for creating new threads. For default value, use `defaultForkJoinWorkerThreadFactory`.
- `handler`: the handler for internal worker threads that terminate due to unrecoverable errors encountered while executing tasks. For default value, use `null`.
- `asyncMode`: if true, establishes local first-in-first-out scheduling mode for forked tasks that are never joined. This mode may be more appropriate than default locally stack-based mode in applications in which worker threads only process event-style asynchronous tasks. For default value, use `false`.

Throws:

- `IllegalArgumentException`: if parallelism less than or equal to zero, or greater than implementation limit
- `NullPointerException`: if the factory is null

## ForkJoinPool.ForkJoinPool(int, ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean, int, int, int, Predicate<? super ForkJoinPool>, long, TimeUnit)

```java
public ForkJoinPool(int parallelism, ForkJoinWorkerThreadFactory factory, UncaughtExceptionHandler handler, boolean asyncMode, int corePoolSize, int maximumPoolSize, int minimumRunnable, Predicate<? super ForkJoinPool> saturate, long keepAliveTime, TimeUnit unit)
```

Creates a `ForkJoinPool` with the given parameters.

Parameters:

- `parallelism`: the parallelism level. For default value, use `java.lang.Runtime.availableProcessors`.
- `factory`: the factory for creating new threads. For default value, use `defaultForkJoinWorkerThreadFactory`.
- `handler`: the handler for internal worker threads that terminate due to unrecoverable errors encountered while executing tasks. For default value, use `null`.
- `asyncMode`: if true, establishes local first-in-first-out scheduling mode for forked tasks that are never joined. This mode may be more appropriate than default locally stack-based mode in applications in which worker threads only process event-style asynchronous tasks. For default value, use `false`.
- `corePoolSize`: ignored: used in previous releases of this class but no longer applicable. Using `0` maintains compatibility across releases.
- `maximumPoolSize`: the maximum number of threads allowed. When the maximum is reached, attempts to replace blocked threads fail. (However, because creation and termination of different threads may overlap, and may be managed by the given thread factory, this value may be transiently exceeded.) To arrange the same value as is used by default for the common pool, use `256` plus the `parallelism` level. (By default, the common pool allows a maximum of 256 spare threads.) Using a value (for example `Integer.MAX_VALUE`) larger than the implementation's total thread limit has the same effect as using this limit (which is the default).
- `minimumRunnable`: the minimum allowed number of core threads not blocked by a join or `ManagedBlocker`. To ensure progress, when too few unblocked threads exist and unexecuted tasks may exist, new threads are constructed, up to the given maximumPoolSize. For the default value, use `1`, that ensures liveness. A larger value might improve throughput in the presence of blocked activities, but might not, due to increased overhead. A value of zero may be acceptable when submitted tasks cannot have dependencies requiring additional threads.
- `saturate`: if non-null, a predicate invoked upon attempts to create more than the maximum total allowed threads. By default, when a thread is about to block on a join or `ManagedBlocker`, but cannot be replaced because the maximumPoolSize would be exceeded, a `RejectedExecutionException` is thrown. But if this predicate returns `true`, then no exception is thrown, so the pool continues to operate with fewer than the target number of runnable threads, which might not ensure progress.
- `keepAliveTime`: the elapsed time since last use before a thread is terminated (and then later replaced if needed). For the default value, use `60, TimeUnit.SECONDS`.
- `unit`: the time unit for the `keepAliveTime` argument

**Since:** 9

Throws:

- `IllegalArgumentException`: if parallelism is less than or equal to zero, or is greater than implementation limit, or if maximumPoolSize is less than parallelism, of if the keepAliveTime is less than or equal to zero.
- `NullPointerException`: if the factory is null

## ForkJoinPool.commonPool()

```java
public static ForkJoinPool commonPool()
```

Returns the common pool instance. This pool is statically
constructed; its run state is unaffected by attempts to `shutdown` or `shutdownNow`. However this pool and any
ongoing processing are automatically terminated upon program
`System.exit`.  Any program that relies on asynchronous
task processing to complete before program termination should
invoke `commonPool().`awaitQuiescence,
before exit.

**Returns:** the common pool instance

**Since:** 1.8

## ForkJoinPool.invoke(ForkJoinTask<T>)

```java
public <T> T invoke(ForkJoinTask<T> task)
```

Performs the given task, returning its result upon completion.
If the computation encounters an unchecked Exception or Error,
it is rethrown as the outcome of this invocation.  Rethrown
exceptions behave in the same way as regular exceptions, but,
when possible, contain stack traces (as displayed for example
using `ex.printStackTrace()`) of both the current thread
as well as the thread actually encountering the exception;
minimally only the latter.

Parameters:

- `task`: the task
- `<T>`: the type of the task's result

**Returns:** the task's result

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.execute(ForkJoinTask<?>)

```java
public void execute(ForkJoinTask<?> task)
```

Arranges for (asynchronous) execution of the given task.

Parameters:

- `task`: the task

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution

## ForkJoinPool.execute(Runnable)

```java
public void execute(Runnable task)
```

Throws:

- `NullPointerException`: if the task is null
- `RejectedExecutionException`: if the task cannot be scheduled for execution
