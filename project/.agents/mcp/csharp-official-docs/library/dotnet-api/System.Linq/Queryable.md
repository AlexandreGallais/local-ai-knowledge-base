---
title: "Queryable class (part 1 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class

Namespace: `System.Linq`

```csharp
public static class Queryable
```

Provides a set of `static` (`Shared` in Visual Basic) methods for querying data structures that implement `IQueryable<T>`.

#### Remarks
The set of methods declared in the `Queryable` class provides an implementation of the standard query operators for querying data sources that implement `IQueryable<T>`. The standard query operators are general purpose methods that follow the LINQ pattern and enable you to express traversal, filter, and projection operations over data in any .NET-based programming language.

The majority of the methods in this class are defined as extension methods that extend the `IQueryable<T>` type. This means they can be called like an instance method on any object that implements `IQueryable<T>`. These methods that extend `IQueryable<T>` do not perform any querying directly. Instead, their functionality is to build an `Expression` object, which is an expression tree that represents the cumulative query. The methods then pass the new expression tree to either the `Execute<T>` method or the `CreateQuery<T>` method of the input `IQueryable<T>`. The method that is called depends on whether the `Queryable` method returns a singleton value, in which case `Execute<T>` is called, or has enumerable results, in which case `CreateQuery<T>` is called.

The actual query execution on the target data is performed by a class that implements `IQueryable<T>`. The expectation of any `IQueryable<T>` implementation is that the result of executing an expression tree that was constructed by a `Queryable` standard query operator method is equivalent to the result of calling the corresponding method in the `Enumerable` class, if the data source were an `IEnumerable<T>`.

In addition to the standard query operator methods that operate on `IQueryable<T>` objects, this class also contains a method, `Queryable.AsQueryable`, which types `IEnumerable` objects as `IQueryable` objects.

## Queryable.Aggregate<TSource>(IQueryable<TSource>, Func<TSource,TSource,TSource>>) method

```csharp
public static TSource Aggregate<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TSource,TSource>> func);
```

Applies an accumulator function over a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to aggregate over.
- `func`: An accumulator function to apply to each element.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `source` or `func` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Aggregate<T>` method generates a `MethodCallExpression` that represents calling `Aggregate<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Aggregate<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that the specified function, `func`, is applied to each value in the source sequence and the accumulated value is returned. The first value in `source` is used as the seed value for the accumulated value, which corresponds to the first parameter in `func`.

To simplify common aggregation operations, the set of standard query operators also includes two counting methods, `Queryable.Count` and `Queryable.LongCount`, and four numeric aggregation methods, namely `Queryable.Max`, `Queryable.Min`, `Queryable.Sum`, and `Queryable.Average`.

#### Examples
The following code example demonstrates how to use `Aggregate<T>` to build a sentence from an array of strings.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Aggregate<TSource,TAccumulate>(IQueryable<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>>) method

```csharp
public static TAccumulate Aggregate<TSource,TAccumulate> (this System.Linq.IQueryable<TSource> source, TAccumulate seed, System.Linq.Expressions.Expression<Func<TAccumulate,TSource,TAccumulate>> func);
```

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `source`: A sequence to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to invoke on each element.

Returns: The final accumulator value.

Exceptions:

- `ArgumentNullException`: `source` or `func` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Aggregate<T1,T2>` method generates a `MethodCallExpression` that represents calling `Aggregate<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Aggregate<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that the specified function, `func`, is applied to each value in the source sequence and the accumulated value is returned. The `seed` parameter is used as the seed value for the accumulated value, which corresponds to the first parameter in `func`.

To simplify common aggregation operations, the set of standard query operators also includes two counting methods, `Queryable.Count` and `Queryable.LongCount`, and four numeric aggregation methods, namely `Queryable.Max`, `Queryable.Min`, `Queryable.Sum`, and `Queryable.Average`.

