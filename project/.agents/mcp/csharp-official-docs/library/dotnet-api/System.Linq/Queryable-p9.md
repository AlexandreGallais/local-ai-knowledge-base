---
title: "Queryable class (part 9 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 9 of 20)

## Queryable.GroupJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEnumerable<TInner>,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult>> resultSelector);
```

Correlates the elements of two sequences based on key <example-value> and groups the results. The default equality comparer is used to compare keys.

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

Returns: An `IQueryable<T>` that contains elements of type `TResult` obtained by performing a grouped join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupJoin<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `GroupJoin<T1,T2,T3,T4>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupJoin<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter. The expected behavior is that the `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively. These keys are compared for equality to match each element in `outer` with zero or more elements from `inner`. Then the `resultSelector` function is invoked to project a result object from each group of correlated elements.

#### Examples
The following code example demonstrates how to use `GroupJoin<T1,T2,T3,T4>` to perform a grouped join on two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.GroupJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEnumerable<TInner>,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> GroupJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter,System.Collections.Generic.IEnumerable<TInner>,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
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
- `comparer`: A comparer to hash and compare keys.

Returns: An `IQueryable<T>` that contains elements of type `TResult` obtained by performing a grouped join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupJoin<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `GroupJoin<T1,T2,T3,T4>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupJoin<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter. The expected behavior is that the `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively. These keys are compared for equality by using `comparer`. The outcome of the comparisons is used to match each element in `outer` with zero or more elements from `inner`. Then the `resultSelector` function is invoked to project a result object from each group of correlated elements.

## Queryable.Index<TSource>(IQueryable<TSource>) method

```csharp
public static System.Linq.IQueryable<(int Index, TSource Item)> Index<TSource> (this System.Linq.IQueryable<TSource> source);
```

Return index and the associated item.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.

Returns: An enumerable that incorporates each element index into a tuple.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.Intersect<TSource>(IQueryable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Intersect<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2);
```

Produces the set intersection of two sequences by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: A sequence whose distinct elements that also appear in `source2` are returned.
- `source2`: A sequence whose distinct elements that also appear in the first sequence are returned.

Returns: A sequence that contains the set intersection of the two sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Intersect<T>` method generates a `MethodCallExpression` that represents calling `Intersect<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Intersect<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that all the elements in `source1` that are also in `source2` are returned.

#### Examples
The following code example demonstrates how to use `Intersect<T>` to return the elements that appear in each of two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Intersect<TSource>(IQueryable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Intersect<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set intersection of two sequences by using the specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: An `IQueryable<T>` whose distinct elements that also appear in `source2` are returned.
- `source2`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence are returned.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: An `IQueryable<T>` that contains the set intersection of the two sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Intersect<T>` method generates a `MethodCallExpression` that represents calling `Intersect<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Intersect<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that all the elements in `source1` that are also in `source2` are returned. The `comparer` parameter is used to compare elements.

## Queryable.IntersectBy<TSource,TKey>(IQueryable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IQueryable<TSource> IntersectBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TKey> source2, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Produces the set intersection of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `source1`: An `IQueryable<T>` whose distinct elements that also appear in `source2` will be returned.
- `source2`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `keySelector`: A function to extract the key for each element.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

To be added.

## Queryable.IntersectBy<TSource,TKey>(IQueryable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TSource> IntersectBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TKey> source2, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Produces the set intersection of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `source1`: An `IQueryable<T>` whose distinct elements that also appear in `source2` will be returned.
- `source2`: An `IEnumerable<T>` whose distinct elements that also appear in the first sequence will be returned.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A sequence that contains the elements that form the set intersection of two sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

To be added.

## Queryable.Join<TOuter,TInner,TKey>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<(TOuter Outer, TInner Inner)> Join<TOuter,TInner,TKey> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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
