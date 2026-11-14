---
title: "ParallelEnumerable class (part 2 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 2 of 16)

## ParallelEnumerable.AsParallel(IEnumerable) method

```csharp
public static System.Linq.ParallelQuery AsParallel (this System.Collections.IEnumerable source);
```

Enables parallelization of a query.

Parameters:

- `source`: An `IEnumerable<T>` to convert to a `ParallelQuery`.

Returns: The source as a ParallelQuery to bind to ParallelEnumerable extension methods.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).

#### Remarks
The `ParallelEnumerable.Cast` operator can be used to convert a ParallelQuery to a ParallelQuery(T).

## ParallelEnumerable.AsParallel<TSource>(Partitioner<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> AsParallel<TSource> (this System.Collections.Concurrent.Partitioner<TSource> source);
```

Enables parallelization of a query, as sourced by a custom partitioner that is responsible for splitting the input sequence into partitions.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A partitioner over the input sequence.

Returns: The `source` as a ParallelQuery to bind to ParallelEnumerable extension methods.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).

#### Remarks
The source partitioner's GetOrderedPartitions method is used when ordering is enabled, whereas the partitioner's GetPartitions is used if ordering is not enabled (the default). The source partitioner's GetDynamicPartitions and GetDynamicOrderedPartitions are not used. For more information and examples, see Custom Partitioners for PLINQ and TPL.

## ParallelEnumerable.AsParallel<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> AsParallel<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Enables parallelization of a query.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: An `IEnumerable<T>` to convert to a `ParallelQuery<T>`.

Returns: The source as a `ParallelQuery<T>` to bind to ParallelEnumerable extension methods.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).

To be added.

## ParallelEnumerable.AsSequential<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> AsSequential<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Converts a `ParallelQuery<T>` into an `IEnumerable<T>` to force sequential evaluation of the query.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A `ParallelQuery<T>` to convert to an `IEnumerable<T>`.

Returns: The source as an `IEnumerable<T>` to bind to sequential extension methods.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).

#### Remarks
For more information, see Order Preservation in PLINQ and How to: Control Ordering in a PLINQ Query.

## ParallelEnumerable.AsUnordered<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> AsUnordered<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Allows an intermediate query to be treated as if no ordering is implied among the elements.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The input sequence.

Returns: The source sequence with arbitrary order.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).

#### Remarks
AsUnordered may provide performance benefits when ordering is not required in a portion of a query. By default, PLINQ treats an input sequence as unordered unless OrderBy or AsOrdered is specified. However, if ordering was turned on and is no longer needed, then AsUnordered can be used to turn it off in mid-query, and this may result in performance benefits. The AsUnordered operator itself does not shuffle the source sequence; it simply removes the ordering requirement for subsequent operators. If the source is ordered, subsequent operators might keep that ordering if it is more efficient to do so. AsUnordered can be called anywhere in the query; it does not need to be called immediately after AsParallel. For more information, see Understanding Speedup in PLINQ and Order Preservation in PLINQ.

## ParallelEnumerable.Average(Decimal>) method

```csharp
public static decimal Average (this System.Linq.ParallelQuery<decimal> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Double>) method

```csharp
public static double Average (this System.Linq.ParallelQuery<double> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Int32>) method

```csharp
public static double Average (this System.Linq.ParallelQuery<int> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Int64>) method

```csharp
public static double Average (this System.Linq.ParallelQuery<long> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Decimal>>) method

```csharp
public static decimal? Average (this System.Linq.ParallelQuery<decimal?> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Double>>) method

```csharp
public static double? Average (this System.Linq.ParallelQuery<double?> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: The source sequence.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is `null`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Int32>>) method

```csharp
public static double? Average (this System.Linq.ParallelQuery<int?> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Int64>>) method

```csharp
public static double? Average (this System.Linq.ParallelQuery<long?> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Single>>) method

```csharp
public static float? Average (this System.Linq.ParallelQuery<float?> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average(Single>) method

```csharp
public static float Average (this System.Linq.ParallelQuery<float> source);
```

Computes in parallel the average of a sequence of values.

Parameters:

- `source`: A sequence of values that are used to calculate an average.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Decimal>) method

```csharp
public static decimal Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Double>) method

```csharp
public static double Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.
