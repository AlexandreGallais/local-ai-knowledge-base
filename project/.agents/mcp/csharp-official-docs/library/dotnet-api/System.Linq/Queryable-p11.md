---
title: "Queryable class (part 11 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 11 of 20)

## Queryable.LastOrDefault<TSource>(IQueryable<TSource>, Boolean>>, TSource) method

```csharp
public static TSource LastOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate, TSource defaultValue);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if the sequence is empty or if no elements pass the test in the predicate function; otherwise, the last element that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

To be added.

## Queryable.LeftJoin<TOuter,TInner,TKey>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<(TOuter Outer, TInner? Inner)> LeftJoin<TOuter,TInner,TKey> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

## Queryable.LeftJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> LeftJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter,TInner?,TResult>> resultSelector);
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

This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types.

For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Queryable.LeftJoin<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `Queryable.LeftJoin<T1,T2,T3,T4>` itself as a constructed generic method.

It then passes the `MethodCallExpression` to the `IQueryProvider.CreateQuery<T>` method of the `IQueryProvider` represented by the `IQueryable.Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Queryable.LeftJoin<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter.

The expected behavior is that of a left outer join.

The `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively.

These keys are compared for equality to match elements from each sequence.

A pair of elements is stored for each element in `inner` that matches an element in `outer`, plus a pair for each element in `outer` that has no matches in `inner`.

Then the `resultSelector` function is invoked to project a result object from each pair of elements.

## Queryable.LeftJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> LeftJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter,TInner?,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
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

This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types.

For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Queryable.LeftJoin<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `Queryable.LeftJoin<T1,T2,T3,T4>` itself as a constructed generic method.

It then passes the `MethodCallExpression` to the `IQueryProvider.CreateQuery<T>` method of the `IQueryProvider` represented by the `IQueryable.Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Queryable.LeftJoin<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter.

The expected behavior is that of a left outer join.

The `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively.

These keys are compared for equality to match elements from each sequence.

A pair of elements is stored for each element in `inner` that matches an element in `outer`, plus a pair for each element in `outer` that has no matches in `inner`.

Then the `resultSelector` function is invoked to project a result object from each pair of elements.

## Queryable.LongCount<TSource>(IQueryable<TSource>) method

```csharp
public static long LongCount<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns an `Int64` that represents the total number of elements in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` that contains the elements to be counted.

Returns: The number of elements in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The number of elements exceeds <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The `LongCount<T>` method generates a `MethodCallExpression` that represents calling `LongCount<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `LongCount<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it counts the number of items in `source` and returns an `Int64`.

#### Examples
The following code example demonstrates how to use `LongCount<T>` to count the elements in an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.LongCount<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static long LongCount<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns an `Int64` that represents the number of elements in a sequence that satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` that contains the elements to be counted.
- `predicate`: A function to test each element for a condition.

Returns: The number of elements in `source` that satisfy the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `OverflowException`: The number of matching elements exceeds <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `LongCount<T>` method generates a `MethodCallExpression` that represents calling `LongCount<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `LongCount<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it counts the number of items in `source` that satisfy the condition specified by `predicate` and returns an `Int64`.

#### Examples
The following code example demonstrates how to use `LongCount<T>` to count the elements in an array that satisfy a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Max<TSource>(IQueryable<TSource>) method

```csharp
public static TSource? Max<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the maximum value in a generic `IQueryable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max<T>` method generates a `MethodCallExpression` that represents calling `Max<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Max<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the maximum value in `source`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Max<TSource>(IQueryable<TSource>, IComparer<TSource>) method

```csharp
public static TSource? Max<TSource> (this System.Linq.IQueryable<TSource> source, System.Collections.Generic.IComparer<TSource>? comparer);
```

Returns the maximum value in a generic `IQueryable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `comparer`: The `IComparer<T>` to compare values.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.Max<TSource,TResult>(IQueryable<TSource>, Func<TSource,TResult>>) method

```csharp
public static TResult? Max<TSource,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TResult>> selector);
```

Invokes a projection function on each element of a generic `IQueryable<T>` and returns the maximum resulting value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by the function represented by `selector`.
- `source`: A sequence of values to determine the maximum of.
- `selector`: A projection function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Max<T1,T2>` method generates a `MethodCallExpression` that represents calling `Max<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Max<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element in `source` and returns the maximum value.

#### Examples
The following code example demonstrates how to use `Max<T1,T2>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
