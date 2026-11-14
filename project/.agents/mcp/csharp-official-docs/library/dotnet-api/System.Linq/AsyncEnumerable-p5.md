---
title: "AsyncEnumerable class (part 5 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 5 of 16)

## AsyncEnumerable.FirstOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> FirstOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `defaultValue` if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.FullJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter? Outer, TInner? Inner)> FullJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two async sequences based on matching keys, producing a tuple for matched and unmatched elements.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter?, TInner?)` that are obtained by performing a full outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.FullJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter? Outer, TInner? Inner)> FullJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two async sequences based on matching keys, producing a tuple for matched and unmatched elements.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter?, TInner?)` that are obtained by performing a full outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.FullJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> FullJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, Func<TOuter?,TInner?,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two async sequences based on matching keys, producing a result for matched and unmatched elements.

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
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult` that are obtained by performing a full outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.FullJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> FullJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter?,TInner?,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two async sequences based on matching keys, producing a result for matched and unmatched elements.

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
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult` that are obtained by performing a full outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` where each `IGrouping<T1,T2>`
contains a sequence of objects and a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` where each `IGrouping<T1,T2>`
contains a sequence of objects and a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey,TElement>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, ValueTask<TElement>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TElement>> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a key <example-value> function. The keys
are compared by using a comparer and each group's elements are projected by using
a specified function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in the `IGrouping<T1,T2>`.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` where each `IGrouping<T1,T2>`
contains a sequence of objects of type `TElement` and a key.

Exceptions:

- `ArgumentNullException`: `elementSelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey,TElement>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Groups the elements of a sequence according to a key <example-value> function. The keys
are compared by using a comparer and each group's elements are projected by using
a specified function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in the `IGrouping<T1,T2>`.
- `source`: An `IAsyncEnumerable<T>` of elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` where each `IGrouping<T1,T2>`
contains a sequence of objects of type `TElement` and a key.

Exceptions:

- `ArgumentNullException`: `elementSelector` is `null`.

To be added.

## AsyncEnumerable.GroupBy<TSource,TKey,TResult>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> GroupBy<TSource,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, Func<TKey,System.Collections.Generic.IEnumerable<TSource>,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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
