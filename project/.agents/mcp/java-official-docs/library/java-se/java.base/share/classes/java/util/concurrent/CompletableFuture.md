---
title: "CompletableFuture class (java.util.concurrent) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CompletableFuture.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletableFuture class (java.util.concurrent)

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T>
```

A `Future` that may be explicitly completed (setting its
value and status), and may be used as a `CompletionStage`,
supporting dependent functions and actions that trigger upon its
completion.

When two or more threads attempt to
complete,
completeExceptionally, or
cancel
a CompletableFuture, only one of them succeeds.

In addition to these and related methods for directly
manipulating status and results, CompletableFuture implements
interface `CompletionStage` with the following policies:

- Actions supplied for dependent completions of
*non-async* methods may be performed by the thread that
completes the current CompletableFuture, or by any other caller of
a completion method.

- All *async* methods without an explicit Executor
argument, as well as those involving delays are performed using the
`ForkJoinPool.commonPool()`.  The default async Executor may
be overridden for non-static methods in subclasses by defining
method `defaultExecutor()`. To simplify monitoring,
debugging, and tracking, all generated asynchronous tasks are
instances of the marker interface `AsynchronousCompletionTask`.  Operations with time-delays can use
adapter methods defined in this class, for example: `supplyAsync(supplier, delayedExecutor(timeout, timeUnit))`.

- All CompletionStage methods are implemented independently of
other public methods, so the behavior of one method is not impacted
by overrides of others in subclasses.

- All CompletionStage methods return CompletableFutures.  To
restrict usages to only those methods defined in interface
CompletionStage, use method `minimalCompletionStage`. Or to
ensure only that clients do not themselves modify a future, use
method `copy`.

CompletableFuture also implements `Future` with the following
policies:

- Since (unlike `FutureTask`) this class has no direct
control over the computation that causes it to be completed,
cancellation is treated as just another form of exceptional
completion.  Method cancel has the same effect as
`completeExceptionally(new CancellationException())`. Method
`isCompletedExceptionally` can be used to determine if a
CompletableFuture completed in any exceptional fashion.

- In case of exceptional completion with a CompletionException,
methods `get()` and TimeUnit) throw an
`ExecutionException` with the same cause as held in the
corresponding CompletionException.  To simplify usage in most
contexts, this class also defines methods `join()` and
`getNow` that instead throw the CompletionException directly
in these cases.

Arguments used to pass a completion result (that is, for
parameters of type `T`) for methods accepting them may be
null, but passing a null value for any other parameter will result
in a `NullPointerException` being thrown.

Subclasses of this class should normally override the "virtual
constructor" method `newIncompleteFuture`, which establishes
the concrete type returned by CompletionStage methods. For example,
here is a class that substitutes a different default Executor and
disables the `obtrude` methods:

```java
class MyCompletableFuture<T> extends CompletableFuture<T> {
  static final Executor myExecutor = ...;
  public MyCompletableFuture() { }
  public <U> CompletableFuture<U> newIncompleteFuture() {
    return new MyCompletableFuture<U>(); }
  public Executor defaultExecutor() {
    return myExecutor; }
  public void obtrudeValue(T value) {
    throw new UnsupportedOperationException(); }
  public void obtrudeException(Throwable ex) {
    throw new UnsupportedOperationException(); }
}
```

Parameters:

- `<T>`: The result type returned by this future's `join` and `get` methods

**Since:** 1.8

## CompletableFuture.CompletableFuture()

```java
public CompletableFuture()
```

Creates a new incomplete CompletableFuture.

## CompletableFuture.supplyAsync(Supplier)

```java
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the `ForkJoinPool.commonPool()` with
the value obtained by calling the given Supplier.

Parameters:

- `supplier`: a function returning the value to be used to complete the returned CompletableFuture
- ``: the function's return type

**Returns:** the new CompletableFuture

## CompletableFuture.supplyAsync(Supplier, Executor)

```java
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier, Executor executor)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the given executor with the value obtained
by calling the given Supplier.

Parameters:

- `supplier`: a function returning the value to be used to complete the returned CompletableFuture
- `executor`: the executor to use for asynchronous execution
- ``: the function's return type

**Returns:** the new CompletableFuture

## CompletableFuture.runAsync(Runnable)

```java
public static CompletableFuture<Void> runAsync(Runnable runnable)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the `ForkJoinPool.commonPool()` after
it runs the given action.

