---
title: "SynchronizedCollection<T> class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SynchronizedCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SynchronizedCollection<T> class

Namespace: `System.Collections.Generic`

```csharp
public class SynchronizedCollection<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.IList
```

Provides a thread-safe collection that contains objects of a type specified by the generic parameter as elements.

Parameters:

- `T`: The type of object contained as items in the thread-safe collection.

#### Remarks
The `SynchronizedCollection<T>` stores data in a `List<T>` container and provides an object that can be set and used to synchronize access to the collection so that it is thread-safe. The `IList<T>` container can be recovered using the `Items` property. The synchronized object can be recovered using the `SyncRoot` property. It can only be set using one of the constructors that take the `syncRoot` parameter.

## SynchronizedCollection<T>.SynchronizedCollection() constructor

```csharp
public SynchronizedCollection ();
```

Initializes a new instance of the `SynchronizedCollection<T>` class.

To be added.

## SynchronizedCollection<T>.SynchronizedCollection(Object) constructor

```csharp
public SynchronizedCollection (object syncRoot);
```

Initializes a new instance of the `SynchronizedCollection<T>` class with the object used to synchronize access to the thread-safe collection.

Parameters:

- `syncRoot`: The object used to synchronize access the thread-safe collection.

Exceptions:

- `ArgumentNullException`: `syncRoot` is `null`.

#### Remarks
If multiple instances of the `SynchronizedCollection<T>` are created using the same `syncRoot`, then access is protected across all instances.

## SynchronizedCollection<T>.SynchronizedCollection(Object, IEnumerable<T>) constructor

```csharp
public SynchronizedCollection (object syncRoot, System.Collections.Generic.IEnumerable<T> list);
```

Initializes a new instance of the `SynchronizedCollection<T>` class from a specified enumerable list of elements and with the object used to synchronize access to the thread-safe collection.

Parameters:

- `syncRoot`: The object used to synchronize access to the thread-safe collection.
- `list`: The `IEnumerable<T>` collection of elements used to initialize the thread-safe collection.

Exceptions:

- `ArgumentNullException`: `syncRoot` or `list` is `null`.

To be added.

## SynchronizedCollection<T>.SynchronizedCollection(Object, T[]) constructor

```csharp
public SynchronizedCollection (object syncRoot, params T[] list);
```

Initializes a new instance of the `SynchronizedCollection<T>` class from a specified array of elements and with the object used to synchronize access to the thread-safe collection.

Parameters:

- `syncRoot`: The object used to synchronize access the thread-safe collection.
- `list`: The `Array` of type `T` elements used to initialize the thread-safe collection.

Exceptions:

- `ArgumentNullException`: `syncRoot` or `list` is `null`.

To be added.

## SynchronizedCollection<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the thread-safe collection.

Returns: The number of elements contained in the thread-safe, read-only collection.

To be added.

## SynchronizedCollection<T>.Item property

```csharp
public T this[int index] { get; set; }
```

Gets an element from the thread-safe collection with a specified index.

Parameters:

- `index`: The zero-based index of the element to be retrieved from the collection.

Returns: The object in the collection that has the specified `index`.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.

To be added.

## SynchronizedCollection<T>.Items property

```csharp
protected System.Collections.Generic.List<T> Items { get; }
```

Gets the list of elements contained in the thread-safe collection.

Returns: The `IList<T>` of elements that are contained in the thread-safe, read-only collection.

To be added.

## SynchronizedCollection<T>.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets the object used to synchronize access to the thread-safe collection.

Returns: An object used to synchronize access to the thread-safe collection.

To be added.

## SynchronizedCollection<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value that indicates whether the collection is read only.

Returns: `false`

#### Remarks
This property always returns `false` because the collection can be added to and so is not read only.

## SynchronizedCollection<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether the collection is thread safe.

Returns: `true`

#### Remarks
This property always returns `true` because the collection is thread safe.

## SynchronizedCollection<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets the object used to synchronize access to the thread-safe collection.

Returns: An object used to synchronize access to the thread-safe collection.

#### Remarks
The value of this `syncRoot` object can be set when creating the thread-safe collection using the `%23ctor` constructor.

## SynchronizedCollection<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value that indicates whether the collection is fixed in size.

Returns: `false`

#### Remarks
This property returns `false` because the collection can be added to and so is not fixed in size.

## SynchronizedCollection<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value that indicates whether the collection is read only.

Returns: `false`

#### Remarks
This property always returns `false` because the collection can be added to and so is not read only.

## SynchronizedCollection<T>.System.Collections.IList.Item property

