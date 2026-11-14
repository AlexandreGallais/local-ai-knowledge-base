---
title: "Parallel class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Parallel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Parallel class (part 6 of 6)

## Parallel.ForEach<TSource,TLocal>(IEnumerable<TSource>, ParallelOptions, Func<TLocal>, Int64,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,long,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with thread-local data and 64-bit indexes on an `IEnumerable` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `TLocal`: The type of the thread-local data.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.
- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, a `ParallelLoopState` instance that may be used to break out of the loop prematurely, the current element's index (`Int64`), and some local state that may be shared amongst iterations that execute on the same thread.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per thread to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

## Parallel.ForEach<TSource,TLocal>(IEnumerable<TSource>, ParallelOptions, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with thread-local data on an `IEnumerable` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `TLocal`: The type of the thread-local data.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.
- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and some local state that may be shared amongst iterations that execute on the same thread.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per thread to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

## Parallel.ForEachAsync<TSource>(IAsyncEnumerable<TSource>, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForEachAsync<TSource> (System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body);
```

Executes a `for-each` operation on an `IEnumerable<T>` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire `for-each` operation.

Exceptions:

- `ArgumentNullException`: `source` or `body` is `null`.

#### Remarks

The operation will execute at most `ProcessorCount` operations in parallel.

## Parallel.ForEachAsync<TSource>(IEnumerable<TSource>, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForEachAsync<TSource> (System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body);
```

Executes a `for-each` operation on an `IEnumerable<T>` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire `for-each` operation.

Exceptions:

- `ArgumentNullException`: `source` or `body` is `null`.

#### Remarks

The operation will execute at most `ProcessorCount` operations in parallel.

## Parallel.ForEachAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForEachAsync<TSource> (System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value>, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body);
```

Executes a `for-each` operation on an `IEnumerable<T>` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `cancellationToken`: A cancellation token that may be used to cancel the `for-each` operation.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire `for-each` operation.

Exceptions:

- `ArgumentNullException`: `source` or `body` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The operation will execute at most `ProcessorCount` operations in parallel.

## Parallel.ForEachAsync<TSource>(IAsyncEnumerable<TSource>, ParallelOptions, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForEachAsync<TSource> (System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body);
```

Executes a `for-each` operation on an `IEnumerable<T>` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire `for-each` operation.

Exceptions:

- `ArgumentNullException`: `source` or `body` is `null`.

To be added.

## Parallel.ForEachAsync<TSource>(IEnumerable<TSource>, CancellationToken, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForEachAsync<TSource> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.CancellationToken <example-value>, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body);
```

Executes a `for-each` operation on an `IEnumerable<T>` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `cancellationToken`: A cancellation token that may be used to cancel the `for-each` operation.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire `for-each` operation.

Exceptions:

- `ArgumentNullException`: `source` or `body` is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The operation will execute at most `ProcessorCount` operations in parallel.

## Parallel.ForEachAsync<TSource>(IEnumerable<TSource>, ParallelOptions, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForEachAsync<TSource> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body);
```

Executes a `for-each` operation on an `IEnumerable<T>` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire `for-each` operation.

Exceptions:

- `ArgumentNullException`: `source` or `body` is `null`.

To be added.

## Parallel.Invoke(Action[]) method

```csharp
public static void Invoke (params Action[] actions);
```

Executes each of the provided actions, possibly in parallel.

Parameters:

- `actions`: An array of `Action` to execute.

Exceptions:

- `ArgumentNullException`: The `actions` argument is `null`.
- `AggregateException`: The exception that is thrown when any action in the `actions` array throws an exception.
- `ArgumentException`: The `actions` array contains a `null` element.

#### Remarks
This method can be used to execute a set of operations, potentially in parallel.

No guarantees are made about the order in which the operations execute or whether they execute in parallel. This method does not return until each of the provided operations has completed, regardless of whether completion occurs due to normal or exceptional termination.

For more information, see How to: Use Parallel.Invoke to Execute Parallel Operations.

#### Examples
This example demonstrates how to use the `Parallel.Invoke` method with other methods, anonymous delegates, and lambda expressions.

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/parallelinvoke.cs._

## Parallel.Invoke(ParallelOptions, Action[]) method

```csharp
public static void Invoke (System.Threading.Tasks.ParallelOptions parallelOptions, params Action[] actions);
```

Executes each of the provided actions, possibly in parallel, unless the operation is cancelled by the user.

Parameters:

- `parallelOptions`: An object that configures the behavior of this operation.
- `actions`: An array of actions to execute.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` is set.
- `ArgumentNullException`: The `actions` argument is `null`.

-or-

The `parallelOptions` argument is `null`.
- `AggregateException`: The exception that is thrown when any action in the `actions` array throws an exception.
- `ArgumentException`: The `actions` array contains a `null` element.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
This method can be used to execute a set of operations, potentially in parallel. The cancellation token <example-value> in with the `ParallelOptions` structure enables the caller to cancel the entire operation. For more information, see Cancellation in Managed Threads.

No guarantees are made about the order in which the operations execute or whether they execute in parallel. This method does not return until each of the provided operations has completed, regardless of whether completion occurs due to normal or exceptional termination.

For more information, see How to: Use Parallel.Invoke to Execute Parallel Operations.
