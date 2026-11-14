---
title: "Enumerable class (part 16 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 16 of 24)

## Enumerable.Prepend<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Prepend<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource element);
```

Adds a value to the beginning of the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values.
- `element`: The value to prepend to `source`.

Returns: A new sequence that begins with `element`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

> **Note:**
>  This method does not modify the elements of the collection. Instead, it creates a copy of the collection with the new element.

#### Examples
The following code example demonstrates how to use `Enumerable.Prepend` to prepend a value to the beginning of the sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Range(Int32, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<int> Range (int start, int count);
```

Generates a sequence of integral numbers within a specified range.

Parameters:

- `start`: The value of the first integer in the sequence.
- `count`: The number of sequential integers to generate.

Returns: An `IEnumerable<Int32>` in C# or `IEnumerable(Of Int32)` in Visual Basic that contains a range of sequential integral numbers.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than 0.

-or-

`start` + `count` -1 is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

#### Examples
The following code example demonstrates how to use `Enumerable.Range` to generate a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Repeat<TResult>(TResult, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Repeat<TResult> (TResult element, int count);
```

Generates a sequence that contains one repeated value.

Parameters:

- `TResult`: The type of the value to be repeated in the result sequence.
- `element`: The value to be repeated.
- `count`: The number of times to repeat the value in the generated sequence.

Returns: An `IEnumerable<T>` that contains a repeated value.

Exceptions:

- `ArgumentOutOfRangeException`: `count` is less than 0.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

#### Examples
The following code example demonstrates how to use `Enumerable.Repeat` to generate a sequence of a repeated value.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Reverse<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Reverse<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Inverts the order of the elements in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to reverse.

Returns: A sequence whose elements correspond to those of the input sequence in reverse order.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

Unlike `Enumerable.OrderBy`, this sorting method does not consider the actual values themselves in determining the order. Rather, it just returns the elements in the reverse order from which they are produced by the underlying source.

#### Examples
The following code example demonstrates how to use `Enumerable.Reverse` to reverse the order of elements in an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Reverse<TSource>(TSource[]) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Reverse<TSource> (this TSource[] source);
```

To be added.

Parameters:

- `TSource`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Enumerable.RightJoin<TOuter,TInner,TKey>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<(TOuter? Outer, TInner Inner)> RightJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

## Enumerable.RightJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> RightJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter?,TInner,TResult> resultSelector);
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

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing a right outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

A join refers to the operation of correlating the elements of two sources of information based on a common key.

`Enumerable.RightJoin<T1,T2,T3,T4>` brings the two information sources and the keys by which they are matched together in one method call.

In relational database terms, the `Enumerable.RightJoin<T1,T2,T3,T4>` method implements an outer right equijoin.

'Outer right' means that elements of the second sequence are returned regardless of whether matching elements are found in the other sequence.

An 'equijoin' is a join in which the keys are compared for equality.

An inner join - where only elements that have a match in the other sequence are included in the results - can be performed using the `Enumerable.Join<T1,T2,T3,T4>` method.

For more information, see Join operations.

## Enumerable.RightJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> RightJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter?,TInner,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
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

Returns: An `IEnumerable<T>` that has elements of type `TResult` that are obtained by performing a right outer join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to hash and compare keys.

A join refers to the operation of correlating the elements of two sources of information based on a common key.

`Enumerable.RightJoin<T1,T2,T3,T4>` brings the two information sources and the keys by which they are matched together in one method call.

In relational database terms, the `Enumerable.RightJoin<T1,T2,T3,T4>` method implements an outer right equijoin.

'Outer right' means that elements of the second sequence are returned regardless of whether matching elements are found in the other sequence.

An 'equijoin' is a join in which the keys are compared for equality.

An inner join - where only elements that have a match in the other sequence are included in the results - can be performed using the `Enumerable.Join<T1,T2,T3,T4>` method.

For more information, see Join operations.

## Enumerable.Select<TSource,TResult>(IEnumerable<TSource>, Int32,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Select<TSource,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int,TResult> selector);
```

Projects each element of a sequence into a new form by incorporating the element's index.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by `selector`.
- `source`: A sequence of values to invoke a transform function on.
- `selector`: A transform function to apply to each source element; the second parameter of the function represents the index of the source element.

Returns: An `IEnumerable<T>` whose elements are the result of invoking the transform function on each element of `source`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The first argument to `selector` represents the element to process. The second argument to `selector` represents the zero-based index of that element in the source sequence. This can be useful if the elements are in a known order and you want to do something with an element at a particular index, for example. It can also be useful if you want to retrieve the index of one or more elements.

This projection method requires the transform function, `selector`, to produce one value for each value in the source sequence, `source`. If `selector` returns a value that is itself a collection, it is up to the consumer to traverse the subsequences manually. In such a situation, it might be better for your query to return a single coalesced sequence of values. To achieve this, use the `Enumerable.SelectMany` method instead of `Enumerable.Select`. Although `SelectMany` works similarly to `Select`, it differs in that the transform function returns a collection that is then expanded by `SelectMany` before it is returned.

#### Examples
The following code example demonstrates how to use `Select<T1,T2>` to project over a sequence of values and use the index of each element.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
