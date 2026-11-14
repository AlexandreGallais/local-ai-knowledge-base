---
title: "SortedDictionary<TKey,TValue> class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SortedDictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SortedDictionary<TKey,TValue> class

Namespace: `System.Collections.Generic`

```csharp
public class SortedDictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary
```

Represents a collection of key/value pairs that are sorted on the key.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.

#### Remarks
The `SortedDictionary<T1,T2>` generic class is a binary search tree with O(log n) retrieval, where n is the number of elements in the dictionary. In this respect, it is similar to the `SortedList<T1,T2>` generic class. The two classes have similar object models, and both have O(log n) retrieval. Where the two classes differ is in memory use and speed of insertion and removal:

-   `SortedList<T1,T2>` uses less memory than `SortedDictionary<T1,T2>`.

-   `SortedDictionary<T1,T2>` has faster insertion and removal operations for unsorted data: O(log n) as opposed to O(n) for `SortedList<T1,T2>`.

- If the list is populated all at once from sorted data, `SortedList<T1,T2>` is faster than `SortedDictionary<T1,T2>`.

Each key/value pair can be retrieved as a `KeyValuePair<T1,T2>` structure, or as a `DictionaryEntry` through the nongeneric `IDictionary` interface.

Keys must be immutable as long as they are used as keys in the `SortedDictionary<T1,T2>`. Every key in a `SortedDictionary<T1,T2>` must be unique. A key <example-value> be `null`, but a value can be, if the value type `TValue` is a reference type.

`SortedDictionary<T1,T2>` requires a comparer implementation to perform key comparisons. You can specify an implementation of the `IComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter; if you do not specify an implementation, the default generic comparer `Comparer<T>.Default` is used. If type `TKey` implements the `IComparable<T>` generic interface, the default comparer uses that implementation.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `SortedDictionary<T1,T2>` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `KeyValuePair<T1,T2>`. The following code shows the syntax.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which allows only reading from the collection, not writing to it.

#### Examples
The following code example creates an empty `SortedDictionary<T1,T2>` of strings with string keys and uses the `SortedDictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `SortedDictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

The example uses the `SortedDictionary<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example shows how to use the `SortedDictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the dictionary, and it shows how to use the `SortedDictionary<T1,T2>.ContainsKey` method to test whether a key <example-value> before calling the `SortedDictionary<T1,T2>.Add` method.

The example shows how to enumerate the keys and values in the dictionary and how to enumerate the keys and values alone using the `Keys` property and the `Values` property.

Finally, the example demonstrates the `SortedDictionary<T1,T2>.Remove` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.SortedDictionary() constructor

```csharp
public SortedDictionary ();
```

Initializes a new instance of the `SortedDictionary<T1,T2>` class that is empty and uses the default `IComparer<T>` implementation for the key type.

#### Remarks
Every key in a `SortedDictionary<T1,T2>` must be unique according to the default comparer.

`SortedDictionary<T1,T2>` requires a comparer implementation to perform key comparisons. This constructor uses the default generic equality comparer `Comparer<T>.Default`. If type `TKey` implements the `IComparable<T>` generic interface, the default comparer uses that implementation. Alternatively, you can specify an implementation of the `IComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter.

This constructor is an O(1) operation.

#### Examples
The following code example creates an empty `SortedDictionary<T1,T2>` of strings with string keys and uses the `SortedDictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `SortedDictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

## SortedDictionary<TKey,TValue>.SortedDictionary(IComparer<TKey>) constructor

```csharp
public SortedDictionary (System.Collections.Generic.IComparer<TKey>? comparer);
```

Initializes a new instance of the `SortedDictionary<T1,T2>` class that is empty and uses the specified `IComparer<T>` implementation to compare keys.

Parameters:

- `comparer`: The `IComparer<T>` implementation to use when comparing keys, or `null` to use the default `Comparer<T>` for the type of the key.

#### Remarks
Every key in a `SortedDictionary<T1,T2>` must be unique according to the specified comparer.

`SortedDictionary<T1,T2>` requires a comparer implementation to perform key comparisons. If `comparer` is `null`, this constructor uses the default generic equality comparer, `Comparer<T>.Default`. If type `TKey` implements the `IComparable<T>` generic interface, the default comparer uses that implementation.

This constructor is an O(1) operation.

#### Examples
The following code example creates a `SortedDictionary<T1,T2>` with a case-insensitive comparer for the current culture. The example adds four elements, some with lower-case keys and some with upper-case keys. The example then attempts to add an element with a key that differs from an existing key only by case, catches the resulting exception, and displays an error message. Finally, the example displays the elements in case-insensitive sort order.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/.ctor/source.cs._