Parameters:

- `runnable`: the action to run before completing the returned CompletableFuture

**Returns:** the new CompletableFuture

## CompletableFuture.runAsync(Runnable, Executor)

```java
public static CompletableFuture<Void> runAsync(Runnable runnable, Executor executor)
```

Returns a new CompletableFuture that is asynchronously completed
by a task running in the given executor after it runs the given
action.

Parameters:

- `runnable`: the action to run before completing the returned CompletableFuture
- `executor`: the executor to use for asynchronous execution

**Returns:** the new CompletableFuture

## CompletableFuture.completedFuture(U)

```java
public static <U> CompletableFuture<U> completedFuture(U value)
```

Returns a new CompletableFuture that is already completed with
the given value.

Parameters:

- `value`: the value
- ``: the type of the value

**Returns:** the completed CompletableFuture

## CompletableFuture.isDone()

```java
public boolean isDone()
```

Returns `true` if completed in any fashion: normally,
exceptionally, or via cancellation.

**Returns:** `true` if completed

## CompletableFuture.get()

```java
public T get() throws InterruptedException, ExecutionException
```

Waits if necessary for this future to complete, and then
returns its result.

**Returns:** the result value

Throws:

- `CancellationException`: if this future was cancelled
- `ExecutionException`: if this future completed exceptionally
- `InterruptedException`: if the current thread was interrupted while waiting

## CompletableFuture.get(long, TimeUnit)

