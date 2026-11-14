---
title: "Enumerable class (part 11 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 11 of 24)

## Enumerable.Max(Double>) method

```csharp
public static double Max (this System.Collections.Generic.IEnumerable<double> source);
```

Returns the maximum value in a sequence of `Double` values.

Parameters:

- `source`: A sequence of `Double` values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max` method uses the `Double` implementation of `IComparable<T>` to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max(Int32>) method

```csharp
public static int Max (this System.Collections.Generic.IEnumerable<int> source);
```

Returns the maximum value in a sequence of `Int32` values.

Parameters:

- `source`: A sequence of `Int32` values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max` method uses the `Int32` implementation of `IComparable<T>` to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max(Int64>) method

```csharp
public static long Max (this System.Collections.Generic.IEnumerable<long> source);
```

Returns the maximum value in a sequence of `Int64` values.

Parameters:

- `source`: A sequence of `Int64` values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max` method uses the `Int64` implementation of `IComparable<T>` to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max` to determine the maximum value in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max(Decimal>>) method

```csharp
public static decimal? Max (this System.Collections.Generic.IEnumerable<decimal?> source);
```

Returns the maximum value in a sequence of nullable `Decimal` values.

Parameters:

- `source`: A sequence of nullable `Decimal` values to determine the maximum value of.

Returns: A value of type `Nullable<Decimal>` in C# or `Nullable(Of Decimal)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Max` method uses the `Decimal` implementation of `IComparable<T>` to compare values.

If the source sequence is empty or contains only values that are `null`, this function returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max(Double>>) method

```csharp
public static double? Max (this System.Collections.Generic.IEnumerable<double?> source);
```

Returns the maximum value in a sequence of nullable `Double` values.

Parameters:

- `source`: A sequence of nullable `Double` values to determine the maximum value of.

Returns: A value of type `Nullable<Double>` in C# or `Nullable(Of Double)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Max` method uses the `Double` implementation of `IComparable<T>` to compare values.

If the source sequence is empty or contains only values that are `null`, this function returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max` to determine the maximum value in a sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max(Int32>>) method

```csharp
public static int? Max (this System.Collections.Generic.IEnumerable<int?> source);
```

Returns the maximum value in a sequence of nullable `Int32` values.

Parameters:

- `source`: A sequence of nullable `Int32` values to determine the maximum value of.

Returns: A value of type `Nullable<Int32>` in C# or `Nullable(Of Int32)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Max` method uses the `Int32` implementation of `IComparable<T>` to compare values.

If the source sequence is empty or contains only values that are `null`, this function returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max(Int64>>) method

```csharp
public static long? Max (this System.Collections.Generic.IEnumerable<long?> source);
```

Returns the maximum value in a sequence of nullable `Int64` values.

Parameters:

- `source`: A sequence of nullable `Int64` values to determine the maximum value of.

Returns: A value of type `Nullable<Int64>` in C# or `Nullable(Of Int64)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Max` method uses the `Int64` implementation of `IComparable<T>` to compare values.

If the source sequence is empty or contains only values that are `null`, this function returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max(Single>>) method

```csharp
public static float? Max (this System.Collections.Generic.IEnumerable<float?> source);
```

Returns the maximum value in a sequence of nullable `Single` values.

Parameters:

- `source`: A sequence of nullable `Single` values to determine the maximum value of.

Returns: A value of type `Nullable<Single>` in C# or `Nullable(Of Single)` in Visual Basic that corresponds to the maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
The `Max` method uses the `Single` implementation of `IComparable<T>` to compare values.

If the source sequence is empty or contains only values that are `null`, this function returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max(Single>) method

```csharp
public static float Max (this System.Collections.Generic.IEnumerable<float> source);
```

Returns the maximum value in a sequence of `Single` values.

Parameters:

- `source`: A sequence of `Single` values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max` method uses the `Single` implementation of `IComparable<T>` to compare values.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the maximum value in a generic sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No object in `source` implements the `IComparable` or `IComparable<T>` interface.

#### Remarks
If type `TSource` implements `IComparable<T>`, the `Max<T>` method uses that implementation to compare values. Otherwise, if type `TSource` implements `IComparable`, that implementation is used to compare values.

If `TSource` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of `IComparable<T>` objects.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, IComparer<TSource>) method

```csharp
public static TSource? Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, System.Collections.Generic.IComparer<TSource>? comparer);
```

Returns the maximum value in a generic sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `comparer`: The `IComparer<T>` to compare values.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentException`: No object in `source` implements the `IComparable` or `IComparable<T>` interface.

#### Remarks

If type `TSource` implements `IComparable<T>`, the `Max<T>` method uses that implementation to compare values. Otherwise, if type `TSource` implements `IComparable`, that implementation is used to compare values.

If `TSource` is a reference type and the source sequence is empty or contains only values that are `null`, this method returns `null`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

## Enumerable.Max<TSource>(IEnumerable<TSource>, Decimal>) method

```csharp
public static decimal Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum `Decimal` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max<T>` method uses the `Decimal` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Decimal`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Double>) method

```csharp
public static double Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum `Double` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max<T>` method uses the `Double` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Double`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Max<TSource>(IEnumerable<TSource>, Int32>) method

```csharp
public static int Max<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int> selector);
```

Invokes a transform function on each element of a sequence and returns the maximum `Int32` value.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to determine the maximum value of.
- `selector`: A transform function to apply to each element.

Returns: The maximum value in the sequence.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
The `Max<T>` method uses the `Int32` implementation of `IComparable<T>` to compare values.

You can apply this method to a sequence of arbitrary values if you provide a function, `selector`, that projects the members of `source` into a numeric type, specifically `Int32`.

In Visual Basic query expression syntax, an `Aggregate Into Max()` clause translates to an invocation of `Enumerable.Max`.

#### Examples
The following code example demonstrates how to use `Max<T>` to determine the maximum value in a sequence of projected values.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
