---
title: "Enumerable class (part 21 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 21 of 24)

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Single>) method

```csharp
public static float Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float> selector);
```

Computes the sum of the sequence of `Single` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Sum<T>` method returns zero if `source` contains no elements.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Single`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Take<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Take<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int count);
```

Returns a specified number of contiguous elements from the start of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `count`: The number of elements to return.

Returns: An `IEnumerable<T>` that contains the specified number of elements from the start of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

`Enumerable.Take` enumerates `source` and yields elements until `count` elements have been yielded or `source` contains no more elements. If `count` exceeds the number of elements in `source`, all elements of `source` are returned.

If `count` is less than or equal to zero, `source` is not enumerated and an empty `IEnumerable<T>` is returned.

The `Enumerable.Take` and `Enumerable.Skip` methods are functional complements. Given a collection sequence `coll` and an integer `n`, concatenating the results of `coll.Take(n)` and `coll.Skip(n)` yields the same sequence as `coll`.

In Visual Basic query expression syntax, a `Take` clause translates to an invocation of `Enumerable.Take`.

#### Examples
The following code example demonstrates how to use `Enumerable.Take` to return elements from the start of a sequence (after it's sorted).

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Take<TSource>(IEnumerable<TSource>, Range) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Take<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Range range);
```

Returns a specified range of contiguous elements from a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `range`: The range of elements to return, which has start and end indexes either from the beginning or the end of the sequence.

Returns: An `IEnumerable<T>` that contains the specified range of elements from the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

`Enumerable.Take` enumerates `source` and yields elements whose indices belong to the specified `range`.

## Enumerable.TakeLast<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> TakeLast<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int count);
```

Returns a new enumerable collection that contains the last `count` elements from `source`.

Parameters:

- `TSource`: The type of the elements in the enumerable collection.
- `source`: An enumerable collection instance.
- `count`: The number of elements to take from the end of the collection.

Returns: A new enumerable collection that contains the last `count` elements from `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

If `count` is not a positive number, this method returns an empty enumerable collection.

## Enumerable.TakeWhile<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> TakeWhile<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns elements from a sequence as long as a specified condition is true.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IEnumerable<T>` that contains the elements from the input sequence that occur before the element at which the test no longer passes.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `TakeWhile<T>` method tests each element of `source` by using `predicate` and yields the element if the result is `true`. Enumeration stops when the predicate function returns `false` for an element or when `source` contains no more elements.

The `Enumerable.TakeWhile` and `Enumerable.SkipWhile` methods are functional complements. Given a collection sequence `coll` and a pure function `p`, concatenating the results of `coll.TakeWhile(p)` and `coll.SkipWhile(p)` yields the same sequence as `coll`.

In Visual Basic query expression syntax, a `Take While` clause translates to an invocation of `Enumerable.TakeWhile`.

#### Examples
The following code example demonstrates how to use `TakeWhile<T>` to return elements from the start of a sequence as long as a condition is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.TakeWhile<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> TakeWhile<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int,bool> predicate);
```

Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.

Returns: An `IEnumerable<T>` that contains elements from the input sequence that occur before the element at which the test no longer passes.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `TakeWhile<T>` method tests each element of `source` by using `predicate` and yields the element if the result is `true`. Enumeration stops when the predicate function returns `false` for an element or when `source` contains no more elements.

The first argument of `predicate` represents the element to test. The second argument represents the zero-based index of the element within `source`.

The `Enumerable.TakeWhile` and `Enumerable.SkipWhile` methods are functional complements. Given a collection sequence `coll` and a pure function `p`, concatenating the results of `coll.TakeWhile(p)` and `coll.SkipWhile(p)` yields the same sequence as `coll`.

In Visual Basic query expression syntax, a `Take While` clause translates to an invocation of `Enumerable.TakeWhile`.

#### Examples
The following code example demonstrates how to use `TakeWhile<T>` to return elements from the start of a sequence as long as a condition that uses the element's index is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ThenBy<TSource,TKey>(IOrderedEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> ThenBy<TSource,TKey> (this System.Linq.IOrderedEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IOrderedEnumerable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

To order a sequence by the values of the elements themselves, specify the identity function (`x => x` in C# or `Function(x) x` in Visual Basic) for `keySelector`.

`Enumerable.ThenBy` and `Enumerable.ThenByDescending` are defined to extend the type `IOrderedEnumerable<T>`, which is also the return type of these methods. This design enables you to specify multiple sort criteria by applying any number of `Enumerable.ThenBy` or `Enumerable.ThenByDescending` methods.

> **Note:**
>  Because `IOrderedEnumerable<T>` inherits from `IEnumerable<T>`, you can call `Enumerable.OrderBy` or `Enumerable.OrderByDescending` on the results of a call to `Enumerable.OrderBy`, `Enumerable.OrderByDescending`, `Enumerable.ThenBy` or `Enumerable.ThenByDescending`. Doing this introduces a new primary ordering that ignores the previously established ordering.

This method compares keys by using the default comparer `Comparer<T>.Default`.

This method performs a stable sort; that is, if the keys of two elements are equal, the order of the elements is preserved. In contrast, an unstable sort does not preserve the order of elements that have the same key.

In query expression syntax, an `orderby [first criterion], [second criterion]` (C#) or `Order By [first criterion], [second criterion]` (Visual Basic) clause translates to an invocation of `Enumerable.ThenBy`.

#### Examples
The following code example demonstrates how to use `ThenBy<T1,T2>` to perform a secondary ordering of the elements in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ThenBy<TSource,TKey>(IOrderedEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedEnumerable<TSource> ThenBy<TSource,TKey> (this System.Linq.IOrderedEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IOrderedEnumerable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted according to a key.

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
