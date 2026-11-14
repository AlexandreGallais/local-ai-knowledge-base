---
title: "PerformanceCounterPermissionEntryCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/PerformanceCounterPermissionEntryCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PerformanceCounterPermissionEntryCollection class

Namespace: `System.Diagnostics`

```csharp
public class PerformanceCounterPermissionEntryCollection : System.Collections.CollectionBase
```

Contains a strongly typed collection of `PerformanceCounterPermissionEntry` objects.

To be added.

## PerformanceCounterPermissionEntryCollection.Item property

```csharp
public System.Diagnostics.PerformanceCounterPermissionEntry this[int index] { get; set; }
```

Gets or sets the object at a specified index.

Parameters:

- `index`: The zero-based index into the collection.

Returns: The `PerformanceCounterPermissionEntry` object that exists at the specified index.

To be added.

## PerformanceCounterPermissionEntryCollection.Add(PerformanceCounterPermissionEntry) method

```csharp
public int Add (System.Diagnostics.PerformanceCounterPermissionEntry value);
```

Adds a specified `PerformanceCounterPermissionEntry` to this collection.

Parameters:

- `value`: The `PerformanceCounterPermissionEntry` object to add.

Returns: The zero-based index of the added `PerformanceCounterPermissionEntry` object.

To be added.

## PerformanceCounterPermissionEntryCollection.AddRange(PerformanceCounterPermissionEntry[]) method

```csharp
public void AddRange (System.Diagnostics.PerformanceCounterPermissionEntry[] value);
```

Appends a set of specified permission entries to this collection.

Parameters:

- `value`: An array of type `PerformanceCounterPermissionEntry` objects that contains the permission entries to add.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## PerformanceCounterPermissionEntryCollection.AddRange(PerformanceCounterPermissionEntryCollection) method

```csharp
public void AddRange (System.Diagnostics.PerformanceCounterPermissionEntryCollection value);
```

Appends a set of specified permission entries to this collection.

Parameters:

- `value`: A `PerformanceCounterPermissionEntryCollection` that contains the permission entries to add.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## PerformanceCounterPermissionEntryCollection.Contains(PerformanceCounterPermissionEntry) method

```csharp
public bool Contains (System.Diagnostics.PerformanceCounterPermissionEntry value);
```

Determines whether this collection contains a specified `PerformanceCounterPermissionEntry` object.

Parameters:

- `value`: The `PerformanceCounterPermissionEntry` object to find.

Returns: `true` if the specified `PerformanceCounterPermissionEntry` object belongs to this collection; otherwise, `false`.

To be added.

## PerformanceCounterPermissionEntryCollection.CopyTo(PerformanceCounterPermissionEntry[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.PerformanceCounterPermissionEntry[] array, int index);
```

Copies the permission entries from this collection to an array, starting at a particular index of the array.

Parameters:

- `array`: An array of type `PerformanceCounterPermissionEntry` that receives this collection's permission entries.
- `index`: The zero-based index at which to begin copying the permission entries.

To be added.

## PerformanceCounterPermissionEntryCollection.IndexOf(PerformanceCounterPermissionEntry) method

```csharp
public int IndexOf (System.Diagnostics.PerformanceCounterPermissionEntry value);
```

Determines the index of a specified permission entry in this collection.

Parameters:

- `value`: The permission entry for which to search.

Returns: The zero-based index of the specified permission entry, or -1 if the permission entry was not found in the collection.

To be added.

## PerformanceCounterPermissionEntryCollection.Insert(Int32, PerformanceCounterPermissionEntry) method

```csharp
public void Insert (int index, System.Diagnostics.PerformanceCounterPermissionEntry value);
```

Inserts a permission entry into this collection at a specified index.

Parameters:

- `index`: The zero-based index of the collection at which to insert the permission entry.
- `value`: The permission entry to insert into this collection.

To be added.

## PerformanceCounterPermissionEntryCollection.OnClear() method

```csharp
protected override void OnClear ();
```

Performs additional custom processes after clearing the contents of the collection.

To be added.

## PerformanceCounterPermissionEntryCollection.OnInsert(Int32, Object) method

```csharp
protected override void OnInsert (int index, object value);
```

Performs additional custom processes before a new permission entry is inserted into the collection.

Parameters:

- `index`: The zero-based index at which to insert `value`.
- `value`: The new value of the permission entry at `index`.

To be added.

## PerformanceCounterPermissionEntryCollection.OnRemove(Int32, Object) method

```csharp
protected override void OnRemove (int index, object value);
```

Performs additional custom processes when removing a new permission entry from the collection.

Parameters:

- `index`: The zero-based index at which `value` can be found.
- `value`: The permission entry to remove from `index`.

To be added.

## PerformanceCounterPermissionEntryCollection.OnSet(Int32, Object, Object) method

```csharp
protected override void OnSet (int index, object oldValue, object newValue);
```

Performs additional custom processes before setting a value in the collection.

Parameters:

- `index`: The zero-based index at which `oldValue` can be found.
- `oldValue`: The value to replace with `newValue`.
- `newValue`: The new value of the permission entry at `index`.

To be added.

## PerformanceCounterPermissionEntryCollection.Remove(PerformanceCounterPermissionEntry) method

```csharp
public void Remove (System.Diagnostics.PerformanceCounterPermissionEntry value);
```

Removes a specified permission entry from this collection.

Parameters:

- `value`: The permission entry to remove.

To be added.
