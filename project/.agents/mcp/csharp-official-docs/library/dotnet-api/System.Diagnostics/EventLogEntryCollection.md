---
title: "EventLogEntryCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogEntryCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogEntryCollection class

Namespace: `System.Diagnostics`

```csharp
public class EventLogEntryCollection : System.Collections.ICollection
```

Defines size and enumerators for a collection of `EventLogEntry` instances.

#### Remarks
Use the `EventLogEntryCollection` class when reading the entries associated with an `EventLog` instance. The `Entries` property of the `EventLog` class is a collection of all the entries in the event log.

Because new entries are appended to the existing list, stepping through the collection enables you to access the entries that were created after you originally created the `EventLogEntryCollection`. However, after you view the entire list, it is not updated with new entries.

#### Examples
The following example demonstrates how to obtain event log information from an `EventLogEntryCollection` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntryCollection/Overview/eventlogentry_copyto.cs._

## EventLogEntryCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of entries in the event log (that is, the number of elements in the `EventLogEntry` collection).

Returns: The number of entries currently in the event log.

#### Remarks
An `EventLogEntryCollection` represents a dynamic list of all the entries in a log. Therefore, the `Count` property can change during the lifetime of the `EventLogEntryCollection` instance that you create. It is usually best to work with the `Count` property directly instead of assigning its value to a variable.

#### Examples
The following example demonstrates how to use the `Count` property to iterate through an `EventLogEntryCollection` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntryCollection/Count/eventlogentry_item.cs._

## EventLogEntryCollection.Item property

```csharp
public virtual System.Diagnostics.EventLogEntry this[int index] { get; }
```

Gets an entry in the event log, based on an index that starts at 0 (zero).

Parameters:

- `index`: The zero-based index that is associated with the event log entry.

Returns: The event log entry at the location that is specified by the `index` parameter.

#### Remarks
`EventLogEntry` objects are indexed by the event log system according to the chronological order in which they arrived in the event log. Use the `EventLogEntryCollection.Item` property to select a specific event log entry whose index in the collection is known.

Iterating through the `EventLogEntryCollection` instance steps through each `EventLogEntry` object sequentially. The collection is dynamic and the number of entries may not be immutable when you enter the loop. Therefore, you should use a `for each...next` loop instead of a `for(int i=0; i<count, i++)` loop to step through entries that are associated with the `EventLogEntryCollection` instance to examine the entire set of entries.

Because new entries are appended to the existing list, stepping through the collection enables you to access the entries that were created after you originally created the `EventLogEntryCollection`.

#### Examples
The following example demonstrates how to display information for the items in an `EventLogEntryCollection` object.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntryCollection/Count/eventlogentry_item.cs._

## EventLogEntryCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value that indicates whether access to the `EventLogEntryCollection` is synchronized (thread-safe).

Returns: `false` if access to the collection is not synchronized (thread-safe).

#### Remarks
For the `EventLogEntryCollection` class, the `EventLogEntryCollection.System%23Collections%23ICollection%23IsSynchronized` method always returns `false`.

## EventLogEntryCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `EventLogEntryCollection` object.

Returns: An object that can be used to synchronize access to the collection.

#### Remarks
For the `EventLogEntryCollection` class, the `System%23Collections%23ICollection%23SyncRoot` property always returns the current `EventLogEntryCollection`.

## EventLogEntryCollection.CopyTo(EventLogEntry[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.EventLogEntry[] entries, int index);
```

Copies the elements of the `EventLogEntryCollection` to an array of `EventLogEntry` instances, starting at a particular array index.

Parameters:

- `entries`: The one-dimensional array of `EventLogEntry` instances that is the destination of the elements copied from the collection. The array must have zero-based indexing.
- `index`: The zero-based index in the array at which copying begins.

#### Remarks
Because new entries are appended to the existing list, stepping through the collection enables you to access the entries that were created after you originally created the `EventLogEntryCollection`. An array of `EventLogEntry` instances is fixed at the time it is instantiated. Therefore, you cannot read new entries by using the array that is returned by the `EventLogEntryCollection.CopyTo` method.

#### Examples
The following example creates an `EventLogEntry` array and uses the `EventLogEntryCollection.CopyTo` method to copy the contents of an `EventLogEntryCollection` into it.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/EventLogEntryCollection/Overview/eventlogentry_copyto.cs._

## EventLogEntryCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Supports a simple iteration over the `EventLogEntryCollection` object.

Returns: An object that can be used to iterate over the collection.

#### Remarks
The object that is returned by the `EventLogEntryCollection.GetEnumerator` method is a wrapper for the `EventLogEntryCollection` class that implements the `IEnumerator` enumerator.

> **Note:**
>  If the collection is changed during the iteration, the iteration is terminated. To avoid this possibility, see the `EventLogEntryCollection.Item` property for an alternative technique for iterating through a collection.

## EventLogEntryCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies the elements of the collection to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements that are copied from the collection. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

#### Remarks
Use the `EventLogEntryCollection.CopyTo` method of the `EventLogEntryCollection` class to copy all or part of the collection to an `EventLogEntry` array.
