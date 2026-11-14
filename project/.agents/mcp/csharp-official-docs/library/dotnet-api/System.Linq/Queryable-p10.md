---
title: "Queryable class (part 10 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 10 of 20)

## Queryable.Join<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter,TInner,TResult>> resultSelector);
```

Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.

Returns: An `IQueryable<T>` that has elements of type `TResult` obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Join<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `Join<T1,T2,T3,T4>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Join<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter. The expected behavior is that of an inner join. The `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively. These keys are compared for equality to match elements from each sequence. A pair of elements is stored for each element in `inner` that matches an element in `outer`. Then the `resultSelector` function is invoked to project a result object from each pair of matching elements.

#### Examples
The following code example demonstrates how to use `Join<T1,T2,T3,T4>` to perform an inner join of two sequences based on a common key.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Join<TOuter,TInner,TKey,TResult>(IQueryable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>>, Func<TInner,TKey>>, Func<TOuter,TInner,TResult>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TResult> Join<TOuter,TInner,TKey,TResult> (this System.Linq.IQueryable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, System.Linq.Expressions.Expression<Func<TOuter,TKey>> outerKeySelector, System.Linq.Expressions.Expression<Func<TInner,TKey>> innerKeySelector, System.Linq.Expressions.Expression<Func<TOuter,TInner,TResult>> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Correlates the elements of two sequences based on matching keys. A specified `IEqualityComparer<T>` is used to compare keys.

Parameters:

- `TOuter`: The type of the elements of the first sequence.
- `TInner`: The type of the elements of the second sequence.
- `TKey`: The type of the keys returned by the key <example-value> functions.
- `TResult`: The type of the result elements.
- `outer`: The first sequence to join.
- `inner`: The sequence to join to the first sequence.
- `outerKeySelector`: A function to extract the join key from each element of the first sequence.
- `innerKeySelector`: A function to extract the join key from each element of the second sequence.
- `resultSelector`: A function to create a result element from two matching elements.
- `comparer`: An `IEqualityComparer<T>` to hash and compare keys.

Returns: An `IQueryable<T>` that has elements of type `TResult` obtained by performing an inner join on two sequences.

Exceptions:

- `ArgumentNullException`: `outer` or `inner` or `outerKeySelector` or `innerKeySelector` or `resultSelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Join<T1,T2,T3,T4>` method generates a `MethodCallExpression` that represents calling `Join<T1,T2,T3,T4>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `outer` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Join<T1,T2,T3,T4>` depends on the implementation of the type of the `outer` parameter. The expected behavior is that of an inner join. The `outerKeySelector` and `innerKeySelector` functions are used to extract keys from `outer` and `inner`, respectively. These keys are compared for equality by using `comparer`. The outcome of the comparisons is used to create a matching pair for each element in `inner` that matches an element in `outer`. Then the `resultSelector` function is invoked to project a result object from each pair of matching elements.

## Queryable.Last<TSource>(IQueryable<TSource>) method

```csharp
public static TSource Last<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the last element in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return the last element of.

Returns: The value at the last position in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The source sequence is empty.

#### Remarks
The `Last<T>` method generates a `MethodCallExpression` that represents calling `Last<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Last<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the last element in `source`.

#### Examples
The following code example demonstrates how to use `Last<T>` to return the last element of an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Last<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static TSource Last<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the last element of a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: The last element in `source` that passes the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: No element satisfies the condition in `predicate`.

-or-

The source sequence is empty.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Last<T>` method generates a `MethodCallExpression` that represents calling `Last<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Last<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the last element in `source` that satisfies the condition specified by `predicate`.

#### Examples
The following code example demonstrates how to use `Last<T>` to return the last element of an array that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.LastOrDefault<TSource>(IQueryable<TSource>) method

```csharp
public static TSource? LastOrDefault<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the last element in a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return the last element of.

Returns: `default`(`TSource`) if `source` is empty; otherwise, the last element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `LastOrDefault<T>` method generates a `MethodCallExpression` that represents calling `LastOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `LastOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the last element in `source`, or a default value if `source` is empty.

The `Queryable.LastOrDefault` method does not provide a way to specify a default value. If you want to specify a default value other than `default(TSource)`, use the `DefaultIfEmpty<T>` method as described in the Example section.

#### Examples
The following code example demonstrates how to use `LastOrDefault<T>` on an empty array.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

Sometimes the value of `default(TSource)` is not the default value that you want to use if the collection contains no elements. Instead of checking the result for the unwanted default value and then changing it if necessary, you can use the `DefaultIfEmpty<T>` method to specify the default value that you want to use if the collection is empty. Then, call `Last<T>` to obtain the last element. The following code example uses both techniques to obtain a default value of 1 if a collection of numeric days of the month is empty. Because the default value for an integer is 0, which does not correspond to any day of the month, the default value must be specified as 1 instead. The first result variable is checked for the unwanted default value after the query is completed. The second result variable is obtained by calling `DefaultIfEmpty<T>` to specify a default value of 1.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.LastOrDefault<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static TSource? LastOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: `default`(`TSource`) if `source` is empty or if no elements pass the test in the predicate function; otherwise, the last element of `source` that passes the test in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `LastOrDefault<T>` method generates a `MethodCallExpression` that represents calling `LastOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `LastOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the last element in `source` that satisfies the condition specified by `predicate`. It returns a default value if there is no such element in `source`.

#### Examples
The following code example demonstrates how to use `LastOrDefault<T>` by passing in a predicate. In the second call to the method, there is no element in the sequence that satisfies the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.LastOrDefault<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static TSource LastOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, TSource defaultValue);
```

Returns the last element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the last element of.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if the source sequence is empty; otherwise, the last element in the `IEnumerable<T>`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.