```java
public T get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

Waits if necessary for at most the given time for this future
to complete, and then returns its result, if available.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** the result value

Throws:

- `CancellationException`: if this future was cancelled
- `ExecutionException`: if this future completed exceptionally
- `InterruptedException`: if the current thread was interrupted while waiting
- `TimeoutException`: if the wait timed out

## CompletableFuture.join()

```java
public T join()
```

Returns the result value when complete, or throws an
(unchecked) exception if completed exceptionally. To better
conform with the use of common functional forms, if a
computation involved in the completion of this
CompletableFuture threw an exception, this method throws an
(unchecked) `CompletionException` with the underlying
exception as its cause.

**Returns:** the result value

Throws:

- `CancellationException`: if the computation was cancelled
- `CompletionException`: if this future completed exceptionally or a completion computation threw an exception

## CompletableFuture.getNow(T)

```java
public T getNow(T valueIfAbsent)
```

Returns the result value (or throws any encountered exception)
if completed, else returns the given valueIfAbsent.

Parameters:

- `valueIfAbsent`: the value to return if not completed

**Returns:** the result value, if completed, else the given valueIfAbsent

Throws:

- `CancellationException`: if the computation was cancelled
- `CompletionException`: if this future completed exceptionally or a completion computation threw an exception

## CompletableFuture.resultNow()

```java
public T resultNow()
```

**Since:** 19

## CompletableFuture.exceptionNow()

```java
public Throwable exceptionNow()
```

**Since:** 19

## CompletableFuture.complete(T)

```java
public boolean complete(T value)
```

If not already completed, sets the value returned by `get()` and related methods to the given value.

Parameters:

- `value`: the result value

**Returns:** `true` if this invocation caused this CompletableFuture
to transition to a completed state, else `false`

## CompletableFuture.completeExceptionally(Throwable)

```java
public boolean completeExceptionally(Throwable ex)
```

If not already completed, causes invocations of `get()`
and related methods to throw the given exception.

Parameters:

- `ex`: the exception

**Returns:** `true` if this invocation caused this CompletableFuture
to transition to a completed state, else `false`

## CompletableFuture.toCompletableFuture()

```java
public CompletableFuture<T> toCompletableFuture()
```

Returns this CompletableFuture.

**Returns:** this CompletableFuture

## CompletableFuture.exceptionallyAsync(Function<Throwable, ? extends T>)

```java
public CompletableFuture<T> exceptionallyAsync( Function<Throwable, ? extends T> fn)
```

**Since:** 12

## CompletableFuture.exceptionallyAsync(Function<Throwable, ? extends T>, Executor)

```java
public CompletableFuture<T> exceptionallyAsync( Function<Throwable, ? extends T> fn, Executor executor)
```

**Since:** 12

## CompletableFuture.exceptionallyCompose(Function<Throwable, ? extends CompletionStage<T>>)

```java
public CompletableFuture<T> exceptionallyCompose( Function<Throwable, ? extends CompletionStage<T>> fn)
```

**Since:** 12

## CompletableFuture.exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<T>>)

```java
public CompletableFuture<T> exceptionallyComposeAsync( Function<Throwable, ? extends CompletionStage<T>> fn)
```

**Since:** 12

## CompletableFuture.exceptionallyComposeAsync(Function<Throwable, ? extends CompletionStage<T>>, Executor)

```java
public CompletableFuture<T> exceptionallyComposeAsync( Function<Throwable, ? extends CompletionStage<T>> fn, Executor executor)
```

**Since:** 12

## CompletableFuture.allOf(CompletableFuture<?>...)

```java
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs)
```

Returns a new CompletableFuture that is completed when all of
the given CompletableFutures complete.  If any of the given
CompletableFutures complete exceptionally, then the returned
CompletableFuture also does so, with a CompletionException
holding this exception as its cause.  Otherwise, the results,
if any, of the given CompletableFutures are not reflected in
the returned CompletableFuture, but may be obtained by
inspecting them individually. If no CompletableFutures are
provided, returns a CompletableFuture completed with the value
`null`.

Among the applications of this method is to await completion
of a set of independent CompletableFutures before continuing a
program, as in: `CompletableFuture.allOf(c1, c2, c3).join();`.

Parameters:

- `cfs`: the CompletableFutures

**Returns:** a new CompletableFuture that is completed when all of the
given CompletableFutures complete

Throws:

- `NullPointerException`: if the array or any of its elements are `null`

## CompletableFuture.anyOf(CompletableFuture<?>...)

```java
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs)
```

Returns a new CompletableFuture that is completed when any of
the given CompletableFutures complete, with the same result.
Otherwise, if it completed exceptionally, the returned
CompletableFuture also does so, with a CompletionException
holding this exception as its cause.  If no CompletableFutures
are provided, returns an incomplete CompletableFuture.

Parameters:

- `cfs`: the CompletableFutures

**Returns:** a new CompletableFuture that is completed with the
result or exception of any of the given CompletableFutures when
one completes

Throws:

- `NullPointerException`: if the array or any of its elements are `null`

## CompletableFuture.cancel(boolean)

```java
public boolean cancel(boolean mayInterruptIfRunning)
```

If not already completed, completes this CompletableFuture with
a `CancellationException`. Dependent CompletableFutures
that have not already completed will also complete
exceptionally, with a `CompletionException` caused by
this `CancellationException`.

Parameters:

- `mayInterruptIfRunning`: this value has no effect in this implementation because interrupts are not used to control processing.

**Returns:** `true` if this task is now cancelled

## CompletableFuture.isCancelled()

```java
public boolean isCancelled()
```

Returns `true` if this CompletableFuture was cancelled
before it completed normally.

**Returns:** `true` if this CompletableFuture was cancelled
before it completed normally

## CompletableFuture.isCompletedExceptionally()

```java
public boolean isCompletedExceptionally()
```

Returns `true` if this CompletableFuture completed
exceptionally, in any way. Possible causes include
cancellation, explicit invocation of `completeExceptionally`, and abrupt termination of a
CompletionStage action.

**Returns:** `true` if this CompletableFuture completed
exceptionally

## CompletableFuture.state()

```java
public State state()
```

**Since:** 19

## CompletableFuture.obtrudeValue(T)

```java
public void obtrudeValue(T value)
```

Forcibly sets or resets the value subsequently returned by
method `get()` and related methods, whether or not
already completed. This method is designed for use only in
error recovery actions, and even in such situations may result
in ongoing dependent completions using established versus
overwritten outcomes.

Parameters:

- `value`: the completion value

## CompletableFuture.obtrudeException(Throwable)

```java
public void obtrudeException(Throwable ex)
```

Forcibly causes subsequent invocations of method `get()`
and related methods to throw the given exception, whether or
not already completed. This method is designed for use only in
error recovery actions, and even in such situations may result
in ongoing dependent completions using established versus
overwritten outcomes.

Parameters:

- `ex`: the exception

Throws:

- `NullPointerException`: if the exception is null
