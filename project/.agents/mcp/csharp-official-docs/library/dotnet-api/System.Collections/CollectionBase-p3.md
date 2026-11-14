---
title: "CollectionBase class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections/CollectionBase.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CollectionBase class (part 3 of 3)

## CollectionBase.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an element into the `CollectionBase` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The `Object` to insert.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `CollectionBase.Count`.
- `NotSupportedException`: The `CollectionBase` is read-only.

-or-

The `CollectionBase` has a fixed size.

#### Remarks
If `CollectionBase.Count` already equals the capacity, the capacity of the list is doubled by automatically reallocating the internal array before the new element is inserted.

If `index` is equal to `CollectionBase.Count`, `value` is added to the end of `CollectionBase`.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._

## CollectionBase.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the `CollectionBase`.

Parameters:

- `value`: The `Object` to remove from the `CollectionBase`.

Exceptions:

- `ArgumentException`: The `value` parameter was not found in the `CollectionBase` object.
- `NotSupportedException`: The `CollectionBase` is read-only.

-or-

The `CollectionBase` has a fixed size.

#### Remarks
If the `CollectionBase` does not contain the specified object, the `CollectionBase` remains unchanged. No exception is thrown.

This method performs a linear search; therefore, this method is an `O(n)` operation, where `n` is `CollectionBase.Count`.

This method determines equality by calling `Object.Equals`.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

#### Examples
The following code example implements the `CollectionBase` class and uses that implementation to create a collection of `Int16` objects.

_Code sample not included: ~/snippets/csharp/System.Collections/CollectionBase/Overview/collectionbase.cs._
