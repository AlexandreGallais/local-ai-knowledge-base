---
title: "HybridDictionary class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/HybridDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridDictionary class

Namespace: `System.Collections.Specialized`

```csharp
public class HybridDictionary : System.Collections.IDictionary
```

Implements `IDictionary` by using a `ListDictionary` while the collection is small, and then switching to a `Hashtable` when the collection gets large.

#### Remarks
This class is recommended for cases where the number of elements in a dictionary is unknown. It takes advantage of the improved performance of a `ListDictionary` with small collections, and offers the flexibility of switching to a `Hashtable`, which handles larger collections better than `ListDictionary`.

If the initial size of the collection is greater than the optimal size for a `ListDictionary`, the collection is stored in a `Hashtable` to avoid the overhead of copying elements from the `ListDictionary` to a `Hashtable`.

The constructor accepts a Boolean parameter that allows the user to specify whether the collection ignores the case when comparing strings. If the collection is case-sensitive, it uses the key's implementations of `Object.GetHashCode` and `Object.Equals`. If the collection is case-insensitive, it performs a simple ordinal case-insensitive comparison, which obeys the casing rules of the invariant culture only. By default, the collection is case-sensitive. For more information on the invariant culture, see `CultureInfo`.

A key <example-value> be null, but a value can.

The `foreach` statement of the C# language (`For Each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `HybridDictionary` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

#### Examples
The following code example demonstrates several of the properties and methods of `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Overview/hybriddictionary.cs._

## HybridDictionary.HybridDictionary() constructor

```csharp
public HybridDictionary ();
```

Creates an empty case-sensitive `HybridDictionary`.

#### Remarks
By default, the collection is case-sensitive and uses the key's implementation of `Object.GetHashCode` as the hash code provider and the key's implementation of `Object.Equals` as the comparer.

The comparer determines whether two keys are equal. Every key in a `HybridDictionary` must be unique.

This constructor is an O(1) operation.

#### Examples
The following code example demonstrates several of the properties and methods of `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Overview/hybriddictionary.cs._

## HybridDictionary.HybridDictionary(Boolean) constructor

```csharp
public HybridDictionary (bool caseInsensitive);
```

Creates an empty `HybridDictionary` with the specified case sensitivity.

Parameters:

- `caseInsensitive`: A Boolean that denotes whether the `HybridDictionary` is case-insensitive.

#### Remarks
If `caseInsensitive` is `false`, the collection uses the key's implementations of `Object.GetHashCode` and `Object.Equals`. If `caseInsensitive` is `true`, the collection performs a simple ordinal case-insensitive comparison, which obeys the casing rules of the invariant culture only. For more information on the invariant culture, see `CultureInfo`.

This constructor is an O(1) operation.

## HybridDictionary.HybridDictionary(Int32) constructor

```csharp
public HybridDictionary (int initialSize);
```

Creates a case-sensitive `HybridDictionary` with the specified initial size.

Parameters:

- `initialSize`: The approximate number of entries that the `HybridDictionary` can initially contain.

#### Remarks
If the initial size of the collection is greater than the optimal size for a `ListDictionary`, the collection is stored in a `Hashtable` to avoid the overhead of copying elements from the `ListDictionary` to the `Hashtable`.

By default, the collection is case-sensitive and uses the key's implementation of `Object.GetHashCode` as the hash code provider and the key's implementation of `Object.Equals` as the comparer.

The comparer determines whether two keys are equal. Every key in a `HybridDictionary` must be unique.

This constructor is an O(`n`) operation, where `n` is `initialSize`.

## HybridDictionary.HybridDictionary(Int32, Boolean) constructor

```csharp
public HybridDictionary (int initialSize, bool caseInsensitive);
```

Creates a `HybridDictionary` with the specified initial size and case sensitivity.

Parameters:

- `initialSize`: The approximate number of entries that the `HybridDictionary` can initially contain.
- `caseInsensitive`: A Boolean that denotes whether the `HybridDictionary` is case-insensitive.

#### Remarks
If the initial size of the collection is greater than the optimal size for a `ListDictionary`, the collection is stored in a `Hashtable` to avoid the overhead of copying elements from the `ListDictionary` to the `Hashtable`.

