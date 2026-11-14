---
title: "StructuredTaskScope interface (java.util.concurrent) (part 1 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/StructuredTaskScope.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StructuredTaskScope interface (java.util.concurrent)

```java
public sealed interface StructuredTaskScope<T, R> extends AutoCloseable permits StructuredTaskScopeImpl
```

An API for *structured concurrency*. `StructuredTaskScope` supports cases
where execution of a *task* (a unit of work) splits into several concurrent
subtasks, and where the subtasks must complete before the task continues. A `StructuredTaskScope` can be used to ensure that the lifetime of a concurrent operation
is confined by a *syntax block*, similar to that of a sequential operation in
structured programming.

 `StructuredTaskScope` defines the static method open to open
a new `StructuredTaskScope` and the close method to close it.
The API is designed to be used with the `try`-with-resources statement where
the `StructuredTaskScope` is opened as a resource and then closed automatically.
The code inside the block uses the fork method to fork subtasks.
After forking, it uses the join method to wait for all subtasks to
finish (or some other outcome) as a single operation. Forking a subtask starts a new
`Thread` to run the subtask. The thread executing the task does not continue
beyond the `close` method until all threads started to execute subtasks have finished.
To ensure correct usage, the `fork`, `join` and `close` methods may
only be invoked by the *owner thread* (the thread that opened the `StructuredTaskScope`), the `fork` method may not be called after `join`,
the `join` method may only be invoked once, and the `close` method throws
an exception after closing if the owner did not invoke the `join` method after
forking subtasks.

 As a first example, consider a task that splits into two subtasks to concurrently
fetch resources from two URL locations "left" and "right". Both subtasks may complete
successfully, one subtask may succeed and the other may fail, or both subtasks may
fail. The task in this example is interested in the successful result from both
subtasks. It waits in the join method for both subtasks to complete
successfully or for either subtask to fail.

 If both subtasks complete successfully then the `join` method completes
normally and the task uses the Subtask.get() method to get
the result of each subtask. If one of the subtasks fails then the other subtask is
cancelled (this will interrupt the thread executing the
other subtask) and the `join` method throws `FailedException` with the
exception from the failed subtask as the cause.

 To allow for cancellation, subtasks must be coded so that they finish as soon as
possible when interrupted. Subtasks that do not respond to interrupt, e.g. block on
methods that are not interruptible, may delay the closing of a scope indefinitely. The
close method always waits for threads executing subtasks to finish,
even if the scope is cancelled, so execution cannot continue beyond the `close`
method until the interrupted threads finish.

 In the example, the subtasks produce results of different types (`String` and
`Integer`). In other cases the subtasks may all produce results of the same type.
If the example had used `StructuredTaskScope.<String>open()` then it could
only be used to fork subtasks that return a `String` result.

#### Joiners

 In the example above, the task fails if any subtask fails. If all subtasks
succeed then the `join` method completes normally. Other policy and outcome is
supported by creating a `StructuredTaskScope` with a `Joiner` that
implements the desired policy. A `Joiner` handles subtask completion and produces
the outcome for the join method. In the example above, `join`
returns `null`. Depending on the `Joiner`, `join` may return a
result, a stream of elements, or some other object. The `Joiner` interface defines
factory methods to create `Joiner`s for some common cases.

 A `Joiner` may cancel the scope (sometimes called
"short-circuiting") when some condition is reached that does not require the result of
subtasks that are still executing. Cancelling the scope prevents new threads from being
started to execute further subtasks, interrupts the
threads executing subtasks that have not completed, and causes the `join` method
to wakeup with the outcome (result or exception). In the above example, the outcome is
that `join` completes with a result of `null` when all subtasks succeed.
The scope is cancelled if any of the subtasks fail and `join` throws `FailedException` with the exception from the failed subtask as the cause. Other `Joiner` implementations may cancel the scope for other reasons.

 Now consider another example that splits into two subtasks. In this example,
each subtask produces a `String` result and the task is only interested in
the result from the first subtask to complete successfully. The example uses Joiner.anySuccessfulResultOrThrow() to
create a `Joiner` that makes available the result of the first subtask to
complete successfully. The type parameter in the example is "`String`" so that
only subtasks that return a `String` can be forked.

 In the example, the task forks the two subtasks, then waits in the `join` method for either subtask to complete successfully or for both subtasks to fail.