## SortedDictionary<TKey,TValue>.SortedDictionary(IDictionary<TKey,TValue>) constructor

```csharp
public SortedDictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `SortedDictionary<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>` and uses the default `IComparer<T>` implementation for the key type.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `SortedDictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.
- `ArgumentException`: `dictionary` contains one or more duplicate keys.

#### Remarks
Every key in a `SortedDictionary<T1,T2>` must be unique according to the default comparer; therefore, every key in the source `dictionary` must also be unique according to the default comparer.

`SortedDictionary<T1,T2>` requires a comparer implementation to perform key comparisons. This constructor uses the default generic equality comparer, `Comparer<T>.Default`. If type `TKey` implements the `IComparable<T>` generic interface, the default comparer uses that implementation. Alternatively, you can specify an implementation of the `IComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter.

This constructor is an O(`n` log `n`) operation, where `n` is the number of elements in `dictionary`.

#### Examples
The following code example shows how to use `SortedDictionary<T1,T2>` to create a sorted copy of the information in a `Dictionary<T1,T2>`, by passing the `Dictionary<T1,T2>` to the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/.ctor/source1.cs._

## SortedDictionary<TKey,TValue>.SortedDictionary(IDictionary<TKey,TValue>, IComparer<TKey>) constructor

```csharp
public SortedDictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary, System.Collections.Generic.IComparer<TKey>? comparer);
```

Initializes a new instance of the `SortedDictionary<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>` and uses the specified `IComparer<T>` implementation to compare keys.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `SortedDictionary<T1,T2>`.
- `comparer`: The `IComparer<T>` implementation to use when comparing keys, or `null` to use the default `Comparer<T>` for the type of the key.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.
- `ArgumentException`: `dictionary` contains one or more duplicate keys.

#### Remarks
Every key in a `SortedDictionary<T1,T2>` must be unique according to the specified comparer; therefore, every key in the source `dictionary` must also be unique according to the specified comparer.

`SortedDictionary<T1,T2>` requires a comparer implementation to perform key comparisons. If `comparer` is `null`, this constructor uses the default generic equality comparer, `Comparer<T>.Default`. If type `TKey` implements the `IComparable<T>` generic interface, the default comparer uses that implementation.

This constructor is an O(`n` log `n`) operation, where `n` is the number of elements in `dictionary`.

#### Examples
The following code example shows how to use `SortedDictionary<T1,T2>` to create a case-insensitive sorted copy of the information in a case-insensitive `Dictionary<T1,T2>`, by passing the `Dictionary<T1,T2>` to the `%23ctor` constructor. In this example, the case-insensitive comparers are for the current culture.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/.ctor/source2.cs._

## SortedDictionary<TKey,TValue>.Comparer property

```csharp
public System.Collections.Generic.IComparer<TKey> Comparer { get; }
```

Gets the `IComparer<T>` used to order the elements of the `SortedDictionary<T1,T2>`.

Returns: The `IComparer<T>` used to order the elements of the `SortedDictionary<T1,T2>`

#### Remarks
`SortedDictionary<T1,T2>` requires a comparer implementation to perform key comparisons. You can specify an implementation of the `IComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter. If you do not, the default generic equality comparer, `Comparer<T>.Default`, is used. If type `TKey` implements the `IComparable<T>` generic interface, the default comparer uses that implementation.

Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the `SortedDictionary<T1,T2>`.

Returns: The number of key/value pairs contained in the `SortedDictionary<T1,T2>`.

#### Remarks
Getting the value of this property is an O(1) operation.

## SortedDictionary<TKey,TValue>.Item property

```csharp
public TValue this[TKey key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key of the value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, a get operation throws a `KeyNotFoundException`, and a set operation creates a new element with the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: The property is retrieved and `key` does not exist in the collection.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following C# syntax: `myCollection[key]` (`myCollection(key)` in Visual Basic).

You can also use the `SortedDictionary<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the `SortedDictionary<T1,T2>`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `SortedDictionary<T1,T2>`, setting the `SortedDictionary<T1,T2>.Item` property overwrites the old value. In contrast, the `SortedDictionary<T1,T2>.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can be, if the value type `TValue` is a reference type.

The C# language uses the this keyword to define the indexers instead of implementing the `SortedDictionary<T1,T2>.Item` property. Visual Basic <example-value> `SortedDictionary<T1,T2>.Item` as a default property, which provides the same indexing functionality.

Getting the value of this property is an O(log `n`) operation; setting the property is also an O(log `n`) operation.

#### Examples
The following code example uses the `SortedDictionary<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example also shows how to use the `SortedDictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the dictionary.

This code example is part of a larger example provided for the `SortedDictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/SortedDictionaryTKey,TValue/Overview/source.cs._
