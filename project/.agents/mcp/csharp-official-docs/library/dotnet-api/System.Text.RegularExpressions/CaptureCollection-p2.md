---
title: "CaptureCollection class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/CaptureCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CaptureCollection class (part 2 of 2)

## CaptureCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the collection.

Parameters:

- `value`: The object to locate in the collection.

Returns: The index of `value` if found in the list; otherwise, -1.

#### Remarks

This method uses the collection's objects' `Object.Equals` and `IComparable.CompareTo` methods on `value` to determine whether `value` exists.

## CaptureCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `value`: The object to remove from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.

## CaptureCollection.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the item to remove.

Exceptions:

- `NotSupportedException`: The collection is read-only.

To be added.
