---
title: "KeyedCollection<TKey,TItem> class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/KeyedCollection`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyedCollection<TKey,TItem> class (part 2 of 4)

## KeyedCollection<TKey,TItem>.Dictionary property

```csharp
protected System.Collections.Generic.IDictionary<TKey,TItem>? Dictionary { get; }
```

Gets the lookup dictionary of the `KeyedCollection<T1,T2>`.

Returns: The lookup dictionary of the `KeyedCollection<T1,T2>`, if it exists; otherwise, `null`.

#### Remarks
By default, the `KeyedCollection<T1,T2>` includes a lookup dictionary that is created when the first item is added. When an item is added to the `KeyedCollection<T1,T2>`, the item's key is extracted once and saved in the lookup dictionary for faster searches. This behavior can be overridden by using the `%23ctor` constructor and specifying a dictionary creation threshold.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example shows how to override the protected `KeyedCollection<T1,T2>.ChangeItemKey` method to support mutable keys, and how to override the protected `KeyedCollection<T1,T2>.InsertItem`, `KeyedCollection<T1,T2>.RemoveItem`, `KeyedCollection<T1,T2>.ClearItems`, and `KeyedCollection<T1,T2>.SetItem` methods to maintain the integrity of the keys and the collection.

The code example creates the `MutableKeys` collection, which derives from `KeyedCollection<T1,T2>`, and the `MutableKey` class. The `MutableKey` class has a settable `Key` property. When a new key is assigned to the property, the property setter calls the `internal` (`Friend` in Visual Basic) `ChangeKey` method of the collection to test whether the new key would conflict with an existing key. If so, an exception is thrown and the property value is not changed.

In order to maintain the connection between a `MutableKey` object and the `MutableKeys` collection and to prevent an object from being inserted into two collections, the `MutableKey` class has an `internal` (`Friend` in Visual Basic) `Collection` field. This field is maintained by the protected methods that provide custom behavior for adding and removing items from the collection, such as the `KeyedCollection<T1,T2>.InsertItem` method. The field is set when the item is added to a collection and cleared when the item is removed.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/ChangeItemKey/source.cs._

## KeyedCollection<TKey,TItem>.Item property

```csharp
public TItem this[TKey key] { get; }
```

Gets the element with the specified key.

Parameters:

- `key`: The key of the element to get.

Returns: The element with the specified key. If an element with the specified key is not found, an exception is thrown.

Exceptions:

- `ArgumentNullException`: `key` is `null`.
- `KeyNotFoundException`: An element with the specified key does not exist in the collection.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[key]` (`myCollection(key)` in Visual Basic).

> **Note:**
> This property is distinct from the inherited `Collection<T>.Item` property, which gets and sets elements by numeric index. However, if `TKey` is of type `Int32`, this property masks the inherited property. In that case, you can access the inherited property by casting the `KeyedCollection<T1,T2>` to its base type. For example, `KeyedCollection<int, MyType>` (`KeyedCollection(Of Integer, MyType)` in Visual Basic) can be cast to `Collection<MyType>` (`Collection(Of MyType)` in Visual Basic).

If the `KeyedCollection<T1,T2>` has a lookup dictionary, `key` is used to retrieve the element from the dictionary.  If there is no lookup dictionary, the key of each element is extracted using the `KeyedCollection<T1,T2>.GetKeyForItem` method and compared with the specified key.

The C# language uses the this keyword to define the indexers instead of implementing the `KeyedCollection<T1,T2>.Item` property. Visual Basic <example-value> `KeyedCollection<T1,T2>.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation if the `KeyedCollection<T1,T2>` has a lookup dictionary; otherwise it is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
This code example shows the minimum code necessary to derive a collection class from `KeyedCollection<T1,T2>`: overriding the `KeyedCollection<T1,T2>.GetKeyForItem` method and providing a public constructor that delegates to a base class constructor. The code example also demonstrates many of the properties and methods inherited from `KeyedCollection<T1,T2>` and `Collection<T>` classes.

