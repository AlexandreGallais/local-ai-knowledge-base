---
title: "IList interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/IList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IList interface

Namespace: `System.Collections`

```csharp
public interface IList : System.Collections.ICollection
```

Represents a non-generic collection of objects that can be individually accessed by index.

#### Remarks
`IList` is a descendant of the `ICollection` interface and is the base interface of all non-generic lists. `IList` implementations fall into three categories: read-only, fixed-size, and variable-size. A read-only `IList` cannot be modified. A fixed-size `IList` does not allow the addition or removal of elements, but it allows the modification of existing elements. A variable-size `IList` allows the addition, removal, and modification of elements.

For the generic version of this interface, see `IList<T>`.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.IsFixedSize property

```csharp
public bool IsFixedSize { get; }
```

Gets a value indicating whether the `IList` has a fixed size.

Returns: `true` if the `IList` has a fixed size; otherwise, `false`.

#### Remarks
A collection with a fixed size does not allow the addition or removal of elements after the collection is created, but it allows the modification of existing elements.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `IList` is read-only.

Returns: `true` if the `IList` is read-only; otherwise, `false`.

#### Remarks
A collection that is read-only does not allow the addition, removal, or modification of elements after the collection is created.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.Item property

```csharp
public object? this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `NotSupportedException`: The property is set and the `IList` is read-only.

#### Remarks
This property provides the ability to access a specific element in the collection by using the following syntax: `myCollection[index]`.

The C# language uses the this keyword to define the indexers instead of implementing the `IList.Item` property. Visual Basic <example-value> `IList.Item` as a default property, which provides the same indexing functionality.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.Add(Object) method

```csharp
public int Add (object? value);
```

Adds an item to the `IList`.

Parameters:

- `value`: The object to add to the `IList`.

Returns: The position into which the new element was inserted, or -1 to indicate that the item was not inserted into the collection.

Exceptions:

- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.Clear() method

```csharp
public void Clear ();
```

Removes all items from the `IList`.

Exceptions:

- `NotSupportedException`: The `IList` is read-only.

#### Remarks
Implementations of this method can vary in how they handle the `ICollection.Count` and the capacity of a collection. Typically, the count is set to zero, and references to other objects from elements of the collection are also released. The capacity can be set to zero or a default value, or it can remain unchanged.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.Contains(Object) method

```csharp
public bool Contains (object? value);
```

Determines whether the `IList` contains a specific value.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: `true` if the `Object` is found in the `IList`; otherwise, `false`.

#### Remarks

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.IndexOf(Object) method

```csharp
public int IndexOf (object? value);
```

Determines the index of a specific item in the `IList`.

Parameters:

- `value`: The object to locate in the `IList`.

Returns: The index of `value` if found in the list; otherwise, -1.

#### Remarks

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `item` to determine whether item exists.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.Insert(Int32, Object) method

```csharp
public void Insert (int index, object? value);
```

Inserts an item to the `IList` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the `IList`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.
- `NullReferenceException`: `value` is null reference in the `IList`.

#### Remarks
If `index` equals the number of items in the `IList`, then `value` is appended to the end.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.Remove(Object) method

```csharp
public void Remove (object? value);
```

Removes the first occurrence of a specific object from the `IList`.

Parameters:

- `value`: The object to remove from the `IList`.

Exceptions:

- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table. If `value` is not found in the `IList`, the `IList` remains unchanged and no exception is thrown.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._

## IList.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the `IList` item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is not a valid index in the `IList`.
- `NotSupportedException`: The `IList` is read-only.

-or-

The `IList` has a fixed size.

#### Remarks
In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

#### Examples
The following example demonstrates the implementation of the `IList` interface to create a simple, fixed-size list. This code is part of a larger example for the `IList` interface.

_Code sample not included: ~/snippets/csharp/System.Collections/IList/Overview/Program.cs._