```csharp
object System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the item at a specified zero-based index.

Parameters:

- `index`: The zero-based index of the element to be retrieved from the collection.

Returns: The item with the specified `index`.

Exceptions:

- `ArgumentException`: The value set is `null` or is not of the correct generic type `T` for the collection.
- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.

To be added.

## SynchronizedCollection<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an item to the thread-safe, read-only collection.

Parameters:

- `item`: The element to be added to the collection.

Exceptions:

- `ArgumentException`: The value set is `null` or is not of the correct generic type `T` for the collection.

To be added.

## SynchronizedCollection<T>.Clear() method

```csharp
public void Clear ();
```

Removes all items from the collection.

To be added.

## SynchronizedCollection<T>.ClearItems() method

```csharp
protected virtual void ClearItems ();
```

Removes all items from the collection.

To be added.

## SynchronizedCollection<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the collection contains an element with a specific value.

Parameters:

- `item`: The object to locate in the collection.

Returns: `true` if the element value is found in the collection; otherwise `false`.

Exceptions:

- `ArgumentException`: The value set is `null` or is not of the correct generic type `T` for the collection.

To be added.

## SynchronizedCollection<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int index);
```

Copies the elements of the collection to a specified array, starting at a particular index.

Parameters:

- `array`: The destination `Array` for the elements of type `T` copied from the collection.
- `index`: The zero-based index in the array at which copying begins.

To be added.

## SynchronizedCollection<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the synchronized collection.

Returns: An `IEnumerator<T>` for objects of the type stored in the collection.

To be added.

## SynchronizedCollection<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Returns the index of the first occurrence of a value in the collection.

Parameters:

- `item`: Removes all items from the collection.

Returns: The zero-based index of the first occurrence of the value in the collection.

Exceptions:

- `ArgumentException`: The value set is `null` or is not of the correct generic type `T` for the collection.

To be added.

## SynchronizedCollection<T>.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an item into the collection at a specified index.

Parameters:

- `index`: The zero-based index of the element to be retrieved from the collection.
- `item`: The object to be inserted into the collection as an element.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.
- `ArgumentException`: The value set is `null` or is not of the correct generic type `T` for the collection.

#### Remarks
If the `index` is equal to the number of elements in the collection, the item is appended to the list. If the `index` is less than the number of elements in the collection, the elements that follow the point of insertion of the item move down to accommodate the new element.

## SynchronizedCollection<T>.InsertItem(Int32, T) method

```csharp
protected virtual void InsertItem (int index, T item);
```

Inserts an item into the collection at a specified index.

Parameters:

- `index`: The zero-based index of the collection where the object is to be inserted.
- `item`: The object to be inserted into the collection.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.
- `ArgumentException`: The value set is `null` or is not of the correct generic type `T` for the collection.

#### Remarks
If the `index` is equal to the number of elements in the collection, the item is appended to the list. If the `index` is less than the number of elements in the collection, the elements that follow the point of insertion of the item move down to accommodate the new element.

## SynchronizedCollection<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specified item from the collection.

Parameters:

- `item`: The object to remove from the collection.

Returns: `true` if item was successfully removed from the collection; otherwise, `false`.

#### Remarks
The elements in the collection that follow the removed element move up to occupy the vacated spot and their indices are updated accordingly.

## SynchronizedCollection<T>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes an item at a specified index from the collection.

Parameters:

- `index`: The zero-based index of the element to be retrieved from the collection.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.

#### Remarks
The elements in the collection that follow the removed element move up to occupy the vacated spot and their indices are updated accordingly.

## SynchronizedCollection<T>.RemoveItem(Int32) method

```csharp
protected virtual void RemoveItem (int index);
```

Removes an item at a specified `index` from the collection.

Parameters:

- `index`: The zero-based index of the element to be retrieved from the collection.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.

To be added.

## SynchronizedCollection<T>.SetItem(Int32, T) method

```csharp
protected virtual void SetItem (int index, T item);
```

Replaces the item at a specified index with another item.

Parameters:

- `index`: The zero-based index of the object to be replaced.
- `item`: The object to replace.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.

To be added.

## SynchronizedCollection<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the collection to a specified array, starting at a particular index.

Parameters:

- `array`: The destination `Array` for the elements of type `T` copied from the collection.
- `index`: The zero-based index in the array at which copying begins.

To be added.

## SynchronizedCollection<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the synchronized collection.

Returns: An `IEnumerator<T>` for objects of the type stored in the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `SynchronizedCollection<T>` instance is cast to an `IEnumerable` interface.

## SynchronizedCollection<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an element to the collection.

Parameters:

- `value`: The object to add to the collection.

Returns: The position into which the new element was inserted.

#### Remarks
The position is given by a zero-based index.

## SynchronizedCollection<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the collection contains an element with a specific value.

Parameters:

- `value`: The object to locate in the collection.

Returns: `true` if the element `value` is found in the collection; otherwise `false`.

Exceptions:

- `ArgumentException`: `value` is not an object of the type contained in the collection.

To be added.

## SynchronizedCollection<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the zero-based index of an element in the collection.

Parameters:

- `value`: The element in the collection whose index is being determined.

Returns: The index of the `value` if found in the collection; otherwise, -1.

To be added.
