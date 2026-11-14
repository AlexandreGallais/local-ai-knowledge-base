---
title: "Queryable class (part 17 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 17 of 20)

## Queryable.Sum(Double>) method

```csharp
public static double Sum (this System.Linq.IQueryable<double> source);
```

Computes the sum of a sequence of `Double` values.

Parameters:

- `source`: A sequence of `Double` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Int32>) method

```csharp
public static int Sum (this System.Linq.IQueryable<int> source);
```

Computes the sum of a sequence of `Int32` values.

Parameters:

- `source`: A sequence of `Int32` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Int64>) method

```csharp
public static long Sum (this System.Linq.IQueryable<long> source);
```

Computes the sum of a sequence of `Int64` values.

Parameters:

- `source`: A sequence of `Int64` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Decimal>>) method

```csharp
public static decimal? Sum (this System.Linq.IQueryable<decimal?> source);
```

Computes the sum of a sequence of nullable `Decimal` values.

Parameters:

- `source`: A sequence of nullable `Decimal` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Double>>) method

```csharp
public static double? Sum (this System.Linq.IQueryable<double?> source);
```

Computes the sum of a sequence of nullable `Double` values.

Parameters:

- `source`: A sequence of nullable `Double` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Int32>>) method

```csharp
public static int? Sum (this System.Linq.IQueryable<int?> source);
```

Computes the sum of a sequence of nullable `Int32` values.

Parameters:

- `source`: A sequence of nullable `Int32` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Int64>>) method

```csharp
public static long? Sum (this System.Linq.IQueryable<long?> source);
```

Computes the sum of a sequence of nullable `Int64` values.

Parameters:

- `source`: A sequence of nullable `Int64` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

## Queryable.Sum(Single>>) method

```csharp
public static float? Sum (this System.Linq.IQueryable<float?> source);
```

Computes the sum of a sequence of nullable `Single` values.

Parameters:

- `source`: A sequence of nullable `Single` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

#### Examples
The following code example demonstrates how to use `Sum` to sum the values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum(Single>) method

```csharp
public static float Sum (this System.Linq.IQueryable<float> source);
```

Computes the sum of a sequence of `Single` values.

Parameters:

- `source`: A sequence of `Single` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.

#### Examples
The following code example demonstrates how to use `Sum` to sum the values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum<TSource>(IQueryable<TSource>, Decimal>>) method

```csharp
public static decimal Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,decimal>> selector);
```

Computes the sum of the sequence of `Decimal` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values of type `TSource`.
- `selector`: A projection function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Sum<T>` method generates a `MethodCallExpression` that represents calling `Sum<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` and returns the sum of the resulting values.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum<TSource>(IQueryable<TSource>, Double>>) method

```csharp
public static double Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,double>> selector);
```

Computes the sum of the sequence of `Double` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values of type `TSource`.
- `selector`: A projection function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Sum<T>` method generates a `MethodCallExpression` that represents calling `Sum<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` and returns the sum of the resulting values.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum<TSource>(IQueryable<TSource>, Int32>>) method

```csharp
public static int Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int>> selector);
```

Computes the sum of the sequence of `Int32` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values of type `TSource`.
- `selector`: A projection function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Sum<T>` method generates a `MethodCallExpression` that represents calling `Sum<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` and returns the sum of the resulting values.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
