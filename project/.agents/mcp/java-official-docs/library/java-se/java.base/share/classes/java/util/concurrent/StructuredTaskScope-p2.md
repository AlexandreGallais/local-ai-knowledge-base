---
title: "StructuredTaskScope interface (java.util.concurrent) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/StructuredTaskScope.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StructuredTaskScope interface (java.util.concurrent) (part 2 of 3)

## StructuredTaskScope.onFork(Subtask<? extends T>)

```java
default boolean onFork(Subtask<? extends T> subtask)
```

Invoked by fork(Callable) and fork(Runnable) when forking a subtask. The method is invoked from the task
owner thread. The method is invoked before a thread is created to run the
subtask.

Parameters:

- `subtask`: the subtask

**Implementation requirements:** The default implementation throws `NullPointerException` if the
subtask is `null`. It throws `IllegalArgumentException` if the
subtask is not in the UNAVAILABLE state, it
otherwise returns `false`.

**API note:** This method is invoked by the `fork` methods. It should not be
invoked directly.

**Returns:** `true` to cancel the scope, otherwise `false`

## StructuredTaskScope.onComplete(Subtask<? extends T>)

```java
default boolean onComplete(Subtask<? extends T> subtask)
```

Invoked by the thread started to execute a subtask after the subtask completes
successfully or fails with an exception. This method is not invoked if a
subtask completes after the scope is cancelled.

Parameters:

- `subtask`: the subtask

**Implementation requirements:** The default implementation throws `NullPointerException` if the
subtask is `null`. It throws `IllegalArgumentException` if the
subtask is not in the SUCCESS or FAILED state, it otherwise returns `false`.

**API note:** This method is invoked by subtasks when they complete. It should not
be invoked directly.

**Returns:** `true` to cancel the scope, otherwise `false`

## StructuredTaskScope.result()

```java
R result() throws Throwable
```

Invoked by the join() method to produce the result (or exception)
after waiting for all subtasks to complete or the scope cancelled. The result
from this method is returned by the `join` method. If this method throws,
then `join` throws `FailedException` with the exception thrown by
this method as the cause.

 In normal usage, this method will be called at most once by the `join`
method to produce the result (or exception). The behavior of this method when
invoked directly, and invoked more than once, is undefined. Where possible, an
implementation should return an equal result (or throw the same exception) on
second or subsequent calls to produce the outcome.

**API note:** This method is invoked by the `join` method. It should not be
invoked directly.

**Returns:** the result

Throws:

- `Throwable`: the exception

## StructuredTaskScope.allSuccessfulOrThrow()

```java
static <T> Joiner<T, Stream<Subtask<T>>> allSuccessfulOrThrow()
```

The `Joiner` cancels
the scope and causes `join` to throw if any subtask fails.

 If all subtasks complete successfully, the joiner's `Joiner.result()`
method returns a stream of all subtasks in the order that they were forked.
If any subtask failed then the `result` method throws the exception from
the first subtask to fail.

Parameters:

- `<T>`: the result type of subtasks

**API note:** Joiners returned by this method are suited to cases where all subtasks
return a result of the same type. Joiners returned by `awaitAllSuccessfulOrThrow()` are suited to cases where the subtasks return
results of different types.

## StructuredTaskScope.anySuccessfulResultOrThrow()

```java
static <T> Joiner<T, T> anySuccessfulResultOrThrow()
```

The `Joiner` causes `join` to throw if all subtasks fail.

 The joiner's `Joiner.result()` method returns the result of a subtask
that completed successfully. If all subtasks fail then the `result` method
throws the exception from one of the failed subtasks. The `result` method
throws `NoSuchElementException` if no subtasks were forked.

Parameters:

- `<T>`: the result type of subtasks

## StructuredTaskScope.awaitAllSuccessfulOrThrow()

```java
static <T> Joiner<T, Void> awaitAllSuccessfulOrThrow()
```

The `Joiner` cancels
the scope and causes `join` to throw if any subtask fails.

 The joiner's result method returns `null`
if all subtasks complete successfully, or throws the exception from the first
subtask to fail.

Parameters:

- `<T>`: the result type of subtasks

**API note:** Joiners returned by this method are suited to cases where subtasks
return results of different types. Joiners returned by `allSuccessfulOrThrow()`
are suited to cases where the subtasks return a result of the same type.

## StructuredTaskScope.awaitAll()

```java
static <T> Joiner<T, Void> awaitAll()
```

