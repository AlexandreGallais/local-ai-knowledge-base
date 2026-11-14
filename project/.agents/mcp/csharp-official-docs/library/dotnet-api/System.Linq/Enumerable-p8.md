---
title: "Enumerable class (part 8 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 8 of 24)

## Enumerable.GroupJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector);
```

Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.

Returns: An `IEnumerable<T>` that contains elements of type `TResult` that are obtained by performing a grouped join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

`Enumerable.GroupJoin` produces hierarchical results, which means that elements from `outer` are paired with collections of matching elements from `inner`. `GroupJoin` enables you to base your results on a whole set of matches for each element of `outer`.

> **Note:**
>  If there are no correlated elements in `inner` for a given element of `outer`, the sequence of matches for that element will be empty but will still appear in the results.

The `resultSelector` function is called only one time for each `outer` element together with a collection of all the `inner` elements that match the `outer` element. This differs from the `Enumerable.Join` method, in which the result selector function is invoked on pairs that contain one element from `outer` and one element from `inner`.

`GroupJoin` preserves the order of the elements of `outer`, and for each element of `outer`, the order of the matching elements from `inner`.

`Enumerable.GroupJoin` has no direct equivalent in traditional relational database terms. However, this method does implement a superset of inner joins and left outer joins. Both of these operations can be written in terms of a grouped join. For more information, see Join operations.

In query expression syntax, a `join ... into` (C#) or `Group Join` (Visual Basic) clause translates to an invocation of `Enumerable.GroupJoin`.

#### Examples
The following code example demonstrates how to use `GroupJoin<T1,T2,T3,T4>` to perform a grouped join on two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.GroupJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEnumerable<TInner>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Correlates the elements of two sequences based on key <example-value> and groups the results. A specified `IEqualityComparer<T>` is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys.

Returns: An `IEnumerable<T>` that contains elements of type `TResult` that are obtained by performing a grouped join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

`Enumerable.GroupJoin` produces hierarchical results, which means that elements from `outer` are paired with collections of matching elements from `inner`. `GroupJoin` enables you to base your results on a whole set of matches for each element of `outer`.

> **Note:**
>  If there are no correlated elements in `inner` for a given element of `outer`, the sequence of matches for that element will be empty but will still appear in the results.

The `resultSelector` function is called only one time for each `outer` element together with a collection of all the `inner` elements that match the `outer` element. This differs from the `Enumerable.Join` method in which the result selector function is invoked on pairs that contain one element from `outer` and one element from `inner`.

`GroupJoin` preserves the order of the elements of `outer`, and for each element of `outer`, the order of the matching elements from `inner`.

`Enumerable.GroupJoin` has no direct equivalent in traditional relational database terms. However, this method does implement a superset of inner joins and left outer joins. Both of these operations can be written in terms of a grouped join. For more information, see Join operations.

## Enumerable.Index<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<(int Index, TSource Item)> Index<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns an enumerable that incorporates the element's index into a tuple.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The source enumerable providing the elements.

Returns: An enumerable that incorporates each element index into a tuple.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Enumerable.InfiniteSequence<T>(T, T) method

```csharp
public static System.Collections.Generic.IEnumerable<T> InfiniteSequence<T> (T start, T step) where T : System.Numerics.IAdditionOperators<T,T,T>;
```

Generates an infinite sequence that begins with `start` and yields additional values each incremented by `step`.

Parameters:

- `T`: The type of the value to be yielded in the result sequence.
- `start`: The starting value.
- `step`: The amount by which the next yielded value should be incremented from the previous yielded value.

Returns: An `IEnumerable<T>` that contains the sequence.

To be added.

## Enumerable.Intersect<TSource>(IEnumerable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Intersect<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

Produces the set intersection of two sequences by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` whose distinct elements that also appear in `second` will be returned.
- `second`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, `Intersect` yields distinct elements occurring in both sequences in the order in which they appear in `first`.

The default equality comparer, `EqualityComparer<T>.Default`, is used to compare values of the types.
To compare a custom data type, you need to override the `Object.Equals` and the `Object.GetHashCode` methods, and optionally implement the `IEquatable<T>` generic interface in the custom type. For more information, see the `Default` property.

#### Examples
The following code example demonstrates how to use `Intersect<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` to return the elements that appear in each of two sequences of integers.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

If you want to compare sequences of objects of some custom data type, you have to implement the `IEquatable<T>` generic interface in a helper class. The following code example shows how to implement this interface in a custom data type and override `Object.GetHashCode` and `Object.Equals` methods.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

After you implement this interface, you can use sequences of `ProductA` objects in the `Intersect` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

## Enumerable.Intersect<TSource>(IEnumerable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Intersect<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set intersection of two sequences by using the specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` whose distinct elements that also appear in `second` will be returned.
- `second`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, `Intersect` yields distinct elements occurring in both sequences in the order in which they appear in `first`.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

#### Examples
The following example shows how to implement an equality comparer that can be used in the `Intersect` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

After you implement this comparer, you can use sequences of `Product` objects in the `Intersect` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._
