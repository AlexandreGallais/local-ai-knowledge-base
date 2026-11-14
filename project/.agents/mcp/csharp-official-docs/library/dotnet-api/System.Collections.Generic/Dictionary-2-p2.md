---
title: "Dictionary<TKey,TValue> class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue> class (part 2 of 5)

## Dictionary<TKey,TValue>.Dictionary(IDictionary<TKey,TValue>, IEqualityComparer<TKey>) constructor

```csharp
public Dictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>` and uses the specified `IEqualityComparer<T>`.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `Dictionary<T1,T2>`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.
- `ArgumentException`: `dictionary` contains one or more duplicate keys.

#### Remarks
Use this constructor with the case-insensitive string comparers provided by the `StringComparer` class to create dictionaries with case-insensitive string keys.

Every key in a `Dictionary<T1,T2>` must be unique according to the specified comparer; likewise, every key in the source `dictionary` must also be unique according to the specified comparer.

> **Note:**
>  For example, duplicate keys can occur if `comparer` is one of the case-insensitive string comparers provided by the `StringComparer` class and `dictionary` does not use a case-insensitive comparer key.

The initial capacity of the new `Dictionary<T1,T2>` is large enough to contain all the elements in `dictionary`.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. If `comparer` is `null`, this constructor uses the default generic equality comparer, `EqualityComparer<T>.Default`. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation.

This constructor is an O(`n`) operation, where `n` is the number of elements in `dictionary`.

#### Examples
The following code example shows how to use the `%23ctor` constructor to initialize a `Dictionary<T1,T2>` with case-insensitive sorted content from another dictionary. The code example creates a `SortedDictionary<T1,T2>` with a case-insensitive comparer and populates it with data in random order, then passes the `SortedDictionary<T1,T2>` to the `%23ctor` constructor, along with a case-insensitive equality comparer, creating a `Dictionary<T1,T2>` that is sorted. This is useful if you need to build a sorted dictionary that at some point becomes static; copying the data from a `SortedDictionary<T1,T2>` to a `Dictionary<T1,T2>` improves retrieval speed.

> **Note:**
>  When you create a new dictionary with a case-insensitive comparer and populate it with entries from a dictionary that uses a case-sensitive comparer, as in this example, an exception occurs if the input dictionary has keys that differ only by case.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/.ctor/source1.cs._

## Dictionary<TKey,TValue>.Dictionary(KeyValuePair<TKey,TValue>>, IEqualityComparer<TKey>) constructor

```csharp
public Dictionary (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable<T>` and uses the specified `IEqualityComparer<T>`.

Parameters:

- `collection`: The `IEnumerable<T>` whose elements are copied to the new `Dictionary<T1,T2>`.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.
- `ArgumentException`: `collection` contains one or more duplicated keys.

To be added.

## Dictionary<TKey,TValue>.Dictionary(Int32, IEqualityComparer<TKey>) constructor

