---
title: "Enumerable class (part 19 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 19 of 24)

## Enumerable.Skip<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Skip<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int count);
```

Bypasses a specified number of elements in a sequence and then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return elements from.
- `count`: The number of elements to skip before returning the remaining elements.

Returns: An `IEnumerable<T>` that contains the elements that occur after the specified index in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

If `source` contains fewer than `count` elements, an empty `IEnumerable<T>` is returned. If `count` is less than or equal to zero, all elements of `source` are yielded.

The `Enumerable.Take` and `Enumerable.Skip` methods are functional complements. Given a collection sequence `coll` and an integer `n`, concatenating the results of `coll.Take(n)` and `coll.Skip(n)` yields the same sequence as `coll`.

In Visual Basic query expression syntax, a `Skip` clause translates to an invocation of `Enumerable.Skip`.

#### Examples
The following code example demonstrates how to use `Enumerable.Skip` to skip a specified number of elements in an array and return the remaining elements.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SkipLast<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> SkipLast<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int count);
```

Returns a new enumerable collection that contains the elements from `source` with the last `count` elements of the source collection omitted.

Parameters:

- `TSource`: The type of the elements in the enumerable collection.
- `source`: An enumerable collection instance.
- `count`: The number of elements to omit from the end of the collection.

Returns: A new enumerable collection that contains the elements from `source` minus `count` elements from the end of the collection.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

If `count` is not a positive number, this method returns an identical copy of the `source` enumerable collection.

## Enumerable.SkipWhile<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> SkipWhile<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return elements from.
- `predicate`: A function to test each element for a condition.

Returns: An `IEnumerable<T>` that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
The `SkipWhile<T>` method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

This method tests each element of `source` by using `predicate` and skips the element if the result is `true`. After the predicate function returns `false` for an element, that element and the remaining elements in `source` are yielded and there are no more invocations of `predicate`.

If `predicate` returns `true` for all elements in the sequence, an empty `IEnumerable<T>` is returned.

The `Enumerable.TakeWhile` and `Enumerable.SkipWhile` methods are functional complements. Given a collection sequence `coll` and a pure function `p`, concatenating the results of `coll.TakeWhile(p)` and `coll.SkipWhile(p)` yields the same sequence as `coll`.

In Visual Basic query expression syntax, a `Skip While` clause translates to an invocation of `Enumerable.SkipWhile`.

#### Examples
The following code example demonstrates how to use `SkipWhile<T>` to skip elements of an array as long as a condition is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SkipWhile<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> SkipWhile<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int,bool> predicate);
```

Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return elements from.
- `predicate`: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.

Returns: An `IEnumerable<T>` that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by `predicate`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `SkipWhile<T>` method tests each element of `source` by using `predicate` and skips the element if the result is `true`. After the predicate function returns `false` for an element, that element and the remaining elements in `source` are yielded and there are no more invocations of `predicate`.

If `predicate` returns `true` for all elements in the sequence, an empty `IEnumerable<T>` is returned.

The first argument of `predicate` represents the element to test. The second argument represents the zero-based index of the element within `source`.

The `Enumerable.TakeWhile` and `Enumerable.SkipWhile` methods are functional complements. Given a collection sequence `coll` and a pure function `p`, concatenating the results of `coll.TakeWhile(p)` and `coll.SkipWhile(p)` yields the same sequence as `coll`.

In Visual Basic query expression syntax, a `Skip While` clause translates to an invocation of `Enumerable.SkipWhile`.

#### Examples
The following code example demonstrates how to use `SkipWhile<T>` to skip elements of an array as long as a condition that depends on the element's index is true.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum(Decimal>) method

```csharp
public static decimal Sum (this System.Collections.Generic.IEnumerable<decimal> source);
```

Computes the sum of a sequence of `Decimal` values.

Parameters:

- `source`: A sequence of `Decimal` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks

The `Sum` method returns zero if `source` contains no elements.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Double>) method

```csharp
public static double Sum (this System.Collections.Generic.IEnumerable<double> source);
```

Computes the sum of a sequence of `Double` values.

Parameters:

- `source`: A sequence of `Double` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Int32>) method

```csharp
public static int Sum (this System.Collections.Generic.IEnumerable<int> source);
```

Computes the sum of a sequence of `Int32` values.

Parameters:

- `source`: A sequence of `Int32` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Int64>) method

```csharp
public static long Sum (this System.Collections.Generic.IEnumerable<long> source);
```

Computes the sum of a sequence of `Int64` values.

Parameters:

- `source`: A sequence of `Int64` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Decimal>>) method

```csharp
public static decimal? Sum (this System.Collections.Generic.IEnumerable<decimal?> source);
```

Computes the sum of a sequence of nullable `Decimal` values.

Parameters:

- `source`: A sequence of nullable `Decimal` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Double>>) method

```csharp
public static double? Sum (this System.Collections.Generic.IEnumerable<double?> source);
```

Computes the sum of a sequence of nullable `Double` values.

Parameters:

- `source`: A sequence of nullable `Double` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Int32>>) method

```csharp
public static int? Sum (this System.Collections.Generic.IEnumerable<int?> source);
```

Computes the sum of a sequence of nullable `Int32` values.

Parameters:

- `source`: A sequence of nullable `Int32` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Int64>>) method

```csharp
public static long? Sum (this System.Collections.Generic.IEnumerable<long?> source);
```

Computes the sum of a sequence of nullable `Int64` values.

Parameters:

- `source`: A sequence of nullable `Int64` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

## Enumerable.Sum(Single>>) method

```csharp
public static float? Sum (this System.Collections.Generic.IEnumerable<float?> source);
```

Computes the sum of a sequence of nullable `Single` values.

Parameters:

- `source`: A sequence of nullable `Single` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum` to sum the values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
