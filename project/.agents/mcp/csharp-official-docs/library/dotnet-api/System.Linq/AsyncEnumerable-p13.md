---
title: "AsyncEnumerable class (part 13 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/AsyncEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AsyncEnumerable class (part 13 of 16)

## AsyncEnumerable.SkipWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> SkipWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and
then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IAsyncEnumerable<T>` that contains the elements from the
input sequence starting at the first element in the linear series that does not
pass the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.SkipWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> SkipWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,bool> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and
then returns the remaining elements. The element's index is used in the logic
of the predicate function.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return elements from.
- `predicate`: A function to test each element for a condition; the second parameter
of the function represents the index of the source element.

Returns: An `IAsyncEnumerable<T>` that contains the elements from the
input sequence starting at the first element in the linear series that does not
pass the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.SkipWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> SkipWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and
then returns the remaining elements. The element's index is used in the logic
of the predicate function.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return elements from.
- `predicate`: A function to test each element for a condition; the second parameter
of the function represents the index of the source element.

Returns: An `IAsyncEnumerable<T>` that contains the elements from the
input sequence starting at the first element in the linear series that does not
pass the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.SkipWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> SkipWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,System.Threading.CancellationToken,System.Threading.Tasks.ValueTask<bool>> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and
then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IAsyncEnumerable<T>` to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IAsyncEnumerable<T>` that contains the elements from the
input sequence starting at the first element in the linear series that does not
pass the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `predicate` is `null`.

To be added.

## AsyncEnumerable.SumAsync(Decimal>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<decimal> SumAsync (this System.Collections.Generic.IAsyncEnumerable<decimal> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.SumAsync(Double>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double> SumAsync (this System.Collections.Generic.IAsyncEnumerable<double> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.SumAsync(Int32>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int> SumAsync (this System.Collections.Generic.IAsyncEnumerable<int> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than `Int32.MaxValue`.

To be added.

## AsyncEnumerable.SumAsync(Int64>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<long> SumAsync (this System.Collections.Generic.IAsyncEnumerable<long> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than `Int64.MaxValue`.

To be added.

## AsyncEnumerable.SumAsync(Decimal>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<decimal?> SumAsync (this System.Collections.Generic.IAsyncEnumerable<decimal?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.SumAsync(Double>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<double?> SumAsync (this System.Collections.Generic.IAsyncEnumerable<double?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.SumAsync(Int32>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<int?> SumAsync (this System.Collections.Generic.IAsyncEnumerable<int?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than `Int32.MaxValue`.

To be added.

## AsyncEnumerable.SumAsync(Int64>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<long?> SumAsync (this System.Collections.Generic.IAsyncEnumerable<long?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than `Int64.MaxValue`.

To be added.

## AsyncEnumerable.SumAsync(Single>>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<float?> SumAsync (this System.Collections.Generic.IAsyncEnumerable<float?> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of nullable values.

Parameters:

- `source`: A sequence of nullable values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.SumAsync(Single>, CancellationToken) method

```csharp
public static System.Threading.Tasks.ValueTask<float> SumAsync (this System.Collections.Generic.IAsyncEnumerable<float> source, System.Threading.CancellationToken <example-value> = default);
```

Computes the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.
- `cancellationToken`: The `CancellationToken` to monitor for cancellation requests. The default is `CancellationToken.None`.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.Take<TSource>(IAsyncEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Take<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int count);
```

Returns a specified number of contiguous elements from the start of a sequence.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: The sequence to return elements from.
- `count`: The number of elements to return.

Returns: An `IAsyncEnumerable<T>` that contains the specified number
of elements from the start of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## AsyncEnumerable.Take<TSource>(IAsyncEnumerable<TSource>, Range) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> Take<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Range range);
```

Returns a specified range of contiguous elements from a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `range`: The range of elements to return, which has start and end indexes either from the start or the end.

Returns: An `IAsyncEnumerable<T>` that contains the specified `range` of elements from the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in Visual C# or `For Each` in Visual Basic.

Take enumerates `source` and yields elements whose indices belong to the specified `range`.

## AsyncEnumerable.TakeLast<TSource>(IAsyncEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> TakeLast<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, int count);
```

Returns a new sequence that contains the last `count` elements from `source`.

Parameters:

- `TSource`: The type of the elements in `source`.
- `source`: A sequence to return elements from.
- `count`: The number of elements to take from the end of the sequence.

Returns: A new sequence that contains the last `count` elements from `source`.

To be added.

## AsyncEnumerable.TakeWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> TakeWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,bool> predicate);
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

## AsyncEnumerable.TakeWhile<TSource>(IAsyncEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IAsyncEnumerable<TSource> TakeWhile<TSource> (this System.Collections.Generic.IAsyncEnumerable<TSource> source, Func<TSource,int,bool> predicate);
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
