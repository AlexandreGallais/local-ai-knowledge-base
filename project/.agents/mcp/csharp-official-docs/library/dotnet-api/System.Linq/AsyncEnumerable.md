---
title: "AsyncEnumerable class (part 1 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class

Namespace: `System.Linq`

```csharp
public static class AsyncEnumerable
```

Provides a set of static methods for querying objects that implement `IAsyncEnumerable<T>`.

To be added.

## AsyncEnumerable.AggregateAsync<TSource>(IAsyncEnumerable<TSource>, ValueTask<TSource>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> AggregateAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TSource>> func, System.Threading.CancellationToken <example-value> = default);
```

Applies an accumulator function over a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `func`: An accumulator function to be invoked on each element.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `func` is `null`.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## AsyncEnumerable.AggregateAsync<TSource>(IAsyncEnumerable<TSource>, Func<TSource,TSource,TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> AggregateAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TSource,TSource> func, System.Threading.CancellationToken <example-value> = default);
```

Applies an accumulator function over a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `func`: An accumulator function to be invoked on each element.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `func` is `null`.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## AsyncEnumerable.AggregateAsync<TSource,TAccumulate>(IAsyncEnumerable<TSource>, TAccumulate, ValueTask<TAccumulate>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TAccumulate> AggregateAsync<TSource,TAccumulate> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TAccumulate>> func, System.Threading.CancellationToken <example-value> = default);
```

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.

Parameters:

- `TSource`: The type of the elements of source.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `func` is `null`.

To be added.

## AsyncEnumerable.AggregateAsync<TSource,TAccumulate>(IAsyncEnumerable<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TAccumulate> AggregateAsync<TSource,TAccumulate> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func, System.Threading.CancellationToken <example-value> = default);
```

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.

Parameters:

- `TSource`: The type of the elements of source.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `func` is `null`.

To be added.

## AsyncEnumerable.AggregateAsync<TSource,TAccumulate,TResult>(IAsyncEnumerable<TSource>, TAccumulate, ValueTask<TAccumulate>>, ValueTask<TResult>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TResult> AggregateAsync<TSource,TAccumulate,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TAccumulate>> func, Func<TAccumulate,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TResult>> resultSelector, System.Threading.CancellationToken <example-value> = default);
```

Applies an accumulator function over a sequence. The specified seed value is
used as the initial accumulator value, and the specified function is used to
select the result value.

Parameters:

- `TSource`: The type of the elements of source.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `resultSelector`: A function to transform the final accumulator value into the result value.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The transformed final accumulator value.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.AggregateAsync<TSource,TAccumulate,TResult>(IAsyncEnumerable<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, Func<TAccumulate,TResult>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TResult> AggregateAsync<TSource,TAccumulate,TResult> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func, Func<TAccumulate,TResult> resultSelector, System.Threading.CancellationToken <example-value> = default);
```

Applies an accumulator function over a sequence. The specified seed value is
used as the initial accumulator value, and the specified function is used to
select the result value.

Parameters:

- `TSource`: The type of the elements of source.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `resultSelector`: A function to transform the final accumulator value into the result value.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The transformed final accumulator value.

Exceptions:

- `ArgumentNullException`: `resultSelector` is `null`.

To be added.

## AsyncEnumerable.AggregateBy<TSource,TKey,TAccumulate>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, ValueTask<TAccumulate>>, ValueTask<TAccumulate>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, Func<TKey,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TAccumulate>> seedSelector, Func<TAccumulate,TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TAccumulate>> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seedSelector`: A factory for the initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

Exceptions:

- `ArgumentNullException`: `func` is `null`.

This method is comparable to the GroupBy methods where each grouping is being aggregated into a single value
as opposed to allocating a collection for each group.

## AsyncEnumerable.AggregateBy<TSource,TKey,TAccumulate>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, TAccumulate, ValueTask<TAccumulate>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, TAccumulate seed, Func<TAccumulate,TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TAccumulate>> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

Exceptions:

- `ArgumentNullException`: `func` is `null`.

This method is comparable to the GroupBy methods where each grouping is being aggregated into a single value
as opposed to allocating a collection for each group.

## AsyncEnumerable.AggregateBy<TSource,TKey,TAccumulate>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, Func<TKey,TAccumulate>, Func<TAccumulate,TSource,TAccumulate>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,TAccumulate> seedSelector, Func<TAccumulate,TSource,TAccumulate> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seedSelector`: A factory for the initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

Exceptions:

- `ArgumentNullException`: `func` is `null`.

This method is comparable to the GroupBy methods where each grouping is being aggregated into a single value
as opposed to allocating a collection for each group.

## AsyncEnumerable.AggregateBy<TSource,TKey,TAccumulate>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IAsyncEnumerable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

Exceptions:

- `ArgumentNullException`: `func` is `null`.

This method is comparable to the GroupBy methods where each grouping is being aggregated into a single value
as opposed to allocating a collection for each group.

## AsyncEnumerable.AllAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> AllAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Determines whether all elements of a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` that contains the elements to apply the predicate to.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `true` if every element of the source sequence passes the test in the specified predicate,
or if the sequence is empty; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.
