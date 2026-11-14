---
title: "Queryable class (part 5 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 5 of 20)

## Queryable.Count<TSource>(IQueryable<TSource>) method

```csharp
public static int Count<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the number of elements in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` that contains the elements to be counted.

Returns: The number of elements in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The number of elements in `source` is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `Count<T>` method generates a `MethodCallExpression` that represents calling `Count<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Count<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it counts the number of items in `source`.

#### Examples
The following code example demonstrates how to use `Count<T>` to count the elements in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Count<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static int Count<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the number of elements in the specified sequence that satisfies a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` that contains the elements to be counted.
- `predicate`: A function to test each element for a condition.

Returns: The number of elements in the sequence that satisfies the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `OverflowException`: The number of elements in `source` is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `Count<T>` method generates a `MethodCallExpression` that represents calling `Count<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Count<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it counts the number of items in `source` that satisfy the condition specified by `predicate`.

#### Examples
The following code example demonstrates how to use `Count<T>` to count the elements in a sequence that satisfy a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.CountBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<System.Collections.Generic.KeyValuePair<TKey,int>> CountBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

Returns the count of each element from a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to count elements from.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IQueryable<T>` that contains count for each distinct elements from the source sequence as a `KeyValuePair<T1,T2>` object.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.DefaultIfEmpty<TSource>(IQueryable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource?> DefaultIfEmpty<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` to return a default value for if empty.

Returns: An `IQueryable<T>` that contains `default`(`TSource`) if `source` is empty; otherwise, `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `DefaultIfEmpty<T>` method generates a `MethodCallExpression` that represents calling `DefaultIfEmpty<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `DefaultIfEmpty<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns `source` if it is not empty. Otherwise, it returns an `IQueryable<T>` that contains `default(TSource)`.

#### Examples
The following code examples demonstrate how to use `DefaultIfEmpty<T>` to provide a default value in case the source sequence is empty.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.DefaultIfEmpty<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static System.Linq.IQueryable<TSource> DefaultIfEmpty<TSource> (this System.Linq.IQueryable<TSource> source, TSource defaultValue);
```

Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` to return the specified value for if empty.
- `defaultValue`: The value to return if the sequence is empty.

Returns: An `IQueryable<T>` that contains `defaultValue` if `source` is empty; otherwise, `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `DefaultIfEmpty<T>` method generates a `MethodCallExpression` that represents calling `DefaultIfEmpty<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `DefaultIfEmpty<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns `source` if it is not empty. Otherwise, it returns an `IQueryable<T>` that contains `defaultValue`.

#### Examples
The following code example shows a situation in which it is useful to call `DefaultIfEmpty<T>` in a LINQ query. A default value is passed to `DefaultIfEmpty<T>` in this example.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Distinct<TSource>(IQueryable<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Distinct<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns distinct elements from a sequence by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` to remove duplicates from.

Returns: An `IQueryable<T>` that contains distinct elements from `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Distinct<T>` method generates a `MethodCallExpression` that represents calling `Distinct<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Distinct<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns an unordered sequence of the unique items in `source`.

#### Examples
The following code example demonstrates how to use `Distinct<T>` to return distinct elements from a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Distinct<TSource>(IQueryable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Linq.IQueryable<TSource> Distinct<TSource> (this System.Linq.IQueryable<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Returns distinct elements from a sequence by using a specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IQueryable<T>` to remove duplicates from.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: An `IQueryable<T>` that contains distinct elements from `source`.

Exceptions:

- `ArgumentNullException`: `source` or `comparer` is `null`.

#### Remarks
The `Distinct<T>` method generates a `MethodCallExpression` that represents calling `Distinct<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Distinct<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns an unordered sequence of the unique items in `source` by using `comparer` to compare values.

## Queryable.DistinctBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IQueryable<TSource> DistinctBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Returns distinct elements from a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to remove duplicate elements from.
- `keySelector`: A function to extract the key for each element.

Returns: An `IQueryable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.DistinctBy<TSource,TKey>(IQueryable<TSource>, Func<TSource,TKey>>, IEqualityComparer<TKey>) method

```csharp
public static System.Linq.IQueryable<TSource> DistinctBy<TSource,TKey> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Returns distinct elements from a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to remove duplicate elements from.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IQueryable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Queryable.ElementAt<TSource>(IQueryable<TSource>, Index) method

```csharp
public static TSource ElementAt<TSource> (this System.Linq.IQueryable<TSource> source, Index index);
```

Returns the element at a specified index in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the start or the end.

Returns: The element at the specified position in the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the bounds of the `source` sequence.

To be added.

## Queryable.ElementAt<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static TSource ElementAt<TSource> (this System.Linq.IQueryable<TSource> source, int index);
```

Returns the element at a specified index in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `index`: The zero-based index of the element to retrieve.

Returns: The element at the specified position in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero.

#### Remarks
The `ElementAt<T>` method generates a `MethodCallExpression` that represents calling `ElementAt<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `ElementAt<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the item at position `index` in `source`.

#### Examples
The following code example demonstrates how to use `ElementAt<T>` to return an element at a specific position in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.ElementAtOrDefault<TSource>(IQueryable<TSource>, Index) method

```csharp
public static TSource? ElementAtOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, Index index);
```

Returns the element at a specified index in a sequence or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the start or the end.

Returns: `default` if `index` is outside the bounds of the `source` sequence; otherwise, the element at the specified position in the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.
