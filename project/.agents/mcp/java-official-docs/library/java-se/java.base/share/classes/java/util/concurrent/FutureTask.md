# FutureTask class (java.util.concurrent)

```java
public class FutureTask<V> implements RunnableFuture<V>
```

A cancellable asynchronous computation.  This class provides a base
implementation of {@link Future}, with methods to start and cancel
a computation, query to see if the computation is complete, and
retrieve the result of the computation.  The result can only be
retrieved when the computation has completed; the {@code get}
methods will block if the computation has not yet completed.  Once
the computation has completed, the computation cannot be restarted
or cancelled (unless the computation is invoked using
{@link #runAndReset}).

<p>A {@code FutureTask} can be used to wrap a {@link Callable} or
{@link Runnable} object.  Because {@code FutureTask} implements
{@code Runnable}, a {@code FutureTask} can be submitted to an
{@link Executor} for execution.

<p>In addition to serving as a standalone class, this class provides
{@code protected} functionality that may be useful when creating
customized task classes.

@since 1.5
@author Doug Lea
@param <V> The result type returned by this FutureTask's {@code get} methods

## FutureTask.FutureTask(Callable<V>)

```java
public FutureTask(Callable<V> callable)
```

Creates a {@code FutureTask} that will, upon running, execute the
given {@code Callable}.

@param  callable the callable task
@throws NullPointerException if the callable is null

## FutureTask.FutureTask(Runnable, V)

```java
public FutureTask(Runnable runnable, V result)
```

Creates a {@code FutureTask} that will, upon running, execute the
given {@code Runnable}, and arrange that {@code get} will return the
given result on successful completion.

@param runnable the runnable task
@param result the result to return on successful completion. If
you don't need a particular result, consider using
constructions of the form:
{@code Future<?> f = new FutureTask<Void>(runnable, null)}
@throws NullPointerException if the runnable is null

## FutureTask.get()

```java
public V get() throws InterruptedException, ExecutionException
```

@throws CancellationException {@inheritDoc}

## FutureTask.get(long, TimeUnit)

```java
public V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

@throws CancellationException {@inheritDoc}

## FutureTask.resultNow()

```java
public V resultNow()
```

@since 19

## FutureTask.exceptionNow()

```java
public Throwable exceptionNow()
```

@since 19

## FutureTask.state()

```java
public State state()
```

@since 19

## FutureTask.done()

```java
protected void done()
```

Protected method invoked when this task transitions to state
{@code isDone} (whether normally or via cancellation). The
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

<p>This method is invoked internally by the {@link #run} method
upon successful completion of the computation.

@param v the value

## FutureTask.setException(Throwable)

```java
protected void setException(Throwable t)
```

Causes this future to report an {@link ExecutionException}
with the given throwable as its cause, unless this future has
already been set or has been cancelled.

<p>This method is invoked internally by the {@link #run} method
upon failure of the computation.

@param t the cause of failure

## FutureTask.runAndReset()

```java
protected boolean runAndReset()
```

Executes the computation without setting its result, and then
resets this future to initial state, failing to do so if the
computation encounters an exception or is cancelled.  This is
designed for use with tasks that intrinsically execute more
than once.

@return {@code true} if successfully run and reset

## FutureTask.toString()

```java
public String toString()
```

Returns a string representation of this FutureTask.

@implSpec
The default implementation returns a string identifying this
FutureTask, as well as its completion state.  The state, in
brackets, contains one of the strings {@code "Completed Normally"},
{@code "Completed Exceptionally"}, {@code "Cancelled"}, or {@code
"Not completed"}.

@return a string representation of this FutureTask