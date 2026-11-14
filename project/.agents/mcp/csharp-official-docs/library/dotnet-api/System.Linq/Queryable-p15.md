---
title: "Queryable class (part 15 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 15 of 20)

## Queryable.SelectMany<TSource,TCollection,TResult>(IQueryable<TSource>, IEnumerable<TCollection>>>, Func<TSource,TCollection,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,System.Collections.Generic.IEnumerable<TCollection>>> collectionSelector, System.Linq.Expressions.Expression<Func<TSource,TCollection,TResult>> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>` and invokes a result selector function on each element therein. The resulting values from each intermediate sequence are combined into a single, one-dimensional sequence and returned.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TCollection`: The type of the intermediate elements collected by the function represented by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A projection function to apply to each element of the input sequence.
- `resultSelector`: A projection function to apply to each element of each intermediate sequence.

Returns: An `IQueryable<T>` whose elements are the result of invoking the one-to-many projection function `collectionSelector` on each element of `source` and then mapping each of those sequence elements and their corresponding `source` element to a result element.

Exceptions:

- `ArgumentNullException`: `source` or `collectionSelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SelectMany<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `SelectMany<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SelectMany<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `collectionSelector` on each element of `source` to project it into an enumerable form. Then the function represented by `resultSelector` is invoked on each element in each intermediate sequence. The resulting values are concatenated into a single, one-dimensional sequence.

#### Examples
The following code example demonstrates how to use `SelectMany<T1,T2,T3>` to perform a one-to-many projection over an array. This example uses a result selector function to keep the source element that corresponds to each intermediate sequence in scope for the final call to `Select`.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SelectMany<TSource,TCollection,TResult>(IQueryable<TSource>, IEnumerable<TCollection>>>, Func<TSource,TCollection,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> SelectMany<TSource,TCollection,TResult> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int,System.Collections.Generic.IEnumerable<TCollection>>> collectionSelector, System.Linq.Expressions.Expression<Func<TSource,TCollection,TResult>> resultSelector);
```

Projects each element of a sequence to an `IEnumerable<T>` that incorporates the index of the source element that produced it. A result selector function is invoked on each element of each intermediate sequence, and the resulting values are combined into a single, one-dimensional sequence and returned.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TCollection`: The type of the intermediate elements collected by the function represented by `collectionSelector`.
- `TResult`: The type of the elements of the resulting sequence.
- `source`: A sequence of values to project.
- `collectionSelector`: A projection function to apply to each element of the input sequence; the second parameter of this function represents the index of the source element.
- `resultSelector`: A projection function to apply to each element of each intermediate sequence.

Returns: An `IQueryable<T>` whose elements are the result of invoking the one-to-many projection function `collectionSelector` on each element of `source` and then mapping each of those sequence elements and their corresponding `source` element to a result element.

Exceptions:

- `ArgumentNullException`: `source` or `collectionSelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SelectMany<T1,T2,T3>` method generates a `MethodCallExpression` that represents calling `SelectMany<T1,T2,T3>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SelectMany<T1,T2,T3>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it invokes `collectionSelector` on each element of `source` to project it into an enumerable form. Each enumerable result incorporates the source element's index. Then the function represented by `resultSelector` is invoked on each element in each intermediate sequence. The resulting values are concatenated into a single, one-dimensional sequence.

## Queryable.SequenceEqual<TSource>(IQueryable<TSource>, IEnumerable<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2);
```

Determines whether two sequences are equal by using the default equality comparer to compare elements.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: An `IQueryable<T>` whose elements to compare to those of `source2`.
- `source2`: An `IEnumerable<T>` whose elements to compare to those of the first sequence.

Returns: `true` if the two source sequences are of equal length and their corresponding elements compare equal; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `SequenceEqual<T>` method generates a `MethodCallExpression` that represents calling `SequenceEqual<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SequenceEqual<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that it determines if the two source sequences are equal.

#### Examples
The following code example demonstrates how to use `SequenceEqual<T>` to determine whether two sequences are equal. In this example the sequences are equal.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

The following code example compares two sequences that are not equal.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SequenceEqual<TSource>(IQueryable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Determines whether two sequences are equal by using a specified `IEqualityComparer<T>` to compare elements.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: An `IQueryable<T>` whose elements to compare to those of `source2`.
- `source2`: An `IEnumerable<T>` whose elements to compare to those of the first sequence.
- `comparer`: An `IEqualityComparer<T>` to use to compare elements.

Returns: `true` if the two source sequences are of equal length and their corresponding elements compare equal; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `SequenceEqual<T>` method generates a `MethodCallExpression` that represents calling `SequenceEqual<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SequenceEqual<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that it determines if the two source sequences are equal by using `comparer` to compare elements.

## Queryable.Shuffle<TSource>(IQueryable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Shuffle<TSource> (this System.Linq.IQueryable<TSource> source);
```

To be added.

Parameters:

- `TSource`: To be added.
- `source`: To be added.

Returns: To be added.

To be added.

## Queryable.Single<TSource>(IQueryable<TSource>) method

```csharp
public static TSource Single<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return the single element of.

Returns: The single element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` has more than one element.

-or-

The source sequence is empty.

#### Remarks
The `Single<T>` method generates a `MethodCallExpression` that represents calling `Single<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Single<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the only element in `source`.

#### Examples
The following code example demonstrates how to use `Single<T>` to select the only element of an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Single<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static TSource Single<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.

Returns: The single element of the input sequence that satisfies the condition in `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: No element satisfies the condition in `predicate`.

-or-

More than one element satisfies the condition in `predicate`.

-or-

The source sequence is empty.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Single<T>` method generates a `MethodCallExpression` that represents calling `Single<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Single<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the only element in `source` that satisfies the condition specified by `predicate`.

#### Examples
The following code example demonstrates how to use `Single<T>` to select the only element of an array that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
