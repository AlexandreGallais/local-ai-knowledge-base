---
title: "ParallelEnumerable class (part 4 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 4 of 16)

## ParallelEnumerable.Count<TSource>(ParallelQuery<TSource>) method

```csharp
public static int Count<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the number of elements in a parallel sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be counted.

Returns: The number of elements in the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The number of elements in source is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. (In this case the InnerException is `OverflowException`) -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Count<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static int Count<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns a number that represents how many elements in the specified parallel sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be counted.
- `predicate`: A function to test each element for a condition.

Returns: A number that represents how many elements in the sequence satisfy the condition in the predicate function.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: The number of elements in source is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>. (In this case the InnerException is `OverflowException`) -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.DefaultIfEmpty<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> DefaultIfEmpty<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the elements of the specified parallel sequence or the type parameter's default value in a singleton collection if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return a default value for if it is empty.

Returns: A sequence that contains default(TSource) if `source` is empty; otherwise, `source`.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.DefaultIfEmpty<TSource>(ParallelQuery<TSource>, TSource) method

```csharp
public static System.Linq.ParallelQuery<TSource> DefaultIfEmpty<TSource> (this System.Linq.ParallelQuery<TSource> source, TSource defaultValue);
```

Returns the elements of the specified parallel sequence or the specified value in a singleton collection if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the specified value for if it is empty.
- `defaultValue`: The value to return if the sequence is empty.

Returns: A sequence that contains defaultValue if `source` is empty; otherwise, `source`.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Distinct<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Distinct<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns distinct elements from a parallel sequence by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to remove duplicate elements from.

Returns: A sequence that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Distinct<TSource>(ParallelQuery<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Distinct<TSource> (this System.Linq.ParallelQuery<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Returns distinct elements from a parallel sequence by using a specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to remove duplicate elements from.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ElementAt<TSource>(ParallelQuery<TSource>, Int32) method

```csharp
public static TSource ElementAt<TSource> (this System.Linq.ParallelQuery<TSource> source, int index);
```

Returns the element at a specified index in a parallel sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to return an element from.
- `index`: The zero-based index of the element to retrieve.

Returns: The element at the specified position in the source sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to the number of elements in `source`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ElementAtOrDefault<TSource>(ParallelQuery<TSource>, Int32) method

```csharp
public static TSource? ElementAtOrDefault<TSource> (this System.Linq.ParallelQuery<TSource> source, int index);
```

Returns the element at a specified index in a parallel sequence or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to return an element from.
- `index`: The zero-based index of the element to retrieve.

Returns: default(TSource) if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Empty<TResult>() method

```csharp
public static System.Linq.ParallelQuery<TResult> Empty<TResult> ();
```

Returns an empty ParallelQuery{TResult} that has the specified type argument.

Parameters:

- `TResult`: The type to assign to the type parameter of the returned generic sequence.

Returns: An empty sequence whose type argument is `TResult`.

To be added.

## ParallelEnumerable.Except<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Except<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

This Except overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.Except<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Except<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second);
```

Produces the set difference of two parallel sequences by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence whose elements that are not also in `second` will be returned.
- `second`: A sequence whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Except<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Except<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

This Except overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.
- `comparer`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: The exception that occurs when this method is called.

To be added.

## ParallelEnumerable.Except<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.ParallelQuery<TSource> Except<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set difference of two parallel sequences by using the specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence whose elements that are not also in `second` will be returned.
- `second`: A sequence whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `comparer`: `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.First<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource First<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the first element of a parallel sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the first element of.

Returns: The first element in the specified sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
If the query is not ordered, then the first element is non-deterministic. For more information, see Order Preservation in PLINQ.

## ParallelEnumerable.First<TSource>(ParallelQuery<TSource>, Boolean>) method

```csharp
public static TSource First<TSource> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,bool> predicate);
```

Returns the first element in a parallel sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: The first element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `predicate` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: No element in `source` satisfies the condition in `predicate`.

#### Remarks
If the query is not ordered, then the first element is non-deterministic. For more information, see Order Preservation in PLINQ.
