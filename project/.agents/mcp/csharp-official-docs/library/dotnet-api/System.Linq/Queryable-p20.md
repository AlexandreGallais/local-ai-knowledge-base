---
title: "Queryable class (part 20 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 20 of 20)

## Queryable.Union<TSource>(IQueryable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Union<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2);
```

Produces the set union of two sequences by using the default equality comparer.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: A sequence whose distinct elements form the first set for the union operation.
- `source2`: A sequence whose distinct elements form the second set for the union operation.

Returns: An `IQueryable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Union<T>` method generates a `MethodCallExpression` that represents calling `Union<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Union<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that the set union of the elements in `source1` and `source2` is returned.

#### Examples
The following code example demonstrates how to use `Union<T>` to obtain the set union of two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Union<TSource>(IQueryable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Union<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set union of two sequences by using a specified `IEqualityComparer<T>`.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: A sequence whose distinct elements form the first set for the union operation.
- `source2`: A sequence whose distinct elements form the second set for the union operation.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: An `IQueryable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Union<T>` method generates a `MethodCallExpression` that represents calling `Union<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Union<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that the set union of the elements in `source1` and `source2` is returned. The `comparer` parameter is used to compare values.

## Queryable.UnionBy<TSource,TKey>(IQueryable<TSource>, IEnumerable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IQueryable<TSource> UnionBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Produces the set union of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `source1`: An `IQueryable<T>` whose distinct elements form the first set for the union.
- `source2`: An `IEnumerable<T>` whose distinct elements form the second set for the union.
- `keySelector`: A function to extract the key for each element.

Returns: An `IEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

To be added.

## Queryable.UnionBy<TSource,TKey>(IQueryable<TSource>, IEnumerable<TSource>, Func<TSource,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TSource> UnionBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Produces the set union of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `source1`: An `IQueryable<T>` whose distinct elements form the first set for the union.
- `source2`: An `IEnumerable<T>` whose distinct elements form the second set for the union.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: An `IEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

To be added.

## Queryable.Where<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static System.Linq.IQueryable<TSource> Where<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Filters a sequence of values based on a predicate.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to filter.
- `predicate`: A function to test each element for a condition.

Returns: An `IQueryable<T>` that contains elements from the input sequence that satisfy the condition specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Where<T>` method generates a `MethodCallExpression` that represents calling `Where<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Where<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the elements from `source` that satisfy the condition specified by `predicate`.

#### Examples
The following code example demonstrates how to use `Where<T>` to filter a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Where<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static System.Linq.IQueryable<TSource> Where<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int,bool>> predicate);
```

Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to filter.
- `predicate`: A function to test each element for a condition; the second parameter of the function represents the index of the element in the source sequence.

Returns: An `IQueryable<T>` that contains elements from the input sequence that satisfy the condition specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Where<T>` method generates a `MethodCallExpression` that represents calling `Where<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Where<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the elements from `source` that satisfy the condition specified by `predicate`. The index of each source element is provided as the second argument to `predicate`.

#### Examples
The following code example demonstrates how to use `Where<T>` to filter a sequence based on a predicate that incorporates the index of each element.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Zip<TFirst,TSecond>(IQueryable<TFirst>, IEnumerable<TSecond>) method

```csharp
public static System.Linq.IQueryable<(TFirst First, TSecond Second)> Zip<TFirst,TSecond> (this System.Linq.IQueryable<TFirst> source1, System.Collections.Generic.IEnumerable<TSecond> source2);
```

Produces a sequence of tuples with elements from the two specified sequences.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `source1`: The first sequence to merge.
- `source2`: The second sequence to merge.

Returns: A sequence of tuples with elements taken from the first and second sequences, in that order.

To be added.

## Queryable.Zip<TFirst,TSecond,TResult>(IQueryable<TFirst>, IEnumerable<TSecond>, Func<TFirst,TSecond,TResult>>) method

```csharp
public static System.Linq.IQueryable<TResult> Zip<TFirst,TSecond,TResult> (this System.Linq.IQueryable<TFirst> source1, System.Collections.Generic.IEnumerable<TSecond> source2, System.Linq.Expressions.Expression<Func<TFirst,TSecond,TResult>> resultSelector);
```

Merges two sequences by using the specified predicate function.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TResult`: The type of the elements of the result sequence.
- `source1`: The first sequence to merge.
- `source2`: The second sequence to merge.
- `resultSelector`: A function that specifies how to merge the elements from the two sequences.

Returns: An `IQueryable<T>` that contains merged elements of two input sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Queryable.Zip` method generates a `MethodCallExpression` that represents calling `Queryable.Zip` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source1` parameter.

The method merges each element of the first sequence with an element that has the same index in the second sequence. If the sequences do not have the same number of elements, the method merges sequences until it reaches the end of one of them. For example, if one sequence has three elements and the other one has four, the resulting sequence will have only three elements.

#### Examples
The following code example demonstrates how to use the `Queryable.Zip` method to merge two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Zip<TFirst,TSecond,TThird>(IQueryable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>) method

```csharp
public static System.Linq.IQueryable<(TFirst First, TSecond Second, TThird Third)> Zip<TFirst,TSecond,TThird> (this System.Linq.IQueryable<TFirst> source1, System.Collections.Generic.IEnumerable<TSecond> source2, System.Collections.Generic.IEnumerable<TThird> source3);
```

Produces a sequence of tuples with elements from the three specified sequences.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TThird`: The type of the elements of the third input sequence.
- `source1`: The first sequence to merge.
- `source2`: The second sequence to merge.
- `source3`: The third sequence to merge.

Returns: A sequence of tuples with elements taken from the first, second and third sequences, in that order.

To be added.
