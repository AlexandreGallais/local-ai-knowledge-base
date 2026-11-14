---
title: "Dictionary<TKey,TValue> class (part 1 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/Dictionary`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dictionary<TKey,TValue> class

Namespace: `System.Collections.Generic`

```csharp
public class Dictionary<TKey,TValue> : System.Collections.Generic.ICollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IDictionary<TKey,TValue>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<TKey,TValue>>, System.Collections.Generic.IReadOnlyDictionary<TKey,TValue>, System.Collections.IDictionary, System.Runtime.Serialization.IDeserializationCallback, System.Runtime.Serialization.ISerializable
```

Represents a collection of keys and values.

Parameters:

- `TKey`: The type of the keys in the dictionary.
- `TValue`: The type of the values in the dictionary.

#### Remarks
The `Dictionary<T1,T2>` generic class provides a mapping from a set of keys to a set of values. Each addition to the dictionary consists of a value and its associated key. Retrieving a value by using its key is very fast, close to O(1), because the `Dictionary<T1,T2>` class is implemented as a hash table.

> **Note:**
> The speed of retrieval depends on the quality of the hashing algorithm of the type specified for `TKey`.

As long as an object is used as a key in the `Dictionary<T1,T2>`, it must not change in any way that affects its hash value. Every key in a `Dictionary<T1,T2>` must be unique according to the dictionary's equality comparer. A key <example-value> be `null`, but a value can be, if its type `TValue` is a reference type.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. You can specify an implementation of the `IEqualityComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter; if you do not specify an implementation, the default generic equality comparer `EqualityComparer<T>.Default` is used. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation.

> **Note:**
> For example, you can use the case-insensitive string comparers provided by the `StringComparer` class to create dictionaries with case-insensitive string keys.

The capacity of a `Dictionary<T1,T2>` is the number of elements the `Dictionary<T1,T2>` can hold. As elements are added to a `Dictionary<T1,T2>`, the capacity is automatically increased as required by reallocating the internal array.

For purposes of enumeration, each item in the dictionary is treated as a `KeyValuePair<T1,T2>` structure representing a value and its key. The order in which the items are returned is undefined.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since the `Dictionary<T1,T2>` is a collection of keys and values, the element type is not the type of the key or the type of the value. Instead, the element type is a `KeyValuePair<T1,T2>` of the key type and the value type. For example:

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which allows only reading from the collection, not writing to it.

> **Note:**
>  Because keys can be inherited and their behavior changed, their absolute uniqueness cannot be guaranteed by comparisons using the `Type.Equals` method.

#### Examples

The following code example creates an empty `Dictionary<T1,T2>` of strings with string keys and uses the `Dictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `Dictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

