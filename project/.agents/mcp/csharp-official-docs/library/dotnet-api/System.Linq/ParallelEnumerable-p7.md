---
title: "ParallelEnumerable class (part 7 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 7 of 16)

## ParallelEnumerable.Join<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, ParallelQuery<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Linq.ParallelQuery<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector);
```

Correlates in parallel the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.

Returns: A sequence that has elements of type `TResult` that are obtained by performing an inner join on two sequences.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null` (`Nothing` in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Join<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

This Join overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when invoked.

Parameters:

- `TOuter`: This type parameter is not used.
- `TInner`: This type parameter is not used.
- `TKey`: This type parameter is not used.
- `TResult`: This type parameter is not used.
- `outer`: This parameter is not used.
- `inner`: This parameter is not used.
- `outerKeySelector`: This parameter is not used.
- `innerKeySelector`: This parameter is not used.
- `resultSelector`: This parameter is not used.
- `comparer`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.Join<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, ParallelQuery<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Linq.ParallelQuery<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Correlates in parallel the elements of two sequences based on matching keys. A specified `IEqualityComparer<T>` is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys.

Returns: A sequence that has elements of type `TResult` that are obtained by performing an inner join on two sequences.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null` (`Nothing` in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Last<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource Last<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the last element of a parallel sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the last element from.

Returns: The value at the last position in the source sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
If the query is not ordered, then the last element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.Last<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static TSource Last<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns the last element of a parallel sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: The last element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: No element in `source` satisfies the condition in `predicate`.

#### Remarks
If the query is not ordered, then the last element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.LastOrDefault<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource? LastOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the last element of a parallel sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return an element from.

Returns: default() if the source sequence is empty; otherwise, the last element in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
If the query is not ordered, then the last element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.LastOrDefault<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static TSource? LastOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns the last element of a parallel sequence that satisfies a condition, or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: default() if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
If the query is not ordered, then the last element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.LongCount<TSource>(ParallelQuery<TSource>) method

```csharp
public static long LongCount<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns an Int64 that represents the total number of elements in a parallel sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be counted.

Returns: The number of elements in the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The number of elements in source is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `OverflowException`: The computed result is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## ParallelEnumerable.LongCount<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static long LongCount<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns an Int64 that represents how many elements in a parallel sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be counted.
- `predicate`: A function to test each element for a condition.

Returns: A number that represents how many elements in the sequence satisfy the condition in the predicate function.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The number of elements in source is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `OverflowException`: The computed result is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## ParallelEnumerable.Max(Decimal>) method

```csharp
public static decimal Max (this System.Linq.ParallelQuery<decimal> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Double>) method

```csharp
public static double Max (this System.Linq.ParallelQuery<double> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Int32>) method

```csharp
public static int Max (this System.Linq.ParallelQuery<int> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Int64>) method

```csharp
public static long Max (this System.Linq.ParallelQuery<long> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.
