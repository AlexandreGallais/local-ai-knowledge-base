---
title: "Enumerable class (part 2 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 2 of 24)

## Enumerable.Any<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static bool Any<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Determines whether any element of a sequence satisfies a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` whose elements to apply the predicate to.
- `predicate`: A function to test each element for a condition.

Returns: `true` if the source sequence is not empty and at least one of its elements passes the test in the specified predicate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.

#### Remarks

> **Note:**
>  This method does not return any one element of a collection. Instead, it determines whether any elements of a collection satisfy a condition.

The enumeration of `source` is stopped as soon as the result can be determined.

In Visual Basic query expression syntax, an `Aggregate Into Any()` clause translates to an invocation of `Enumerable.Any`.

#### Examples
The following code example demonstrates how to use `Enumerable.Any` to determine whether any element in a sequence satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Append<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Append<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource element);
```

Appends a value to the end of the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values.
- `element`: The value to append to `source`.

Returns: A new sequence that ends with `element`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

> **Note:**
>  This method does not modify the elements of the collection. Instead, it creates a copy of the collection with the new element.

#### Examples
The following code example demonstrates how to use `Enumerable.Append` to append a value to the end of the sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.AsEnumerable<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> AsEnumerable<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the input typed as `IEnumerable<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to type as `IEnumerable<T>`.

Returns: The input sequence typed as `IEnumerable<T>`.

#### Remarks
The `AsEnumerable<T>` method has no effect other than to change the compile-time type of `source` from a type that implements `IEnumerable<T>` to `IEnumerable<T>` itself.

`AsEnumerable<T>` can be used to choose between query implementations when a sequence implements `IEnumerable<T>` but also has a different set of public query methods available. For example, given a generic class `Table` that implements `IEnumerable<T>` and has its own methods such as `Where`, `Select`, and `SelectMany`, a call to `Where` would invoke the public `Where` method of `Table`. A `Table` type that represents a database table could have a `Where` method that takes the predicate argument as an expression tree and converts the tree to SQL for remote execution. If remote execution is not desired, for example because the predicate invokes a local method, the `Enumerable.AsEnumerable` method can be used to hide the custom methods and instead make the standard query operators available.

#### Examples
The following code example demonstrates how to use `AsEnumerable<T>` to hide a type's custom `Where` method when the standard query operator implementation is desired.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average(Decimal>) method

```csharp
public static decimal Average (this System.Collections.Generic.IEnumerable<decimal> source);
```

Computes the average of a sequence of `Decimal` values.

Parameters:

- `source`: A sequence of `Decimal` values to calculate the average of.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Double>) method

```csharp
public static double Average (this System.Collections.Generic.IEnumerable<double> source);
```

Computes the average of a sequence of `Double` values.

Parameters:

- `source`: A sequence of `Double` values to calculate the average of.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
If the sum of the elements is too large to represent as a `Double`, this method returns positive or negative infinity.

In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Int32>) method

```csharp
public static double Average (this System.Collections.Generic.IEnumerable<int> source);
```

Computes the average of a sequence of `Int32` values.

Parameters:

- `source`: A sequence of `Int32` values to calculate the average of.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average(Int64>) method

```csharp
public static double Average (this System.Collections.Generic.IEnumerable<long> source);
```

Computes the average of a sequence of `Int64` values.

Parameters:

- `source`: A sequence of `Int64` values to calculate the average of.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Decimal>>) method

```csharp
public static decimal? Average (this System.Collections.Generic.IEnumerable<decimal?> source);
```

Computes the average of a sequence of nullable `Decimal` values.

Parameters:

- `source`: A sequence of nullable `Decimal` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Double>>) method

```csharp
public static double? Average (this System.Collections.Generic.IEnumerable<double?> source);
```

Computes the average of a sequence of nullable `Double` values.

Parameters:

- `source`: A sequence of nullable `Double` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
If the sum of the elements is too large to represent as a `Double`, this method returns positive or negative infinity.

In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Int32>>) method

```csharp
public static double? Average (this System.Collections.Generic.IEnumerable<int?> source);
```

Computes the average of a sequence of nullable `Int32` values.

Parameters:

- `source`: A sequence of nullable `Int32` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Int64>>) method

```csharp
public static double? Average (this System.Collections.Generic.IEnumerable<long?> source);
```

Computes the average of a sequence of nullable `Int64` values.

Parameters:

- `source`: A sequence of nullable `Int64` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average(Single>>) method

```csharp
public static float? Average (this System.Collections.Generic.IEnumerable<float?> source);
```

Computes the average of a sequence of nullable `Single` values.

Parameters:

- `source`: A sequence of nullable `Single` values to calculate the average of.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average(Single>) method

```csharp
public static float Average (this System.Collections.Generic.IEnumerable<float> source);
```

Computes the average of a sequence of `Single` values.

Parameters:

- `source`: A sequence of `Single` values to calculate the average of.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

## Enumerable.Average<TSource>(IEnumerable<TSource>, Decimal>) method

```csharp
public static decimal Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal> selector);
```

Computes the average of a sequence of `Decimal` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values that are used to calculate an average.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Double>) method

```csharp
public static double Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double> selector);
```

Computes the average of a sequence of `Double` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Int32>) method

```csharp
public static double Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int> selector);
```

Computes the average of a sequence of `Int32` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `InvalidOperationException`: `source` contains no elements.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
