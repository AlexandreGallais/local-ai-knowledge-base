---
title: "Enumerable class (part 3 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 3 of 24)

## Enumerable.Average<TSource>(IEnumerable<TSource>, Int64>) method

```csharp
public static double Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long> selector);
```

Computes the average of a sequence of `Int64` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of source.
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

## Enumerable.Average<TSource>(IEnumerable<TSource>, Decimal>>) method

```csharp
public static decimal? Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,decimal?> selector);
```

Computes the average of a sequence of nullable `Decimal` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Decimal.MaxValue">Decimal.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Double>>) method

```csharp
public static double? Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,double?> selector);
```

Computes the average of a sequence of nullable `Double` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Int32>>) method

```csharp
public static double? Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,int?> selector);
```

Computes the average of a sequence of nullable `Int32` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.
- `OverflowException`: The sum of the elements in the sequence is larger than <see cref="F:System.Int64.MaxValue">Int64.MaxValue</see>.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Int64>>) method

```csharp
public static double? Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,long?> selector);
```

Computes the average of a sequence of nullable `Int64` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Single>>) method

```csharp
public static float? Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float?> selector);
```

Computes the average of a sequence of nullable `Single` values that are obtained by invoking a transform function on each element of the input sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to calculate the average of.
- `selector`: A transform function to apply to each element.

Returns: The average of the sequence of values, or `null` if the source sequence is empty or contains only values that are `null`.

Exceptions:

- `ArgumentNullException`: `source` or `selector` is `null`.

#### Remarks
In Visual Basic query expression syntax, an `Aggregate Into Average()` clause translates to an invocation of `Enumerable.Average`.

#### Examples
The following code example demonstrates how to use `Average<T>` to calculate an average.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Average<TSource>(IEnumerable<TSource>, Single>) method

```csharp
public static float Average<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,float> selector);
```

Computes the average of a sequence of `Single` values that are obtained by invoking a transform function on each element of the input sequence.

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

## Enumerable.Cast<TResult>(IEnumerable) method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Cast<TResult> (this System.Collections.IEnumerable source);
```

Casts the elements of an `IEnumerable` to the specified type.

Parameters:

- `TResult`: The type to cast the elements of `source` to.
- `source`: The `IEnumerable` that contains the elements to be cast to type `TResult`.

Returns: An `IEnumerable<T>` that contains each element of the source sequence cast to the specified type.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidCastException`: An element in the sequence cannot be cast to type `TResult`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `Cast<T>` method enables the standard query operators to be invoked on non-generic collections by supplying the necessary type information. For example, `ArrayList` does not implement `IEnumerable<T>`, but by calling `Cast<T>` on the `ArrayList` object, the standard query operators can then be used to query the sequence.

If an element cannot be converted to type `TResult`, this method throws a `InvalidCastException`.

The source sequence for this method is `IEnumerable`, which means the elements have the compile-time static type of `object`. The only type conversions that are performed by this method are reference conversions and unboxing conversions. The runtime type of the elements in the collection must match the target type, or in the case of value types, the runtime type of elements must be the result of a boxing conversion of the target type. Other conversion types, such as those between different numeric types, are not allowed.

To obtain only those elements that can be converted to type `TResult`, use the `Enumerable.OfType` method instead of `Cast<T>`.

In a query expression, an explicitly typed iteration variable translates to an invocation of `Cast<T>`. This example shows the syntax for an explicitly typed range variable.

```csharp
from int i in objects
```

```vb
From i As Integer In objects
```

Use the `select` clause of a query to perform other conversion types, like the implicit numeric conversions. The following example uses both the `Cast` method and a `select` statement to convert a sequence of boxed integers to a sequence of doubles.

```csharp
IEnumerable sequence = Enumerable.Range(0, 10);
var doubles = from int item in sequence
                select (double)item;
```

```vb
Dim sequence As IEnumerable = Enumerable.Range(0, 10)
Dim doubles = From item As Integer In sequence
                Select CType(item, Double)
```

#### Examples
The following code example demonstrates how to use `Cast<T>` to enable the use of the standard query operators on an `ArrayList`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Chunk<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource[]> Chunk<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int size);
```

Splits the elements of a sequence into chunks of size at most `size`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` whose elements to chunk.
- `size`: The maximum size of each chunk.

Returns: An `IEnumerable<T>` that contains the elements the input sequence split into chunks of size `size`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `size` is below 1.

#### Remarks

Each chunk except the last one will be of size `size`. The last chunk will contain the remaining elements and may be of a smaller size.

## Enumerable.Concat<TSource>(IEnumerable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Concat<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

Concatenates two sequences.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: The first sequence to concatenate.
- `second`: The sequence to concatenate to the first sequence.

Returns: An `IEnumerable<T>` that contains the concatenated elements of the two input sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `Concat<T>` method differs from the `Enumerable.Union` method because the `Concat<T>` method returns all the original elements in the input sequences. The `Enumerable.Union` method returns only unique elements.

#### Examples
The following code example demonstrates how to use `Concat<T>` to concatenate two sequences.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

An alternative way of concatenating two sequences is to construct a collection, for example an array, of sequences and then apply the `Enumerable.SelectMany` method, passing it the identity selector function. The following example demonstrates this use of `Enumerable.SelectMany`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._
