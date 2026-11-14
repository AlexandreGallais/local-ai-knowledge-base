---
title: "StringCollection class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Specialized/StringCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringCollection class (part 3 of 3)

## StringCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object? value);
```

Inserts an element into the `StringCollection` at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The `Object` to insert. The value can be `null`.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than zero.

-or-

`index` is greater than `StringCollection.Count`.
- `NotSupportedException`: The `StringCollection` is read-only.

-or-

The `StringCollection` has a fixed size.

#### Remarks
If `StringCollection.Count` already equals the capacity, the capacity of the `StringCollection` is increased by automatically reallocating the internal array, and the existing elements are copied to the new array before the new element is added.

If `index` is equal to `StringCollection.Count`, `value` is added to the end of `StringCollection`.

In collections of contiguous elements, such as lists, the elements that follow the insertion point move down to accommodate the new element. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method is an O(`n`) operation, where `n` is `StringCollection.Count`.

## StringCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object? value);
```

Removes the first occurrence of a specific object from the `StringCollection`.

Parameters:

- `value`: The `Object` to remove from the `StringCollection`. The value can be `null`.

Exceptions:

- `NotSupportedException`: The `StringCollection` is read-only.

-or-

The `StringCollection` has a fixed size.

#### Remarks
If the `StringCollection` does not contain the specified object, the `StringCollection` remains unchanged. No exception is thrown.

In collections of contiguous elements, such as lists, the elements that follow the removed element move up to occupy the vacated spot. If the collection is indexed, the indexes of the elements that are moved are also updated. This behavior does not apply to collections where elements are conceptually grouped into buckets, such as a hash table.

This method determines equality by calling `Object.Equals`.

This method performs a linear search; therefore, this method is an O(`n`) operation, where `n` is `StringCollection.Count`.
