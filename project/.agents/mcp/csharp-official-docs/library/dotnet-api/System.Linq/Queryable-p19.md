---
title: "Queryable class (part 19 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 19 of 20)

## Queryable.TakeLast<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static System.Linq.IQueryable<TSource> TakeLast<TSource> (this System.Linq.IQueryable<TSource> source, int count);
```

Returns a new queryable sequence that contains the last `count` elements from `source`.

Parameters:

- `TSource`: The type of the elements in the queryable sequence.
- `source`: A queryable sequence instance.
- `count`: The number of elements to take from the end of the queryable sequence.

Returns: A new queryable sequence that contains the last `count` elements from `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

If `count` is not a positive number, this method returns an empty queryable sequence.

## Queryable.TakeWhile<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static System.Linq.IQueryable<TSource> TakeWhile<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns elements from a sequence as long as a specified condition is true.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IQueryable<T>` that contains elements from the input sequence occurring before the element at which the test specified by `predicate` no longer passes.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `TakeWhile<T>` method generates a `MethodCallExpression` that represents calling `TakeWhile<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `TakeWhile<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it applies `predicate` to each element in `source` until it finds an element for which `predicate` returns `false`. It returns all the elements up until that point.

#### Examples
The following code example demonstrates how to use `TakeWhile<T>` to return elements from the start of a sequence as long as a condition is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.TakeWhile<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static System.Linq.IQueryable<TSource> TakeWhile<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int,bool>> predicate);
```

Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return elements from.
- `predicate`: A function to test each element for a condition; the second parameter of the function represents the index of the element in the source sequence.

Returns: An `IQueryable<T>` that contains elements from the input sequence occurring before the element at which the test specified by `predicate` no longer passes.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `TakeWhile<T>` method generates a `MethodCallExpression` that represents calling `TakeWhile<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `TakeWhile<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it applies `predicate` to each element in `source` until it finds an element for which `predicate` returns `false`. It returns all the elements up until that point. The index of each source element is provided as the second argument to `predicate`.

#### Examples
The following code example demonstrates how to use `TakeWhile<T>` to return elements from the start of a sequence as long as a condition that uses the index of the element is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.ThenBy<TSource,TKey>(IOrderedQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> ThenBy<TSource,TKey> (this System.Linq.IOrderedQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented by `keySelector`.
- `source`: An `IOrderedQueryable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.

Returns: An `IOrderedQueryable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `ThenBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `ThenBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `ThenBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it performs a secondary sort of the elements of `source` based on the key <example-value> by invoking `keySelector` on each element of `source`. All previously established sort orders are preserved.

#### Examples
The following code example demonstrates how to use `ThenBy<T1,T2>` to perform a secondary ordering of the elements in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.ThenBy<TSource,TKey>(IOrderedQueryable<TSource>, Func<TSource,TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> ThenBy<TSource,TKey> (this System.Linq.IOrderedQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Performs a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented by `keySelector`.
- `source`: An `IOrderedQueryable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: An `IOrderedQueryable<T>` whose elements are sorted according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `ThenBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `ThenBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `ThenBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it performs a secondary sort of the elements of `source` based on the key <example-value> by invoking `keySelector` on each element of `source`. All previously established sort orders are preserved. The `comparer` parameter is used to compare key values.

## Queryable.ThenByDescending<TSource,TKey>(IOrderedQueryable<TSource>, Func<TSource,TKey>>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> ThenByDescending<TSource,TKey> (this System.Linq.IOrderedQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector);
```

Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by the function represented by `keySelector`.
- `source`: An `IOrderedQueryable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.

Returns: An `IOrderedQueryable<T>` whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `ThenByDescending<T1,T2>` method generates a `MethodCallExpression` that represents calling `ThenByDescending<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `ThenByDescending<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it performs a secondary sort of the elements of `source` in descending order, based on the key <example-value> by invoking `keySelector` on each element of `source`. All previously established sort orders are preserved.

## Queryable.ThenByDescending<TSource,TKey>(IOrderedQueryable<TSource>, Func<TSource,TKey>>, IComparer<TKey>) method

```csharp
public static System.Linq.IOrderedQueryable<TSource> ThenByDescending<TSource,TKey> (this System.Linq.IOrderedQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,TKey>> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key that is returned by the `keySelector` function.
- `source`: An `IOrderedQueryable<T>` that contains elements to sort.
- `keySelector`: A function to extract a key from each element.
- `comparer`: An `IComparer<T>` to compare keys.

Returns: A collection whose elements are sorted in descending order according to a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `comparer` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `ThenBy<T1,T2>` method generates a `MethodCallExpression` that represents calling `ThenBy<T1,T2>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter. The result of calling `CreateQuery<T>` is cast to type `IOrderedQueryable<T>` and returned.

The query behavior that occurs as a result of executing an expression tree that represents calling `ThenBy<T1,T2>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it performs a secondary sort of the elements of `source` in descending order, based on the key <example-value> by invoking `keySelector` on each element of `source`. All previously established sort orders are preserved. The `comparer` parameter is used to compare key values.

#### Examples
The following code example demonstrates how to use `ThenByDescending<T1,T2>` to perform a secondary ordering of the elements in a sequence in descending order by using a custom comparer.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._
