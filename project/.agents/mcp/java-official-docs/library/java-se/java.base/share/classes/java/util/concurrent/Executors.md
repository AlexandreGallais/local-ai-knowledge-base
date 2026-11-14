# Executors class (java.util.concurrent)

```java
public final class Executors
```

Factory and utility methods for {@link Executor}, {@link
ExecutorService}, {@link ScheduledExecutorService}, {@link
ThreadFactory}, and {@link Callable} classes defined in this
package. This class supports the following kinds of methods:

<ul>
  <li>Methods that create and return an {@link ExecutorService}
      set up with commonly useful configuration settings.
  <li>Methods that create and return a {@link ScheduledExecutorService}
      set up with commonly useful configuration settings.
  <li>Methods that create and return a "wrapped" ExecutorService, that
      disables reconfiguration by making implementation-specific methods
      inaccessible.
  <li>Methods that create and return a {@link ThreadFactory}
      that sets newly created threads to a known state.
  <li>Methods that create and return a {@link Callable}
      out of other closure-like forms, so they can be used
      in execution methods requiring {@code Callable}.
</ul>

@since 1.5
@author Doug Lea

## Executors.newFixedThreadPool(int)

```java
public static ExecutorService newFixedThreadPool(int nThreads)
```

Creates a thread pool that reuses a fixed number of threads
operating off a shared unbounded queue.  At any point, at most
{@code nThreads} threads will be active processing tasks.
If additional tasks are submitted when all threads are active,
they will wait in the queue until a thread is available.
If any thread terminates due to a failure during execution
prior to shutdown, a new one will take its place if needed to
execute subsequent tasks.  The threads in the pool will exist
until it is explicitly {@link ExecutorService#shutdown shutdown}.

@param nThreads the number of threads in the pool
@return the newly created thread pool
@throws IllegalArgumentException if {@code nThreads <= 0}

## Executors.newWorkStealingPool(int)

```java
public static ExecutorService newWorkStealingPool(int parallelism)
```

Creates a thread pool that maintains enough threads to support
the given parallelism level, and may use multiple queues to
reduce contention. The parallelism level corresponds to the
maximum number of threads actively engaged in, or available to
engage in, task processing. The actual number of threads may
grow and shrink dynamically. A work-stealing pool makes no
guarantees about the order in which submitted tasks are
executed.

@param parallelism the targeted parallelism level
@return the newly created thread pool
@throws IllegalArgumentException if {@code parallelism <= 0}
@since 1.8

## Executors.newWorkStealingPool()

```java
public static ExecutorService newWorkStealingPool()
```

Creates a work-stealing thread pool using the number of
{@linkplain Runtime#availableProcessors available processors}
as its target parallelism level.

@return the newly created thread pool
@see #newWorkStealingPool(int)
@since 1.8

## Executors.newFixedThreadPool(int, ThreadFactory)

```java
public static ExecutorService newFixedThreadPool(int nThreads, ThreadFactory threadFactory)
```

Creates a thread pool that reuses a fixed number of threads
operating off a shared unbounded queue, using the provided
ThreadFactory to create new threads when needed.  At any point,
at most {@code nThreads} threads will be active processing
tasks.  If additional tasks are submitted when all threads are
active, they will wait in the queue until a thread is
available.  If any thread terminates due to a failure during
execution prior to shutdown, a new one will take its place if
needed to execute subsequent tasks.  The threads in the pool will
exist until it is explicitly {@link ExecutorService#shutdown
shutdown}.

@param nThreads the number of threads in the pool
@param threadFactory the factory to use when creating new threads
@return the newly created thread pool
@throws NullPointerException if threadFactory is null
@throws IllegalArgumentException if {@code nThreads <= 0}

## Executors.newSingleThreadExecutor()

```java
public static ExecutorService newSingleThreadExecutor()
```

Creates an Executor that uses a single worker thread operating
off an unbounded queue. (Note however that if this single
thread terminates due to a failure during execution prior to
shutdown, a new one will take its place if needed to execute
subsequent tasks.)  Tasks are guaranteed to execute
sequentially, and no more than one task will be active at any
given time. Unlike the otherwise equivalent
{@code newFixedThreadPool(1)} the returned executor is
guaranteed not to be reconfigurable to use additional threads.

@return the newly created single-threaded Executor

## Executors.newSingleThreadExecutor(ThreadFactory)

```java
public static ExecutorService newSingleThreadExecutor(ThreadFactory threadFactory)
```

Creates an Executor that uses a single worker thread operating
off an unbounded queue, and uses the provided ThreadFactory to
create a new thread when needed. Unlike the otherwise
equivalent {@code newFixedThreadPool(1, threadFactory)} the
returned executor is guaranteed not to be reconfigurable to use
additional threads.

@param threadFactory the factory to use when creating new threads
@return the newly created single-threaded Executor
@throws NullPointerException if threadFactory is null

## Executors.newCachedThreadPool()

```java
public static ExecutorService newCachedThreadPool()
```

Creates a thread pool that creates new threads as needed, but
will reuse previously constructed threads when they are
available.  These pools will typically improve the performance
of programs that execute many short-lived asynchronous tasks.
Calls to {@code execute} will reuse previously constructed
threads if available. If no existing thread is available, a new
thread will be created and added to the pool. Threads that have
not been used for sixty seconds are terminated and removed from
the cache. Thus, a pool that remains idle for long enough will
not consume any resources. Note that pools with similar
properties but different details (for example, timeout parameters)
may be created using {@link ThreadPoolExecutor} constructors.

@return the newly created thread pool

## Executors.newCachedThreadPool(ThreadFactory)

```java
public static ExecutorService newCachedThreadPool(ThreadFactory threadFactory)
```

Creates a thread pool that creates new threads as needed, but
will reuse previously constructed threads when they are
available, and uses the provided
ThreadFactory to create new threads when needed.

@param threadFactory the factory to use when creating new threads
@return the newly created thread pool
@throws NullPointerException if threadFactory is null

## Executors.newThreadPerTaskExecutor(ThreadFactory)

```java
public static ExecutorService newThreadPerTaskExecutor(ThreadFactory threadFactory)
```

Creates an Executor that starts a new Thread for each task.
The number of threads created by the Executor is unbounded.

<p> Invoking {@link Future#cancel(boolean) cancel(true)} on a {@link
Future Future} representing the pending result of a task submitted to
the Executor will {@link Thread#interrupt() interrupt} the thread
executing the task.

@param threadFactory the factory to use when creating new threads
@return a new executor that creates a new Thread for each task
@throws NullPointerException if threadFactory is null
@since 21

## Executors.newVirtualThreadPerTaskExecutor()

```java
public static ExecutorService newVirtualThreadPerTaskExecutor()
```

Creates an Executor that starts a new virtual Thread for each task.
The number of threads created by the Executor is unbounded.

<p> This method is equivalent to invoking
{@link #newThreadPerTaskExecutor(ThreadFactory)} with a thread factory
that creates virtual threads.

@return a new executor that creates a new virtual Thread for each task
@since 21

## Executors.newSingleThreadScheduledExecutor()

```java
public static ScheduledExecutorService newSingleThreadScheduledExecutor()
```

Creates a single-threaded executor that can schedule commands
to run after a given delay, or to execute periodically.
(Note however that if this single
thread terminates due to a failure during execution prior to
shutdown, a new one will take its place if needed to execute
subsequent tasks.)  Tasks are guaranteed to execute
sequentially, and no more than one task will be active at any
given time. Unlike the otherwise equivalent
{@code newScheduledThreadPool(1)} the returned executor is
guaranteed not to be reconfigurable to use additional threads.

@return the newly created scheduled executor

## Executors.newSingleThreadScheduledExecutor(ThreadFactory)

```java
public static ScheduledExecutorService newSingleThreadScheduledExecutor(ThreadFactory threadFactory)
```

Creates a single-threaded executor that can schedule commands
to run after a given delay, or to execute periodically.  (Note
however that if this single thread terminates due to a failure
during execution prior to shutdown, a new one will take its
place if needed to execute subsequent tasks.)  Tasks are
guaranteed to execute sequentially, and no more than one task
will be active at any given time. Unlike the otherwise
equivalent {@code newScheduledThreadPool(1, threadFactory)}
the returned executor is guaranteed not to be reconfigurable to
use additional threads.

@param threadFactory the factory to use when creating new threads
@return the newly created scheduled executor
@throws NullPointerException if threadFactory is null

## Executors.newScheduledThreadPool(int)

```java
public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize)
```

Creates a thread pool that can schedule commands to run after a
given delay, or to execute periodically.
@param corePoolSize the number of threads to keep in the pool,
even if they are idle
@return the newly created scheduled thread pool
@throws IllegalArgumentException if {@code corePoolSize < 0}

## Executors.newScheduledThreadPool(int, ThreadFactory)

```java
public static ScheduledExecutorService newScheduledThreadPool( int corePoolSize, ThreadFactory threadFactory)
```

Creates a thread pool that can schedule commands to run after a
given delay, or to execute periodically.
@param corePoolSize the number of threads to keep in the pool,
even if they are idle
@param threadFactory the factory to use when the executor
creates a new thread
@return the newly created scheduled thread pool
@throws IllegalArgumentException if {@code corePoolSize < 0}
@throws NullPointerException if threadFactory is null

## Executors.unconfigurableExecutorService(ExecutorService)

```java
public static ExecutorService unconfigurableExecutorService(ExecutorService executor)
```

Returns an object that delegates all defined {@link
ExecutorService} methods to the given executor, but not any
other methods that might otherwise be accessible using
casts. This provides a way to safely "freeze" configuration and
disallow tuning of a given concrete implementation.
@param executor the underlying implementation
@return an {@code ExecutorService} instance
@throws NullPointerException if executor null

## Executors.unconfigurableScheduledExecutorService(ScheduledExecutorService)

```java
public static ScheduledExecutorService unconfigurableScheduledExecutorService(ScheduledExecutorService executor)
```

Returns an object that delegates all defined {@link
ScheduledExecutorService} methods to the given executor, but
not any other methods that might otherwise be accessible using
casts. This provides a way to safely "freeze" configuration and
disallow tuning of a given concrete implementation.
@param executor the underlying implementation
@return a {@code ScheduledExecutorService} instance
@throws NullPointerException if executor null

## Executors.defaultThreadFactory()

```java
public static ThreadFactory defaultThreadFactory()
```

Returns a default thread factory used to create new threads.
This factory creates all new threads used by an Executor in the
same {@link ThreadGroup}. It uses the group of the thread
invoking this {@code defaultThreadFactory} method. Each new
thread is created as a non-daemon thread with priority set to
the smaller of {@code Thread.NORM_PRIORITY} and the maximum
priority permitted in the thread group.  New threads have names
accessible via {@link Thread#getName} of
<em>pool-N-thread-M</em>, where <em>N</em> is the sequence
number of this factory, and <em>M</em> is the sequence number
of the thread created by this factory.
@return a thread factory

## Executors.privilegedThreadFactory()

```java
public static ThreadFactory privilegedThreadFactory()
```

Returns a thread factory used to create new threads that have
the current context class loader as the context class loader.

This factory creates threads with the same settings as {@link
Executors#defaultThreadFactory}, additionally setting the
contextClassLoader of new threads to
be the same as the thread invoking this
{@code privilegedThreadFactory} method.

<p>Note that while tasks running within such threads will have the
same class loader as the current thread, they need not have the same
{@link ThreadLocal} or {@link InheritableThreadLocal} values. If
necessary, particular values of thread locals can be set or reset
before any task runs in {@link ThreadPoolExecutor} subclasses using
{@link ThreadPoolExecutor#beforeExecute(Thread, Runnable)}.
Also, if it is necessary to initialize worker threads to have
the same InheritableThreadLocal settings as some other
designated thread, you can create a custom ThreadFactory in
which that thread waits for and services requests to create
others that will inherit its values.

@return a thread factory

@deprecated This method originally returned a thread factory that
      created new threads that had the same access control context
      as the current thread. Access control contexts were
      only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.

## Executors.callable(Runnable, T)

```java
public static <T> Callable<T> callable(Runnable task, T result)
```

Returns a {@link Callable} object that, when
called, runs the given task and returns the given result.  This
can be useful when applying methods requiring a
{@code Callable} to an otherwise resultless action.
@param task the task to run
@param result the result to return
@param <T> the type of the result
@return a callable object
@throws NullPointerException if task null

## Executors.callable(Runnable)

```java
public static Callable<Object> callable(Runnable task)
```

Returns a {@link Callable} object that, when
called, runs the given task and returns {@code null}.
@param task the task to run
@return a callable object
@throws NullPointerException if task null

## Executors.callable(PrivilegedAction<?>)

```java
public static Callable<Object> callable(final PrivilegedAction<?> action)
```

Returns a {@link Callable} object that, when
called, runs the given privileged action and returns its result.
@param action the privileged action to run
@return a callable object
@throws NullPointerException if action null

## Executors.callable(PrivilegedExceptionAction<?>)

```java
public static Callable<Object> callable(final PrivilegedExceptionAction<?> action)
```

Returns a {@link Callable} object that, when
called, runs the given privileged exception action and returns
its result.
@param action the privileged exception action to run
@return a callable object
@throws NullPointerException if action null

## Executors.privilegedCallable(Callable<T>)

```java
public static <T> Callable<T> privilegedCallable(Callable<T> callable)
```

Returns a {@link Callable} object that will, when called,
execute the given {@code callable} and return its result.

@param callable the underlying task
@param <T> the type of the callable's result
@return a callable object
@throws NullPointerException if callable null

@deprecated This method originally returned a {@code Callable} object
      that when called, executed the given {@code callable} under the
      current access control context. Access control contexts were
      only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.

## Executors.privilegedCallableUsingCurrentClassLoader(Callable<T>)

```java
public static <T> Callable<T> privilegedCallableUsingCurrentClassLoader(Callable<T> callable)
```

Returns a {@link Callable} object that will, when called,
execute the given {@code callable} with the current context
class loader as the context class loader.

@param callable the underlying task
@param <T> the type of the callable's result
@return a callable object
@throws NullPointerException if callable null

@deprecated This method originally returned a {@code Callable} object
      that when called, executed the given {@code callable} under the
      current access control context, with the current context class
      loader as the context class loader. Access control contexts were
      only useful in conjunction with
      {@linkplain SecurityManager the Security Manager}, which is no
      longer supported. There is no replacement for the Security Manager
      or this method.