The code example calls both the `KeyedCollection<T1,T2>.Item` property, which is read-only and retrieves by key, and the `Collection<T>.Item` property, which is settable and retrieves by index. It shows how to access the latter property when the objects in the derived collection have integer keys, indistinguishable from the integers used for indexed retrieval.

The `SimpleOrder` class is a very simple requisition list that contains `OrderItem` objects, each of which represents a line item in the order. The key of `OrderItem` is immutable, an important consideration for classes that derive from `KeyedCollection<T1,T2>`. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source.cs._

## KeyedCollection<TKey,TItem>.ChangeItemKey(TItem, TKey) method

```csharp
protected void ChangeItemKey (TItem item, TKey <example-value>);
```

Changes the key <example-value> with the specified element in the lookup dictionary.

Parameters:

- `item`: The element to change the key of.
- `newKey`: The new key for `item`.

Exceptions:

- `ArgumentNullException`: `item` is `null`.

-or-

`newKey` is `null`.
- `ArgumentException`: `item` is not found.

-or-

`newKey` already exists in the `KeyedCollection<T1,T2>`.

The `ChangeItemKey` method does not modify the key <example-value> in `item`; it simply replaces the key saved in the lookup dictionary. Therefore, if `newKey` is different from the key that is embedded in `item`, you cannot access `item` by using the key <example-value> by `KeyedCollection<T1,T2>.GetKeyForItem`.

This method does nothing if the `KeyedCollection<T1,T2>` does not have a lookup dictionary.

Every key in a `KeyedCollection<T1,T2>` must be unique. A key <example-value> be `null`.

This method is an O(1) operation.

#### Notes for implementers

Before modifying the key <example-value> in an item, you must call this method to update the key in the lookup dictionary. If the dictionary creation threshold is -1, calling this method is not necessary.

Do not expose the `KeyedCollection<T1,T2>.ChangeItemKey` method as a public method of a derived class. Misuse of this method puts the lookup dictionary out of sync with item keys. For example, setting the key to `null` and then setting it to another value adds multiple keys for an item to the lookup dictionary. Expose this method internally to allow mutable item keys: When the key for an item changes, this method is used to change the key in the lookup dictionary.

The following code example shows how to override the protected `KeyedCollection<T1,T2>.ChangeItemKey` method to support mutable keys, and how to override the protected `KeyedCollection<T1,T2>.InsertItem`, `KeyedCollection<T1,T2>.RemoveItem`, `KeyedCollection<T1,T2>.ClearItems`, and `KeyedCollection<T1,T2>.SetItem` methods to maintain the integrity of the keys and the collection.

The code example creates the `MutableKeys` collection, which derives from `KeyedCollection<T1,T2>`, and the `MutableKey` class. The `MutableKey` class has a settable `Key` property. When a new key is assigned to the property, the property setter calls the `internal` `ChangeKey` method of the collection to test whether the new key would conflict with an existing key. If so, an exception is thrown and the property value is not changed.

In order to maintain the connection between a `MutableKey` object and the `MutableKeys` collection and to prevent an object from being inserted into two collections, the `MutableKey` class has an `internal` `Collection` field. This field is maintained by the protected methods that provide custom behavior for adding and removing items from the collection, such as the `KeyedCollection<T1,T2>.InsertItem` method. The field is set when the item is added to a collection and cleared when the item is removed.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/ChangeItemKey/source.cs._

## KeyedCollection<TKey,TItem>.ClearItems() method

```csharp
protected override void ClearItems ();
```

Removes all elements from the `KeyedCollection<T1,T2>`.

#### Remarks

If there is a lookup dictionary, this method clears it but does not delete it.

If the number of elements has exceeded the dictionary creation threshold and the `KeyedCollection<T1,T2>` is using a lookup dictionary, it will continue to use a lookup dictionary even though the number of elements is again under the threshold.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Notes for Implementers

Override this method to provide customized behavior for the `Collection<T>.Clear` method, inherited from the `Collection<T>` generic class.

