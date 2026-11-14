---
title: "Queryable class (part 18 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 18 of 20)

## Queryable.Sum<TSource>(IQueryable<TSource>, Int64>>) method

```csharp
public static long Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,long>> selector);
```

Computes the sum of the sequence of `Int64` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values of type `TSource`.
- `selector`: A projection function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Sum<T>` method generates a `MethodCallExpression` that represents calling `Sum<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` and returns the sum of the resulting values.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum<TSource>(IQueryable<TSource>, Decimal>>>) method

```csharp
public static decimal? Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,decimal?>> selector);
```

Computes the sum of the sequence of nullable `Decimal` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Sum<TSource>(IQueryable<TSource>, Double>>>) method

```csharp
public static double? Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,double?>> selector);
```

Computes the sum of the sequence of nullable `Double` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Sum<TSource>(IQueryable<TSource>, Int32>>>) method

```csharp
public static int? Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int?>> selector);
```

Computes the sum of the sequence of nullable `Int32` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Sum<TSource>(IQueryable<TSource>, Int64>>>) method

```csharp
public static long? Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,long?>> selector);
```

Computes the sum of the sequence of nullable `Int64` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values of type `TSource`.
- `selector`: A projection function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Sum<T>` method generates a `MethodCallExpression` that represents calling `Sum<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `selector` on each element of `source` and returns the sum of the resulting values.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum<TSource>(IQueryable<TSource>, Single>>>) method

```csharp
public static float? Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,float?>> selector);
```

Computes the sum of the sequence of nullable `Single` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Sum<TSource>(IQueryable<TSource>, Single>>) method

```csharp
public static float Sum<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,float>> selector);
```

Computes the sum of the sequence of `Single` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Take<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static System.Linq.IQueryable<TSource> Take<TSource> (this System.Linq.IQueryable<TSource> source, int count);
```

Returns a specified number of contiguous elements from the start of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `count`: The number of elements to return.

Returns: An `IQueryable<T>` that contains the specified number of elements from the start of `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Take<T>` method generates a `MethodCallExpression` that represents calling `Take<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Take<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it takes the first `count` elements from the start of `source`.

#### Examples
The following code example demonstrates how to use `Take<T>` to return elements from the start of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Take<TSource>(IQueryable<TSource>, Range) method

```csharp
public static System.Linq.IQueryable<TSource> Take<TSource> (this System.Linq.IQueryable<TSource> source, Range range);
```

Returns a specified range of contiguous elements from a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `range`: The range of elements to return, which has start and end indexes either from the start or the end.

Returns: An `IQueryable<T>` that contains the specified `range` of elements from the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.
