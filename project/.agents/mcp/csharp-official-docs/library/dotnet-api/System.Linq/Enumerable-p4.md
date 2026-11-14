---
title: "Enumerable class (part 4 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 4 of 24)

## Enumerable.Contains<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static bool Contains<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource value);
```

Determines whether a sequence contains a specified element by using the default equality comparer.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence in which to locate a value.
- `value`: The value to locate in the sequence.

Returns: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
If the type of `source` implements `ICollection<T>`, the `Contains` method in that implementation is invoked to obtain the result. Otherwise, this method determines whether `source` contains the specified element.

Enumeration is terminated as soon as a matching element is found.

Elements are compared to the specified value by using the default equality comparer, `EqualityComparer<T>.Default`.

#### Examples
The following code example demonstrates how to use `Contains<T>` to determine whether an array contains a specific element.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Contains<TSource>(IEnumerable<TSource>, TSource, IEqualityComparer<TSource>) method

```csharp
public static bool Contains<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource value, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Determines whether a sequence contains a specified element by using a specified `IEqualityComparer<T>`.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence in which to locate a value.
- `value`: The value to locate in the sequence.
- `comparer`: An equality comparer to compare values.

Returns: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
Enumeration is terminated as soon as a matching element is found.

If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare elements to the specified value.

#### Examples
The following example shows how to implement an equality comparer that can be used in the `Enumerable.Contains` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

After you implement this comparer, you can use a sequence of `Product` objects in the `Enumerable.Contains` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

## Enumerable.Count<TSource>(IEnumerable<TSource>) method

```csharp
public static int Count<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the number of elements in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be counted.

Returns: The number of elements in the input sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `OverflowException`: The number of elements in `source` is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the type of `source` implements `ICollection<T>`, that implementation is used to obtain the count of elements. Otherwise, this method determines the count.

Use the `Enumerable.LongCount` method when you expect and want to allow the result to be greater than `MaxValue`.

In Visual Basic query expression syntax, an `Aggregate Into Count()` clause translates to an invocation of `Enumerable.Count`.

#### Examples
The following code example demonstrates how to use `Count<T>` to count the elements in an array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Count<TSource>(IEnumerable<TSource>, Boolean>) method

```csharp
public static int Count<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,bool> predicate);
```

Returns a number that represents how many elements in the specified sequence satisfy a condition.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: A sequence that contains elements to be tested and counted.
- `predicate`: A function to test each element for a condition.

Returns: A number that represents how many elements in the sequence satisfy the condition in the predicate function.

Exceptions:

- `ArgumentNullException`: `source` or `predicate` is `null`.
- `OverflowException`: The number of elements in `source` is larger than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the type of `source` implements `ICollection<T>`, that implementation is used to obtain the count of elements. Otherwise, this method determines the count.

You should use the `Enumerable.LongCount` method when you expect and want to allow the result to be greater than `MaxValue`.

In Visual Basic query expression syntax, an `Aggregate Into Count()` clause translates to an invocation of `Enumerable.Count`.

#### Examples
The following code example demonstrates how to use `Count<T>` to count the elements in an array that satisfy a condition.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.CountBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,int>> CountBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? keyComparer = default);
```

Returns the count of elements in the source sequence grouped by key.

Parameters:

- `TSource`: The type of elements of `source`.
- `TKey`: The type of the key <example-value> by `keySelector`.
- `source`: A sequence that contains elements to be counted.
- `keySelector`: A function to extract the key for each element.
- `keyComparer`: An `IEqualityComparer<T>` to compare keys with.

Returns: An enumerable containing the frequencies of each key <example-value> in `source`.

#### Examples

The following code example demonstrates how to use `CountBy` to calculate the number of employees in each department.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/CountBy/enumerable.cs._
## Enumerable.DefaultIfEmpty<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource?> DefaultIfEmpty<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return a default value for if it is empty.

Returns: An `IEnumerable<T>` object that contains the default value for the `TSource` type if `source` is empty; otherwise, `source`.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default value for reference and nullable types is `null`.

This method can be used to produce a left outer join when it is combined with the `Enumerable.GroupJoin` method.

#### Examples
The following code examples demonstrate how to use `DefaultIfEmpty<T>` to provide a default value in case the source sequence is empty.

This example uses a non-empty sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

This example uses an empty sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.DefaultIfEmpty<TSource>(IEnumerable<TSource>, TSource) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> DefaultIfEmpty<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, TSource defaultValue);
```

Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to return the specified value for if it is empty.
- `defaultValue`: The value to return if the sequence is empty.

Returns: An `IEnumerable<T>` that contains `defaultValue` if `source` is empty; otherwise, `source`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

This method can be used to produce a left outer join when it is combined with the `Enumerable.GroupJoin` method.

#### Examples
The following code example demonstrates how to use the `DefaultIfEmpty<T>` method and specify a default value. The first sequence is not empty and the second sequence is empty.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Distinct<TSource>(IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Distinct<TSource> (this System.Collections.Generic.IEnumerable<TSource> source);
```

Returns distinct elements from a sequence by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to remove duplicate elements from.

Returns: An `IEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `Distinct<T>` method returns an unordered sequence that contains no duplicate values. It uses the default equality comparer, `EqualityComparer<T>.Default`, to compare values.

In Visual Basic query expression syntax, a `Distinct` clause translates to an invocation of `Enumerable.Distinct`.

The default equality comparer, `EqualityComparer<T>.Default`, is used to compare values of the types that implement the `IEquatable<T>` generic interface. To compare a custom data type, you need to implement this interface and provide your own `Object.GetHashCode` and `Object.Equals` methods for the type.

For an example that uses `IEqualityComparer<T>` to define a custom comparer, see `Distinct<T>`.

#### Examples
The following code example demonstrates how to use `Distinct<T>` to return distinct elements from a sequence of integers.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

If you want to return distinct elements from sequences of objects of some custom data type, you have to implement the `IEquatable<T>` generic interface in the class. The following code example shows how to implement this interface in a custom data type and provide `Object.GetHashCode` and `Object.Equals` methods.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

After you implement this interface, you can use a sequence of `Product` objects in the `Distinct<T>` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

## Enumerable.Distinct<TSource>(IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Distinct<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Returns distinct elements from a sequence by using a specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: The sequence to remove duplicate elements from.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: An `IEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `Distinct<T>` method returns an unordered sequence that contains no duplicate values. If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

#### Examples
The following example shows how to implement an equality comparer that can be used in the `Enumerable.Distinct` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

After you implement this comparer, you can use a sequence of `Product` objects in the `Enumerable.Distinct` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._
