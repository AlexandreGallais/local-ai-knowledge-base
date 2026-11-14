---
title: "ParallelEnumerable class (part 1 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class

Namespace: `System.Linq`

```csharp
public static class ParallelEnumerable
```

Provides a set of methods for querying objects that implement ParallelQuery{TSource}. This is the parallel equivalent of `Enumerable`.

To be added.

## ParallelEnumerable.Aggregate<TSource>(ParallelQuery<TSource>, Func<TSource,TSource,TSource>) method

```csharp
public static TSource Aggregate<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TSource,TSource> func);
```

Applies in parallel an accumulator function over a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to aggregate over.
- `func`: An accumulator function to be invoked on each element.

Returns: The final accumulator value.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `func` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Aggregate<TSource,TAccumulate>(ParallelQuery<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>) method

```csharp
public static TAccumulate Aggregate<TSource,TAccumulate> (this System.Linq.ParallelQuery<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func);
```

Applies in parallel an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `source`: A sequence to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.

Returns: The final accumulator value.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `func` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Aggregate<TSource,TAccumulate,TResult>(ParallelQuery<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, Func<TAccumulate,TResult>) method

```csharp
public static TResult Aggregate<TSource,TAccumulate,TResult> (this System.Linq.ParallelQuery<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func, Func<TAccumulate,TResult> resultSelector);
```

Applies in parallel an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: A sequence to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `resultSelector`: A function to transform the final accumulator value into the result value.

Returns: The transformed final accumulator value.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `func` or `resultSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Aggregate<TSource,TAccumulate,TResult>(ParallelQuery<TSource>, Func<TAccumulate>, Func<TAccumulate,TSource,TAccumulate>, Func<TAccumulate,TAccumulate,TAccumulate>, Func<TAccumulate,TResult>) method

```csharp
public static TResult Aggregate<TSource,TAccumulate,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TAccumulate> seedFactory, Func<TAccumulate,TSource,TAccumulate> updateAccumulatorFunc, Func<TAccumulate,TAccumulate,TAccumulate> combineAccumulatorsFunc, Func<TAccumulate,TResult> resultSelector);
```

Applies in parallel an accumulator function over a sequence. This overload is not available in the sequential implementation.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: A sequence to aggregate over.
- `seedFactory`: A function that returns the initial accumulator value.
- `updateAccumulatorFunc`: An accumulator function to be invoked on each element in a partition.
- `combineAccumulatorsFunc`: An accumulator function to be invoked on the yielded accumulator result from each partition.
- `resultSelector`: A function to transform the final accumulator value into the result value.

Returns: The transformed final accumulator value.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `seedFactory` or `updateAccumulatorFunc` or `combineAccumulatorsFunc` or `resultSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This overload is specific to parallelized queries. A parallelized query may partition the data source sequence into several sub-sequences (partitions). The `updateAccumulatorFunc` is invoked on each element within partitions. Each partition then yields a single accumulated result. The `combineAccumulatorsFunc` is then invoked on the results of each partition to yield a single element. This element is then transformed by the `resultSelector` function.

## ParallelEnumerable.Aggregate<TSource,TAccumulate,TResult>(ParallelQuery<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, Func<TAccumulate,TAccumulate,TAccumulate>, Func<TAccumulate,TResult>) method

```csharp
public static TResult Aggregate<TSource,TAccumulate,TResult> (this System.Linq.ParallelQuery<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> updateAccumulatorFunc, Func<TAccumulate,TAccumulate,TAccumulate> combineAccumulatorsFunc, Func<TAccumulate,TResult> resultSelector);
```

Applies in parallel an accumulator function over a sequence. This overload is not available in the sequential implementation.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: A sequence to aggregate over.
- `seed`: The initial accumulator value.
- `updateAccumulatorFunc`: An accumulator function to be invoked on each element in a partition.
- `combineAccumulatorsFunc`: An accumulator function to be invoked on the yielded accumulator result from each partition.
- `resultSelector`: A function to transform the final accumulator value into the result value.

Returns: The transformed final accumulator value.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `updateAccumulatorFunc` or `combineAccumulatorsFunc` or `resultSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This overload is specific to processing a parallelized query. A parallelized query may partition the data source sequence into several sub-sequences (partitions). The `updateAccumulatorFunc` is invoked on each element within partitions. Each partition then yields a single accumulated result. The `combineAccumulatorsFunc` is then invoked on the results of each partition to yield a single element. This element is then transformed by the `resultSelector` function.

## ParallelEnumerable.All<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static bool All<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Determines in parallel whether all elements of a sequence satisfy a condition.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence whose elements to apply the predicate to.
- `predicate`: A function to test each element for a condition.

Returns: `true` if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Any<TSource>(ParallelQuery<TSource>) method

```csharp
public static bool Any<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Determines whether a parallel sequence contains any elements.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to check for emptiness.

Returns: `true` if the source sequence contains any elements; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
This overload of the Any method causes a fully-buffered merge to be performed before the result is returned. The merge behavior can impact performance or cause an out of memory exception in large enumerables. To avoid the merge behavior, use the overload of Any that takes a Func parameter, or else use an alternative method such as FirstOrDefault.

## ParallelEnumerable.Any<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static bool Any<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Determines in parallel whether any element of a sequence satisfies a condition.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence to whose elements the predicate will be applied.
- `predicate`: A function to test each element for a condition.

Returns: `true` if any elements in the source sequence pass the test in the specified predicate; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.AsEnumerable<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> AsEnumerable<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Converts a `ParallelQuery<T>` into an `IEnumerable<T>` to force sequential evaluation of the query.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to cast as `IEnumerable<T>`.

Returns: The input sequence typed as `IEnumerable<T>`.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).

To be added.

## ParallelEnumerable.AsOrdered(ParallelQuery) method

```csharp
public static System.Linq.ParallelQuery AsOrdered (this System.Linq.ParallelQuery source);
```

Enables treatment of a data source as if it were ordered, overriding the default of unordered. AsOrdered may only be invoked on non-generic sequences returned by AsParallel, ParallelEnumerable.Range, and ParallelEnumerable.Repeat.

Parameters:

- `source`: The input sequence.

Returns: The source sequence that will maintain the original ordering in the subsequent query operators.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `InvalidOperationException`: thrown if `source` contains no elements

-or-

if `AsOrdered` is called midway through a query. It is allowed to be called immediately after `ParallelEnumerable.AsParallel`, `ParallelEnumerable.Range`, or `ParallelEnumerable.Repeat<T>`.

-or-

`source` is not one of `ParallelEnumerable.AsParallel`, `ParallelEnumerable.Range`, or `ParallelEnumerable.Repeat<T>`.

#### Remarks
A natural tension exists between performance and preserving order in parallel processing. By default, a parallelized query behaves as if the ordering of the results is arbitrary unless AsOrdered is applied or there is an explicit OrderBy operator in the query. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.AsOrdered<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> AsOrdered<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Enables treatment of a data source as if it were ordered, overriding the default of unordered. AsOrdered may only be invoked on generic sequences returned by AsParallel, ParallelEnumerable.Range, and ParallelEnumerable.Repeat.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The input sequence.

Returns: The source sequence that will maintain the original ordering in the subsequent query operators.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `InvalidOperationException`: `source` contains no elements

-or-

`source` is not one of AsParallel, ParallelEnumerable.Range, or ParallelEnumerable.Repeat.

#### Remarks
A natural tension exists between performance and preserving order in parallel processing. By default, a parallelized query behaves as if the ordering of the results is arbitrary unless AsOrdered is applied or there is an explicit OrderBy operator in the query. For more information, see Order Preservation in PLINQ.
