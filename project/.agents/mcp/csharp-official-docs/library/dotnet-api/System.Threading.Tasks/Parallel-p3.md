---
title: "Parallel class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.Tasks/Parallel.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Parallel class (part 3 of 6)

## Parallel.ForAsync<T>(T, T, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForAsync<T> (T fromInclusive, T toExclusive, Func<T,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body) where T : System.Numerics.IBinaryInteger<T>;
```

Executes a for loop in which iterations may run in parallel.

Parameters:

- `T`: To be added.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire for each operation.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.

The operation will execute at most `Environment.ProcessorCount` operations in parallel.

## Parallel.ForAsync<T>(T, T, CancellationToken, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForAsync<T> (T fromInclusive, T toExclusive, System.Threading.CancellationToken <example-value>, Func<T,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body) where T : System.Numerics.IBinaryInteger<T>;
```

Executes a for loop in which iterations may run in parallel.

Parameters:

- `T`: To be added.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `cancellationToken`: A cancellation token that may be used to cancel the for each operation.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire for each operation.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

The operation will execute at most `Environment.ProcessorCount` operations in parallel.

## Parallel.ForAsync<T>(T, T, ParallelOptions, ValueTask>) method

```csharp
public static System.Threading.Tasks.Task ForAsync<T> (T fromInclusive, T toExclusive, System.Threading.Tasks.ParallelOptions parallelOptions, Func<T,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask> body) where T : System.Numerics.IBinaryInteger<T>;
```

Executes a for loop in which iterations may run in parallel.

Parameters:

- `T`: To be added.
- `fromInclusive`: The start index, inclusive.
- `toExclusive`: The end index, exclusive.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: An asynchronous delegate that is invoked once per element in the data source.

Returns: A task that represents the entire for each operation.

Exceptions:

- `ArgumentNullException`: The `body` argument is `null`.

The operation will execute at most `Environment.ProcessorCount` operations in parallel.

## Parallel.ForEach<TSource>(OrderablePartitioner<TSource>, Int64>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Concurrent.OrderablePartitioner<TSource> source, Action<TSource,System.Threading.Tasks.ParallelLoopState,long> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on a `OrderablePartitioner<T>` in which iterations may run in parallel and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: The orderable partitioner that contains the original data source.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source` orderable partitioner returns `false`.

-or-

The `OrderablePartitioner<T>.KeysNormalized` property in the source orderable partitioner returns `false`.

-or-

Any methods in the source orderable partitioner return `null`.
- `AggregateException`: The exception thrown from one of the specified delegates.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

## Parallel.ForEach<TSource>(Partitioner<TSource>, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Concurrent.Partitioner<TSource> source, Action<TSource,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on a `Partitioner` in which iterations may run in parallel, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: The partitioner that contains the original data source.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source` partitioner returns `false`.

-or-

A method in the `source` partitioner returns `null`.

-or-

The `Partitioner<T>.GetPartitions` method in the `source` partitioner does not return the correct number of partitions.
- `AggregateException`: The exception that is thrown to contain an exception thrown from one of the specified delegates.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

## Parallel.ForEach<TSource>(Partitioner<TSource>, Action<TSource>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Concurrent.Partitioner<TSource> source, Action<TSource> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on a `Partitioner` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: The partitioner that contains the original data source.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is  `null`.

-or-

The `body` argument is `null`.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source` partitioner returns `false`.

-or-

The exception that is thrown when any methods in the `source` partitioner return `null`.

-or-

The `Partitioner<T>.GetPartitions` method in the `source` partitioner does not return the correct number of partitions.
- `AggregateException`: The exception that is thrown to contain an exception thrown from one of the specified delegates.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.

#### Examples
The following example shows how to implement a range partitioner for use with `Parallel.ForEach`:

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/ForEachTSource/rangepartitioner.cs._

## Parallel.ForEach<TSource>(IEnumerable<TSource>, Int64>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Generic.IEnumerable<TSource> source, Action<TSource,System.Threading.Tasks.ParallelLoopState,long> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation with 64-bit indexes on an `IEnumerable` in which iterations may run in parallel, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, a `ParallelLoopState` instance that may be used to break out of the loop prematurely, and the current element's index (`Int64`).

## Parallel.ForEach<TSource>(IEnumerable<TSource>, ParallelLoopState>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Generic.IEnumerable<TSource> source, Action<TSource,System.Threading.Tasks.ParallelLoopState> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on an `IEnumerable` in which iterations may run in parallel, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the following parameters: the current element, and a `ParallelLoopState` instance that may be used to break out of the loop prematurely.

## Parallel.ForEach<TSource>(IEnumerable<TSource>, Action<TSource>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Generic.IEnumerable<TSource> source, Action<TSource> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on an `IEnumerable` in which iterations may run in parallel.

Parameters:

- `TSource`: The type of the data in the source.
- `source`: An enumerable data source.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `ArgumentNullException`: The `source` argument is `null`.

-or-

The `body` argument is `null`.
- `AggregateException`: The exception that contains all the individual exceptions thrown on all threads.

#### Remarks
The `body` delegate is invoked once for each element in the `source` enumerable. It is provided with the current element as a parameter.

#### Examples
The following example uses the `ForEach<T>` method to count the number of vowels and non-white-space characters in a text file. In this case, the `ParallelLoopResult` value returned by the method is ignored. Note that, because operations can run in parallel, you must ensure that incrementing the counter variables is an atomic operation, and that multiple threads do not attempt to access the counter variables simultaneously. For this purpose, the example uses the `lock` statement (in C#) and the `SyncLock` statement (in Visual Basic).

_Code sample not included: ~/snippets/csharp/System.Threading.Tasks/Parallel/ForEachTSource/foreach1.cs._

## Parallel.ForEach<TSource>(OrderablePartitioner<TSource>, ParallelOptions, Int64>) method

```csharp
public static System.Threading.Tasks.ParallelLoopResult ForEach<TSource> (System.Collections.Concurrent.OrderablePartitioner<TSource> source, System.Threading.Tasks.ParallelOptions parallelOptions, Action<TSource,System.Threading.Tasks.ParallelLoopState,long> body);
```

Executes a `foreach` (`For Each` in Visual Basic) operation on a `OrderablePartitioner<T>` in which iterations may run in parallel, loop options can be configured, and the state of the loop can be monitored and manipulated.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: The orderable partitioner that contains the original data source.
- `parallelOptions`: An object that configures the behavior of this operation.
- `body`: The delegate that is invoked once per iteration.

Returns: A structure that contains information about which portion of the loop completed.

Exceptions:

- `OperationCanceledException`: The `CancellationToken` in the `parallelOptions` argument is canceled
- `ArgumentNullException`: The `source` argument is  `null`.

-or-

The `parallelOptions` argument is `null`.

-or-

The `body` argument is `null`.
- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `CancellationToken` in the `parallelOptions` has been disposed.
- `InvalidOperationException`: The `Partitioner<T>.SupportsDynamicPartitions` property in the `source` orderable partitioner returns `false`.

-or-

The `OrderablePartitioner<T>.KeysNormalized` property in the `source` orderable partitioner returns `false`.

-or-

The exception that is thrown when any methods in the `source` orderable partitioner return `null`.
- `AggregateException`: The exception that is thrown to contain an exception thrown from one of the specified delegates.

#### Remarks
This overload is provided for scenarios where you want to override the default partitioning scheme. For example, small loop bodies might benefit from partitioning the range. The `Parallel.ForEach` method expects custom partitioners to support dynamic partitioning. For more information, see Custom Partitioners for PLINQ and TPL and How to: Implement Dynamic Partitions.
