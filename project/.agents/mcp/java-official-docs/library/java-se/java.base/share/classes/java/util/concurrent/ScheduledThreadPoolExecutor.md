---
title: "ScheduledThreadPoolExecutor class (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ScheduledThreadPoolExecutor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ScheduledThreadPoolExecutor class (java.util.concurrent)

```java
public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor implements ScheduledExecutorService
```

A `ThreadPoolExecutor` that can additionally schedule
commands to run after a given delay, or to execute periodically.
This class is preferable to `java.util.Timer` when multiple
worker threads are needed, or when the additional flexibility or
capabilities of `ThreadPoolExecutor` (which this class
extends) are required.

Delayed tasks execute no sooner than they are enabled, but
without any real-time guarantees about when, after they are
enabled, they will commence. Tasks scheduled for exactly the same
execution time are enabled in first-in-first-out (FIFO) order of
submission.

When a submitted task is cancelled before it is run, execution
is suppressed.  By default, such a cancelled task is not
automatically removed from the work queue until its delay elapses.
While this enables further inspection and monitoring, it may also
cause unbounded retention of cancelled tasks.  To avoid this, use
`setRemoveOnCancelPolicy` to cause tasks to be immediately
removed from the work queue at time of cancellation.

Successive executions of a periodic task scheduled via
scheduleAtFixedRate or
scheduleWithFixedDelay
do not overlap. While different executions may be performed by
different threads, the effects of prior executions
*happen-before*
those of subsequent ones.

While this class inherits from `ThreadPoolExecutor`, a few
of the inherited tuning methods are not useful for it. In
particular, because it acts as a fixed-sized pool using
`corePoolSize` threads and an unbounded queue, adjustments
to `maximumPoolSize` have no useful effect. Additionally, it
is almost never a good idea to set `corePoolSize` to zero or
use `allowCoreThreadTimeOut` because this may leave the pool
without threads to handle tasks once they become eligible to run.

As with `ThreadPoolExecutor`, if not otherwise specified,
this class uses `Executors.defaultThreadFactory` as the
default thread factory, and `ThreadPoolExecutor.AbortPolicy`
as the default rejected execution handler.

**Extension notes:** This class overrides the
execute and
submit
methods to generate internal `ScheduledFuture` objects to
control per-task delays and scheduling.  To preserve
functionality, any further overrides of these methods in
subclasses must invoke superclass versions, which effectively
disables additional task customization.  However, this class
provides alternative protected extension method
`decorateTask` (one version each for `Runnable` and
`Callable`) that can be used to customize the concrete task
types used to execute commands entered via `execute`,
`submit`, `schedule`, `scheduleAtFixedRate`,
and `scheduleWithFixedDelay`.  By default, a
`ScheduledThreadPoolExecutor` uses a task type extending
`FutureTask`. However, this may be modified or replaced using
subclasses of the form:

```java
public class CustomScheduledExecutor extends ScheduledThreadPoolExecutor {

  static class CustomTask<V> implements RunnableScheduledFuture<V> { ... }

  protected <V> RunnableScheduledFuture<V> decorateTask(
               Runnable r, RunnableScheduledFuture<V> task) {
      return new CustomTask<V>(r, task);
  }

  protected <V> RunnableScheduledFuture<V> decorateTask(
               Callable<V> c, RunnableScheduledFuture<V> task) {
      return new CustomTask<V>(c, task);
  }
  // ... add constructors, etc.
}
```

**Since:** 1.5

## ScheduledThreadPoolExecutor.isPeriodic()

```java
public boolean isPeriodic()
```

Returns `true` if this is a periodic (not a one-shot) action.

**Returns:** `true` if periodic

## ScheduledThreadPoolExecutor.run()

```java
public void run()
```

Overrides FutureTask version so as to reset/requeue if periodic.

## ScheduledThreadPoolExecutor.decorateTask(Runnable, RunnableScheduledFuture<V>)

```java
protected <V> RunnableScheduledFuture<V> decorateTask( Runnable runnable, RunnableScheduledFuture<V> task)
```

Modifies or replaces the task used to execute a runnable.
This method can be used to override the concrete
class used for managing internal tasks.
The default implementation simply returns the given task.

Parameters:

- `runnable`: the submitted Runnable
- `task`: the task created to execute the runnable
- `<V>`: the type of the task's result

**Returns:** a task that can execute the runnable

**Since:** 1.6

## ScheduledThreadPoolExecutor.decorateTask(Callable<V>, RunnableScheduledFuture<V>)

```java
protected <V> RunnableScheduledFuture<V> decorateTask( Callable<V> callable, RunnableScheduledFuture<V> task)
```

Modifies or replaces the task used to execute a callable.
This method can be used to override the concrete
class used for managing internal tasks.
The default implementation simply returns the given task.

Parameters:

- `callable`: the submitted Callable
- `task`: the task created to execute the callable
- `<V>`: the type of the task's result

**Returns:** a task that can execute the callable

**Since:** 1.6

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int)

```java
public ScheduledThreadPoolExecutor(int corePoolSize)
```

Creates a new `ScheduledThreadPoolExecutor` with the
given core pool size.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set

Throws:

- `IllegalArgumentException`: if `corePoolSize < 0`

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int, ThreadFactory)

```java
public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory)
```

Creates a new `ScheduledThreadPoolExecutor` with the
given initial parameters.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `threadFactory`: the factory to use when the executor creates a new thread

Throws:

- `IllegalArgumentException`: if `corePoolSize < 0`
- `NullPointerException`: if `threadFactory` is null

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int, RejectedExecutionHandler)

```java
public ScheduledThreadPoolExecutor(int corePoolSize, RejectedExecutionHandler handler)
```

