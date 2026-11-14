---
title: "KeyedCollection<TKey,TItem> class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/KeyedCollection`2.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyedCollection<TKey,TItem> class (part 3 of 4)

## KeyedCollection<TKey,TItem>.GetKeyForItem(TItem) method

```csharp
protected abstract TKey <example-value> (TItem item);
```

When implemented in a derived class, extracts the key from the specified element.

Parameters:

- `item`: The element from which to extract the key.

Returns: The key for the specified element.

#### Remarks

If the key in the lookup dictionary is different from the key that is embedded in `item`, you cannot access `item` by using the key <example-value> by `KeyedCollection<T1,T2>.GetKeyForItem`.

You can implement this method to return `null` for a collection that contains items without keys, in which case the items can be accessed only by their index. This method is an O(1) operation.

#### Notes for Implementers

You must override this method to provide the dictionary with a way to extract keys from items in the dictionary.

This method is called internally. It is not necessary for it to be public.

#### Examples

This code example shows the minimum code necessary to derive a collection class from `KeyedCollection<T1,T2>`: overriding the `KeyedCollection<T1,T2>.GetKeyForItem` method and providing a public constructor that delegates to a base class constructor. The code example also demonstrates many of the properties and methods inherited from `KeyedCollection<T1,T2>` and `Collection<T>` classes.

The `SimpleOrder` class is a very simple requisition list that contains `OrderItem` objects, each of which represents a line item in the order. The key of `OrderItem` is immutable, an important consideration for classes that derive from `KeyedCollection<T1,T2>`. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source.cs._

## KeyedCollection<TKey,TItem>.InsertItem(Int32, TItem) method

```csharp
protected override void InsertItem (int index, TItem item);
```

Inserts an element into the `KeyedCollection<T1,T2>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than `Collection<T>.Count`.

#### Remarks

If `index` is equal to `Collection<T>.Count`, `item` is added to the end of the `KeyedCollection<T1,T2>`.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

`KeyedCollection<T1,T2>.InsertItem` is called by the `Collection<T>.Add` and `Collection<T>.Insert` methods.

#### Notes for Implementers

Override this method to provide customized behavior for the `Collection<T>.Add` and `Collection<T>.Insert` methods, inherited from the `Collection<T>` generic class.

Call the base class implementation of this method to insert the item into the underlying collection and to update the lookup dictionary.

#### Examples

This section contains two code examples that demonstrate overriding the `KeyedCollection<T1,T2>.InsertItem` method to provide custom behavior for adding or inserting objects into the collection. The first example adds a custom notification event and the second provides support for a collection of objects with mutable keys.

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

## KeyedCollection<TKey,TItem>.Remove(TKey) method

```csharp
public bool Remove (TKey key);
```

Removes the element with the specified key from the `KeyedCollection<T1,T2>`.

Parameters:

- `key`: The key of the element to remove.

Returns: `true` if the element is successfully removed; otherwise, `false`.  This method also returns `false` if `key` is not found in the `KeyedCollection<T1,T2>`.

Exceptions:

- `ArgumentNullException`: `key` is `null`.

#### Remarks
The key of the element is also removed from the lookup dictionary.

If the number of elements has exceeded the dictionary creation threshold and the `KeyedCollection<T1,T2>` is using a lookup dictionary, it will continue to use a lookup dictionary even though the number of elements is again under the threshold.

> **Note:**
> To customize the behavior of this method, override the `KeyedCollection<T1,T2>.RemoveItem` method.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Examples
This code example shows the minimum code necessary to derive a collection class from `KeyedCollection<T1,T2>`: overriding the `KeyedCollection<T1,T2>.GetKeyForItem` method and providing a public constructor that delegates to a base class constructor. The code example also demonstrates many of the properties and methods inherited from `KeyedCollection<T1,T2>` and `Collection<T>` classes.

The example demonstrates `KeyedCollection<T1,T2>.Remove` method inherited from `KeyedCollection<T1,T2>`, which removes the item with a specified key, and also the `Collection<T>.Remove` and `Collection<T>.RemoveAt` methods inherited from `Collection<T>`, which remove by object and by index respectively.

The `SimpleOrder` class is a very simple requisition list that contains `OrderItem` objects, each of which represents a line item in the order. The key of `OrderItem` is immutable, an important consideration for classes that derive from `KeyedCollection<T1,T2>`. For a code example that uses mutable keys, see `KeyedCollection<T1,T2>.ChangeItemKey`.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/KeyedCollectionTKey,TItem/Overview/source.cs._

## KeyedCollection<TKey,TItem>.RemoveItem(Int32) method

```csharp
protected override void RemoveItem (int index);
```

Removes the element at the specified index of the `KeyedCollection<T1,T2>`.

Parameters:

- `index`: The index of the element to remove.

#### Remarks

The key of the element is also removed from the lookup dictionary.

If the number of elements has exceeded the dictionary creation threshold and the `KeyedCollection<T1,T2>` is using a lookup dictionary, it will continue to use a lookup dictionary even though the number of elements is again under the threshold.

This method is an O(`n`) operation, where `n` is `Collection<T>.Count`.

#### Notes for Implementers

Override this method to provide customized behavior for the `Remove` and `RemoveAt` methods, inherited from the `Collection<T>` generic class, and the `Remove` method.

Call the base class implementation of this method to remove the item from the underlying collection and to update the lookup dictionary.

#### Examples

This section contains two code examples that demonstrate overriding the `KeyedCollection<T1,T2>.RemoveItem` method to provide custom behavior for removing objects from the collection. The first example adds a custom notification event and the second provides support for a collection of objects with mutable keys.

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
