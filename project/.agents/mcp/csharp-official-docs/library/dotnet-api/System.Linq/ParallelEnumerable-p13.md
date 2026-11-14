---
title: "ParallelEnumerable class (part 13 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 13 of 16)

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Decimal>) method

```csharp
public static decimal Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Double>) method

```csharp
public static double Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Int32>) method

```csharp
public static int Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements in the source sequence.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Int64>) method

```csharp
public static long Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Decimal>>) method

```csharp
public static decimal? Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal?> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Double>>) method

```csharp
public static double? Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double?> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Int32>>) method

```csharp
public static int? Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int?> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Int64>>) method

```csharp
public static long? Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long?> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Single>>) method

```csharp
public static float? Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float?> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>. -or-  One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Sum<TSource>(ParallelQuery<TSource>, Single>) method

```csharp
public static float Sum<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float> selector);
```

Computes in parallel the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to calculate the sum of.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The sum is larger than <see cref="F:System.Single.MaxValue">Single.MaxValue</see>. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Take<TSource>(ParallelQuery<TSource>, Int32) method

```csharp
public static System.Linq.ParallelQuery<TSource> Take<TSource> (this System.Linq.ParallelQuery<TSource> source, int count);
```

Returns a specified number of contiguous elements from the start of a parallel sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to return elements from.
- `count`: The number of elements to return.

Returns: A sequence that contains the specified number of elements from the start of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.TakeWhile<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static System.Linq.ParallelQuery<TSource> TakeWhile<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns elements from a parallel sequence as long as a specified condition is true.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: A sequence that contains the elements from the input sequence that occur before the element at which the test no longer passes.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.TakeWhile<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static System.Linq.ParallelQuery<TSource> TakeWhile<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int,bool> predicate);
```

Returns elements from a parallel sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.

Returns: A sequence that contains elements from the input sequence that occur before the element at which the test no longer passes.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by this query.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ThenBy<TSource,TKey>(OrderedParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> ThenBy<TSource,TKey> (this System.Linq.OrderedParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Performs in parallel a subsequent ordering of the elements in a sequence in ascending order according to a key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An OrderedParallelQuery{TSource} that contains elements to sort.
- `keySelector`: A function to extract a key from an element.

Returns: An OrderedParallelQuery{TSource} whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.
