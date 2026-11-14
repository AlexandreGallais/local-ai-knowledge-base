# ScheduledThreadPoolExecutor class (java.util.concurrent)

```java
public class ScheduledThreadPoolExecutor extends ThreadPoolExecutor implements ScheduledExecutorService
```

A {@link ThreadPoolExecutor} that can additionally schedule
commands to run after a given delay, or to execute periodically.
This class is preferable to {@link java.util.Timer} when multiple
worker threads are needed, or when the additional flexibility or
capabilities of {@link ThreadPoolExecutor} (which this class
extends) are required.

<p>Delayed tasks execute no sooner than they are enabled, but
without any real-time guarantees about when, after they are
enabled, they will commence. Tasks scheduled for exactly the same
execution time are enabled in first-in-first-out (FIFO) order of
submission.

<p>When a submitted task is cancelled before it is run, execution
is suppressed.  By default, such a cancelled task is not
automatically removed from the work queue until its delay elapses.
While this enables further inspection and monitoring, it may also
cause unbounded retention of cancelled tasks.  To avoid this, use
{@link #setRemoveOnCancelPolicy} to cause tasks to be immediately
removed from the work queue at time of cancellation.

<p>Successive executions of a periodic task scheduled via
{@link #scheduleAtFixedRate scheduleAtFixedRate} or
{@link #scheduleWithFixedDelay scheduleWithFixedDelay}
do not overlap. While different executions may be performed by
different threads, the effects of prior executions
<a href="package-summary.html#MemoryVisibility"><i>happen-before</i></a>
those of subsequent ones.

<p>While this class inherits from {@link ThreadPoolExecutor}, a few
of the inherited tuning methods are not useful for it. In
particular, because it acts as a fixed-sized pool using
{@code corePoolSize} threads and an unbounded queue, adjustments
to {@code maximumPoolSize} have no useful effect. Additionally, it
is almost never a good idea to set {@code corePoolSize} to zero or
use {@code allowCoreThreadTimeOut} because this may leave the pool
without threads to handle tasks once they become eligible to run.

<p>As with {@code ThreadPoolExecutor}, if not otherwise specified,
this class uses {@link Executors#defaultThreadFactory} as the
default thread factory, and {@link ThreadPoolExecutor.AbortPolicy}
as the default rejected execution handler.

<p><b>Extension notes:</b> This class overrides the
{@link ThreadPoolExecutor#execute(Runnable) execute} and
{@link AbstractExecutorService#submit(Runnable) submit}
methods to generate internal {@link ScheduledFuture} objects to
control per-task delays and scheduling.  To preserve
functionality, any further overrides of these methods in
subclasses must invoke superclass versions, which effectively
disables additional task customization.  However, this class
provides alternative protected extension method
{@code decorateTask} (one version each for {@code Runnable} and
{@code Callable}) that can be used to customize the concrete task
types used to execute commands entered via {@code execute},
{@code submit}, {@code schedule}, {@code scheduleAtFixedRate},
and {@code scheduleWithFixedDelay}.  By default, a
{@code ScheduledThreadPoolExecutor} uses a task type extending
{@link FutureTask}. However, this may be modified or replaced using
subclasses of the form:

<pre> {@code
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
}}</pre>

@since 1.5
@author Doug Lea

## ScheduledThreadPoolExecutor.isPeriodic()

```java
public boolean isPeriodic()
```

Returns {@code true} if this is a periodic (not a one-shot) action.

@return {@code true} if periodic

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

@param runnable the submitted Runnable
@param task the task created to execute the runnable
@param <V> the type of the task's result
@return a task that can execute the runnable
@since 1.6

## ScheduledThreadPoolExecutor.decorateTask(Callable<V>, RunnableScheduledFuture<V>)

```java
protected <V> RunnableScheduledFuture<V> decorateTask( Callable<V> callable, RunnableScheduledFuture<V> task)
```

Modifies or replaces the task used to execute a callable.
This method can be used to override the concrete
class used for managing internal tasks.
The default implementation simply returns the given task.

@param callable the submitted Callable
@param task the task created to execute the callable
@param <V> the type of the task's result
@return a task that can execute the callable
@since 1.6

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int)

```java
public ScheduledThreadPoolExecutor(int corePoolSize)
```

Creates a new {@code ScheduledThreadPoolExecutor} with the
given core pool size.

@param corePoolSize the number of threads to keep in the pool, even
       if they are idle, unless {@code allowCoreThreadTimeOut} is set
@throws IllegalArgumentException if {@code corePoolSize < 0}

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int, ThreadFactory)

```java
public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory)
```

Creates a new {@code ScheduledThreadPoolExecutor} with the
given initial parameters.

@param corePoolSize the number of threads to keep in the pool, even
       if they are idle, unless {@code allowCoreThreadTimeOut} is set
@param threadFactory the factory to use when the executor
       creates a new thread
@throws IllegalArgumentException if {@code corePoolSize < 0}
@throws NullPointerException if {@code threadFactory} is null

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int, RejectedExecutionHandler)

```java
public ScheduledThreadPoolExecutor(int corePoolSize, RejectedExecutionHandler handler)
```

Creates a new {@code ScheduledThreadPoolExecutor} with the
given initial parameters.

@param corePoolSize the number of threads to keep in the pool, even
       if they are idle, unless {@code allowCoreThreadTimeOut} is set
@param handler the handler to use when execution is blocked
       because the thread bounds and queue capacities are reached
@throws IllegalArgumentException if {@code corePoolSize < 0}
@throws NullPointerException if {@code handler} is null

## ScheduledThreadPoolExecutor.ScheduledThreadPoolExecutor(int, ThreadFactory, RejectedExecutionHandler)

```java
public ScheduledThreadPoolExecutor(int corePoolSize, ThreadFactory threadFactory, RejectedExecutionHandler handler)
```

Creates a new {@code ScheduledThreadPoolExecutor} with the
given initial parameters.

@param corePoolSize the number of threads to keep in the pool, even
       if they are idle, unless {@code allowCoreThreadTimeOut} is set
@param threadFactory the factory to use when the executor
       creates a new thread
@param handler the handler to use when execution is blocked
       because the thread bounds and queue capacities are reached
@throws IllegalArgumentException if {@code corePoolSize < 0}
@throws NullPointerException if {@code threadFactory} or
        {@code handler} is null

## ScheduledThreadPoolExecutor.schedule(Runnable, long, TimeUnit)

```java
public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## ScheduledThreadPoolExecutor.schedule(Callable<V>, long, TimeUnit)

```java
public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## ScheduledThreadPoolExecutor.scheduleAtFixedRate(Runnable, long, long, TimeUnit)

```java
public ScheduledFuture<?> scheduleAtFixedRate(Runnable command, long initialDelay, long period, TimeUnit unit)
```

Submits a periodic action that becomes enabled first after the
given initial delay, and subsequently with the given period;
that is, executions will commence after
{@code initialDelay}, then {@code initialDelay + period}, then
{@code initialDelay + 2 * period}, and so on.

<p>The sequence of task executions continues indefinitely until
one of the following exceptional completions occur:
<ul>
<li>The task is {@linkplain Future#cancel explicitly cancelled}
via the returned future.
<li>Method {@link #shutdown} is called and the {@linkplain
#getContinueExistingPeriodicTasksAfterShutdownPolicy policy on
whether to continue after shutdown} is not set true, or method
{@link #shutdownNow} is called; also resulting in task
cancellation.
<li>An execution of the task throws an exception.  In this case
calling {@link Future#get() get} on the returned future will throw
{@link ExecutionException}, holding the exception as its cause.
</ul>
Subsequent executions are suppressed.  Subsequent calls to
{@link Future#isDone isDone()} on the returned future will
return {@code true}.

<p>If any execution of this task takes longer than its period, then
subsequent executions may start late, but will not concurrently
execute.

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}
@throws IllegalArgumentException   {@inheritDoc}

## ScheduledThreadPoolExecutor.scheduleWithFixedDelay(Runnable, long, long, TimeUnit)

```java
public ScheduledFuture<?> scheduleWithFixedDelay(Runnable command, long initialDelay, long delay, TimeUnit unit)
```

Submits a periodic action that becomes enabled first after the
given initial delay, and subsequently with the given delay
between the termination of one execution and the commencement of
the next.

<p>The sequence of task executions continues indefinitely until
one of the following exceptional completions occur:
<ul>
<li>The task is {@linkplain Future#cancel explicitly cancelled}
via the returned future.
<li>Method {@link #shutdown} is called and the {@linkplain
#getContinueExistingPeriodicTasksAfterShutdownPolicy policy on
whether to continue after shutdown} is not set true, or method
{@link #shutdownNow} is called; also resulting in task
cancellation.
<li>An execution of the task throws an exception.  In this case
calling {@link Future#get() get} on the returned future will throw
{@link ExecutionException}, holding the exception as its cause.
</ul>
Subsequent executions are suppressed.  Subsequent calls to
{@link Future#isDone isDone()} on the returned future will
return {@code true}.

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}
@throws IllegalArgumentException   {@inheritDoc}

## ScheduledThreadPoolExecutor.execute(Runnable)

```java
public void execute(Runnable command)
```

Executes {@code command} with zero required delay.
This has effect equivalent to
{@link #schedule(Runnable,long,TimeUnit) schedule(command, 0, anyUnit)}.
Note that inspections of the queue and of the list returned by
{@code shutdownNow} will access the zero-delayed
{@link ScheduledFuture}, not the {@code command} itself.

<p>A consequence of the use of {@code ScheduledFuture} objects is
that {@link ThreadPoolExecutor#afterExecute afterExecute} is always
called with a null second {@code Throwable} argument, even if the
{@code command} terminated abruptly.  Instead, the {@code Throwable}
thrown by such a task can be obtained via {@link Future#get}.

@throws RejectedExecutionException at discretion of
        {@code RejectedExecutionHandler}, if the task
        cannot be accepted for execution because the
        executor has been shut down
@throws NullPointerException {@inheritDoc}

## ScheduledThreadPoolExecutor.submit(Runnable)

```java
public Future<?> submit(Runnable task)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## ScheduledThreadPoolExecutor.submit(Runnable, T)

```java
public <T> Future<T> submit(Runnable task, T result)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## ScheduledThreadPoolExecutor.submit(Callable<T>)

```java
public <T> Future<T> submit(Callable<T> task)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## ScheduledThreadPoolExecutor.setContinueExistingPeriodicTasksAfterShutdownPolicy(boolean)

```java
public void setContinueExistingPeriodicTasksAfterShutdownPolicy(boolean value)
```

Sets the policy on whether to continue executing existing
periodic tasks even when this executor has been {@code shutdown}.
In this case, executions will continue until {@code shutdownNow}
or the policy is set to {@code false} when already shutdown.
This value is by default {@code false}.

@param value if {@code true}, continue after shutdown, else don't
@see #getContinueExistingPeriodicTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.getContinueExistingPeriodicTasksAfterShutdownPolicy()

```java
public boolean getContinueExistingPeriodicTasksAfterShutdownPolicy()
```

Gets the policy on whether to continue executing existing
periodic tasks even when this executor has been {@code shutdown}.
In this case, executions will continue until {@code shutdownNow}
or the policy is set to {@code false} when already shutdown.
This value is by default {@code false}.

@return {@code true} if will continue after shutdown
@see #setContinueExistingPeriodicTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.setExecuteExistingDelayedTasksAfterShutdownPolicy(boolean)

```java
public void setExecuteExistingDelayedTasksAfterShutdownPolicy(boolean value)
```

Sets the policy on whether to execute existing delayed
tasks even when this executor has been {@code shutdown}.
In this case, these tasks will only terminate upon
{@code shutdownNow}, or after setting the policy to
{@code false} when already shutdown.
This value is by default {@code true}.

@param value if {@code true}, execute after shutdown, else don't
@see #getExecuteExistingDelayedTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.getExecuteExistingDelayedTasksAfterShutdownPolicy()

```java
public boolean getExecuteExistingDelayedTasksAfterShutdownPolicy()
```

Gets the policy on whether to execute existing delayed
tasks even when this executor has been {@code shutdown}.
In this case, these tasks will only terminate upon
{@code shutdownNow}, or after setting the policy to
{@code false} when already shutdown.
This value is by default {@code true}.

@return {@code true} if will execute after shutdown
@see #setExecuteExistingDelayedTasksAfterShutdownPolicy

## ScheduledThreadPoolExecutor.setRemoveOnCancelPolicy(boolean)

```java
public void setRemoveOnCancelPolicy(boolean value)
```

Sets the policy on whether cancelled tasks should be immediately
removed from the work queue at time of cancellation.  This value is
by default {@code false}.

@param value if {@code true}, remove on cancellation, else don't
@see #getRemoveOnCancelPolicy
@since 1.7

## ScheduledThreadPoolExecutor.getRemoveOnCancelPolicy()

```java
public boolean getRemoveOnCancelPolicy()
```

Gets the policy on whether cancelled tasks should be immediately
removed from the work queue at time of cancellation.  This value is
by default {@code false}.

@return {@code true} if cancelled tasks are immediately removed
        from the queue
@see #setRemoveOnCancelPolicy
@since 1.7

## ScheduledThreadPoolExecutor.shutdown()

```java
public void shutdown()
```

Initiates an orderly shutdown in which previously submitted
tasks are executed, but no new tasks will be accepted.
Invocation has no additional effect if already shut down.

<p>This method does not wait for previously submitted tasks to
complete execution.  Use {@link #awaitTermination awaitTermination}
to do that.

<p>If the {@code ExecuteExistingDelayedTasksAfterShutdownPolicy}
has been set {@code false}, existing delayed tasks whose delays
have not yet elapsed are cancelled.  And unless the {@code
ContinueExistingPeriodicTasksAfterShutdownPolicy} has been set
{@code true}, future executions of existing periodic tasks will
be cancelled.

## ScheduledThreadPoolExecutor.shutdownNow()

```java
public List<Runnable> shutdownNow()
```

Attempts to stop all actively executing tasks, halts the
processing of waiting tasks, and returns a list of the tasks
that were awaiting execution. These tasks are drained (removed)
from the task queue upon return from this method.

<p>This method does not wait for actively executing tasks to
terminate.  Use {@link #awaitTermination awaitTermination} to
do that.

<p>There are no guarantees beyond best-effort attempts to stop
processing actively executing tasks.  This implementation
interrupts tasks via {@link Thread#interrupt}; any task that
fails to respond to interrupts may never terminate.

@return list of tasks that never commenced execution.
        Each element of this list is a {@link ScheduledFuture}.
        For tasks submitted via one of the {@code schedule}
        methods, the element will be identical to the returned
        {@code ScheduledFuture}.  For tasks submitted using
        {@link #execute execute}, the element will be a
        zero-delay {@code ScheduledFuture}.

## ScheduledThreadPoolExecutor.getQueue()

```java
public BlockingQueue<Runnable> getQueue()
```

Returns the task queue used by this executor.  Access to the
task queue is intended primarily for debugging and monitoring.
This queue may be in active use.  Retrieving the task queue
does not prevent queued tasks from executing.

<p>Each element of this queue is a {@link ScheduledFuture}.
For tasks submitted via one of the {@code schedule} methods, the
element will be identical to the returned {@code ScheduledFuture}.
For tasks submitted using {@link #execute execute}, the element
will be a zero-delay {@code ScheduledFuture}.

<p>Iteration over this queue is <em>not</em> guaranteed to traverse
tasks in the order in which they will execute.

@return the task queue