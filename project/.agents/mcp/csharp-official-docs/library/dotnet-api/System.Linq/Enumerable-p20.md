---
title: "Enumerable class (part 20 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 20 of 24)

## Enumerable.Sum(Single>) method

```csharp
public static float Sum (this System.Collections.Generic.IEnumerable<float> source);
```

Computes the sum of a sequence of `Single` values.

Parameters:

- `source`: A sequence of `Single` values to calculate the sum of.

Returns: The sum of the values in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method returns zero if `source` contains no elements.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum` to sum the values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Decimal>) method

```csharp
public static decimal Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal> selector);
```

Computes the sum of the sequence of `Decimal` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Decimal`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Double>) method

```csharp
public static double Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double> selector);
```

Computes the sum of the sequence of `Double` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Double`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Int32>) method

```csharp
public static int Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int> selector);
```

Computes the sum of the sequence of `Int32` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Int32`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Int64>) method

```csharp
public static long Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long> selector);
```

Computes the sum of the sequence of `Int64` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks

This method returns zero if `source` contains no elements.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Int64`.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Decimal>>) method

```csharp
public static decimal? Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal?> selector);
```

Computes the sum of the sequence of nullable `Decimal` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Decimal>` in C# or `Nullable(Of Decimal)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Double>>) method

```csharp
public static double? Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double?> selector);
```

Computes the sum of the sequence of nullable `Double` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Double.MaxValue">Double.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Double>` in C# or `Nullable(Of Double)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Int32>>) method

```csharp
public static int? Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int?> selector);
```

Computes the sum of the sequence of nullable `Int32` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Int32>` in C# or `Nullable(Of Int32)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Int64>>) method

```csharp
public static long? Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long?> selector);
```

Computes the sum of the sequence of nullable `Int64` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Int64>` in C# or `Nullable(Of Int64)` in Visual Basic

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Sum<TSource>(IEnumerable<TSource>, Single>>) method

```csharp
public static float? Sum<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float?> selector);
```

Computes the sum of the sequence of nullable `Single` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate a sum.
- `selector`: A transform function to apply to each element.

Returns: The sum of the projected values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks

Items in `source` that are `null` are excluded from the computation of the sum. This method returns zero if `source` contains no elements or all elements are `null`.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Nullable<Single>` in C# or `Nullable(Of Single)` in Visual Basic.

In Visual Basic query expression syntax, an `Aggregate Into Sum()` clause translates to an invocation of `Enumerable.Sum`.

#### Examples
The following code example demonstrates how to use `Sum<T>` to sum the projected values of a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
