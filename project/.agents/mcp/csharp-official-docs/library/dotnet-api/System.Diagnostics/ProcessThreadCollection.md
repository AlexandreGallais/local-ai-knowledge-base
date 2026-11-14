---
title: "ProcessThreadCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessThreadCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessThreadCollection class

Namespace: `System.Diagnostics`

```csharp
public class ProcessThreadCollection : System.Collections.ReadOnlyCollectionBase
```

Provides a strongly typed collection of `ProcessThread` objects.

To be added.

## ProcessThreadCollection.ProcessThreadCollection() constructor

```csharp
protected ProcessThreadCollection ();
```

Initializes a new instance of the `ProcessThreadCollection` class, with no associated `ProcessThread` instances.

To be added.

## ProcessThreadCollection.ProcessThreadCollection(ProcessThread[]) constructor

```csharp
public ProcessThreadCollection (System.Diagnostics.ProcessThread[] processThreads);
```

Initializes a new instance of the `ProcessThreadCollection` class, using the specified array of `ProcessThread` instances.

Parameters:

- `processThreads`: An array of `ProcessThread` instances with which to initialize this `ProcessThreadCollection` instance.

To be added.

## ProcessThreadCollection.Item property

```csharp
public System.Diagnostics.ProcessThread this[int index] { get; }
```

Gets an index for iterating over the set of process threads.

Parameters:

- `index`: The zero-based index value of the thread in the collection.

Returns: A `ProcessThread` that indexes the threads in the collection.

To be added.

## ProcessThreadCollection.Add(ProcessThread) method

```csharp
public int Add (System.Diagnostics.ProcessThread thread);
```

Appends a process thread to the collection.

Parameters:

- `thread`: The thread to add to the collection.

Returns: The zero-based index of the thread in the collection.

To be added.

## ProcessThreadCollection.Contains(ProcessThread) method

```csharp
public bool Contains (System.Diagnostics.ProcessThread thread);
```

Determines whether the specified process thread exists in the collection.

Parameters:

- `thread`: A `ProcessThread` instance that indicates the thread to find in this collection.

Returns: `true` if the thread exists in the collection; otherwise, `false`.

#### Remarks
A module is identified by its module name and its fully qualified file path.

## ProcessThreadCollection.CopyTo(ProcessThread[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.ProcessThread[] array, int index);
```

Copies an array of `ProcessThread` instances to the collection, at the specified index.

Parameters:

- `array`: An array of `ProcessThread` instances to add to the collection.
- `index`: The location at which to add the new instances.

To be added.

## ProcessThreadCollection.IndexOf(ProcessThread) method

```csharp
public int IndexOf (System.Diagnostics.ProcessThread thread);
```

Provides the location of a specified thread within the collection.

Parameters:

- `thread`: The `ProcessThread` whose index is retrieved.

Returns: The zero-based index that defines the location of the thread within the `ProcessThreadCollection`.

To be added.

## ProcessThreadCollection.Insert(Int32, ProcessThread) method

```csharp
public void Insert (int index, System.Diagnostics.ProcessThread thread);
```

Inserts a process thread at the specified location in the collection.

Parameters:

- `index`: The zero-based index indicating the location at which to insert the thread.
- `thread`: The thread to insert into the collection.

To be added.

## ProcessThreadCollection.Remove(ProcessThread) method

```csharp
public void Remove (System.Diagnostics.ProcessThread thread);
```

Deletes a process thread from the collection.

Parameters:

- `thread`: The thread to remove from the collection.

To be added.
