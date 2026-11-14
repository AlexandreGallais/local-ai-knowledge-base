---
title: "ForkJoinWorkerThread class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ForkJoinWorkerThread.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ForkJoinWorkerThread class (java.util.concurrent)

```java
public class ForkJoinWorkerThread extends Thread
```

A thread managed by a `ForkJoinPool`, which executes
`ForkJoinTask`s.
This class is subclassable solely for the sake of adding
functionality -- there are no overridable methods dealing with
scheduling or execution.  However, you can override initialization
and termination methods surrounding the main task processing loop.
If you do create such a subclass, you will also need to supply a
custom `ForkJoinPool.ForkJoinWorkerThreadFactory` to
ForkJoinWorkerThreadFactory, UncaughtExceptionHandler, boolean, int, int, int, Predicate, long, TimeUnit) use it in a `ForkJoinPool`.

**Since:** 1.7

## ForkJoinWorkerThread.ForkJoinWorkerThread(ThreadGroup, ForkJoinPool, boolean)

```java
protected ForkJoinWorkerThread(ThreadGroup group, ForkJoinPool pool, boolean preserveThreadLocals)
```

Creates a ForkJoinWorkerThread operating in the given thread group and
pool, and with the given policy for preserving ThreadLocals.

Parameters:

- `group`: if non-null, the thread group for this thread. Otherwise, the thread group is set to the current thread's thread group.
- `pool`: the pool this thread works in
- `preserveThreadLocals`: if true, always preserve the values of ThreadLocal variables across tasks; otherwise they may be cleared.

**Since:** 19

Throws:

- `NullPointerException`: if pool is null

## ForkJoinWorkerThread.ForkJoinWorkerThread(ForkJoinPool)

```java
protected ForkJoinWorkerThread(ForkJoinPool pool)
```

Creates a ForkJoinWorkerThread operating in the given pool.

Parameters:

- `pool`: the pool this thread works in

Throws:

- `NullPointerException`: if pool is null

## ForkJoinWorkerThread.getPool()

```java
public ForkJoinPool getPool()
```

Returns the pool hosting this thread.

**Returns:** the pool

## ForkJoinWorkerThread.getPoolIndex()

```java
public int getPoolIndex()
```

Returns the unique index number of this thread in its pool.
The returned value ranges from zero to the maximum number of
threads (minus one) that may exist in the pool, and does not
change during the lifetime of the thread.  This method may be
useful for applications that track status or collect results
per-worker-thread rather than per-task.

**Returns:** the index number

## ForkJoinWorkerThread.getQueuedTaskCount()

```java
public int getQueuedTaskCount()
```

**Since:** 20

**See also:** ForkJoinPool#getQueuedTaskCount()

## ForkJoinWorkerThread.onStart()

```java
protected void onStart()
```

Initializes internal state after construction but before
processing any tasks. If you override this method, you must
invoke `super.onStart()` at the beginning of the method.
Initialization requires care: Most fields must have legal
default values, to ensure that attempted accesses from other
threads work correctly even before this thread starts
processing tasks.

## ForkJoinWorkerThread.onTermination(Throwable)

```java
protected void onTermination(Throwable exception)
```

Performs cleanup associated with termination of this worker
thread.  If you override this method, you must invoke
`super.onTermination` at the end of the overridden method.

Parameters:

- `exception`: the exception causing this thread to abort due to an unrecoverable error, or `null` if completed normally

## ForkJoinWorkerThread.run()

```java
public void run()
```

This method is required to be public, but should never be
called explicitly. It performs the main run loop to execute
`ForkJoinTask`s.
