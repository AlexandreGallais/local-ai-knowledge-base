---
title: "ThreadPoolExecutor class (java.util.concurrent) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ThreadPoolExecutor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadPoolExecutor class (java.util.concurrent)

```java
public class ThreadPoolExecutor extends AbstractExecutorService
```

An `ExecutorService` that executes each submitted task using
one of possibly several pooled threads, normally configured
using `Executors` factory methods.

Thread pools address two different problems: they usually
provide improved performance when executing large numbers of
asynchronous tasks, due to reduced per-task invocation overhead,
and they provide a means of bounding and managing the resources,
including threads, consumed when executing a collection of tasks.
Each `ThreadPoolExecutor` also maintains some basic
statistics, such as the number of completed tasks.

To be useful across a wide range of contexts, this class
provides many adjustable parameters and extensibility
hooks. However, programmers are urged to use the more convenient
`Executors` factory methods `Executors.newCachedThreadPool` (unbounded thread pool, with
automatic thread reclamation), `Executors.newFixedThreadPool`
(fixed size thread pool) and `Executors.newSingleThreadExecutor` (single background thread), that
preconfigure settings for the most common usage
scenarios. Otherwise, use the following guide when manually
configuring and tuning this class:

Core and maximum pool sizes

A `ThreadPoolExecutor` will automatically adjust the
pool size (see `getPoolSize`)
according to the bounds set by
corePoolSize (see `getCorePoolSize`) and
maximumPoolSize (see `getMaximumPoolSize`).

When a new task is submitted in method `execute(Runnable)`,
if fewer than corePoolSize threads are running, a new thread is
created to handle the request, even if other worker threads are
idle.  Else if fewer than maximumPoolSize threads are running, a
new thread will be created to handle the request only if the queue
is full.  By setting corePoolSize and maximumPoolSize the same, you
create a fixed-size thread pool. By setting maximumPoolSize to an
essentially unbounded value such as `Integer.MAX_VALUE`, you
allow the pool to accommodate an arbitrary number of concurrent
tasks. Most typically, core and maximum pool sizes are set only
upon construction, but they may also be changed dynamically using
`setCorePoolSize` and `setMaximumPoolSize`.

On-demand construction

By default, even core threads are initially created and
started only when new tasks arrive, but this can be overridden
dynamically using method `prestartCoreThread` or `prestartAllCoreThreads`.  You probably want to prestart threads if
you construct the pool with a non-empty queue.

Creating new threads

New threads are created using a `ThreadFactory`.  If not
otherwise specified, a `Executors.defaultThreadFactory` is
used, that creates threads to all be in the same `ThreadGroup` and with the same `NORM_PRIORITY` priority and
non-daemon status. By supplying a different ThreadFactory, you can
alter the thread's name, thread group, priority, daemon status,
etc. If a `ThreadFactory` fails to create a thread when asked
by returning null from `newThread`, the executor will
continue, but might not be able to execute any tasks.

Keep-alive times

If the pool currently has more than corePoolSize threads,
excess threads will be terminated if they have been idle for more
than the keepAliveTime (see `getKeepAliveTime(TimeUnit)`).
This provides a means of reducing resource consumption when the
pool is not being actively used. If the pool becomes more active
later, new threads will be constructed. This parameter can also be
changed dynamically using method TimeUnit).  Using a value of `Long.MAX_VALUE` `TimeUnit.NANOSECONDS` effectively disables idle threads from ever
terminating prior to shut down. By default, the keep-alive policy
applies only when there are more than corePoolSize threads, but
method `allowCoreThreadTimeOut(boolean)` can be used to
apply this time-out policy to core threads as well, so long as the
keepAliveTime value is non-zero.

Queuing

Any `BlockingQueue` may be used to transfer and hold
submitted tasks.  The use of this queue interacts with pool sizing:

- If fewer than corePoolSize threads are running, the Executor
always prefers adding a new thread
rather than queuing.

- If corePoolSize or more threads are running, the Executor
always prefers queuing a request rather than adding a new
thread.

- If a request cannot be queued, a new thread is created unless
this would exceed maximumPoolSize, in which case, the task will be
rejected.

There are three general strategies for queuing:

