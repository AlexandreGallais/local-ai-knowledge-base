# AbstractExecutorService class (java.util.concurrent)

```java
public abstract class AbstractExecutorService implements ExecutorService
```

Provides default implementations of {@link ExecutorService}
execution methods. This class implements the {@code submit},
{@code invokeAny} and {@code invokeAll} methods using a
{@link RunnableFuture} returned by {@code newTaskFor}, which defaults
to the {@link FutureTask} class provided in this package.  For example,
the implementation of {@code submit(Runnable)} creates an
associated {@code RunnableFuture} that is executed and
returned. Subclasses may override the {@code newTaskFor} methods
to return {@code RunnableFuture} implementations other than
{@code FutureTask}.

<p><b>Extension example.</b> Here is a sketch of a class
that customizes {@link ThreadPoolExecutor} to use
a {@code CustomTask} class instead of the default {@code FutureTask}:
<pre> {@code
public class CustomThreadPoolExecutor extends ThreadPoolExecutor {

  static class CustomTask<V> implements RunnableFuture<V> { ... }

  protected <V> RunnableFuture<V> newTaskFor(Callable<V> c) {
      return new CustomTask<V>(c);
  }
  protected <V> RunnableFuture<V> newTaskFor(Runnable r, V v) {
      return new CustomTask<V>(r, v);
  }
  // ... add constructors, etc.
}}</pre>

@since 1.5
@author Doug Lea

## AbstractExecutorService.AbstractExecutorService()

```java
public AbstractExecutorService()
```

Constructor for subclasses to call.

## AbstractExecutorService.newTaskFor(Runnable, T)

```java
protected <T> RunnableFuture<T> newTaskFor(Runnable runnable, T value)
```

Returns a {@code RunnableFuture} for the given runnable and default
value.

@param runnable the runnable task being wrapped
@param value the default value for the returned future
@param <T> the type of the given value
@return a {@code RunnableFuture} which, when run, will run the
underlying runnable and which, as a {@code Future}, will yield
the given value as its result and provide for cancellation of
the underlying task
@since 1.6

## AbstractExecutorService.newTaskFor(Callable<T>)

```java
protected <T> RunnableFuture<T> newTaskFor(Callable<T> callable)
```

Returns a {@code RunnableFuture} for the given callable task.

@param callable the callable task being wrapped
@param <T> the type of the callable's result
@return a {@code RunnableFuture} which, when run, will call the
underlying callable and which, as a {@code Future}, will yield
the callable's result as its result and provide for
cancellation of the underlying task
@since 1.6

## AbstractExecutorService.submit(Runnable)

```java
public Future<?> submit(Runnable task)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## AbstractExecutorService.submit(Runnable, T)

```java
public <T> Future<T> submit(Runnable task, T result)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## AbstractExecutorService.submit(Callable<T>)

```java
public <T> Future<T> submit(Callable<T> task)
```

@throws RejectedExecutionException {@inheritDoc}
@throws NullPointerException       {@inheritDoc}

## AbstractExecutorService.invokeAny(Collection<? extends Callable<T>>)

```java
public <T> T invokeAny(Collection<? extends Callable<T>> tasks) throws InterruptedException, ExecutionException
```

@throws InterruptedException       {@inheritDoc}
@throws NullPointerException       {@inheritDoc}
@throws IllegalArgumentException   {@inheritDoc}
@throws ExecutionException         {@inheritDoc}
@throws RejectedExecutionException {@inheritDoc}

## AbstractExecutorService.invokeAny(Collection<? extends Callable<T>>, long, TimeUnit)

```java
public <T> T invokeAny(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException
```

@throws InterruptedException       {@inheritDoc}
@throws NullPointerException       {@inheritDoc}
@throws TimeoutException           {@inheritDoc}
@throws ExecutionException         {@inheritDoc}
@throws RejectedExecutionException {@inheritDoc}

## AbstractExecutorService.invokeAll(Collection<? extends Callable<T>>)

```java
public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks) throws InterruptedException
```

@throws InterruptedException       {@inheritDoc}
@throws NullPointerException       {@inheritDoc}
@throws RejectedExecutionException {@inheritDoc}

## AbstractExecutorService.invokeAll(Collection<? extends Callable<T>>, long, TimeUnit)

```java
public <T> List<Future<T>> invokeAll(Collection<? extends Callable<T>> tasks, long timeout, TimeUnit unit) throws InterruptedException
```

@throws InterruptedException       {@inheritDoc}
@throws NullPointerException       {@inheritDoc}
@throws RejectedExecutionException {@inheritDoc}