---
title: "StructuredTaskScope interface (java.util.concurrent) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/StructuredTaskScope.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StructuredTaskScope interface (java.util.concurrent) (part 3 of 3)

## StructuredTaskScope.fork(Runnable)

```java
<U extends T> Subtask<U> fork(Runnable task)
```

Fork a subtask by starting a new thread in this scope to execute a method that
does not return a result.

 This method works exactly the same as `fork(Callable)` except that the
parameter to this method is a `Runnable`, the new thread executes its
run method, and Subtask.get() returns
`null` if the subtask completes successfully.

Parameters:

- `task`: the task for the thread to execute
- ``: the result type

**Returns:** the subtask

**Since:** 25

Throws:

- `WrongThreadException`: if the current thread is not the scope owner
- `IllegalStateException`: if the owner has already joined or the scope is closed
- `StructureViolationException`: if the current scoped value bindings are not the same as when the scope was created
- `RejectedExecutionException`: if the thread factory rejected creating a thread to run the subtask

## StructuredTaskScope.join()

```java
R join() throws InterruptedException
```

Returns the result, or throws, after waiting for all subtasks to complete or
the scope to be cancelled.

 This method waits for all subtasks started in this scope to complete or the
scope to be cancelled. If a timeout
is configured and the timeout expires before or while waiting, then the scope is
cancelled and TimeoutException is thrown. Once finished
waiting, the `Joiner`'s result() method is invoked
to get the result or throw an exception. If the `result()` method throws
then this method throws `FailedException` with the exception as the cause.

 This method may only be invoked by the scope owner, and only once.

**Returns:** the result

**Since:** 25

Throws:

- `WrongThreadException`: if the current thread is not the scope owner
- `IllegalStateException`: if already joined or this scope is closed
- `FailedException`: if the *outcome* is an exception, thrown with the exception from Joiner.result() as the cause
- `TimeoutException`: if a timeout is set and the timeout expires before or while waiting
- `InterruptedException`: if interrupted while waiting

## StructuredTaskScope.isCancelled()

```java
boolean isCancelled()
```

Cancelling the scope prevents new threads from starting in the scope and
interrupts threads executing unfinished subtasks.
It may take some time before the interrupted threads finish execution; this
method may return `true` before all threads have been interrupted or before
all threads have finished.

**API note:** A task with a lengthy "forking phase" (the code that executes before
it invokes join) may use this method to avoid doing work in cases
where scope is cancelled by the completion of a previously forked subtask or timeout.

**Since:** 25

## StructuredTaskScope.close()

```java
void close()
```

Closes this scope.

 This method first cancels the scope, if not
already cancelled. This interrupts the threads executing unfinished subtasks. This
method then waits for all threads to finish. If interrupted while waiting then it
will continue to wait until the threads finish, before completing with the interrupt
status set.

 This method may only be invoked by the scope owner. If the scope
is already closed then the scope owner invoking this method has no effect.

 A `StructuredTaskScope` is intended to be used in a *structured
manner*. If this method is called to close a scope before nested task
scopes are closed then it closes the underlying construct of each nested scope
(in the reverse order that they were created in), closes this scope, and then
throws `StructureViolationException`.
Similarly, if this method is called to close a scope while executing with
scoped value bindings, and the scope was created
before the scoped values were bound, then `StructureViolationException` is
thrown after closing the scope.
If a thread terminates without first closing scopes that it owns then
termination will cause the underlying construct of each of its open tasks scopes to
be closed. Closing is performed in the reverse order that the scopes were
created in. Thread termination may therefore be delayed when the scope owner
has to wait for threads forked in these scopes to finish.

Throws:

- `IllegalStateException`: thrown after closing the scope if the scope owner did not attempt to join after forking
- `WrongThreadException`: if the current thread is not the scope owner
- `StructureViolationException`: if a structure violation was detected
