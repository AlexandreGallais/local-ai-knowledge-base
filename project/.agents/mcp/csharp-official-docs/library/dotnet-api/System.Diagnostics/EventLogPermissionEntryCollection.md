---
title: "EventLogPermissionEntryCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogPermissionEntryCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogPermissionEntryCollection class

Namespace: `System.Diagnostics`

```csharp
public class EventLogPermissionEntryCollection : System.Collections.CollectionBase
```

Contains a strongly typed collection of `EventLogPermissionEntry` objects.

To be added.

## EventLogPermissionEntryCollection.Item property

```csharp
public System.Diagnostics.EventLogPermissionEntry this[int index] { get; set; }
```

Gets or sets the object at a specified index.

Parameters:

- `index`: The zero-based index into the collection.

Returns: The `EventLogPermissionEntry` that exists at the specified index.

To be added.

## EventLogPermissionEntryCollection.Add(EventLogPermissionEntry) method

```csharp
public int Add (System.Diagnostics.EventLogPermissionEntry value);
```

Adds a specified `EventLogPermissionEntry` to this collection.

Parameters:

- `value`: The `EventLogPermissionEntry` to add.

Returns: The zero-based index of the added `EventLogPermissionEntry`.

To be added.

## EventLogPermissionEntryCollection.AddRange(EventLogPermissionEntry[]) method

```csharp
public void AddRange (System.Diagnostics.EventLogPermissionEntry[] value);
```

Appends a set of specified permission entries to this collection.

Parameters:

- `value`: An array of type `EventLogPermissionEntry` objects that contains the permission entries to add.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## EventLogPermissionEntryCollection.AddRange(EventLogPermissionEntryCollection) method

```csharp
public void AddRange (System.Diagnostics.EventLogPermissionEntryCollection value);
```

Appends a set of specified permission entries to this collection.

Parameters:

- `value`: A `EventLogPermissionEntryCollection` that contains the permission entries to add.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## EventLogPermissionEntryCollection.Contains(EventLogPermissionEntry) method

```csharp
public bool Contains (System.Diagnostics.EventLogPermissionEntry value);
```

Determines whether this collection contains a specified `EventLogPermissionEntry`.

Parameters:

- `value`: The `EventLogPermissionEntry` to find.

Returns: `true` if the specified `EventLogPermissionEntry` belongs to this collection; otherwise, `false`.

To be added.

## EventLogPermissionEntryCollection.CopyTo(EventLogPermissionEntry[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.EventLogPermissionEntry[] array, int index);
```

Copies the permission entries from this collection to an array, starting at a particular index of the array.

Parameters:

- `array`: An array of type `EventLogPermissionEntry` that receives this collection's permission entries.
- `index`: The zero-based index at which to begin copying the permission entries.

To be added.

## EventLogPermissionEntryCollection.IndexOf(EventLogPermissionEntry) method

```csharp
public int IndexOf (System.Diagnostics.EventLogPermissionEntry value);
```

Determines the index of a specified permission entry in this collection.

Parameters:

- `value`: The permission entry to search for.

Returns: The zero-based index of the specified permission entry, or -1 if the permission entry was not found in the collection.

To be added.

## EventLogPermissionEntryCollection.Insert(Int32, EventLogPermissionEntry) method

```csharp
public void Insert (int index, System.Diagnostics.EventLogPermissionEntry value);
```

Inserts a permission entry into this collection at a specified index.

Parameters:

- `index`: The zero-based index of the collection at which to insert the permission entry.
- `value`: The permission entry to insert into this collection.

To be added.

## EventLogPermissionEntryCollection.OnClear() method

```csharp
protected override void OnClear ();
```

Performs additional custom processes after clearing the contents of the collection.

To be added.

## EventLogPermissionEntryCollection.OnInsert(Int32, Object) method

```csharp
protected override void OnInsert (int index, object value);
```

Performs additional custom processes before a new permission entry is inserted into the collection.

Parameters:

- `index`: The zero-based index at which to insert `value`.
- `value`: The new value of the permission entry at `index`.

To be added.

## EventLogPermissionEntryCollection.OnRemove(Int32, Object) method

```csharp
protected override void OnRemove (int index, object value);
```

Performs additional custom processes when removing a new permission entry from the collection.

Parameters:

- `index`: The zero-based index at which `value` can be found.
- `value`: The permission entry to remove from `index`.

To be added.

## EventLogPermissionEntryCollection.OnSet(Int32, Object, Object) method

```csharp
protected override void OnSet (int index, object oldValue, object newValue);
```

Performs additional custom processes before setting a value in the collection.

Parameters:

- `index`: The zero-based index at which `oldValue` can be found.
- `oldValue`: The value to replace with `newValue`.
- `newValue`: The new value of the permission entry at `index`.

To be added.

## EventLogPermissionEntryCollection.Remove(EventLogPermissionEntry) method

```csharp
public void Remove (System.Diagnostics.EventLogPermissionEntry value);
```

Removes a specified permission entry from this collection.

Parameters:

- `value`: The permission entry to remove.

To be added.
