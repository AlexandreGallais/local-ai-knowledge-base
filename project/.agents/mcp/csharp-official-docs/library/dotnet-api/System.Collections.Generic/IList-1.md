---
title: "IList<T> interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/IList`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IList<T> interface

Namespace: `System.Collections.Generic`

```csharp
public interface IList<T> : System.Collections.Generic.ICollection<T>, System.Collections.Generic.IEnumerable<T>
```

Represents a collection of objects that can be individually accessed by index.

Parameters:

- `T`: The type of elements in the list.

#### Remarks
The `IList<T>` generic interface is a descendant of the `ICollection<T>` generic interface and is the base interface of all generic lists.

## IList<T>.Item property

```csharp
public T this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList<T>`.
- `NotSupportedException`: The property is set and the `IList<T>` is read-only.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `IList<T>.Item` property. Visual Basic <example-value> `IList<T>.Item` as a default property, which provides the same indexing functionality.

## IList<T>.IndexOf(T) method

```csharp
public int IndexOf (T item);
```

Determines the index of a specific item in the `IList<T>`.

Parameters:

- `item`: The object to locate in the `IList<T>`.

Returns: The index of `item` if found in the list; otherwise, -1.

#### Remarks
If an object occurs multiple times in the list, the `IList<T>.IndexOf` method always returns the first instance found.

## IList<T>.Insert(Int32, T) method

```csharp
public void Insert (int index, T item);
```

Inserts an item to the `IList<T>` at the specified index.

Parameters:

- `index`: The zero-based index at which `item` should be inserted.
- `item`: The object to insert into the `IList<T>`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList<T>`.
- `NotSupportedException`: The `IList<T>` is read-only.

#### Remarks
If `index` equals the number of items in the `IList<T>`, then `item` is appended to the list.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

## IList<T>.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the `IList<T>` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList<T>`.
- `NotSupportedException`: The `IList<T>` is read-only.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.