The `Joiner` does not cancel the scope if a subtask fails.

 The joiner's result method returns `null`.

Parameters:

- `<T>`: the result type of subtasks

**API note:** This Joiner is useful for cases where subtasks make use of
*side-effects* rather than return results or fail with exceptions.
The fork(Runnable) method can be used to fork subtasks
that do not return a result.

 This Joiner can also be used for *fan-in* scenarios where subtasks
are forked to handle incoming connections and the number of subtasks is unbounded.
In this example, the thread executing the `acceptLoop` method will only
stop when interrupted or the listener socket is closed asynchronously.

## StructuredTaskScope.allUntil(Predicate<Subtask<? extends T>>)

```java
static <T> Joiner<T, Stream<Subtask<T>>> allUntil(Predicate<Subtask<? extends T>> isDone)
```

The joiner's `Joiner.onComplete(Subtask)` method invokes the
predicate's test method with the subtask that
completed successfully or failed with an exception. If the `test` method
returns `true` then
the scope is cancelled. The `test` method must be thread safe as it
may be invoked concurrently from several threads. If the `test` method
completes with an exception or error, then the thread that executed the subtask
invokes the uncaught exception handler
with the exception or error before the thread terminates.

 The joiner's `result()` method returns the stream of all subtasks,
in fork order. The stream may contain subtasks that have completed
(in SUCCESS or FAILED
state) or subtasks in the UNAVAILABLE state
if the scope was cancelled before all subtasks were forked or completed.

 The following example uses this method to create a `Joiner` that
cancels the scope when
two or more subtasks fail.

Parameters:

- `isDone`: the predicate to evaluate completed subtasks
- `<T>`: the result type of subtasks

**Override:** public boolean test(Subtask<? extends T> subtask) {
            return subtask.state() == Subtask.State.FAILED
                    && failedCount.incrementAndGet() >= 2;
        }
    }

    var joiner = Joiner.all(new CancelAfterTwoFailures());
}

 The following example uses `allUntil` to wait for all subtasks to
complete without any cancellation. This is similar to `awaitAll()`
except that it yields a stream of the completed subtasks.

## StructuredTaskScope.withThreadFactory(ThreadFactory)

```java
Configuration withThreadFactory(ThreadFactory threadFactory)
```

The other components are the same as this object. The thread factory is used by
a scope to create threads when forking subtasks.

Parameters:

- `threadFactory`: the thread factory

**API note:** The thread factory will typically create
virtual threads,
maybe with names for monitoring purposes, an uncaught exception handler, or other properties configured.

**See also:** #fork(Callable)

## StructuredTaskScope.withName(String)

```java
Configuration withName(String name)
```

The other components are the same as this object. A scope is optionally
named for the purposes of monitoring and management.

Parameters:

- `name`: the name

## StructuredTaskScope.withTimeout(Duration)

```java
Configuration withTimeout(Duration timeout)
```

The other components are the same as this object.

Parameters:

- `timeout`: the timeout

**API note:** Applications using deadlines, expressed as an `java.time.Instant`,
can use Duration.between(Instant.now(), deadline) to
compute the timeout for this method.

**See also:** #join()

## StructuredTaskScope.FailedException(Throwable)

```java
FailedException(Throwable cause)
```

Constructs a `FailedException` with the specified cause.

Parameters:

- `cause`: the cause, can be `null`

## StructuredTaskScope.TimeoutException()

```java
TimeoutException()
```

Constructs a `TimeoutException` with no detail message.

## StructuredTaskScope.open(Joiner<? super T, ? extends R>, Function<Configuration, Configuration>)

```java
static <T, R> StructuredTaskScope<T, R> open(Joiner<? super T, ? extends R> joiner, Function<Configuration, Configuration> configFunction)
```

Opens a new `StructuredTaskScope` to use the given `Joiner` object and
with configuration that is the result of applying the given function to the
default configuration.

 The `configFunction` is called with the default configuration and returns
the configuration for the new scope. The function may, for example, set the
ThreadFactory or set a
timeout. If the function completes
with an exception or error then it is propagated by this method. If the function
returns `null` then `NullPointerException` is thrown.

 If a `ThreadFactory` is set then its newThread method will be called to create threads when forking subtasks in this scope. If a `ThreadFactory` is not set then
forking subtasks will create an unnamed virtual thread for each subtask.

 If a timeout is set then it
