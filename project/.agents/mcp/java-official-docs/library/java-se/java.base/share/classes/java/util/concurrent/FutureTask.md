---
title: "FutureTask class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/FutureTask.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FutureTask class (java.util.concurrent)

```java
public class FutureTask<V> implements RunnableFuture<V>
```

A cancellable asynchronous computation.  This class provides a base
implementation of `Future`, with methods to start and cancel
a computation, query to see if the computation is complete, and
retrieve the result of the computation.  The result can only be
retrieved when the computation has completed; the `get`
methods will block if the computation has not yet completed.  Once
the computation has completed, the computation cannot be restarted
or cancelled (unless the computation is invoked using
`runAndReset`).

A `FutureTask` can be used to wrap a `Callable` or
`Runnable` object.  Because `FutureTask` implements
`Runnable`, a `FutureTask` can be submitted to an
`Executor` for execution.

In addition to serving as a standalone class, this class provides
`protected` functionality that may be useful when creating
customized task classes.

Parameters:

- `<V>`: The result type returned by this FutureTask's `get` methods

**Since:** 1.5

## FutureTask.FutureTask(Callable<V>)

```java
public FutureTask(Callable<V> callable)
```

Creates a `FutureTask` that will, upon running, execute the
given `Callable`.

Parameters:

- `callable`: the callable task

Throws:

- `NullPointerException`: if the callable is null

## FutureTask.FutureTask(Runnable, V)

```java
public FutureTask(Runnable runnable, V result)
```

Creates a `FutureTask` that will, upon running, execute the
given `Runnable`, and arrange that `get` will return the
given result on successful completion.

Parameters:

- `runnable`: the runnable task
- `result`: the result to return on successful completion. If you don't need a particular result, consider using constructions of the form: `Future<?> f = new FutureTask<Void>(runnable, null)`

Throws:

- `NullPointerException`: if the runnable is null

## FutureTask.get()

```java
public V get() throws InterruptedException, ExecutionException
```

Throws:

- `CancellationException`: (inherited documentation)

## FutureTask.get(long, TimeUnit)

```java
public V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

Throws:

- `CancellationException`: (inherited documentation)

## FutureTask.resultNow()

```java
public V resultNow()
```

**Since:** 19

## FutureTask.exceptionNow()

```java
public Throwable exceptionNow()
```

**Since:** 19

## FutureTask.state()

```java
public State state()
```

**Since:** 19

## FutureTask.done()

```java
protected void done()
```

Protected method invoked when this task transitions to state
`isDone` (whether normally or via cancellation). The
default implementation does nothing.  Subclasses may override
this method to invoke completion callbacks or perform
bookkeeping. Note that you can query status inside the
implementation of this method to determine whether this task
has been cancelled.

## FutureTask.set(V)

```java
protected void set(V v)
```

Sets the result of this future to the given value unless
this future has already been set or has been cancelled.

This method is invoked internally by the `run` method
upon successful completion of the computation.

Parameters:

- `v`: the value

## FutureTask.setException(Throwable)

```java
protected void setException(Throwable t)
```

Causes this future to report an `ExecutionException`
with the given throwable as its cause, unless this future has
already been set or has been cancelled.

This method is invoked internally by the `run` method
upon failure of the computation.

Parameters:

- `t`: the cause of failure

## FutureTask.runAndReset()

```java
protected boolean runAndReset()
```

Executes the computation without setting its result, and then
resets this future to initial state, failing to do so if the
computation encounters an exception or is cancelled.  This is
designed for use with tasks that intrinsically execute more
than once.

**Returns:** `true` if successfully run and reset

## FutureTask.toString()

```java
public String toString()
```

Returns a string representation of this FutureTask.

**Implementation requirements:** The default implementation returns a string identifying this
FutureTask, as well as its completion state.  The state, in
brackets, contains one of the strings `"Completed Normally"`,
`"Completed Exceptionally"`, `"Cancelled"`, or `"Not completed"`.

**Returns:** a string representation of this FutureTask
