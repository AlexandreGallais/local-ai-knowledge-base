---
title: "AsyncEnumerable class (part 8 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 8 of 16)

## AsyncEnumerable.LastOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> LastOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.LastOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> LastOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.LastOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> LastOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return the last element of.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `defaultValue` if the source sequence is empty; otherwise, the last element in the `IAsyncEnumerable<T>`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.LastOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> LastOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `defaultValue` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.LastOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> LastOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `defaultValue` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.LeftJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter Outer, TInner? Inner)> LeftJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter Outer, TInner? Inner)` that are obtained by performing a left outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.LeftJoin<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter Outer, TInner? Inner)> LeftJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `comparer`: An `IEqualityComparer<T>` to use to hash and compare keys.

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter Outer, TInner? Inner)` that are obtained by performing a left outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.LeftJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> LeftJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, Func<TOuter,TInner?,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

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

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing a left outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.LeftJoin<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> LeftJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner?,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Correlates the elements of two sequences based on matching keys.

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

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult` that are obtained by performing a left outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.LongCountAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<long> LongCountAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the number of elements in a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence that contains elements to be tested and counted.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The number of elements in the input sequence that satisfy the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.LongCountAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<long> LongCountAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the number of elements in a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence that contains elements to be tested and counted.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The number of elements in the input sequence that satisfy the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.LongCountAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<long> LongCountAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the number of elements in a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence that contains elements to be tested and counted.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The number of elements in the input sequence that satisfy the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.
