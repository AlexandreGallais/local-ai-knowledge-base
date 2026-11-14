---
title: "Queryable class (part 6 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 6 of 20)

## Queryable.ElementAtOrDefault<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static TSource? ElementAtOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, int index);
```

Returns the element at a specified index in a sequence or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `index`: The zero-based index of the element to retrieve.

Returns: `default`(`TSource`) if `index` is outside the bounds of `source`; otherwise, the element at the specified position in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `ElementAtOrDefault<T>` method generates a `MethodCallExpression` that represents calling `ElementAtOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `ElementAtOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the item at position `index` in `source`, or `default(TSource)` if `index` is outside the bounds of `source`.

#### Examples
The following code example demonstrates how to use `ElementAtOrDefault<T>`. This example uses a value for `index` that is outside the bounds of the source sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Except<TSource>(IQueryable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Except<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2);
```

Produces the set difference of two sequences by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: An `IQueryable<T>` whose elements that are not also in `source2` will be returned.
- `source2`: An `IEnumerable<T>` whose elements that also occur in the first sequence will not appear in the returned sequence.

Returns: An `IQueryable<T>` that contains the set difference of the two sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Except<T>` method generates a `MethodCallExpression` that represents calling `Except<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the`source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Except<T>` depends on the implementation of the type of  the `source1` parameter. The expected behavior is that all the elements in `source1` are returned except for those that are also in `source2`.

#### Examples
The following code example demonstrates how to use `Except<T>` to return those elements that only appear in the first source sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Except<TSource>(IQueryable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Except<TSource> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TSource> source2, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set difference of two sequences by using the specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `source1`: An `IQueryable<T>` whose elements that are not also in `source2` will be returned.
- `source2`: An `IEnumerable<T>` whose elements that also occur in the first sequence will not appear in the returned sequence.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: An `IQueryable<T>` that contains the set difference of the two sequences.

Exceptions:

- `ArgumentNullException`: `source1` or `source2` is `null`.

#### Remarks
The `Except<T>` method generates a `MethodCallExpression` that represents calling `Except<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the`source1` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Except<T>` depends on the implementation of the type of the `source1` parameter. The expected behavior is that all the elements in `source1` are returned except for those that are also in `source2`, and `comparer` is used to compare values.

## Queryable.ExceptBy<TSource,TKey>(IQueryable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IQueryable<TSource> ExceptBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TKey> source2, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Produces the set difference of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequence.
- `TKey`: The type of key to identify elements by.
- `source1`: An `IQueryable<T>` whose keys that are not also in `source2` will be returned.
- `source2`: An `IEnumerable<T>` whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `keySelector`: A function to extract the key for each element.

Returns: A `IQueryable<T>` that contains the set difference of the elements of two sequences.

To be added.

## Queryable.ExceptBy<TSource,TKey>(IQueryable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TSource> ExceptBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source1, System.Collections.Generic.IEnumerable<TKey> source2, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Produces the set difference of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequence.
- `TKey`: The type of key to identify elements by.
- `source1`: An `IQueryable<T>` whose keys that are not also in `source2` will be returned.
- `source2`: An `IEnumerable<T>` whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: A `IQueryable<T>` that contains the set difference of the elements of two sequences.

To be added.

## Queryable.First<TSource>(IQueryable<TSource>) method

```csharp
public static TSource First<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the first element of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` to return the first element of.

Returns: The first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The source sequence is empty.

#### Remarks
The `First<T>` method generates a `MethodCallExpression` that represents calling `First<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `First<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the first element in `source`.

#### Examples
The following code example demonstrates how to use `First<T>` to return the first element in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.First<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static TSource First<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the first element of a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: The first element in `source` that passes the test in `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: No element satisfies the condition in `predicate`.

-or-

The source sequence is empty.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `First<T>` method generates a `MethodCallExpression` that represents calling `First<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `First<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the first element in `source` that satisfies the condition specified by `predicate`.

#### Examples
The following code example demonstrates how to use `First<T>` to return the first element of a sequence that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.FirstOrDefault<TSource>(IQueryable<TSource>) method

```csharp
public static TSource? FirstOrDefault<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the first element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` to return the first element of.

Returns: `default`(`TSource`) if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `FirstOrDefault<T>` method generates a `MethodCallExpression` that represents calling `FirstOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `FirstOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the first element in `source`, or a default value if `source` is empty.

The `Queryable.FirstOrDefault` method does not provide a way to specify the default value to return if `source` is empty. If you want to specify a default value other than `default(TSource)`, use the `DefaultIfEmpty<T>` method as described in the Example section.

#### Examples
The following code example demonstrates how to use `FirstOrDefault<T>` on an empty sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

Sometimes the value of `default(TSource)` is not the default value that you want to use if the collection contains no elements. Instead of checking the result for the unwanted default value and then changing it if necessary, you can use the `DefaultIfEmpty<T>` method to specify the default value that you want to use if the collection is empty. Then, call `First<T>` to obtain the first element. The following code example uses both techniques to obtain a default value of 1 if a collection of numeric months is empty. Because the default value for an integer is 0, which does not correspond to any month, the default value must be specified as 1 instead. The first result variable is checked for the unwanted default value after the query is completed. The second result variable is obtained by calling `DefaultIfEmpty<T>` to specify a default value of 1.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.FirstOrDefault<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static TSource? FirstOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the first element of a sequence that satisfies a specified condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: `default`(`TSource`) if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `FirstOrDefault<T>` method generates a `MethodCallExpression` that represents calling `FirstOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `FirstOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the first element in `source` that satisfies the condition in `predicate`, or a default value if no element satisfies the condition.

#### Examples
The following code example demonstrates how to use `FirstOrDefault<T>` by passing in a predicate. In the second query, there is no element in the sequence that satisfies the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
