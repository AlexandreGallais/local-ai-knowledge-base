---
title: "Enumerable class (part 24 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 24 of 24)

## Enumerable.Union<TSource>(IEnumerable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Union<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set union of two sequences by using a specified `IEqualityComparer<T>`.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IEnumerable<T>` whose distinct elements form the second set for the union.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: An `IEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

When the object returned by this method is enumerated, `Enumerable.Union` enumerates `first` and `second` in that order and yields each element that has not already been yielded.

The `Enumerable.Concat` method differs from the `Enumerable.Union` method because the `Enumerable.Concat` method returns all the elements in the input sequences including duplicates, whereas `Enumerable.Union` returns only unique values.

#### Examples
The following example shows how to implement an equality comparer that can be used in the `Enumerable.Union` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

After you implement this comparer, you can use sequences of `Product` objects in the `Enumerable.Union` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

## Enumerable.UnionBy<TSource,TKey>(IEnumerable<TSource>, IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> UnionBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, Func<TSource,TKey> keySelector);
```

Produces the set union of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IEnumerable<T>` whose distinct elements form the second set for the union.
- `keySelector`: A function to extract the key for each element.

Returns: An `IEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `Default`, is used to compare values.

When the object returned by this method is enumerated, `Enumerable.UnionBy` enumerates `first` and `second` in that order and yields each element that has not already been yielded.

#### Examples

The following example demonstrates how to use `UnionBy` to merge two collections of objects while excluding duplicates based on a specific property.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/UnionBy/enumerable.cs._
## Enumerable.UnionBy<TSource,TKey>(IEnumerable<TSource>, IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> UnionBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Produces the set union of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `TKey`: The type of key to identify elements by.
- `first`: An `IEnumerable<T>` whose distinct elements form the first set for the union.
- `second`: An `IEnumerable<T>` whose distinct elements form the second set for the union.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IEqualityComparer<T>` to compare values.

Returns: An `IEnumerable<T>` that contains the elements from both input sequences, excluding duplicates.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `comparer` is `null`, the default equality comparer, `Default`, is used to compare values.

When the object returned by this method is enumerated, `Enumerable.UnionBy` enumerates `first` and `second` in that order and yields each element that has not already been yielded.

#### Examples

The following example demonstrates how to use `UnionBy` to merge two collections while using a custom comparer to ignore case sensitivity when checking for duplicate keys.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/UnionBy/enumerable.cs._
## Enumerable.Where<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Where<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Filters a sequence of values based on a predicate.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to filter.
- `predicate`: A function to test each element for a condition.

Returns: An `IEnumerable<T>` that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

In query expression syntax, a `where` (C#) or `Where` (Visual Basic) clause translates to an invocation of `Where<T>`.

#### Examples
The following code example demonstrates how to use `Where<T>` to filter a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Where<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Where<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int,bool> predicate);
```

Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to filter.
- `predicate`: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.

Returns: An `IEnumerable<T>` that contains elements from the input sequence that satisfy the condition.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The first argument of `predicate` represents the element to test. The second argument represents the zero-based index of the element within `source`.

#### Examples
The following code example demonstrates how to use `Where<T>` to filter a sequence based on a predicate that involves the index of each element.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Zip<TFirst,TSecond>(IEnumerable<TFirst>, IEnumerable<TSecond>) method

```csharp
public static System.Collections.Generic.IEnumerable<(TFirst First, TSecond Second)> Zip<TFirst,TSecond> (this System.Collections.Generic.IEnumerable<TFirst> first, System.Collections.Generic.IEnumerable<TSecond> second);
```

Produces a sequence of tuples with elements from the two specified sequences.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.

Returns: A sequence of tuples with elements taken from the first and second sequences, in that order.

To be added.

## Enumerable.Zip<TFirst,TSecond,TResult>(IEnumerable<TFirst>, IEnumerable<TSecond>, Func<TFirst,TSecond,TResult>) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Zip<TFirst,TSecond,TResult> (this System.Collections.Generic.IEnumerable<TFirst> first, System.Collections.Generic.IEnumerable<TSecond> second, Func<TFirst,TSecond,TResult> resultSelector);
```

Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TResult`: The type of the elements of the result sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.
- `resultSelector`: A function that specifies how to merge the elements from the two sequences.

Returns: An `IEnumerable<T>` that contains merged elements of two input sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The method merges each element of the first sequence with an element that has the same index in the second sequence. If the sequences do not have the same number of elements, the method merges sequences until it reaches the end of one of them. For example, if one sequence has three elements and the other one has four, the result sequence will have only three elements.

#### Examples
The following code example demonstrates how to use the `Enumerable.Zip` method to merge two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Zip<TFirst,TSecond,TThird>(IEnumerable<TFirst>, IEnumerable<TSecond>, IEnumerable<TThird>) method

```csharp
public static System.Collections.Generic.IEnumerable<(TFirst First, TSecond Second, TThird Third)> Zip<TFirst,TSecond,TThird> (this System.Collections.Generic.IEnumerable<TFirst> first, System.Collections.Generic.IEnumerable<TSecond> second, System.Collections.Generic.IEnumerable<TThird> third);
```

Produces a sequence of tuples with elements from the three specified sequences.

Parameters:

- `TFirst`: The type of the elements of the first input sequence.
- `TSecond`: The type of the elements of the second input sequence.
- `TThird`: The type of the elements of the third input sequence.
- `first`: The first sequence to merge.
- `second`: The second sequence to merge.
- `third`: The third sequence to merge.

Returns: A sequence of tuples with elements taken from the first, second, and third sequences, in that order.

To be added.
