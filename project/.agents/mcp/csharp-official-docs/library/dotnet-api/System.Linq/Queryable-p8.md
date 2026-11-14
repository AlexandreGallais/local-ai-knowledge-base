---
title: "Queryable class (part 8 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 8 of 20)

## Queryable.GroupBy<TSource,TKey,TResult>(IQueryable<TSource>, Func<TSource,TKey>>, IEnumerable<TSource>,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> GroupBy<TSource,TKey,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult>> resultSelector);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.

Returns: An `T:System.Linq.IQueryable`1` that has a type argument of `TResult` and where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by a key value that is obtained by invoking `keySelector` on each element. The `resultSelector` parameter is used to obtain a result value from each group and its key.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2,T3>` to group the elements of a sequence and project a sequence of results of type `TResult`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.GroupBy<TSource,TKey,TResult>(IQueryable<TSource>, Func<TSource,TKey>>, IEnumerable<TSource>,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> GroupBy<TSource,TKey,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. Keys are compared by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `T:System.Linq.IQueryable`1` that has a type argument of `TResult` and where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `resultSelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by key <example-value> that are obtained by invoking `keySelector` on each element. The `comparer` parameter is used to compare keys and the `resultSelector` parameter is used to obtain a result value from each group and its key.

## Queryable.GroupBy<TSource,TKey,TElement,TResult>(IQueryable<TSource>, Func<TSource,TKey>>, Func<TSource,TElement>>, IEnumerable<TElement>,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TSource,TElement>> elementSelector, System.Linq.Expressions.Expression<Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult>> resultSelector);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. The elements of each group are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `resultSelector`: A function to create a result value from each group.

Returns: An `T:System.Linq.IQueryable`1` that has a type argument of `TResult` and where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2,T3,T4>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2,T3,T4>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by key <example-value> that are obtained by invoking `keySelector` on each element. The `elementSelector` parameter is used to project the elements of each group, and the `resultSelector` parameter is used to obtain a result value from each group and its key.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2,T3,T4>` to group the elements of a sequence and project a sequence of results of type `TResult`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.GroupBy<TSource,TKey,TElement,TResult>(IQueryable<TSource>, Func<TSource,TKey>>, Func<TSource,TElement>>, IEnumerable<TElement>,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TSource,TElement>> elementSelector, System.Linq.Expressions.Expression<Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. Keys are compared by using a specified comparer and the elements of each group are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `T:System.Linq.IQueryable`1` that has a type argument of `TResult` and where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `resultSelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2,T3,T4>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2,T3,T4>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by key <example-value> that are obtained by invoking `keySelector` on each element. The `comparer` parameter is used to compare key values. The `elementSelector` parameter is used to project the elements of each group, and the `resultSelector` parameter is used to obtain a result value from each group and its key.

## Queryable.GroupJoin<TOuter,TInner,TKey>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<System.Linq.IGrouping<TOuter,TInner>> GroupJoin<TOuter,TInner,TKey> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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
