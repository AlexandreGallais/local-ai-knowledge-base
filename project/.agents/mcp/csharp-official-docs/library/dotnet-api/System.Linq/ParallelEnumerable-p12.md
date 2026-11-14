---
title: "ParallelEnumerable class (part 12 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 12 of 16)

## ParallelEnumerable.Single<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static TSource Single<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns the only element of a parallel sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the single element of.
- `predicate`: A function to test an element for a condition.

Returns: The single element of the input sequence that satisfies a condition.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: No element satisfies the condition in `predicate`. -or- More than one element satisfies the condition in `predicate`.

To be added.

## ParallelEnumerable.SingleOrDefault<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource? SingleOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the only element of a parallel sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the single element of.

Returns: The single element of the input sequence, or default() if the sequence contains no elements.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `InvalidOperationException`: `source` has more than one element.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SingleOrDefault<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static TSource? SingleOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns the only element of a parallel sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the single element of.
- `predicate`: A function to test an element for a condition.

Returns: The single element of the input sequence that satisfies the condition, or default() if no such element is found.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` is empty or multiple elements are returned.

To be added.

## ParallelEnumerable.Skip<TSource>(ParallelQuery<TSource>, Int32) method

```csharp
public static System.Linq.ParallelQuery<TSource> Skip<TSource> (this System.Linq.ParallelQuery<TSource> source, int count);
```

Bypasses a specified number of elements in a parallel sequence and then returns the remaining elements.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to return elements from.
- `count`: The number of elements to skip before returning the remaining elements.

Returns: A sequence that contains the elements that occur after the specified index in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: Count is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
If count > source.Count(), no elements are returned.

## ParallelEnumerable.SkipWhile<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static System.Linq.ParallelQuery<TSource> SkipWhile<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Bypasses elements in a parallel sequence as long as a specified condition is true and then returns the remaining elements.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: A sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SkipWhile<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static System.Linq.ParallelQuery<TSource> SkipWhile<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int,bool> predicate);
```

Bypasses elements in a parallel sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.

Returns: A sequence that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by predicate.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by the query.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Decimal>) method

```csharp
public static decimal Sum (this System.Linq.ParallelQuery<decimal> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Double>) method

```csharp
public static double Sum (this System.Linq.ParallelQuery<double> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Int32>) method

```csharp
public static int Sum (this System.Linq.ParallelQuery<int> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Int64>) method

```csharp
public static long Sum (this System.Linq.ParallelQuery<long> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Decimal>>) method

```csharp
public static decimal? Sum (this System.Linq.ParallelQuery<decimal?> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Double>>) method

```csharp
public static double? Sum (this System.Linq.ParallelQuery<double?> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Int32>>) method

```csharp
public static int? Sum (this System.Linq.ParallelQuery<int?> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Int64>>) method

```csharp
public static long? Sum (this System.Linq.ParallelQuery<long?> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Single>>) method

```csharp
public static float? Sum (this System.Linq.ParallelQuery<float?> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>. -or-  One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum(Single>) method

```csharp
public static float Sum (this System.Linq.ParallelQuery<float> source);
```

Computes in parallel the sum of a sequence of values.

Parameters:

- `source`: A sequence of values to calculate the sum of.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.
