---
title: "ListDictionary class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/ListDictionary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListDictionary class

Namespace: `System.Collections.Specialized`

```csharp
public class ListDictionary : System.Collections.IDictionary
```

Implements `IDictionary` using a singly linked list. Recommended for collections that typically include fewer than 10 items.

#### Remarks
This is a simple implementation of `IDictionary` using a singly linked list. It is smaller and faster than a `Hashtable` if the number of elements is 10 or less. This should not be used if performance is important for large numbers of elements.

Items in a `ListDictionary` are not in any guaranteed order; code should not depend on the current order. The `ListDictionary` is implemented for fast keyed retrieval; the actual internal order of items is implementation-dependent and could change in future versions of the product.

Members, such as `ListDictionary.Item`, `ListDictionary.Add`, `ListDictionary.Remove`, and `ListDictionary.Contains` are O(`n`) operations, where `n` is `ListDictionary.Count`.

A key <example-value> be `null`, but a value can.

The `foreach` statement of the C# language (`for each` in Visual Basic) returns an object of the type of the elements in the collection. Since each element of the `ListDictionary` is a key/value pair, the element type is not the type of the key or the type of the value. Instead, the element type is `DictionaryEntry`. For example:

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Overview/source2.cs._

The `foreach` statement is a wrapper around the enumerator, which only allows reading from, not writing to, the collection.

#### Examples
The following code example demonstrates several of the properties and methods of `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Overview/listdictionary.cs._

## ListDictionary.ListDictionary() constructor

```csharp
public ListDictionary ();
```

Creates an empty `ListDictionary` using the default comparer.

#### Remarks
The comparer determines whether two keys are equal. Every key in a `ListDictionary` must be unique. The default comparer is the key's implementation of `Object.Equals`.

This constructor is an O(1) operation.

#### Examples
The following code example demonstrates several of the properties and methods of `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Overview/listdictionary.cs._

## ListDictionary.ListDictionary(IComparer) constructor

```csharp
public ListDictionary (System.Collections.IComparer? comparer);
```

Creates an empty `ListDictionary` using the specified comparer.

Parameters:

- `comparer`: The `IComparer` to use to determine whether two keys are equal.

-or-

`null` to use the default comparer, which is each key's implementation of `Object.Equals`.

#### Remarks
The comparer determines whether two keys are equal. Every key in a `ListDictionary` must be unique. The default comparer is the key's implementation of `Object.Equals`.

The custom comparer enables such scenarios as doing lookups with case-insensitive strings.

This constructor is an O(1) operation.

## ListDictionary.Count property

```csharp
public int Count { get; }
```

Gets the number of key/value pairs contained in the `ListDictionary`.

Returns: The number of key/value pairs contained in the `ListDictionary`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Count/listdictionary_enumerator.cs._

## ListDictionary.IsFixedSize property

```csharp
public bool IsFixedSize { get; }
```

Gets a value indicating whether the `ListDictionary` has a fixed size.

Returns: This property always returns `false`.

#### Remarks
`ListDictionary` implements the `IsFixedSize` property because it is required by the `IDictionary` interface.

A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## ListDictionary.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `ListDictionary` is read-only.

Returns: This property always returns `false`.

#### Remarks
`ListDictionary` implements the `IsReadOnly` property because it is required by the `IDictionary` interface.

A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## ListDictionary.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value indicating whether the `ListDictionary` is synchronized (thread safe).

Returns: This property always returns `false`.

#### Remarks
`ListDictionary` implements the `IsSynchronized` property because it is required by the `ICollection` interface.

Derived classes can provide a synchronized version of the `ListDictionary` using the `SyncRoot` property.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ListDictionary.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Overview/source2.cs._

Retrieving the value of this property is an O(1) operation.

## ListDictionary.Item property

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

