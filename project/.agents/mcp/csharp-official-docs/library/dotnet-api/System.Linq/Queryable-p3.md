---
title: "Queryable class (part 3 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 3 of 20)

## Queryable.Average(Int64>>) method

```csharp
public static double? Average (this System.Linq.IQueryable<long?> source);
```

Computes the average of a sequence of nullable `Int64` values.

Parameters:

- `source`: A sequence of nullable `Int64` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Average` method generates a `MethodCallExpression` that represents calling `Average` itself. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source`.

#### Examples
The following code example demonstrates how to use `Average` to calculate the average of a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average(Single>>) method

```csharp
public static float? Average (this System.Linq.IQueryable<float?> source);
```

Computes the average of a sequence of nullable `Single` values.

Parameters:

- `source`: A sequence of nullable `Single` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Average` method generates a `MethodCallExpression` that represents calling `Average` itself. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source`.

#### Examples
The following code example demonstrates how to use `Average` to calculate the average of a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average(Single>) method

```csharp
public static float Average (this System.Linq.IQueryable<float> source);
```

Computes the average of a sequence of `Single` values.

Parameters:

- `source`: A sequence of `Single` values to calculate the average of.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Average` method generates a `MethodCallExpression` that represents calling `Average` itself. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source`.

#### Examples
The following code example demonstrates how to use `Average` to calculate the average of a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Decimal>>) method

```csharp
public static decimal Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,decimal>> selector);
```

Computes the average of a sequence of `Decimal` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Double>>) method

```csharp
public static double Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,double>> selector);
```

Computes the average of a sequence of `Double` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Int32>>) method

```csharp
public static double Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int>> selector);
```

Computes the average of a sequence of `Int32` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Int64>>) method

```csharp
public static double Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,long>> selector);
```

Computes the average of a sequence of `Int64` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Decimal>>>) method

```csharp
public static decimal? Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,decimal?>> selector);
```

Computes the average of a sequence of nullable `Decimal` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values, or `null` if the `source` sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Double>>>) method

```csharp
public static double? Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,double?>> selector);
```

Computes the average of a sequence of nullable `Double` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values, or `null` if the `source` sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
