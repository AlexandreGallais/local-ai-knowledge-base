---
title: "SortedList<TKey,TValue> class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedList`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedList<TKey,TValue> class

Namespace: `System.Collections.Generic`

```csharp
public class SortedList<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary
```

Represents a collection of key/value pairs that are sorted by key based on the associated `IComparer<T>` implementation.

Parameters:

- `TKey`: The type of keys in the collection.
- `TValue`: The type of values in the collection.

#### Remarks

The `SortedList<T1,T2>` generic class is an array of key/value pairs with O(log `n`) retrieval, where n is the number of elements in the dictionary. In this, it is similar to the `SortedDictionary<T1,T2>` generic class. The two classes have similar object models, and both have O(log `n`) retrieval. Where the two classes differ is in memory use and speed of insertion and removal:

- `SortedList<T1,T2>` uses less memory than `SortedDictionary<T1,T2>`.
- `SortedDictionary<T1,T2>` has faster insertion and removal operations for unsorted data, O(log `n`) as opposed to O(`n`) for `SortedList<T1,T2>`.
- If the list is populated all at once from sorted data, `SortedList<T1,T2>` is faster than `SortedDictionary<T1,T2>`.

Another difference between the `SortedDictionary<T1,T2>` and `SortedList<T1,T2>` classes is that `SortedList<T1,T2>` supports efficient indexed retrieval of keys and values through the collections returned by the `SortedList<T1,T2>.Keys` and `SortedList<T1,T2>.Values` properties. It is not necessary to regenerate the lists when the properties are accessed, because the lists are just wrappers for the internal arrays of keys and values. The following code shows the use of the `Values` property for indexed retrieval of values from a sorted list of strings:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/remarks.cs._

`SortedList<T1,T2>` is implemented as an array of key/value pairs, sorted by the key.  Each element can be retrieved as a `KeyValuePair<T1,T2>` object.

Key <example-value> must be immutable as long as they are used as keys in the `SortedList<T1,T2>`. Every key in a `SortedList<T1,T2>` must be unique. A key <example-value> be `null`, but a value can be, if the type of values in the list, `TValue`, is a reference type.

`SortedList<T1,T2>` requires a comparer implementation to sort and to perform comparisons.  The default comparer `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable<T>` and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable`.  If the key type `TKey` does not implement either interface, you can specify a `IComparer<T>` implementation in a constructor overload that accepts a `comparer` parameter.

The capacity of a `SortedList<T1,T2>` is the number of elements the `SortedList<T1,T2>` can hold. As elements are added to a `SortedList<T1,T2>`, the capacity is automatically increased as required by reallocating the internal array. The capacity can be decreased by calling `SortedList<T1,T2>.TrimExcess` or by setting the `Capacity` property explicitly. Decreasing the capacity reallocates memory and copies all the elements in the `SortedList<T1,T2>`.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since the elements of the `SortedList<T1,T2>` are key/value pairs, the element type is not the type of the key or the type of the value. Instead, the element type is `KeyValuePair<T1,T2>`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/remarks.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

#### Examples
The following code example creates an empty `SortedList<T1,T2>` of strings with string keys and uses the `SortedList<T1,T2>.Add` method to add some elements. The example demonstrates that the `SortedList<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

The example uses the `SortedList<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example shows how to use the `SortedList<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the sorted list, and it shows how to use the `SortedList<T1,T2>.ContainsKey` method to test whether a key <example-value> before calling the `SortedList<T1,T2>.Add` method.

The example shows how to enumerate the keys and values in the sorted list and how to enumerate the keys and values alone using the `Keys` property and the `Values` property.

Finally, the example demonstrates the `SortedList<T1,T2>.Remove` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.SortedList() constructor

```csharp
public SortedList ();
```

Initializes a new instance of the `SortedList<T1,T2>` class that is empty, has the default initial capacity, and uses the default `IComparer<T>`.

#### Remarks
Every key in a `SortedList<T1,T2>` must be unique according to the default comparer.

This constructor uses the default value for the initial capacity of the `SortedList<T1,T2>`. To set the initial capacity, use the `%23ctor` constructor. If the final size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList<T1,T2>`.

This constructor uses the default comparer for `TKey`. To specify a comparer, use the `%23ctor` constructor. The default comparer `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable<T>` and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable`.  If the key type `TKey` does not implement either interface, you can specify a `IComparer<T>` implementation in a constructor overload that accepts a `comparer` parameter.

This constructor is an O(1) operation.

#### Examples
The following code example creates an empty `SortedList<T1,T2>` of strings with string keys and uses the `SortedList<T1,T2>.Add` method to add some elements. The example demonstrates that the `SortedList<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code example is part of a larger example provided for the `SortedList<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/Overview/source.cs._

## SortedList<TKey,TValue>.SortedList(IComparer<TKey>) constructor

```csharp
public SortedList (System.Collections.Generic.IComparer<TKey>? comparer);
```

Initializes a new instance of the `SortedList<T1,T2>` class that is empty, has the default initial capacity, and uses the specified `IComparer<T>`.

Parameters:

