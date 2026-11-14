---
title: "ParallelEnumerable class (part 11 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 11 of 16)

## ParallelEnumerable.Select<TSource,TResult>(ParallelQuery<TSource>, Int32,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Select<TSource,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int,TResult> selector);
```

Projects in parallel each element of a sequence into a new form by incorporating the element's index.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of elements returned by selector.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element.

Returns: A sequence whose elements are the result of invoking the transform function on each element of `source`, based on the index supplied to `selector`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by the query. This condition might occur in streaming scenarios.

To be added.

## ParallelEnumerable.Select<TSource,TResult>(ParallelQuery<TSource>, Func<TSource,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> Select<TSource,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TResult> selector);
```

Projects in parallel each element of a sequence into a new form.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of elements returned by selector.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each element.

Returns: A sequence whose elements are the result of invoking the transform function on each element of `source`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SelectMany<TSource,TResult>(ParallelQuery<TSource>, IEnumerable<TResult>>) method

```csharp
public static System.Linq.ParallelQuery<TResult> SelectMany<TSource,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,System.Collections.Generic.IEnumerable<TResult>> selector);
```

Projects in parallel each element of a sequence to an `IEnumerable<T>` and flattens the resulting sequences into one sequence.

Parameters:

- `TSource`: The type of elements of `source`.
- `TResult`: The type of the elements of the sequence returned by selector.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each element.

Returns: A sequence whose elements are the result of invoking the one-to-many transform function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SelectMany<TSource,TResult>(ParallelQuery<TSource>, IEnumerable<TResult>>) method

```csharp
public static System.Linq.ParallelQuery<TResult> SelectMany<TSource,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int,System.Collections.Generic.IEnumerable<TResult>> selector);
```

Projects in parallel each element of a sequence to an `IEnumerable<T>`, and flattens the resulting sequences into one sequence. The index of each source element is used in the projected form of that element.

Parameters:

- `TSource`: The type of elements of `source`.
- `TResult`: The type of the elements of the sequence returned by selector.
- `source`: A sequence of values to project.
- `selector`: A transform function to apply to each element.

Returns: A sequence whose elements are the result of invoking the one-to-many transform function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by the query.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SelectMany<TSource,TCollection,TResult>(ParallelQuery<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> SelectMany<TSource,TCollection,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.

Parameters:

- `TSource`: The type of the intermediate elements collected by `collectionSelector`.
- `TCollection`: The type of elements of `source`.
- `TResult`: The type of elements in the result sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
- `resultSelector`: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.

Returns: A sequence whose elements are the result of invoking the one-to-many transform function `collectionSelector` on each element of `source` based on the index supplied to `collectionSelector`, and then mapping each of those sequence elements and their corresponding source element to a result element.

Exceptions:

- `ArgumentNullException`: `source` or `collectionSelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by the query.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SelectMany<TSource,TCollection,TResult>(ParallelQuery<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Linq.ParallelQuery<TResult> SelectMany<TSource,TCollection,TResult> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,int,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein. The index of each source element is used in the intermediate projected form of that element.

Parameters:

- `TSource`: The type of the intermediate elements collected by `collectionSelector`.
- `TCollection`: The type of elements of `source`.
- `TResult`: The type of elements to return.
- `source`: A sequence of values to project.
- `collectionSelector`: A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
- `resultSelector`: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.

Returns: A sequence whose elements are the result of invoking the one-to-many transform function `collectionSelector` on each element of `source` based on the index supplied to `collectionSelector`, and then mapping each of those sequence elements and their corresponding source element to a result element.

Exceptions:

- `ArgumentNullException`: `source` or `collectionSelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `OverflowException`: More than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see> elements are enumerated by the query.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SequenceEqual<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

This SequenceEqual overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Thrown every time this method is called.

To be added.

## ParallelEnumerable.SequenceEqual<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second);
```

Determines whether two parallel sequences are equal by comparing the elements by using the default equality comparer for their type.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence to compare to second.
- `second`: A sequence to compare to the first input sequence.

Returns: `true` if the two source sequences are of equal length and their corresponding elements are equal according to the default equality comparer for their type; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.SequenceEqual<TSource>(ParallelQuery<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

This SequenceEqual overload should never be called. This method is marked as obsolete and always throws `NotSupportedException` when called.

Parameters:

- `TSource`: This type parameter is not used.
- `first`: This parameter is not used.
- `second`: This parameter is not used.
- `comparer`: This parameter is not used.

Returns: This overload always throws a `NotSupportedException`.

Exceptions:

- `NotSupportedException`: Thrown every time this method is called.

To be added.

## ParallelEnumerable.SequenceEqual<TSource>(ParallelQuery<TSource>, ParallelQuery<TSource>, IEqualityComparer<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Linq.ParallelQuery<TSource> first, System.Linq.ParallelQuery<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Determines whether two parallel sequences are equal by comparing their elements by using a specified IEqualityComparer{T}.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: A sequence to compare to `second`.
- `second`: A sequence to compare to the first input sequence.
- `comparer`: An `IEqualityComparer<T>` to use to compare elements.

Returns: `true` if the two source sequences are of equal length and their corresponding elements are equal according to the default equality comparer for their type; otherwise, `false`.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `first` or `second` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.Single<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource Single<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Returns the only element of a parallel sequence, and throws an exception if there is not exactly one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the single element of.

Returns: The single element of the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.
- `InvalidOperationException`: The input sequence contains more than one element. -or- The input sequence is empty.

To be added.
