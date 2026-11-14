---
title: "KeyedByTypeCollection<TItem> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/KeyedByTypeCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# KeyedByTypeCollection<TItem> class

Namespace: `System.Collections.Generic`

```csharp
public class KeyedByTypeCollection<TItem> : System.Collections.ObjectModel.KeyedCollection<Type,TItem>
```

Provides a collection whose items are types that serve as keys.

Parameters:

- `TItem`: The item types contained in the collection that also serve as the keys for the collection.

#### Remarks
Only one object of each type is allowed in the collection because the type is the key and each key must be unique. But you can find objects of different types.

## KeyedByTypeCollection<TItem>.KeyedByTypeCollection() constructor

```csharp
public KeyedByTypeCollection ();
```

Initializes a new instance of the `KeyedByTypeCollection<T>` class.

To be added.

## KeyedByTypeCollection<TItem>.KeyedByTypeCollection(IEnumerable<TItem>) constructor

```csharp
public KeyedByTypeCollection (System.Collections.Generic.IEnumerable<TItem> items);
```

Initializes a new instance of the `KeyedByTypeCollection<T>` class for a specified enumeration of objects.

Parameters:

- `items`: The `IEnumerable<T>` of generic type `Object` used to initialize the collection.

Exceptions:

- `ArgumentNullException`: `items` is `null`.

To be added.

## KeyedByTypeCollection<TItem>.Find<T>() method

```csharp
public T Find<T> ();
```

Returns the first item in the collection of a specified type.

Parameters:

- `T`: The type of item in the collection to find.

Returns: The object of type `T` if it is a reference type and the value of type `T` if it is a value type. The default value of the type is returned if no object of type `T` is contained in the collection: `null` if it is a reference type and 0 if it is a value type.

To be added.

## KeyedByTypeCollection<TItem>.FindAll<T>() method

```csharp
public System.Collections.ObjectModel.Collection<T> FindAll<T> ();
```

Returns a collection of objects of type `T` that are contained in the `KeyedByTypeCollection<T>`.

Parameters:

- `T`: The type of item in the collection to find.

Returns: A `Collection<T>` of type `T` that contains the objects of type `T` from the original collection.

To be added.

## KeyedByTypeCollection<TItem>.GetKeyForItem(TItem) method

```csharp
protected override Type GetKeyForItem (TItem item);
```

Gets the type of an item contained in the collection.

Parameters:

- `item`: The item in the collection whose type is to be retrieved.

Returns: The type of the specified `item` in the collection.

Exceptions:

- `ArgumentNullException`: `item` is `null`.

To be added.

## KeyedByTypeCollection<TItem>.InsertItem(Int32, TItem) method

```csharp
protected override void InsertItem (int index, TItem item);
```

Inserts an element into the collection at a specific location.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the collection.

Exceptions:

- `ArgumentNullException`: `item` is `null`.

To be added.

## KeyedByTypeCollection<TItem>.Remove<T>() method

```csharp
public T Remove<T> ();
```

Removes an object of a specified type from the collection.

Parameters:

- `T`: The type of item in the collection to remove.

Returns: The object removed from the collection.

To be added.

## KeyedByTypeCollection<TItem>.RemoveAll<T>() method

```csharp
public System.Collections.ObjectModel.Collection<T> RemoveAll<T> ();
```

Removes all of the elements of a specified type from the collection.

Parameters:

- `T`: The type of item in the collection to remove.

Returns: The `Collection<T>` that contains the objects of type `T` from the original collection.

To be added.

## KeyedByTypeCollection<TItem>.SetItem(Int32, TItem) method

```csharp
protected override void SetItem (int index, TItem item);
```

Replaces the item at the specified index with a new object.

Parameters:

- `index`: The zero-based index of the `item` to be replaced.
- `item`: The object to add to the collection.

Exceptions:

- `ArgumentNullException`: `item` is `null`.

To be added.
