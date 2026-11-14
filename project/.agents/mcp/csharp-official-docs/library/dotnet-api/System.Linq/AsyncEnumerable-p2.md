---
title: "AsyncEnumerable class (part 2 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 2 of 16)

## AsyncEnumerable.AllAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> AllAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
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

## AsyncEnumerable.AnyAsync<TSource>(IAsyncEnumerable<TSource>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> AnyAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, System.Threading.CancellationToken <example-value> = default);
```

Determines whether a sequence contains any elements.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: The `IAsyncEnumerable<T>` to check for emptiness.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `true` if the source sequence contains any elements; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.AnyAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> AnyAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate, System.Threading.CancellationToken <example-value> = default);
```

Determines whether any element of a sequence satisfies a condition.

Parameters:

- `source`: An `IAsyncEnumerable<T>` whose elements to apply the predicate to.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `true` if the source sequence is not empty and at least one of its elements passes
the test in the specified predicate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.AnyAsync<TSource>(IAsyncEnumerable<TSource>, Boolean>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<bool> AnyAsync<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate, System.Threading.CancellationToken <example-value> = default);
```

Determines whether any element of a sequence satisfies a condition.

Parameters:

- `source`: An `IAsyncEnumerable<T>` whose elements to apply the predicate to.
- `predicate`: A function to test each element for a condition.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: `true` if the source sequence is not empty and at least one of its elements passes
the test in the specified predicate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.Append<TSource>(IAsyncEnumerable<TSource>, TSource) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Append<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, TSource element);
```

Appends a value to the end of the sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: A sequence of values.
- `element`: The value to append to source.

Returns: A new sequence that ends with element.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.AverageAsync(Decimal>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<decimal> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<decimal> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Double>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<double> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Int32>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<int> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than `Int64.MaxValue` (via the returned task).
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Int64>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<long> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than `Int64.MaxValue` (via the returned task).
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Decimal>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<decimal?> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<decimal?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values, or null if the source sequence is empty or contains only values that are null.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Double>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double?> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<double?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values, or null if the source sequence is empty or contains only values that are null.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Int32>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double?> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<int?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values, or null if the source sequence is empty or contains only values that are null.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than `Int64.MaxValue` (via the returned task).
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Int64>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double?> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<long?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values, or null if the source sequence is empty or contains only values that are null.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than `Int64.MaxValue` (via the returned task).
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Single>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<float?> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<float?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values, or null if the source sequence is empty or contains only values that are null.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.AverageAsync(Single>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<float> AverageAsync (this System.Collections.Generic.IAsyncEnumerable<float> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the average of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the average of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements (via the returned task).

To be added.

## AsyncEnumerable.Cast<TResult>(Object>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TResult> Cast<TResult> (this System.Collections.Generic.IAsyncEnumerable<object?> source);
```

Casts the elements of an `IAsyncEnumerable<T>` to the specified type.

Parameters:

- `TResult`: The type to cast the elements of source to.
- `source`: The `IAsyncEnumerable<T>` that contains the elements to be cast to type `TResult`.

Returns: An `IAsyncEnumerable<T>` that contains each element of the source sequence cast to the `TResult` type.

To be added.

## AsyncEnumerable.Chunk<TSource>(IAsyncEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource[]> Chunk<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int size);
```

Split the elements of a sequence into chunks of size at most `size`.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` whose elements to chunk.
- `size`: Maximum size of each chunk.

Returns: An `IAsyncEnumerable<T>` that contains the elements of the input sequence split into chunks of size `size`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `size` is less than 1.

Every chunk except the last will be of size `size`.
The last chunk will contain the remaining elements and may be of a smaller size.

## AsyncEnumerable.Concat<TSource>(IAsyncEnumerable<TSource>, IAsyncEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Concat<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> first, System.Collections.Generic.IAsyncEnumerable<TSource> second);
```

Concatenates two sequences.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: The first sequence to concatenate.
- `second`: The sequence to concatenate to the first sequence.

Returns: An `IAsyncEnumerable<T>` that contains the concatenated elements of the two input sequences.

Exceptions:

- `ArgumentNullException`: `second` is `null`.

To be added.