- * Direct handoffs.* A good default choice for a work
queue is a `SynchronousQueue` that hands off tasks to threads
without otherwise holding them. Here, an attempt to queue a task
will fail if no threads are immediately available to run it, so a
new thread will be constructed. This policy avoids lockups when
handling sets of requests that might have internal dependencies.
Direct handoffs generally require unbounded maximumPoolSizes to
avoid rejection of new submitted tasks. This in turn admits the
possibility of unbounded thread growth when commands continue to
arrive on average faster than they can be processed.

- * Unbounded queues.* Using an unbounded queue (for
example a `LinkedBlockingQueue` without a predefined
capacity) will cause new tasks to wait in the queue when all
corePoolSize threads are busy. Thus, no more than corePoolSize
threads will ever be created. (And the value of the maximumPoolSize
therefore doesn't have any effect.)  This may be appropriate when
each task is completely independent of others, so tasks cannot
affect each others execution; for example, in a web page server.
While this style of queuing can be useful in smoothing out
transient bursts of requests, it admits the possibility of
unbounded work queue growth when commands continue to arrive on
average faster than they can be processed.

- *Bounded queues.* A bounded queue (for example, an
`ArrayBlockingQueue`) helps prevent resource exhaustion when
used with finite maximumPoolSizes, but can be more difficult to
tune and control.  Queue sizes and maximum pool sizes may be traded
off for each other: Using large queues and small pools minimizes
CPU usage, OS resources, and context-switching overhead, but can
lead to artificially low throughput.  If tasks frequently block (for
example if they are I/O bound), a system may be able to schedule
time for more threads than you otherwise allow. Use of small queues
generally requires larger pool sizes, which keeps CPUs busier but
may encounter unacceptable scheduling overhead, which also
decreases throughput.

Rejected tasks

New tasks submitted in method `execute(Runnable)` will be
*rejected* when the Executor has been shut down, and also when
the Executor uses finite bounds for both maximum threads and work queue
capacity, and is saturated.  In either case, the `execute` method
invokes the ThreadPoolExecutor)
method of its `RejectedExecutionHandler`.  Four predefined handler
policies are provided:

- In the default `ThreadPoolExecutor.AbortPolicy`, the handler
throws a runtime `RejectedExecutionException` upon rejection.

- In `ThreadPoolExecutor.CallerRunsPolicy`, the thread
that invokes `execute` itself runs the task. This provides a
simple feedback control mechanism that will slow down the rate that
new tasks are submitted.

- In `ThreadPoolExecutor.DiscardPolicy`, a task that cannot
be executed is simply dropped. This policy is designed only for
those rare cases in which task completion is never relied upon.

- In `ThreadPoolExecutor.DiscardOldestPolicy`, if the
executor is not shut down, the task at the head of the work queue
is dropped, and then execution is retried (which can fail again,
causing this to be repeated.) This policy is rarely acceptable.  In
nearly all cases, you should also cancel the task to cause an
exception in any component waiting for its completion, and/or log
the failure, as illustrated in `ThreadPoolExecutor.DiscardOldestPolicy` documentation.

It is possible to define and use other kinds of `RejectedExecutionHandler` classes. Doing so requires some care
especially when policies are designed to work only under particular
capacity or queuing policies.

Hook methods

This class provides `protected` overridable
Runnable) and
Throwable) methods that are called
before and after execution of each task.  These can be used to
manipulate the execution environment; for example, reinitializing
ThreadLocals, gathering statistics, or adding log entries.
Additionally, method `terminated` can be overridden to perform
any special processing that needs to be done once the Executor has
fully terminated.

If hook, callback, or BlockingQueue methods throw exceptions,
internal worker threads may in turn fail, abruptly terminate, and
possibly be replaced.

Queue maintenance

Method `getQueue()` allows access to the work queue
for purposes of monitoring and debugging.  Use of this method for
any other purpose is strongly discouraged.  Two supplied methods,
`remove(Runnable)` and `purge` are available to
assist in storage reclamation when large numbers of queued tasks
become cancelled.

Reclamation

A pool that is no longer referenced in a program *AND*
has no remaining threads may be reclaimed (garbage collected)
without being explicitly shutdown. You can configure a pool to
allow all unused threads to eventually die by setting appropriate
keep-alive times, using a lower bound of zero core threads and/or
setting `allowCoreThreadTimeOut(boolean)`.

