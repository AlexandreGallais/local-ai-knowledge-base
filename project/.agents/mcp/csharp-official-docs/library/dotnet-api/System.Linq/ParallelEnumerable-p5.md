---
title: "ParallelEnumerable class (part 5 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 5 of 16)

## ParallelEnumerable.FirstOrDefault<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource? FirstOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the first element of a parallel sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the first element of.

Returns: default(TSource) if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
If the query is not ordered, then the first element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.FirstOrDefault<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static TSource? FirstOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns the first element of the parallel sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: default(TSource) if `source` is empty or if no element passes the test specified by predicate; otherwise, the first element in `source` that passes the test specified by predicate.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
If the query is not ordered, then the first element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.ForAll<TSource>(ParallelQuery<TSource>, Action<TSource>) method

```csharp
public static void ForAll<TSource> (this System.Linq.ParallelQuery<TSource> source, Action<TSource> action);
```

Invokes in parallel the specified action for each element in the `source`.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The `ParallelQuery<T>` whose elements will be processed by `action`.
- `action`: An Action to invoke on each element.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `action` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
This is an efficient way to process the output from a parallelized query because it does not require a merge step at the end. For more information, see Merge Options in PLINQ or Order Preservation in PLINQ. Because this method produces a side-effect, it can be used to observe the actual order of execution in a parallel query.

## ParallelEnumerable.GroupBy<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.ParallelQuery<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Groups in parallel the elements of a sequence according to a specified key-selector function.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An OrderedParallelQuery<TSource> that contains elements to sort.
- `keySelector`: A function to extract a key from an element.

Returns: A sequence of groups that are sorted in descending order according to `TKey`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupBy<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups in parallel the elements of a sequence according to a specified key <example-value> function and compares the keys by using a specified `IComparer<T>`.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `OrderedParallelQuery<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: A sequence of groups that are sorted descending according to `TKey`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupBy<TSource,TKey,TElement>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>) method

```csharp
public static System.Linq.ParallelQuery<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector);
```

Groups in parallel the elements of a sequence according to a specified key <example-value> function and projects the elements for each group by using a specified function.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in the `IGrouping<T1,T2>`.
- `source`: An `OrderedParallelQuery<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from an element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.

Returns: A sequence of groups that are sorted descending according to `TKey`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `elementSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupBy<TSource,TKey,TElement>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups in parallel the elements of a sequence according to a key <example-value> function. The keys are compared by using a comparer and each group's elements are projected by using a specified function.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in the IGrouping.
- `source`: An OrderedParallelQuery{TSource}that contains elements to sort.
- `keySelector`: A function to extract a key from an element.
- `elementSelector`: A function to map each source element to an element in an IGrouping.
- `comparer`: An IComparer{TSource} to compare keys.

Returns: A sequence of groups that are sorted descending according to `TKey`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `elementSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupBy<TSource,TKey,TResult>(ParallelQuery<TSource>, Func<TSource,TKey>, IEnumerable<TSource>,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupBy<TSource,TKey,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult> resultSelector);
```

Groups in parallel the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: A sequence whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.

Returns: A sequence of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `resultSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupBy<TSource,TKey,TResult>(ParallelQuery<TSource>, Func<TSource,TKey>, IEnumerable<TSource>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupBy<TSource,TKey,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups in parallel the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. The keys are compared by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: A sequence whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A sequence of groups.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `resultSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupBy<TSource,TKey,TElement,TResult>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEnumerable<TElement>,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult> resultSelector);
```

Groups in parallel the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. The elements of each group are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in each IGrouping{TKey, TElement}.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: A sequence whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an IGrouping<TKey, TElement>.
- `resultSelector`: A function to create a result value from each group.

Returns: A sequence of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `resultSelector` is `null` (`Nothing` in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.
