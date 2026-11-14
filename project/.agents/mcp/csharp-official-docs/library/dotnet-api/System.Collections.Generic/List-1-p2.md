---
title: "List<T> class (part 2 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/List`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# List<T> class (part 2 of 9)

## List<T>.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than `List<T>.Count`.

#### Remarks
`List<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

#### Examples
The example in this section demonstrates the `List<T>.Item` property (the indexer in C#) and various other properties and methods of the `List<T>` generic class. After the list has been created and populated using the `List<T>.Add` method, an element is retrieved and displayed using the `List<T>.Item` property. (For an example that uses the `List<T>.Item` property to set the value of a list element, see `List<T>.AsReadOnly`.)

> **Note:**
> Visual Basic, C#, and C++ all have syntax for accessing the `List<T>.Item` property without using its name. Instead, the variable containing the `List<T>` is used as if it were an array.

The C# language uses the `this` keyword to define the indexers instead of implementing the `List<T>.Item` property. Visual Basic <example-value> `List<T>.Item` as a default property, which provides the same indexing functionality.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.  In the default implementation of `List<T>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## List<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.  In the default implementation of `List<T>`, this property always returns `false`.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  In the rare case where enumeration contends with write accesses, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection.

Retrieving the value of this property is an O(1) operation.

## List<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.  In the default implementation of `List<T>`, this property always returns the current instance.

#### Remarks
Default implementations of collections in the `Generic` namespace are not synchronized.

Enumerating through a collection is intrinsically not a thread-safe procedure.  To guarantee thread safety during enumeration, you can lock the collection during the entire enumeration.  To allow the collection to be accessed by multiple threads for reading and writing, you must implement your own synchronization.

`ICollection.SyncRoot` returns an object that can be used to synchronize access to the `ICollection`. Synchronization is effective only if all threads lock this object before accessing the collection. The following code shows the use of the `SyncRoot` property.

```csharp
ICollection ic = ...;
lock (ic.SyncRoot)
{
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

## List<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.  In the default implementation of `List<T>`, this property always returns `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

A collection with a fixed size is simply a collection with a wrapper that prevents adding and removing elements; therefore, if changes are made to the underlying collection, including the addition or removal of elements, the fixed-size collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## List<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`.  In the default implementation of `List<T>`, this property always returns `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

A collection that is read-only is simply a collection with a wrapper that prevents modifying the collection; therefore, if changes are made to the underlying collection, the read-only collection reflects those changes.

Retrieving the value of this property is an O(1) operation.

## List<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `ArgumentException`: The property is set and the value is of a type that isn't assignable to the `IList`.

#### Remarks
The C# language uses the this keyword to define the indexers instead of implementing the `List<T>.System%23Collections%23IList%23Item` property. Visual Basic <example-value> `List<T>.System%23Collections%23IList%23Item` as a default property, which provides the same indexing functionality.

Retrieving the value of this property is an O(1) operation; setting the property is also an O(1) operation.

## List<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an object to the end of the `List<T>`.

Parameters:

- `item`: The object to be added to the end of the `List<T>`. The value can be `null` for reference types.

#### Remarks
`List<T>` accepts `null` as a valid value for reference types and allows duplicate elements.

If `List<T>.Count` already equals `List<T>.Capacity`, the capacity of the `List<T>` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `List<T>.Count` is less than `List<T>.Capacity`, this method is an O(1) operation. If the capacity needs to be increased to accommodate the new element, this method becomes an O(*n*) operation, where *n* is `List<T>.Count`.

#### Examples

The following example demonstrates how to add, remove, and insert a simple business object in a `List<T>`.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/program.cs._

The following example demonstrates several properties and methods of the `List<T>` generic class, including the `List<T>.Add` method. The parameterless constructor is used to create a list of strings with a capacity of 0. The `Capacity` property is displayed, and then the `List<T>.Add` method is used to add several items. The items are listed, and the `Capacity` property is displayed again, along with the `Count` property, to show that the capacity has been increased as needed.

Other properties and methods are used to search for, insert, and remove elements from the list, and finally to clear the list.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/Overview/source.cs._

## List<T>.AddRange(IEnumerable<T>) method

```csharp
public void AddRange (System.Collections.Generic.IEnumerable<T> collection);
```

Adds the elements of the specified collection to the end of the `List<T>`.

Parameters:

- `collection`: The collection whose elements should be added to the end of the `List<T>`. The collection itself cannot be `null`, but it can contain elements that are `null`, if type `T` is a reference type.

Exceptions:

- `ArgumentNullException`: `collection` is `null`.

#### Remarks
The order of the elements in the collection is preserved in the `List<T>`.

If the new `List<T>.Count` (the current `List<T>.Count` plus the size of the collection) will be greater than `List<T>.Capacity`, the capacity of the `List<T>` is increased by automatically reallocating the internal array to accommodate the new elements, and the existing elements are copied to the new array before the new elements are added.

If the `List<T>` can accommodate the new elements without increasing the `List<T>.Capacity`, this method is an O(*n*) operation, where *n* is the number of elements to be added. If the capacity needs to be increased to accommodate the new elements, this method becomes an O(*n* + *m*) operation, where *n* is the number of elements to be added and *m* is `List<T>.Count`.

#### Examples
The following example demonstrates the `List<T>.AddRange` method and various other methods of the `List<T>` class that act on ranges. An array of strings is created and passed to the constructor, populating the list with the elements of the array. The `List<T>.AddRange` method is called, with the list as its argument. The result is that the current elements of the list are added to the end of the list, duplicating all the elements.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source1.cs._

## List<T>.AsReadOnly() method

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<T> AsReadOnly ();
```

Returns a read-only `ReadOnlyCollection<T>` wrapper for the current collection.

Returns: An object that acts as a read-only wrapper around the current `List<T>`.

#### Remarks
To prevent any modifications to the `List<T>` object, expose it only through this wrapper. A  `ReadOnlyCollection<T>` object does not expose methods that modify the collection. However, if changes are made to the underlying `List<T>` object, the read-only collection reflects those changes.

This method is an O(1) operation.

#### Examples
The following example demonstrates the `List<T>.AsReadOnly` method. A `List<T>` of strings with a capacity of 4 is created, because the ultimate size of the list is known to be exactly 4. The list is populated with four strings, and the `List<T>.AsReadOnly` method is used to get a read-only `IList<T>` generic interface implementation that wraps the original list.

An element of the original list is set to "Coelophysis" using the `List<T>.Item` property (the indexer in C#), and the contents of the read-only list are displayed again to demonstrate that it is just a wrapper for the original list.

_Code sample not included: ~/snippets/csharp/System.Collections.Generic/ListT/.ctor/source.cs._
