---
title: "Enumerable class (part 18 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 18 of 24)

## Enumerable.SequenceEqual<TSource>(IEnumerable<TSource>, IEnumerable<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` to compare to `second`.
- `second`: An `IEnumerable<T>` to compare to the first sequence.

Returns: `true` if the two source sequences are of equal length and their corresponding elements are equal according to the default equality comparer for their type; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
The `SequenceEqual<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` method enumerates the two source sequences in parallel and compares corresponding elements by using the default equality comparer for `TSource`, `EqualityComparer<T>.Default`.

The default equality comparer, `EqualityComparer<T>.Default`, is used to compare values of the types.
To compare a custom data type, you need to override the `Object.Equals` and the `Object.GetHashCode` methods, and optionally implement the `IEquatable<T>` generic interface in the custom type. For more information, see the `Default` property.

#### Examples
The following code examples demonstrate how to use `SequenceEqual<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` to determine whether two sequences are equal. In the first two examples, the method determines whether the compared sequences contain references to the same objects. In the third and fourth examples, the method compares the actual data of the objects within the sequences.

In this example the sequences are equal.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The following code example compares two sequences that are not equal. Note that the sequences contain identical data, but because the objects that they contain have different references, the sequences are not considered equal.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

If you want to compare the actual data of the objects in the sequences instead of just comparing their references, you have to implement the `IEqualityComparer<T>` generic interface in your class. The following code example shows how to implement this interface in a helper class and provide `Object.GetHashCode` and `Object.Equals` methods.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

After you implement this interface, you can use sequences of `ProductA` objects in the `SequenceEqual<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

## Enumerable.SequenceEqual<TSource>(IEnumerable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static bool SequenceEqual<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Determines whether two sequences are equal by comparing their elements by using a specified `IEqualityComparer<T>`.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` to compare to `second`.
- `second`: An `IEnumerable<T>` to compare to the first sequence.
- `comparer`: An `IEqualityComparer<T>` to use to compare elements.

Returns: `true` if the two source sequences are of equal length and their corresponding elements compare equal according to `comparer`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
The `SequenceEqual<T>` method enumerates the two source sequences in parallel and compares corresponding elements by using the specified `IEqualityComparer<T>`. If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare elements.

#### Examples
The following example shows how to implement an equality comparer that can be used in the `SequenceEqual<T>` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

After you implement this comparer, you can use sequences of `Product` objects in the `SequenceEqual<T>` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

## Enumerable.Shuffle<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Shuffle<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Shuffles the order of the elements of a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence of values to shuffle.

Returns: A sequence whose elements correspond to those of the input sequence in randomized order.

Randomization is performed using a non-cryptographically-secure random number generator.

## Enumerable.Single<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource Single<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the single element of.

Returns: The single element of the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

-or-

The input sequence is empty.

#### Remarks
The `Single<T>` method throws an exception if the input sequence is empty. To instead return `null` when the input sequence is empty, use `Enumerable.SingleOrDefault`.

#### Examples
The following code example demonstrates how to use `Single<T>` to select the only element of an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The following code example demonstrates that `Single<T>` throws an exception when the sequence does not contain exactly one element.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Single<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static TSource Single<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.

Returns: The single element of the input sequence that satisfies a condition.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: No element satisfies the condition in `predicate`.

-or-

More than one element satisfies the condition in `predicate`.

-or-

The source sequence is empty.

#### Remarks
The `Single<T>` method throws an exception if the input sequence contains no matching element. To instead return `null` when no matching element is found, use `Enumerable.SingleOrDefault`.

#### Examples
The following code example demonstrates how to use `Single<T>` to select the only element of an array that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The following code example demonstrates that `Single<T>` throws an exception when the sequence does not contain exactly one element that satisfies the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SingleOrDefault<TSource>(IEnumerable<TSource>) method

```csharp
public static TSource? SingleOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the single element of.

Returns: The single element of the input sequence, or `default`(`TSource`) if the sequence contains no elements.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

#### Remarks
The default value for reference and nullable types is `null`.

The `Enumerable.SingleOrDefault` method does not provide a way to specify a default value. If you want to specify a default value other than `default(TSource)`, use the `DefaultIfEmpty<T>` method as described in the Example section.

#### Examples
The following code example demonstrates how to use `SingleOrDefault<T>` to select the only element of an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The following code example demonstrates that `SingleOrDefault<T>` returns a default value when the sequence is empty.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

Sometimes the value of `default(TSource)` is not the default value that you want to use if the collection contains no elements. Instead of checking the result for the unwanted default value and then changing it if necessary, you can use the `DefaultIfEmpty<T>` method to specify the default value that you want to use if the collection is empty. Then, call `Single<T>` to obtain the element. The following code example uses both techniques to obtain a default value of 1 if a collection of page numbers is empty. Because the default value for an integer is 0, which is not usually a valid page number, the default value must be specified as 1 instead. The first result variable is checked for the unwanted default value after the query has finished executing. The second result variable is obtained by using `DefaultIfEmpty<T>` to specify a default value of 1.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SingleOrDefault<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static TSource? SingleOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.

Returns: The single element of the input sequence that satisfies the condition, or `default`(`TSource`) if no such element is found.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

#### Remarks
The default value for reference and nullable types is `null`.

#### Examples
The following code example demonstrates how to use `SingleOrDefault<T>` to select the only element of an array that satisfies a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The following code example demonstrates that `SingleOrDefault<T>` returns a default value when the sequence contains no elements that satisfy the condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.SingleOrDefault<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static TSource SingleOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource defaultValue);
```

Returns the only element of a sequence, or a specified default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return the single element of.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: The single element of the input sequence, or `defaultValue` if the sequence contains no elements.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `InvalidOperationException`: The input sequence contains more than one element.

To be added.

## Enumerable.SingleOrDefault<TSource>(IEnumerable<TSource>, Boolean>, TSource) method

```csharp
public static TSource SingleOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate, TSource defaultValue);
```

Returns the only element of a sequence that satisfies a specified condition, or a specified default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return a single element from.
- `predicate`: A function to test an element for a condition.
- `defaultValue`: The default value to return if the sequence is empty.

Returns: The single element of the input sequence that satisfies the condition, or `defaultValue` if no such element is found.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `InvalidOperationException`: More than one element satisfies the condition in `predicate`.

To be added.
