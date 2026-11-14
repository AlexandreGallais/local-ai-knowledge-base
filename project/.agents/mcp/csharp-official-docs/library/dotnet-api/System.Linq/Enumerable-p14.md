---
title: "Enumerable class (part 14 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 14 of 24)

## Enumerable.Min<TSource>(IEnumerable<TSource>, Decimal>>) method

```csharp
public static decimal? Min<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal?> selector);
```

Invokes a transform function on each element of a sequence and returns the minimum nullable `Decimal` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Min<T>` method uses the `Decimal` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Decimal>` in C# or `Nullable(Of Decimal)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Min<TSource>(IEnumerable<TSource>, Double>>) method

```csharp
public static double? Min<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double?> selector);
```

Invokes a transform function on each element of a sequence and returns the minimum nullable `Double` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Min<T>` method uses the `Double` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Double>` in C# or `Nullable(Of Double)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Min<TSource>(IEnumerable<TSource>, Int32>>) method

```csharp
public static int? Min<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int?> selector);
```

Invokes a transform function on each element of a sequence and returns the minimum nullable `Int32` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Min<T>` method uses the `Int32` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of source into a numeric type, specifically `Nullable<Int32>` in C# or `Nullable(Of Int32)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Min<TSource>(IEnumerable<TSource>, Int64>>) method

```csharp
public static long? Min<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long?> selector);
```

Invokes a transform function on each element of a sequence and returns the minimum nullable `Int64` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Min<T>` method uses the `Int64` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Int64>` in C# or `Nullable(Of Int64)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Min<TSource>(IEnumerable<TSource>, Single>>) method

```csharp
public static float? Min<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float?> selector);
```

Invokes a transform function on each element of a sequence and returns the minimum nullable `Single` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Min<T>` method uses the `Single` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Single>` in C# or `Nullable(Of Single)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Min<TSource>(IEnumerable<TSource>, Single>) method

```csharp
public static float Min<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float> selector);
```

Invokes a transform function on each element of a sequence and returns the minimum `Single` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks

The `Min<T>` method uses the `Single` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Single`.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Min<TSource,TResult>(IEnumerable<TSource>, Func<TSource,TResult>) method

```csharp
public static TResult? Min<TSource,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TResult> selector);
```

Invokes a transform function on each element of a generic sequence and returns the minimum resulting value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by `selector`.
- `source`: A sequence of values to determine the minimum value of.
- `selector`: A transform function to apply to each element.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

If type `TResult` implements `IComparable<T>`, this method uses that implementation to compare values. Otherwise, if type `TResult` implements `IComparable`, that implementation is used to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.

#### Examples

The following code example demonstrates how to use `Min<T>` to determine the minimum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.MinBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static TSource? MinBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Returns the minimum value in a generic sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.
- `InvalidOperationException`: `TSource` is a primitive type and the source sequence is empty.

If the source sequence is empty, two possible outcomes are possible depending on the source type. If `TSource` is a nullable type, this method returns `null`. If `TSource` is a non-nullable struct, such as a primitive type, an `InvalidOperationException` is thrown.

If the source sequence contains only values that are `null`, this method returns `null`.

#### Examples

The following code example demonstrates how to use `MinBy` to find the minimum value in a collection based on a specific property.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/MinBy/enumerable.cs._
## Enumerable.MinBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static TSource? MinBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Returns the minimum value in a generic sequence according to a specified key <example-value> function and key comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the minimum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.

Returns: The value with the minimum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.
- `InvalidOperationException`: `TSource` is a primitive type and the source sequence is empty.

If the source sequence is empty, two possible outcomes are possible depending on the source type. If `TSource` is a nullable type, this method returns `null`. If `TSource` is a non-nullable struct, such as a primitive type, an `InvalidOperationException` is thrown.

If the source sequence contains only values that are `null`, this method returns `null`.

#### Examples

The following code example demonstrates how to use `MinBy` with a custom comparer to ignore case sensitivity when checking for the minimum value.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/MinBy/enumerable.cs._
## Enumerable.OfType<TResult>(IEnumerable) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> OfType<TResult> (this System.Collections.IEnumerable source);
```

Filters the elements of an `IEnumerable` based on a specified type.

Parameters:

- `TResult`: The type to filter the elements of the sequence on.
- `source`: The `IEnumerable` whose elements to filter.

Returns: An `IEnumerable<T>` that contains elements from the input sequence of type `TResult`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `OfType<T>` method returns only those elements in `source` that are non-null and compatible with type `TResult`. To receive an exception if an element cannot be cast to type `TResult`, use `Cast<T>`.

This method is one of the few standard query operator methods that can be applied to a collection that has a non-parameterized type, such as an `ArrayList`. This is because `Enumerable.OfType` extends the type `IEnumerable`. `Enumerable.OfType` cannot only be applied to collections that are based on the parameterized `IEnumerable<T>` type, but collections that are based on the non-parameterized `IEnumerable` type also.

By applying `Enumerable.OfType` to a collection that implements `IEnumerable`, you gain the ability to query the collection by using the standard query operators. For example, specifying a type argument of `Object` to `Enumerable.OfType` would return an object of type `IEnumerable<Object>` in C# or `IEnumerable(Of Object)` in Visual Basic, to which the standard query operators can be applied.

#### Examples
The following code example demonstrates how to use `Enumerable.OfType` to filter the elements of an `IEnumerable`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
