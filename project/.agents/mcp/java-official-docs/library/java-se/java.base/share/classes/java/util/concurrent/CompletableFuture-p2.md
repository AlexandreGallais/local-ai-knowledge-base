---
title: "CompletableFuture class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CompletableFuture.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompletableFuture class (java.util.concurrent) (part 2 of 2)

## CompletableFuture.getNumberOfDependents()

```java
public int getNumberOfDependents()
```

Returns the estimated number of CompletableFutures whose
completions are awaiting completion of this CompletableFuture.
This method is designed for use in monitoring system state, not
for synchronization control.

**Returns:** the number of dependent CompletableFutures

## CompletableFuture.toString()

```java
public String toString()
```

Returns a string identifying this CompletableFuture, as well as
its completion state.  The state, in brackets, contains the
String `"Completed normally"` or the String `"Completed exceptionally"`, or the String `"Not completed"` followed by the number of CompletableFutures
dependent upon its completion, if any.

**Returns:** a string identifying this CompletableFuture, as well as its state

## CompletableFuture.newIncompleteFuture()

```java
public <U> CompletableFuture<U> newIncompleteFuture()
```

Returns a new incomplete CompletableFuture of the type to be
returned by a CompletionStage method. Subclasses should
normally override this method to return an instance of the same
class as this CompletableFuture. The default implementation
returns an instance of class CompletableFuture.

Parameters:

- ``: the type of the value

**Returns:** a new CompletableFuture

**Since:** 9

## CompletableFuture.defaultExecutor()

```java
public Executor defaultExecutor()
```

Returns the default Executor used for async methods that do not
specify an Executor. This class uses the `ForkJoinPool.commonPool()` if it supports more than one
parallel thread, or else an Executor using one thread per async
task.  This method may be overridden in subclasses to return
an Executor that provides at least one independent thread.

**Returns:** the executor

**Since:** 9

## CompletableFuture.copy()

```java
public CompletableFuture<T> copy()
```

Returns a new CompletableFuture that is completed normally with
the same value as this CompletableFuture when it completes
normally. If this CompletableFuture completes exceptionally,
then the returned CompletableFuture completes exceptionally
with a CompletionException with this exception as cause. The
behavior is equivalent to `thenApply(x -> x)`. This
method may be useful as a form of "defensive copying", to
prevent clients from completing, while still being able to
arrange dependent actions.

**Returns:** the new CompletableFuture

**Since:** 9

## CompletableFuture.minimalCompletionStage()

```java
public CompletionStage<T> minimalCompletionStage()
```

Returns a new CompletionStage that is completed normally with
the same value as this CompletableFuture when it completes
normally, and cannot be independently completed or otherwise
used in ways not defined by the methods of interface `CompletionStage`.  If this CompletableFuture completes
exceptionally, then the returned CompletionStage completes
exceptionally with a CompletionException with this exception as
cause.

Unless overridden by a subclass, a new non-minimal
CompletableFuture with all methods available can be obtained from
a minimal CompletionStage via `toCompletableFuture()`.
For example, completion of a minimal stage can be awaited by

```java
minimalStage.toCompletableFuture().join();
```

**Returns:** the new CompletionStage

**Since:** 9

## CompletableFuture.completeAsync(Supplier<? extends T>, Executor)

```java
public CompletableFuture<T> completeAsync(Supplier<? extends T> supplier, Executor executor)
```

Completes this CompletableFuture with the result of
the given Supplier function invoked from an asynchronous
task using the given executor.

Parameters:

- `supplier`: a function returning the value to be used to complete this CompletableFuture
- `executor`: the executor to use for asynchronous execution

**Returns:** this CompletableFuture

**Since:** 9

## CompletableFuture.completeAsync(Supplier<? extends T>)

```java
public CompletableFuture<T> completeAsync(Supplier<? extends T> supplier)
```

Completes this CompletableFuture with the result of the given
Supplier function invoked from an asynchronous task using the
default executor.

Parameters:

- `supplier`: a function returning the value to be used to complete this CompletableFuture

**Returns:** this CompletableFuture

**Since:** 9

## CompletableFuture.orTimeout(long, TimeUnit)

```java
public CompletableFuture<T> orTimeout(long timeout, TimeUnit unit)
```

Exceptionally completes this CompletableFuture with
a `TimeoutException` if not otherwise completed
before the given timeout elapsed.

Parameters:

- `timeout`: how long to wait before completing exceptionally with a TimeoutException, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** this CompletableFuture

**Since:** 9

## CompletableFuture.completeOnTimeout(T, long, TimeUnit)

```java
public CompletableFuture<T> completeOnTimeout(T value, long timeout, TimeUnit unit)
```

Completes this CompletableFuture with the given value if not
otherwise completed before the given timeout elapsed.

Parameters:

- `value`: the value to use upon timeout
- `timeout`: how long to wait before completing normally with the given value, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `timeout` parameter

**Returns:** this CompletableFuture

**Since:** 9

## CompletableFuture.delayedExecutor(long, TimeUnit, Executor)

```java
public static Executor delayedExecutor(long delay, TimeUnit unit, Executor executor)
```

Returns a new Executor that submits a task to the given base
executor after the given delay (or no delay if non-positive).
Each delay commences upon invocation of the returned executor's
`execute` method.

Parameters:

- `delay`: how long to delay, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `delay` parameter
- `executor`: the base executor

**Returns:** the new delayed executor

**Since:** 9

## CompletableFuture.delayedExecutor(long, TimeUnit)

```java
public static Executor delayedExecutor(long delay, TimeUnit unit)
```

Returns a new Executor that submits a task to the default
executor after the given delay (or no delay if non-positive).
Each delay commences upon invocation of the returned executor's
`execute` method.

Parameters:

- `delay`: how long to delay, in units of `unit`
- `unit`: a `TimeUnit` determining how to interpret the `delay` parameter

**Returns:** the new delayed executor

**Since:** 9

## CompletableFuture.completedStage(U)

```java
public static <U> CompletionStage<U> completedStage(U value)
```

Returns a new CompletionStage that is already completed with
the given value and supports only those methods in
interface `CompletionStage`.

Parameters:

- `value`: the value
- ``: the type of the value

**Returns:** the completed CompletionStage

**Since:** 9

## CompletableFuture.failedFuture(Throwable)

```java
public static <U> CompletableFuture<U> failedFuture(Throwable ex)
```

Returns a new CompletableFuture that is already completed
exceptionally with the given exception.

Parameters:

- `ex`: the exception
- ``: the type of the value

**Returns:** the exceptionally completed CompletableFuture

**Since:** 9

## CompletableFuture.failedStage(Throwable)

```java
public static <U> CompletionStage<U> failedStage(Throwable ex)
```

Returns a new CompletionStage that is already completed
exceptionally with the given exception and supports only those
methods in interface `CompletionStage`.

Parameters:

- `ex`: the exception
- ``: the type of the value

**Returns:** the exceptionally completed CompletionStage

**Since:** 9
