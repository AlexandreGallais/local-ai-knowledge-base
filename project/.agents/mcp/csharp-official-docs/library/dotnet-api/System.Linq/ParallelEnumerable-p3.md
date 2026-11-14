---
title: "ParallelEnumerable class (part 3 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 3 of 16)

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Int32>) method

```csharp
public static double Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Int64>) method

```csharp
public static double Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Decimal>>) method

```csharp
public static decimal? Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal?> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Double>>) method

```csharp
public static double? Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double?> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Int32>>) method

```csharp
public static double? Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int?> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Int64>>) method

```csharp
public static double? Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long?> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum or count of the elements in the sequence is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Single>>) method

```csharp
public static float? Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float?> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Average<TSource>(ParallelQuery<TSource>, Single>) method

```csharp
public static float Average<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float> selector);
```

Computes in parallel the average of a sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: (Thrown as inner exception in an `AggregateException`). The `selector` function returns a value greater than MaxValue for the element type.

To be added.

## ParallelEnumerable.Cast<TResult>(ParallelQuery) method

```csharp
public static System.Linq.ParallelQuery<TResult> Cast<TResult> (this System.Linq.ParallelQuery source);
```

Converts the elements of a ParallelQuery to the specified type.

Parameters:

- `TResult`: The type to convert the elements of `source` to.
- `source`: The sequence that contains the elements to be converted.

Returns: A sequence that contains each element of the source sequence converted to the specified type.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `InvalidCastException`: The type of the source sequence could not be converted to `TResult`.

To be added.

## ParallelEnumerable.Concat<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Concat<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

This Concat overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.Concat<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Concat<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second);
```

Concatenates two parallel sequences.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: The first sequence to concatenate.
- `second`: The sequence to concatenate to the first sequence.

Returns: A sequence that contains the concatenated elements of the two input sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).

To be added.

## ParallelEnumerable.Contains<TSource>(ParallelQuery<TSource>, TSource) method

```csharp
public static bool Contains<TSource> (this System.Linq.ParallelQuery<TSource> source, TSource value);
```

Determines in parallel whether a sequence contains a specified element by using the default equality comparer.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence in which to locate a value.
- `value`: The value to locate in the sequence.

Returns: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Contains<TSource>(ParallelQuery<TSource>, TSource, IEqualityComparer<TSource>) method

```csharp
public static bool Contains<TSource> (this System.Linq.ParallelQuery<TSource> source, TSource value, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Determines in parallel whether a sequence contains a specified element by using a specified `IEqualityComparer<T>`.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence in which to locate a value.
- `value`: The value to locate in the sequence.
- `comparer`: An equality comparer to compare values.

Returns: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.