Call the base class implementation of this method to clear the underlying collection and to clear the lookup dictionary.

#### Examples

This section contains two code examples that demonstrate overriding the `KeyedCollection<T1,T2>.ClearItems` method to provide custom behavior for clearing all objects from the collection. The first example adds a custom notification event and the second provides support for a collection of objects with mutable keys.

Example 1

The following code example shows how to override the protected `KeyedCollection<T1,T2>.InsertItem`, `KeyedCollection<T1,T2>.RemoveItem`, `KeyedCollection<T1,T2>.ClearItems`, and `KeyedCollection<T1,T2>.SetItem` methods, to provide custom behavior for the `Collection<T>.Add`, `KeyedCollection<T1,T2>.Remove`, and `Collection<T>.Clear` methods, and for setting the default `Collection<T>.Item` property (the indexer in C#). The custom behavior provided in this example is a notification event named `Changed`, which is raised at the end of each of the overridden methods.

The code example creates the `SimpleOrder` class, which derives from `KeyedCollection<T1,T2>` and represents a simple order form. The order form contains `OrderItem` objects representing items ordered. The code example also creates a `SimpleOrderChangedEventArgs` class to contain the event information, and an enumeration to identify the type of change.

The code example demonstrates the custom behavior by calling the properties and methods of the derived class, in the `Main` method of the `Demo` class.

This code example uses objects with immutable keys. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source1.cs._

Example 2

The following code example shows how to override the protected `KeyedCollection<T1,T2>.ChangeItemKey` method to support mutable keys, and how to override the protected `KeyedCollection<T1,T2>.InsertItem`, `KeyedCollection<T1,T2>.RemoveItem`, `KeyedCollection<T1,T2>.ClearItems`, and `KeyedCollection<T1,T2>.SetItem` methods to maintain the integrity of the keys and the collection.

The code example creates the `MutableKeys` collection, which derives from `KeyedCollection<T1,T2>`, and the `MutableKey` class. The `MutableKey` class has a settable `Key` property. When a new key is assigned to the property, the property setter calls the `internal` (`Friend` in Visual Basic) `ChangeKey` method of the collection to test whether the new key would conflict with an existing key. If so, an exception is thrown and the property value is not changed.

In order to maintain the connection between a `MutableKey` object and the `MutableKeys` collection and to prevent an object from being inserted into two collections, the `MutableKey` class has an `internal` (`Friend` in Visual Basic) `Collection` field. This field is maintained by the protected methods that provide custom behavior for adding and removing items from the collection, such as the `KeyedCollection<T1,T2>.InsertItem` method. The field is set when the item is added to a collection and cleared when the item is removed.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/ChangeItemKey/source.cs._

## KeyedCollection<TKey,TItem>.Contains(TKey) method

```csharp
public bool Contains (TKey key);
```

Determines whether the collection contains an element with the specified key.

Parameters:

- `key`: The key to locate in the `KeyedCollection<T1,T2>`.

Returns: `true` if the `KeyedCollection<T1,T2>` contains an element with the specified key; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
If the `KeyedCollection<T1,T2>` has a lookup dictionary, `key` is used to search the dictionary. If there is no lookup dictionary, the key of each element is extracted using the `KeyedCollection<T1,T2>.GetKeyForItem` method and compared with the specified key.

This method is an O(1) operation if the `KeyedCollection<T1,T2>` has a lookup dictionary; otherwise it is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
This code example shows the minimum code necessary to derive a collection class from `KeyedCollection<T1,T2>`: overriding the `KeyedCollection<T1,T2>.GetKeyForItem` method and providing a public constructor that delegates to a base class constructor. The code example also demonstrates many of the properties and methods inherited from `KeyedCollection<T1,T2>` and `Collection<T>` classes.

The `SimpleOrder` class is a very simple requisition list that contains `OrderItem` objects, each of which represents a line item in the order. The key of `OrderItem` is immutable, an important consideration for classes that derive from `KeyedCollection<T1,T2>`. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source.cs._
