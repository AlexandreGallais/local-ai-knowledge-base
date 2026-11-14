---
title: "ReadOnlyCollection<T> class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyCollection<T> class

Namespace: `System.Collections.ObjectModel`

```csharp
public class ReadOnlyCollection<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.Generic.IReadOnlyCollection<T>, System.Collections.Generic.IReadOnlyList<T>, System.Collections.IList
```

Provides the base class for a generic read-only collection.

Parameters:

- `T`: The type of elements in the collection.

#### Remarks
An instance of the `ReadOnlyCollection<T>` generic class is always read-only.  A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.  See `Collection<T>` for a modifiable version of this class.

#### Examples
The following code example demonstrates several members of the `ReadOnlyCollection<T>` class. The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>`.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.ReadOnlyCollection(IList<T>) constructor

```csharp
public ReadOnlyCollection (System.Collections.Generic.IList<T> list);
```

Initializes a new instance of the `ReadOnlyCollection<T>` class that is a read-only wrapper around the specified list.

Parameters:

- `list`: The list to wrap.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

#### Remarks
To prevent any modifications to `list`, expose `list` only through this wrapper.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

This constructor is an O(1) operation.

#### Examples
The following code example demonstrates this constructor and several members of the `ReadOnlyCollection<T>` class.

The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>` by passing it to the constructor.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the `ReadOnlyCollection<T>` instance.

Returns: The number of elements contained in the `ReadOnlyCollection<T>` instance.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example demonstrates several members of the `ReadOnlyCollection<T>` class. The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>`.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.Empty property

```csharp
public static System.Collections.ObjectModel.ReadOnlyCollection<T> Empty { get; }
```

Gets an empty `ReadOnlyCollection<T>`.

Returns: An empty `ReadOnlyCollection<T>`.

The returned instance is immutable and will always be empty.

## ReadOnlyCollection<T>.Item property

```csharp
public T this[int index] { get; }
```

Gets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is equal to or greater than `ReadOnlyCollection<T>.Count`.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following C# syntax: `myCollection[index]` (`myCollection(index)` in Visual Basic).

The C# language uses the this keyword to define the indexers instead of implementing the `ReadOnlyCollection<T>.Item` property. Visual Basic <example-value> `ReadOnlyCollection<T>.Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example demonstrates several members of the `ReadOnlyCollection<T>` class. The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>`.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.Items property

```csharp
protected System.Collections.Generic.IList<T> Items { get; }
```

Returns the `IList<T>` that the `ReadOnlyCollection<T>` wraps.

Returns: The `IList<T>` that the `ReadOnlyCollection<T>` wraps.

#### Remarks
Retrieving the value of this property is an O(1) operation.

#### Examples
The following code example demonstrates several members of the `ReadOnlyCollection<T>` class. The code example creates a `List<T>` of strings and adds four dinosaur names to it. The code example then wraps the list in a `ReadOnlyCollection<T>`.

After demonstrating the `ReadOnlyCollection<T>.Count`, `ReadOnlyCollection<T>.Contains`, `ReadOnlyCollection<T>.Item`, and `ReadOnlyCollection<T>.System%23Collections%23IList%23IndexOf` members, the code example shows that the `ReadOnlyCollection<T>` is just a wrapper for the original `List<T>` by adding a new item to the `List<T>` and displaying the contents of the `ReadOnlyCollection<T>`.

Finally, the code example creates an array larger than the collection and uses the `ReadOnlyCollection<T>.CopyTo` method to insert the elements of the collection into the middle of the array.

_Code sample not included: ~/snippets/csharp/System.Collections.ObjectModel/ReadOnlyCollectionT/Overview/source.cs._

## ReadOnlyCollection<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.  In the default implementation of `ReadOnlyCollection<T>`, this property always returns `true`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IDisposable` interface.

## ReadOnlyCollection<T>.System.Collections.Generic.IList<T>.Item property

```csharp
T System.Collections.Generic.IList<T>.Item[int index] { get; set; }
```

Gets the element at the specified index. An `NotSupportedException` occurs if you try to set the item at the specified index.

Parameters:

- `index`: The zero-based index of the element to get.

Returns: The element at the specified index.

Exceptions:

- `NotSupportedException`: Always thrown if the property is set.

#### Remarks
Because the collection is read-only, you can only get this item at the specified index. An exception will occur if you try to set the item. This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IList<T>` interface.

## ReadOnlyCollection<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `ReadOnlyCollection<T>`, this property always returns `false`.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`.

Retrieving the value of this property is an O(1) operation.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IDisposable` interface.

## ReadOnlyCollection<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `ReadOnlyCollection<T>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in `Generic` are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure. To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

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

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IDisposable` interface.

## ReadOnlyCollection<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.  In the default implementation of `ReadOnlyCollection<T>`, this property always returns `true`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IDisposable` interface.

## ReadOnlyCollection<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`.  In the default implementation of `ReadOnlyCollection<T>`, this property always returns `true`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollection<T>` instance is cast to an `IDisposable` interface.
