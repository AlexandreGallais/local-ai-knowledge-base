---
title: "Enumerable class (part 5 of 24)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Linq/Enumerable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enumerable class (part 5 of 24)

## Enumerable.DistinctBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> DistinctBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector);
```

Returns distinct elements from a sequence according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to remove duplicate elements from.
- `keySelector`: A function to extract the key for each element.

Returns: An `IEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `DistinctBy<T1,T2>` method returns an unordered sequence that contains no duplicate values. The default equality comparer, `Default`, is used to compare values.

## Enumerable.DistinctBy<TSource,TKey>(IEnumerable<TSource>, Func<TSource,TKey>, IEqualityComparer<TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> DistinctBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> source, Func<TSource,TKey> keySelector, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Returns distinct elements from a sequence according to a specified key <example-value> function and using a specified comparer to compare keys.

Parameters:

- `TSource`: The type of the elements of `source`.
- `TKey`: The type of key to distinguish elements by.
- `source`: The sequence to remove duplicate elements from.
- `keySelector`: A function to extract the key for each element.
- `comparer`: An `IEqualityComparer<T>` to compare keys.

Returns: An `IEnumerable<T>` that contains distinct elements from the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The `DistinctBy<T1,T2>` method returns an unordered sequence that contains no duplicate values. If `comparer` is `null`, the default equality comparer, `Default`, is used to compare values.

## Enumerable.ElementAt<TSource>(IEnumerable<TSource>, Index) method

```csharp
public static TSource ElementAt<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Index index);
```

Returns the element at a specified index in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the beginning or the end of the sequence.

Returns: The element at the specified position in the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the bounds of the `source` sequence.

#### Remarks

If the type of `source` implements `IList<T>`, that implementation is used to obtain the element at the specified index. Otherwise, this method obtains the specified element.

This method throws an exception if `index` is out of range. To instead return a default value when the specified index is out of range, use the `Enumerable.ElementAtOrDefault` method.

## Enumerable.ElementAt<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static TSource ElementAt<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int index);
```

Returns the element at a specified index in a sequence.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `index`: The zero-based index of the element to retrieve.

Returns: The element at the specified position in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0 or greater than or equal to the number of elements in `source`.

#### Remarks
If the type of `source` implements `IList<T>`, that implementation is used to obtain the element at the specified index. Otherwise, this method obtains the specified element.

This method throws an exception if `index` is out of range. To instead return a default value when the specified index is out of range, use the `Enumerable.ElementAtOrDefault` method.

#### Examples
The following code example demonstrates how to use `Enumerable.ElementAt` to return an element at a specific position.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.ElementAtOrDefault<TSource>(IEnumerable<TSource>, Index) method

```csharp
public static TSource? ElementAtOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, Index index);
```

Returns the element at a specified index in a sequence or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `index`: The index of the element to retrieve, which is either from the beginning or the end of the sequence.

Returns: `default` if `index` is outside the bounds of the `source` sequence; otherwise, the element at the specified position in the `source` sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks

If the type of `source` implements `IList<T>`, that implementation is used to obtain the element at the specified index. Otherwise, this method obtains the specified element.

The default value for reference and nullable types is `null`.

## Enumerable.ElementAtOrDefault<TSource>(IEnumerable<TSource>, Int32) method

```csharp
public static TSource? ElementAtOrDefault<TSource> (this System.Collections.Generic.IEnumerable<TSource> source, int index);
```

Returns the element at a specified index in a sequence or a default value if the index is out of range.

Parameters:

- `TSource`: The type of the elements of `source`.
- `source`: An `IEnumerable<T>` to return an element from.
- `index`: The zero-based index of the element to retrieve.

Returns: `default`(`TSource`) if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.

Exceptions:

- `ArgumentNullException`: `source` is `null`.

#### Remarks
If the type of `source` implements `IList<T>`, that implementation is used to obtain the element at the specified index. Otherwise, this method obtains the specified element.

The default value for reference and nullable types is `null`.

#### Examples
The following code example demonstrates how to use `Enumerable.ElementAtOrDefault`. This example uses an index that is outside the bounds of the array.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Empty<TResult>() method

```csharp
public static System.Collections.Generic.IEnumerable<TResult> Empty<TResult> ();
```

Returns an empty `IEnumerable<T>` that has the specified type argument.

Parameters:

- `TResult`: The type to assign to the type parameter of the returned generic `IEnumerable<T>`.

Returns: An empty `IEnumerable<T>` whose type argument is `TResult`.

#### Remarks
The `Empty<T>` method caches an empty sequence of type `TResult`. When the object it returns is enumerated, it yields no elements.

In some cases, this method is useful for passing an empty sequence to a user-defined method that takes an `IEnumerable<T>`. It can also be used to generate a neutral element for methods such as `Enumerable.Union`. See the Example section for an example of this use of `Empty<T>`.

#### Examples
The following code example demonstrates how to use `Empty<T>` to generate an empty `IEnumerable<T>`.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

The following code example demonstrates a possible application of the `Empty<T>` method. The `Enumerable.Aggregate` method is applied to a collection of string arrays. The elements of each array in the collection are added to the resulting `IEnumerable<T>` only if that array contains four or more elements. `Enumerable.Empty` is used to generate the seed value for `Enumerable.Aggregate` because if no array in the collection has four or more elements, only the empty sequence is returned.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

## Enumerable.Except<TSource>(IEnumerable<TSource>, IEnumerable<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Except<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second);
```

