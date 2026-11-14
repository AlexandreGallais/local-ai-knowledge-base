---
title: "ReadOnlyCollectionBuilder<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/ReadOnlyCollectionBuilder`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyCollectionBuilder<T> class

Namespace: `System.Runtime.CompilerServices`

```csharp
public sealed class ReadOnlyCollectionBuilder<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>, System.Collections.Generic.IList<T>, System.Collections.IList
```

The builder for read only collection.

Parameters:

- `T`: The type of the collection element.

To be added.

## ReadOnlyCollectionBuilder<T>.ReadOnlyCollectionBuilder() constructor

```csharp
public ReadOnlyCollectionBuilder ();
```

Constructs a `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.ReadOnlyCollectionBuilder(IEnumerable<T>) constructor

```csharp
public ReadOnlyCollectionBuilder (System.Collections.Generic.IEnumerable<T> collection);
```

Constructs a `ReadOnlyCollectionBuilder<T>`, copying the contents of the given collection.

Parameters:

- `collection`: Collection to copy elements from.

To be added.

## ReadOnlyCollectionBuilder<T>.ReadOnlyCollectionBuilder(Int32) constructor

```csharp
public ReadOnlyCollectionBuilder (int capacity);
```

Constructs a `ReadOnlyCollectionBuilder<T>` with a given initial capacity. The contents are empty but builder will have reserved room for the given number of elements before any reallocations are required.

Parameters:

- `capacity`: Initial capacity.

To be added.

## ReadOnlyCollectionBuilder<T>.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the capacity of this `ReadOnlyCollectionBuilder<T>`.

Returns: The capacity of this `ReadOnlyCollectionBuilder.`

To be added.

## ReadOnlyCollectionBuilder<T>.Count property

```csharp
public int Count { get; }
```

Gets the number of elements in the `ReadOnlyCollectionBuilder<T>`.

Returns: The number of elements in the `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.Generic.ICollection<T>.IsReadOnly property

```csharp
bool System.Collections.Generic.ICollection<T>.IsReadOnly { get; }
```

Gets a value indicating whether the `ICollection<T>` is read-only.

Returns: `true` if the `ICollection<T>` is read-only; otherwise, `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

## ReadOnlyCollectionBuilder<T>.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `ICollection` is synchronized (thread safe).

Returns: `true` if access to the `ICollection` is synchronized (thread safe); otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollectionBuilder<T>` instance is cast to an `ICollection` interface.

## ReadOnlyCollectionBuilder<T>.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `ICollection`.

Returns: An object that can be used to synchronize access to the `ICollection`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollectionBuilder<T>` instance is cast to an `ICollection` interface.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollectionBuilder<T>` instance is cast to an `IList` interface.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollectionBuilder<T>` instance is cast to an `IList` interface.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## ReadOnlyCollectionBuilder<T>.Add(T) method

```csharp
public void Add (T item);
```

Adds an item to the `ReadOnlyCollectionBuilder<T>`.

Parameters:

- `item`: The object to add to the `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.Clear() method

```csharp
public void Clear ();
```

Removes all items from the `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.Contains(T) method

```csharp
public bool Contains (T item);
```

Determines whether the `ReadOnlyCollectionBuilder<T>` contains a specific value.

Parameters:

- `item`: the object to locate in the `ReadOnlyCollectionBuilder<T>`.

Returns: `true` if item is found in the `ReadOnlyCollectionBuilder<T>`; otherwise, `false`.

To be added.

## ReadOnlyCollectionBuilder<T>.CopyTo(T[], Int32) method

```csharp
public void CopyTo (T[] array, int arrayIndex);
```

Copies the elements of the `ReadOnlyCollectionBuilder<T>` to an `Array`, starting at particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from `ReadOnlyCollectionBuilder<T>`.
- `arrayIndex`: The zero-based index in array at which copying begins.

To be added.

## ReadOnlyCollectionBuilder<T>.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<T> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: A `IEnumerator<T>` that can be used to iterate through the collection.

To be added.

## ReadOnlyCollectionBuilder<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Returns the index of the first occurrence of a given value in the builder.

Parameters:

- `item`: An item to search for.

Returns: The index of the first occurrence of an item.

To be added.

## ReadOnlyCollectionBuilder<T>.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an item to the `ReadOnlyCollectionBuilder<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which item should be inserted.
- `item`: The object to insert into the `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.Remove(T) method

```csharp
public bool Remove (T item);
```

Removes the first occurrence of a specific object from the `ReadOnlyCollectionBuilder<T>`.

Parameters:

- `item`: The object to remove from the `ReadOnlyCollectionBuilder<T>`.

Returns: `true` if item was successfully removed from the `ReadOnlyCollectionBuilder<T>`; otherwise, false. This method also returns false if item is not found in the original `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the `ReadOnlyCollectionBuilder<T>` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

To be added.

## ReadOnlyCollectionBuilder<T>.Reverse() method

```csharp
public void Reverse ();
```

Reverses the order of the elements in the entire `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.Reverse(Int32, Int32) method

```csharp
public void Reverse (int index, int count);
```

Reverses the order of the elements in the specified range.

Parameters:

- `index`: The zero-based starting index of the range to reverse.
- `count`: The number of elements in the range to reverse.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the `ICollection<T>` to an array, starting at the specified array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from `ICollection<T>`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ReadOnlyCollectionBuilder<T>` instance is cast to an `IEnumerable` interface.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the `IList`.

Parameters:

- `value`: The `Object` to add to the `IList`.

Returns: The position into which the new element was inserted.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `value`: The `Object` to locate in the `IList`.

Returns: `true` if `item` is found in the `IList`; otherwise, `false`.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: The index of `item` if found in the list; otherwise, -1.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item to the `IList` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `value`: The object to insert into the `IList`.

To be added.

## ReadOnlyCollectionBuilder<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `value`: The object to remove from the `IList`.

To be added.

## ReadOnlyCollectionBuilder<T>.ToArray() method

```csharp
public T[] ToArray ();
```

Copies the elements of the `ReadOnlyCollectionBuilder<T>` to a new array.

Returns: An array containing copies of the elements of the `ReadOnlyCollectionBuilder<T>`.

To be added.

## ReadOnlyCollectionBuilder<T>.ToReadOnlyCollection() method

```csharp
public System.Collections.ObjectModel.ReadOnlyCollection<T> ToReadOnlyCollection ();
```

Creates a `ReadOnlyCollection<T>` containing all of the elements of the `ReadOnlyCollectionBuilder<T>`, avoiding copying the elements to the new array if possible. Resets the `ReadOnlyCollectionBuilder<T>` after the `ReadOnlyCollection<T>` has been created.

Returns: A new instance of `ReadOnlyCollection<T>`.

To be added.
