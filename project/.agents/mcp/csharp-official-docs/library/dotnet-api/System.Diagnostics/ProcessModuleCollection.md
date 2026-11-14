---
title: "ProcessModuleCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ProcessModuleCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ProcessModuleCollection class

Namespace: `System.Diagnostics`

```csharp
public class ProcessModuleCollection : System.Collections.ReadOnlyCollectionBase
```

Provides a strongly typed collection of `ProcessModule` objects.

#### Remarks
A module is an executable file or a dynamic link library (DLL). Each process consists of one or more modules. You can use this class to iterate over a collection of process modules on the system. A module is identified by its module name and fully qualified file path.

## ProcessModuleCollection.ProcessModuleCollection() constructor

```csharp
protected ProcessModuleCollection ();
```

Initializes a new instance of the `ProcessModuleCollection` class, with no associated `ProcessModule` instances.

To be added.

## ProcessModuleCollection.ProcessModuleCollection(ProcessModule[]) constructor

```csharp
public ProcessModuleCollection (System.Diagnostics.ProcessModule[] processModules);
```

Initializes a new instance of the `ProcessModuleCollection` class, using the specified array of `ProcessModule` instances.

Parameters:

- `processModules`: An array of `ProcessModule` instances with which to initialize this `ProcessModuleCollection` instance.

To be added.

## ProcessModuleCollection.Item property

```csharp
public System.Diagnostics.ProcessModule this[int index] { get; }
```

Gets an index for iterating over the set of process modules.

Parameters:

- `index`: The zero-based index value of the module in the collection.

Returns: A `ProcessModule` that indexes the modules in the collection.

To be added.

## ProcessModuleCollection.Contains(ProcessModule) method

```csharp
public bool Contains (System.Diagnostics.ProcessModule module);
```

Determines whether the specified process module exists in the collection.

Parameters:

- `module`: A `ProcessModule` instance that indicates the module to find in this collection.

Returns: `true` if the module exists in the collection; otherwise, `false`.

#### Remarks
A module is identified by its module name and its fully qualified file path.

## ProcessModuleCollection.CopyTo(ProcessModule[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.ProcessModule[] array, int index);
```

Copies an array of `ProcessModule` instances to the collection, at the specified index.

Parameters:

- `array`: An array of `ProcessModule` instances to add to the collection.
- `index`: The location at which to add the new instances.

To be added.

## ProcessModuleCollection.IndexOf(ProcessModule) method

```csharp
public int IndexOf (System.Diagnostics.ProcessModule module);
```

Provides the location of a specified module within the collection.

Parameters:

- `module`: The `ProcessModule` whose index is retrieved.

Returns: The zero-based index that defines the location of the module within the `ProcessModuleCollection`.

To be added.