- `comparer`: The `IComparer<T>` implementation to use when comparing keys.

-or-

`null` to use the default `Comparer<T>` for the type of the key.

#### Remarks
Every key in a `SortedList<T1,T2>` must be unique according to the specified comparer.

This constructor uses the default value for the initial capacity of the `SortedList<T1,T2>`. To set the initial capacity, use the `%23ctor` constructor. If the final size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList<T1,T2>`.

This constructor is an O(1) operation.

#### Examples
The following code example creates a sorted list with a case-insensitive comparer for the current culture. The example adds four elements, some with lower-case keys and some with upper-case keys. The example then attempts to add an element with a key that differs from an existing key only by case, catches the resulting exception, and displays an error message. Finally, the example displays the elements in case-insensitive sort order.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/.ctor/source.cs._

## SortedList<TKey,TValue>.SortedList(IDictionary<TKey,TValue>) constructor

```csharp
public SortedList (System.Collections.Generic.IDictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `SortedList<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>`, has sufficient capacity to accommodate the number of elements copied, and uses the default `IComparer<T>`.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `SortedList<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.
- `ArgumentException`: `dictionary` contains one or more duplicate keys.

#### Remarks
Every key in a `SortedList<T1,T2>` must be unique according to the default comparer; likewise, every key in the source `dictionary` must also be unique according to the default comparer.

The capacity of the new `SortedList<T1,T2>` is set to the number of elements in `dictionary`, so no resizing takes place while the list is being populated.

This constructor uses the default comparer for `TKey`. To specify a comparer, use the `%23ctor` constructor. The default comparer `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable<T>` and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable`.  If the key type `TKey` does not implement either interface, you can specify a `IComparer<T>` implementation in a constructor overload that accepts a `comparer` parameter.

The keys in `dictionary` are copied to the new `SortedList<T1,T2>` and sorted once, which makes this constructor an O(`n` log `n`) operation.

#### Examples
The following code example shows how to use `SortedList<T1,T2>` to create a sorted copy of the information in a `Dictionary<T1,T2>`, by passing the `Dictionary<T1,T2>` to the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/.ctor/source1.cs._

## SortedList<TKey,TValue>.SortedList(Int32) constructor

```csharp
public SortedList (int capacity);
```

Initializes a new instance of the `SortedList<T1,T2>` class that is empty, has the specified initial capacity, and uses the default `IComparer<T>`.

Parameters:

- `capacity`: The initial number of elements that the `SortedList<T1,T2>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than zero.

#### Remarks
Every key in a `SortedList<T1,T2>` must be unique according to the default comparer.

The capacity of a `SortedList<T1,T2>` is the number of elements that the `SortedList<T1,T2>` can hold before resizing. As elements are added to a `SortedList<T1,T2>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `SortedList<T1,T2>`.

The capacity can be decreased by calling `SortedList<T1,T2>.TrimExcess` or by setting the `Capacity` property explicitly. Decreasing the capacity reallocates memory and copies all the elements in the `SortedList<T1,T2>`.

This constructor uses the default comparer for `TKey`. To specify a comparer, use the `%23ctor` constructor. The default comparer `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable<T>` and uses that implementation, if available.  If not, `Comparer<T>.Default` checks whether the key type `TKey` implements `IComparable`.  If the key type `TKey` does not implement either interface, you can specify a `IComparer<T>` implementation in a constructor overload that accepts a `comparer` parameter.

This constructor is an O(`n`) operation, where `n` is `capacity`.

#### Examples
The following code example creates a sorted list with an initial capacity of 4 and populates it with 4 entries.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/.ctor/source3.cs._

## SortedList<TKey,TValue>.SortedList(IDictionary<TKey,TValue>, IComparer<TKey>) constructor

```csharp
public SortedList (System.Collections.Generic.IDictionary<TKey,TValue> dictionary, System.Collections.Generic.IComparer<TKey>? comparer);
```

Initializes a new instance of the `SortedList<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>`, has sufficient capacity to accommodate the number of elements copied, and uses the specified `IComparer<T>`.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `SortedList<T1,T2>`.
- `comparer`: The `IComparer<T>` implementation to use when comparing keys.

-or-

`null` to use the default `Comparer<T>` for the type of the key.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.
- `ArgumentException`: `dictionary` contains one or more duplicate keys.

#### Remarks
Every key in a `SortedList<T1,T2>` must be unique according to the specified comparer; likewise, every key in the source `dictionary` must also be unique according to the specified comparer.

The capacity of the new `SortedList<T1,T2>` is set to the number of elements in `dictionary`, so no resizing takes place while the list is being populated.

The keys in `dictionary` are copied to the new `SortedList<T1,T2>` and sorted once, which makes this constructor an O(`n` log `n`) operation.

#### Examples
The following code example shows how to use `SortedList<T1,T2>` to create a case-insensitive sorted copy of the information in a case-insensitive `Dictionary<T1,T2>`, by passing the `Dictionary<T1,T2>` to the `%23ctor` constructor. In this example, the case-insensitive comparers are for the current culture.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedListTKey,TValue/.ctor/source2.cs._
