---
title: "Queryable class (part 13 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 13 of 20)

## Queryable.OrderBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> OrderBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Sorts the elements of a sequence in ascending order according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function that is represented by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.

Returns: An `IOrderedQueryable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `OrderBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `OrderBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `OrderBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it sorts the elements of `source` based on the key <example-value> by invoking `keySelector` on each element of `source`.

#### Examples
The following code example demonstrates how to use `OrderBy<T1,T2>` to sort the elements of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.OrderBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> OrderBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts the elements of a sequence in ascending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function that is represented by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedQueryable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `OrderBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `OrderBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `OrderBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it sorts the elements of `source` based on the key <example-value> by invoking `keySelector` on each element of `source`. The `comparer` parameter is used to compare keys.

## Queryable.OrderByDescending<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> OrderByDescending<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Sorts the elements of a sequence in descending order according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function that is represented by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.

Returns: An `IOrderedQueryable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `OrderByDescending<T1,T2>` method generates a `MethodCallExpression` that represents calling `OrderByDescending<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `OrderByDescending<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it sorts the elements of `source` in descending order, based on the key <example-value> by invoking `keySelector` on each element of `source`.

## Queryable.OrderByDescending<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> OrderByDescending<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Sorts the elements of a sequence in descending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function that is represented by `keySelector`.
- `source`: A sequence of values to order.
- `keySelector`: A function to extract a key from an element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedQueryable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `OrderByDescending<T1,T2>` method generates a `MethodCallExpression` that represents calling `OrderByDescending<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `OrderByDescending<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it sorts the elements of `source` in descending order, based on the key <example-value> by invoking `keySelector` on each element of `source`. The `comparer` parameter is used to compare keys.

#### Examples
The following code example demonstrates how to use `OrderByDescending<T1,T2>` to sort the elements of a sequence in descending order by using a custom comparer.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.OrderDescending<T>(IQueryable<T>) method

```csharp
public static System.Linq.IOrderedQueryable<T> OrderDescending<T> (this System.Linq.IQueryable<T> source);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method has at least one parameter of type `Expression<T>` whose type argument is one
of the `Func<T1,T2>` types.
For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Order<T>` method generates a `MethodCallExpression` that represents
calling `Order<T>` itself as a constructed generic method.
It then passes the `MethodCallExpression` to the `CreateQuery<T>` method
of the `IQueryProvider` represented by the `Provider` property of the `source`
parameter. The result of calling `CreateQuery<T>` is cast to
type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree
that represents calling `Order<T>`
depends on the implementation of the `source` parameter.
The expected behavior is that it sorts the elements of `source` by itself.

## Queryable.OrderDescending<T>(IQueryable<T>, IComparer<T>) method

```csharp
public static System.Linq.IOrderedQueryable<T> OrderDescending<T> (this System.Linq.IQueryable<T> source, System.Collections.Generic.IComparer<T> comparer);
```

Sorts the elements of a sequence in descending order.

Parameters:

- `T`: The type of the elements of `source`.
- `source`: A sequence of values to order.
- `comparer`: An `IComparer<T>` to compare elements.

Returns: An `IOrderedEnumerable<T>` whose elements are sorted.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method has at least one parameter of type `Expression<T>` whose type argument is one
of the `Func<T1,T2>` types.
For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Order<T>` method generates a `MethodCallExpression` that represents
calling `Order<T>` itself as a constructed generic method.
It then passes the `MethodCallExpression` to the `CreateQuery<T>` method
of the `IQueryProvider` represented by the `Provider` property of the `source`
parameter. The result of calling `CreateQuery<T>` is cast to
type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree
that represents calling `Order<T>`
depends on the implementation of the `source` parameter.
The expected behavior is that it sorts the elements of `source` by itself.

## Queryable.Prepend<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static System.Linq.IQueryable<TSource> Prepend<TSource> (this System.Linq.IQueryable<TSource> source, TSource element);
```

Returns a new queryable sequence that contains the elements from `source` plus the specified `element` prepended at the beginning.

Parameters:

- `TSource`: The type of the elements in the queryable sequence.
- `source`: A queryable sequence.
- `element`: An element of type `TSource` to prepend to `source`.

Returns: A new queryable sequence that contains the elements from `source` plus the specified `element` prepended at the beginning.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.Reverse<TSource>(IQueryable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Reverse<TSource> (this System.Linq.IQueryable<TSource> source);
```

Inverts the order of the elements in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to reverse.

Returns: An `IQueryable<T>` whose elements correspond to those of the input sequence in reverse order.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Reverse<T>` method generates a `MethodCallExpression` that represents calling `Reverse<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Reverse<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it reverses the order of the elements in `source`.

#### Examples
The following code example demonstrates how to use `Reverse<T>` to reverse the order of elements in an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.RightJoin<TOuter,TInner,TKey>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<(TOuter? Outer, TInner Inner)> RightJoin<TOuter,TInner,TKey> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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
