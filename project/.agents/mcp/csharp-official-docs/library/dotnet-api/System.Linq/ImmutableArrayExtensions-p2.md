---
title: "ImmutableArrayExtensions class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/ImmutableArrayExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableArrayExtensions class (part 2 of 2)

## ImmutableArrayExtensions.SelectMany<TSource,TCollection,TResult>(ImmutableArray<TSource>, IEnumerable<TCollection>>, Func<TSource,TCollection,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Collections.Immutable.ImmutableArray<TSource> immutableArray, Func<TSource,System.Collections.Generic.IEnumerable<TCollection>> collectionSelector, Func<TSource,TCollection,TResult> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>`,             flattens the resulting sequences into one sequence, and invokes a result             selector function on each element therein.

Parameters:

- `TSource`: The type of the elements of `immutableArray`.
- `TCollection`: The type of the intermediate elements collected by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `immutableArray`: The immutable array.
- `collectionSelector`: A transform function to apply to each element of the input sequence.
- `resultSelector`: A transform function to apply to each element of the intermediate sequence.

Returns: An `IEnumerable<T>` whose elements are the result             of invoking the one-to-many transform function `collectionSelector` on each             element of `immutableArray` and then mapping each of those sequence elements and their             corresponding source element to a result element.

To be added.

## ImmutableArrayExtensions.SequenceEqual<TDerived,TBase>(ImmutableArray<TBase>, IEnumerable<TDerived>, IEqualityComparer<TBase>) method

```csharp
public static bool SequenceEqual<TDerived,TBase> (this System.Collections.Immutable.ImmutableArray<TBase> immutableArray, System.Collections.Generic.IEnumerable<TDerived> items, System.Collections.Generic.IEqualityComparer<TBase>? comparer = default) where TDerived : TBase;
```

Determines whether two sequences are equal according to an equality comparer.

Parameters:

- `TDerived`: The type of element in the compared array.
- `TBase`: The type of element contained by the collection.
- `immutableArray`: The array to use for comparison.
- `items`: The items to use for comparison.
- `comparer`: The comparer to use to check for equality.

Returns: `true` to indicate the sequences are equal; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.SequenceEqual<TDerived,TBase>(ImmutableArray<TBase>, ImmutableArray<TDerived>, IEqualityComparer<TBase>) method

```csharp
public static bool SequenceEqual<TDerived,TBase> (this System.Collections.Immutable.ImmutableArray<TBase> immutableArray, System.Collections.Immutable.ImmutableArray<TDerived> items, System.Collections.Generic.IEqualityComparer<TBase>? comparer = default) where TDerived : TBase;
```

Determines whether two sequences are equal according to an equality comparer.

Parameters:

- `TDerived`: The type of element in the compared array.
- `TBase`: The type of element contained by the collection.
- `immutableArray`: The array to use for comparison.
- `items`: The items to use for comparison.
- `comparer`: The comparer to use to check for equality.

Returns: `true` to indicate the sequences are equal; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.SequenceEqual<TDerived,TBase>(ImmutableArray<TBase>, ImmutableArray<TDerived>, Boolean>) method

```csharp
public static bool SequenceEqual<TDerived,TBase> (this System.Collections.Immutable.ImmutableArray<TBase> immutableArray, System.Collections.Immutable.ImmutableArray<TDerived> items, Func<TBase,TBase,bool> predicate) where TDerived : TBase;
```

Determines whether two sequences are equal according to an equality comparer.

Parameters:

- `TDerived`: The type of element in the compared array.
- `TBase`: The type of element contained by the collection.
- `immutableArray`: The array to use for comparison.
- `items`: The items to use for comparison.
- `predicate`: The comparer to use to check for equality.

Returns: `true` to indicate the sequences are equal; otherwise, `false`.

To be added.

## ImmutableArrayExtensions.Single<T>(ImmutableArray<T>) method

