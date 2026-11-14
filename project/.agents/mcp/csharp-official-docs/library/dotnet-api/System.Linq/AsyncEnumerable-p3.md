---
title: "AsyncEnumerable class (part 3 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 3 of 16)

## AsyncEnumerable.ContainsAsync<TSource>(IAsyncEnumerable<TSource>, TSource, IEqualityComparer<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> ContainsAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource value, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Determines whether a sequence contains a specified element.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence in which to locate a value.
- `value`: The value to locate in the sequence.
- `comparer`: An equality comparer to compare values.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.CountAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> CountAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the number of elements in a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence that contains elements to be counted.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The number of elements in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The number of elements in source is larger than `Int32.MaxValue` (via the returned task).

To be added.

## AsyncEnumerable.CountAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> CountAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
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
- `OverflowException`: The number of elements that satisfy the condition is larger than `Int32.MaxValue` (via the returned task).

To be added.

## AsyncEnumerable.CountAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> CountAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
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
- `OverflowException`: The number of elements that satisfy the condition is larger than `Int32.MaxValue` (via the returned task).

To be added.

## AsyncEnumerable.CountBy<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,int>> CountBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Returns the count of elements in the source sequence grouped by key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence that contains elements to be counted.
- `keySelector`: A function to extract the key for each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the frequencies of each key <example-value> in `source`.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.CountBy<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<System.Collections.Generic.KeyValuePair<TKey,int>> CountBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Returns the count of elements in the source sequence grouped by key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence that contains elements to be counted.
- `keySelector`: A function to extract the key for each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the frequencies of each key <example-value> in `source`.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.DefaultIfEmpty<TSource>(IAsyncEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource?> DefaultIfEmpty<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source);
```

Returns the elements of the specified sequence or the type parameter's default if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: The sequence to return a default value for if it is empty.

Returns: An `IAsyncEnumerable<T>` object that contains the default value for
the TSource type if source is empty; otherwise, source.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.DefaultIfEmpty<TSource>(IAsyncEnumerable<TSource>, TSource) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> DefaultIfEmpty<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource defaultValue);
```

Returns the elements of the specified sequence or the specified value if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: The sequence to return a default value for if it is empty.
- `defaultValue`: The value to return if the sequence is empty.

Returns: An `IAsyncEnumerable<T>` object that contains the default value for
the TSource type if source is empty; otherwise, source.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.Distinct<TSource>(IAsyncEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Distinct<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default);
```

Returns distinct elements from a sequence.

Parameters:

- `source`: The sequence to remove duplicate elements from.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: An `IAsyncEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.DistinctBy<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> DistinctBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Returns distinct elements from a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to remove duplicate elements from.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in Visual C# or `For Each` in Visual Basic.

The `AsyncEnumerable.DistinctBy<T1,T2>` method returns an unordered sequence that contains no duplicate values. If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

## AsyncEnumerable.DistinctBy<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> DistinctBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Returns distinct elements from a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to remove duplicate elements from.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in Visual C# or `For Each` in Visual Basic.

The `AsyncEnumerable.DistinctBy<T1,T2>` method returns an unordered sequence that contains no duplicate values. If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

## AsyncEnumerable.ElementAtAsync<TSource>(IAsyncEnumerable<TSource>, Index, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> ElementAtAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Index index, System.Threading.CancellationToken <example-value> = default);
```

Returns the element at a specified index in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the start or the end.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: The element at the specified position in the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the bounds of the source sequence (via the returned task).

If the type of `source` implements `IList<T>`, that implementation is used to obtain the element at the specified index. Otherwise, this method obtains the specified element.

This method throws an exception if `index` is out of range. To instead return a default value when the specified index is out of range, use the ElementAtOrDefaultAsync method.

## AsyncEnumerable.ElementAtAsync<TSource>(IAsyncEnumerable<TSource>, Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> ElementAtAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int index, System.Threading.CancellationToken <example-value> = default);
```

Returns the element at a specified index in a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the beginning or the end of the sequence.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The element at the specified position in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the bounds of the source sequence (via the returned task).

To be added.