starts when the scope is opened. If the timeout expires before the scope has
joined then the scope is cancelled
and the `join` method throws `TimeoutException`.

 The new scope is owned by the current thread. Only code executing in this
thread can fork, join, or
close the scope.

 Construction captures the current thread's scoped value bindings for inheritance by threads started in the scope.

Parameters:

- `joiner`: the joiner
- `configFunction`: a function to produce the configuration
- `<T>`: the result type of subtasks executed in the scope
- `<R>`: the result type of the scope

**Returns:** a new scope

**Since:** 25

## StructuredTaskScope.open(Joiner<? super T, ? extends R>)

```java
static <T, R> StructuredTaskScope<T, R> open(Joiner<? super T, ? extends R> joiner)
```

Opens a new `StructuredTaskScope`to use the given `Joiner` object. The
scope is created with the default configuration.
The default configuration has a `ThreadFactory` that creates unnamed
virtual threads,
is unnamed for monitoring and management purposes, and has no timeout.

Parameters:

- `joiner`: the joiner
- `<T>`: the result type of subtasks executed in the scope
- `<R>`: the result type of the scope

**Implementation requirements:** This factory method is equivalent to invoking the 2-arg open method with the given
joiner and the identity function.

**Returns:** a new scope

**Since:** 25

## StructuredTaskScope.open()

```java
static <T> StructuredTaskScope<T, Void> open()
```

Opens a new `StructuredTaskScope` that can be used to fork subtasks that return
results of any type. The scope's `join()` method waits for all subtasks to
succeed or any subtask to fail.

 The `join` method returns `null` if all subtasks complete successfully.
It throws `FailedException` if any subtask fails, with the exception from
the first subtask to fail as the cause.

 The scope is created with the default
configuration. The default configuration has a `ThreadFactory` that creates
unnamed virtual
threads, is unnamed for monitoring and management purposes, and has no timeout.

Parameters:

- `<T>`: the result type of subtasks

**Implementation requirements:** This factory method is equivalent to invoking the 2-arg open method with a joiner
created with awaitAllSuccessfulOrThrow()
and the identity function.

**Returns:** a new scope

**Since:** 25

## StructuredTaskScope.fork(Callable<? extends U>)

```java
<U extends T> Subtask<U> fork(Callable<? extends U> task)
```

Fork a subtask by starting a new thread in this scope to execute a value-returning
method. The new thread executes the subtask concurrently with the current thread.
The parameter to this method is a `Callable`, the new thread executes its
call() method.

 This method first creates a Subtask object to represent the
*forked subtask*. It invokes the joiner's onFork
method with the subtask in the UNAVAILABLE state.
If the `onFork` completes with an exception or error then it is propagated by
the `fork` method without creating a thread. If the scope is already
cancelled, or `onFork` returns `true` to
cancel the scope, then this method returns the `Subtask`, in the
UNAVAILABLE state, without creating a thread to
execute the subtask.

 If the scope is not cancelled, and the `onFork` method returns `false`,
then a thread is created with the `ThreadFactory` configured when the scope
was opened, and the thread is started. Forking a subtask inherits the current thread's
scoped value bindings. The bindings must match the bindings
captured when the scope was opened. If the subtask completes (successfully or with
an exception) before the scope is cancelled, then the thread invokes the joiner's
onComplete method with the subtask in the
SUCCESS or FAILED state.
If the `onComplete` method completes with an exception or error, then the
uncaught exception handler is invoked
with the exception or error before the thread terminates.

 This method returns the Subtask object. In some usages, this
object may be used to get its result. In other cases it may be used for correlation
or be discarded. To ensure correct usage, the Subtask.get()
method may only be called by the scope owner to get the result after it has
waited for subtasks to complete with the join method and the subtask
completed successfully. Similarly, the Subtask.exception()
method may only be called by the scope owner after it has joined and the subtask
failed. If the scope was cancelled before the subtask was forked, or before it
completes, then neither method can be used to obtain the outcome.

 This method may only be invoked by the scope owner.

Parameters:

- `task`: the value-returning task for the thread to execute
- ``: the result type

**Returns:** the subtask

Throws:

- `WrongThreadException`: if the current thread is not the scope owner
- `IllegalStateException`: if the owner has already joined or the scope is closed
- `StructureViolationException`: if the current scoped value bindings are not the same as when the scope was created
- `RejectedExecutionException`: if the thread factory rejected creating a thread to run the subtask