#### Examples
The following code example demonstrates how to use `Aggregate<T1,T2>` to apply an accumulator function when a seed value is provided to the function.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Aggregate<TSource,TAccumulate,TResult>(IQueryable<TSource>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>>, Func<TAccumulate,TResult>>) method

```csharp
public static TResult Aggregate<TSource,TAccumulate,TResult> (this System.Linq.IQueryable<TSource> source, TAccumulate seed, System.Linq.Expressions.Expression<Func<TAccumulate,TSource,TAccumulate>> func, System.Linq.Expressions.Expression<Func<TAccumulate,TResult>> selector);
```

Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TAccumulate`: The type of the accumulator value.
- `TResult`: The type of the resulting value.
- `source`: A sequence to aggregate over.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to invoke on each element.
- `selector`: A function to transform the final accumulator value into the result value.

Returns: The transformed final accumulator value.

Exceptions:

- `ArgumentNullException`: `source` or `func` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Aggregate<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `Aggregate<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Aggregate<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that the specified function, `func`, is applied to each value in the source sequence and the accumulated value is returned. The `seed` parameter is used as the seed value for the accumulated value, which corresponds to the first parameter in `func`. The final accumulated value is passed to `selector` to obtain the result value.

To simplify common aggregation operations, the set of standard query operators also includes two counting methods, `Queryable.Count` and `Queryable.LongCount`, and four numeric aggregation methods, namely `Queryable.Max`, `Queryable.Min`, `Queryable.Sum`, and `Queryable.Average`.

#### Examples
The following code example demonstrates how to use `Aggregate<T1,T2,T3>` to apply an accumulator function and a result selector.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.AggregateBy<TSource,TKey,TAccumulate>(IQueryable<TSource>, Func<TSource,TKey>>, Func<TKey,TAccumulate>>, Func<TAccumulate,TSource,TAccumulate>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TKey,TAccumulate>> seedSelector, System.Linq.Expressions.Expression<Func<TAccumulate,TSource,TAccumulate>> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IQueryable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seedSelector`: A factory for the initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

This method is comparable to the `Queryable.GroupBy<T1,T2>` methods where each grouping is being aggregated into a single value as opposed to allocating a collection for each group.

## Queryable.AggregateBy<TSource,TKey,TAccumulate>(IQueryable<TSource>, Func<TSource,TKey>>, TAccumulate, Func<TAccumulate,TSource,TAccumulate>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<System.Collections.Generic.KeyValuePair<TKey,TAccumulate>> AggregateBy<TSource,TKey,TAccumulate> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, TAccumulate seed, System.Linq.Expressions.Expression<Func<TAccumulate,TSource,TAccumulate>> func, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Applies an accumulator function over a sequence, grouping results by key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TAccumulate`: The type of the accumulator value.
- `source`: An `IQueryable<T>` to aggregate over.
- `keySelector`: A function to extract the key for each element.
- `seed`: The initial accumulator value.
- `func`: An accumulator function to be invoked on each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the aggregates corresponding to each key <example-value> from `source`.

This method is comparable to the `Queryable.GroupBy<T1,T2>` methods where each grouping is being aggregated into a single value as opposed to allocating a collection for each group.

## Queryable.All<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static bool All<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Determines whether all the elements of a sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence whose elements to test for a condition.
- `predicate`: A function to test each element for a condition.

Returns: `true` if every element of the source sequence passes the test in the specified predicate, or if the sequence is empty; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `All<T>` method generates a `MethodCallExpression` that represents calling `All<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `All<T>` depends on the implementation of the `source` parameter's type. The expected behavior is that it determines if all the elements in `source` satisfy the condition in `predicate`.

#### Examples
The following code example demonstrates how to use `All<T>` to determine whether all the elements in a sequence satisfy a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

The Boolean value that the `All<T>` method returns is typically used in the predicate of a `where` clause (`Where` clause in Visual Basic) or a direct call to the `Queryable.Where` method. The following example demonstrates this use of the `All` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
