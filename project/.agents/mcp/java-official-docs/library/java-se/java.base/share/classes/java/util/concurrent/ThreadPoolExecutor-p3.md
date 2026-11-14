---
title: "ThreadPoolExecutor class (java.util.concurrent) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ThreadPoolExecutor.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThreadPoolExecutor class (java.util.concurrent) (part 3 of 3)

## ThreadPoolExecutor.afterExecute(Runnable, Throwable)

```java
protected void afterExecute(Runnable r, Throwable t)
```

Method invoked upon completion of execution of the given Runnable.
This method is invoked by the thread that executed the task. If
non-null, the Throwable is the uncaught `RuntimeException`
or `Error` that caused execution to terminate abruptly.

This implementation does nothing, but may be customized in
subclasses. Note: To properly nest multiple overridings, subclasses
should generally invoke `super.afterExecute` at the
beginning of this method.

**Note:** When actions are enclosed in tasks (such as
`FutureTask`) either explicitly or via methods such as
`submit`, these task objects catch and maintain
computational exceptions, and so they do not cause abrupt
termination, and the internal exceptions are *not*
passed to this method. If you would like to trap both kinds of
failures in this method, you can further probe for such cases,
as in this sample subclass that prints either the direct cause
or the underlying exception if a task has been aborted:

```java
class ExtendedExecutor extends ThreadPoolExecutor {
  // ...
  protected void afterExecute(Runnable r, Throwable t) {
    super.afterExecute(r, t);
    if (t == null
        && r instanceof Future<?>
        && ((Future<?>)r).isDone()) {
      try {
        Object result = ((Future<?>) r).get();
      } catch (CancellationException ce) {
        t = ce;
      } catch (ExecutionException ee) {
        t = ee.getCause();
      } catch (InterruptedException ie) {
        // ignore/reset
        Thread.currentThread().interrupt();
      }
    }
    if (t != null)
      System.out.println(t);
  }
}
```

Parameters:

- `r`: the runnable that has completed
- `t`: the exception that caused termination, or null if execution completed normally

## ThreadPoolExecutor.terminated()

```java
protected void terminated()
```

Method invoked when the Executor has terminated.  Default
implementation does nothing. Note: To properly nest multiple
overridings, subclasses should generally invoke
`super.terminated` within this method.

## ThreadPoolExecutor.CallerRunsPolicy()

```java
public CallerRunsPolicy()
```

Creates a `CallerRunsPolicy`.

## ThreadPoolExecutor.rejectedExecution(Runnable, ThreadPoolExecutor)

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e)
```

Executes task r in the caller's thread, unless the executor
has been shut down, in which case the task is discarded.

Parameters:

- `r`: the runnable task requested to be executed
- `e`: the executor attempting to execute this task

## ThreadPoolExecutor.AbortPolicy()

```java
public AbortPolicy()
```

Creates an `AbortPolicy`.

## ThreadPoolExecutor.rejectedExecution(Runnable, ThreadPoolExecutor)

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e)
```

Always throws RejectedExecutionException.

Parameters:

- `r`: the runnable task requested to be executed
- `e`: the executor attempting to execute this task

Throws:

- `RejectedExecutionException`: always

## ThreadPoolExecutor.DiscardPolicy()

```java
public DiscardPolicy()
```

Creates a `DiscardPolicy`.

## ThreadPoolExecutor.rejectedExecution(Runnable, ThreadPoolExecutor)

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e)
```

Does nothing, which has the effect of discarding task r.

Parameters:

- `r`: the runnable task requested to be executed
- `e`: the executor attempting to execute this task

## ThreadPoolExecutor.DiscardOldestPolicy()

```java
public DiscardOldestPolicy()
```

Creates a `DiscardOldestPolicy` for the given executor.

## ThreadPoolExecutor.rejectedExecution(Runnable, ThreadPoolExecutor)

```java
public void rejectedExecution(Runnable r, ThreadPoolExecutor e)
```

Obtains and ignores the next task that the executor
would otherwise execute, if one is immediately available,
and then retries execution of task r, unless the executor
is shut down, in which case task r is instead discarded.

Parameters:

- `r`: the runnable task requested to be executed
- `e`: the executor attempting to execute this task
