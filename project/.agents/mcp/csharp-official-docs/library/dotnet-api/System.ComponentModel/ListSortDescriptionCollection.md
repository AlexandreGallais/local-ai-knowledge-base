---
title: "ListSortDescriptionCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ListSortDescriptionCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListSortDescriptionCollection class

Namespace: `System.ComponentModel`

```csharp
public class ListSortDescriptionCollection : System.Collections.IList
```

Represents a collection of `ListSortDescription` objects.

#### Remarks
The `ListSortDescriptionCollection` class is used by the `IBindingListView` interface.

The `ListSortDescriptionCollection` is read-only once constructed.

## ListSortDescriptionCollection.ListSortDescriptionCollection() constructor

```csharp
public ListSortDescriptionCollection ();
```

Initializes a new instance of the `ListSortDescriptionCollection` class.

#### Remarks
The `ListSortDescriptionCollection` is read-only once constructed.

## ListSortDescriptionCollection.ListSortDescriptionCollection(ListSortDescription[]) constructor

```csharp
public ListSortDescriptionCollection (System.ComponentModel.ListSortDescription?[]? sorts);
```

Initializes a new instance of the `ListSortDescriptionCollection` class with the specified array of `ListSortDescription` objects.

Parameters:

- `sorts`: The array of `ListSortDescription` objects to be contained in the collection.

#### Remarks
The `ListSortDescriptionCollection` is read-only once constructed.

Example

## ListSortDescriptionCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of items in the collection.

Returns: The number of items in the collection.

To be added.

## ListSortDescriptionCollection.Item property

```csharp
public System.ComponentModel.ListSortDescription? this[int index] { get; set; }
```

Gets or sets the specified `ListSortDescription`.

Parameters:

- `index`: The zero-based index of the `ListSortDescription` to get or set in the collection.

Returns: The `ListSortDescription` with the specified index.

Exceptions:

- `InvalidOperationException`: An item is set in the `ListSortDescriptionCollection`, which is read-only.

#### Remarks
The `ListSortDescriptionCollection` is read-only once constructed and will throw an `InvalidOperationException` if you attempt to set an item.

## ListSortDescriptionCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the collection is thread safe.

Returns: `true` in all cases.

#### Remarks
This property always returns `true`, because once constructed, the collection is read-only. This member is an explicit interface member implementation. It can be used only when the `ListSortDescriptionCollection` instance is cast to an `ICollection` interface.

## ListSortDescriptionCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets the current instance that can be used to synchronize access to the collection.

Returns: The current instance of the `ListSortDescriptionCollection`.

#### Remarks
This implementation returns the current instance of the `ListSortDescriptionCollection`, because this collection, once constructed, does not allow public access to the underlying list.

For more information on the `ListSortDescriptionCollection.System%23Collections%23ICollection%23SyncRoot` method, see the `SyncRoot` property.

## ListSortDescriptionCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the collection has a fixed size.

Returns: `true` in all cases.

#### Remarks
The collection is read-only once constructed and will, therefore, always have a fixed size.

## ListSortDescriptionCollection.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the collection is read-only.

Returns: `true` in all cases.

#### Remarks
The `ListSortDescriptionCollection` is read-only once constructed. A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

## ListSortDescriptionCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets the specified `ListSortDescription`.

Parameters:

- `index`: The zero-based index of the `ListSortDescription` to get in the collection.

Returns: The `ListSortDescription` with the specified index.

To be added.

## ListSortDescriptionCollection.Contains(Object) method

```csharp
public bool Contains (object? value);
```

Determines if the `ListSortDescriptionCollection` contains a specific value.

Parameters:

- `value`: The `Object` to locate in the collection.

Returns: `true` if the `Object` is found in the collection; otherwise, `false`.

To be added.

## ListSortDescriptionCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int index);
```

Copies the contents of the collection to the specified array, starting at the specified destination array index.

Parameters:

- `array`: The destination array for the items copied from the collection.
- `index`: The index of the destination array at which copying begins.

To be added.

## ListSortDescriptionCollection.IndexOf(Object) method

```csharp
public int IndexOf (object? value);
```

Returns the index of the specified item in the collection.

Parameters:

- `value`: The `Object` to locate in the collection.

Returns: The index of `value` if found in the list; otherwise, -1.

To be added.

## ListSortDescriptionCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator? IEnumerable.GetEnumerator ();
```

Gets a `IEnumerator` that can be used to iterate through the collection.

Returns: An `IEnumerator` that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ListSortDescriptionCollection` instance is cast to an `IEnumerable` interface.

## ListSortDescriptionCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object? value);
```

Adds an item to the collection.

Parameters:

- `value`: The item to add to the collection.

Returns: The position into which the new element was inserted.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks
Because the `ListSortDescriptionCollection` class implements the `IList` interface, it must have an `ListSortDescriptionCollection.System%23Collections%23IList%23Add` method. However, because the `ListSortDescriptionCollection` class represents a read-only collection, adding items to the collection is an invalid operation.

## ListSortDescriptionCollection.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the collection.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks
Because the `ListSortDescriptionCollection` class implements the `IList` interface, it must have a `ListSortDescriptionCollection.System%23Collections%23IList%23Clear` method. However, because the `ListSortDescriptionCollection` class represents a read-only collection, clearing items from the collection is an invalid operation.

## ListSortDescriptionCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object? value);
```

Inserts an item into the collection at a specified index.

Parameters:

- `index`: The zero-based index of the `ListSortDescription` to get or set in the collection.
- `value`: The item to insert into the collection.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks
Because the `ListSortDescriptionCollection` class implements the `IList` interface, it must have a `ListSortDescriptionCollection.System%23Collections%23IList%23Insert` method. However, because the `ListSortDescriptionCollection` class represents a read-only collection, inserting items into the collection is an invalid operation.

## ListSortDescriptionCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object? value);
```

Removes the first occurrence of an item from the collection.

Parameters:

- `value`: The item to remove from the collection.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks
Because the `ListSortDescriptionCollection` class implements the `IList` interface, it must have a `ListSortDescriptionCollection.System%23Collections%23IList%23Remove` method. However, because the `ListSortDescriptionCollection` class represents a read-only collection, removing items from the collection is an invalid operation.

## ListSortDescriptionCollection.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Removes an item from the collection at a specified index.

Parameters:

- `index`: The zero-based index of the `ListSortDescription` to remove from the collection.

Exceptions:

- `InvalidOperationException`: In all cases.

#### Remarks
Because the `ListSortDescriptionCollection` class implements the `IList` interface, it must have a `ListSortDescriptionCollection.System%23Collections%23IList%23RemoveAt` method. However, because the `ListSortDescriptionCollection` class represents a read-only collection, removing items from the collection is an invalid operation.