If `caseInsensitive` is `false`, the collection uses the key's implementations of `Object.GetHashCode` and `Object.Equals`. If `caseInsensitive` is `true`, the collection performs a simple ordinal case-insensitive comparison, which obeys the casing rules of the invariant culture only. For more information on the invariant culture, see `CultureInfo`.

This constructor is an O(`n`) operation, where `n` is `initialSize`.

## HybridDictionary.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the `HybridDictionary`.

Returns: The number of key/value pairs contained in the `HybridDictionary`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Count/hybriddictionary_enumerator.cs._

## HybridDictionary.IsFixedSize property

```csharp
public bool IsFixedSize { get; }
```

Gets a value indicating whether the `HybridDictionary` has a fixed size.

Returns: This property always returns `false`.

#### Remarks
`HybridDictionary` implements the `IsFixedSize` property because it is required by the `IDictionary` interface.

A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## HybridDictionary.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `HybridDictionary` is read-only.

Returns: This property always returns `false`.

#### Remarks
`HybridDictionary` implements the `IsReadOnly` property because it is required by the `IDictionary` interface.

A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## HybridDictionary.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether the `HybridDictionary` is synchronized (thread safe).

Returns: This property always returns `false`.

#### Remarks
`HybridDictionary` implements the `IsSynchronized` property because it is required by the `ICollection` interface.

Derived classes can provide a synchronized version of the `HybridDictionary` using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `HybridDictionary.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Overview/source2.cs._

Retrieving the value of this property is an O(1) operation.

## HybridDictionary.Item property

```csharp
public object? this[object key] { get; set; }
```

Gets or sets the value associated with the specified key.

Parameters:

- `key`: The key whose value to get or set.

Returns: The value associated with the specified key. If the specified key is not found, attempting to get it returns `null`, and attempting to set it creates a new entry using the specified key.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]`.

You can also use the `HybridDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `HybridDictionary`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `HybridDictionary`, setting the `HybridDictionary.Item` property overwrites the old value. In contrast, the `HybridDictionary.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can. To distinguish between `null` that is returned because the specified key is not found and `null` that is returned because the value of the specified key is `null`, use the `HybridDictionary.Contains` method to determine if the key <example-value> in the list.

The C# language uses the this keyword to define the indexers instead of implementing the `HybridDictionary.Item` property. Visual Basic <example-value> `HybridDictionary.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

#### Examples
The following code example enumerates the elements of a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Count/hybriddictionary_enumerator.cs._

## HybridDictionary.Keys property

```csharp
public System.Collections.ICollection Keys { get; }
```

Gets an `ICollection` containing the keys in the `HybridDictionary`.

Returns: An `ICollection` containing the keys in the `HybridDictionary`.

#### Remarks
The order of the values in the `ICollection` is unspecified, but it is the same order as the associated values in the `ICollection` returned by the `HybridDictionary.Values` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the keys in the original `HybridDictionary`. Therefore, changes to the `HybridDictionary` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Count/hybriddictionary_enumerator.cs._

## HybridDictionary.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `HybridDictionary`.

Returns: An object that can be used to synchronize access to the `HybridDictionary`.

#### Remarks
Derived classes can provide their own synchronized version of the `HybridDictionary` using the `SyncRoot` property. The synchronizing code must perform operations on the `HybridDictionary.SyncRoot` of the `HybridDictionary`, not directly on the `HybridDictionary`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `HybridDictionary` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `HybridDictionary.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Overview/source2.cs._

Retrieving the value of this property is an O(1) operation.

## HybridDictionary.Values property

```csharp
public System.Collections.ICollection Values { get; }
```

Gets an `ICollection` containing the values in the `HybridDictionary`.

Returns: An `ICollection` containing the values in the `HybridDictionary`.

#### Remarks
The order of the values in the `ICollection` is unspecified, but it is the same order as the associated keys in the `ICollection` returned by the `HybridDictionary.Keys` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the values in the original `HybridDictionary`. Therefore, changes to the `HybridDictionary` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `HybridDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/HybridDictionary/Count/hybriddictionary_enumerator.cs._
