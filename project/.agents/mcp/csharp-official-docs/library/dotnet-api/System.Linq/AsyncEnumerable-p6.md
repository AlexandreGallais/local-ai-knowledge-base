---
title: "AsyncEnumerable class (part 6 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 6 of 16)

## AsyncEnumerable.GroupBy<TSource,TKey,TResult>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEnumerable<TSource>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> GroupBy<TSource,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a specified key <example-value> function
and creates a result value from each group and its key.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TResult`: The type of the result value returned by resultSelector.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A collection of elements of type `TResult` where each element represents
a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey,TElement,TResult>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, ValueTask<TElement>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TElement>> elementSelector, Func<TKey,System.Collections.Generic.IEnumerable<TElement>,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a specified key <example-value> function
and creates a result value from each group and its key. Key <example-value> are compared
by using a specified comparer, and the elements of each group are projected by
using a specified function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A collection of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey,TElement,TResult>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEnumerable<TElement>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a specified key <example-value> function
and creates a result value from each group and its key. Key <example-value> are compared
by using a specified comparer, and the elements of each group are projected by
using a specified function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A collection of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.GroupJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Linq.IGrouping<TOuter,TInner>> GroupJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on key <example-value> and groups the results. If `comparer` is `null` or omitted, the default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys, or `null` to use `EqualityComparer<T>.Default`.

Returns: An `IAsyncEnumerable<T>` that contains elements of type `IGrouping<T1,T2>`
where each grouping contains the outer element as the key and the matching inner elements.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.GroupJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Linq.IGrouping<TOuter,TInner>> GroupJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on key <example-value> and groups the results. If `comparer` is `null` or omitted, the default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys, or `null` to use `EqualityComparer<T>.Default`.

Returns: An `IAsyncEnumerable<T>` that contains elements of type `IGrouping<T1,T2>`
where each grouping contains the outer element as the key and the matching inner elements.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.GroupJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on key <example-value> and groups the results.

Parameters:

- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from an element from the first sequence
and a collection of matching elements from the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that contains elements of type `TResult`
that are obtained by performing a grouped join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.GroupJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on key <example-value> and groups the results.

Parameters:

- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from an element from the first sequence
and a collection of matching elements from the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that contains elements of type `TResult`
that are obtained by performing a grouped join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.Index<TSource>(IAsyncEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(int Index, TSource Item)> Index<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source);
```

Returns an enumerable that incorporates the element's index into a tuple.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The source enumerable providing the elements.

Returns: An enumerable that incorporates each element index into a tuple.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.InfiniteSequence<T>(T, T) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<T> InfiniteSequence<T> (T start, T step) where T : System.Numerics.IAdditionOperators<T,T,T>;
```

Generates an infinite sequence that begins with `start` and yields additional values each incremented by `step`.

Parameters:

- `T`: The type of the value to be yielded in the result sequence.
- `start`: The starting value.
- `step`: The amount by which the next yielded value should be incremented from the previous yielded value.

Returns: An `IAsyncEnumerable<T>` that contains the sequence.

To be added.

## AsyncEnumerable.Intersect<TSource>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Intersect<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default);
```

Produces the set intersection of two sequences.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IAsyncEnumerable<T>` whose distinct elements that also appear in second will be returned.
- `second`: An `IAsyncEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.
