---
title: "Parallel class (part 5 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Parallel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Parallel class (part 5 of 6)

## Parallel.ForEach<TSource,TLocal>(IEnumerable<TSource>, Func<TLocal>, Int64,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Generic.IEnumerable<TSource> source, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,long,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with thread-local data on an `IEnumerable` in which iterations may run in parallel and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `TLocal`: The type of the thread-local data.
- `source`: An enumerable data source.
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
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, a `ParallelLoopState` instance that may be used to break out of the loop prematurely, the current element's index (`Int64`), and some local state that may be shared amongst iterations that execute on the same thread.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

## Parallel.ForEach<TSource,TLocal>(IEnumerable<TSource>, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Generic.IEnumerable<TSource> source, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with thread-local data on an `IEnumerable` in which iterations may run in parallel, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `TLocal`: The type of the thread-local data.
- `source`: An enumerable data source.
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
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and some local state that may be shared amongst iterations that execute on the same thread.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per thread to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

#### Examples
The following example shows how to use a `Parallel.ForEach` method with local state:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/Overview/parallelforeach.cs._

## Parallel.ForEach<TSource,TLocal>(OrderablePartitioner<TSource>, ParallelOptions, Func<TLocal>, Int64,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Concurrent.OrderablePartitioner<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,long,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with 64-bit indexes and  with thread-local data on a `OrderablePartitioner<T>` in which iterations may run in parallel , loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `TLocal`: The type of the thread-local data.
- `source`: The orderable partitioner that contains the original data source.
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

The `localInit` or `localFinally` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source``Partitioner` returns `false` or the partitioner returns `null` partitions.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each thread returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.

## Parallel.ForEach<TSource,TLocal>(Partitioner<TSource>, ParallelOptions, Func<TLocal>, ParallelLoopState,TLocal,TLocal>, Action<TLocal>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource,TLocal> (System.Collections.Concurrent.Partitioner<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Func<TLocal> localInit, Func<TSource,System.Threading.Tasks.ParallelLoopState,TLocal,TLocal> body, Action<TLocal> localFinally);
```

Executes a `foreach` (`For Each` in Visual Basic) operation  with thread-local data on a `Partitioner` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `TLocal`: The type of the thread-local data.
- `source`: The partitioner that contains the original data source.
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
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source``Partitioner` returns `false` or the partitioner returns `null` partitions.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.
- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. This overload is provided for scenarios with small loop bodies that might benefit from static range partitioning. Partitioners must support dynamic partitions.  For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

The `localInit` delegate is invoked once for each task that participates in the loop's execution and returns the initial local state for each of those tasks. These initial states are passed to the first `body` invocations on each task. Then, every subsequent body invocation returns a possibly modified state value that is passed to the next body invocation. Finally, the last body invocation on each task returns a state value that is passed to the `localFinally` delegate. The `localFinally` delegate is invoked once per task to perform a final action on each task's local state. This delegate might be invoked concurrently on multiple tasks; therefore, you must synchronize access to any shared variables.

The `Parallel.ForEach` method may use more tasks than threads over the lifetime of its execution, as existing tasks complete and are replaced by new tasks. This gives the underlying `TaskScheduler` object the chance to add, change, or remove threads that service the loop.