If one of the subtasks completes successfully then the `Joiner` causes the other
subtask to be cancelled (this will interrupt the thread executing the subtask), and
the `join` method returns the result from the successful subtask. Cancelling the
other subtask avoids the task waiting for a result that it doesn't care about. If
both subtasks fail then the `join` method throws `FailedException` with the
exception from one of the subtasks as the cause.

 Whether code uses the `Subtask` returned from `fork` will depend on
the `Joiner` and usage. Some `Joiner` implementations are suited to subtasks
that return results of the same type and where the `join` method returns a result
for the task to use. Code that forks subtasks that return results of different
types, and uses a `Joiner` such as `Joiner.awaitAllSuccessfulOrThrow()` that
does not return a result, will use Subtask.get() after joining.

#### Exception handling

 A `StructuredTaskScope` is opened with a Joiner that
handles subtask completion and produces the outcome for the join method.
In some cases, the outcome will be a result, in other cases it will be an exception.
If the outcome is an exception then the `join` method throws `FailedException` with the exception as the cause. For many `Joiner` implementations, the exception will be an exception
thrown by a subtask that failed. In the case of allSuccessfulOrThrow and awaitAllSuccessfulOrThrow
for example, the exception is from the first subtask to fail.

 Many of the details for how exceptions are handled will depend on usage. In some
cases it may be useful to add a `catch` block to the `try`-with-resources
statement to catch `FailedException`. The exception handling may use `instanceof` with pattern matching to handle specific causes.

In other cases it may not be useful to catch `FailedException` but instead leave
it to propagate to the configured uncaught exception handler for logging purposes.

 For cases where a specific exception triggers the use of a default result then it
may be more appropriate to handle this in the subtask itself rather than the subtask
failing and the scope owner handling the exception.

#### Configuration

A `StructuredTaskScope` is opened with configuration
that consists of a `ThreadFactory` to create threads, an optional name for
monitoring and management purposes, and an optional timeout.

 The `open()` and `open(Joiner)` methods create a `StructuredTaskScope`
with the  *default configuration*. The default
configuration has a `ThreadFactory` that creates unnamed
virtual threads,
is unnamed for monitoring and management purposes, and has no timeout.

 The 2-arg Function) open method can be used to create a
`StructuredTaskScope` that uses a different `ThreadFactory`, has a name for
the purposes of monitoring and management, or has a timeout that cancels the scope if
the timeout expires before or while waiting for subtasks to complete. The `open`
method is called with a function that is applied to the default
configuration and returns a Configuration for the
`StructuredTaskScope` under construction.

 The following example opens a new `StructuredTaskScope` with a `ThreadFactory` that creates virtual threads named
"duke-0", "duke-1" ...

 A second example sets a timeout, represented by a `Duration`. The timeout
starts when the new scope is opened. If the timeout expires before the `join`
method has completed then the scope is cancelled. This
interrupts the threads executing the two subtasks and causes the join
method to throw `TimeoutException`.

#### Inheritance of scoped value bindings

`ScopedValue` supports the execution of a method with a `ScopedValue` bound
to a value for the bounded period of execution of the method by the *current thread*.
It allows a value to be safely and efficiently shared to methods without using method
parameters.

 When used in conjunction with a `StructuredTaskScope`, a `ScopedValue`
can also safely and efficiently share a value to methods executed by subtasks forked
in the scope. When a `ScopedValue` object is bound to a value in the thread
executing the task then that binding is inherited by the threads created to
execute the subtasks. The thread executing the task does not continue beyond the
close method until all threads executing the subtasks have finished.
This ensures that the `ScopedValue` is not reverted to being unbound (or its previous value) while subtasks are executing.
In addition to providing a safe and efficient means to inherit a value into subtasks,
the inheritance allows sequential code using `ScopedValue` be refactored to use
structured concurrency.

 To ensure correctness, opening a new `StructuredTaskScope` captures the
