---
title: "Queryable class (part 16 of 20)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Queryable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Queryable class (part 16 of 20)

## Queryable.SingleOrDefault<TSource>(IQueryable<TSource>) method

```csharp
public static TSource? SingleOrDefault<TSource> (this System.Linq.IQueryable<TSource> source);
```

Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return the single element of.

Returns: The single element of the input sequence, or `default`(`TSource`) if the sequence contains no elements.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` has more than one element.

#### Remarks
The `SingleOrDefault<T>` method generates a `MethodCallExpression` that represents calling `SingleOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SingleOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the only element in `source`, or a default value if `source` is empty.

The `Queryable.SingleOrDefault` method does not provide a way to specify a default value. If you want to specify a default value other than `default(TSource)`, use the `DefaultIfEmpty<T>` method as described in the Example section.

#### Examples
The following code example demonstrates how to use `SingleOrDefault<T>` to select the only element of an array. The second query demonstrates that `SingleOrDefault<T>` returns a default value when the sequence does not contain exactly one element.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

Sometimes the value of `default(TSource)` is not the default value that you want to use if the collection contains no elements. Instead of checking the result for the unwanted default value and then changing it if necessary, you can use the `DefaultIfEmpty<T>` method to specify the default value that you want to use if the collection is empty. Then, call `Single<T>` to obtain the element. The following code example uses both techniques to obtain a default value of 1 if a collection of page numbers is empty. Because the default value for an integer is 0, which is not usually a valid page number, the default value must be specified as 1 instead. The first result variable is checked for the unwanted default value after the query is completed. The second result variable is obtained by calling `DefaultIfEmpty<T>` to specify a default value of 1.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SingleOrDefault<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static TSource? SingleOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.

Returns: The single element of the input sequence that satisfies the condition in `predicate`, or `default`(`TSource`) if no such element is found.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SingleOrDefault<T>` method generates a `MethodCallExpression` that represents calling `SingleOrDefault<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SingleOrDefault<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the only element in `source` that satisfies the condition specified by `predicate`, or a default value if no such element exists.

#### Examples
The following code example demonstrates how to use `SingleOrDefault<T>` to select the only element of an array that satisfies a condition. The second query demonstrates that `SingleOrDefault<T>` returns a default value when the sequence does not contain exactly one element that satisfies the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SingleOrDefault<TSource>(IQueryable<TSource>, TSource) method

```csharp
public static TSource SingleOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, TSource defaultValue);
```

Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the single element of.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: The single element of the input sequence, or `defaultValue` if the sequence contains no elements.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

To be added.

## Queryable.SingleOrDefault<TSource>(IQueryable<TSource>, Boolean>>, TSource) method

```csharp
public static TSource SingleOrDefault<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate, TSource defaultValue);
```

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: The single element of the input sequence that satisfies the condition, or `defaultValue` if no such element is found.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

To be added.

## Queryable.Skip<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static System.Linq.IQueryable<TSource> Skip<TSource> (this System.Linq.IQueryable<TSource> source, int count);
```

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return elements from.
- `count`: The number of elements to skip before returning the remaining elements.

Returns: An `IQueryable<T>` that contains elements that occur after the specified index in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Skip<T>` method generates a `MethodCallExpression` that represents calling `Skip<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Skip<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it skips the first `count` elements in `source` and returns the remaining elements.

#### Examples
The following code example demonstrates how to use `Skip<T>` to skip a specified number of elements in a sorted array and return the remaining elements.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SkipLast<TSource>(IQueryable<TSource>, Int32) method

```csharp
public static System.Linq.IQueryable<TSource> SkipLast<TSource> (this System.Linq.IQueryable<TSource> source, int count);
```

Returns a new queryable sequence that contains the elements from `source` with the last `count` elements of the source queryable sequence omitted.

Parameters:

- `TSource`: The type of the elements in the queryable sequence.
- `source`: A queryable sequence.
- `count`: The number of elements to omit from the end of the queryable sequence.

Returns: A new queryable sequence that contains the elements from `source` minus `count` elements from the end of the queryable sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

If `count` is not a positive number, this method returns an identical copy of the `source` queryable sequence.

## Queryable.SkipWhile<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static System.Linq.IQueryable<TSource> SkipWhile<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,bool>> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IQueryable<T>` that contains elements from `source` starting at the first element in the linear series that does not pass the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SkipWhile<T>` method generates a `MethodCallExpression` that represents calling `SkipWhile<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SkipWhile<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it applies `predicate` to each element in `source` until it finds an element for which `predicate` returns false. That element and all the remaining elements are returned.

#### Examples
The following code example demonstrates how to use `SkipWhile<T>` to skip elements of an array as long as a condition is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.SkipWhile<TSource>(IQueryable<TSource>, Boolean>>) method

```csharp
public static System.Linq.IQueryable<TSource> SkipWhile<TSource> (this System.Linq.IQueryable<TSource> source, System.Linq.Expressions.Expression<Func<TSource,int,bool>> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IQueryable<T>` to return elements from.
- `predicate`: A function to test each element for a condition; the second parameter of this function represents the index of the source element.

Returns: An `IQueryable<T>` that contains elements from `source` starting at the first element in the linear series that does not pass the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method has at least one parameter of type `Expression<T>` whose type argument is one of the `Func<T1,T2>` types. For these parameters, you can pass in a lambda expression and it will be compiled to an `Expression<T>`.

The `SkipWhile<T>` method generates a `MethodCallExpression` that represents calling `SkipWhile<T>` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `CreateQuery` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `SkipWhile<T>` depends on the implementation of the type of the `source` parameter. The expected behavior is that it applies `predicate` to each element in `source` until it finds an element for which `predicate` returns false. That element and all the remaining elements are returned. The index of each source element is provided as the second argument to `predicate`.

#### Examples
The following code example demonstrates how to use `SkipWhile<T>` to skip elements of an array as long as a condition that depends on the element's index is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Queryable/AggregateTSource/queryable.cs._

## Queryable.Sum(Decimal>) method

```csharp
public static decimal Sum (this System.Linq.IQueryable<decimal> source);
```

Computes the sum of a sequence of `Decimal` values.

Parameters:

- `source`: A sequence of `Decimal` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
The `Sum` method generates a `MethodCallExpression` that represents calling `Sum` itself as a constructed generic method. It then passes the `MethodCallExpression` to the `Execute<T>` method of the `IQueryProvider` represented by the `Provider` property of the `source` parameter.

The query behavior that occurs as a result of executing an expression tree that represents calling `Sum` depends on the implementation of the type of the `source` parameter. The expected behavior is that it returns the sum of the values in `source`.
