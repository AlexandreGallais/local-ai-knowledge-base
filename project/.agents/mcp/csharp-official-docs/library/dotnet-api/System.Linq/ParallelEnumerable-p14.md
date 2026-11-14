---
title: "ParallelEnumerable class (part 14 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ParallelEnumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ParallelEnumerable class (part 14 of 16)

## ParallelEnumerable.ThenBy<TSource,TKey>(OrderedParallelQuery<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> ThenBy<TSource,TKey> (this System.Linq.OrderedParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Performs in parallel a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An OrderedParallelQuery{TSource} that contains elements to sort.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An IComparer{TKey} to compare keys.

Returns: An OrderedParallelQuery{TSource} whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.

## ParallelEnumerable.ThenByDescending<TSource,TKey>(OrderedParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> ThenByDescending<TSource,TKey> (this System.Linq.OrderedParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Performs in parallel a subsequent ordering of the elements in a sequence in descending order, according to a key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An OrderedParallelQuery{TSource} that contains elements to sort.
- `keySelector`: A function to extract a key from an element.

Returns: A sequence whose elements are sorted descending according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.

## ParallelEnumerable.ThenByDescending<TSource,TKey>(OrderedParallelQuery<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.OrderedParallelQuery<TSource> ThenByDescending<TSource,TKey> (this System.Linq.OrderedParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Performs in parallel a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An OrderedParallelQuery{TSource} that contains elements to sort.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An IComparer{TKey} to compare keys.

Returns: A sequence whose elements are sorted descending according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

#### Remarks
In contrast to the sequential implementation, this is not a stable sort. See the remarks for `ParallelEnumerable.OrderBy` for an approach to implementing a stable sort.

## ParallelEnumerable.ToArray<TSource>(ParallelQuery<TSource>) method

```csharp
public static TSource[] ToArray<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Creates an array from a `ParallelQuery<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to create an array from.

Returns: An array that contains the elements from the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToDictionary<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TSource> ToDictionary<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Creates a `Dictionary<T1,T2>` from a `ParallelQuery<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.

Returns: A `Dictionary<T1,T2>` that contains keys and values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: `keySelector` produces a key that is a null reference (Nothing in Visual Basic). -or- `keySelector` produces duplicate keys for two elements. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToDictionary<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TSource> ToDictionary<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a `Dictionary<T1,T2>` from a `ParallelQuery<T>` according to a specified key <example-value> function and key comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `Dictionary<T1,T2>` that contains keys and values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: `keySelector` produces a key that is a null reference (Nothing in Visual Basic). -or- `keySelector` produces duplicate keys for two elements. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToDictionary<TSource,TKey,TElement>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TElement> ToDictionary<TSource,TKey,TElement> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector);
```

Creates a `Dictionary<T1,T2>` from a `ParallelQuery<T>` according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: A sequence to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.

Returns: A `Dictionary<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: `keySelector` produces a key that is a null reference (Nothing in Visual Basic). -or- `keySelector` produces duplicate keys for two elements. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToDictionary<TSource,TKey,TElement>(ParallelQuery<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TElement> ToDictionary<TSource,TKey,TElement> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a `Dictionary<T1,T2>` from a `ParallelQuery<T>` according to a specified key <example-value> function, a comparer, and an element selector function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: A sequence to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `Dictionary<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: `keySelector` produces a key that is a null reference (Nothing in Visual Basic). -or- `keySelector` produces duplicate keys for two elements. -or- One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToList<TSource>(ParallelQuery<TSource>) method

```csharp
public static System.Collections.Generic.List<TSource> ToList<TSource> (this System.Linq.ParallelQuery<TSource> source);
```

Creates a `List<T>` from an `ParallelQuery<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to create a `List<T>` from.

Returns: A `List<T>` that contains elements from the input sequence.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToLookup<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.ILookup<TKey,TSource> ToLookup<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector);
```

Creates an `ILookup<T1,T2>` from a `ParallelQuery<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: The sequence to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.

Returns: A `ILookup<T1,T2>` that contains keys and values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.

## ParallelEnumerable.ToLookup<TSource,TKey>(ParallelQuery<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ILookup<TKey,TSource> ToLookup<TSource,TKey> (this System.Linq.ParallelQuery<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates an `ILookup<T1,T2>` from a `ParallelQuery<T>` according to a specified key <example-value> function and key comparer.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: The sequence to create a `ILookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `ILookup<T1,T2>` that contains keys and values.

Exceptions:

- `OperationCanceledException`: The query was canceled with the token <example-value> in through `ParallelEnumerable.WithCancellation<T>`.
- `ArgumentNullException`: `source` or `keySelector` or is a null reference (Nothing in Visual Basic).
- `AggregateException`: One or more exceptions occurred during the evaluation of the query.

To be added.