The example uses the `Dictionary<T1,T2>.Item` property (the indexer in C#) to retrieve values, demonstrating that a `KeyNotFoundException` is thrown when a requested key is not present, and showing that the value associated with a key can be replaced.

The example shows how to use the `Dictionary<T1,T2>.TryGetValue` method as a more efficient way to retrieve values if a program often must try key <example-value> that are not in the dictionary, and it shows how to use the `Dictionary<T1,T2>.ContainsKey` method to test whether a key <example-value> before calling the `Dictionary<T1,T2>.Add` method.

The example shows how to enumerate the keys and values in the dictionary and how to enumerate the keys and values alone using the `Keys` property and the `Values` property.

Finally, the example demonstrates the `Dictionary<T1,T2>.Remove` method.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.Dictionary() constructor

```csharp
public Dictionary ();
```

Initializes a new instance of the `Dictionary<T1,T2>` class that is empty, has the default initial capacity, and uses the default equality comparer for the key type.

#### Remarks
Every key in a `Dictionary<T1,T2>` must be unique according to the default equality comparer.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. This constructor uses the default generic equality comparer, `EqualityComparer<T>.Default`. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation. Alternatively, you can specify an implementation of the `IEqualityComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter.

> **Note:**
>  If you can estimate the size of the collection, using a constructor that specifies the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Dictionary<T1,T2>`.

This constructor is an O(1) operation.

#### Examples

The following code example creates an empty `Dictionary<T1,T2>` of strings with string keys and uses the `Dictionary<T1,T2>.Add` method to add some elements. The example demonstrates that the `Dictionary<T1,T2>.Add` method throws an `ArgumentException` when attempting to add a duplicate key.

This code example is part of a larger example provided for the `Dictionary<T1,T2>` class.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/Overview/source.cs._

## Dictionary<TKey,TValue>.Dictionary(IDictionary<TKey,TValue>) constructor

```csharp
public Dictionary (System.Collections.Generic.IDictionary<TKey,TValue> dictionary);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that contains elements copied from the specified `IDictionary<T1,T2>` and uses the default equality comparer for the key type.

Parameters:

- `dictionary`: The `IDictionary<T1,T2>` whose elements are copied to the new `Dictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `dictionary` is `null`.
- `ArgumentException`: `dictionary` contains one or more duplicate keys.

#### Remarks
Every key in a `Dictionary<T1,T2>` must be unique according to the default equality comparer; likewise, every key in the source `dictionary` must also be unique according to the default equality comparer.

The initial capacity of the new `Dictionary<T1,T2>` is large enough to contain all the elements in `dictionary`.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. This constructor uses the default generic equality comparer, `EqualityComparer<T>.Default`. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation. Alternatively, you can specify an implementation of the `IEqualityComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter.

This constructor is an O(n) operation, where n is the number of elements in `dictionary`.

#### Examples
The following code example shows how to use the `%23ctor` constructor to initialize a `Dictionary<T1,T2>` with sorted content from another dictionary. The code example creates a `SortedDictionary<T1,T2>` and populates it with data in random order, then passes the `SortedDictionary<T1,T2>` to the `%23ctor` constructor, creating a `Dictionary<T1,T2>` that is sorted. This is useful if you need to build a sorted dictionary that at some point becomes static; copying the data from a `SortedDictionary<T1,T2>` to a `Dictionary<T1,T2>` improves retrieval speed.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/.ctor/source.cs._

## Dictionary<TKey,TValue>.Dictionary(KeyValuePair<TKey,TValue>>) constructor

```csharp
public Dictionary (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>> collection);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that contains elements copied from the specified `IEnumerable<T>`.

Parameters:

- `collection`: The `IEnumerable<T>`  whose elements are copied to the new `Dictionary<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.
- `ArgumentException`: `collection` contains one or more duplicated keys.

To be added.

## Dictionary<TKey,TValue>.Dictionary(IEqualityComparer<TKey>) constructor

```csharp
public Dictionary (System.Collections.Generic.IEqualityComparer<TKey>? comparer);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that is empty, has the default initial capacity, and uses the specified `IEqualityComparer<T>`.

Parameters:

- `comparer`: The `IEqualityComparer<T>` implementation to use when comparing keys, or `null` to use the default `EqualityComparer<T>` for the type of the key.

#### Remarks
Use this constructor with the case-insensitive string comparers provided by the `StringComparer` class to create dictionaries with case-insensitive string keys.

Every key in a `Dictionary<T1,T2>` must be unique according to the specified comparer.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. If `comparer` is `null`, this constructor uses the default generic equality comparer, `EqualityComparer<T>.Default`. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation.

> **Note:**
>  If you can estimate the size of the collection, using a constructor that specifies the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Dictionary<T1,T2>`.

This constructor is an O(1) operation.

> **Caution:**
> If `capacity` comes from user input, prefer using a constructor without a capacity parameter and letting the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

#### Examples
The following code example creates a `Dictionary<T1,T2>` with a case-insensitive equality comparer for the current culture. The example adds four elements, some with lower-case keys and some with upper-case keys. The example then attempts to add an element with a key that differs from an existing key only by case, catches the resulting exception, and displays an error message. Finally, the example displays the elements in the dictionary.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/.ctor/source2.cs._

## Dictionary<TKey,TValue>.Dictionary(Int32) constructor

```csharp
public Dictionary (int capacity);
```

Initializes a new instance of the `Dictionary<T1,T2>` class that is empty, has the specified initial capacity, and uses the default equality comparer for the key type.

Parameters:

- `capacity`: The initial number of elements that the `Dictionary<T1,T2>` can contain.

Exceptions:

- `ArgumentOutOfRangeException`: `capacity` is less than 0.

#### Remarks
Every key in a `Dictionary<T1,T2>` must be unique according to the default equality comparer.

The capacity of a `Dictionary<T1,T2>` is the number of elements that can be added to the `Dictionary<T1,T2>` before resizing is necessary. As elements are added to a `Dictionary<T1,T2>`, the capacity is automatically increased as required by reallocating the internal array.

If the size of the collection can be estimated, specifying the initial capacity eliminates the need to perform a number of resizing operations while adding elements to the `Dictionary<T1,T2>`.

`Dictionary<T1,T2>` requires an equality implementation to determine whether keys are equal. This constructor uses the default generic equality comparer, `EqualityComparer<T>.Default`. If type `TKey` implements the `IEquatable<T>` generic interface, the default equality comparer uses that implementation. Alternatively, you can specify an implementation of the `IEqualityComparer<T>` generic interface by using a constructor that accepts a `comparer` parameter.

This constructor is an O(1) operation.

> **Caution:**
> If `capacity` comes from user input, prefer using a constructor without a capacity parameter and letting the collection resize as elements are added. If you must use a user-specified value, either clamp it to a reasonable limit (for example, `Math.Clamp(untrustedValue, 0, 20)`) or verify that the element count matches the specified value.

#### Examples
The following code example creates a dictionary with an initial capacity of 4 and populates it with 4 entries.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/DictionaryTKey,TValue/.ctor/source3.cs._
