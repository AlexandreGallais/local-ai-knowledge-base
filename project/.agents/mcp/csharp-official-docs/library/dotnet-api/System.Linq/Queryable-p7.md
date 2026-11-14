---
title: "Queryable class (part 7 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 7 of 20)

## Queryable.FirstOrDefault<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static TSource FirstOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, TSource defaultValue);
```

Returns the first element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IEnumerable<T>` to return the first element of.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.FirstOrDefault<TSource>(IQueryable<TSource>, Boolean>>, TSource) method

```csharp
public static TSource FirstOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate, TSource defaultValue);
```

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

To be added.

## Queryable.FullJoin<TOuter,TInner,TKey>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<(TOuter? Outer, TInner? Inner)> FullJoin<TOuter,TInner,TKey> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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

## Queryable.FullJoin<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> FullJoin<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter?,TInner?,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

To be added.

Parameters:

- `TOuter`: To be added.
- `TInner`: To be added.
- `TKey`: To be added.
- `TResult`: To be added.
- `outer`: To be added.
- `inner`: To be added.
- `outerKeySelector`: To be added.
- `innerKeySelector`: To be added.
- `resultSelector`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## Queryable.GroupBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IQueryable<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Groups the elements of a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.

Returns: An `IQueryable<IGrouping<TKey, TSource>>` in C# or `IQueryable(Of IGrouping(Of TKey, TSource))` in Visual Basic where each `IGrouping<T1,T2>` object contains a sequence of objects and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by a key value that is obtained by invoking `keySelector` on each element.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2>` to group the elements of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.GroupBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and compares the keys by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IQueryable<IGrouping<TKey, TSource>>` in C# or `IQueryable(Of IGrouping(Of TKey, TSource))` in Visual Basic where each `IGrouping<T1,T2>` contains a sequence of objects and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by a key value. The key value is obtained by invoking `keySelector` on each element, and key <example-value> are compared by using `comparer`.

## Queryable.GroupBy<TSource,TKey,TElement>(IQueryable<TSource>, Func<TSource,TKey>>, Func<TSource,TElement>>) method

```csharp
public static System.Linq.IQueryable<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TSource,TElement>> elementSelector);
```

Groups the elements of a sequence according to a specified key <example-value> function and projects the elements for each group by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.

Returns: An `IQueryable<IGrouping<TKey, TElement>>` in C# or `IQueryable(Of IGrouping(Of TKey, TElement))` in Visual Basic where each `IGrouping<T1,T2>` contains a sequence of objects of type `TElement` and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by a key value that is obtained by invoking `keySelector` on each element. It invokes `elementSelector` on each element to obtain a result element.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2,T3>` to group the elements of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.GroupBy<TSource,TKey,TElement>(IQueryable<TSource>, Func<TSource,TKey>>, Func<TSource,TElement>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Linq.Expressions.Expression<Func<TSource,TElement>> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence and projects the elements for each group by using a specified function. Key <example-value> are compared by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented in `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `source`: An `IQueryable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IQueryable<IGrouping<TKey, TElement>>` in C# or `IQueryable(Of IGrouping(Of TKey, TElement))` in Visual Basic where each `IGrouping<T1,T2>` contains a sequence of objects of type `TElement` and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `GroupBy<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `GroupBy<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `GroupBy<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it groups the elements of `source` by a key value that is obtained by invoking `keySelector` on each element. Key <example-value> are compared by using `comparer`. The `elementSelector` parameter is invoked on each element to obtain a result element.
