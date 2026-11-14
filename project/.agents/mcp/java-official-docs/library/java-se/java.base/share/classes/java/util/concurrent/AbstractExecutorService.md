---
title: "AbstractExecutorService class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/AbstractExecutorService.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractExecutorService class (java.util.concurrent)

```java
public abstract class AbstractExecutorService implements ExecutorService
```

Provides default implementations of `ExecutorService`
execution methods. This class implements the `submit`,
`invokeAny` and `invokeAll` methods using a
`RunnableFuture` returned by `newTaskFor`, which defaults
to the `FutureTask` class provided in this package.  For example,
the implementation of `submit(Runnable)` creates an
associated `RunnableFuture` that is executed and
returned. Subclasses may override the `newTaskFor` methods
to return `RunnableFuture` implementations other than
`FutureTask`.

**Extension example.** Here is a sketch of a class
that customizes `ThreadPoolExecutor` to use
a `CustomTask` class instead of the default `FutureTask`:

```java
public class CustomThreadPoolExecutor extends ThreadPoolExecutor {

  static class CustomTask<V> implements RunnableFuture<V> { ... }

  protected <V> RunnableFuture<V> newTaskFor(Callable<V> c) {
      return new CustomTask<V>(c);
  }
  protected <V> RunnableFuture<V> newTaskFor(Runnable r, V v) {
      return new CustomTask<V>(r, v);
  }
  // ... add constructors, etc.
}
```

**Since:** 1.5

## AbstractExecutorService.AbstractExecutorService()

```java
public AbstractExecutorService()
```

Constructor for subclasses to call.

## AbstractExecutorService.newTaskFor(Runnable, T)

```java
protected <T> RunnableFuture<T> newTaskFor(Runnable runnable, T value)
```

Returns a `RunnableFuture` for the given runnable and default
value.

Parameters:

- `runnable`: the runnable task being wrapped
- `value`: the default value for the returned future
- `<T>`: the type of the given value

**Returns:** a `RunnableFuture` which, when run, will run the
underlying runnable and which, as a `Future`, will yield
the given value as its result and provide for cancellation of
the underlying task

**Since:** 1.6

## AbstractExecutorService.newTaskFor(Callable<T>)

```java
protected <T> RunnableFuture<T> newTaskFor(Callable<T> callable)
```

Returns a `RunnableFuture` for the given callable task.

Parameters:

- `callable`: the callable task being wrapped
- `<T>`: the type of the callable's result

**Returns:** a `RunnableFuture` which, when run, will call the
underlying callable and which, as a `Future`, will yield
the callable's result as its result and provide for
cancellation of the underlying task

**Since:** 1.6

## AbstractExecutorService.submit(Runnable)

```java
public Future<?> submit(Runnable task)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractExecutorService.submit(Runnable, T)

```java
public <T> Future<T> submit(Runnable task, T result)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractExecutorService.submit(Callable<T>)

```java
public <T> Future<T> submit(Callable<T> task)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractExecutorService.invokeAny(Collection<? extends Callable<T>>)

```java
public <T> T invokeAny(Collection<? extends Callable<T>> tasks) throws InterruptedException, ExecutionException
```

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)
- `ExecutionException`: (inherited documentation)
- `RejectedExecutionException`: (inherited documentation)

## AbstractExecutorService.invokeAny(Collection<? extends Callable<T>>, long, TimeUnit)

```java
public <T> T invokeAny(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `TimeoutException`: (inherited documentation)
- `ExecutionException`: (inherited documentation)
- `RejectedExecutionException`: (inherited documentation)

## AbstractExecutorService.invokeAll(Collection<? extends Callable<T>>)

```java
public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks) throws InterruptedException
```

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `RejectedExecutionException`: (inherited documentation)

## AbstractExecutorService.invokeAll(Collection<? extends Callable<T>>, long, TimeUnit)

```java
public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException
```

Throws:

- `InterruptedException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `RejectedExecutionException`: (inherited documentation)
