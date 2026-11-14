# ForkJoinPool class (java.util.concurrent)

```java
public class ForkJoinPool extends AbstractExecutorService implements ScheduledExecutorService
```

An {@link ExecutorService} for running {@link ForkJoinTask}s.
A {@code ForkJoinPool} provides the entry point for submissions
from non-{@code ForkJoinTask} clients, as well as management and
monitoring operations.

<p>A {@code ForkJoinPool} differs from other kinds of {@link
ExecutorService} mainly by virtue of employing
<em>work-stealing</em>: all threads in the pool attempt to find and
execute tasks submitted to the pool and/or created by other active
tasks (eventually blocking waiting for work if none exist). This
enables efficient processing when most tasks spawn other subtasks
(as do most {@code ForkJoinTask}s), as well as when many small
tasks are submitted to the pool from external clients.  Especially
when setting <em>asyncMode</em> to true in constructors, {@code
ForkJoinPool}s may also be appropriate for use with event-style
tasks that are never joined. All worker threads are initialized
with {@link Thread#isDaemon} set {@code true}.

<p>A static {@link #commonPool()} is available and appropriate for
most applications. The common pool is used by any ForkJoinTask that
is not explicitly submitted to a specified pool. Using the common
pool normally reduces resource usage (its threads are slowly
reclaimed during periods of non-use, and reinstated upon subsequent
use).

<p>For applications that require separate or custom pools, a {@code
ForkJoinPool} may be constructed with a given target parallelism
level; by default, equal to the number of available processors.
The pool attempts to maintain enough active (or available) threads
by dynamically adding, suspending, or resuming internal worker
threads, even if some tasks are stalled waiting to join others.
However, no such adjustments are guaranteed in the face of blocked
I/O or other unmanaged synchronization. The nested {@link
ManagedBlocker} interface enables extension of the kinds of
synchronization accommodated. The default policies may be
overridden using a constructor with parameters corresponding to
those documented in class {@link ThreadPoolExecutor}.

<p>In addition to execution and lifecycle control methods, this
class provides status check methods (for example
{@link #getStealCount}) that are intended to aid in developing,
tuning, and monitoring fork/join applications. Also, method
{@link #toString} returns indications of pool state in a
convenient form for informal monitoring.

<p>As is the case with other ExecutorServices, there are three
main task execution methods summarized in the following table.
These are designed to be used primarily by clients not already
engaged in fork/join computations in the current pool.  The main
forms of these methods accept instances of {@code ForkJoinTask},
but overloaded forms also allow mixed execution of plain {@code
Runnable}- or {@code Callable}- based activities as well.  However,
tasks that are already executing in a pool should normally instead
use the within-computation forms listed in the table unless using
async event-style tasks that are not usually joined, in which case
there is little difference among choice of methods.

<table class="plain">
<caption>Summary of task execution methods</caption>
 <tr>
   <td></td>
   <th scope="col"> Call from non-fork/join clients</th>
   <th scope="col"> Call from within fork/join computations</th>
 </tr>
 <tr>
   <th scope="row" style="text-align:left"> Arrange async execution</th>
   <td> {@link #execute(ForkJoinTask)}</td>
   <td> {@link ForkJoinTask#fork}</td>
 </tr>
 <tr>
   <th scope="row" style="text-align:left"> Await and obtain result</th>
   <td> {@link #invoke(ForkJoinTask)}</td>
   <td> {@link ForkJoinTask#invoke}</td>
 </tr>
 <tr>
   <th scope="row" style="text-align:left"> Arrange exec and obtain Future</th>
   <td> {@link #submit(ForkJoinTask)}</td>
   <td> {@link ForkJoinTask#fork} (ForkJoinTasks <em>are</em> Futures)</td>
 </tr>
</table>

<p>Additionally, this class supports {@link
ScheduledExecutorService} methods to delay or periodically execute
tasks, as well as method {@link #submitWithTimeout} to cancel tasks
that take too long. The scheduled functions or actions may create
and invoke other {@linkplain ForkJoinTask ForkJoinTasks}. Delayed
actions become <em>enabled</em> and behave as ordinary submitted
tasks when their delays elapse.  Scheduling methods return
{@linkplain ForkJoinTask ForkJoinTasks} that implement the {@link
ScheduledFuture} interface. Resource exhaustion encountered after
initial submission results in task cancellation. When time-based
methods are used, shutdown policies match the default policies of
class {@link ScheduledThreadPoolExecutor}: upon {@link #shutdown},
existing periodic tasks will not re-execute, and the pool
terminates when quiescent and existing delayed tasks
complete. Method {@link #cancelDelayedTasksOnShutdown} may be used
to disable all delayed tasks upon shutdown, and method {@link
#shutdownNow} may be used to instead unconditionally initiate pool
termination. Monitoring methods such as {@link #getQueuedTaskCount}
do not include scheduled tasks that are not yet enabled to execute,
which are reported separately by method {@link
#getDelayedTaskCount}.

<p>The parameters used to construct the common pool may be controlled by
setting the following {@linkplain System#getProperty system properties}:
<ul>
<li>{@systemProperty java.util.concurrent.ForkJoinPool.common.parallelism}
- the parallelism level, a non-negative integer. Usage is discouraged.
  Use {@link #setParallelism} instead.
<li>{@systemProperty java.util.concurrent.ForkJoinPool.common.threadFactory}
- the class name of a {@link ForkJoinWorkerThreadFactory}.
The {@linkplain ClassLoader#getSystemClassLoader() system class loader}
is used to load this class.
<li>{@systemProperty java.util.concurrent.ForkJoinPool.common.exceptionHandler}
- the class name of a {@link UncaughtExceptionHandler}.
The {@linkplain ClassLoader#getSystemClassLoader() system class loader}
is used to load this class.
<li>{@systemProperty java.util.concurrent.ForkJoinPool.common.maximumSpares}
- the maximum number of allowed extra threads to maintain target
parallelism (default 256).
</ul>
If no thread factory is supplied via a system property, then the
common pool uses a factory that uses the system class loader as the
{@linkplain Thread#getContextClassLoader() thread context class loader}.

Upon any error in establishing these settings, default parameters
are used. It is possible to disable use of threads by using a
factory that may return {@code null}, in which case some tasks may
never execute. While possible, it is strongly discouraged to set
the parallelism property to zero, which may be internally
overridden in the presence of intrinsically async tasks.

@implNote This implementation restricts the maximum number of
running threads to 32767. Attempts to create pools with greater
than the maximum number result in {@code
IllegalArgumentException}. Also, this implementation rejects
submitted tasks (that is, by throwing {@link
RejectedExecutionException}) only when the pool is shut down or
internal resources have been exhausted.

@since 1.7
@author Doug Lea

## ForkJoinPool.newThread(ForkJoinPool)

```java
public ForkJoinWorkerThread newThread(ForkJoinPool pool)
```

Returns a new worker thread operating in the given pool.
Returning null or throwing an exception may result in tasks
never being executed.  If this method throws an exception,
it is relayed to the caller of the method (for example
{@code execute}) causing attempted thread creation. If this
method returns null or throws an exception, it is not
retried until the next attempted creation (for example
another call to {@code execute}).

@param pool the pool this thread works in
@return the new worker thread, or {@code null} if the request
        to create a thread is rejected
@throws NullPointerException if the pool is null

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

Creates a {@code ForkJoinPool} with parallelism equal to {@link
java.lang.Runtime#availableProcessors}, using defaults for all
other parameters (see {@link #ForkJoinPool(int,
ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean,
int, int, int, Predicate, long, TimeUnit)}).

## ForkJoinPool.ForkJoinPool(int)

```java
public ForkJoinPool(int parallelism)
```

Creates a {@code ForkJoinPool} with the indicated parallelism
level, using defaults for all other parameters (see {@link
#ForkJoinPool(int, ForkJoinWorkerThreadFactory,
UncaughtExceptionHandler, boolean, int, int, int, Predicate,
long, TimeUnit)}).

@param parallelism the parallelism level
@throws IllegalArgumentException if parallelism less than or
        equal to zero, or greater than implementation limit

## ForkJoinPool.ForkJoinPool(int, ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean)

```java
public ForkJoinPool(int parallelism, ForkJoinWorkerThreadFactory factory, UncaughtExceptionHandler handler, boolean asyncMode)
```

Creates a {@code ForkJoinPool} with the given parameters (using
defaults for others -- see {@link #ForkJoinPool(int,
ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean,
int, int, int, Predicate, long, TimeUnit)}).

@param parallelism the parallelism level. For default value,
use {@link java.lang.Runtime#availableProcessors}.
@param factory the factory for creating new threads. For default value,
use {@link #defaultForkJoinWorkerThreadFactory}.
@param handler the handler for internal worker threads that
terminate due to unrecoverable errors encountered while executing
tasks. For default value, use {@code null}.
@param asyncMode if true,
establishes local first-in-first-out scheduling mode for forked
tasks that are never joined. This mode may be more appropriate
than default locally stack-based mode in applications in which
worker threads only process event-style asynchronous tasks.
For default value, use {@code false}.
@throws IllegalArgumentException if parallelism less than or
        equal to zero, or greater than implementation limit
@throws NullPointerException if the factory is null

## ForkJoinPool.ForkJoinPool(int, ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean, int, int, int, Predicate<? super ForkJoinPool>, long, TimeUnit)

```java
public ForkJoinPool(int parallelism, ForkJoinWorkerThreadFactory factory, UncaughtExceptionHandler handler, boolean asyncMode, int corePoolSize, int maximumPoolSize, int minimumRunnable, Predicate<? super ForkJoinPool> saturate, long keepAliveTime, TimeUnit unit)
```

Creates a {@code ForkJoinPool} with the given parameters.

@param parallelism the parallelism level. For default value,
use {@link java.lang.Runtime#availableProcessors}.

@param factory the factory for creating new threads. For
default value, use {@link #defaultForkJoinWorkerThreadFactory}.

@param handler the handler for internal worker threads that
terminate due to unrecoverable errors encountered while
executing tasks. For default value, use {@code null}.

@param asyncMode if true, establishes local first-in-first-out
scheduling mode for forked tasks that are never joined. This
mode may be more appropriate than default locally stack-based
mode in applications in which worker threads only process
event-style asynchronous tasks.  For default value, use {@code
false}.

@param corePoolSize ignored: used in previous releases of this
class but no longer applicable. Using {@code 0} maintains
compatibility across releases.

@param maximumPoolSize the maximum number of threads allowed.
When the maximum is reached, attempts to replace blocked
threads fail.  (However, because creation and termination of
different threads may overlap, and may be managed by the given
thread factory, this value may be transiently exceeded.)  To
arrange the same value as is used by default for the common
pool, use {@code 256} plus the {@code parallelism} level. (By
default, the common pool allows a maximum of 256 spare
threads.)  Using a value (for example {@code
Integer.MAX_VALUE}) larger than the implementation's total
thread limit has the same effect as using this limit (which is
the default).

@param minimumRunnable the minimum allowed number of core
threads not blocked by a join or {@link ManagedBlocker}.  To
ensure progress, when too few unblocked threads exist and
unexecuted tasks may exist, new threads are constructed, up to
the given maximumPoolSize.  For the default value, use {@code
1}, that ensures liveness.  A larger value might improve
throughput in the presence of blocked activities, but might
not, due to increased overhead.  A value of zero may be
acceptable when submitted tasks cannot have dependencies
requiring additional threads.

@param saturate if non-null, a predicate invoked upon attempts
to create more than the maximum total allowed threads.  By
default, when a thread is about to block on a join or {@link
ManagedBlocker}, but cannot be replaced because the
maximumPoolSize would be exceeded, a {@link
RejectedExecutionException} is thrown.  But if this predicate
returns {@code true}, then no exception is thrown, so the pool
continues to operate with fewer than the target number of
runnable threads, which might not ensure progress.

@param keepAliveTime the elapsed time since last use before
a thread is terminated (and then later replaced if needed).
For the default value, use {@code 60, TimeUnit.SECONDS}.

@param unit the time unit for the {@code keepAliveTime} argument

@throws IllegalArgumentException if parallelism is less than or
        equal to zero, or is greater than implementation limit,
        or if maximumPoolSize is less than parallelism,
        of if the keepAliveTime is less than or equal to zero.
@throws NullPointerException if the factory is null
@since 9

## ForkJoinPool.commonPool()

```java
public static ForkJoinPool commonPool()
```

Returns the common pool instance. This pool is statically
constructed; its run state is unaffected by attempts to {@link
#shutdown} or {@link #shutdownNow}. However this pool and any
ongoing processing are automatically terminated upon program
{@link System#exit}.  Any program that relies on asynchronous
task processing to complete before program termination should
invoke {@code commonPool().}{@link #awaitQuiescence awaitQuiescence},
before exit.

@return the common pool instance
@since 1.8

## ForkJoinPool.invoke(ForkJoinTask<T>)

```java
public <T> T invoke(ForkJoinTask<T> task)
```

Performs the given task, returning its result upon completion.
If the computation encounters an unchecked Exception or Error,
it is rethrown as the outcome of this invocation.  Rethrown
exceptions behave in the same way as regular exceptions, but,
when possible, contain stack traces (as displayed for example
using {@code ex.printStackTrace()}) of both the current thread
as well as the thread actually encountering the exception;
minimally only the latter.

@param task the task
@param <T> the type of the task's result
@return the task's result
@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.execute(ForkJoinTask<?>)

```java
public void execute(ForkJoinTask<?> task)
```

Arranges for (asynchronous) execution of the given task.

@param task the task
@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.execute(Runnable)

```java
public void execute(Runnable task)
```

@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.submit(ForkJoinTask<T>)

```java
public <T> ForkJoinTask<T> submit(ForkJoinTask<T> task)
```

Submits a ForkJoinTask for execution.

@implSpec
This method is equivalent to {@link #externalSubmit(ForkJoinTask)}
when called from a thread that is not in this pool.

@param task the task to submit
@param <T> the type of the task's result
@return the task
@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.submit(Callable<T>)

```java
public <T> ForkJoinTask<T> submit(Callable<T> task)
```

@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.submit(Runnable, T)

```java
public <T> ForkJoinTask<T> submit(Runnable task, T result)
```

@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.submit(Runnable)

```java
public ForkJoinTask<?> submit(Runnable task)
```

@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution

## ForkJoinPool.externalSubmit(ForkJoinTask<T>)

```java
public <T> ForkJoinTask<T> externalSubmit(ForkJoinTask<T> task)
```

Submits the given task as if submitted from a non-{@code ForkJoinTask}
client. The task is added to a scheduling queue for submissions to the
pool even when called from a thread in the pool.

@implSpec
This method is equivalent to {@link #submit(ForkJoinTask)} when called
from a thread that is not in this pool.

@return the task
@param task the task to submit
@param <T> the type of the task's result
@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution
@since 20

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

@param task the task
@param <T> the type of the task's result
@return the task
@throws NullPointerException if the task is null
@throws RejectedExecutionException if the task cannot be
        scheduled for execution
@since 19

## ForkJoinPool.setParallelism(int)

```java
public int setParallelism(int size)
```

Changes the target parallelism of this pool, controlling the
future creation, use, and termination of worker threads.
Applications include contexts in which the number of available
processors changes over time.

@implNote This implementation restricts the maximum number of
running threads to 32767

@param size the target parallelism level
@return the previous parallelism level.
@throws IllegalArgumentException if size is less than 1 or
        greater than the maximum supported by this pool.
@throws UnsupportedOperationException this is the{@link
        #commonPool()} and parallelism level was set by System
        property {@systemProperty
        java.util.concurrent.ForkJoinPool.common.parallelism}.
@since 19

## ForkJoinPool.invokeAllUninterruptibly(Collection<? extends Callable<T>>)

```java
public <T> List<Future<T>> invokeAllUninterruptibly(Collection<? extends Callable<T>> tasks)
```

Uninterrupible version of {@code invokeAll}. Executes the given
tasks, returning a list of Futures holding their status and
results when all complete, ignoring interrupts.  {@link
Future#isDone} is {@code true} for each element of the returned
list.  Note that a <em>completed</em> task could have
terminated either normally or by throwing an exception.  The
results of this method are undefined if the given collection is
modified while this operation is in progress.

@apiNote This method supports usages that previously relied on an
incompatible override of
{@link ExecutorService#invokeAll(java.util.Collection)}.

@param tasks the collection of tasks
@param <T> the type of the values returned from the tasks
@return a list of Futures representing the tasks, in the same
        sequential order as produced by the iterator for the
        given task list, each of which has completed
@throws NullPointerException if tasks or any of its elements are {@code null}
@throws RejectedExecutionException if any task cannot be
        scheduled for execution
@since 22

## ForkJoinPool.schedule(Runnable, long, TimeUnit)

```java
public ScheduledFuture<?> schedule(Runnable command, long delay, TimeUnit unit)
```

Submits a one-shot task that becomes enabled after the given
delay.  At that point it will execute unless explicitly
cancelled, or fail to execute (eventually reporting
cancellation) when encountering resource exhaustion, or the
pool is {@link #shutdownNow}, or is {@link #shutdown} when
otherwise quiescent and {@link #cancelDelayedTasksOnShutdown}
is in effect.

@param command the task to execute
@param delay the time from now to delay execution
@param unit the time unit of the delay parameter
@return a ForkJoinTask implementing the ScheduledFuture
        interface, whose {@code get()} method will return
        {@code null} upon normal completion.
@throws RejectedExecutionException if the pool is shutdown or
        submission encounters resource exhaustion.
@throws NullPointerException if command or unit is null
@since 25

## ForkJoinPool.schedule(Callable<V>, long, TimeUnit)

```java
public <V> ScheduledFuture<V> schedule(Callable<V> callable, long delay, TimeUnit unit)
```

Submits a value-returning one-shot task that becomes enabled
after the given delay. At that point it will execute unless
explicitly cancelled, or fail to execute (eventually reporting
cancellation) when encountering resource exhaustion, or the
pool is {@link #shutdownNow}, or is {@link #shutdown} when
otherwise quiescent and {@link #cancelDelayedTasksOnShutdown}
is in effect.

@param callable the function to execute
@param delay the time from now to delay execution
@param unit the time unit of the delay parameter
@param <V> the type of the callable's result
@return a ForkJoinTask implementing the ScheduledFuture
        interface, whose {@code get()} method will return the
        value from the callable upon normal completion.
@throws RejectedExecutionException if the pool is shutdown or
        submission encounters resource exhaustion.
@throws NullPointerException if command or unit is null
@since 25

## ForkJoinPool.scheduleAtFixedRate(Runnable, long, long, TimeUnit)

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
<li>Method {@link #shutdownNow} is called
<li>Method {@link #shutdown} is called and the pool is
otherwise quiescent, in which case existing executions continue
but subsequent executions do not.
<li>An execution or the task encounters resource exhaustion.
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
@param command the task to execute
@param initialDelay the time to delay first execution
@param period the period between successive executions
@param unit the time unit of the initialDelay and period parameters
@return a ForkJoinTask implementing the ScheduledFuture
        interface.  The future's {@link Future#get() get()}
        method will never return normally, and will throw an
        exception upon task cancellation or abnormal
        termination of a task execution.
@throws RejectedExecutionException if the pool is shutdown or
        submission encounters resource exhaustion.
@throws NullPointerException if command or unit is null
@throws IllegalArgumentException if period less than or equal to zero
@since 25

## ForkJoinPool.scheduleWithFixedDelay(Runnable, long, long, TimeUnit)

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
<li>Method {@link #shutdownNow} is called
<li>Method {@link #shutdown} is called and the pool is
otherwise quiescent, in which case existing executions continue
but subsequent executions do not.
<li>An execution or the task encounters resource exhaustion.
<li>An execution of the task throws an exception.  In this case
calling {@link Future#get() get} on the returned future will throw
{@link ExecutionException}, holding the exception as its cause.
</ul>
Subsequent executions are suppressed.  Subsequent calls to
{@link Future#isDone isDone()} on the returned future will
return {@code true}.
@param command the task to execute
@param initialDelay the time to delay first execution
@param delay the delay between the termination of one
execution and the commencement of the next
@param unit the time unit of the initialDelay and delay parameters
@return a ForkJoinTask implementing the ScheduledFuture
        interface.  The future's {@link Future#get() get()}
        method will never return normally, and will throw an
        exception upon task cancellation or abnormal
        termination of a task execution.
@throws RejectedExecutionException if the pool is shutdown or
        submission encounters resource exhaustion.
@throws NullPointerException if command or unit is null
@throws IllegalArgumentException if delay less than or equal to zero
@since 25

## ForkJoinPool.submitWithTimeout(Callable<V>, long, TimeUnit, Consumer<? super ForkJoinTask<V>>)

```java
public <V> ForkJoinTask<V> submitWithTimeout(Callable<V> callable, long timeout, TimeUnit unit, Consumer<? super ForkJoinTask<V>> timeoutAction)
```

Submits a task executing the given function, cancelling the
task or performing a given timeoutAction if not completed
within the given timeout period. If the optional {@code
timeoutAction} is null, the task is cancelled (via {@code
cancel(true)}.  Otherwise, the action is applied and the task
may be interrupted if running. Actions may include {@link
ForkJoinTask#complete} to set a replacement value or {@link
ForkJoinTask#completeExceptionally} to throw an appropriate
exception. Note that these can succeed only if the task has
not already completed when the timeoutAction executes.

@param callable the function to execute
@param <V> the type of the callable's result
@param timeout the time to wait before cancelling if not completed
@param timeoutAction if nonnull, an action to perform on
       timeout, otherwise the default action is to cancel using
       {@code cancel(true)}.
@param unit the time unit of the timeout parameter
@return a Future that can be used to extract result or cancel
@throws RejectedExecutionException if the task cannot be
        scheduled for execution
@throws NullPointerException if callable or unit is null
@since 25

## ForkJoinPool.cancelDelayedTasksOnShutdown()

```java
public void cancelDelayedTasksOnShutdown()
```

Arranges that scheduled tasks that are not executing and have
not already been enabled for execution will not be executed and
will be cancelled upon {@link #shutdown} (unless this pool is
the {@link #commonPool()} which never shuts down). This method
may be invoked either before {@link #shutdown} to take effect
upon the next call, or afterwards to cancel such tasks, which
may then allow termination. Note that subsequent executions of
periodic tasks are always disabled upon shutdown, so this
method applies meaningfully only to non-periodic tasks.
@since 25

## ForkJoinPool.getFactory()

```java
public ForkJoinWorkerThreadFactory getFactory()
```

Returns the factory used for constructing new workers.

@return the factory used for constructing new workers

## ForkJoinPool.getUncaughtExceptionHandler()

```java
public UncaughtExceptionHandler getUncaughtExceptionHandler()
```

Returns the handler for internal worker threads that terminate
due to unrecoverable errors encountered while executing tasks.

@return the handler, or {@code null} if none

## ForkJoinPool.getParallelism()

```java
public int getParallelism()
```

Returns the targeted parallelism level of this pool.

@return the targeted parallelism level of this pool

## ForkJoinPool.getCommonPoolParallelism()

```java
public static int getCommonPoolParallelism()
```

Returns the targeted parallelism level of the common pool.

@return the targeted parallelism level of the common pool
@since 1.8

## ForkJoinPool.getPoolSize()

```java
public int getPoolSize()
```

Returns the number of worker threads that have started but not
yet terminated.  The result returned by this method may differ
from {@link #getParallelism} when threads are created to
maintain parallelism when others are cooperatively blocked.

@return the number of worker threads

## ForkJoinPool.getAsyncMode()

```java
public boolean getAsyncMode()
```

Returns {@code true} if this pool uses local first-in-first-out
scheduling mode for forked tasks that are never joined.

@return {@code true} if this pool uses async mode

## ForkJoinPool.getRunningThreadCount()

```java
public int getRunningThreadCount()
```

Returns an estimate of the number of worker threads that are
not blocked waiting to join tasks or for other managed
synchronization. This method may overestimate the
number of running threads.

@return the number of worker threads

## ForkJoinPool.getActiveThreadCount()

```java
public int getActiveThreadCount()
```

Returns an estimate of the number of threads that are currently
stealing or executing tasks. This method may overestimate the
number of active threads.

@return the number of active threads

## ForkJoinPool.isQuiescent()

```java
public boolean isQuiescent()
```

Returns {@code true} if all worker threads are currently idle.
An idle worker is one that cannot obtain a task to execute
because none are available to steal from other threads, and
there are no pending submissions to the pool. This method is
conservative; it might not return {@code true} immediately upon
idleness of all threads, but will eventually become true if
threads remain inactive.

@return {@code true} if all threads are currently idle

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

@return the number of steals

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
separately by method {@link getDelayedTaskCount}.

@return the number of queued tasks
@see ForkJoinWorkerThread#getQueuedTaskCount()

## ForkJoinPool.getQueuedSubmissionCount()

```java
public int getQueuedSubmissionCount()
```

Returns an estimate of the number of tasks submitted to this
pool that have not yet begun executing.  This method may take
time proportional to the number of submissions.

@return the number of queued submissions

## ForkJoinPool.getDelayedTaskCount()

```java
public long getDelayedTaskCount()
```

Returns an estimate of the number of delayed (including
periodic) tasks scheduled in this pool that are not yet ready
to submit for execution. The returned value is inaccurate while
delayed tasks are being processed.

@return an estimate of the number of delayed tasks
@since 25

## ForkJoinPool.hasQueuedSubmissions()

```java
public boolean hasQueuedSubmissions()
```

Returns {@code true} if there are any tasks submitted to this
pool that have not yet begun executing.

@return {@code true} if there are any queued submissions

## ForkJoinPool.pollSubmission()

```java
protected ForkJoinTask<?> pollSubmission()
```

Removes and returns the next unexecuted submission if one is
available.  This method may be useful in extensions to this
class that re-assign work in systems with multiple pools.

@return the next submission, or {@code null} if none

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
to collection {@code c} may result in elements being in
neither, either or both collections when the associated
exception is thrown.  The behavior of this operation is
undefined if the specified collection is modified while the
operation is in progress.

@param c the collection to transfer elements into
@return the number of elements transferred

## ForkJoinPool.toString()

```java
public String toString()
```

Returns a string identifying this pool, as well as its state,
including indications of run state, parallelism level, and
worker and task counts.

@return a string identifying this pool, as well as its state

## ForkJoinPool.shutdown()

```java
public void shutdown()
```

Possibly initiates an orderly shutdown in which previously
submitted tasks are executed, but no new tasks will be
accepted. Invocation has no effect on execution state if this
is the {@link #commonPool()}, and no additional effect if
already shut down.  Tasks that are in the process of being
submitted concurrently during the course of this method may or
may not be rejected.

## ForkJoinPool.shutdownNow()

```java
public List<Runnable> shutdownNow()
```

Possibly attempts to cancel and/or stop all tasks, and reject
all subsequently submitted tasks.  Invocation has no effect on
execution state if this is the {@link #commonPool()}, and no
additional effect if already shut down. Otherwise, tasks that
are in the process of being submitted or executed concurrently
during the course of this method may or may not be
rejected. This method cancels both existing and unexecuted
tasks, in order to permit termination in the presence of task
dependencies. So the method always returns an empty list
(unlike the case for some other Executors).

@return an empty list

## ForkJoinPool.isTerminated()

```java
public boolean isTerminated()
```

Returns {@code true} if all tasks have completed following shut down.

@return {@code true} if all tasks have completed following shut down

## ForkJoinPool.isTerminating()

```java
public boolean isTerminating()
```

Returns {@code true} if the process of termination has
commenced but not yet completed.  This method may be useful for
debugging. A return of {@code true} reported a sufficient
period after shutdown may indicate that submitted tasks have
ignored or suppressed interruption, or are waiting for I/O,
causing this executor not to properly terminate. (See the
advisory notes for class {@link ForkJoinTask} stating that
tasks should not normally entail blocking operations.  But if
they do, they must abort them on interrupt.)

@return {@code true} if terminating but not yet terminated

## ForkJoinPool.isShutdown()

```java
public boolean isShutdown()
```

Returns {@code true} if this pool has been shut down.

@return {@code true} if this pool has been shut down

## ForkJoinPool.awaitTermination(long, TimeUnit)

```java
public boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException
```

Blocks until all tasks have completed execution after a
shutdown request, or the timeout occurs, or the current thread
is interrupted, whichever happens first. Because the {@link
#commonPool()} never terminates until program shutdown, when
applied to the common pool, this method is equivalent to {@link
#awaitQuiescence(long, TimeUnit)} but always returns {@code false}.

@param timeout the maximum time to wait
@param unit the time unit of the timeout argument
@return {@code true} if this executor terminated and
        {@code false} if the timeout elapsed before termination
@throws InterruptedException if interrupted while waiting

## ForkJoinPool.awaitQuiescence(long, TimeUnit)

```java
public boolean awaitQuiescence(long timeout, TimeUnit unit)
```

If called by a ForkJoinTask operating in this pool, equivalent
in effect to {@link ForkJoinTask#helpQuiesce}. Otherwise,
waits and/or attempts to assist performing tasks until this
pool {@link #isQuiescent} or the indicated timeout elapses.

@param timeout the maximum time to wait
@param unit the time unit of the timeout argument
@return {@code true} if quiescent; {@code false} if the
timeout elapsed.

## ForkJoinPool.close()

```java
public void close()
```

Unless this is the {@link #commonPool()}, initiates an orderly
shutdown in which previously submitted tasks are executed, but
no new tasks will be accepted, and waits until all tasks have
completed execution and the executor has terminated.

<p> If already terminated, or this is the {@link
#commonPool()}, this method has no effect on execution, and
does not wait. Otherwise, if interrupted while waiting, this
method stops all executing tasks as if by invoking {@link
#shutdownNow()}. It then continues to wait until all actively
executing tasks have completed. Tasks that were awaiting
execution are not executed. The interrupt status will be
re-asserted before this method returns.

@since 19

## ForkJoinPool.managedBlock(ManagedBlocker)

```java
public static void managedBlock(ManagedBlocker blocker) throws InterruptedException
```

Runs the given possibly blocking task.  When {@linkplain
ForkJoinTask#inForkJoinPool() running in a ForkJoinPool}, this
method possibly arranges for a spare thread to be activated if
necessary to ensure sufficient parallelism while the current
thread is blocked in {@link ManagedBlocker#block blocker.block()}.

<p>This method repeatedly calls {@code blocker.isReleasable()} and
{@code blocker.block()} until either method returns {@code true}.
Every call to {@code blocker.block()} is preceded by a call to
{@code blocker.isReleasable()} that returned {@code false}.

<p>If not running in a ForkJoinPool, this method is
behaviorally equivalent to
<pre> {@code
while (!blocker.isReleasable())
  if (blocker.block())
    break;}</pre>

If running in a ForkJoinPool, the pool may first be expanded to
ensure sufficient parallelism available during the call to
{@code blocker.block()}.

@param blocker the blocker task
@throws InterruptedException if {@code blocker.block()} did so