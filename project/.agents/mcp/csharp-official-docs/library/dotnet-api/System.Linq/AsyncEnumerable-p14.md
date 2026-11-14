---
title: "AsyncEnumerable class (part 14 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 14 of 16)

## AsyncEnumerable.TakeWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> TakeWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate);
```

Returns elements from a sequence as long as a specified condition is true.
The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IAsyncEnumerable<T>` that contains the elements from the
input sequence that occur before the element at which the test no longer passes.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.TakeWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> TakeWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate);
```

Returns elements from a sequence as long as a specified condition is true.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IAsyncEnumerable<T>` that contains the elements from the
input sequence that occur before the element at which the test no longer passes.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.ThenBy<TSource,TKey>(IOrderedAsyncEnumerable<TSource>, ValueTask<TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> ThenBy<TSource,TKey> (this System.Linq.IOrderedAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Performs a subsequent ordering of the elements in a sequence in ascending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ThenBy<TSource,TKey>(IOrderedAsyncEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> ThenBy<TSource,TKey> (this System.Linq.IOrderedAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Performs a subsequent ordering of the elements in a sequence in ascending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ThenByDescending<TSource,TKey>(IOrderedAsyncEnumerable<TSource>, ValueTask<TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> ThenByDescending<TSource,TKey> (this System.Linq.IOrderedAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Performs a subsequent ordering of the elements in a sequence in descending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ThenByDescending<TSource,TKey>(IOrderedAsyncEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> ThenByDescending<TSource,TKey> (this System.Linq.IOrderedAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Performs a subsequent ordering of the elements in a sequence in descending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ToArrayAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource[]> ToArrayAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Creates an array from an `IAsyncEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IEnumerable<T>` to create an array from.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: An array that contains the elements from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.ToAsyncEnumerable<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> ToAsyncEnumerable<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Converts an `IEnumerable<T>` to an `IAsyncEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IEnumerable<T>` of the elements to enumerate.

Returns: An `IAsyncEnumerable<T>` containing the sequence of elements from `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

If `source` already implements `IAsyncEnumerable<T>`, it is returned directly.
Otherwise, each iteration through the resulting `IAsyncEnumerable<T>` will iterate through the `source`.

## AsyncEnumerable.ToDictionaryAsync<TKey,TValue>(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.Dictionary<TKey,TValue>> ToDictionaryAsync<TKey,TValue> (this System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `Dictionary<T1,T2>` from an `IAsyncEnumerable<T>` according to specified key comparer.

Parameters:

- `TKey`: The type of the keys from elements of `source`
- `TValue`: The type of the values from elements of `source`
- `source`: The `IAsyncEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `Dictionary<T1,T2>` that contains keys and values from `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` contains one or more duplicate keys (via the returned task).

To be added.

## AsyncEnumerable.ToDictionaryAsync<TKey,TValue>(ValueTuple<TKey,TValue>>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.Dictionary<TKey,TValue>> ToDictionaryAsync<TKey,TValue> (this System.Collections.Generic.IAsyncEnumerable<(TKey Key, TValue Value)> source, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `Dictionary<T1,T2>` from an `IAsyncEnumerable<T>` according to specified key comparer.

Parameters:

- `TKey`: The type of the keys from elements of `source`
- `TValue`: The type of the values from elements of `source`
- `source`: The `IAsyncEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `Dictionary<T1,T2>` that contains keys and values from `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: `source` contains one or more duplicate keys (via the returned task).

To be added.

## AsyncEnumerable.ToDictionaryAsync<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.Dictionary<TKey,TSource>> ToDictionaryAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `Dictionary<T1,T2>` from an `IAsyncEnumerable<T>`
according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the keys returned by `keySelector`.
- `source`: An `IAsyncEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `Dictionary<T1,T2>` that contains keys and values.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.
- `ArgumentException`: `source` contains one or more duplicate keys (via the returned task).

To be added.

## AsyncEnumerable.ToDictionaryAsync<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.Dictionary<TKey,TSource>> ToDictionaryAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `Dictionary<T1,T2>` from an `IAsyncEnumerable<T>`
according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the keys returned by `keySelector`.
- `source`: An `IAsyncEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `Dictionary<T1,T2>` that contains keys and values.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.
- `ArgumentException`: `source` contains one or more duplicate keys (via the returned task).

To be added.

## AsyncEnumerable.ToDictionaryAsync<TSource,TKey,TElement>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, ValueTask<TElement>>, IEqualityComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<System.Collections.Generic.Dictionary<TKey,TElement>> ToDictionaryAsync<TSource,TKey,TElement> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TElement>> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Creates a `Dictionary<T1,T2>` from an `IAsyncEnumerable<T>`"/>
according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of the elements of source.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: An `IAsyncEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: A `Dictionary<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `elementSelector` is `null`.
- `ArgumentException`: `source` contains one or more duplicate keys (via the returned task).

To be added.
