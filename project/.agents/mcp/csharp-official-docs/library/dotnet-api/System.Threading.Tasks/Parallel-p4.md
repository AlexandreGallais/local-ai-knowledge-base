---
title: "Parallel class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Parallel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Parallel class (part 4 of 6)

## Parallel.ForEach<TSource>(Partitioner<TSource>, ParallelOptions, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Concurrent.Partitioner<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Action<TSource,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on a `Partitioner` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: The partitioner that contains the original data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source` partitioner returns `false`.

-or-

The exception that is thrown when any methods in the `source` partitioner return `null`.
- `AggregateException`: The exception that is thrown to contain an exception thrown from one of the specified delegates.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

## Parallel.ForEach<TSource>(Partitioner<TSource>, ParallelOptions, Action<TSource>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Concurrent.Partitioner<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Action<TSource> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on a `Partitioner` in which iterations may run in parallel and loop options can be configured.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: The partitioner that contains the original data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source` partitioner returns `false`.

-or-

The exception that is thrown when any methods in the `source` partitioner return `null`.
- `AggregateException`: The exception that is thrown to contain an exception thrown from one of the specified delegates.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

## Parallel.ForEach<TSource>(IEnumerable<TSource>, ParallelOptions, Int64>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Action<TSource,System.Threading.Tasks.ParallelLoopState,long> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with 64-bit indexes on an `IEnumerable` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled
- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and the current element's index (`Int64`).

## Parallel.ForEach<TSource>(IEnumerable<TSource>, ParallelOptions, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Action<TSource,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on an `IEnumerable` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled
- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, and a `ParallelLoopState` instance that may be used to break out of the loop prematurely.

## Parallel.ForEach<TSource>(IEnumerable<TSource>, ParallelOptions, Action<TSource>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Generic.IEnumerable<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Action<TSource> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on an `IEnumerable` in which iterations may run in parallel and loop options can be configured.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled
- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the current element as a parameter.

## Parallel.ForEach<TSource,TLocal>(OrderablePartitioner<TSource>, Func<TLocal>, Int64,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Concurrent.OrderablePartitioner<TSource> source, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,long,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with thread-local data on a `OrderablePartitioner<T>` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `TLocal`: The type of the thread-local data.
- `source`: The orderable partitioner that contains the original data source.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source``Partitioner` returns `false` or the partitioner returns `null` partitions.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

## Parallel.ForEach<TSource,TLocal>(Partitioner<TSource>, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Concurrent.Partitioner<TSource> source, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with thread-local data on a `Partitioner` in which iterations may run in parallel and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `TLocal`: The type of the thread-local data.
- `source`: The partitioner that contains the original data source.
- `localInit`: The function delegate that returns the initial state of the local data for each task.
- `body`: The delegate that is invoked once per iteration.
- `localFinally`: The delegate that performs a final action on the local state of each task.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.

-or-

The `localInit` argument is `null`.

-or-

The `localFinally` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source``Partitioner` returns `false` or the partitioner returns `null` partitions.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

The `localInit` delegate is invoked once for each thread that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.
