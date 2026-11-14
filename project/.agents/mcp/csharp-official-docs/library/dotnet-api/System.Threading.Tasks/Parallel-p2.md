---
title: "Parallel class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Parallel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Parallel class (part 2 of 6)

## Parallel.For(Int64, Int64, ParallelOptions, Int64>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For (long fromInclusive, long toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Action<long> body);
```

Executes a `for` loop with 64-bit indexes in which iterations may run in parallel and loop options can be configured.

Parameters:

- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
Supports 64-bit indexes. The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the iteration count (`Int64`) as a parameter.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.

#### Examples
The following example shows how to use `ParallelOptions` to specify a custom task scheduler:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/parallelforwithscheduler.cs._

## Parallel.For<TLocal>(Int32, Int32, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For<TLocal> (int fromInclusive, int toExclusive, Func<TLocal> localInit, Func<int,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `for` loop with thread-local data in which iterations may run in parallel, and the state of the loop can be monitored and manipulated.

Parameters:

- `TLocal`: The type of the thread-local data.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int32`), a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and some local state that may be shared amongst iterations that execute on the same thread.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.For` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.

For an example that uses this method, see How to: Write a Parallel.For Loop with Thread-Local Variables.

## Parallel.For<TLocal>(Int64, Int64, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For<TLocal> (long fromInclusive, long toExclusive, Func<TLocal> localInit, Func<long,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `for` loop with 64-bit indexes and thread-local data in which iterations may run in parallel, and the state of the loop can be monitored and manipulated.

Parameters:

- `TLocal`: The type of the thread-local data.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int64`), a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and some local state that may be shared amongst iterations that execute on the same task.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.For` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.

For an example that uses this method, see How to: Write a Parallel.For Loop with Thread-Local Variables.

## Parallel.For<TLocal>(Int32, Int32, ParallelOptions, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For<TLocal> (int fromInclusive, int toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TLocal> localInit, Func<int,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `for` loop with thread-local data in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TLocal`: The type of the thread-local data.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int32`), a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and some local state that may be shared amongst iterations that execute on the same task.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple threads; therefore, you must synchronize access to any shared variables.

The `Parallel.For` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.

#### Examples
The following example uses thread-local variables to compute the sum of the results of many lengthy operations. This example limits the degree of parallelism to four.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/threadlocalforwithoptions.cs._

## Parallel.For<TLocal>(Int64, Int64, ParallelOptions, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult For<TLocal> (long fromInclusive, long toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TLocal> localInit, Func<long,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `for` loop with 64-bit indexes and thread-local data in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TLocal`: The type of the thread-local data.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `localInit`: The function delegate that returns the initial state of the local data for each thread.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each thread.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each value in the iteration range (`fromInclusive`, `toExclusive`). It is provided with the following parameters: the iteration count (`Int64`), a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and some local state that may be shared amongst iterations that execute on the same thread.

The `localInit` delegate is invoked once for each thread that participates in the loop's execution and returns the initial local state for each of those threads. These initial states are passed to the first `body` invocations on each thread. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each thread returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per thread to perform a final action on each thread's local state. This delegate might be invoked concurrently on multiple threads; therefore, you must synchronize access to any shared variables.

The `Parallel.For` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

If `fromInclusive` is greater than or equal to `toExclusive`, then the method returns immediately without performing any iterations.