Creates a new `ScheduledThreadPoolExecutor` with the
given initial parameters.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `handler`: the handler to use when execution is blocked because the thread bounds and queue capacities are reached

Throws:

- `IllegalArgumentException`: if `corePoolSize < 0`
- `NullPointerException`: if `handler` is null

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int, ThreadFactory, RejectedExecutionHandler)

```java
public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory, RejectedExecutionHandler handler)
```

Creates a new `ScheduledThreadPoolExecutor` with the
given initial parameters.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `threadFactory`: the factory to use when the executor creates a new thread
- `handler`: the handler to use when execution is blocked because the thread bounds and queue capacities are reached

Throws:

- `IllegalArgumentException`: if `corePoolSize < 0`
- `NullPointerException`: if `threadFactory` or `handler` is null

## ScheduledThreadPoolExecutor.schedule(Runnable, long, TimeUnit)

```java
public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ScheduledThreadPoolExecutor.schedule(Callable<V>, long, TimeUnit)

```java
public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ScheduledThreadPoolExecutor.scheduleAtFixedRate(Runnable, long, long, TimeUnit)

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
via the returned future.

- Method `shutdown` is called and the policy on whether to continue after shutdown is not set true, or method
`shutdownNow` is called; also resulting in task
cancellation.

- An execution of the task throws an exception.  In this case
calling get on the returned future will throw
`ExecutionException`, holding the exception as its cause.

Subsequent executions are suppressed.  Subsequent calls to
isDone() on the returned future will
return `true`.

If any execution of this task takes longer than its period, then
subsequent executions may start late, but will not concurrently
execute.

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ScheduledThreadPoolExecutor.scheduleWithFixedDelay(Runnable, long, long, TimeUnit)

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
via the returned future.

- Method `shutdown` is called and the policy on whether to continue after shutdown is not set true, or method
`shutdownNow` is called; also resulting in task
cancellation.

- An execution of the task throws an exception.  In this case
calling get on the returned future will throw
`ExecutionException`, holding the exception as its cause.

Subsequent executions are suppressed.  Subsequent calls to
isDone() on the returned future will
return `true`.

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ScheduledThreadPoolExecutor.execute(Runnable)

```java
public void execute(Runnable command)
```

Executes `command` with zero required delay.
This has effect equivalent to
schedule(command, 0, anyUnit).
Note that inspections of the queue and of the list returned by
`shutdownNow` will access the zero-delayed
`ScheduledFuture`, not the `command` itself.

A consequence of the use of `ScheduledFuture` objects is
that afterExecute is always
called with a null second `Throwable` argument, even if the
`command` terminated abruptly.  Instead, the `Throwable`
thrown by such a task can be obtained via `Future.get`.

Throws:

- `RejectedExecutionException`: at discretion of `RejectedExecutionHandler`, if the task cannot be accepted for execution because the executor has been shut down
- `NullPointerException`: (inherited documentation)

## ScheduledThreadPoolExecutor.submit(Runnable)

```java
public Future<?> submit(Runnable task)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ScheduledThreadPoolExecutor.submit(Runnable, T)

```java
public <T> Future<T> submit(Runnable task, T result)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ScheduledThreadPoolExecutor.submit(Callable<T>)

```java
public <T> Future<T> submit(Callable<T> task)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ScheduledThreadPoolExecutor.setContinueExistingPeriodicTasksAfterShutdownPolicy(boolean)

```java
public void setContinueExistingPeriodicTasksAfterShutdownPolicy(boolean value)
```

Sets the policy on whether to continue executing existing
periodic tasks even when this executor has been `shutdown`.
In this case, executions will continue until `shutdownNow`
or the policy is set to `false` when already shutdown.
This value is by default `false`.

Parameters:

- `value`: if `true`, continue after shutdown, else don't

**See also:** #getContinueExistingPeriodicTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.getContinueExistingPeriodicTasksAfterShutdownPolicy()

```java
public boolean getContinueExistingPeriodicTasksAfterShutdownPolicy()
```

Gets the policy on whether to continue executing existing
periodic tasks even when this executor has been `shutdown`.
In this case, executions will continue until `shutdownNow`
or the policy is set to `false` when already shutdown.
This value is by default `false`.

**Returns:** `true` if will continue after shutdown

**See also:** #setContinueExistingPeriodicTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.setExecuteExistingDelayedTasksAfterShutdownPolicy(boolean)

```java
public void setExecuteExistingDelayedTasksAfterShutdownPolicy(boolean value)
```

Sets the policy on whether to execute existing delayed
tasks even when this executor has been `shutdown`.
In this case, these tasks will only terminate upon
`shutdownNow`, or after setting the policy to
`false` when already shutdown.
This value is by default `true`.

Parameters:

- `value`: if `true`, execute after shutdown, else don't

**See also:** #getExecuteExistingDelayedTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.getExecuteExistingDelayedTasksAfterShutdownPolicy()

```java
public boolean getExecuteExistingDelayedTasksAfterShutdownPolicy()
```

Gets the policy on whether to execute existing delayed
tasks even when this executor has been `shutdown`.
In this case, these tasks will only terminate upon
`shutdownNow`, or after setting the policy to
`false` when already shutdown.
This value is by default `true`.

**Returns:** `true` if will execute after shutdown

**See also:** #setExecuteExistingDelayedTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.setRemoveOnCancelPolicy(boolean)

```java
public void setRemoveOnCancelPolicy(boolean value)
```

Sets the policy on whether cancelled tasks should be immediately
removed from the work queue at time of cancellation.  This value is
by default `false`.

Parameters:

- `value`: if `true`, remove on cancellation, else don't

**See also:** #getRemoveOnCancelPolicy

**Since:** 1.7
