---
title: "ParallelEnumerable class (part 8 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 8 of 16)

## ParallelEnumerable.Max(Decimal>>) method

```csharp
public static decimal? Max (this System.Linq.ParallelQuery<decimal?> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Double>>) method

```csharp
public static double? Max (this System.Linq.ParallelQuery<double?> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Int32>>) method

```csharp
public static int? Max (this System.Linq.ParallelQuery<int?> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Int64>>) method

```csharp
public static long? Max (this System.Linq.ParallelQuery<long?> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Single>>) method

```csharp
public static float? Max (this System.Linq.ParallelQuery<float?> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max(Single>) method

```csharp
public static float Max (this System.Linq.ParallelQuery<float> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource? Max<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the maximum value in a parallel sequence of values.

Parameters:

- `TSource`: The type of elements in the source sequence.
- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Decimal>) method

```csharp
public static decimal Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Double>) method

```csharp
public static double Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Int32>) method

```csharp
public static int Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Int64>) method

```csharp
public static long Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Decimal>>) method

```csharp
public static decimal? Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Double>>) method

```csharp
public static double? Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Int32>>) method

```csharp
public static int? Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Int64>>) method

```csharp
public static long? Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Max<TSource>(ParallelQuery<TSource>, Single>>) method

```csharp
public static float? Max<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the maximum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.
