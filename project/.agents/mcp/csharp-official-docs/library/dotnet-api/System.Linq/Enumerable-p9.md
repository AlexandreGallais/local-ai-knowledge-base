---
title: "Enumerable class (part 9 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 9 of 24)

## Enumerable.IntersectBy<TSource,TKey>(IEnumerable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> IntersectBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TKey> second, Func<TSource,TKey> keySelector);
```

Produces the set intersection of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IEnumerable<T>` whose distinct elements that also appear in `second` will be returned.
- `second`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `keySelector`: A function to extract the key for each element.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, `Intersect` yields distinct elements occurring in both sequences in the order in which they appear in `first`.

The default equality comparer, `Default`, is used to compare values.

## Enumerable.IntersectBy<TSource,TKey>(IEnumerable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> IntersectBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TKey> second, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Produces the set intersection of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IEnumerable<T>` whose distinct elements that also appear in `second` will be returned.
- `second`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The intersection of two sets A and B is defined as the set that contains all the elements of A that also appear in B, but no other elements.

When the object returned by this method is enumerated, `Intersect` yields distinct elements occurring in both sequences in the order in which they appear in `first`.

If `comparer` is `null`, the default equality comparer, `Default`, is used to compare values.

## Enumerable.Join<TOuter,TInner,TKey>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<(TOuter Outer, TInner Inner)> Join<TOuter,TInner,TKey> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

To be added.

Parameters:

- `TOuter`: To be added.
- `TInner`: To be added.
- `TKey`: To be added.
- `outer`: To be added.
- `inner`: To be added.
- `outerKeySelector`: To be added.
- `innerKeySelector`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## Enumerable.Join<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector);
```

Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

A join refers to the operation of correlating the elements of two sources of information based on a common key. `Enumerable.Join` brings the two information sources and the keys by which they are matched together in one method call. This differs from the use of `SelectMany`, which requires more than one method call to perform the same operation.

`Enumerable.Join` preserves the order of the elements of `outer`, and for each of these elements, the order of the matching elements of `inner`.

In query expression syntax, a `join` (C#) or `Join` (Visual Basic) clause translates to an invocation of `Enumerable.Join`.

In relational database terms, the `Enumerable.Join` method implements an inner equijoin. 'Inner' means that only elements that have a match in the other sequence are included in the results. An 'equijoin' is a join in which the keys are compared for equality. A left outer join operation has no dedicated standard query operator, but can be performed by using the `Enumerable.GroupJoin` method. For more information, see Join operations.

#### Examples
The following code example demonstrates how to use `Join<T1,T2,T3,T4>` to perform an inner join of two sequences based on a common key.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Join<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Correlates the elements of two sequences based on matching keys. A specified `IEqualityComparer<T>` is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys.

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

A join refers to the operation of correlating the elements of two sources of information based on a common key. `Enumerable.Join` brings the two information sources and the keys by which they are matched together in one method call. This differs from the use of `SelectMany`, which requires more than one method call to perform the same operation.

`Enumerable.Join` preserves the order of the elements of `outer`, and for each of these elements, the order of the matching elements of `inner`.

In relational database terms, the `Enumerable.Join` method implements an inner equijoin. 'Inner' means that only elements that have a match in the other sequence are included in the results. An 'equijoin' is a join in which the keys are compared for equality. A left outer join operation has no dedicated standard query operator, but can be performed by using the `Enumerable.GroupJoin` method. For more information, see Join operations.

## Enumerable.Last<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource Last<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the last element of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the last element of.

Returns: The value at the last position in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The source sequence is empty.

#### Remarks
The `Last<T>` method throws an exception if `source` contains no elements. To instead return a default value when the source sequence is empty, use the `Enumerable.LastOrDefault` method.

#### Examples
The following code example demonstrates how to use `Last<T>` to return the last element of an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Last<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static TSource Last<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns the last element of a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: The last element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: No element satisfies the condition in `predicate`.

-or-

The source sequence is empty.

#### Remarks
The `Last<T>` method throws an exception if no matching element is found in `source`. To instead return a default value when no matching element is found, use the `Enumerable.LastOrDefault` method.

#### Examples
The following code example demonstrates how to use `Last<T>` to return the last element of an array that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