```csharp
public Dictionary (int capacity, System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that is empty, has the specified initial capacity, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `capacity`: The initial number of elements that the `Dictionary<T1,T2>` can contain.
- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than 0.

#### Remarks
Use this constructor with the case-insensitive string comparers provided by the `StringComparer` class to create dictionaries with case-insensitive string keys.

Every key in a `Dictionary<T1,T2>` must be unique according to the specified comparer.

The capacity of a `Dictionary<T1,T2>` is the number of elements that can be added to the `Dictionary<T1,T2>` before resizing is necessary. As elements are added to a `Dictionary<T1,T2>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Dictionary<T1,T2>`.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. If `comparer` is `null`, this constructor uses the default generic equality comparer, `EqualityComparer<T>.Default`. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation.

This constructor is an O(1) operation.

#### Examples
The following code example creates a `Dictionary<T1,T2>` with an initial capacity of 5 and a case-insensitive equality comparer for the current culture. The example adds four elements, some with lower-case keys and some with upper-case keys. The example then attempts to add an element with a key that differs from an existing key only by case, catches the resulting exception, and displays an error message. Finally, the example displays the elements in the dictionary.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/.ctor/source4.cs._

## Dictionary<TKey,TValue>.Dictionary(SerializationInfo, StreamingContext) constructor

```csharp
protected Dictionary (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `Dictionary<T1,T2>` class with serialized data.

Parameters:

- `info`: A `SerializationInfo` object containing the information required to serialize the `Dictionary<T1,T2>`.
- `context`: A `StreamingContext` structure containing the source and destination of the serialized stream associated with the `Dictionary<T1,T2>`.

To be added.

## Dictionary<TKey,TValue>.Capacity property

```csharp
public int Capacity { get; }
```

Gets the total numbers of elements the internal data structure can hold without resizing.

Returns: To be added.

To be added.

## Dictionary<TKey,TValue>.Comparer property

```csharp
public System.Collections.Generic.IEqualityComparer<TKey> Comparer { get; }
```

Gets the `IEqualityComparer<T>` that is used to determine equality of keys for the dictionary.

Returns: The `IEqualityComparer<T>` generic interface implementation that is used to determine equality of keys for the current `Dictionary<T1,T2>` and to provide hash values for the keys.

#### Remarks
`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. You can specify an implementation of the `IEqualityComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter; if you do not specify one, the default generic equality comparer `EqualityComparer<T>.Default` is used.

Getting the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the `Dictionary<T1,T2>`.

Returns: The number of key/value pairs contained in the `Dictionary<T1,T2>`.

#### Remarks
The capacity of a `Dictionary<T1,T2>` is the number of elements that the `Dictionary<T1,T2>` can store. The `Count` property is the number of elements that are actually in the `Dictionary<T1,T2>`.

The capacity is always greater than or equal to `Dictionary<T1,T2>.Count`. If `Dictionary<T1,T2>.Count` exceeds the capacity while adding elements, the capacity is increased by automatically reallocating the internal array before copying the old elements and adding the new elements.

Getting the value of this property is an O(1) operation.

## Dictionary<TKey,TValue>.Item property

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

You can also use the `Dictionary<T1,T2>.Item` property to add new elements by setting the value of a key that does not exist in the `Dictionary<T1,T2>`. When you set the property value, if the key is in the `Dictionary<T1,T2>`, the value associated with that key is replaced by the assigned value. If the key is not in the `Dictionary<T1,T2>`, the key and value are added to the dictionary. In contrast, the `Dictionary<T1,T2>.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can be, if the value type `TValue` is a reference type.

The C# language uses the `this` keyword to define the indexers instead of implementing the `Dictionary<T1,T2>.Item` property. Visual Basic <example-value> `Dictionary<T1,T2>.Item` as a default property, which provides the same indexing functionality.

Getting or setting the value of this property approaches an O(1) operation.

#### Examples

The following code example uses the `Dictionary<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example also shows how to use the `Dictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the dictionary.

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class. `openWith` is the name of the Dictionary used in this example.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.Keys property

```csharp
public System.Collections.Generic.Dictionary<TKey,TValue>.KeyCollection Keys { get; }
```

Gets a collection containing the keys in the `Dictionary<T1,T2>`.

Returns: A `KeyCollection` containing the keys in the `Dictionary<T1,T2>`.

#### Remarks
The order of the keys in the `KeyCollection` is unspecified, but it is the same order as the associated values in the `ValueCollection` returned by the `Values` property.

The returned `KeyCollection` is not a static copy; instead, the `KeyCollection` refers back to the keys in the original `Dictionary<T1,T2>`. Therefore, changes to the `Dictionary<T1,T2>` continue to be reflected in the `KeyCollection`.

Getting the value of this property is an O(1) operation.

#### Examples
The following code example shows how to enumerate the keys in the dictionary using the `Keys` property, and how to enumerate the keys and values in the dictionary.

This code is part of a larger example that can be compiled and executed (`openWith` is the name of the Dictionary used in this example). See `Dictionary<T1,T2>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>.IsReadOnly { get; }
```

Gets a value that indicates whether the dictionary is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`. In the default implementation of `Dictionary<T1,T2>`, this property always returns `false`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.ICollection<TKey> System.Collections.Generic.IDictionary<TKey,TValue>.Keys { get; }
```

Gets an `ICollection<T>` containing the keys of the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` of type `TKey` containing the keys of the `IDictionary<T1,T2>`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.IDictionary<TKey,TValue>.Values property

```csharp
System.Collections.Generic.ICollection<TValue> System.Collections.Generic.IDictionary<TKey,TValue>.Values { get; }
```

Gets an `ICollection<T>` containing the values in the `IDictionary<T1,T2>`.

Returns: An `ICollection<T>` of type `TValue` containing the values in the `IDictionary<T1,T2>`.

To be added.

## Dictionary<TKey,TValue>.System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys property

```csharp
System.Collections.Generic.IEnumerable<TKey> System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>.Keys { get; }
```

Gets a collection containing the keys of the `IReadOnlyDictionary<T1,T2>`.

Returns: A collection containing the keys of the `IReadOnlyDictionary<T1,T2>`.

To be added.
