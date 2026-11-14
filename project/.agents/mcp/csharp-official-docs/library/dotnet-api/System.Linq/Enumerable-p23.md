---
title: "Enumerable class (part 23 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 23 of 24)

## Enumerable.ToDictionary<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TElement> ToDictionary<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a `Dictionary<T1,T2>` from an `IEnumerable<T>` according to a specified key <example-value> function, a comparer, and an element selector function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: An `IEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `Dictionary<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

-or-

`keySelector` produces a key that is `null`.
- `ArgumentException`: `keySelector` produces duplicate keys for two elements.

#### Remarks
If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.ToHashSet<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.HashSet<TSource> ToHashSet<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Creates a `HashSet<T>` from an `IEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to create a `HashSet<T>` from.

Returns: A `HashSet<T>` that contains values of type `TSource` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Enumerable.ToHashSet<TSource>(IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.HashSet<TSource> ToHashSet<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Creates a `HashSet<T>` from an `IEnumerable<T>` using the `comparer` to compare keys.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to create a `HashSet<T>` from.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `HashSet<T>` that contains values of type `TSource` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Enumerable.ToList<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.List<TSource> ToList<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Creates a `List<T>` from an `IEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IEnumerable<T>` to create a `List<T>` from.

Returns: A `List<T>` that contains elements from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `ToList<T>` method forces immediate query evaluation and returns a `List<T>` that contains the query results. You can append this method to your query in order to obtain a cached copy of the query results.

`Enumerable.ToArray` has similar behavior but returns an array instead of a `List<T>`.

#### Examples
The following code example demonstrates how to use `Enumerable.ToList` to force immediate query evaluation and return a `List<T>` that contains the query results.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ToLookup<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.ILookup<TKey,TSource> ToLookup<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Creates a `Lookup<T1,T2>` from an `IEnumerable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: The `IEnumerable<T>` to create a `Lookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.

Returns: A `Lookup<T1,T2>` that contains keys and values. The values within each group are in the same order as in `source`.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
The `ToLookup<T1,T2>` method returns a `Lookup<T1,T2>`, a one-to-many dictionary that maps keys to collections of values. A `Lookup<T1,T2>` differs from a `Dictionary<T1,T2>`, which performs a one-to-one mapping of keys to single values.

The default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.ToLookup<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ILookup<TKey,TSource> ToLookup<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a `Lookup<T1,T2>` from an `IEnumerable<T>` according to a specified key <example-value> function and key comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: The `IEnumerable<T>` to create a `Lookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `Lookup<T1,T2>` that contains keys and values. The values within each group are in the same order as in `source`.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
The `ToLookup<T1,T2>` method returns a `Lookup<T1,T2>`, a one-to-many dictionary that maps keys to collections of values. A `Lookup<T1,T2>` is different to a `Dictionary<T1,T2>`, which performs a one-to-one mapping of keys to single values.

If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.ToLookup<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>) method

```csharp
public static System.Linq.ILookup<TKey,TElement> ToLookup<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector);
```

Creates a `Lookup<T1,T2>` from an `IEnumerable<T>` according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: The `IEnumerable<T>` to create a `Lookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.

Returns: A `Lookup<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

#### Remarks
The `ToLookup<T1,T2,T3>` method returns a `Lookup<T1,T2>`, a one-to-many dictionary that maps keys to collections of values. A `Lookup<T1,T2>` differs from a `Dictionary<T1,T2>`, which performs a one-to-one mapping of keys to single values.

The default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

#### Examples
The following code example demonstrates how to use `ToLookup<T1,T2,T3>` to create a `Lookup<T1,T2>` by using a key <example-value> function and an element selector function.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ToLookup<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.ILookup<TKey,TElement> ToLookup<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a `Lookup<T1,T2>` from an `IEnumerable<T>` according to a specified key <example-value> function, a comparer and an element selector function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: The `IEnumerable<T>` to create a `Lookup<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `Lookup<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

#### Remarks
The `ToLookup<T1,T2,T3>` method returns a `Lookup<T1,T2>`, a one-to-many dictionary that maps keys to collections of values. A `Lookup<T1,T2>` differs from a `Dictionary<T1,T2>`, which performs a one-to-one mapping of keys to single values.

If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.TryGetNonEnumeratedCount<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static bool TryGetNonEnumeratedCount<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, out int count);
```

Attempts to determine the number of elements in a sequence without forcing an enumeration.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be counted.
- `count`: When this method returns, contains the number of elements in `source`, or 0 if the count couldn't be determined without enumeration.

Returns: `true` if the count of `source` can be determined without enumeration; otherwise, `false`.

#### Remarks

The method performs a series of type tests, identifying common subtypes whose count can be determined without enumerating. This includes `ICollection<T>`, `ICollection`, and internal types used in the LINQ implementation.

The method is typically a constant-time operation, but ultimately this depends on the complexity characteristics of the underlying collection's implementation.

## Enumerable.Union<TSource>(IEnumerable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Union<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

Produces the set union of two sequences by using the default equality comparer.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IEnumerable<T>` whose distinct elements form the second set for the union.

Returns: An `IEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

This method excludes duplicates from the return set. This is different behavior to the `Enumerable.Concat` method, which returns all the elements in the input sequences including duplicates.

The default equality comparer, `EqualityComparer<T>.Default`, is used to compare values of the types that implement the `IEqualityComparer<T>` generic interface. To compare a custom data type, you need to implement this interface and provide your own `Object.GetHashCode` and `Object.Equals` methods for the type.

When the object returned by this method is enumerated, `Union` enumerates `first` and `second` in that order and yields each element that has not already been yielded.

#### Examples
The following code example demonstrates how to use `Union<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` to obtain the union of two sequences of integers.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

If you want to compare sequences of objects of some custom data type, you have to implement the `IEquatable<T>` generic interface in a helper class. The following code example shows how to implement this interface in a custom data type and override `Object.GetHashCode` and `Object.Equals` methods.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

After you implement this interface, you can use sequences of `ProductA` objects in the `Union<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._
