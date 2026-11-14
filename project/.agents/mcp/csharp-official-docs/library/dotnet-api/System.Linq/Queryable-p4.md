---
title: "Queryable class (part 4 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 4 of 20)

## Queryable.Average<TSource>(IQueryable<TSource>, Int32>>>) method

```csharp
public static double? Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int?>> selector);
```

Computes the average of a sequence of nullable `Int32` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values, or `null` if the `source` sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Int64>>>) method

```csharp
public static double? Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,long?>> selector);
```

Computes the average of a sequence of nullable `Int64` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Average<TSource>(IQueryable<TSource>, Single>>>) method

```csharp
public static float? Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,float?>> selector);
```

Computes the average of a sequence of nullable `Single` values that is obtained by invoking a projection function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A projection function to apply to each element.

Returns: The average of the sequence of values, or `null` if the `source` sequence is empty or contains only `null` values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Average<T>` method generates a `MethodCallExpression` that represents calling `Average<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Average<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it calculates the average of the values in `source` after invoking `selector` on each value.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate the average `String` length in a sequence of values of type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Average<TSource>(IQueryable<TSource>, Single>>) method

```csharp
public static float Average<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,float>> selector);
```

Computes the average of a sequence of `Single` values that is obtained by invoking a projection function on each element of the input sequence.

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

## Queryable.Cast<TResult>(IQueryable) method

```csharp
public static System.Linq.IQueryable<TResult> Cast<TResult> (this System.Linq.IQueryable source);
```

Converts the elements of an `IQueryable` to the specified type.

Parameters:

- `TResult`: The type to convert the elements of `source` to.
- `source`: The `IQueryable` that contains the elements to be converted.

Returns: An `IQueryable<T>` that contains each element of the source sequence converted to the specified type.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidCastException`: An element in the sequence cannot be cast to type `TResult`.

#### Remarks
The `Cast<T>` method generates a `MethodCallExpression` that represents calling `Cast<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Cast<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it converts the values in `source` to type `TResult`.

#### Examples
The following code example demonstrates how to use `Cast<T>` to convert objects in a sequence to type `String`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Chunk<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static System.Linq.IQueryable<TSource[]> Chunk<TSource> (this System.Linq.IQueryable<TSource> source, int size);
```

Split the elements of a sequence into chunks of size at most `size`.

Parameters:

- `TSource`: The type of the elements of source.
- `source`: An `IEnumerable<T>` whose elements to chunk.
- `size`: The maximum size of each chunk.

Returns: An `IEnumerable<T>` that contains the elements the input sequence split into chunks of size `size`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `size` is below 1.

#### Remarks

Every chunk except the last will be of size `size`.

The last chunk will contain the remaining elements and may be of a smaller size.

## Queryable.Concat<TSource>(IQueryable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Concat<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2);
```

Concatenates two sequences.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: The first sequence to concatenate.
- `source2`: The sequence to concatenate to the first sequence.

Returns: An `IQueryable<T>` that contains the concatenated elements of the two input sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Concat<T>` method generates a `MethodCallExpression` that represents calling `Concat<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Concat<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that the elements in `source2` are concatenated to those of `source1` to create a new sequence.

#### Examples
The following code example demonstrates how to use `Concat<T>` to concatenate two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Contains<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static bool Contains<TSource> (this System.Linq.IQueryable<TSource> source, TSource item);
```

Determines whether a sequence contains a specified element by using the default equality comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` in which to locate `item`.
- `item`: The object to locate in the sequence.

Returns: `true` if the input sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Contains<T>` method generates a `MethodCallExpression` that represents calling `Contains<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Contains<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it determines if `source` contains `item`.

#### Examples
The following code example demonstrates how to use `Contains<T>` to determine whether a sequence contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Contains<TSource>(IQueryable<TSource>, TSource, IEqualityComparer<TSource>) method

```csharp
public static bool Contains<TSource> (this System.Linq.IQueryable<TSource> source, TSource item, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Determines whether a sequence contains a specified element by using a specified `IEqualityComparer<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` in which to locate `item`.
- `item`: The object to locate in the sequence.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: `true` if the input sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Contains<T>` method generates a `MethodCallExpression` that represents calling `Contains<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Contains<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it determines if `source` contains `item` by using `comparer` to compare values.
