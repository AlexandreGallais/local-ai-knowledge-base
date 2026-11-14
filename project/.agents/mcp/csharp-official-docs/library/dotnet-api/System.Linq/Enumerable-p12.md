---
title: "Enumerable class (part 12 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 12 of 24)

## Enumerable.Max<TSource>(IEnumerable<TSource>, Int64>) method

```csharp
public static long Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum `Int64` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max<T>` method uses the `Int64` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Int64`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Decimal>>) method

```csharp
public static decimal? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal?> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum nullable `Decimal` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The value of type `Nullable<Decimal>` in C# or `Nullable(Of Decimal)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
The `Max<T>` method uses the `Decimal` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Decimal>` in C# or `Nullable(Of Decimal)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Double>>) method

```csharp
public static double? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double?> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum nullable `Double` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The value of type `Nullable<Double>` in C# or `Nullable(Of Double)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
The `Max<T>` method uses the `Double` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Double>` in C# or `Nullable(Of Double)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Int32>>) method

```csharp
public static int? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int?> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum nullable `Int32` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The value of type `Nullable<Int32>` in C# or `Nullable(Of Int32)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
The `Max<T>` method uses the `Int32` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Int32>` in C# or `Nullable(Of Int32)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Int64>>) method

```csharp
public static long? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long?> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum nullable `Int64` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Max<T>` method uses the `Int64` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Int64>` in C# or `Nullable(Of Int64)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples

The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Single>>) method

```csharp
public static float? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float?> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum nullable `Single` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The value that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

The `Max<T>` method uses the `Single` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Single>` in C# or `Nullable(Of Single)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples

The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Single>) method

```csharp
public static float Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum `Single` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks

The `Max<T>` method uses the `Single` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Single`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples

The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource,TResult>(IEnumerable<TSource>, Func<TSource,TResult>) method

```csharp
public static TResult? Max<TSource,TResult> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TResult> selector);
```

Invokes a transform function on each element of a generic sequence and returns the maximum resulting value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TResult`: The type of the value returned by `selector`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

If type `TResult` implements `IComparable<T>`, this method uses that implementation to compare values. Otherwise, if type `TResult` implements `IComparable`, that implementation is used to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples

The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.MaxBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static TSource? MaxBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Returns the maximum value in a generic sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.
- `InvalidOperationException`: `TSource` is a primitive type and the source sequence is empty.

If the source sequence is empty, two possible outcomes are possible depending on the source type. If `TSource` is a nullable type, this method returns `null`. If `TSource` is a non-nullable struct, such as a primitive type, an `InvalidOperationException` is thrown.

If the source sequence contains only values that are `null`, this method returns `null`.

#### Examples

The following code example demonstrates how to use `MaxBy` to find the maximum value in a collection based on a specific property.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/MaxBy/enumerable.cs._
## Enumerable.MaxBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IComparer<TKey>) method

```csharp
public static TSource? MaxBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IComparer<TKey>? comparer);
```

Returns the maximum value in a generic sequence according to a specified key <example-value> function and key comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to compare elements by.
- `source`: A sequence of values to determine the maximum value of.
- `keySelector`: A function to extract the key for each element.
- `comparer`: The `IComparer<T>` to compare keys.

Returns: The value with the maximum key in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No key <example-value> from `source` implements the `IComparable` or `IComparable<T>` interface.
- `InvalidOperationException`: `TSource` is a primitive type and the source sequence is empty.

If the source sequence is empty, two possible outcomes are possible depending on the source type. If `TSource` is a nullable type, this method returns `null`. If `TSource` is a non-nullable struct, such as a primitive type, an `InvalidOperationException` is thrown.

If the source sequence contains only values that are `null`, this method returns `null`.

#### Examples

The following code example demonstrates how to use `MaxBy` with a custom comparer to ignore case sensitivity when checking for the maximum value.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/MaxBy/enumerable.cs._
## Enumerable.Min(Decimal>) method

```csharp
public static decimal Min (this System.Collections.Generic.IEnumerable<decimal> source);
```

Returns the minimum value in a sequence of `Decimal` values.

Parameters:

- `source`: A sequence of `Decimal` values to determine the minimum value of.

Returns: The minimum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks

The `Min` method uses the `Decimal` implementation of `IComparable<T>` to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Min()` clause translates to an invocation of `Enumerable.Min`.
