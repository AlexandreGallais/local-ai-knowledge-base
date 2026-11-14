---
title: "Future interface (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/Future.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Future interface (java.util.concurrent)

```java
public interface Future<V>
```

A `Future` represents the result of an asynchronous
computation.  Methods are provided to check if the computation is
complete, to wait for its completion, and to retrieve the result of
the computation.  The result can only be retrieved using method
`get` when the computation has completed, blocking if
necessary until it is ready.  Cancellation is performed by the
`cancel` method.  Additional methods are provided to
determine if the task completed normally or was cancelled. Once a
computation has completed, the computation cannot be cancelled.
If you would like to use a `Future` for the sake
of cancellability but not provide a usable result, you can
declare types of the form `Future<?>` and
return `null` as a result of the underlying task.

**Sample Usage** (Note that the following classes are all
made-up.)

```java
interface ArchiveSearcher { String search(String target); }
class App {
  ExecutorService executor = ...;
  ArchiveSearcher searcher = ...;
  void showSearch(String target) throws InterruptedException {
    Callable<String> task = () -> searcher.search(target);
    Future<String> future = executor.submit(task);
    displayOtherThings(); // do other things while searching
    try {
      displayText(future.get()); // use future
    } catch (ExecutionException ex) { cleanup(); return; }
  }
}
```

The `FutureTask` class is an implementation of `Future` that
implements `Runnable`, and so may be executed by an `Executor`.
For example, the above construction with `submit` could be replaced by:

```java
FutureTask<String> future = new FutureTask<>(task);
executor.execute(future);
```

Memory consistency effects: Actions taken by the asynchronous computation
 *happen-before*
actions following the corresponding `Future.get()` in another thread.

Parameters:

- `<V>`: The result type returned by this Future's `get` method

**See also:** FutureTask

**See also:** Executor

**Since:** 1.5

## Future.cancel(boolean)

```java
boolean cancel(boolean mayInterruptIfRunning)
```

Attempts to cancel execution of this task.  This method has no
effect if the task is already completed or cancelled, or could
not be cancelled for some other reason.  Otherwise, if this
task has not started when `cancel` is called, this task
should never run.  If the task has already started, then the
`mayInterruptIfRunning` parameter determines whether the
thread executing this task (when known by the implementation)
is interrupted in an attempt to stop the task.

The return value from this method does not necessarily
indicate whether the task is now cancelled; use `isCancelled`.

Parameters:

- `mayInterruptIfRunning`: `true` if the thread executing this task should be interrupted (if the thread is known to the implementation); otherwise, in-progress tasks are allowed to complete

**Returns:** `false` if the task could not be cancelled,
typically because it has already completed; `true`
otherwise. If two or more threads cause a task to be cancelled,
then at least one of them returns `true`. Implementations
may provide stronger guarantees.

## Future.isCancelled()

```java
boolean isCancelled()
```

Returns `true` if this task was cancelled before it completed
normally.

**Returns:** `true` if this task was cancelled before it completed

## Future.isDone()

```java
boolean isDone()
```

Returns `true` if this task completed.

Completion may be due to normal termination, an exception, or
cancellation -- in all of these cases, this method will return
`true`.

**Returns:** `true` if this task completed

## Future.get()

```java
V get() throws InterruptedException, ExecutionException
```

Waits if necessary for the computation to complete, and then
retrieves its result.

**Returns:** the computed result

Throws:

- `CancellationException`: if the computation was cancelled
- `ExecutionException`: if the computation threw an exception
- `InterruptedException`: if the current thread was interrupted while waiting

## Future.get(long, TimeUnit)

```java
V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

Waits if necessary for at most the given time for the computation
to complete, and then retrieves its result, if available.

Parameters:

- `timeout`: the maximum time to wait
- `unit`: the time unit of the timeout argument

**Returns:** the computed result

Throws:

- `CancellationException`: if the computation was cancelled
- `ExecutionException`: if the computation threw an exception
- `InterruptedException`: if the current thread was interrupted while waiting
- `TimeoutException`: if the wait timed out

## Future.resultNow()

```java
default V resultNow()
```

Returns the computed result, without waiting.

 This method is for cases where the caller knows that the task has
already completed successfully, for example when filtering a stream
of Future objects for the successful tasks and using a mapping
operation to obtain a stream of results.

**Implementation requirements:** The default implementation invokes `isDone()` to test if the task
has completed. If done, it invokes `get()` to obtain the result.

**Returns:** the computed result

**Since:** 19

Throws:

- `IllegalStateException`: if the task has not completed or the task did not complete with a result

## Future.exceptionNow()

```java
default Throwable exceptionNow()
```

Returns the exception thrown by the task, without waiting.

 This method is for cases where the caller knows that the task
has already completed with an exception.

**Implementation requirements:** The default implementation invokes `isDone()` to test if the task
has completed. If done and not cancelled, it invokes `get()` and
catches the `ExecutionException` to obtain the exception.

**Returns:** the exception thrown by the task

**Since:** 19

Throws:

- `IllegalStateException`: if the task has not completed, the task completed normally, or the task was cancelled

## Future.resultNow() */, /** * The task completed with an exception. * Future#exceptionNow() */, /** * The task was cancelled. * #cancel(boolean)

```java
RUNNING, /** * The task completed with a result. * Future#resultNow() */ SUCCESS, /** * The task completed with an exception. * Future#exceptionNow() */ FAILED, /** * The task was cancelled. * #cancel(boolean) */ CANCELLED } /** *
```

The task has not completed.

## Future.exceptionNow() */, /** * The task was cancelled. * #cancel(boolean)

```java
SUCCESS, /** * The task completed with an exception. * Future#exceptionNow() */ FAILED, /** * The task was cancelled. * #cancel(boolean) */ CANCELLED } /** *
```

The task completed with a result.

**See also:** Future#resultNow()

## Future.cancel(boolean)

```java
FAILED, /** * The task was cancelled. * #cancel(boolean) */ CANCELLED } /** *
```

The task completed with an exception.

**See also:** Future#exceptionNow()

## Future.CANCELLED } /** *

```java
CANCELLED } /** *
```

The task was cancelled.

**See also:** #cancel(boolean)

## Future.state()

```java
default State state()
```

**Implementation requirements:** The default implementation uses `isDone()`, `isCancelled()`,
and `get()` to determine the state.

**Since:** 19
