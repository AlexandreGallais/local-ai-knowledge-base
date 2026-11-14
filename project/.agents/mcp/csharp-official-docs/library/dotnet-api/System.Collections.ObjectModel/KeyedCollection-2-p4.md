---
title: "KeyedCollection<TKey,TItem> class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/KeyedCollection`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyedCollection<TKey,TItem> class (part 4 of 4)

## KeyedCollection<TKey,TItem>.SetItem(Int32, TItem) method

```csharp
protected override void SetItem (int index, TItem item);
```

Replaces the item at the specified index with the specified item.

Parameters:

- `index`: The zero-based index of the item to be replaced.
- `item`: The new item.

#### Remarks

The lookup dictionary is updated accordingly. That is, the key of the item that is being replaced is removed from the lookup dictionary, and the key of the new item is added.

This method is an O(1) operation.

#### Notes for Implementers

Override this method to provide customized behavior for setting the `Collection<T>.Item` property inherited from the `Collection<T>` generic class.

> **Note:**
> This method does not affect the behavior of the `KeyedCollection<T1,T2>.Item` property, which is read-only.

Call the base class implementation of this method to set the item in the underlying collection and to update the lookup dictionary.

#### Examples

This section contains two code examples that demonstrate overriding the `KeyedCollection<T1,T2>.SetItem` method to provide custom behavior for setting the `Collection<T>.Item` property. The first example adds a custom notification event and the second provides support for a collection of objects with mutable keys.

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

## KeyedCollection<TKey,TItem>.TryGetValue(TKey, TItem) method

```csharp
public bool TryGetValue (TKey key, out TItem item);
```

Tries to get an item from the collection using the specified key.

Parameters:

- `key`: The key of the item to search in the collection.
- `item`: When this method returns `true`, the item from the collection that matches the provided key; when this method returns `false`, the `default` value for the type of the collection.

Returns: `true` if an item for the specified key was found in the collection; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

To be added.
