---
title: "Queryable class (part 2 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 2 of 20)

## Queryable.Any<TSource>(IQueryable<TSource>) method

```csharp
public static bool Any<TSource> (this System.Linq.IQueryable<TSource> source);
```

Determines whether a sequence contains any elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence to check for being empty.

Returns: `true` if the source sequence contains any elements; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Any<T>` method generates a `MethodCallExpression` that represents calling `Any<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Any<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it determines if `source` contains any elements.

#### Examples
The following code example demonstrates how to use `Any<T>` to determine whether a sequence contains any elements.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

The Boolean value that the `Any<T>` method returns is typically used in the predicate of a `where` clause (`Where` clause in Visual Basic) or a direct call to the `Where<T>` method. The following example demonstrates this use of the `Any` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Any<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static bool Any<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Determines whether any element of a sequence satisfies a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence whose elements to test for a condition.
- `predicate`: A function to test each element for a condition.

Returns: `true` if any elements in the source sequence pass the test in the specified predicate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Any<T>` method generates a `MethodCallExpression` that represents calling `Any<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Any<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it determines if any of the elements of `source` satisfy the condition specified by `predicate`.

#### Examples
The following code example demonstrates how to use `Any<T>` to determine whether any element in a sequence satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Append<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static System.Linq.IQueryable<TSource> Append<TSource> (this System.Linq.IQueryable<TSource> source, TSource element);
```

Returns a new queryable sequence that contains the elements from `source` plus the specified `element` appended at the end.

Parameters:

- `TSource`: The type of the elements in the queryable sequence.
- `source`: A queryable sequence.
- `element`: An element of type `TSource` to append to `source`.

Returns: A new queryable sequence that contains the elements from `source` plus the specified `element` appended at the end.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.AsQueryable(IEnumerable) method

```csharp
public static System.Linq.IQueryable AsQueryable (this System.Collections.IEnumerable source);
```

Converts an `IEnumerable` to an `IQueryable`.

Parameters:

- `source`: A sequence to convert.

Returns: An `IQueryable` that represents the input sequence.

Exceptions:

- `ArgumentException`: `source` does not implement `IEnumerable<T>` for some `T`.
- `ArgumentNullException`: `source` is `null`.

#### Remarks
If the type of `source` implements `IQueryable<T>`, `AsQueryable` returns it directly. Otherwise, it returns an `IQueryable<T>` that executes queries by calling the equivalent query operator methods in `Enumerable` instead of those in `Queryable`.

This method assumes that `source` implements `IEnumerable<T>` for some `T`. At runtime, the result is of type `IQueryable<T>` for the same `T`. This method is useful in dynamic scenarios when you do not statically know the type of `T`.

## Queryable.AsQueryable<TElement>(IEnumerable<TElement>) method

```csharp
public static System.Linq.IQueryable<TElement> AsQueryable<TElement> (this System.Collections.Generic.IEnumerable<TElement> source);
```

Converts a generic `IEnumerable<T>` to a generic `IQueryable<T>`.

Parameters:

- `TElement`: The type of the elements of `source`.
- `source`: A sequence to convert.

Returns: An `IQueryable<T>` that represents the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
If the type of `source` implements `IQueryable<T>`, `AsQueryable<T>` returns it directly. Otherwise, it returns an `IQueryable<T>` that executes queries by calling the equivalent query operator methods in `Enumerable` instead of those in `Queryable`.

#### Examples
The following code example demonstrates how to use `AsQueryable<T>` to convert an `IEnumerable<T>` to an `IQueryable<T>`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average(Decimal>) method

```csharp
public static decimal Average (this System.Linq.IQueryable<decimal> source);
```

Computes the average of a sequence of `Decimal` values.

Parameters:

- `source`: A sequence of `Decimal` values to calculate the average of.

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

## Queryable.Average(Double>) method

```csharp
public static double Average (this System.Linq.IQueryable<double> source);
```

Computes the average of a sequence of `Double` values.

Parameters:

- `source`: A sequence of `Double` values to calculate the average of.

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

## Queryable.Average(Int32>) method

```csharp
public static double Average (this System.Linq.IQueryable<int> source);
```

Computes the average of a sequence of `Int32` values.

Parameters:

- `source`: A sequence of `Int32` values to calculate the average of.

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

## Queryable.Average(Int64>) method

```csharp
public static double Average (this System.Linq.IQueryable<long> source);
```

Computes the average of a sequence of `Int64` values.

Parameters:

- `source`: A sequence of `Int64` values to calculate the average of.

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

## Queryable.Average(Decimal>>) method

```csharp
public static decimal? Average (this System.Linq.IQueryable<decimal?> source);
```

Computes the average of a sequence of nullable `Decimal` values.

Parameters:

- `source`: A sequence of nullable `Decimal` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Average` method generates a `MethodCallExpression` that represents calling `Average` itself. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source`.

#### Examples
The following code example demonstrates how to use `Average` to calculate the average of a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average(Double>>) method

```csharp
public static double? Average (this System.Linq.IQueryable<double?> source);
```

Computes the average of a sequence of nullable `Double` values.

Parameters:

- `source`: A sequence of nullable `Double` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Average` method generates a `MethodCallExpression` that represents calling `Average` itself. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source`.

#### Examples
The following code example demonstrates how to use `Average` to calculate the average of a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average(Int32>>) method

```csharp
public static double? Average (this System.Linq.IQueryable<int?> source);
```

Computes the average of a sequence of nullable `Int32` values.

Parameters:

- `source`: A sequence of nullable `Int32` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Average` method generates a `MethodCallExpression` that represents calling `Average` itself. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source`.

#### Examples
The following code example demonstrates how to use `Average` to calculate the average of a sequence of values.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
