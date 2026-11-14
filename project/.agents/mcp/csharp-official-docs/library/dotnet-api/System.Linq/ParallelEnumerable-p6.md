---
title: "ParallelEnumerable class (part 6 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 6 of 16)

## ParallelEnumerable.GroupBy<TSource,TKey,TElement,TResult>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEnumerable<TElement>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. Key <example-value> are compared by using a specified comparer, and the elements of each group are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in each IGrouping{TKey, TElement}.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: A sequence whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an IGrouping{Key, TElement}.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A sequence of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `resultSelector` is `null` (`Nothing` in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupJoin<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector);
```

This GroupJoin overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

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

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.GroupJoin<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, ParallelQuery<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Linq.ParallelQuery<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector);
```

Correlates in parallel the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.

Returns: A sequence that has elements of type `TResult` that are obtained by performing a grouped join on two sequences.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null` (`Nothing` in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.GroupJoin<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

This GroupJoin overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

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

## ParallelEnumerable.GroupJoin<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, ParallelQuery<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ParallelQuery<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Linq.ParallelQuery<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Correlates in parallel the elements of two sequences based on key <example-value> and groups the results. A specified `IEqualityComparer<T>` is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys.

Returns: A sequence that has elements of type `TResult` that are obtained by performing a grouped join on two sequences.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null` (`Nothing` in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Intersect<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Intersect<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

This Intersect overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.Intersect<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Intersect<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second);
```

Produces the set intersection of two parallel sequences by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence whose distinct elements that also appear in `second` will be returned.
- `second`: A sequence whose distinct elements that also appear in the first sequence will be returned.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Intersect<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Intersect<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

This Intersect overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.
- `comparer`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.Intersect<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Intersect<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set intersection of two parallel sequences by using the specified IEqualityComparer{T} to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence whose distinct elements that also appear in `second` will be returned.
- `second`: A sequence whose distinct elements that also appear in the first sequence will be returned.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Join<TOuter,TInner,TKey,TResult>(ParallelQuery<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Linq.ParallelQuery<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector);
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

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.
