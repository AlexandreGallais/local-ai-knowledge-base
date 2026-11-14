---
title: "AsyncEnumerable class (part 4 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 4 of 16)

## AsyncEnumerable.ElementAtOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Index, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> ElementAtOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Index index, System.Threading.CancellationToken <example-value> = default);
```

Returns the element at a specified index in a sequence or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the start or the end.
- `cancellationToken`: The token to monitor for cancellation requests. The default value is `CancellationToken.None`.

Returns: `default` if `index` is outside the bounds of the `source` sequence; otherwise, the element at the specified position in the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

If the type of `source` implements `IList<T>`, that implementation is used to obtain the element at the specified index. Otherwise, this method obtains the specified element.

The default value for reference and nullable types is `null`.

## AsyncEnumerable.ElementAtOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Int32, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> ElementAtOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int index, System.Threading.CancellationToken <example-value> = default);
```

Returns the element at a specified index in a sequence, or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the beginning or the end of the sequence.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if `index` is outside the bounds of the source sequence; otherwise, the
element at the specified position in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.Empty<TResult>() method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Empty<TResult> ();
```

Returns an empty `IAsyncEnumerable<T>` that has the specified type argument.

Parameters:

- `TResult`: The type of the elements of the sequence.

Returns: An empty `IAsyncEnumerable<T>` whose type argument is `TResult`.

To be added.

## AsyncEnumerable.Except<TSource>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Except<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default);
```

Produces the set difference of two sequences.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IAsyncEnumerable<T>` whose elements that are not also in second will be returned.
- `second`: An `IAsyncEnumerable<T>` whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.

## AsyncEnumerable.ExceptBy<TSource,TKey>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TKey>, ValueTask<TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> ExceptBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TKey> second, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Produces the set difference of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequence.
- `TKey`: The type of key to identify elements by.
- `first`: An `IAsyncEnumerable<T>` whose keys that are not also in `second` will be returned.
- `second`: An `IAsyncEnumerable<T>` whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.ExceptBy<TSource,TKey>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TKey>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> ExceptBy<TSource,TKey> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TKey> second, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Produces the set difference of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequence.
- `TKey`: The type of key to identify elements by.
- `first`: An `IAsyncEnumerable<T>` whose keys that are not also in `second` will be returned.
- `second`: An `IAsyncEnumerable<T>` whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `keySelector` is `null`.

To be added.

## AsyncEnumerable.FirstAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> FirstAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element of a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: The `IAsyncEnumerable<T>` to return the first element of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The first element in the specified sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The source sequence is empty (via the returned task).

To be added.

## AsyncEnumerable.FirstAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> FirstAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element in a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The first element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: The source sequence is empty, or no element in the sequence satisfies
the condition in predicate (via the returned task).

To be added.

## AsyncEnumerable.FirstAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> FirstAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element in a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The first element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: The source sequence is empty, or no element in the sequence satisfies
the condition in predicate (via the returned task).

To be added.

## AsyncEnumerable.FirstOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> FirstOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element of a sequence, or the default value of `TSource` if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IAsyncEnumerable<T>` to return the first element of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.FirstOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> FirstOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if source is empty or if no element passes the test specified
by predicate; otherwise, the first element in source that passes the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.FirstOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> FirstOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `source`: An `IAsyncEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The default value of `TSource` if source is empty or if no element passes the test specified
by predicate; otherwise, the first element in source that passes the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.FirstOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> FirstOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the first element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IAsyncEnumerable<T>` to return the first element of.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `defaultValue` if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.FirstOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> FirstOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
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
