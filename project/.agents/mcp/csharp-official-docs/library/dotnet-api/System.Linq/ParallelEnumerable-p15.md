---
title: "ParallelEnumerable class (part 15 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 15 of 16)

## ParallelEnumerable.ToLookup<TSource,TKey,TElement>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>) method

```csharp
public static System.Linq.ILookup<TKey,TElement> ToLookup<TSource,TKey,TElement> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector);
```

Creates an `ILookup<T1,T2>` from a `ParallelQuery<T>` according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: The sequence to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.

Returns: A `ILookup<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToLookup<TSource,TKey,TElement>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ILookup<TKey,TElement> ToLookup<TSource,TKey,TElement> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates an `ILookup<T1,T2>` from a `ParallelQuery<T>` according to a specified key <example-value> function, a comparer and an element selector function.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: The sequence to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A Lookup<(Of <(TKey, TElement>)>) that contains values of type TElement selected from the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Union<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Union<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

This Union overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Union<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Union<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second);
```

Produces the set union of two parallel sequences by using the default equality comparer.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence whose distinct elements form the first set for the union.
- `second`: A sequence whose distinct elements form the second set for the union.

Returns: A sequence that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Union<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Union<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

This Union overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.
- `comparer`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Union<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Union<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set union of two parallel sequences by using a specified IEqualityComparer{T}.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence whose distinct elements form the first set for the union.
- `second`: A sequence whose distinct elements form the second set for the union.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Where<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Where<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Filters in parallel a sequence of values based on a predicate.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence to filter.
- `predicate`: A function to test each element for a condition.

Returns: A sequence that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Where<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Where<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int,bool> predicate);
```

Filters in parallel a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence to filter.
- `predicate`: A function to test each element for a condition.

Returns: A sequence that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by the query.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.WithCancellation<TSource>(ParallelQuery<TSource>, CancellationToken) method

```csharp
public static System.Linq.ParallelQuery<TSource> WithCancellation<TSource> (this System.Linq.ParallelQuery<TSource> source, System.Threading.CancellationToken <example-value>);
```

Sets the `CancellationToken` to associate with the query.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A ParallelQuery on which to set the option.
- `cancellationToken`: A cancellation token.

Returns: A ParallelQuery representing the same query as `source`, but with the registered cancellation token.

Exceptions:

- `ObjectDisposedException`: The `CancellationTokenSource` associated with the `cancellationToken` has been disposed.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `InvalidOperationException`: `ParallelEnumerable.WithCancellation<T>` is used multiple times in the query.

To be added.

## ParallelEnumerable.WithDegreeOfParallelism<TSource>(ParallelQuery<TSource>, Int32) method

```csharp
public static System.Linq.ParallelQuery<TSource> WithDegreeOfParallelism<TSource> (this System.Linq.ParallelQuery<TSource> source, int degreeOfParallelism);
```

Sets the degree of parallelism to use in a query. Degree of parallelism is the maximum number of concurrently executing tasks that will be used to process the query.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A ParallelQuery on which to set the limit on the degrees of parallelism.
- `degreeOfParallelism`: The degree of parallelism for the query.

Returns: ParallelQuery representing the same query as source, with the limit on the degrees of parallelism set.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `degreeOfParallelism` is less than 1 or greater than 512.
- `InvalidOperationException`: WithDegreeOfParallelism is used multiple times in the query.

To be added.

## ParallelEnumerable.WithExecutionMode<TSource>(ParallelQuery<TSource>, ParallelExecutionMode) method

```csharp
public static System.Linq.ParallelQuery<TSource> WithExecutionMode<TSource> (this System.Linq.ParallelQuery<TSource> source, System.Linq.ParallelExecutionMode executionMode);
```

Sets the execution mode of the query.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A ParallelQuery on which to set the option.
- `executionMode`: The mode in which to execute the query.

Returns: ParallelQuery representing the same query as source, but with the registered execution mode.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `ArgumentException`: `executionMode` is not a valid `ParallelExecutionMode` value.
- `InvalidOperationException`: WithExecutionMode is used multiple times in the query.

#### Remarks
The execution mode specifies whether PLINQ will attempt to fall back to sequential execution if it detects certain query shapes. For more information and examples, see How to: Specify the Execution Mode in PLINQ.

## ParallelEnumerable.WithMergeOptions<TSource>(ParallelQuery<TSource>, ParallelMergeOptions) method

```csharp
public static System.Linq.ParallelQuery<TSource> WithMergeOptions<TSource> (this System.Linq.ParallelQuery<TSource> source, System.Linq.ParallelMergeOptions mergeOptions);
```

Sets the merge options for this query, which specify how the query will buffer output.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A ParallelQuery on which to set the option.
- `mergeOptions`: The merge options to set for this query.

Returns: ParallelQuery representing the same query as source, but with the registered merge options.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `ArgumentException`: `mergeOptions` is not a valid `ParallelMergeOptions` value.
- `InvalidOperationException`: `mergeOptions` is used multiple times in the query.

To be added.

## ParallelEnumerable.Zip<TFirst,TSecond,TResult>(ParallelQuery<TFirst>, IEnumerable<TSecond>, Func<TFirst,TSecond,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Zip<TFirst,TSecond,TResult> (this System.Linq.ParallelQuery<TFirst> first, System.Collections.Generic.IEnumerable<TSecond> second, Func<TFirst,TSecond,TResult> resultSelector);
```

This Zip overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when invoked.

Parameters:

- `TFirst`: This type parameter is not used.
- `TSecond`: This type parameter is not used.
- `TResult`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.
- `resultSelector`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.
