---
title: "Enumerable class (part 7 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 7 of 24)

## Enumerable.GroupBy<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector);
```

Groups the elements of a sequence according to a specified key <example-value> function and projects the elements for each group by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in the `IGrouping<T1,T2>`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in the `IGrouping<T1,T2>`.

Returns: An `IEnumerable<IGrouping<TKey, TElement>>` in C# or `IEnumerable(Of IGrouping(Of TKey, TElement))` in Visual Basic where each `IGrouping<T1,T2>` object contains a collection of objects of type `TElement` and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `GroupBy<T1,T2,T3>` method returns a collection of `IGrouping<T1,T2>` objects, one for each distinct key that was encountered. An `IGrouping<T1,T2>` is an `IEnumerable<T>` that also has a key <example-value> with its elements.

The `IGrouping<T1,T2>` objects are yielded in an order based on the order of the elements in `source` that produced the first key of each `IGrouping<T1,T2>`. Elements in a grouping are yielded in the order that the elements that produced them appear in `source`.

The default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2,T3>` to group the elements of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

In query expression syntax, a `group by` (C#) or `Group By Into` (Visual Basic) clause translates to an invocation of `Enumerable.GroupBy`. The translation of the query expression in the following example is equivalent to the query in the example above.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

> **Note:**
>  In a C# or Visual Basic query expression, the element and key <example-value> expressions occur in the reverse order from their argument positions in a call to the `GroupBy<T1,T2,T3>` method.

## Enumerable.GroupBy<TSource,TKey,TElement>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TKey,TElement>> GroupBy<TSource,TKey,TElement> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a key <example-value> function. The keys are compared by using a comparer and each group's elements are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in the `IGrouping<T1,T2>`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IEnumerable<IGrouping<TKey, TElement>>` in C# or `IEnumerable(Of IGrouping(Of TKey, TElement))` in Visual Basic where each `IGrouping<T1,T2>` object contains a collection of objects of type `TElement` and a key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

> **Note:**
>  For examples of `GroupBy`, see the following articles:
>
> - `GroupBy<T1,T2,T3>`
> - `GroupBy<T1,T2,T3>`
> - `GroupBy<T1,T2,T3,T4>`

The `GroupBy<T1,T2,T3>` method returns a collection of `IGrouping<T1,T2>` objects, one for each distinct key that was encountered. An `IGrouping<T1,T2>` is an `IEnumerable<T>` that also has a key <example-value> with its elements.

The `IGrouping<T1,T2>` objects are yielded in an order based on the order of the elements in `source` that produced the first key of each `IGrouping<T1,T2>`. Elements in a grouping are yielded in the order that the elements that produced them appear in `source`.

If `comparer` is `null`, the default equality comparer `EqualityComparer<T>.Default` is used to compare keys.

If two keys are considered equal according to `comparer`, the first key is chosen as the key for that grouping.

In query expression syntax, a `group by` (C#) or `Group By Into` (Visual Basic) clause translates to an invocation of `Enumerable.GroupBy`. For more information and usage examples, see group clause and Group By Clause.

## Enumerable.GroupBy<TSource,TKey,TResult>(IEnumerable<TSource>, Func<TSource,TKey>, IEnumerable<TSource>,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> GroupBy<TSource,TKey,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult> resultSelector);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.

Returns: A collection of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `resultSelector` is `null`.

#### Remarks
In query expression syntax, a `group by` (C#) or `Group By Into` (Visual Basic) clause translates to an invocation of `Enumerable.GroupBy`.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2,T3>` to group the elements of a sequence and project a sequence of results of type `TResult`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.GroupBy<TSource,TKey,TResult>(IEnumerable<TSource>, Func<TSource,TKey>, IEnumerable<TSource>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> GroupBy<TSource,TKey,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TKey,System.Collections.Generic.IEnumerable<TSource>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. The keys are compared by using a specified comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: A collection of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `resultSelector` is `null`.

To be added.

## Enumerable.GroupBy<TSource,TKey,TElement,TResult>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEnumerable<TElement>,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult> resultSelector);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. The elements of each group are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `resultSelector`: A function to create a result value from each group.

Returns: A collection of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `resultSelector` is `null`.

#### Remarks
In query expression syntax, a `group by` (C#) or `Group By Into` (Visual Basic) clause translates to an invocation of `Enumerable.GroupBy`.

#### Examples
The following code example demonstrates how to use `GroupBy<T1,T2,T3,T4>` to group the projected elements of a sequence and then project a sequence of results of type `TResult`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.GroupBy<TSource,TKey,TElement,TResult>(IEnumerable<TSource>, Func<TSource,TKey>, Func<TSource,TElement>, IEnumerable<TElement>,TResult>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> GroupBy<TSource,TKey,TElement,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, Func<TSource,TElement> elementSelector, Func<TKey,System.Collections.Generic.IEnumerable<TElement>,TResult> resultSelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Groups the elements of a sequence according to a specified key <example-value> function and creates a result value from each group and its key. Key <example-value> are compared by using a specified comparer, and the elements of each group are projected by using a specified function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `TElement`: The type of the elements in each `IGrouping<T1,T2>`.
- `TResult`: The type of the result value returned by `resultSelector`.
- `source`: An `IEnumerable<T>` whose elements to group.
- `keySelector`: A function to extract the key for each element.
- `elementSelector`: A function to map each source element to an element in an `IGrouping<T1,T2>`.
- `resultSelector`: A function to create a result value from each group.
- `comparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: A collection of elements of type `TResult` where each element represents a projection over a group and its key.

Exceptions:

- `ArgumentNullException`: `source` or `keySelector` or `elementSelector` or `resultSelector` is `null`.

To be added.

## Enumerable.GroupJoin<TOuter,TInner,TKey>(IEnumerable<TOuter>, IEnumerable<TInner>, Func<TOuter,TKey>, Func<TInner,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Linq.IGrouping<TOuter,TInner>> GroupJoin<TOuter,TInner,TKey> (this System.Collections.Generic.IEnumerable<TOuter> outer, System.Collections.Generic.IEnumerable<TInner> inner, Func<TOuter,TKey> outerKeySelector, Func<TInner,TKey> innerKeySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer = default);
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