You can also use the `ListDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `ListDictionary`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `ListDictionary`, setting the `ListDictionary.Item` property overwrites the old value. In contrast, the `ListDictionary.Add` method does not modify existing elements.

A key <example-value> be `null`, but a value can. To distinguish between `null` that is returned because the specified key is not found and `null` that is returned because the value of the specified key is `null`, use the `ListDictionary.Contains` method to determine if the key <example-value> in the list.

The C# language uses the this keyword to define the indexers instead of implementing the `ListDictionary.Item` property. Visual Basic <example-value> `ListDictionary.Item` as a default property, which provides the same indexing functionality.

This method is an O(`n`) operation, where `n` is `ListDictionary.Count`.

#### Examples
The following code example enumerates the elements of a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Count/listdictionary_enumerator.cs._

## ListDictionary.Keys property

```csharp
public System.Collections.ICollection Keys { get; }
```

Gets an `ICollection` containing the keys in the `ListDictionary`.

Returns: An `ICollection` containing the keys in the `ListDictionary`.

#### Remarks
The order of the values in the `ICollection` is unspecified, but it is the same order as the associated values in the `ICollection` returned by the `ListDictionary.Values` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the keys in the original `ListDictionary`. Therefore, changes to the `ListDictionary` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Count/listdictionary_enumerator.cs._

## ListDictionary.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ListDictionary`.

Returns: An object that can be used to synchronize access to the `ListDictionary`.

#### Remarks
Derived classes can provide their own synchronized version of the `ListDictionary` using the `SyncRoot` property. The synchronizing code must perform operations on the `ListDictionary.SyncRoot` of the `ListDictionary`, not directly on the `ListDictionary`. This ensures proper operation of collections that are derived from other objects. Specifically, it maintains proper synchronization with other threads that might be simultaneously modifying the `ListDictionary` object.

Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions resulting from changes made by other threads.

#### Examples
The following code example shows how to lock the collection using the `ListDictionary.SyncRoot` during the entire enumeration.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Overview/source2.cs._

Retrieving the value of this property is an O(1) operation.

## ListDictionary.Values property

```csharp
public System.Collections.ICollection Values { get; }
```

Gets an `ICollection` containing the values in the `ListDictionary`.

Returns: An `ICollection` containing the values in the `ListDictionary`.

#### Remarks
The order of the values in the `ICollection` is unspecified, but it is the same order as the associated keys in the `ICollection` returned by the `ListDictionary.Keys` method.

The returned `ICollection` is not a static copy; instead, the `ICollection` refers back to the values in the original `ListDictionary`. Therefore, changes to the `ListDictionary` continue to be reflected in the `ICollection`.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example enumerates the elements of a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Count/listdictionary_enumerator.cs._

## ListDictionary.Add(Object, Object) method

```csharp
public void Add (object key, object? value);
```

Adds an entry with the specified key and value into the `ListDictionary`.

Parameters:

- `key`: The key of the entry to add.
- `value`: The value of the entry to add. The value can be `null`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `ArgumentException`: An entry with the same key <example-value> exists in the `ListDictionary`.

#### Remarks
An object that has no correlation between its state and its hash code value should typically not be used as the key. For example, String objects are better than StringBuilder objects for use as keys.

You can also use the `ListDictionary.Item` property to add new elements by setting the value of a key that does not exist in the `ListDictionary`; for example, `myCollection["myNonexistentKey"] = myValue`. However, if the specified key <example-value> exists in the `ListDictionary`, setting the `ListDictionary.Item` property overwrites the old value. In contrast, the `ListDictionary.Add` method does not modify existing elements.

This method is an O(`n`) operation, where `n` is `ListDictionary.Count`.

#### Examples
The following code example adds to and removes elements from a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Add/listdictionary_addremove.cs._

## ListDictionary.Clear() method

```csharp
public void Clear ();
```

Removes all entries from the `ListDictionary`.

#### Remarks
`ListDictionary.Count` is set to zero, and references to other objects from elements of the collection are also released.

This method is an O(1) operation.

#### Examples
The following code example adds to and removes elements from a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Add/listdictionary_addremove.cs._

## ListDictionary.Contains(Object) method

```csharp
public bool Contains (object key);
```

Determines whether the `ListDictionary` contains a specific key.

Parameters:

- `key`: The key to locate in the `ListDictionary`.

Returns: `true` if the `ListDictionary` contains an entry with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
This method is an O(`n`) operation, where `n` is `ListDictionary.Count`.

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `key` to determine whether `item` exists.

#### Examples
The following code example searches for an element in a `ListDictionary`.

_Code sample not included: ~/snippets/csharp/System.Collections.Specialized/ListDictionary/Contains/listdictionary_contains.cs._