```csharp
public static T Single<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to retrieve the element from.

Returns: The element in the sequence.

To be added.

## ImmutableArrayExtensions.Single<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static T Single<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The immutable array to return a single element from.
- `predicate`: The function to test whether an element should be returned.

Returns: Returns `Boolean`.

To be added.

## ImmutableArrayExtensions.SingleOrDefault<T>(ImmutableArray<T>) method

```csharp
public static T? SingleOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Returns the only element of the array, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array.

Returns: The element in the array, or the default value if the array is empty.

Exceptions:

- `InvalidOperationException`: `immutableArray` contains more than one element.

To be added.

## ImmutableArrayExtensions.SingleOrDefault<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static T? SingleOrDefault<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to get the element from.
- `predicate`: The condition the element must satisfy.

Returns: The element if it satisfies the specified condition; otherwise the default element.

Exceptions:

- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

To be added.

## ImmutableArrayExtensions.ToArray<T>(ImmutableArray<T>) method

```csharp
public static T[] ToArray<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray);
```

Copies the contents of this array to a mutable array.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The immutable array to copy into a mutable one.

Returns: The newly instantiated array.

To be added.

## ImmutableArrayExtensions.ToDictionary<TKey,T>(ImmutableArray<T>, Func<T,TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,T> ToDictionary<TKey,T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,TKey> keySelector);
```

Creates a dictionary based on the contents of this array.

Parameters:

- `TKey`: The type of the key.
- `T`: The type of element contained by the collection.
- `immutableArray`: The array to create a dictionary from.
- `keySelector`: The key selector.

Returns: The newly initialized dictionary.

To be added.

## ImmutableArrayExtensions.ToDictionary<TKey,T>(ImmutableArray<T>, Func<T,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,T> ToDictionary<TKey,T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a dictionary based on the contents of this array.

Parameters:

- `TKey`: The type of the key.
- `T`: The type of element contained by the collection.
- `immutableArray`: The array to create a dictionary from.
- `keySelector`: The key selector.
- `comparer`: The comparer to initialize the dictionary with.

Returns: The newly initialized dictionary.

To be added.

## ImmutableArrayExtensions.ToDictionary<TKey,TElement,T>(ImmutableArray<T>, Func<T,TKey>, Func<T,TElement>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TElement> ToDictionary<TKey,TElement,T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,TKey> keySelector, Func<T,TElement> elementSelector);
```

Creates a dictionary based on the contents of this array.

Parameters:

- `TKey`: The type of the key.
- `TElement`: The type of the element.
- `T`: The type of element contained by the collection.
- `immutableArray`: The array to create a dictionary from.
- `keySelector`: The key selector.
- `elementSelector`: The element selector.

Returns: The newly initialized dictionary.

To be added.

## ImmutableArrayExtensions.ToDictionary<TKey,TElement,T>(ImmutableArray<T>, Func<T,TKey>, Func<T,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TElement> ToDictionary<TKey,TElement,T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,TKey> keySelector, Func<T,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a dictionary based on the contents of this array.

Parameters:

- `TKey`: The type of the key.
- `TElement`: The type of the element.
- `T`: The type of element contained by the collection.
- `immutableArray`: The array to create a dictionary from.
- `keySelector`: The key selector.
- `elementSelector`: The element selector.
- `comparer`: The comparer to initialize the dictionary with.

Returns: The newly initialized dictionary.

To be added.

## ImmutableArrayExtensions.Where<T>(ImmutableArray<T>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<T> Where<T> (this System.Collections.Immutable.ImmutableArray<T> immutableArray, Func<T,bool> predicate);
```

Filters a sequence of values based on a predicate.

Parameters:

- `T`: The type of element contained by the collection.
- `immutableArray`: The array to filter.
- `predicate`: The condition to use for filtering the array content.

Returns: Returns `IEnumerable<T>` that contains elements that meet the condition.

To be added.
