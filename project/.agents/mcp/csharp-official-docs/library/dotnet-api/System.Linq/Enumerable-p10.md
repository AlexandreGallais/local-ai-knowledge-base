---
title: "Enumerable class (part 10 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 10 of 24)

## Enumerable.LastOrDefault<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource? LastOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the last element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the last element of.

Returns: `default`(`TSource`) if the source sequence is empty; otherwise, the last element in the `IEnumerable<T>`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The default value for reference and nullable types is `null`.

The `Enumerable.LastOrDefault` method does not provide a way to specify a default value. If you want to specify a default value other than `default(TSource)`, use the `DefaultIfEmpty<T>` method as described in the Example section.

#### Examples
The following code example demonstrates how to use `LastOrDefault<T>` on an empty array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

Sometimes the value of `default(TSource)` is not the default value that you want to use if the collection contains no elements. Instead of checking the result for the unwanted default value and then changing it if necessary, you can use the `DefaultIfEmpty<T>` method to specify the default value that you want to use if the collection is empty. Then, call `Last<T>` to obtain the last element. The following code example uses both techniques to obtain a default value of 1 if a collection of numeric days of the month is empty. Because the default value for an integer is 0, which does not correspond to any day of the month, the default value must be specified as 1 instead. The first result variable is checked for the unwanted default value after the query has finished executing. The second result variable is obtained by using `DefaultIfEmpty<T>` to specify a default value of 1.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.LastOrDefault<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static TSource? LastOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: `default`(`TSource`) if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
The default value for reference and nullable types is `null`.

#### Examples
The following code example demonstrates how to use `LastOrDefault<T>` by passing in a predicate. In the second call to the method, there is no element in the sequence that satisfies the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.LastOrDefault<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static TSource LastOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource defaultValue);
```

Returns the last element of a sequence, or a specified default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the last element of.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if the source sequence is empty; otherwise, the last element in the `IEnumerable<T>`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Enumerable.LastOrDefault<TSource>(IEnumerable<TSource>, Boolean>, TSource) method

```csharp
public static TSource LastOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate, TSource defaultValue);
```

Returns the last element of a sequence that satisfies a condition, or a specified default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

To be added.

## Enumerable.LeftJoin<TOuter,TInner,TKey>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<(TOuter Outer, TInner? Inner)> LeftJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

## Enumerable.LeftJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> LeftJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner?,TResult> resultSelector);
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

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing a left outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

A join refers to the operation of correlating the elements of two sources of information based on a common key.

`Enumerable.LeftJoin<T1,T2,T3,T4>` brings the two information sources and the keys by which they are matched together in one method call.

In relational database terms, the `Enumerable.LeftJoin<T1,T2,T3,T4>` method implements an outer left equijoin.

'Outer left' means that elements of the first sequence are returned regardless of whether matching elements are found in the other sequence.

An 'equijoin' is a join in which the keys are compared for equality.

An inner join - where only elements that have a match in the other sequence are included in the results - can be performed using the `Enumerable.Join<T1,T2,T3,T4>` method.

For more information, see Join operations.

## Enumerable.LeftJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> LeftJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter,TInner?,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
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

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing a left outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

A join refers to the operation of correlating the elements of two sources of information based on a common key.

`Enumerable.LeftJoin<T1,T2,T3,T4>` brings the two information sources and the keys by which they are matched together in one method call.

In relational database terms, the `Enumerable.LeftJoin<T1,T2,T3,T4>` method implements an outer left equijoin.

'Outer left' means that elements of the first sequence are returned regardless of whether matching elements are found in the other sequence.

An 'equijoin' is a join in which the keys are compared for equality.

An inner join - where only elements that have a match in the other sequence are included in the results - can be performed using the `Enumerable.Join<T1,T2,T3,T4>` method.

For more information, see Join operations.

## Enumerable.LongCount<TSource>(IEnumerable<TSource>) method

```csharp
public static long LongCount<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns an `Int64` that represents the total number of elements in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` that contains the elements to be counted.

Returns: The number of elements in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The number of elements exceeds <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
Use this method rather than `Enumerable.Count` when you expect the result to be greater than `MaxValue`.

In Visual Basic query expression syntax, an `Aggregate Into LongCount()` clause translates to an invocation of `Enumerable.LongCount`.

#### Examples
The following code example demonstrates how to use `LongCount<T>` to count the elements in an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.LongCount<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static long LongCount<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns an `Int64` that represents how many elements in a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` that contains the elements to be counted.
- `predicate`: A function to test each element for a condition.

Returns: A number that represents how many elements in the sequence satisfy the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `OverflowException`: The number of matching elements exceeds <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
Use this method rather than `Enumerable.Count` when you expect the result to be greater than `MaxValue`.

In Visual Basic query expression syntax, an `Aggregate Into LongCount()` clause translates to an invocation of `Enumerable.LongCount`.

#### Examples
The following code example demonstrates how to use `LongCount<T>` to count the elements in an array that satisfy a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max(Decimal>) method

```csharp
public static decimal Max (this System.Collections.Generic.IEnumerable<decimal> source);
```

Returns the maximum value in a sequence of `Decimal` values.

Parameters:

- `source`: A sequence of `Decimal` values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max` method uses the `Decimal` implementation of `IComparable<T>` to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.
