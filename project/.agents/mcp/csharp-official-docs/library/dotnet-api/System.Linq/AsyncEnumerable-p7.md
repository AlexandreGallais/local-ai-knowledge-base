---
title: "AsyncEnumerable class (part 7 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 7 of 16)

## AsyncEnumerable.IntersectBy<TSource,TKey>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TKey>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> IntersectBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TKey> second, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Produces the set intersection of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IAsyncEnumerable<T>` whose distinct elements that also appear in `second` will be returned.
- `second`: An `IAsyncEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in Visual C# or `For Each` in Visual Basic.

The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, `Intersect` yields distinct elements occurring in both sequences in the order in which they appear in `first`.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

## AsyncEnumerable.IntersectBy<TSource,TKey>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TKey>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> IntersectBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TKey> second, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Produces the set intersection of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IAsyncEnumerable<T>` whose distinct elements that also appear in `second` will be returned.
- `second`: An `IAsyncEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in Visual C# or `For Each` in Visual Basic.

The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, `Intersect` yields distinct elements occurring in both sequences in the order in which they appear in `first`.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

## AsyncEnumerable.Join<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter Outer, TInner Inner)> Join<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter Outer, TInner Inner)`
that are obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.Join<TOuter,TInner,TKey>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<(TOuter Outer, TInner Inner)> Join<TOuter,TInner,TKey> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

Returns: An `IAsyncEnumerable<T>` that has elements of type `(TOuter Outer, TInner Inner)`
that are obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `innerKeySelector` is `null`.

To be added.

## AsyncEnumerable.Join<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, ValueTask<TKey>>, ValueTask<TKey>>, ValueTask<TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> outerKeySelector, Func<TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> innerKeySelector, Func<TOuter,TInner,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult`
that are obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.Join<TOuter,TInner,TKey,TResult>(IAsyncEnumerable<TOuter>, IAsyncEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IAsyncEnumerable<TOuter> outer, System.Collections.Generic.IAsyncEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

Returns: An `IAsyncEnumerable<T>` that has elements of type `TResult`
that are obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.LastAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> LastAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return the last element of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The value at the last position in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The source sequence is empty (via the returned task).

To be added.

## AsyncEnumerable.LastAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> LastAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The last element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: The source sequence is empty, or no element in the sequence satisfies
the condition in predicate (via the returned task).

To be added.

## AsyncEnumerable.LastAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> LastAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The last element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: The source sequence is empty, or no element in the sequence satisfies
the condition in predicate (via the returned task).

To be added.

## AsyncEnumerable.LastOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> LastOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the last element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if the source sequence is empty;
otherwise, the last element in the `IAsyncEnumerable<T>`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.
