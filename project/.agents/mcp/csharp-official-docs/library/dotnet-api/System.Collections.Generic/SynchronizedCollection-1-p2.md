---
title: "SynchronizedCollection<T> class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Generic/SynchronizedCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SynchronizedCollection<T> class (part 2 of 2)

## SynchronizedCollection<T>.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an object into the collection at a specified index.

Parameters:

- `index`: The zero-based index at which `value` is to be inserted.
- `value`: The object to insert into the collection.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` specified is less than zero or greater than the number of items in the collection.
- `ArgumentException`: The `value` set is `null` or is not of the correct generic type `T` for the collection.

#### Remarks
If the `index` is equal to the number of elements in the collection, the item is appended to the list. If the `index` is less than the number of elements in the collection, the elements that follow the point of insertion of the item move down to accommodate the new element.

## SynchronizedCollection<T>.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specified object as an element from the collection.

Parameters:

- `value`: The object to be removed from the collection.

#### Remarks
The elements in the collection that follow the removed element move up to occupy the vacated spot and their indices are updated accordingly.
