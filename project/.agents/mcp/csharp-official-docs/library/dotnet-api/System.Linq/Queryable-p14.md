---
title: "Queryable class (part 14 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 14 of 20)

## Queryable.RightJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> RightJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter?,TInner,TResult>> resultSelector);
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

This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types.

For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Queryable.RightJoin<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `Queryable.RightJoin<T1,T2,T3,T4>` itself as a constructed generic method.

It then passes the `MethodCallExpression` to the `IQueryProvider.CreateQuery<T>` method of the `IQueryProvider` represented by the `IQueryable.Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Queryable.RightJoin<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter.

The expected behavior is that of a right outer join.

The `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively.

These keys are compared for equality to match elements from each sequence.

A pair of elements is stored for each element in `inner` that matches an element in `outer`, plus a pair for each element in `inner` that has no matches in `outer`.

Then the `resultSelector` function is invoked to project a result object from each pair of elements.

## Queryable.RightJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> RightJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter?,TInner,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
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

This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types.

For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Queryable.RightJoin<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `Queryable.RightJoin<T1,T2,T3,T4>` itself as a constructed generic method.

It then passes the `MethodCallExpression` to the `IQueryProvider.CreateQuery<T>` method of the `IQueryProvider` represented by the `IQueryable.Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Queryable.RightJoin<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter.

The expected behavior is that of a right outer join.

The `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively.

These keys are compared for equality to match elements from each sequence.

A pair of elements is stored for each element in `inner` that matches an element in `outer`, plus a pair for each element in `inner` that has no matches in `outer`.

Then the `resultSelector` function is invoked to project a result object from each pair of elements.

## Queryable.Select<TSource,TResult>(IQueryable<TSource>, Int32,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> Select<TSource,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int,TResult>> selector);
```

Projects each element of a sequence into a new form by incorporating the element's index.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by the function represented by `selector`.
- `source`: A sequence of values to project.
- `selector`: A projection function to apply to each element.

Returns: An `IQueryable<T>` whose elements are the result of invoking a projection function on each element of `source`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Select<T1,T2>` method generates a `MethodCallExpression` that represents calling `Select<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Select<T1,T2>` depend on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` to project it into a different form.

#### Examples
The following code example demonstrates how to use `Select<T1,T2>` to project over a sequence of values and use the index of each element in the projected form.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Select<TSource,TResult>(IQueryable<TSource>, Func<TSource,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> Select<TSource,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TResult>> selector);
```

Projects each element of a sequence into a new form.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by the function represented by `selector`.
- `source`: A sequence of values to project.
- `selector`: A projection function to apply to each element.

Returns: An `IQueryable<T>` whose elements are the result of invoking a projection function on each element of `source`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Select<T1,T2>` method generates a `MethodCallExpression` that represents calling `Select<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Select<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` to project it into a different form.

#### Examples
The following code example demonstrates how to use `Select<T1,T2>` to project over a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SelectMany<TSource,TResult>(IQueryable<TSource>, IEnumerable<TResult>>>) method

```csharp
public static System.Linq.IQueryable<TResult> SelectMany<TSource,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,System.Collections.Generic.IEnumerable<TResult>>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>` and combines the resulting sequences into one sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the elements of the sequence returned by the function represented by `selector`.
- `source`: A sequence of values to project.
- `selector`: A projection function to apply to each element.

Returns: An `IQueryable<T>` whose elements are the result of invoking a one-to-many projection function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SelectMany<T1,T2>` method generates a `MethodCallExpression` that represents calling `SelectMany<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SelectMany<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` to project it into an enumerable form. It then concatenates the enumerable results into a single, one-dimensional sequence.

#### Examples
The following code example demonstrates how to use `SelectMany<T1,T2>` to perform a one-to-many projection over an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SelectMany<TSource,TResult>(IQueryable<TSource>, IEnumerable<TResult>>>) method

```csharp
public static System.Linq.IQueryable<TResult> SelectMany<TSource,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int,System.Collections.Generic.IEnumerable<TResult>>> selector);
```

Projects each element of a sequence to an `IEnumerable<T>` and combines the resulting sequences into one sequence. The index of each source element is used in the projected form of that element.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the elements of the sequence returned by the function represented by `selector`.
- `source`: A sequence of values to project.
- `selector`: A projection function to apply to each element; the second parameter of this function represents the index of the source element.

Returns: An `IQueryable<T>` whose elements are the result of invoking a one-to-many projection function on each element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SelectMany<T1,T2>` method generates a `MethodCallExpression` that represents calling `SelectMany<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SelectMany<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` to project it into an enumerable form. Each enumerable result incorporates the index of the source element. It then concatenates the enumerable results into a single, one-dimensional sequence.

#### Examples
The following code example demonstrates how to use `SelectMany<T1,T2>` to perform a one-to-many projection over an array and use the index of each source element.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