Produces the set difference of two sequences by using the default equality comparer to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` whose elements that are not also in `second` will be returned.
- `second`: An `IEnumerable<T>` whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
This method is implemented by using deferred execution. The immediate return value is an object that stores all the information that is required to perform the action. The query represented by this method is not executed until the object is enumerated either by calling its `GetEnumerator` method directly or by using `foreach` in C# or `For Each` in Visual Basic.

The default equality comparer, `EqualityComparer<T>.Default`, is used to compare values of the types.
To compare a custom data type, you need to override the `Object.Equals` and the `Object.GetHashCode` methods, and optionally implement the `IEquatable<T>` generic interface in the custom type. For more information, see the `Default` property.

#### Examples
The following code example demonstrates how to use the `Except<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` method to compare two sequences of numbers and return elements that appear only in the first sequence.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/AggregateTSource/enumerable.cs._

If you want to compare sequences of objects of some custom data type, you have to implement the `IEquatable<T>` generic interface in a helper class. The following code example shows how to implement this interface in a custom data type and override the `Object.GetHashCode` and `Object.Equals` methods.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

After you implement this interface, you can use sequences of `ProductA` objects in the `Except<TSource>(IEnumerable<TSource>, IEnumerable<TSource>)` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/EncapsulatedComparer.cs._

## Enumerable.Except<TSource>(IEnumerable<TSource>, IEnumerable<TSource>, IEqualityComparer<TSource>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> Except<TSource> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TSource> second, System.Collections.Generic.IEqualityComparer<TSource>? comparer);
```

Produces the set difference of two sequences by using the specified `IEqualityComparer<T>` to compare values.

Parameters:

- `TSource`: The type of the elements of the input sequences.
- `first`: An `IEnumerable<T>` whose elements that are not also in `second` will be returned.
- `second`: An `IEnumerable<T>` whose elements that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `comparer`: An `IEqualityComparer<T>` to compare values.

Returns: A sequence that contains the set difference of the elements of two sequences.

Exceptions:

- `ArgumentNullException`: `first` or `second` is `null`.

#### Remarks
If `comparer` is `null`, the default equality comparer, `EqualityComparer<T>.Default`, is used to compare values.

#### Examples
If you want to compare sequences of objects of some custom data type, you have to implement the `IEqualityComparer<T>` generic interface in a helper class. The following code example shows how to implement this interface in a custom data type and provide `Object.GetHashCode` and `Object.Equals` methods.
The following example shows how to implement an equality comparer that can be used in the `Enumerable.Except` method.

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

After you implement this comparer, you can use sequences of `Product` objects in the `Enumerable.Except` method, as shown in the following example:

_Code sample not included: ~/snippets/csharp/System.Linq/Enumerable/Comparers/CustomComparer.cs._

## Enumerable.ExceptBy<TSource,TKey>(IEnumerable<TSource>, IEnumerable<TKey>, Func<TSource,TKey>) method

```csharp
public static System.Collections.Generic.IEnumerable<TSource> ExceptBy<TSource,TKey> (this System.Collections.Generic.IEnumerable<TSource> first, System.Collections.Generic.IEnumerable<TKey> second, Func<TSource,TKey> keySelector);
```

Produces the set difference of two sequences according to a specified key <example-value> function.

Parameters:

- `TSource`: The type of the elements of the input sequence.
- `TKey`: The type of key to identify elements by.
- `first`: An `IEnumerable<T>` whose keys that are not also in `second` will be returned.
- `second`: An `IEnumerable<T>` whose keys that also occur in the first sequence will cause those elements to be removed from the returned sequence.
- `keySelector`: A function to extract the key for each element.

Returns: A sequence that contains the set difference of the elements of two sequences.

To be added.
