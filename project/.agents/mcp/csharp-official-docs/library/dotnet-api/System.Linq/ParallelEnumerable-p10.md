---
title: "ParallelEnumerable class (part 10 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 10 of 16)

## ParallelEnumerable.Min<TSource>(ParallelQuery<TSource>, Decimal>>) method

```csharp
public static decimal? Min<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,decimal?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Min<TSource>(ParallelQuery<TSource>, Double>>) method

```csharp
public static double? Min<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,double?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Min<TSource>(ParallelQuery<TSource>, Int32>>) method

```csharp
public static int? Min<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Min<TSource>(ParallelQuery<TSource>, Int64>>) method

```csharp
public static long? Min<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,long?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Min<TSource>(ParallelQuery<TSource>, Single>>) method

```csharp
public static float? Min<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float?> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

To be added.

## ParallelEnumerable.Min<TSource>(ParallelQuery<TSource>, Single>) method

```csharp
public static float Min<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,float> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.Min<TSource,TResult>(ParallelQuery<TSource>, Func<TSource,TResult>) method

```csharp
public static TResult? Min<TSource,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TResult> selector);
```

Invokes in parallel a transform function on each element of a sequence and returns the minimum value.

Parameters:

- `TSource`: The type of elements of `source`.
- `TResult`: The type of the value returned by `selector`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements and `TSource` is a non-nullable value type.

To be added.

## ParallelEnumerable.OfType<TResult>(ParallelQuery) method

```csharp
public static System.Linq.ParallelQuery<TResult> OfType<TResult> (this System.Linq.ParallelQuery source);
```

Filters the elements of a ParallelQuery based on a specified type.

Parameters:

- `TResult`: The type to filter the elements of the sequence on.
- `source`: The sequence with elements to filter.

Returns: A sequence that contains elements from the input sequence filtered by type.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.OrderBy<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> OrderBy<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Sorts in parallel the elements of a sequence in ascending order according to a key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.

Returns: An OrderedParallelQuery{TSource} whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. To achieve a stable sort, change a query of the form: var ordered = source.Select((e,i) => new { E=e, I=i }).OrderBy((v) => v.e).ThenBy(v => v.i).Select((v) => v.e);

## ParallelEnumerable.OrderBy<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> OrderBy<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts in parallel the elements of a sequence in ascending order by using a specified comparer.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An IComparer{TKey} to compare keys.

Returns: An OrderedParallelQuery{TSource} whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.

## ParallelEnumerable.OrderByDescending<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> OrderByDescending<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Sorts in parallel the elements of a sequence in descending order according to a key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.

Returns: An OrderedParallelQuery{TSource} whose elements are sorted descending according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.

## ParallelEnumerable.OrderByDescending<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> OrderByDescending<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts the elements of a sequence in descending order by using a specified comparer.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An IComparer{TKey} to compare keys.

Returns: An OrderedParallelQuery{TSource} whose elements are sorted descending according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.

## ParallelEnumerable.Range(Int32, Int32) method

```csharp
public static System.Linq.ParallelQuery<int> Range (int start, int count);
```

Generates a parallel sequence of integral numbers within a specified range.

Parameters:

- `start`: The value of the first integer in the sequence.
- `count`: The number of sequential integers to generate.

Returns: An IEnumerable<Int32> in C# or IEnumerable(Of Int32) in Visual Basic that contains a range of sequential integral numbers.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than 0 -or- `start` + `count` - 1 is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

To be added.

## ParallelEnumerable.Repeat<TResult>(TResult, Int32) method

```csharp
public static System.Linq.ParallelQuery<TResult> Repeat<TResult> (TResult element, int count);
```

Generates a parallel sequence that contains one repeated value.

Parameters:

- `TResult`: The type of the value to be repeated in the result sequence.
- `element`: The value to be repeated.
- `count`: The number of times to repeat the value in the generated sequence.

Returns: A sequence that contains a repeated value.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than 0.

To be added.

## ParallelEnumerable.Reverse<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Reverse<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Inverts the order of the elements in a parallel sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to reverse.

Returns: A sequence whose elements correspond to those of the input sequence in reverse order.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.
