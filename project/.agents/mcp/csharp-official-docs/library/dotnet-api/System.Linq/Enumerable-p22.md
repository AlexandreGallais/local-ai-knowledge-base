---
title: "Enumerable class (part 22 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 22 of 24)

## Enumerable.ThenByDescending<TSource,TKey>(IOrderedEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> ThenByDescending<TSource,TKey> (this System.Linq.IOrderedEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IOrderedEnumerable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

`Enumerable.ThenBy` and `Enumerable.ThenByDescending` are defined to extend the type `IOrderedEnumerable<T>`, which is also the return type of these methods. This design enables you to specify multiple sort criteria by applying any number of `Enumerable.ThenBy` or `Enumerable.ThenByDescending` methods.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

This sorting method compares keys by using the default comparer `Comparer<T>.Default`.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

In C# query expression syntax, an `orderby [first criterion], [second criterion] descending` clause translates to an invocation of `Enumerable.ThenByDescending`.

In Visual Basic query expression syntax, an `Order By [first criterion], [second criterion] Descending` clause translates to an invocation of `Enumerable.ThenByDescending`.

## Enumerable.ThenByDescending<TSource,TKey>(IOrderedEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> ThenByDescending<TSource,TKey> (this System.Linq.IOrderedEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IOrderedEnumerable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

`Enumerable.ThenBy` and `Enumerable.ThenByDescending` are defined to extend the type `IOrderedEnumerable<T>`, which is also the return type of these methods. This design enables you to specify multiple sort criteria by applying any number of `Enumerable.ThenBy` or `Enumerable.ThenByDescending` methods.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` is used to compare keys.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

#### Examples
The following code example demonstrates how to use `ThenByDescending<T1,T2>` to perform a secondary ordering of the elements in a sequence in descending order by using a custom comparer.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ToArray<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource[] ToArray<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Creates an array from a `IEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to create an array from.

Returns: An array that contains the elements from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `ToArray<T>` method forces immediate query evaluation and returns an array that contains the query results. You can append this method to your query in order to obtain a cached copy of the query results.

`Enumerable.ToList` has similar behavior but returns a `List<T>` instead of an array.

#### Examples
The following code example demonstrates how to use `Enumerable.ToArray` to force immediate query evaluation and return an array of results.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ToDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TValue> ToDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source);
```

Creates a dictionary from an enumeration according to the default comparer for the key type.

Parameters:

- `TKey`: The type of the keys from elements of `source`.
- `TValue`: The type of the values from elements of `source`.
- `source`: The enumeration to create a dictionary from.

Returns: A dictionary that contains keys and values from `source` and uses the default comparer for the key type.

Exceptions:

- `ArgumentNullException`: `source` is a `null` reference.
- `ArgumentException`: `source` contains one or more duplicate keys.

To be added.

## Enumerable.ToDictionary<TKey,TValue>(ValueTuple<TKey,TValue>>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TValue> ToDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<(TKey Key, TValue Value)> source);
```

Creates a dictionary from an enumeration according to the default comparer for the key type.

Parameters:

- `TKey`: The type of the keys from elements of `source`.
- `TValue`: The type of the values from elements of `source`.
- `source`: The enumeration to create a dictionary from.

Returns: A dictionary that contains keys and values from `source` and uses default comparer for the key type.

Exceptions:

- `ArgumentNullException`: `source` is a `null` reference.
- `ArgumentException`: `source` contains one or more duplicate keys.

To be added.

## Enumerable.ToDictionary<TKey,TValue>(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TValue> ToDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> source, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a dictionary from an enumeration according to specified key comparer.

Parameters:

- `TKey`: The type of the keys from elements of `source`.
- `TValue`: The type of the values from elements of `source`.
- `source`: The enumeration to create a dictionary from.
- `comparer`: An equality comparer to compare keys.

Returns: A dictionary that contains keys and values from `source`.

Exceptions:

- `ArgumentNullException`: `source` is a `null` reference.
- `ArgumentException`: `source` contains one or more duplicate keys.

If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.ToDictionary<TKey,TValue>(ValueTuple<TKey,TValue>>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TValue> ToDictionary<TKey,TValue> (this System.Collections.Generic.IEnumerable<(TKey Key, TValue Value)> source, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a dictionary from an enumeration according to specified key <example-value> comparer.

Parameters:

- `TKey`: The type of the keys from elements of `source`.
- `TValue`: The type of the values from elements of `source`.
- `source`: The enumeration to create a dictionary from.
- `comparer`: An equality comparer to compare keys.

Returns: A dictionary that contains keys and values from `source`.

Exceptions:

- `ArgumentNullException`: `source` is a `null` reference.
- `ArgumentException`: `source` contains one or more duplicate keys.

If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.ToDictionary<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TSource> ToDictionary<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Creates a `Dictionary<T1,T2>` from an `IEnumerable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.

Returns: A `Dictionary<T1,T2>` that contains keys and values. The values within each group are in the same order as in `source`.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

-or-

`keySelector` produces a key that is `null`.
- `ArgumentException`: `keySelector` produces duplicate keys for two elements.

#### Remarks
The `ToDictionary<T1,T2>` method uses the default equality comparer `EqualityComparer<T>.Default` to compare keys.

#### Examples
The following code example demonstrates how to use `ToDictionary<T1,T2>` to create a `Dictionary<T1,T2>` by using a key selector.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ToDictionary<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TSource> ToDictionary<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Creates a `Dictionary<T1,T2>` from an `IEnumerable<T>` according to a specified key <example-value> function and key comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the keys returned by `keySelector`.
- `source`: An `IEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `Dictionary<T1,T2>` that contains keys and values. The values within each group are in the same order as in `source`.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

-or-

`keySelector` produces a key that is `null`.
- `ArgumentException`: `keySelector` produces duplicate keys for two elements.

#### Remarks
If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

## Enumerable.ToDictionary<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>) method

```csharp
public static System.Collections.Generic.Dictionary<TKey,TElement> ToDictionary<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector);
```

Creates a `Dictionary<T1,T2>` from an `IEnumerable<T>` according to specified key <example-value> and element selector functions.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the value returned by `elementSelector`.
- `source`: An `IEnumerable<T>` to create a `Dictionary<T1,T2>` from.
- `keySelector`: A function to extract a key from each element.
- `elementSelector`: A transform function to produce a result element value from each element.

Returns: A `Dictionary<T1,T2>` that contains values of type `TElement` selected from the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

-or-

`keySelector` produces a key that is `null`.
- `ArgumentException`: `keySelector` produces duplicate keys for two elements.

#### Remarks
The `ToDictionary<T1,T2,T3>` method uses the default equality comparer `EqualityComparer<T>.Default` to compare keys.