current thread's scoped value bindings. These are the scoped values bindings that are
inherited by the threads created to execute subtasks in the scope. Forking a
subtask checks that the bindings in effect at the time that the subtask is forked
match the bindings when the `StructuredTaskScope` was created. This check ensures
that a subtask does not inherit a binding that is reverted in the task before the
subtask has completed.

 A `ScopedValue` that is shared across threads requires that the value be an
immutable object or for all access to the value to be appropriately synchronized.

 The following example demonstrates the inheritance of scoped value bindings. The
scoped value USERNAME is bound to the value "duke" for the bounded period of a lambda
expression by the thread executing it. The code in the block opens a `StructuredTaskScope` and forks two subtasks, it then waits in the `join` method
and aggregates the results from both subtasks. If code executed by the threads
running subtask1 and subtask2 uses `ScopedValue.get()`, to get the value of
USERNAME, then value "duke" will be returned.

 A scoped value inherited into a subtask may be
rebound to a new
value in the subtask for the bounded execution of some method executed in the subtask.
When the method completes, the value of the `ScopedValue` reverts to its previous
value, the value inherited from the thread executing the task.

 A subtask may execute code that itself opens a new `StructuredTaskScope`.
A task executing in thread T1 opens a `StructuredTaskScope` and forks a
subtask that runs in thread T2. The scoped value bindings captured when T1 opens the
scope are inherited into T2. The subtask (in thread T2) executes code that opens a
new `StructuredTaskScope` and forks a subtask that runs in thread T3. The scoped
value bindings captured when T2 opens the scope are inherited into T3. These
include (or may be the same) as the bindings that were inherited from T1. In effect,
scoped values are inherited into a tree of subtasks, not just one level of subtask.

#### Memory consistency effects

 Actions in the owner thread of a `StructuredTaskScope` prior to
forking of a subtask

*happen-before* any actions taken by that subtask, which in turn
*happen-before* the subtask result is retrieved.

#### General exceptions

 Unless otherwise specified, passing a `null` argument to a method in this
class will cause a `NullPointerException` to be thrown.

Parameters:

- `<T>`: the result type of subtasks executed in the scope
- `<R>`: the result type of the scope

**JLS:** 17.4.5 Happens-before Order

**Since:** 21

## StructuredTaskScope.The

```java
UNAVAILABLE, /** * The subtask completed successfully. The
```

The subtask result or exception is not available. This state indicates that
the subtask was forked but has not completed, it completed after the scope
was cancelled, or it was forked after the scoped was cancelled (in which
case a thread was not created to execute the subtask).

## StructuredTaskScope.The

```java
SUCCESS, /** * The subtask failed with an exception. The
```

The subtask completed successfully. The Subtask.get()
method can be used to get the result. This is a terminal state.

## StructuredTaskScope.FAILED, } /** *

```java
FAILED, } /** *
```

The subtask failed with an exception. The Subtask.exception() method can be used to get the exception. This is a
terminal state.

## StructuredTaskScope.state()

```java
State state()
```

## StructuredTaskScope.get()

```java
T get()
```

Returns the result of this subtask if it completed successfully. If the subtask
was forked with fork(Callable) then the result from the
call method is returned. If the subtask was forked with
fork(Runnable) then `null` is returned.

 Code executing in the scope owner thread can use this method to get the
result of a successful subtask only after it has joined.

 Code executing in the `Joiner` onComplete method should test that the subtask state is
SUCCESS before using this method to get the result.

**Returns:** the possibly-null result

**See also:** State#SUCCESS

Throws:

- `IllegalStateException`: if the subtask has not completed, did not complete successfully, or the current thread is the scope owner invoking this method before joining

## StructuredTaskScope.exception()

```java
Throwable exception()
```

If the subtask was forked with fork(Callable) then the
exception or error thrown by the call method is returned.
If the subtask was forked with fork(Runnable) then the
exception or error thrown by the run method is returned.

 Code executing in the scope owner thread can use this method to get the
exception thrown by a failed subtask only after it has joined.

 Code executing in a `Joiner` onComplete method should test that the subtask state is
FAILED before using this method to get the exception.

**See also:** State#FAILED

Throws:

- `IllegalStateException`: if the subtask has not completed, completed with a result, or the current thread is the scope owner invoking this method before joining
