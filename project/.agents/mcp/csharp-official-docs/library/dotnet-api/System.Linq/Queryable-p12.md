---
title: "Queryable class (part 12 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 12 of 20)

## Queryable.MaxBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static TSource? MaxBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Returns the maximum value in a generic `IQueryable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.MaxBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IComparer<TKey>) method

```csharp
public static TSource? MaxBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Returns the maximum value in a generic `IQueryable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.MaxBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IComparer<TSource>) method

```csharp
public static TSource? MaxBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TSource>? comparer);
```

Returns the maximum value in a generic `IQueryable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.Min<TSource>(IQueryable<TSource>) method

```csharp
public static TSource? Min<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the minimum value of a generic `IQueryable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum of.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Min<T>` method generates a `MethodCallExpression` that represents calling `Min<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Min<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the minimum value in `source`.

#### Examples
The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Min<TSource>(IQueryable<TSource>, IComparer<TSource>) method

```csharp
public static TSource? Min<TSource> (this System.Linq.IQueryable<TSource> source, System.Collections.Generic.IComparer<TSource>? comparer);
```

Returns the minimum value in a generic `IQueryable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `comparer`: The `IComparer<T>` to compare values.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No object in `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.Min<TSource,TResult>(IQueryable<TSource>, Func<TSource,TResult>>) method

```csharp
public static TResult? Min<TSource,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TResult>> selector);
```

Invokes a projection function on each element of a generic `IQueryable<T>` and returns the minimum resulting value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by the function represented by `selector`.
- `source`: A sequence of values to determine the minimum of.
- `selector`: A projection function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Min<T1,T2>` method generates a `MethodCallExpression` that represents calling `Min<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Min<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element in `source` and returns the minimum value.

#### Examples
The following code example demonstrates how to use `Min<T1,T2>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.MinBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static TSource? MinBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Returns the minimum value in a generic `IQueryable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.MinBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IComparer<TKey>) method

```csharp
public static TSource? MinBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Returns the minimum value in a generic `IQueryable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.MinBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IComparer<TSource>) method

```csharp
public static TSource? MinBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TSource>? comparer);
```

Returns the minimum value in a generic `IQueryable<T>` according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.

To be added.

## Queryable.OfType<TResult>(IQueryable) method

```csharp
public static System.Linq.IQueryable<TResult> OfType<TResult> (this System.Linq.IQueryable source);
```

Filters the elements of an `IQueryable` based on a specified type.

Parameters:

- `TResult`: The type to filter the elements of the sequence on.
- `source`: An `IQueryable` whose elements to filter.

Returns: A collection that contains the elements from `source` that have type `TResult`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `OfType` method generates a `MethodCallExpression` that represents calling `OfType` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `OfType` depends on the implementation of the type of the `source` parameter. The expected behavior is that it filters out any elements in `source` that are not of type `TResult`.

#### Examples
The following code example demonstrates how to use `OfType` to filter out elements that are not of type `PropertyInfo` from a list of elements of type `MemberInfo`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Order<T>(IQueryable<T>) method

```csharp
public static System.Linq.IOrderedQueryable<T> Order<T> (this System.Linq.IQueryable<T> source);
```

Sorts the elements of a sequence in ascending order.

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

## Queryable.Order<T>(IQueryable<T>, IComparer<T>) method

```csharp
public static System.Linq.IOrderedQueryable<T> Order<T> (this System.Linq.IQueryable<T> source, System.Collections.Generic.IComparer<T> comparer);
```

Sorts the elements of a sequence in ascending order.

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
