---
title: "Enumerable class (part 6 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 6 of 24)

## Enumerable.ExceptBy<TSource,TKey>(IEnumerable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> ExceptBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TKey> second, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Produces the set difference of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequence.
- `TKey`: The type of key to identify elements by.
- `first`: An `IEnumerable<T>` whose keys that are not also in `second` will be returned.
- `second`: An `IEnumerable<T>` whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the set difference of the elements of two sequences.

To be added.

## Enumerable.First<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource First<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the first element of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IEnumerable<T>` to return the first element of.

Returns: The first element in the specified sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The source sequence is empty.

#### Remarks
The `First<T>` method throws an exception if `source` contains no elements. To instead return a default value when the source sequence is empty, use the `Enumerable.FirstOrDefault` method.

#### Examples
The following code example demonstrates how to use `First<T>` to return the first element of an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.First<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static TSource First<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns the first element in a sequence that satisfies a specified condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: The first element in the sequence that passes the test in the specified predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: No element satisfies the condition in `predicate`.

-or-

The source sequence is empty.

#### Remarks
The `First<T>` method throws an exception if no matching element is found in `source`. To instead return a default value when no matching element is found, use the `Enumerable.FirstOrDefault` method.

#### Examples
The following code example demonstrates how to use `First<T>` to return the first element of an array that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.FirstOrDefault<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource? FirstOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the first element of a sequence, or a default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IEnumerable<T>` to return the first element of.

Returns: `default`(`TSource`) if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The default value for reference and nullable types is `null`.

The `Enumerable.FirstOrDefault` method does not provide a way to specify a default value. If you want to specify a default value other than `default(TSource)`, use the `DefaultIfEmpty<T>` method as described in the Example section.

#### Examples
The following code example demonstrates how to use `FirstOrDefault<T>` on an empty array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

Sometimes the value of `default(TSource)` is not the default value that you want to use if the collection contains no elements. Instead of checking the result for the unwanted default value and then changing it if necessary, you can use the `DefaultIfEmpty<T>` method to specify the default value that you want to use if the collection is empty. Then, call `First<T>` to obtain the first element. The following code example uses both techniques to obtain a default value of 1 if a collection of numeric months is empty. Because the default value for an integer is 0, which does not correspond to any month, the default value must be specified as 1 instead. The first result variable is checked for the unwanted default value after the query has finished executing. The second result variable is obtained by using `DefaultIfEmpty<T>` to specify a default value of 1.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.FirstOrDefault<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static TSource? FirstOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.

Returns: `default`(`TSource`) if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
The default value for reference and nullable types is `null`.

#### Examples
The following code example demonstrates how to use `FirstOrDefault<T>` by passing in a predicate. In the second call to the method, there is no element in the array that satisfies the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.FirstOrDefault<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static TSource FirstOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource defaultValue);
```

Returns the first element of a sequence, or a specified default value if the sequence contains no elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The `IEnumerable<T>` to return the first element of.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if `source` is empty; otherwise, the first element in `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

To be added.

## Enumerable.FirstOrDefault<TSource>(IEnumerable<TSource>, Boolean>, TSource) method

```csharp
public static TSource FirstOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate, TSource defaultValue);
```

Returns the first element of the sequence that satisfies a condition, or a specified default value if no such element is found.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `predicate`: A function to test each element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: `defaultValue` if `source` is empty or if no element passes the test specified by `predicate`; otherwise, the first element in `source` that passes the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

To be added.

## Enumerable.FullJoin<TOuter,TInner,TKey>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<(TOuter? Outer, TInner? Inner)> FullJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

To be added.

Parameters:

- `TOuter`: To be added.
- `TInner`: To be added.
- `TKey`: To be added.
- `outer`: To be added.
- `inner`: To be added.
- `outerKeySelector`: To be added.
- `innerKeySelector`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## Enumerable.FullJoin<TOuter,TInner,TKey,TResult>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, Func<TOuter,TInner,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> FullJoin<TOuter,TInner,TKey,TResult> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, Func<TOuter?,TInner?,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
```

To be added.

Parameters:

- `TOuter`: To be added.
- `TInner`: To be added.
- `TKey`: To be added.
- `TResult`: To be added.
- `outer`: To be added.
- `inner`: To be added.
- `outerKeySelector`: To be added.
- `innerKeySelector`: To be added.
- `resultSelector`: To be added.
- `comparer`: To be added.

Returns: To be added.

To be added.

## Enumerable.GroupBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Groups the elements of a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.

Returns: An `IEnumerable<IGrouping<TKey, TSource>>` in C# or `IEnumerable(Of IGrouping(Of TKey, TSource))` in Visual Basic where each `IGrouping<T1,T2>` object contains a sequence of objects and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

> **Note:**
>  For examples of `GroupBy`, see the following articles:
>
> - `GroupBy<T1,T2,T3>`
> - `GroupBy<T1,T2,T3>`
> - `GroupBy<T1,T2,T3,T4>`

The `GroupBy<T1,T2>` method returns a collection of `IGrouping<T1,T2>` objects, one for each distinct key that was encountered. An `IGrouping<T1,T2>` is an `IEnumerable<T>` that also has a key <example-value> with its elements.

The `IGrouping<T1,T2>` objects are yielded in an order based on the order of the elements in `source` that produced the first key of each `IGrouping<T1,T2>`. Elements in a grouping are yielded in the order they appear in `source`.

The default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

In query expression syntax, a `group by` (C#) or `Group By Into` (Visual Basic) clause translates to an invocation of `Enumerable.GroupBy`. For more information and usage examples, see group clause and Group By Clause.

## Enumerable.GroupBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TKey,TSource>> GroupBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and compares the keys by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IEnumerable<IGrouping<TKey, TSource>>` in C# or `IEnumerable(Of IGrouping(Of TKey, TSource))` in Visual Basic where each `IGrouping<T1,T2>` object contains a collection of objects and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

> **Note:**
>  For examples of `GroupBy`, see the following articles:
>
> - `GroupBy<T1,T2,T3>`
> - `GroupBy<T1,T2,T3>`
> - `GroupBy<T1,T2,T3,T4>`

The `GroupBy<T1,T2>` method returns a collection of `IGrouping<T1,T2>` objects, one for each distinct key that was encountered. An `IGrouping<T1,T2>` is an `IEnumerable<T>` that also has a key <example-value> with its elements.

The `IGrouping<T1,T2>` objects are yielded in an order based on the order of the elements in `source` that produced the first key of each `IGrouping<T1,T2>`. Elements in a grouping are yielded in the order they appear in `source`.

If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

If two keys are considered equal according to `comparer`, the first key is chosen as the key for that grouping.

In query expression syntax, a `group by` (C#) or `Group By Into` (Visual Basic) clause translates to an invocation of `Enumerable.GroupBy`. For more information and usage examples, see group clause and Group By Clause.
