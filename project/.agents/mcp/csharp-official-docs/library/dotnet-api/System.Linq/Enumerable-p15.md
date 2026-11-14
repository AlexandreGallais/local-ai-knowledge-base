---
title: "Enumerable class (part 15 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 15 of 24)

## Enumerable.Order<T>(IEnumerable<T>) method

```csharp
public static System.Linq.IOrderedEnumerable<T> Order<T> (this System.Collections.Generic.IEnumerable<T> source);
```

Sorts the elements of a sequence in ascending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `IEnumerable<T>.GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

This method compares elements by using the default comparer `Comparer<T>.Default`.

## Enumerable.Order<T>(IEnumerable<T>, IComparer<T>) method

```csharp
public static System.Linq.IOrderedEnumerable<T> Order<T> (this System.Collections.Generic.IEnumerable<T> source, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements of a sequence in ascending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `IEnumerable<T>.GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` is used to compare elements.

## Enumerable.OrderBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> OrderBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Sorts the elements of a sequence in ascending order according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

Two methods are defined to extend the type `IOrderedEnumerable<T>`, which is the return type of this method. These two methods, namely `ThenBy` and `ThenByDescending`, enable you to specify additional sort criteria to sort a sequence. `ThenBy` and `ThenByDescending` also return an `IOrderedEnumerable<T>`, which means any number of consecutive calls to `ThenBy` or `ThenByDescending` can be made.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

This method compares keys by using the default comparer `Comparer<T>.Default`.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

In query expression syntax, an `orderby` (C#) or `Order By` (Visual Basic) clause translates to an invocation of `Enumerable.OrderBy`.

#### Examples
The following code example demonstrates how to use `OrderBy<T1,T2>` to sort the elements of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.OrderBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> OrderBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts the elements of a sequence in ascending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

Two methods are defined to extend the type `IOrderedEnumerable<T>`, which is the return type of this method. These two methods, namely `ThenBy` and `ThenByDescending`, enable you to specify additional sort criteria to sort a sequence. `ThenBy` and `ThenByDescending` also return an `IOrderedEnumerable<T>`, which means any number of consecutive calls to `ThenBy` or `ThenByDescending` can be made.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` is used to compare keys.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

## Enumerable.OrderByDescending<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> OrderByDescending<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Sorts the elements of a sequence in descending order according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

For an example of this method, see `OrderByDescending<T1,T2>`.

Two methods are defined to extend the type `IOrderedEnumerable<T>`, which is the return type of this method. These two methods, namely `ThenBy` and `ThenByDescending`, enable you to specify additional sort criteria to sort a sequence. `ThenBy` and `ThenByDescending` also return an `IOrderedEnumerable<T>`, which means any number of consecutive calls to `ThenBy` or `ThenByDescending` can be made.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

This method compares keys by using the default comparer `Comparer<T>.Default`.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

In query expression syntax, an `orderby descending` (C#) or `Order By Descending` (Visual Basic) clause translates to an invocation of `Enumerable.OrderByDescending`.

## Enumerable.OrderByDescending<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> OrderByDescending<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts the elements of a sequence in descending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

Two methods are defined to extend the type `IOrderedEnumerable<T>`, which is the return type of this method. These two methods, namely `ThenBy` and `ThenByDescending`, enable you to specify additional sort criteria to sort a sequence. `ThenBy` and `ThenByDescending` also return an `IOrderedEnumerable<T>`, which means any number of consecutive calls to `ThenBy` or `ThenByDescending` can be made.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` is used to compare keys.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

#### Examples
The following code example demonstrates how to use `OrderByDescending<T1,T2>` to sort the elements of a sequence in descending order by using a transform function and a custom comparer.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.OrderDescending<T>(IEnumerable<T>) method

```csharp
public static System.Linq.IOrderedEnumerable<T> OrderDescending<T> (this System.Collections.Generic.IEnumerable<T> source);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `IEnumerable<T>.GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

This method compares elements by using the default comparer `Comparer<T>.Default`.

## Enumerable.OrderDescending<T>(IEnumerable<T>, IComparer<T>) method

```csharp
public static System.Linq.IOrderedEnumerable<T> OrderDescending<T> (this System.Collections.Generic.IEnumerable<T> source, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `IEnumerable<T>.GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `comparer` is `null`, the default comparer `Comparer<T>.Default` is used to compare elements.
