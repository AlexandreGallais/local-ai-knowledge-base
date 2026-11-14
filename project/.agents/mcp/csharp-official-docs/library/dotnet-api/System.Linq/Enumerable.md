---
title: "Enumerable class (part 1 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class

Namespace: `System.Linq`

```csharp
public static class Enumerable
```

Provides a set of `static` (`Shared` in Visual Basic) methods for querying objects that implement `IEnumerable<T>`.

#### Remarks
The methods in this class provide an implementation of the standard query operators for querying data sources that implement `IEnumerable<T>`. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in any .NET-based programming language.

The majority of the methods in this class are defined as extension methods that extend `IEnumerable<T>`. This means they can be called like an instance method on any object that implements `IEnumerable<T>`.

Methods that are used in a query that returns a sequence of values do not consume the target data until the query object is enumerated. This is known as deferred execution. Methods that are used in a query that returns a singleton value execute and consume the target data immediately.

## Enumerable.Aggregate<TSource>(IEnumerable<TSource>, Func<TSource,TSource,TSource>) method

```csharp
public static TSource Aggregate<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TSource,TSource> func);
```

Applies an accumulator function over a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to aggregate over.
- `func`: An accumulator function to be invoked on each element.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `source` or `func` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Aggregate<T>` method makes it simple to perform a calculation over a sequence of values. This method works by calling `func` one time for each element in `source` except the first one. Each time `func` is called, `Aggregate<T>` passes both the element from the sequence and an aggregated value (as the first argument to `func`). The first element of `source` is used as the initial aggregate value. The result of `func` replaces the previous aggregated value. `Aggregate<T>` returns the final result of `func`.

This overload of the `Enumerable.Aggregate` method isn't suitable for all cases because it uses the first element of `source` as the initial aggregate value. You should choose another overload if the return value should include only the elements of `source` that meet a certain condition. For example, this overload isn't reliable if you want to calculate the sum of the even numbers in `source`. The result will be incorrect if the first element is odd instead of even.

To simplify common aggregation operations, the standard query operators also include a general purpose count method, `Enumerable.Count`, and four numeric aggregation methods, namely `Enumerable.Min`, `Enumerable.Max`, `Enumerable.Sum`, and `Enumerable.Average`.

#### Examples
The following code example demonstrates how to reverse the order of words in a string by using `Enumerable.Aggregate`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Aggregate<TSource,TAccumulate>(IEnumerable<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>) method

```csharp
public static TAccumulate Aggregate<TSource,TAccumulate> (this System.Collections.Generic.IEnumerable<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func);
```

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IEnumerable<T>` to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `source` or `func` is `null`.

#### Remarks
The `Aggregate<T1,T2>` method makes it simple to perform a calculation over a sequence of values. This method works by calling `func` one time for each element in `source`. Each time `func` is called, `Aggregate<T1,T2>` passes both the element from the sequence and an aggregated value (as the first argument to `func`). The value of the `seed` parameter is used as the initial aggregate value. The result of `func` replaces the previous aggregated value. `Aggregate<T1,T2>` returns the final result of `func`.

To simplify common aggregation operations, the standard query operators also include a general purpose count method, `Enumerable.Count`, and four numeric aggregation methods, namely `Enumerable.Min`, `Enumerable.Max`, `Enumerable.Sum`, and `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Enumerable.Aggregate` to apply an accumulator function and use a seed value.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Aggregate<TSource,TAccumulate,TResult>(IEnumerable<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, Func<TAccumulate,TResult>) method

```csharp
public static TResult Aggregate<TSource,TAccumulate,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func, Func<TAccumulate,TResult> resultSelector);
```

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: An `IEnumerable<T>` to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `resultSelector`: A function to transform the final accumulator value into the result value.

Returns: The transformed final accumulator value.

Exceptions:

- `ArgumentNullException`: `source` or `func` or `resultSelector` is `null`.

#### Remarks
The `Aggregate<T1,T2,T3>` method makes it simple to perform a calculation over a sequence of values. This method works by calling `func` one time for each element in `source`. Each time `func` is called, `Aggregate<T1,T2,T3>` passes both the element from the sequence and an aggregated value (as the first argument to `func`). The value of the `seed` parameter is used as the initial aggregate value. The result of `func` replaces the previous aggregated value. The final result of `func` is passed to `resultSelector` to obtain the final result of `Aggregate<T1,T2,T3>`.

To simplify common aggregation operations, the standard query operators also include a general purpose count method, `Enumerable.Count`, and four numeric aggregation methods, namely `Enumerable.Min`, `Enumerable.Max`, `Enumerable.Sum`, and `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Enumerable.Aggregate` to apply an accumulator function and a result selector.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.AggregateBy<TSource,TKey,TAccumulate>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TKey,TAccumulate>, Func<TAccumulate,TSource,TAccumulate>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,TAccumulate> seedSelector, Func<TAccumulate,TSource,TAccumulate> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IEnumerable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seedSelector`: A factory for the initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

#### Remarks

This method is comparable to the `GroupBy<T1,T2>` methods where each grouping is aggregated into a single value as opposed to allocating a collection for each group.

#### Examples

The following example demonstrates how to use `AggregateBy` with a seed selector to compute multiple values per key.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateBy/enumerable.cs._
## Enumerable.AggregateBy<TSource,TKey,TAccumulate>(IEnumerable<TSource>, Func<TSource,TKey>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, TAccumulate seed, Func<TAccumulate,TSource,TAccumulate> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IEnumerable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

#### Remarks

This method is comparable to the `GroupBy<T1,T2>` methods where each grouping is being aggregated into a single value as opposed to allocating a collection for each group.

#### Examples

The following example demonstrates how to use `AggregateBy` with a constant seed value to compute totals per key.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateBy/enumerable.cs._
## Enumerable.All<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static bool All<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Determines whether all elements of a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` that contains the elements to apply the predicate to.
- `predicate`: A function to test each element for a condition.

Returns: `true` if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks

> **Note:**
>  This method does not return all the elements of a collection. Instead, it determines whether all the elements of a collection satisfy a condition.

The enumeration of `source` is stopped as soon as the result can be determined.

In Visual Basic query expression syntax, an `Aggregate Into All()` clause translates to an invocation of `Enumerable.All`.

#### Examples
The following code example demonstrates how to use `Enumerable.All` to determine whether all the elements in a sequence satisfy a condition. Variable `allStartWithB` is true if all the pet names start with "B" or if the `pets` array is empty.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The Boolean value that the `Enumerable.All` method returns is typically used in the predicate of a `where` clause (`Where` clause in Visual Basic) or a direct call to the `Enumerable.Where` method. The following example demonstrates this use of the `All` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Any<TSource>(IEnumerable<TSource>) method

```csharp
public static bool Any<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Determines whether a sequence contains any elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IEnumerable<T>` to check for emptiness.

Returns: `true` if the source sequence contains any elements; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

> **Note:**
>  This method does not return any one element of a collection. Instead, it determines whether the collection contains any elements.

The enumeration of `source` is stopped as soon as the result can be determined.

In Visual Basic query expression syntax, an `Aggregate Into Any()` clause translates to an invocation of `Enumerable.Any`.

#### Examples
The following code example demonstrates how to use `Enumerable.Any` to determine whether a sequence contains any elements.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The Boolean value that the `Any<T>` method returns is typically used in the predicate of a `where` clause (`Where` clause in Visual Basic) or a direct call to the `Where<T>` method. The following example demonstrates this use of the `Any` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
