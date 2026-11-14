---
title: "AsyncEnumerable class (part 12 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 12 of 16)

## AsyncEnumerable.Sequence<T>(T, T, T) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<T> Sequence<T> (T start, T endInclusive, T step) where T : System.Numerics.INumber<T>;
```

Generates a sequence that begins with `start` and yields additional values each incremented by `step` until `endInclusive` is reached.

Parameters:

- `T`: The type of the value to be yielded in the result sequence.
- `start`: The starting value. This value will always be included in the resulting sequence.
- `endInclusive`: The ending bound beyond which values will not be included in the sequence.
- `step`: The amount by which the next value in the sequence should be incremented from the previous value.

Returns: An `IAsyncEnumerable<T>` that contains the sequence.

Exceptions:

- `ArgumentNullException`: `step` is `null`.
- `ArgumentOutOfRangeException`: `step` is zero and `endInclusive` does not equal `start`.

To be added.

## AsyncEnumerable.SequenceEqualAsync<TSource>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>, IEqualityComparer<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> SequenceEqualAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer = default, System.Threading.CancellationToken <example-value> = default);
```

Determines whether two sequences are equal by comparing their elements.

Parameters:

- `first`: An `IAsyncEnumerable<T>` to compare to `second`.
- `second`: An `IAsyncEnumerable<T>` to compare to the first sequence.
- `comparer`: An `IEqualityComparer<T>` to use to compare elements.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `true` if the two source sequences are of equal length and their corresponding
elements compare equal according to comparer; otherwise, `false`.

To be added.

## AsyncEnumerable.Shuffle<TSource>(IAsyncEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Shuffle<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source);
```

Shuffles the order of the elements of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to shuffle.

Returns: A sequence whose elements correspond to those of the input sequence in randomized order.

Randomization is performed using a non-cryptographically secure random number generator.

## AsyncEnumerable.SingleAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> SingleAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence, and throws an exception if there is not
exactly one element in the sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The `source` sequence contains more than one element. (via the returned task).

To be added.

## AsyncEnumerable.SingleAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> SingleAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence that satisfies a specified condition,
and throws an exception if more than one such element exists.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `predicate`: A function to test an element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence that satisfies a condition.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate` (via the returned task).

To be added.

## AsyncEnumerable.SingleAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> SingleAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence that satisfies a specified condition,
and throws an exception if more than one such element exists.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `predicate`: A function to test an element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence that satisfies a condition.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate` (via the returned task).

To be added.

## AsyncEnumerable.SingleOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> SingleOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence, or a default value if the sequence is
empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence, or the default value of `TSource`
if the sequence contains no elements.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The `source` sequence contains more than one element. (via the returned task).

To be added.

## AsyncEnumerable.SingleOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> SingleOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence that satisfies a specified condition or
a default value if no such element exists; this method throws an exception if
more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `predicate`: A function to test an element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence that satisfies the condition, or the default value of
`TSource` if no such element is found.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

To be added.

## AsyncEnumerable.SingleOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource?> SingleOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence that satisfies a specified condition or
a default value if no such element exists; this method throws an exception if
more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `predicate`: A function to test an element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence that satisfies the condition, or the default value of
`TSource` if no such element is found.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

To be added.

## AsyncEnumerable.SingleOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> SingleOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return the single element of.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence, or `defaultValue` if the sequence contains no elements.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

To be added.

## AsyncEnumerable.SingleOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> SingleOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence that satisfies the condition, or `defaultValue` if no such element is found.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

To be added.

## AsyncEnumerable.SingleOrDefaultAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, TSource, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<TSource> SingleOrDefaultAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, TSource defaultValue, System.Threading.CancellationToken <example-value> = default);
```

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The single element of the input sequence that satisfies the condition, or `defaultValue` if no such element is found.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

To be added.

## AsyncEnumerable.Skip<TSource>(IAsyncEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Skip<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int count);
```

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return elements from.
- `count`: The number of elements to skip before returning the remaining elements.

Returns: An `IAsyncEnumerable<T>` that contains the elements that occur after the specified index in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.SkipLast<TSource>(IAsyncEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> SkipLast<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int count);
```

Returns a new sequence that contains the elements from `source`
with the last `count` elements of the source collection omitted.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IAsyncEnumerable<T>` to return elements from.
- `count`: The number of elements to omit from the end of the sequence.

Returns: A new sequence that contains the elements from `source` minus
`count` elements from the end of the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.
