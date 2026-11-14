---
title: "AsyncEnumerable class (part 9 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 9 of 16)

## AsyncEnumerable.MaxAsync<TSource>(IAsyncEnumerable<TSource>, IComparer<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> MaxAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Collections.Generic.IComparer<TSource>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Returns the maximum value in a generic sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `comparer`: The `IComparer<T>` to compare values.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No object in `source` implements the `IComparable` or `IComparable<T>` interface (via the returned task).

If type `TSource` implements `IComparable<T>`, the `AsyncEnumerable.MaxAsync<T>` method uses that implementation to compare values. Otherwise, if type `TSource` implements `IComparable`, that implementation is used to compare values.

If `TSource` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

## AsyncEnumerable.MaxByAsync<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> MaxByAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Returns the maximum value in a generic sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

If `TKey` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

## AsyncEnumerable.MaxByAsync<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> MaxByAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Returns the maximum value in a generic sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

If `TKey` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

## AsyncEnumerable.MinAsync<TSource>(IAsyncEnumerable<TSource>, IComparer<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> MinAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Collections.Generic.IComparer<TSource>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Returns the minimum value in a generic sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `comparer`: The `IComparer<T>` to compare values.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No object in `source` implements the `IComparable` or `IComparable<T>` interface.

If type `TSource` implements `IComparable<T>`, the `AsyncEnumerable.MinAsync<T>` method uses that implementation to compare values. Otherwise, if type `TSource` implements `IComparable`, that implementation is used to compare values.

If `TSource` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

## AsyncEnumerable.MinByAsync<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> MinByAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Returns the minimum value in a generic sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

If `TKey` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

## AsyncEnumerable.MinByAsync<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> MinByAsync<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Returns the minimum value in a generic sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

If `TKey` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

## AsyncEnumerable.OfType<TResult>(Object>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> OfType<TResult> (this System.Collections.Generic.IAsyncEnumerable<object?> source);
```

Filters the elements of a `IAsyncEnumerable<T>` based on a specified type `TResult`.

Parameters:

- `TResult`: The type to filter the elements of the sequence on.
- `source`: The `IAsyncEnumerable<T>` whose elements to filter.

Returns: An `IAsyncEnumerable<T>` that contains elements from the input sequence of type `TResult`.

To be added.

## AsyncEnumerable.Order<T>(IAsyncEnumerable<T>, IComparer<T>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<T> Order<T> (this System.Collections.Generic.IAsyncEnumerable<T> source, System.Collections.Generic.IComparer<T>? comparer = default);
```

Sorts the elements of a sequence in ascending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.OrderBy<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> OrderBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Sorts the elements of a sequence in ascending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.OrderBy<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> OrderBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Sorts the elements of a sequence in ascending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.OrderByDescending<TSource,TKey>(IAsyncEnumerable<TSource>, ValueTask<TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> OrderByDescending<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.OrderByDescending<TSource,TKey>(IAsyncEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<TSource> OrderByDescending<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer = default);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.OrderDescending<T>(IAsyncEnumerable<T>, IComparer<T>) method

```csharp
public static System.Linq.IOrderedAsyncEnumerable<T> OrderDescending<T> (this System.Collections.Generic.IAsyncEnumerable<T> source, System.Collections.Generic.IComparer<T>? comparer = default);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IAsyncEnumerable<T>` whose elements are sorted in descending order.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.Prepend<TSource>(IAsyncEnumerable<TSource>, TSource) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Prepend<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource element);
```

Adds a value to the beginning of the sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence of values.
- `element`: The value to prepend to source.

Returns: A new sequence that begins with element.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.Range(Int32, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<int> Range (int start, int count);
```

Generates a sequence of integral numbers within a specified range.

Parameters:

- `start`: The value of the first integer in the sequence.
- `count`: The number of sequential integers to generate.

Returns: An `IAsyncEnumerable<T>` that contains a range of sequential integral numbers.

Exceptions:

- `ArgumentOutOfRangeException`: `start` + `count` -1 is larger than `Int32.MaxValue`.

To be added.
