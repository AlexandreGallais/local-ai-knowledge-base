---
title: "Collection<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/Collection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Collection<T> class

Namespace: `System.Collections.ObjectModel`

```csharp
public class Collection<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.IList
```

Provides the base class for a generic collection.

Parameters:

- `T`: The type of elements in the collection.

#### Remarks
The `Collection<T>` class can be used immediately by creating an instance of one of its constructed types; all you have to do is specify the type of object to be contained in the collection. In addition, you can derive your own collection type from any constructed type, or derive a generic collection type from the `Collection<T>` class itself.

The `Collection<T>` class provides protected methods that can be used to customize its behavior when adding and removing items, clearing the collection, or setting the value of an existing item.

Most `Collection<T>` objects can be modified. However, a `Collection<T>` object that is initialized with a read-only `IList<T>` object cannot be modified. See `ReadOnlyCollection<T>` for a read-only version of this class.

Elements in this collection can be accessed using an integer index. Indexes in this collection are zero-based.

`Collection<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

#### Examples
This section contains two code examples. The first example demonstrates several properties and methods of the `Collection<T>` class. The second example shows how to derive a collection class from a constructed type of `Collection<T>`, and how to override the protected methods of `Collection<T>` to provide custom behavior.

Example 1

The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

Example 2

The following code example shows how to derive a collection class from a constructed type of the `Collection<T>` generic class, and how to override the protected `Collection<T>.InsertItem`, `Collection<T>.RemoveItem`, `Collection<T>.ClearItems`, and `Collection<T>.SetItem` methods to provide custom behavior for the `Collection<T>.Add`, `Collection<T>.Insert`, `Collection<T>.Remove`, and `Collection<T>.Clear` methods, and for setting the `Collection<T>.Item` property.

The custom behavior provided by this example is a `Changed` notification event that is raised at the end of each of the protected methods. The `Dinosaurs` class inherits `Collection<string>` (`Collection(Of String)` in Visual Basic) and defines the `Changed` event, which uses a `DinosaursChangedEventArgs` class for the event information, and an enumeration to identify the kind of change.

The code example calls several properties and methods of `Collection<T>` to demonstrate the custom event.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source1.cs._

## Collection<T>.Collection() constructor

```csharp
public Collection ();
```

Initializes a new instance of the `Collection<T>` class that is empty.

#### Remarks
This constructor is an O(1) operation.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings with the `%23ctor` constructor, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.Collection(IList<T>) constructor

```csharp
public Collection (System.Collections.Generic.IList<T> list);
```

Initializes a new instance of the `Collection<T>` class as a wrapper for the specified list.

Parameters:

- `list`: The list that is wrapped by the new collection.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
The elements of the list are not copied. The list is wrapped by the collection, so that subsequent changes to the elements of the list are visible through the `Collection<T>`.

This constructor is an O(1) operation.

## Collection<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements actually contained in the `Collection<T>`.

Returns: The number of elements actually contained in the `Collection<T>`.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `Collection<T>.Count`.

#### Remarks
`Collection<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `Collection<T>.Item` property. Visual Basic <example-value> `Collection<T>.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

#### Examples
The following code example demonstrates many of the properties and methods of `Collection<T>`. The code example creates a collection of strings, uses the `Collection<T>.Add` method to add several strings, displays the `Collection<T>.Count`, and lists the strings. The example uses the `Collection<T>.IndexOf` method to find the index of a string and the `Collection<T>.Contains` method to determine whether a string is in the collection. The example inserts a string using the `Collection<T>.Insert` method and retrieves and sets strings using the default `Collection<T>.Item` property (the indexer in C#). The example removes strings by string identity using the `Collection<T>.Remove` method and by index using the `Collection<T>.RemoveAt` method. Finally, the `Collection<T>.Clear` method is used to clear all strings from the collection.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/CollectionT/Overview/source.cs._

## Collection<T>.Items property

```csharp
protected System.Collections.Generic.IList<T> Items { get; }
```

Gets a `IList<T>` wrapper around the `Collection<T>`.

Returns: A `IList<T>` wrapper around the `Collection<T>`.

#### Remarks
The wrapper provides the functionality of the `IList<T>` class and exposes all the elements of the `Collection<T>`.

Retrieving the value of this property is an O(1) operation.

## Collection<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`. In the default implementation of `Collection<T>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## Collection<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`. In the default implementation of `Collection<T>`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## Collection<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`. In the default implementation of `Collection<T>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration. To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

```csharp
ICollection ic = ...;
lock (ic.SyncRoot) {
   // Access the collection.
}
```

```vb
Dim ic As ICollection = ...
SyncLock ic.SyncRoot
   ' Access the collection.
End SyncLock
```

Retrieving the value of this property is an O(1) operation.

## Collection<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`. In the default implementation of `Collection<T>`, this property always returns `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## Collection<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`. In the default implementation of `Collection<T>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.
