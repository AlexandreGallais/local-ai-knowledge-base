---
title: "ExecutorCompletionService class (java.util.concurrent)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ExecutorCompletionService.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ExecutorCompletionService class (java.util.concurrent)

```java
public class ExecutorCompletionService<V> implements CompletionService<V>
```

A `CompletionService` that uses a supplied `Executor`
to execute tasks.  This class arranges that submitted tasks are,
upon completion, placed on a queue accessible using `take`.
The class is lightweight enough to be suitable for transient use
when processing groups of tasks.

**Usage Examples.**

Suppose you have a set of solvers for a certain problem, each
returning a value of some type `Result`, and would like to
run them concurrently, processing the results of each of them that
return a non-null value, in some method `use(Result r)`. You
could write this as:

```java
void solve(Executor e,
           Collection<Callable<Result>> solvers)
    throws InterruptedException, ExecutionException {
  CompletionService<Result> cs
      = new ExecutorCompletionService<>(e);
  solvers.forEach(cs::submit);
  for (int i = solvers.size(); i > 0; i--) {
    Result r = cs.take().get();
    if (r != null)
      use(r);
  }
}
```

Suppose instead that you would like to use the first non-null result
of the set of tasks, ignoring any that encounter exceptions,
and cancelling all other tasks when the first one is ready:

```java
void solve(Executor e,
           Collection<Callable<Result>> solvers)
    throws InterruptedException {
  CompletionService<Result> cs
      = new ExecutorCompletionService<>(e);
  int n = solvers.size();
  List<Future<Result>> futures = new ArrayList<>(n);
  Result result = null;
  try {
    solvers.forEach(solver -> futures.add(cs.submit(solver)));
    for (int i = n; i > 0; i--) {
      try {
        Result r = cs.take().get();
        if (r != null) {
          result = r;
          break;
        }
      } catch (ExecutionException ignore) {}
    }
  } finally {
    futures.forEach(future -> future.cancel(true));
  }

  if (result != null)
    use(result);
}
```

Parameters:

- `<V>`: the type of values the tasks of this service produce and consume

**Since:** 1.5

## ExecutorCompletionService.ExecutorCompletionService(Executor)

```java
public ExecutorCompletionService(Executor executor)
```

Creates an ExecutorCompletionService using the supplied
executor for base task execution and a
`LinkedBlockingQueue` as a completion queue.

Parameters:

- `executor`: the executor to use

Throws:

- `NullPointerException`: if executor is `null`

## ExecutorCompletionService.ExecutorCompletionService(Executor, BlockingQueue<Future<V>>)

```java
public ExecutorCompletionService(Executor executor, BlockingQueue<Future<V>> completionQueue)
```

Creates an ExecutorCompletionService using the supplied
executor for base task execution and the supplied queue as its
completion queue.

Parameters:

- `executor`: the executor to use
- `completionQueue`: the queue to use as the completion queue normally one dedicated for use by this service. This queue is treated as unbounded -- failed attempted `Queue.add` operations for completed tasks cause them not to be retrievable.

Throws:

- `NullPointerException`: if executor or completionQueue are `null`

## ExecutorCompletionService.submit(Callable<V>)

```java
public Future<V> submit(Callable<V> task)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## ExecutorCompletionService.submit(Runnable, V)

```java
public Future<V> submit(Runnable task, V result)
```

Throws:

- `RejectedExecutionException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