**Extension example.** Most extensions of this class
override one or more of the protected hook methods. For example,
here is a subclass that adds a simple pause/resume feature:

```java
class PausableThreadPoolExecutor extends ThreadPoolExecutor {
  private boolean isPaused;
  private ReentrantLock pauseLock = new ReentrantLock();
  private Condition unpaused = pauseLock.newCondition();

  public PausableThreadPoolExecutor(...) { super(...); }

  protected void beforeExecute(Thread t, Runnable r) {
    super.beforeExecute(t, r);
    pauseLock.lock();
    try {
      while (isPaused) unpaused.await();
    } catch (InterruptedException ie) {
      t.interrupt();
    } finally {
      pauseLock.unlock();
    }
  }

  public void pause() {
    pauseLock.lock();
    try {
      isPaused = true;
    } finally {
      pauseLock.unlock();
    }
  }

  public void resume() {
    pauseLock.lock();
    try {
      isPaused = false;
      unpaused.signalAll();
    } finally {
      pauseLock.unlock();
    }
  }
}
```

**Since:** 1.5

## ThreadPoolExecutor.run()

```java
public void run()
```

Delegates main run loop to outer runWorker.

## ThreadPoolExecutor.ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>)

```java
public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue)
```

Creates a new `ThreadPoolExecutor` with the given initial
parameters, the
default thread factory
and the default rejected execution handler.

It may be more convenient to use one of the `Executors`
factory methods instead of this general purpose constructor.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `maximumPoolSize`: the maximum number of threads to allow in the pool
- `keepAliveTime`: when the number of threads is greater than the core, this is the maximum time that excess idle threads will wait for new tasks before terminating.
- `unit`: the time unit for the `keepAliveTime` argument
- `workQueue`: the queue to use for holding tasks before they are executed. This queue will hold only the `Runnable` tasks submitted by the `execute` method.

Throws:

- `IllegalArgumentException`: if one of the following holds:

 `corePoolSize < 0`

 `keepAliveTime < 0`

 `maximumPoolSize <= 0`

 `maximumPoolSize < corePoolSize`
- `NullPointerException`: if `workQueue` is null

## ThreadPoolExecutor.ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>, ThreadFactory)

```java
public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, ThreadFactory threadFactory)
```

Creates a new `ThreadPoolExecutor` with the given initial
parameters and the default rejected execution handler.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `maximumPoolSize`: the maximum number of threads to allow in the pool
- `keepAliveTime`: when the number of threads is greater than the core, this is the maximum time that excess idle threads will wait for new tasks before terminating.
- `unit`: the time unit for the `keepAliveTime` argument
- `workQueue`: the queue to use for holding tasks before they are executed. This queue will hold only the `Runnable` tasks submitted by the `execute` method.
- `threadFactory`: the factory to use when the executor creates a new thread

Throws:

- `IllegalArgumentException`: if one of the following holds:

 `corePoolSize < 0`

 `keepAliveTime < 0`

 `maximumPoolSize <= 0`

 `maximumPoolSize < corePoolSize`
- `NullPointerException`: if `workQueue` or `threadFactory` is null

## ThreadPoolExecutor.ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>, RejectedExecutionHandler)

```java
public ThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit, BlockingQueue<Runnable> workQueue, RejectedExecutionHandler handler)
```

Creates a new `ThreadPoolExecutor` with the given initial
parameters and the
default thread factory.

Parameters:

- `corePoolSize`: the number of threads to keep in the pool, even if they are idle, unless `allowCoreThreadTimeOut` is set
- `maximumPoolSize`: the maximum number of threads to allow in the pool
- `keepAliveTime`: when the number of threads is greater than the core, this is the maximum time that excess idle threads will wait for new tasks before terminating.
- `unit`: the time unit for the `keepAliveTime` argument
- `workQueue`: the queue to use for holding tasks before they are executed. This queue will hold only the `Runnable` tasks submitted by the `execute` method.
- `handler`: the handler to use when execution is blocked because the thread bounds and queue capacities are reached

Throws:

- `IllegalArgumentException`: if one of the following holds:

 `corePoolSize < 0`

 `keepAliveTime < 0`

 `maximumPoolSize <= 0`

 `maximumPoolSize < corePoolSize`
- `NullPointerException`: if `workQueue` or `handler` is null
